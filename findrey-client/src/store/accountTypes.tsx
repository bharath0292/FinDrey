'use client';

import { fetchAccountTypes } from '@findrey/lib/accountTypes';

import { useQuery } from '@tanstack/react-query';

export const useAccountTypesState = () => {
	return useQuery({
		queryKey: ['accountTypes'],
		queryFn: () => fetchAccountTypes(),
		staleTime: 1000 * 60 * 60,
		gcTime: 1000 * 60 * 30,
		refetchOnWindowFocus: false,
	});
};
