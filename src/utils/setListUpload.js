import { useRecoilCallback } from 'recoil';
import { contentsListState } from '../recoil/list';

const setListUpload = () => {
  /** 리스트에 이미지 및 영상 업로드 */
  return useRecoilCallback(({ set }) => async list => {
    await set(contentsListState, list);
  });
};

export default setListUpload;
