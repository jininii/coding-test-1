import React, { useCallback, useState } from 'react';
import './UploadFile.scss';
import uuid from 'react-uuid';
import setListUpload from '../../utils/setListUpload';

const UploadFile = ({ setUploadModalOpen }) => {
  const [file, setFile] = useState(null);
  const setListUploadFile = setListUpload();
  const [fileType, setFileType] = useState('');
  const [uploadFileSize, setUploadFileSize] = useState('');

  const fileUpload = useCallback(
    e => {
      const selectFile = e.target.files[0];

      /** 용량제한 200MB */
      const maxSize = 200 * 1024 * 1024;
      setUploadFileSize(e.target.files[0].size);
      if (uploadFileSize > maxSize) {
        alert('파일첨부 용량은 200MB 이내로 가능합니다.');
        return;
      }

      setFile(URL.createObjectURL(selectFile));

      /** 업로드 파일 타입 확인 */
      const type = selectFile.type;
      const sliceStr = type.indexOf('/');
      const resultType = type.slice(0, sliceStr);
      setFileType(resultType);
    },
    [setFile, setFileType],
  );

  const closeModal = () => {
    if (setUploadModalOpen) {
      setUploadModalOpen(false);
    }
  };

  const onSubmit = useCallback(
    e => {
      e.preventDefault();

      /** 파일크기 MB 단위로 변환 */
      const bytesToMB = bytes => {
        const megabytes = bytes / (1024 * 1024);
        return megabytes.toFixed(2);
      };

      const uploadFile = {
        id: uuid(),
        url: file,
        title: fileType === 'video' ? '영상' : '이미지',
        type: fileType,
        size: `${bytesToMB(uploadFileSize)}MB`,
      };

      setListUploadFile(oldData => [...oldData, uploadFile]);
      setUploadModalOpen(false);
    },
    [file, setListUploadFile, fileType, uploadFileSize],
  );

  return (
    <div className="modalWrap">
      <div className="container">
        <button className="closeBtn" type="button" onClick={closeModal}>
          닫기
        </button>
        <div className="previewFile">
          {file ? '' : '미리보기'}
          {fileType === 'image' && <img src={file} width="350px" />}
          {fileType === 'video' && <video src={file} controls width="350px" />}
        </div>
        <label htmlFor="file">
          <p>파일 선택</p>
          <input type="file" id="file" onChange={fileUpload} />
        </label>
        <button className="uploadBtn" type="button" onClick={onSubmit}>
          업로드 완료
        </button>
      </div>
    </div>
  );
};

export default UploadFile;
