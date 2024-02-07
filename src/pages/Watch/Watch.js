import React from 'react';
import { useRecoilValue } from 'recoil';
import { recentPlaylistState } from '../../recoil/list';

const Watch = () => {
  const playingList = useRecoilValue(recentPlaylistState);

  return (
    <div>
      {playingList.map(list => (
        <div key={list.id}>
          <img src={list.url} alt={list.title} width="200px" />
        </div>
      ))}
    </div>
  );
};

export default Watch;
