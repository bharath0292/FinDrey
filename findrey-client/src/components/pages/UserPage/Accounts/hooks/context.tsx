'use client';

import { type ReactNode, createContext } from 'react';

import type { RootState } from '@findrey/store';
import { useAccountsState } from '@findrey/store/accounts';
import { useAccountTypesState } from '@findrey/store/accountTypes';
import type { AccountType } from '@findrey/types/account';
import type { AccountTypesType } from '@findrey/types/accountType';
import type { SuccessResponseType } from '@findrey/types/response';

import { useSearchParams } from 'next/navigation';
import { useSelector } from 'react-redux';

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
	const user = useSelector((state: RootState) => state.user);

	const searchParams = useSearchParams();
	const params = new URLSearchParams(searchParams || undefined);

	const page = Number(params.get('page')) || 1;
	const query = params.get('query') ?? '';

	const {
		data: accounts,
		isLoading: accountsIsLoading,
		isError: accountsIsError,
	} = useAccountsState(user.id, page, query);
	const {
		data: accountTypes,
		isLoading: accountTypesIsLoading,
		isError: accountTypesIsError,
	} = useAccountTypesState();

	return (
		<AccountsPageContext.Provider
			value={{
				userId: user.id,
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
