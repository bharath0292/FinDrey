'use client';

import { createContext, ReactNode } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRecoilValue } from 'recoil';

import { useCategoriesState } from '@findrey/store/categories';
import { useTransactionTypesState } from '@findrey/store/transactionTypes';
import { userState } from '@findrey/store/user';
import { CategoryType } from '@findrey/types/categories';
import { SuccessResponseType } from '@findrey/types/response';
import { TransactionTypesType } from '@findrey/types/transactionType';

type CategoryPageProviderProps = {
  children: ReactNode;
};

type CategoryPage = {
  userId: string;
  pageNumber: number;
  searchQuery: string;
  isLoading: boolean;
  isError: boolean;
  categories: SuccessResponseType<CategoryType[]> | undefined;
  transactionTypes: SuccessResponseType<TransactionTypesType[]> | undefined;
};

export const CategoryPageContext = createContext<CategoryPage | null>(null);

export function CategoryPageProvider(
  props: Readonly<CategoryPageProviderProps>,
) {
  const { id: userId } = useRecoilValue(userState);

  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams || undefined);

  const page = Number(params.get('page')) || 1;
  const query = params.get('query') ?? '';
  const {
    data: categories,
    isLoading: categoryIsLoading,
    isError: categoryIsError,
  } = useCategoriesState(userId, page, query);
  const {
    data: transactionTypes,
    isLoading: transactionTypesIsLoading,
    isError: transactionTypesIsError,
  } = useTransactionTypesState();

  return (
    <CategoryPageContext.Provider
      value={{
        userId: userId,
        pageNumber: page,
        searchQuery: query,
        isLoading: categoryIsLoading || transactionTypesIsLoading,
        isError: categoryIsError || transactionTypesIsError,
        categories: categories,
        transactionTypes: transactionTypes,
      }}
    >
      {props.children}
    </CategoryPageContext.Provider>
  );
}
