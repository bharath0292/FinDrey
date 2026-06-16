import { QueryClient } from '@tanstack/react-query';
import { createRouter } from '@tanstack/react-router';
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query';

import { routeTree } from './routeTree.gen';

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 0,
			refetchOnWindowFocus: false,
			refetchOnMount: true,
			refetchOnReconnect: true,
			staleTime: 30 * 60 * 1000,
		},
	},
});

export function getRouter() {
	const router = createRouter({
		context: {
			queryClient,
			user: undefined,
		},
		routeTree,
		scrollRestoration: true,
		defaultNotFoundComponent: () => <div>Page not found</div>,
		defaultViewTransition: true,
		defaultPendingMs: 0,
	});

	setupRouterSsrQueryIntegration({
		router,
		queryClient,
		dehydrateOptions: {
			shouldDehydrateQuery: (query) => query.meta?.ssr !== false,
		},
		hydrateOptions: {
			defaultOptions: {
				queries: {
					gcTime: 0,
				},
			},
		},
	});

	return router;
}

declare module '@tanstack/react-router' {
	interface Register {
		router: ReturnType<typeof createRouter>;
	}
}
