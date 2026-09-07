import { cn } from '@findrey/lib/utils';

import { Link, useRouterState } from '@tanstack/react-router';

import { MOBILE_PINNED } from './data';

export function MobileTabBar() {
	const pathname = useRouterState({ select: (s) => s.location.pathname });

	return (
		<nav className="fixed bottom-0 left-0 right-0 z-50 flex h-14 items-center justify-around border-t border-border bg-card md:hidden">
			{MOBILE_PINNED.map((item) => {
				const active = item.match(pathname);
				const Icon = item.icon;
				return (
					<Link
						key={item.path}
						to={item.path}
						className={cn(
							'flex flex-col items-center gap-0.5 px-3 py-1 text-[10px] font-medium transition-colors',
							active ? 'text-primary' : 'text-muted-foreground',
						)}
					>
						<Icon size={20} />
						{item.label}
					</Link>
				);
			})}
		</nav>
	);
}
