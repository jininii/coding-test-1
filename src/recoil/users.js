import { atom } from 'recoil';

export const userState = atom({
  key: 'userState',
  default: [
    {
      id: 1,
      userId: 'test',
      password: 'pass',
      phoneNumber: '01000000000',
      term: 'true',
    },
    {
      id: 2,
      userId: 'admin',
      password: 'pass',
      phoneNumber: '01011111111',
      term: 'true',
    },
  ],
});
