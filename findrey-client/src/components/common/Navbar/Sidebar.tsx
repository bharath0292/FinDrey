import { useState } from 'react';

import { cn } from '@findrey/lib/utils';

import { Link, useRouterState } from '@tanstack/react-router';
import { motion } from 'framer-motion';

import { NAV_GROUPS } from './data';

export function Sidebar() {
	const [hovered, setHovered] = useState(false);
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const expanded = hovered;

	return (
		<aside
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
			className={cn(
				'fixed left-0 top-16 z-30 hidden h-[calc(100vh-4rem)] flex-col overflow-hidden border-r border-border bg-card transition-all duration-300 md:flex',
				expanded ? 'w-56' : 'w-16',
			)}
		>
			<nav className="flex-1 space-y-4 overflow-y-auto px-2 py-4 scrollbar-thin">
				{NAV_GROUPS.map((group) => (
					<div key={group.id}>
						{group.label && (
							<p
								className={cn(
									'mb-1 overflow-hidden whitespace-nowrap px-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground transition-opacity duration-300',
									expanded ? 'opacity-100' : 'opacity-0',
								)}
							>
								{group.label}
							</p>
						)}
						<div className="space-y-0.5">
							{group.items.map((item) => {
								const active = item.match(pathname);
								return (
									<Link
										key={item.path}
										to={item.path}
										className={cn(
											'relative flex items-center gap-3 rounded-lg px-2 py-2 text-sm font-medium transition-colors',
											active
												? 'bg-primary/10 text-primary'
												: 'text-muted-foreground hover:bg-muted hover:text-foreground',
										)}
									>
										<span className="flex shrink-0 items-center justify-center">
											<item.icon size={18} />
										</span>
										{active && (
											<motion.span
												layoutId="sidebar-active"
												className="absolute left-0.5 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-primary"
												transition={{
													type: 'spring',
													stiffness: 300,
													damping: 30,
												}}
											/>
										)}
										<span
											className={cn(
												'whitespace-nowrap transition-opacity duration-300',
												expanded ? 'opacity-100' : 'opacity-0',
											)}
										>
											{item.label}
										</span>
									</Link>
								);
							})}
						</div>
					</div>
				))}
			</nav>
		</aside>
	);
}
