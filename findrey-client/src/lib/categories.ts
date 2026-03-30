'use server';

import axios from 'axios';

import serverClient from '@findrey/constants/serverClient';
import type { CategoryType } from '@findrey/types/categories';
import type { SuccessResponseType } from '@findrey/types/response';

interface FetchCategoriesArgsType {
  page: number;
  itemsPerPage: number;
  userId: string;
  search: string;
  sortBy: string;
  sortOrder: string;
}

export const fetchCategories = async (
  args: FetchCategoriesArgsType,
): Promise<SuccessResponseType<CategoryType[]>> => {
  const { page, itemsPerPage, sortBy, sortOrder, userId, search } = args;

  try {
    const { data } = await serverClient.get<
      SuccessResponseType<CategoryType[]>
    >('/category/query', {
      params: {
        page: page,
        noOfItemsInPage: itemsPerPage,
        sortBy: sortBy,
        sortOrder: sortOrder,
        search: search,
        userId: userId,
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

export interface AddCategoriesArgsType {
  userId: string;
  category: string;
  transactionType: string;
}

export const addCategory = async (
  args: AddCategoriesArgsType,
): Promise<undefined> => {
  try {
    await serverClient.post<SuccessResponseType<CategoryType[]>>(
      '/category',
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

export interface UpdateCategoriesArgsType {
  id: string;
  category: string;
  transactionType: string;
}

export const updateCategory = async (
  args: UpdateCategoriesArgsType,
): Promise<undefined> => {
  try {
    await serverClient.put<SuccessResponseType<CategoryType[]>>(
      '/category',
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

export const deleteCategory = async (id: string): Promise<undefined> => {
  try {
    await serverClient.delete<null>('/category', {
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
