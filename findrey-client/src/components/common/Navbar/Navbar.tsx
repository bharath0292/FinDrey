import { useEffect, useRef, useState } from 'react';

import { Logo } from '@findrey/components/common/Logo';
import {
	NotificationBell,
	NotificationPanelBody,
} from '@findrey/components/common/Notifications';
import { Avatar, AvatarFallback } from '@findrey/components/ui/avatar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@findrey/components/ui/dropdown-menu';
import { Input } from '@findrey/components/ui/input';
import { Sheet, SheetContent } from '@findrey/components/ui/sheet';
import { useTheme } from '@findrey/context/ThemeContext';
import { cn } from '@findrey/lib/utils';

import { Link, useNavigate, useRouterState } from '@tanstack/react-router';
import { AnimatePresence, motion } from 'framer-motion';
import {
	ChevronDown,
	LogOut,
	Menu,
	Moon,
	Search,
	Settings,
	Sun,
	User,
} from 'lucide-react';

import { NAV_GROUPS } from './data';
import { MobileMenu } from './MobileMenu';

const PLACEHOLDER_CYCLE = [
	'Search transactions…',
	'Search accounts…',
	'Search analytics…',
	'Search categories…',
];

function NavGroupDropdown({ group }: { group: (typeof NAV_GROUPS)[number] }) {
	const [open, setOpen] = useState(false);
	const pathname = useRouterState({ select: (s) => s.location.pathname });

	return (
		<div
			className="relative"
			onMouseEnter={() => setOpen(true)}
			onMouseLeave={() => setOpen(false)}
		>
			<button
				type="button"
				onClick={() => setOpen((o) => !o)}
				className={cn(
					'flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
					group.items.some((i) => i.match(pathname))
						? 'text-primary'
						: 'text-muted-foreground hover:text-foreground',
				)}
			>
				{group.label}
				<ChevronDown
					size={14}
					className={cn(
						'text-muted-foreground/60 transition-transform duration-200',
						open && 'rotate-180',
					)}
				/>
			</button>

			<AnimatePresence>
				{open && (
					<motion.div
						initial={{ opacity: 0, y: -6, scaleY: 0.95 }}
						animate={{ opacity: 1, y: 0, scaleY: 1 }}
						exit={{ opacity: 0, y: -6, scaleY: 0.95 }}
						transition={{ duration: 0.15, ease: 'easeOut' }}
						className="absolute left-0 top-full mt-1 min-w-44 origin-top overflow-hidden rounded-xl border border-border bg-card p-1 shadow-xl backdrop-blur-xl"
					>
						{group.items.map((item) => {
							const active = item.match(pathname);
							const Icon = item.icon;
							return (
								<Link
									key={item.path}
									to={item.path}
									onClick={() => setOpen(false)}
									className={cn(
										'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
										active
											? 'bg-primary/10 text-primary'
											: 'text-muted-foreground hover:bg-muted hover:text-foreground',
									)}
								>
									<Icon size={16} />
									{item.label}
								</Link>
							);
						})}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
export function Navbar() {
	const { theme, toggleTheme } = useTheme();
	const navigate = useNavigate();
	const [mobileOpen, setMobileOpen] = useState(false);
	const [notifSheetOpen, setNotifSheetOpen] = useState(false);
	const [searchFocused, setSearchFocused] = useState(false);
	const [placeholderIdx, setPlaceholderIdx] = useState(0);
	const [notifCount, setNotifCount] = useState(3);
	const intervalRef = useRef<number | null>(null);
	const pathname = useRouterState({ select: (s) => s.location.pathname });

	useEffect(() => {
		if (searchFocused) return;
		intervalRef.current = window.setInterval(
			() => setPlaceholderIdx((i) => (i + 1) % PLACEHOLDER_CYCLE.length),
			3000,
		);
		return () => {
			if (intervalRef.current) window.clearInterval(intervalRef.current);
		};
	}, [searchFocused]);

	return (
		<>
			<header className="fixed left-0 right-0 top-0 z-40 flex h-16 items-center justify-between gap-4 border-b border-border bg-card px-4 md:px-6">
				<div className="flex shrink-0 items-center gap-3">
					<button
						type="button"
						onClick={() => setMobileOpen(true)}
						className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:hidden"
						aria-label="Open navigation"
					>
						<Menu size={20} />
					</button>

					<a
						href="/"
						className="flex items-center gap-2.5"
						aria-label="FinDrey home"
					>
						<motion.div
							whileHover={{ scale: 1.08 }}
							whileTap={{ scale: 0.96 }}
							transition={{ type: 'spring', stiffness: 400, damping: 20 }}
						>
							<Logo size={28} />
						</motion.div>
						<span
							className="hidden text-sm font-bold tracking-wider text-foreground sm:block"
							style={{ fontFamily: 'var(--font-headline)' }}
						>
							FinDrey
						</span>
					</a>

					<nav
						className="ml-4 hidden items-center gap-0.5 md:flex"
						aria-label="Main navigation"
					>
						<Link
							to="/"
							className={cn(
								'rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
								pathname === '/'
									? 'text-primary'
									: 'text-muted-foreground hover:text-foreground',
							)}
						>
							Dashboard
						</Link>
						{NAV_GROUPS.filter((g) => g.label).map((group) => (
							<NavGroupDropdown key={group.id} group={group} />
						))}
					</nav>
				</div>

				<div className="hidden max-w-xs flex-1 md:block">
					<div className="relative">
						<Search
							size={14}
							className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
						/>
						<Input
							key={placeholderIdx}
							type="search"
							placeholder={PLACEHOLDER_CYCLE[placeholderIdx]}
							onFocus={() => setSearchFocused(true)}
							onBlur={() => setSearchFocused(false)}
							className={cn(
								'rounded-full pl-8 text-sm placeholder:text-muted-foreground/60',
								'border-border bg-muted/50',
								'focus-visible:border-primary/40 focus-visible:ring-primary/20',
							)}
						/>
					</div>
				</div>

				<div className="flex shrink-0 items-center gap-1">
					<NotificationBell
						unreadCount={notifCount}
						onClick={() => setNotifSheetOpen(true)}
					/>

					<button
						type="button"
						onClick={toggleTheme}
						className="hidden rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:block"
						aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
					>
						<AnimatePresence mode="wait">
							<motion.span
								key={theme}
								initial={{ rotate: -90, opacity: 0 }}
								animate={{ rotate: 0, opacity: 1 }}
								exit={{ rotate: 90, opacity: 0 }}
								transition={{ duration: 0.2 }}
								className="flex"
							>
								{theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
							</motion.span>
						</AnimatePresence>
					</button>

					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<button type="button" className="ml-1 cursor-pointer rounded-full ring-2 ring-primary/20 transition-all hover:ring-primary/40 focus-visible:outline-none focus-visible:ring-primary/60">
								<Avatar className="h-8 w-8">
									<AvatarFallback className="bg-primary/20 text-xs font-semibold text-primary">
										JJ
									</AvatarFallback>
								</Avatar>
							</button>
						</DropdownMenuTrigger>
					<DropdownMenuContent
						align="end"
						sideOffset={8}
						className="min-w-56 rounded-xl border-border/50 bg-card/80 p-1.5 backdrop-blur-xl"
					>
						<div className="px-2 py-1.5">
							<p className="text-sm font-medium text-foreground">John Jacob</p>
							<p className="text-xs text-muted-foreground">john@findrey.app</p>
						</div>
						<DropdownMenuSeparator className="mx-1.5 bg-border/50" />
						<DropdownMenuGroup>
							<DropdownMenuItem onClick={() => navigate({ to: '/user' })} className="cursor-pointer">
								<User size={16} />
								Profile
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => navigate({ to: '/user/settings' })} className="cursor-pointer">
								<Settings size={16} />
								Settings
							</DropdownMenuItem>
							<DropdownMenuSeparator className="mx-1.5 bg-border/50" />
							<DropdownMenuItem onClick={() => navigate({ to: '/login' })} className="cursor-pointer text-destructive">
								<LogOut size={16} />
								Sign out
							</DropdownMenuItem>
						</DropdownMenuGroup>
					</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</header>

			<MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />

			<Sheet
				open={notifSheetOpen}
				onOpenChange={(o) => {
					if (!o) setNotifSheetOpen(false);
				}}
			>
				<SheetContent
					side="right"
					className="flex w-[min(420px,100vw)] flex-col border-l border-border bg-card p-0"
				>
					<NotificationPanelBody
						onClose={() => setNotifSheetOpen(false)}
						onUnreadChange={setNotifCount}
					/>
				</SheetContent>
			</Sheet>
		</>
	);
}
