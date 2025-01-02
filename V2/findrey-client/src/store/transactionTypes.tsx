'use client';

import { useQuery } from 'react-query';

import { fetchTransactionTypes } from '@findrey/lib/transactionTypes';

export const useTransactionTypesState = () => {
  return useQuery({
    queryKey: 'transactionTypes',
    queryFn: () => fetchTransactionTypes(),
    staleTime: 1000 * 60 * 60,
    cacheTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
  });
};
