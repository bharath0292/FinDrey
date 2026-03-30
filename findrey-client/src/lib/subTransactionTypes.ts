'use server';

import axios from 'axios';

import serverClient from '@findrey/constants/serverClient';
import type { SuccessResponseType } from '@findrey/types/response';
import { SubTransactionTypesType } from '@findrey/types/subTransactionType';

export const fetchSubTransactionTypes = async (): Promise<
  SuccessResponseType<SubTransactionTypesType[]>
> => {
  try {
    const { data } = await serverClient.get<
      SuccessResponseType<SubTransactionTypesType[]>
    >('/sub-transaction-types');
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
