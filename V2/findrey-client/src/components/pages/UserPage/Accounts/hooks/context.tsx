'use client';

import { createContext, ReactNode } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRecoilValue } from 'recoil';

import { useAccountsState } from '@findrey/store/accounts';
import { useAccountTypesState } from '@findrey/store/accountTypes';
import { userState } from '@findrey/store/user';
import { AccountType } from '@findrey/types/account';
import { AccountTypesType } from '@findrey/types/accountType';
import { SuccessResponseType } from '@findrey/types/response';

type AccountsPageProviderProps = {
  children: ReactNode;
};

type AccountsPage = {
  userId: string;
  pageNumber: number;
  searchQuery: string;
  isLoading: boolean;
  isError: boolean;
  accounts: SuccessResponseType<AccountType[]> | undefined;
  accountTypes: SuccessResponseType<AccountTypesType[]> | undefined;
};

export const AccountsPageContext = createContext<AccountsPage | null>(null);

export function AccountsPageProvider(
  props: Readonly<AccountsPageProviderProps>,
) {
  const { id: userId } = useRecoilValue(userState);

  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams || undefined);

  const page = Number(params.get('page')) || 1;
  const query = params.get('query') ?? '';

  const {
    data: accounts,
    isLoading: accountsIsLoading,
    isError: accountsIsError,
  } = useAccountsState(userId, page, query);
  const {
    data: accountTypes,
    isLoading: accountTypesIsLoading,
    isError: accountTypesIsError,
  } = useAccountTypesState();

  return (
    <AccountsPageContext.Provider
      value={{
        userId: userId,
        pageNumber: page,
        searchQuery: query,
        isLoading: accountsIsLoading || accountTypesIsLoading,
        isError: accountsIsError || accountTypesIsError,
        accounts: accounts,
        accountTypes: accountTypes,
      }}
    >
      {props.children}
    </AccountsPageContext.Provider>
  );
}
