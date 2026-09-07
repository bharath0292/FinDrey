import type { LucideIcon } from 'lucide-react';
import {
	BarChart3,
	CreditCard,
	PiggyBank,
	Plus,
	ReceiptText,
	Send,
	TrendingUp,
	Wallet,
} from 'lucide-react';

export interface StatItem {
	label: string;
	value: number;
	sub: string;
	icon: LucideIcon;
	up: boolean;
	prefix: string;
	dec: number;
}

export interface QuickActionItem {
	label: string;
	icon: LucideIcon;
}

export interface TransactionItem {
	name: string;
	amount: string;
	date: string;
	income: boolean;
}

export interface BillItem {
	name: string;
	amount: string;
	due: string;
	urgent: boolean;
}

export interface SpendingPoint {
	month: string;
	amount: number;
}

export interface PortfolioItem {
	name: string;
	label: string;
	value: number;
	color: string;
}

export interface BudgetItem {
	label: string;
	spent: number;
	total: number;
	color: string;
}

export const stats: StatItem[] = [
	{
		label: 'Balance',
		value: 24850,
		sub: '+2.4% this month',
		icon: Wallet,
		up: true,
		prefix: '$',
		dec: 2,
	},
	{
		label: 'Income',
		value: 5200,
		sub: 'June 2026',
		icon: TrendingUp,
		up: true,
		prefix: '$',
		dec: 2,
	},
	{
		label: 'Expenses',
		value: 3140,
		sub: '60.4% of income',
		icon: CreditCard,
		up: false,
		prefix: '$',
		dec: 2,
	},
	{
		label: 'Savings Rate',
		value: 39.6,
		sub: '$2,060 saved',
		icon: PiggyBank,
		up: true,
		prefix: '',
		dec: 1,
	},
];

export const quickActions: QuickActionItem[] = [
	{ label: 'Add Transaction', icon: Plus },
	{ label: 'Transfer', icon: Send },
	{ label: 'View Bills', icon: ReceiptText },
	{ label: 'Analytics', icon: BarChart3 },
];

export const recentActivity: TransactionItem[] = [
	{ name: 'Netflix', amount: '-$15.99', date: 'Jun 15', income: false },
	{ name: 'Salary', amount: '+$5,200.00', date: 'Jun 1', income: true },
	{ name: 'Groceries', amount: '-$84.20', date: 'Jun 14', income: false },
	{ name: 'Freelance', amount: '+$320.00', date: 'Jun 10', income: true },
];

export const upcomingBills: BillItem[] = [
	{ name: 'Rent', amount: '$1,200', due: 'Jun 30', urgent: true },
	{ name: 'Internet', amount: '$59', due: 'Jul 5', urgent: false },
	{ name: 'Gym', amount: '$45', due: 'Jul 10', urgent: false },
];

export const spendingData: SpendingPoint[] = [
	{ month: 'Jan', amount: 2800 },
	{ month: 'Feb', amount: 3100 },
	{ month: 'Mar', amount: 2600 },
	{ month: 'Apr', amount: 3400 },
	{ month: 'May', amount: 2950 },
	{ month: 'Jun', amount: 3140 },
];

export const portfolioData: PortfolioItem[] = [
	{ name: 'savings', label: 'Savings', value: 12400, color: 'var(--chart-1)' },
	{ name: 'investments', label: 'Investments', value: 7200, color: 'var(--chart-2)' },
	{ name: 'cash', label: 'Cash', value: 3800, color: 'var(--chart-3)' },
	{ name: 'assets', label: 'Assets', value: 1450, color: 'var(--chart-4)' },
];

export const budgets: BudgetItem[] = [
	{ label: 'Housing', spent: 1200, total: 1500, color: 'var(--chart-1)' },
	{ label: 'Food', spent: 420, total: 600, color: 'var(--chart-2)' },
	{ label: 'Transport', spent: 180, total: 300, color: 'var(--chart-3)' },
];
