import React, { useCallback } from 'react';
import './RecentPlaylist.scss';
import { useRecoilState, useRecoilValue } from 'recoil';
import '../AllContents/AllContents.scss';
import { playlistState, recentPlaylistState } from '../../recoil/list';

const RecentPlaylist = () => {
  const recentPlayList = useRecoilValue(recentPlaylistState);
  const [addPlayList, setAddPlayList] = useRecoilState(playlistState);

  const addList = useCallback(
    selectedContent => {
      setAddPlayList(prevList => [...prevList, selectedContent]);
    },
    [setAddPlayList],
  );

  return (
    <div className="recentPlaylistWrap">
      <h1 className="sectionTitle">최근 재생한 목록</h1>
      <ul className="allContents">
        {recentPlayList.length === 0 ? (
          <div className="preview emptyList">
            <p>재생한 목록이 없습니다.</p>
          </div>
        ) : (
          recentPlayList.map(list => (
            <li key={list.id}>
              <div className="preview">
                {list.type === 'image' ? (
                  <img src={list.url} alt={list.title} width="200px" />
                ) : (
                  <video width="200" height="200">
                    <source src={list.url} type="video/mp4" />
                  </video>
                )}
              </div>
              <p className="title">{list.title}</p>
              <p>
                <span>type</span>
                {list.type}
              </p>
              <p>
                <span>size</span>
                {list.size}
              </p>
              {addPlayList.some(item => item.id === list.id) ? (
                <button className="added">추가됨</button>
              ) : (
                <button className="addContent" onClick={() => addList(list)}>
                  추가하기
                </button>
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default RecentPlaylist;
