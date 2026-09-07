import { ThemeProvider } from '@findrey/context/ThemeContext';
import { store } from '@findrey/store';
import globalsCss from '@findrey/styles/globals.css?url';

import type { QueryClient } from '@tanstack/react-query';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
	HeadContent,
	Outlet,
	Scripts,
	createRootRouteWithContext,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { MotionConfig } from 'framer-motion';
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
		links: [
			{ rel: 'preconnect', href: 'https://fonts.googleapis.com' },
			{
				rel: 'preconnect',
				href: 'https://fonts.gstatic.com',
				crossOrigin: 'anonymous',
			},
			{
				rel: 'stylesheet',
				href: 'https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700&family=JetBrains+Mono:wght@400;500;700&display=swap',
			},
			{ rel: 'stylesheet', href: globalsCss },
		],
	}),
	component: RootComponent,
});

function RootComponent() {
	const { queryClient } = Route.useRouteContext();
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<HeadContent />
				<script
					dangerouslySetInnerHTML={{
						__html: `try{var t=localStorage.getItem('theme')||((window.matchMedia('(prefers-color-scheme: light)').matches)?'light':'dark');if(t==='light')document.documentElement.classList.add('light');}catch(e){}`,
					}}
				/>
			</head>
		<body className="antialiased [overflow-wrap:anywhere]">
			<QueryClientProvider client={queryClient}>
				<Provider store={store}>
					<ThemeProvider>
						<MotionConfig reducedMotion="never">
							<Outlet />
						</MotionConfig>
					</ThemeProvider>
				</Provider>
				{import.meta.env.DEV && (
					<>
						<TanStackRouterDevtools position="bottom-right" />
						<ReactQueryDevtools initialIsOpen={false} />
					</>
				)}
			</QueryClientProvider>
			<Scripts />
		</body>
	</html>
	);
}
