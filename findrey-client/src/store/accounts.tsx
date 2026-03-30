'use client';

import { ITEMS_PER_PAGE } from '@findrey/constants/gridConfigs';
import { fetchAccounts } from '@findrey/lib/accounts';

import { useQuery } from '@tanstack/react-query';

export const useAccountsState = (
	userId: string,
	page: number,
	query: string,
	sortBy: string = '',
	sortOrder: 'asc' | 'desc' = 'asc',
) => {
	return useQuery({
		queryKey: ['accounts', query, page],
		queryFn: () =>
			fetchAccounts({
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
