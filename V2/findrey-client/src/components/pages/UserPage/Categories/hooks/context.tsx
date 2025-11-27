'use client';

import { type ReactNode, createContext } from 'react';

import type { RootState } from '@findrey/store';
import { useCategoriesState } from '@findrey/store/categories';
import { useTransactionTypesState } from '@findrey/store/transactionTypes';
import type { CategoryType } from '@findrey/types/categories';
import type { SuccessResponseType } from '@findrey/types/response';
import type { TransactionTypesType } from '@findrey/types/transactionType';

import { useSearchParams } from 'next/navigation';
import { useSelector } from 'react-redux';

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
	const user = useSelector((state: RootState) => state.user);

	const searchParams = useSearchParams();
	const params = new URLSearchParams(searchParams || undefined);

	const page = Number(params.get('page')) || 1;
	const query = params.get('query') ?? '';
	const {
		data: categories,
		isLoading: categoryIsLoading,
		isError: categoryIsError,
	} = useCategoriesState(user.id, page, query);
	const {
		data: transactionTypes,
		isLoading: transactionTypesIsLoading,
		isError: transactionTypesIsError,
	} = useTransactionTypesState();

	return (
		<CategoryPageContext.Provider
			value={{
				userId: user.id,
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
