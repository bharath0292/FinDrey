'use client';

import { fetchSubTransactionTypes } from '@findrey/lib/subTransactionTypes';

import { useQuery } from '@tanstack/react-query';

export const useSubTransactionTypesState = () => {
	return useQuery({
		queryKey: ['subTransactionTypes'],
		queryFn: () => fetchSubTransactionTypes(),
		staleTime: 1000 * 60 * 60,
		gcTime: 1000 * 60 * 30,
		refetchOnWindowFocus: false,
	});
};
