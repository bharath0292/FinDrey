'use client';

import { useQuery } from 'react-query';

import { ITEMS_PER_PAGE } from '@findrey/constants/gridConfigs';
import { fetchCategories } from '@findrey/lib/categories';

export const useCategoriesState = (
  userId: string,
  page: number,
  query: string,
  sortBy: string = '',
  sortOrder: 'asc' | 'desc' = 'desc',
) => {
  return useQuery({
    queryKey: ['categories', query, page],
    queryFn: () =>
      fetchCategories({
        page: page,
        itemsPerPage: ITEMS_PER_PAGE,
        userId: userId,
        search: query,
        sortBy: sortBy,
        sortOrder: sortOrder,
      }),
    staleTime: 0,
    cacheTime: 30,
    refetchOnWindowFocus: false,
  });
};
