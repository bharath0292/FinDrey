'use client';

import { ITEMS_PER_PAGE } from '@findrey/constants/gridConfigs';
import { fetchCategories } from '@findrey/lib/categories';

import { useQuery } from '@tanstack/react-query';

export const useCategoriesState = (
	userId: string,
	page: number,
	query: string,
	sortBy: string = '',
	sortOrder: 'asc' | 'desc' = 'asc',
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
		gcTime: 30,
		refetchOnWindowFocus: false,
	});
};
