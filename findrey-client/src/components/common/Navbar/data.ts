import {
	BarChart3,
	Bot,
	CreditCard,
	Download,
	Landmark,
	LayoutDashboard,
	PieChart,
	PiggyBank,
	RefreshCcw,
	SlidersHorizontal,
	Tags,
} from 'lucide-react';

import type { NavGroup, NavItem } from './types';

export function isActive(pathname: string, path: string) {
	if (path === '/') return pathname === '/';
	return pathname.startsWith(path);
}

export const NAV_GROUPS: NavGroup[] = [
	{
		id: 'main',
		label: null,
		items: [
			{
				icon: LayoutDashboard,
				label: 'Dashboard',
				path: '/',
				match: (p) => isActive(p, '/'),
			},
		],
	},
	{
		id: 'financial',
		label: 'Financial Control',
		items: [
			{
				icon: PieChart,
				label: 'Budgets',
				path: '/budget',
				match: (p) => isActive(p, '/budget'),
			},
			{
				icon: RefreshCcw,
				label: 'Subscriptions',
				path: '/subscriptions',
				match: (p) => isActive(p, '/subscriptions'),
			},
			{
				icon: PiggyBank,
				label: 'Piggy Banks',
				path: '/piggy-banks',
				match: (p) => isActive(p, '/piggy-banks'),
			},
		],
	},
	{
		id: 'accounting',
		label: 'Accounting',
		items: [
			{
				icon: CreditCard,
				label: 'Transactions',
				path: '/finance/transactions',
				match: (p) => isActive(p, '/finance/transactions'),
			},
			{
				icon: RefreshCcw,
				label: 'Transactions V2',
				path: '/finance/transactions-v2',
				match: (p) => isActive(p, '/finance/transactions-v2'),
			},
			{
				icon: Bot,
				label: 'Automation',
				path: '/automation',
				match: (p) => isActive(p, '/automation'),
			},
		],
	},
	{
		id: 'others',
		label: 'Others',
		items: [
			{
				icon: Landmark,
				label: 'Accounts',
				path: '/user/accounts',
				match: (p) => isActive(p, '/user/accounts'),
			},
			{
				icon: Landmark,
				label: 'Accounts V2',
				path: '/user/accounts-v2',
				match: (p) => isActive(p, '/user/accounts'),
			},
			{
				icon: Tags,
				label: 'Classification',
				path: '/user/categories',
				match: (p) => isActive(p, '/user/categories'),
			},
			{
				icon: BarChart3,
				label: 'Reports',
				path: '/analytics',
				match: (p) => isActive(p, '/analytics'),
			},
			{
				icon: Download,
				label: 'Export Data',
				path: '/export',
				match: (p) => isActive(p, '/export'),
			},
			{
				icon: SlidersHorizontal,
				label: 'Options',
				path: '/options',
				match: (p) => isActive(p, '/options'),
			},
		],
	},
];

export const MOBILE_PINNED: NavItem[] = [
	{
		icon: LayoutDashboard,
		label: 'Dashboard',
		path: '/',
		match: (p) => isActive(p, '/'),
	},
	{
		icon: CreditCard,
		label: 'Transactions',
		path: '/finance/transactions',
		match: (p) => isActive(p, '/finance/transactions'),
	},
	{
		icon: PieChart,
		label: 'Budgets',
		path: '/budget',
		match: (p) => isActive(p, '/budget'),
	},
	{
		icon: BarChart3,
		label: 'Reports',
		path: '/analytics',
		match: (p) => isActive(p, '/analytics'),
	},
];
