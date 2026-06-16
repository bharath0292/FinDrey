import { store } from '@findrey/store';
import globalsCss from '@findrey/styles/globals.css?url';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { QueryClient } from '@tanstack/react-query';
import { HeadContent, Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Provider } from 'react-redux';

export interface RouterContext {
	queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterContext>()({
	head: () => ({
		meta: [
			{ charSet: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ title: 'FinDrey' },
		],
		links: [{ rel: 'stylesheet', href: globalsCss }],
	}),
	component: RootComponent,
});

function RootComponent() {
	const { queryClient } = Route.useRouteContext();

	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body className="antialiased [overflow-wrap:anywhere]">
				<QueryClientProvider client={queryClient}>
					<Provider store={store}>
						<Outlet />
					</Provider>
					{import.meta.env.DEV && (
						<>
							<TanStackRouterDevtools position="bottom-right" />
							<ReactQueryDevtools initialIsOpen={false} />
						</>
					)}
				</QueryClientProvider>
			</body>
		</html>
	);
}
