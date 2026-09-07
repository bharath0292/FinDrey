import type { Notification } from './types';

const now = Date.now();
const MIN = 60_000;
const HOUR = 60 * MIN;
const DAY = 24 * HOUR;

export const MOCK_NOTIFICATIONS: Notification[] = [
	{
		id: 'n1',
		type: 'transaction',
		title: 'Payment Received',
		body: 'You received $240.00 from Sarah Chen for "Design sprint invoice".',
		timestamp: new Date(now - 12 * MIN),
		read: false,
	},
	{
		id: 'n2',
		type: 'alert',
		title: 'Unusual Activity Detected',
		body: 'A login attempt was made from a new device in Berlin, Germany.',
		timestamp: new Date(now - 37 * MIN),
		read: false,
		action: { label: 'Review', path: '/security' },
	},
	{
		id: 'n3',
		type: 'system',
		title: 'Sprint Complete',
		body: 'Budget allocation for Q3 has been finalized. Review the summary.',
		timestamp: new Date(now - 2 * HOUR),
		read: false,
		action: { label: 'View Summary', path: '/analytics' },
	},
	{
		id: 'n4',
		type: 'mention',
		title: 'Alex mentioned you',
		body: '@you in "Q4 Planning" — "Can you review the expense forecast?"',
		timestamp: new Date(now - 5 * HOUR),
		read: false,
	},
	{
		id: 'n5',
		type: 'reminder',
		title: 'Bill Due Tomorrow',
		body: 'Internet subscription renewal — $59.99 due by June 26.',
		timestamp: new Date(now - 8 * HOUR),
		read: true,
		action: { label: 'Pay Now', path: '/bills' },
	},
	{
		id: 'n6',
		type: 'transaction',
		title: 'Transfer Completed',
		body: '$1,200 transferred to Emergency Fund (•••• 4829).',
		timestamp: new Date(now - 1 * DAY),
		read: true,
	},
	{
		id: 'n7',
		type: 'system',
		title: 'Category Limit Alert',
		body: 'Dining category has reached 85% of monthly budget ($340/$400).',
		timestamp: new Date(now - 1.5 * DAY),
		read: true,
		action: { label: 'Adjust', path: '/categories' },
	},
	{
		id: 'n8',
		type: 'reminder',
		title: 'Subscription Renewal',
		body: 'FinDrey Pro plan renews in 3 days ($19.99/month).',
		timestamp: new Date(now - 2 * DAY),
		read: true,
	},
];