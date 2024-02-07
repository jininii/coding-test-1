import React, { useCallback } from 'react';
import './AllContents.scss';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  contentsListState,
  playlistState,
  recentPlaylistState,
} from '../../recoil/list';
import { FaTrash } from 'react-icons/fa';
import setListUpload from '../../utils/setListUpload';
import setDeleteList from '../../utils/setDeleteList';

const AllContents = () => {
  const contentsList = useRecoilValue(contentsListState);
  const [addPlayList, setAddPlayList] = useRecoilState(playlistState);
  const doSetListUpload = setListUpload();
  const doSetDeleteList = setDeleteList();
  const [updateRecentPlayList, setUpdateRecentPlayList] =
    useRecoilState(recentPlaylistState);

  const addList = useCallback(
    selectedContent => {
      setAddPlayList(prevList => [...prevList, selectedContent]);
    },
    [setAddPlayList],
  );

  const deleteList = useCallback(
    listDelete => {
      doSetListUpload(prevList =>
        prevList.filter(item => item.id !== listDelete.id),
      );

      setAddPlayList(prevList =>
        prevList.filter(item => item.id !== listDelete.id),
      );

      setUpdateRecentPlayList(prevList =>
        prevList.filter(item => item.id !== listDelete.id),
      );

      doSetDeleteList(listDelete);
      console.log(updateRecentPlayList);
    },
    [setAddPlayList, setListUpload, setUpdateRecentPlayList],
  );

  return (
    <>
      <h1 className="sectionTitle">전체 컨텐츠</h1>
      <ul className="allContents">
        {contentsList.map(list => (
          <li key={list.id}>
            <div className="preview">
              {list.type === 'image' ? (
                <img src={list.url} alt={list.title} width="200px" />
              ) : (
                <video width="200" height="200">
                  <source src={list.url} type="video/mp4" />
                </video>
              )}
              <button
                type="button"
                className="delete"
                onClick={() => deleteList(list)}
              >
                <FaTrash size="10" color="#fff" />
              </button>
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
        ))}
      </ul>
    </>
  );
};

export default AllContents;
