'use client';

import { fetchDescriptions } from '@findrey/lib/descriptions';

import { useQuery } from '@tanstack/react-query';

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
		gcTime: 30,
		refetchOnWindowFocus: false,
	});
};
