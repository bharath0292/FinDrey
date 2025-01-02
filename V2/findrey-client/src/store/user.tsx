'use client';

import { atom } from 'recoil';

import { UserType } from '@findrey/types/user';

export const userState = atom<UserType>({
  key: 'user',
  default: {
    id: '671b5cd66a090a1d922d7987',
  } as UserType,
});
