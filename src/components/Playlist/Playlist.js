import React, { useCallback } from 'react';
import './Playlist.scss';
import { useRecoilCallback, useRecoilState, useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { playlistState, recentPlaylistState } from '../../recoil/list';

const Playlist = () => {
  const navigate = useNavigate();
  const [playList, setPlayList] = useRecoilState(playlistState);
  const recentPlayList = useRecoilValue(recentPlaylistState);

  const updateRecentPlayList = useRecoilCallback(({ set }) => async list => {
    const newList = list.filter(
      item => !recentPlayList.some(prevList => prevList.id === item.id),
    );
    await set(recentPlaylistState, [...recentPlayList, ...newList]);
  });

  const handleRemove = useCallback(
    selectedContent => {
      setPlayList(prevList =>
        prevList.filter(item => item.id !== selectedContent.id),
      );
    },
    [setPlayList],
  );

  const goToPlay = () => {
    updateRecentPlayList(playList);
    navigate(`/watch/${playList[0].id}`);
  };

  return (
    <ul className="playListContainer">
      <div className="listTop">
        <h1>플레이리스트</h1>
        <button type="button" onClick={goToPlay}>
          재생
        </button>
      </div>
      {playList.map(list => (
        <li key={list.id} className="listItem">
          <button className="removeList" onClick={() => handleRemove(list)}>
            X
          </button>
          <div className="preview">
            {list.type === 'image' ? (
              <img src={list.url} alt={list.title} width="200px" />
            ) : (
              <video width="200" height="200">
                <source src={list.url} type="video/mp4" />
              </video>
            )}
          </div>
          <div className="description">
            <p className="title">{list.title}</p>
            <p>
              <span>type</span>
              {list.type}
            </p>
            <p>
              <span>size</span>
              {list.size}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Playlist;
