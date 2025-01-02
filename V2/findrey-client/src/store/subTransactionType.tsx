'use client';

import { useQuery } from 'react-query';

import { fetchSubTransactionTypes } from '@findrey/lib/subTransactionTypes';

export const useSubTransactionTypesState = () => {
  return useQuery({
    queryKey: 'subTransactionTypes',
    queryFn: () => fetchSubTransactionTypes(),
    staleTime: 1000 * 60 * 60,
    cacheTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
  });
};
