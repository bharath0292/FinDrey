import { useCallback, useDeferredValue, useMemo, useState } from 'react';

import { Badge } from '@findrey/components/ui/badge';
import { Button } from '@findrey/components/ui/button';
import { Input } from '@findrey/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@findrey/components/ui/select';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@findrey/components/ui/table';
import { TransactionTypeV2 } from '@findrey/enums/transactionType-v2';
import { cn } from '@findrey/lib/utils';
import type { TransactionV2FormData } from '@findrey/schemas/transaction-v2';

import { Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import {
	ChevronLeft,
	ChevronRight,
	Eye,
	Pencil,
	Plus,
	Search,
	Trash2,
} from 'lucide-react';

import { mockTransactions as _mockTransactions } from './context/PageProvider';

// ── Helpers ────────────────────────────────────────────────

function getTransactionClass(tx: TransactionV2FormData): {
	color: string;
	label: string;
} {
	const { transactionType } = tx;

	if (INCOME_TYPES[transactionType])
		return {
			color: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
			label: 'Income',
		};
	if (EXPENSE_TYPES[transactionType])
		return {
			color: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
			label: 'Expense',
		};
	if (TRANSFER_TYPES[transactionType])
		return {
			color: 'bg-sky-500/15 text-sky-400 border-sky-500/30',
			label: 'Transfer',
		};
	if (INVEST_TYPES[transactionType])
		return {
			color: 'bg-violet-500/15 text-violet-400 border-violet-500/30',
			label: 'Investment',
		};
	if (LEND_TYPES[transactionType])
		return {
			color: 'bg-orange-500/15 text-orange-400 border-orange-500/30',
			label: 'Lend/Debt',
		};

	return {
		color: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
		label: 'EMI/Loan',
	};
}

const STATUS_VARIANTS: Record<
	string,
	'default' | 'outline' | 'destructive' | 'secondary'
> = {
	completed: 'default',
	pending: 'secondary',
	cancelled: 'outline',
	flagged: 'destructive',
	reconciled: 'default',
};

function formatDate(date: Date | string | undefined): string {
	if (!date) return '—';
	const d = typeof date === 'string' ? new Date(date) : date;
	return d.toLocaleDateString('en-IN', {
		day: '2-digit',
		month: 'short',
		year: 'numeric',
	});
}

function formatAmount(amount: number, currency = 'INR'): string {
	return new Intl.NumberFormat('en-IN', {
		style: 'currency',
		currency,
		maximumFractionDigits: 2,
	}).format(amount);
}

// ── Stat card ──────────────────────────────────────────────
function StatCard({
	label,
	value,
	className,
}: {
	label: string;
	value: string;
	className?: string;
}) {
	return (
		<div className="rounded-xl border border-border/50 bg-card/60 p-4 backdrop-blur">
			<p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
				{label}
			</p>
			<p className={cn('mt-1 text-lg font-semibold', className)}>{value}</p>
		</div>
	);
}

// ── Page numbers ───────────────────────────────────────────
function getPageNumbers(current: number, total: number): (number | '...')[] {
	if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
	const pages: (number | '...')[] = [1];
	if (current > 3) pages.push('...');
	const start = Math.max(2, current - 1);
	const end = Math.min(total - 1, current + 1);
	for (let i = start; i <= end; i++) pages.push(i);
	if (current < total - 2) pages.push('...');
	pages.push(total);
	return pages;
}

// ── Main component ─────────────────────────────────────────
export function TransactionsV2Page() {
	// Search + filter state
	const [query, setQuery] = useState('');
	const deferredQuery = useDeferredValue(query);
	const [typeFilter, setTypeFilter] = useState('all');
	const [statusFilter, setStatusFilter] = useState('all');
	const [dateFrom, setDateFrom] = useState('');
	const [dateTo, setDateTo] = useState('');
	const [page, setPage] = useState(1);
	const perPage = 10;

	// Sort
	type SortKey = 'transactionDate' | 'amount' | 'description' | 'status';
	type SortDir = 'asc' | 'desc';
	const [sortKey, setSortKey] = useState<SortKey>('transactionDate');
	const [sortDir, setSortDir] = useState<SortDir>('desc');

	const handleSort = useCallback(
		(key: SortKey) => {
			if (sortKey === key) {
				setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
			} else {
				setSortKey(key);
				setSortDir('desc');
			}
			setPage(1);
		},
		[sortKey],
	);

	// ── Filtered + sorted data ────────────────────────────
	const filtered = useMemo(() => {
		let items = [..._mockTransactions];

		if (deferredQuery.trim()) {
			const q = deferredQuery.trim().toLowerCase();
			items = items.filter(
				(tx) =>
					(tx.description?.toLowerCase().includes(q) ?? false) ||
					(tx.transactionType?.toLowerCase().includes(q) ?? false) ||
					(tx.notes?.toLowerCase().includes(q) ?? false) ||
					(tx.merchantName?.toLowerCase().includes(q) ?? false),
			);
		}

		if (typeFilter !== 'all') {
			items = items.filter((tx) => tx.transactionType === typeFilter);
		}
		if (statusFilter !== 'all') {
			items = items.filter((tx) => tx.status === statusFilter);
		}
		if (dateFrom) {
			const from = new Date(dateFrom);
			items = items.filter((tx) => new Date(tx.transactionDate) >= from);
		}
		if (dateTo) {
			const to = new Date(dateTo);
			to.setHours(23, 59, 59, 999);
			items = items.filter((tx) => new Date(tx.transactionDate) <= to);
		}

		items.sort((a, b) => {
			let cmp = 0;
			if (sortKey === 'amount') cmp = a.amount - b.amount;
			else if (sortKey === 'transactionDate')
				cmp =
					new Date(a.transactionDate).getTime() -
					new Date(b.transactionDate).getTime();
			else if (sortKey === 'description')
				cmp = (a.description ?? '').localeCompare(b.description ?? '');
			else if (sortKey === 'status')
				cmp = (a.status ?? '').localeCompare(b.status ?? '');
			return sortDir === 'asc' ? cmp : -cmp;
		});

		return items;
	}, [
		deferredQuery,
		typeFilter,
		statusFilter,
		dateFrom,
		dateTo,
		sortKey,
		sortDir,
	]);

	// ── Stats ─────────────────────────────────────────────
	const stats = useMemo(() => {
		let income = 0;
		let expense = 0;
		for (const tx of filtered) {
			const cls = getTransactionClass(tx).color;
			if (cls.includes('emerald')) income += tx.amount;
			else if (cls.includes('rose')) expense += tx.amount;
		}
		return { total: filtered.length, income, expense, net: income - expense };
	}, [filtered]);

	// ── Pagination ────────────────────────────────────────
	const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
	const safePage = Math.min(page, totalPages);
	const paginated = useMemo(
		() => filtered.slice((safePage - 1) * perPage, safePage * perPage),
		[filtered, safePage],
	);

	// ── Unique types for dropdown ─────────────────────────
	const typeOptions = useMemo(() => {
		const set = new Set(_mockTransactions.map((t) => t.transactionType));
		return Array.from(set).sort();
	}, []);

	return (
		<div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
			{/* ── Header ─────────────────────────────────────── */}
			<div className="flex items-center justify-between">
				<h1 className="text-2xl font-bold text-foreground">Transactions V2</h1>
				<Link to="/finance/transactions-v2/add">
					<Button className="gap-2">
						<Plus className="size-4" />
						Add Transaction
					</Button>
				</Link>
			</div>

			{/* ── Search + Filters ───────────────────────────── */}
			<div className="space-y-3">
				<div className="relative">
					<Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
					<Input
						value={query}
						onChange={(e) => {
							setQuery(e.target.value);
							setPage(1);
						}}
						placeholder="Search transactions..."
						className="pl-10"
					/>
				</div>

				<div className="flex flex-wrap gap-3">
					<Select
						value={typeFilter}
						onValueChange={(v) => {
							setTypeFilter(v);
							setPage(1);
						}}
					>
						<SelectTrigger className="w-40">
							<SelectValue placeholder="All Types" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Types</SelectItem>
							{typeOptions.map((t) => (
								<SelectItem key={t} value={t}>
									{t}
								</SelectItem>
							))}
						</SelectContent>
					</Select>

					<Select
						value={statusFilter}
						onValueChange={(v) => {
							setStatusFilter(v);
							setPage(1);
						}}
					>
						<SelectTrigger className="w-36">
							<SelectValue placeholder="All Status" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Status</SelectItem>
							<SelectItem value="completed">Completed</SelectItem>
							<SelectItem value="pending">Pending</SelectItem>
							<SelectItem value="cancelled">Cancelled</SelectItem>
							<SelectItem value="flagged">Flagged</SelectItem>
							<SelectItem value="reconciled">Reconciled</SelectItem>
						</SelectContent>
					</Select>

					<Input
						type="date"
						value={dateFrom}
						onChange={(e) => {
							setDateFrom(e.target.value);
							setPage(1);
						}}
						className="w-36"
						aria-label="Date from"
					/>
					<Input
						type="date"
						value={dateTo}
						onChange={(e) => {
							setDateTo(e.target.value);
							setPage(1);
						}}
						className="w-36"
						aria-label="Date to"
					/>
				</div>
			</div>

			{/* ── Stats bar ──────────────────────────────────── */}
			<div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
				<StatCard label="Total" value={stats.total.toLocaleString('en-IN')} />
				<StatCard
					label="Income"
					value={formatAmount(stats.income)}
					className="text-emerald-400"
				/>
				<StatCard
					label="Expense"
					value={formatAmount(stats.expense)}
					className="text-rose-400"
				/>
				<StatCard
					label="Net Balance"
					value={formatAmount(stats.net)}
					className={stats.net >= 0 ? 'text-emerald-400' : 'text-rose-400'}
				/>
			</div>

			{/* ── Table (desktop) ────────────────────────────── */}
			<motion.div
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				className="hidden overflow-hidden rounded-2xl border border-border/50 bg-card/60 shadow-sm backdrop-blur sm:block"
			>
				<Table>
					<TableHeader>
						<TableRow>
							{(
								[
									['transactionDate', 'Date'],
									['type', 'Type'],
									['description', 'Description'],
									['accounts', 'Accounts'],
									['amount', 'Amount'],
									['status', 'Status'],
								] as const
							).map(([key, label]) => (
								<TableHead
									key={key}
									className={cn(
										'cursor-pointer select-none text-xs font-semibold uppercase tracking-wider',
										key !== 'accounts' &&
											key !== 'type' &&
											'hover:text-foreground',
									)}
									onClick={() => {
										if (key !== 'accounts' && key !== 'type') {
											handleSort(key as SortKey);
										}
									}}
								>
									<span className="flex items-center gap-1">
										{label}
										{sortKey === key && (
											<span className="text-[10px]">
												{sortDir === 'asc' ? '\u2191' : '\u2193'}
											</span>
										)}
									</span>
								</TableHead>
							))}
							<TableHead className="text-right text-xs font-semibold uppercase tracking-wider">
								Actions
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{paginated.length === 0 ? (
							<TableRow>
								<TableCell
									colSpan={7}
									className="py-12 text-center text-sm text-muted-foreground"
								>
									No transactions found.
								</TableCell>
							</TableRow>
						) : (
							paginated.map((tx) => (
								<TableRow key={tx.id} className="group">
									<TableCell className="font-mono text-xs">
										{formatDate(tx.transactionDate)}
									</TableCell>
									<TableCell>
										<Badge
											variant="outline"
											className={cn(
												'whitespace-nowrap border text-[11px] font-medium',
												getTransactionClass(tx).color,
											)}
										>
											{tx.transactionType}
										</Badge>
									</TableCell>
									<TableCell className="max-w-[200px] truncate">
										{tx.description}
									</TableCell>
									<TableCell className="max-w-[180px] truncate text-xs text-muted-foreground">
										{tx.debitAccount && tx.creditAccount
											? `${tx.debitAccount.slice(0, 12)} → ${tx.creditAccount.slice(0, 12)}`
											: '—'}
									</TableCell>
									<TableCell className="font-mono text-sm font-medium">
										{formatAmount(tx.amount, tx.currency)}
									</TableCell>
									<TableCell>
										<Badge
											variant={STATUS_VARIANTS[tx.status ?? ''] ?? 'outline'}
										>
											{tx.status}
										</Badge>
									</TableCell>
									<TableCell className="text-right">
										<div className="flex items-center justify-end gap-1 opacity-0 transition-opacity group-hover:opacity-100">
											<Link
												to="/finance/transactions-v2/$id"
												params={{ id: tx.id ?? '' }}
											>
												<Button variant="ghost" size="icon-sm" title="View">
													<Eye className="size-3.5" />
												</Button>
											</Link>
											<Link
												to="/finance/transactions-v2/$id"
												params={{ id: tx.id ?? '' }}
											>
												<Button variant="ghost" size="icon-sm" title="Edit">
													<Pencil className="size-3.5" />
												</Button>
											</Link>
											<Button
												variant="ghost"
												size="icon-sm"
												title="Delete"
												className="text-destructive hover:text-destructive"
											>
												<Trash2 className="size-3.5" />
											</Button>
										</div>
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</motion.div>

			{/* ── Mobile cards ──────────────────────────────── */}
			<div className="space-y-3 sm:hidden">
				{paginated.length === 0 ? (
					<p className="py-12 text-center text-sm text-muted-foreground">
						No transactions found.
					</p>
				) : (
					paginated.map((tx, i) => (
						<motion.div
							key={tx.id}
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: i * 0.03 }}
							className="rounded-xl border border-border/50 bg-card/60 p-4 backdrop-blur"
						>
							<div className="flex items-start justify-between">
								<div>
									<p className="text-xs text-muted-foreground">
										{formatDate(tx.transactionDate)}
									</p>
									<p className="mt-0.5 text-sm font-medium text-foreground">
										{tx.description}
									</p>
								</div>
								<Badge
									variant="outline"
									className={cn('text-xs', getTransactionClass(tx).color)}
								>
									{tx.transactionType}
								</Badge>
							</div>

							<div className="mt-2 flex items-center justify-between">
								<span className="font-mono text-base font-semibold">
									{formatAmount(tx.amount, tx.currency)}
								</span>
								<Badge
									variant={STATUS_VARIANTS[tx.status ?? ''] ?? 'outline'}
									className="text-[10px]"
								>
									{tx.status}
								</Badge>
							</div>

							<div className="mt-3 flex items-center gap-2">
								<Link
									to="/finance/transactions-v2/$id"
									params={{ id: tx.id ?? '' }}
								>
									<Button variant="ghost" size="icon-sm">
										<Eye className="size-3.5" />
									</Button>
								</Link>
								<Link
									to="/finance/transactions-v2/$id"
									params={{ id: tx.id ?? '' }}
								>
									<Button variant="ghost" size="icon-sm">
										<Pencil className="size-3.5" />
									</Button>
								</Link>
								<Button
									variant="ghost"
									size="icon-sm"
									className="text-destructive"
								>
									<Trash2 className="size-3.5" />
								</Button>
							</div>
						</motion.div>
					))
				)}
			</div>

			{/* ── Pagination ─────────────────────────────────── */}
			{totalPages > 1 && (
				<div className="flex items-center justify-center gap-2">
					<Button
						variant="outline"
						size="sm"
						disabled={safePage <= 1}
						onClick={() => setPage((p) => Math.max(1, p - 1))}
					>
						<ChevronLeft className="size-4" />
						Prev
					</Button>

					{getPageNumbers(safePage, totalPages).map((p) =>
						p === '...' ? (
							<span key="ellipsis" className="px-1 text-muted-foreground">
								...
							</span>
						) : (
							<Button
								key={p}
								variant={safePage === p ? 'default' : 'outline'}
								size="sm"
								className="min-w-8"
								onClick={() => setPage(p as number)}
							>
								{p}
							</Button>
						),
					)}

					<Button
						variant="outline"
						size="sm"
						disabled={safePage >= totalPages}
						onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
					>
						Next
						<ChevronRight className="size-4" />
					</Button>
				</div>
			)}
		</div>
	);
}
