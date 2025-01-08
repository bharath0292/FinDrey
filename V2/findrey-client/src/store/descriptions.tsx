'use client';

import { useQuery } from 'react-query';

import { fetchDescriptions } from '@findrey/lib/descriptions';

export const useDescriptionsState = (
  userId: string,
  descriptionSearch: string | number,
) => {
  return useQuery({
    queryKey: ['descriptions', descriptionSearch],
    queryFn: () =>
      fetchDescriptions({
        userId: userId,
        descriptionSearch: descriptionSearch,
      }),

    staleTime: 30,
    cacheTime: 30,
    refetchOnWindowFocus: false,
  });
};
