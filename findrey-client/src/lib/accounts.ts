'use server';

import axios from 'axios';

import serverClient from '@findrey/constants/serverClient';
import type { AccountType } from '@findrey/types/account';
import type { SuccessResponseType } from '@findrey/types/response';

interface FetchAccountsArgsType {
  page: number;
  itemsPerPage: number;
  userId: string;
  search: string;
  sortBy: string;
  sortOrder: string;
}

export const fetchAccounts = async (
  args: FetchAccountsArgsType,
): Promise<SuccessResponseType<AccountType[]>> => {
  const { page, itemsPerPage, sortBy, sortOrder, userId, search } = args;

  try {
    const { data } = await serverClient.get<SuccessResponseType<AccountType[]>>(
      '/accounts/query',
      {
        params: {
          page: page,
          noOfItemsInPage: itemsPerPage,
          sortBy: sortBy,
          sortOrder: sortOrder,
          search: search,
          userId: userId,
        },
      },
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

export interface AddAccountsArgsType {
  userId: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
  accountType: string;
  balance: number;
}

export const addAccount = async (
  args: AddAccountsArgsType,
): Promise<undefined> => {
  try {
    await serverClient.post<SuccessResponseType<AccountType[]>>(
      '/accounts',
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

export interface UpdateAccountsArgsType {
  id: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
  accountType: string;
  balance: number;
}

export const updateAccount = async (
  args: UpdateAccountsArgsType,
): Promise<undefined> => {
  try {
    await serverClient.put<SuccessResponseType<AccountType[]>>(
      '/accounts',
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

export interface UpdateAccountsArgsType {
  id: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
  accountType: string;
  balance: number;
}

export const deleteAccount = async (id: string): Promise<undefined> => {
  try {
    await serverClient.delete<null>('/accounts', {
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
