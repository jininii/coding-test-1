import React, { useState } from 'react';
import UploadFile from '../UploadFile/UploadFile';
import DeleteList from '../DeleteList/DeleteList';
import { FaTrash } from 'react-icons/fa';
import './Header.scss';

const Header = () => {
  const [upladeModalOpen, setUploadModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const showUploadModal = () => {
    setUploadModalOpen(true);
  };

  const showDeleteModal = () => {
    setDeleteModalOpen(true);
  };

  return (
    <div className="headerWrap">
      <div>
        <img
          src="https://ba-dream.com/_nuxt/logo_main.ffe5dc02.png"
          width="200px"
        />
        <button className="deleteList" onClick={showDeleteModal}>
          <FaTrash size="15" color="#333" />
          삭제리스트
        </button>
        {deleteModalOpen && (
          <DeleteList setDeleteModalOpen={setDeleteModalOpen} />
        )}
      </div>
      <button onClick={showUploadModal}>이미지, 영상 업로드</button>
      {upladeModalOpen && (
        <UploadFile setUploadModalOpen={setUploadModalOpen} />
      )}
    </div>
  );
};

export default Header;
