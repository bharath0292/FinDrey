'use client';

import { ITEMS_PER_PAGE } from '@findrey/constants/gridConfigs';
import { fetchTransactions } from '@findrey/lib/transactions';

import { useQuery } from '@tanstack/react-query';

export const useTransactionsState = (
	userId: string,
	page: number,
	query: string,
	sortBy: string = 'transactionDate',
	sortOrder: 'asc' | 'desc' = 'desc',
) => {
	return useQuery({
		queryKey: ['transactions', query, page],
		queryFn: () =>
			fetchTransactions({
				page: page,
				itemsPerPage: ITEMS_PER_PAGE,
				userId: userId,
				search: query,
				sortBy: sortBy,
				sortOrder: sortOrder,
			}),
		staleTime: 0,
		gcTime: 30,
		refetchOnWindowFocus: false,
	});
};
