'use client';

import React, {
  ReactNode,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useSearchParams } from 'next/navigation';
import { useRecoilValue } from 'recoil';

import {
  useAccountsState,
  useAccountTypesState,
  useCategoriesState,
  useDescriptionsState,
  userState,
  useSubTransactionTypesState,
  useTransactionsState,
  useTransactionTypesState,
} from '@findrey/store';

import { TransactionsPageContext } from './PageContext';
import { ParamsType, TransactionsPage } from './types';

type TransactionsPageProviderProps = {
  children: ReactNode;
};

export function TransactionsPageProvider({
  children,
}: Readonly<TransactionsPageProviderProps>) {
  const { id: userId } = useRecoilValue(userState);

  const previousPageNumber = useRef(1);
  let pageNumber: number;
  // Extract search parameters
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams || undefined);

  const _pageNumber = params.get('page');
  if (_pageNumber) {
    pageNumber = Number(_pageNumber);
    previousPageNumber.current = pageNumber;
  } else {
    pageNumber = previousPageNumber.current;
  }
  const searchQuery = params.get('query') ?? '';
  const [param, setParam] = useState<ParamsType>({
    pageNumber: '1',
    searchQuery: '',
    descriptionSearch: '',
  });

  const handleChangeParams = useCallback(
    (key: keyof ParamsType, value: string | number) => {
      setParam((prevParams) => ({
        ...prevParams, // Preserve existing key-value pairs
        [key]: value, // Update the specific key with the new value
      }));
    },
    [setParam], // Dependencies
  );

  // Fetch data from state hooks
  const transactionsState = useTransactionsState(
    userId,
    pageNumber,
    searchQuery,
  );
  const transactionTypesState = useTransactionTypesState();
  const subTransactionTypesState = useSubTransactionTypesState();
  const accountsState = useAccountsState(userId, 1, '');
  const accountTypesState = useAccountTypesState();
  const categoriesState = useCategoriesState(userId, 1, '');
  const descriptionsState = useDescriptionsState(
    userId,
    param.descriptionSearch,
  );

  // Helper functions for consolidated loading and error states
  const isLoading = [
    transactionsState.isLoading,
    transactionTypesState.isLoading,
    subTransactionTypesState.isLoading,
    accountsState.isLoading,
    accountTypesState.isLoading,
    categoriesState.isLoading,
    // descriptionsState.isLoading ,
  ].some(Boolean);

  const isError = [
    transactionsState.isError,
    transactionTypesState.isError,
    subTransactionTypesState.isError,
    accountsState.isError,
    accountTypesState.isError,
    categoriesState.isError,
  ].some(Boolean);

  // Prepare context value with useMemo for performance optimization
  const contextValue: TransactionsPage = useMemo(
    () => ({
      userId,
      pageNumber,
      searchQuery,
      isLoading,
      isError,
      handleChangeParams: handleChangeParams,
      transactions: transactionsState.data,
      transactionTypes: transactionTypesState.data,
      subTransactionTypes: subTransactionTypesState.data,
      accounts: accountsState.data,
      accountTypes: accountTypesState.data,
      categories: categoriesState.data,
      descriptions: descriptionsState.data,
      descriptionsIsLoading: descriptionsState.isLoading,
    }),
    [
      userId,
      pageNumber,
      searchQuery,
      isLoading,
      isError,
      transactionsState,
      transactionTypesState,
      subTransactionTypesState,
      accountsState,
      accountTypesState,
      categoriesState,
      descriptionsState,
    ],
  );

  return (
    <TransactionsPageContext.Provider value={contextValue}>
      {children}
    </TransactionsPageContext.Provider>
  );
}
