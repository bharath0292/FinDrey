'use server';

import axios from 'axios';

import serverClient from '@findrey/constants/serverClient';
import type { SuccessResponseType } from '@findrey/types/response';
import type { TransactionType } from '@findrey/types/transaction';

interface FetchTransactionsArgsType {
  page: number;
  itemsPerPage: number;
  userId: string;
  search: string;
  sortBy: string;
  sortOrder: string;
}

export const fetchTransactions = async (
  args: FetchTransactionsArgsType,
): Promise<SuccessResponseType<TransactionType[]>> => {
  const { page, itemsPerPage, sortBy, sortOrder, userId, search } = args;

  try {
    const { data } = await serverClient.get<
      SuccessResponseType<TransactionType[]>
    >('/transactions/query', {
      params: {
        page: page,
        noOfItemsInPage: itemsPerPage,
        sortBy: sortBy,
        sortOrder: sortOrder,
        search: search,
        userID: userId,
      },
    });
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

export interface AddTransactionsArgsType {
  userId: string;
  transactionDate: string;
  transactionType: string;
  subTransactionType: string | null | undefined;
  debitAccount: string | null | undefined;
  creditAccount: string | null | undefined;
  category: string | null | undefined;
  description: string;
  amount: number;
}

export const addTransaction = async (
  args: AddTransactionsArgsType,
): Promise<undefined> => {
  args.subTransactionType = args.subTransactionType ?? '';
  args.debitAccount = args.debitAccount ?? '';
  args.creditAccount = args.creditAccount ?? '';
  args.category = args.category ?? '';
  args.amount = Number(args.amount);

  try {
    await serverClient.post<SuccessResponseType<TransactionType[]>>(
      '/transactions',
      args,
    );
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

export interface UpdateTransactionsArgsType {
  id: string;
  transactionDate: string;
  transactionType: string;
  subTransactionType: string | null;
  debitAccount: string | null;
  creditAccount: string | null;
  category: string | null;
  description: string;
  amount: number;
}

export const updateTransaction = async (
  args: UpdateTransactionsArgsType,
): Promise<undefined> => {
  try {
    args.subTransactionType = args.subTransactionType ?? '';
    args.debitAccount = args.debitAccount ?? '';
    args.creditAccount = args.creditAccount ?? '';
    args.category = args.category ?? '';
    args.amount = Number(args.amount);

    await serverClient.put<SuccessResponseType<TransactionType[]>>(
      '/transactions',
      args,
    );
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

export const deleteTransaction = async (id: string): Promise<undefined> => {
  try {
    await serverClient.delete<null>('/transactions', {
      data: {
        id: id,
      },
    });
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
