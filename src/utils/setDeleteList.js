import { useRecoilCallback } from 'recoil';
import { deleteListState } from '../recoil/list';

/** 삭제리스트 업데이트 */
const setDeleteList = () => {
  return useRecoilCallback(
    ({ snapshot, set }) =>
      async listDelete => {
        const currentDeleteList = await snapshot.getPromise(deleteListState);
        const updatedDeleteList = [...currentDeleteList, listDelete];
        set(deleteListState, updatedDeleteList);
      },
    [],
  );
};

export default setDeleteList;
