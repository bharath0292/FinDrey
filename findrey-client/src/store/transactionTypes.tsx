'use client';

import { fetchTransactionTypes } from '@findrey/lib/transactionTypes';

import { useQuery } from '@tanstack/react-query';

export const useTransactionTypesState = () => {
	return useQuery({
		queryKey: ['transactionTypes'],
		queryFn: () => fetchTransactionTypes(),
		staleTime: 1000 * 60 * 60,
		gcTime: 1000 * 60 * 30,
		refetchOnWindowFocus: false,
	});
};
