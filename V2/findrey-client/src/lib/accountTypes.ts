'use server';

import axios from 'axios';

import serverClient from '@findrey/constants/serverClient';
import type { AccountTypesType } from '@findrey/types/accountType';
import type { SuccessResponseType } from '@findrey/types/response';

export const fetchAccountTypes = async (): Promise<
  SuccessResponseType<AccountTypesType[]>
> => {
  try {
    const { data } =
      await serverClient.get<SuccessResponseType<AccountTypesType[]>>(
        '/account-types',
      );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.data || error.message);
      throw error;
    } else {
      console.error('Unexpected error:', error);
      throw error;
    }
  }
};
