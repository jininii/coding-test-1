import { atom } from 'recoil';

export const contentsListState = atom({
  key: 'contentsListState',
  default: [
    {
      id: 1,
      url: 'https://i.namu.wiki/i/w11dbZZeomJI4bD3_KItw3vq7tgglcM1YQA_xHULxMsixPpY1S7KcB8WrEFhJNuSuejiiQkicGKMH12JvpUqBQ.webp',
      title: '영상',
      type: 'video',
      size: '30MB',
    },
    {
      id: 2,
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFL-NyjmLu_x1oiVNf9Z318yEdNv7JXsmvRmPO2LyPag&s',
      title: '이미지2',
      type: 'image',
      size: '2MB',
    },
  ],
});

export const playlistState = atom({
  key: 'playlistState',
  default: [],
});

export const recentPlaylistState = atom({
  key: 'recentPlaylistState',
  default: [],
});

export const deleteListState = atom({
  key: 'deleteListState',
  default: [],
});
