'use server';

import axios from 'axios';

import serverClient from '@findrey/constants/serverClient';
import type { SuccessResponseType } from '@findrey/types/response';
import { TransactionTypesType } from '@findrey/types/transactionType';

export const fetchTransactionTypes = async (): Promise<
  SuccessResponseType<TransactionTypesType[]>
> => {
  try {
    const { data } =
      await serverClient.get<SuccessResponseType<TransactionTypesType[]>>(
        '/transaction-types',
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
