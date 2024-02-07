import React from 'react';
import './DeleteList.scss';
import { useRecoilValue } from 'recoil';
import { deleteListState } from '../../recoil/list';

const DeleteList = ({ setDeleteModalOpen }) => {
  const deleteListUpload = useRecoilValue(deleteListState);

  const closeModal = () => {
    if (setDeleteModalOpen) {
      setDeleteModalOpen(false);
    }
  };

  return (
    <div className="modalWrap">
      <div className="container">
        <button className="closeBtn" type="button" onClick={closeModal}>
          닫기
        </button>
        <div className="deleteList">
          {deleteListUpload.map(list => (
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
            </li>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeleteList;
