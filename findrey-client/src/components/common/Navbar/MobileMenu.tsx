import { Button } from '@findrey/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@findrey/components/ui/sheet';
import { useTheme } from '@findrey/context/ThemeContext';
import { cn } from '@findrey/lib/utils';

import { Link, useRouterState } from '@tanstack/react-router';
import { Moon, Sun } from 'lucide-react';

import { NAV_GROUPS } from './data';

interface MobileMenuProps {
	open: boolean;
	onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const { theme, toggleTheme } = useTheme();

	return (
		<Sheet
			open={open}
			onOpenChange={(o) => {
				if (!o) onClose();
			}}
		>
			<SheetContent
				side="right"
				className="flex w-72 flex-col border-l border-border bg-card p-0"
			>
				<SheetHeader className="px-4 pt-4 pb-2">
					<SheetTitle className="text-left text-sm font-semibold text-foreground">
						Navigation
					</SheetTitle>
				</SheetHeader>

				<nav className="flex-1 space-y-4 overflow-y-auto px-3 pb-4 scrollbar-thin">
					{NAV_GROUPS.map((group) => (
						<div key={group.id}>
							{group.label && (
								<p className="mb-1 px-4 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
									{group.label}
								</p>
							)}
							<div className="space-y-0.5">
								{group.items.map((item) => {
									const active = item.match(pathname);
									const Icon = item.icon;
									return (
										<Link
											key={item.path}
											to={item.path}
											onClick={onClose}
											className={cn(
												'flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200',
												active
													? 'bg-primary/10 text-primary'
													: 'text-muted-foreground hover:bg-muted hover:text-foreground',
											)}
										>
											<Icon size={18} />
											{item.label}
										</Link>
									);
								})}
							</div>
						</div>
					))}
				</nav>

				<div className="border-t border-border p-4">
					<Button
						variant="ghost"
						onClick={toggleTheme}
						className="w-full justify-start gap-3"
					>
						{theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
						Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
					</Button>
				</div>
			</SheetContent>
		</Sheet>
	);
}