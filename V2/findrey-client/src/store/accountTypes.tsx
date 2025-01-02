'use client';

import { useQuery } from 'react-query';

import { fetchAccountTypes } from '@findrey/lib/accountTypes';

export const useAccountTypesState = () => {
  return useQuery({
    queryKey: ['accountTypes'],
    queryFn: () => fetchAccountTypes(),
    staleTime: 1000 * 60 * 60,
    cacheTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
  });
};
