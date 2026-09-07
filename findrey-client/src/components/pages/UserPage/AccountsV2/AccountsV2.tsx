import { useMemo, useState } from 'react';

import { Badge } from '@findrey/components/ui/badge';
import { Button } from '@findrey/components/ui/button';
import { Card, CardContent, CardHeader } from '@findrey/components/ui/card';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@findrey/components/ui/table';
import {
	ACCOUNT_TYPE_ITEMS,
	CATEGORY_COLORS,
	CATEGORY_LABELS,
	formatCurrency,
	getAccountTypeItem,
	getAccountsByCategory,
} from '@findrey/lib/accounts-v2';
import { cn } from '@findrey/lib/utils';
import type { AccountV2FormData } from '@findrey/schemas/account-v2';

import { Link } from '@tanstack/react-router';
import { AnimatePresence, motion } from 'framer-motion';
import {
	AlertTriangle,
	Building2,
	ChevronDown,
	ChevronRight,
	CreditCard,
	Ellipsis,
	Globe,
	HandCoins,
	Home,
	IndianRupee,
	Landmark,
	Loader2,
	Pencil,
	PiggyBank,
	Plus,
	ShieldCheck,
	Trash2,
	TrendingUp,
	Wallet,
} from 'lucide-react';

import { useAccountsV2PageContext } from './context';

// ── Fade animation ─────────────────────────────────────────
const fadeUp = (delay: number) => ({
	initial: { opacity: 0, y: 10 },
	animate: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.35, ease: 'easeOut', delay },
	},
});

// ── Stat card ──────────────────────────────────────────────
function StatCard({
	icon: Icon,
	label,
	value,
	className,
}: {
	icon: React.ComponentType<{ className?: string }>;
	label: string;
	value: string;
	className?: string;
}) {
	return (
		<motion.div
			{...fadeUp(0.05)}
			className="rounded-xl border border-border/50 bg-card/60 p-4 backdrop-blur"
		>
			<div className="flex items-center gap-3">
				<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
					<Icon className="size-5" />
				</div>
				<div className="min-w-0">
					<p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
						{label}
					</p>
					<p className={cn('mt-0.5 text-lg font-semibold', className)}>
						{value}
					</p>
				</div>
			</div>
		</motion.div>
	);
}

// ── Category icons ─────────────────────────────────────────
const CATEGORY_ICONS: Record<
	string,
	React.ComponentType<{ className?: string }>
> = {
	bank: Landmark,
	credit: CreditCard,
	loan: HandCoins,
	investment: TrendingUp,
	wallet: Wallet,
	business: Building2,
	'lend-debt': HandCoins,
	foreign: Globe,
	tax: IndianRupee,
	insurance: ShieldCheck,
	'real-estate': Home,
	other: PiggyBank,
};

// ── Status badge variant ──────────────────────────────────
function getStatusVariant(
	status: string,
): 'default' | 'outline' | 'secondary' | 'destructive' {
	switch (status) {
		case 'active':
			return 'default';
		case 'dormant':
			return 'secondary';
		case 'closed':
			return 'outline';
		case 'frozen':
			return 'destructive';
		case 'defaulted':
			return 'destructive';
		case 'under-review':
			return 'secondary';
		default:
			return 'outline';
	}
}

// ── Main component ─────────────────────────────────────────
export function AccountsV2Page() {
	const { accounts, handleDelete, isSubmitting } = useAccountsV2PageContext();

	// Expand / collapse state per category
	const [expanded, setExpanded] = useState<Record<string, boolean>>(() => ({}));

	const grouped = useMemo(() => getAccountsByCategory(accounts), [accounts]);
	const categoryKeys = useMemo(() => Object.keys(grouped), [grouped]);

	// Expand first category by default
	const isExpanded = (cat: string) =>
		expanded[cat] ?? categoryKeys.indexOf(cat) === 0;

	const toggle = (cat: string) =>
		setExpanded((prev) => ({
			...prev,
			[cat]: !(prev[cat] ?? categoryKeys.indexOf(cat) === 0),
		}));

	// ── Summary stats ─────────────────────────────────────
	const stats = useMemo(() => {
		let assets = 0;
		let liabilities = 0;
		for (const acc of accounts) {
			if (
				acc.accountCategory === 'credit' ||
				acc.accountCategory === 'loan' ||
				acc.accountCategory === 'lend-debt'
			) {
				liabilities += Math.abs(acc.currentBalance);
			} else {
				assets += acc.currentBalance;
			}
		}
		return {
			totalAssets: assets,
			totalLiabilities: liabilities,
			netWorth: assets - liabilities,
			totalAccounts: accounts.length,
		};
	}, [accounts]);

	// ── Delete handler ────────────────────────────────────
	const [deletingId, setDeletingId] = useState<string | null>(null);

	const onDelete = async (id: string) => {
		setDeletingId(id);
		try {
			await handleDelete(id);
		} finally {
			setDeletingId(null);
		}
	};

	return (
		<div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
			{/* ── Summary cards ──────────────────────────────── */}
			<div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
				<StatCard
					icon={Landmark}
					label="Total Assets"
					value={formatCurrency(stats.totalAssets)}
					className="text-status-green"
				/>
				<StatCard
					icon={CreditCard}
					label="Total Liabilities"
					value={formatCurrency(stats.totalLiabilities)}
					className="text-status-red"
				/>
				<StatCard
					icon={TrendingUp}
					label="Net Worth"
					value={formatCurrency(stats.netWorth)}
					className={
						stats.netWorth >= 0 ? 'text-status-green' : 'text-status-red'
					}
				/>
				<StatCard
					icon={Wallet}
					label="Total Accounts"
					value={String(stats.totalAccounts)}
				/>
			</div>

			{/* ── Header ─────────────────────────────────────── */}
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-bold text-foreground">Accounts</h1>
					<p className="mt-0.5 text-sm text-muted-foreground">
						{stats.totalAccounts} account{stats.totalAccounts !== 1 ? 's' : ''}{' '}
						·{' '}
						<span
							className={
								stats.netWorth >= 0 ? 'text-status-green' : 'text-status-red'
							}
						>
							{formatCurrency(stats.netWorth)}
						</span>
					</p>
				</div>
				<Link to="/user/accounts-v2/add">
					<Button className="gap-2">
						<Plus className="size-4" />
						Add Account
					</Button>
				</Link>
			</div>

			{/* ── Accounts by category ──────────────────────── */}
			{categoryKeys.length === 0 && (
				<motion.div
					{...fadeUp(0.1)}
					className="flex flex-col items-center justify-center py-24 text-center"
				>
					<Wallet className="mb-4 size-12 text-muted-foreground" />
					<h3 className="text-lg font-semibold text-foreground">
						No accounts yet
					</h3>
					<p className="mt-1 max-w-sm text-sm text-muted-foreground">
						Add your first account to start tracking your finances.
					</p>
					<Link to="/user/accounts-v2/add" className="mt-6">
						<Button className="gap-2">
							<Plus className="size-4" />
							Add Account
						</Button>
					</Link>
				</motion.div>
			)}

			<AnimatePresence mode="popLayout">
				{categoryKeys.map((cat, ci) => {
					const items = grouped[cat];
					const catTotal = items.reduce((s, a) => s + a.currentBalance, 0);
					const Icon = CATEGORY_ICONS[cat] ?? Wallet;
					const color = CATEGORY_COLORS[cat] ?? 'text-muted-foreground';
					const open = isExpanded(cat);

					return (
						<motion.div
							key={cat}
							{...fadeUp(0.05 + ci * 0.05)}
							layout
							className="overflow-hidden rounded-xl border border-border/50 bg-card"
						>
							{/* ── Category header ──────── */}
							<button
								type="button"
								onClick={() => toggle(cat)}
								className="flex w-full items-center gap-3 px-5 py-4 text-left transition-colors hover:bg-muted/50"
							>
								<div
									className={cn(
										'flex size-9 items-center justify-center rounded-lg',
										color,
									)}
								>
									<Icon className="size-5" />
								</div>
								<div className="flex-1 min-w-0">
									<p className="font-semibold text-foreground">
										{CATEGORY_LABELS[cat] ?? cat}
									</p>
									<p className="text-xs text-muted-foreground">
										{items.length} account{items.length !== 1 ? 's' : ''}
									</p>
								</div>
								<p
									className={cn(
										'text-lg font-semibold',
										catTotal >= 0 ? 'text-foreground' : 'text-status-red',
									)}
								>
									{formatCurrency(catTotal)}
								</p>
								{open ? (
									<ChevronDown className="size-5 text-muted-foreground" />
								) : (
									<ChevronRight className="size-5 text-muted-foreground" />
								)}
							</button>

							{/* ── Table ─────────────────── */}
							<AnimatePresence initial={false}>
								{open && (
									<motion.div
										key="table"
										initial={{ height: 0, opacity: 0 }}
										animate={{ height: 'auto', opacity: 1 }}
										exit={{ height: 0, opacity: 0 }}
										transition={{ duration: 0.25, ease: 'easeInOut' }}
									>
										<Table>
											<TableHeader>
												<TableRow>
													<TableHead>Account</TableHead>
													<TableHead className="hidden sm:table-cell">
														Type
													</TableHead>
													<TableHead>Status</TableHead>
													<TableHead className="text-right">Balance</TableHead>
													<TableHead className="w-20 text-right">
														Actions
													</TableHead>
												</TableRow>
											</TableHeader>
											<TableBody>
												{items.map((acc) => {
													const typeItem = getAccountTypeItem(acc.accountType);
													return (
														<TableRow key={acc.id}>
															<TableCell className="font-medium">
																{acc.accountLabel}
																{acc.accountNickname && (
																	<span className="ml-1.5 text-xs text-muted-foreground">
																		({acc.accountNickname})
																	</span>
																)}
															</TableCell>
															<TableCell className="hidden sm:table-cell">
																<span className="text-xs text-muted-foreground">
																	{typeItem?.label ?? acc.accountType}
																</span>
															</TableCell>
															<TableCell>
																<Badge variant={getStatusVariant(acc.status)}>
																	{acc.status}
																</Badge>
															</TableCell>
															<TableCell
																className={cn(
																	'text-right font-medium tabular-nums',
																	acc.currentBalance >= 0
																		? 'text-status-green'
																		: 'text-status-red',
																)}
															>
																{formatCurrency(acc.currentBalance)}
															</TableCell>
															<TableCell className="text-right">
																<div className="flex items-center justify-end gap-1">
																	<Link
																		to="/user/accounts-v2/$id"
																		params={{ id: acc.id }}
																	>
																		<Button
																			variant="ghost"
																			size="icon"
																			className="size-8"
																		>
																			<Pencil className="size-4" />
																		</Button>
																	</Link>
																	<Button
																		variant="ghost"
																		size="icon"
																		className="size-8 text-muted-foreground hover:text-destructive"
																		disabled={isSubmitting || deletingId === acc.id}
																		onClick={() => onDelete(acc.id)}
																	>
																		{deletingId === acc.id ? (
																			<Loader2 className="size-4 animate-spin" />
																		) : (
																			<Trash2 className="size-4" />
																		)}
																	</Button>
																</div>
															</TableCell>
														</TableRow>
													);
												})}
											</TableBody>
										</Table>
									</motion.div>
								)}
							</AnimatePresence>
						</motion.div>
					);
				})}
			</AnimatePresence>
		</div>
	);
}
