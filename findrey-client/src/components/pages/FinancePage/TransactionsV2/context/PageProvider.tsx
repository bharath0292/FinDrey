import {
	type ReactNode,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from 'react';

import { TransactionTypeV2 } from '@findrey/enums/transactionType-v2';
import type {
	ItemType,
	TransactionV2FormData,
} from '@findrey/schemas/transaction-v2';
import type { RootState } from '@findrey/store';

import { useRouterState } from '@tanstack/react-router';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { TransactionsV2PageContext } from './PageContext';
import type { TransactionsV2Page } from './types';

type ProviderProps = { children: ReactNode };

// ── Static / mock data ──────────────────────────────────────
const MOCK_ACCOUNTS: ItemType[] = [
	{ id: 'acc-1', label: 'HDFC Savings', group: 'Bank' },
	{ id: 'acc-2', label: 'ICICI Current', group: 'Bank' },
	{ id: 'acc-3', label: 'SBI Salary', group: 'Bank' },
	{ id: 'acc-4', label: 'Kotak Credit Card', group: 'Credit Card' },
	{ id: 'acc-5', label: 'Axis Credit Card', group: 'Credit Card' },
	{ id: 'acc-6', label: 'PhonePe Wallet', group: 'Wallet' },
	{ id: 'acc-7', label: 'Paytm Wallet', group: 'Wallet' },
	{ id: 'acc-8', label: 'Cash', group: 'Cash' },
	{ id: 'acc-9', label: 'Zerodha Trading', group: 'Investment' },
	{ id: 'acc-10', label: 'PPF Account', group: 'Investment' },
	{ id: 'acc-11', label: 'Mutual Fund Folio', group: 'Investment' },
	{ id: 'acc-12', label: 'Crypto Wallet', group: 'Investment' },
];

const MOCK_CATEGORIES: ItemType[] = [
	{ id: 'cat-1', label: 'Groceries', group: 'Daily' },
	{ id: 'cat-2', label: 'Rent', group: 'Housing' },
	{ id: 'cat-3', label: 'Electricity', group: 'Utilities' },
	{ id: 'cat-4', label: 'Internet', group: 'Utilities' },
	{ id: 'cat-5', label: 'Zomato/Swiggy', group: 'Food' },
	{ id: 'cat-6', label: 'Fuel', group: 'Transport' },
	{ id: 'cat-7', label: 'Insurance Premium', group: 'Insurance' },
	{ id: 'cat-8', label: 'Medical', group: 'Healthcare' },
	{ id: 'cat-9', label: 'School Fee', group: 'Education' },
	{ id: 'cat-10', label: 'Netflix', group: 'Entertainment' },
	{ id: 'cat-11', label: 'Salary', group: 'Income' },
	{ id: 'cat-12', label: 'Freelance Income', group: 'Income' },
	{ id: 'cat-13', label: 'Business Revenue', group: 'Business' },
	{ id: 'cat-14', label: 'Office Rent', group: 'Business' },
	{ id: 'cat-15', label: 'Employee Salary', group: 'Payroll' },
	{ id: 'cat-16', label: 'Equity Investment', group: 'Investment' },
	{ id: 'cat-17', label: 'Mutual Fund SIP', group: 'Investment' },
];

const MOCK_TAGS: ItemType[] = [
	{ id: 'tag-1', label: 'tax-saving' },
	{ id: 'tag-2', label: 'urgent' },
	{ id: 'tag-3', label: 'recurring' },
	{ id: 'tag-4', label: 'business-travel' },
	{ id: 'tag-5', label: 'personal' },
	{ id: 'tag-6', label: 'investment' },
	{ id: 'tag-7', label: 'home-office' },
	{ id: 'tag-8', label: 'medical-emergency' },
	{ id: 'tag-9', label: 'client-meeting' },
	{ id: 'tag-10', label: 'software-subscription' },
	{ id: 'tag-11', label: 'fuel' },
	{ id: 'tag-12', label: 'food-delivery' },
	{ id: 'tag-13', label: 'shopping-online' },
	{ id: 'tag-14', label: 'grocery' },
	{ id: 'tag-15', label: 'entertainment' },
	{ id: 'tag-16', label: 'health-insurance' },
	{ id: 'tag-17', label: 'rent' },
	{ id: 'tag-18', label: 'electricity-bill' },
	{ id: 'tag-19', label: 'internet-bill' },
	{ id: 'tag-20', label: 'education' },
	{ id: 'tag-21', label: 'gift' },
	{ id: 'tag-22', label: 'charity' },
	{ id: 'tag-23', label: 'travel' },
	{ id: 'tag-24', label: 'pet-care' },
	{ id: 'tag-25', label: 'fitness' },
];

// ── Transaction type → Sub-transaction type mapping ────────
function getSubTypesForType(transactionType: string): ItemType[] {
	const map: Record<string, string[]> = {
		[TransactionTypeV2.SALARY]: ['Salary', 'Bonus', 'Arrears'],
		[TransactionTypeV2.TRADING_PROFIT]: ['Intraday', 'Delivery', 'F&O'],
		[TransactionTypeV2.EMI]: [
			'EMI Monthly',
			'EMI Prepayment',
			'EMI Foreclosure',
		],
		[TransactionTypeV2.STOCK_BUY]: ['Delivery', 'Intraday'],
		[TransactionTypeV2.STOCK_SELL]: ['Delivery', 'Intraday'],
		[TransactionTypeV2.MUTUAL_FUND]: ['SIP', 'Lumpsum', 'SWP', 'STP'],
		[TransactionTypeV2.BUSINESS_EXPENSE]: [
			'Purchase',
			'Operating Cost',
			'Marketing',
		],
		[TransactionTypeV2.CREDIT_CARD_PAYMENT]: ['Full Payment', 'Minimum Due'],
	};

	const subtypes = map[transactionType] ?? [];
	return subtypes.map((s) => ({
		id: s.toLowerCase().replace(/\s+/g, '-'),
		label: s,
	}));
}

// ── Initial form data ───────────────────────────────────────
const EMPTY_FORM: TransactionV2FormData = {
	userId: '',
	transactionDate: new Date(),
	description: '',
	amount: 0,
	currency: 'INR',
	transactionType: '',
	creditAccount: '',
	debitAccount: '',
	status: 'completed',
	isFlagged: false,
	isRecurring: false,
	receiptAttached: false,
	tags: [],
};

// ── Transaction types as dropdown items ─────────────────────
const TRANSACTION_TYPE_ITEMS: ItemType[] = Object.entries(
	TransactionTypeV2,
).map(([, value]) => ({
	id: value,
	label: value,
}));

const PAYMENT_MODE_ITEMS: ItemType[] = [
	{ id: 'Cash', label: 'Cash' },
	{ id: 'UPI', label: 'UPI' },
	{ id: 'Debit Card', label: 'Debit Card' },
	{ id: 'Credit Card', label: 'Credit Card' },
	{ id: 'Net Banking', label: 'Net Banking' },
	{ id: 'Cheque', label: 'Cheque' },
	{ id: 'Wallet', label: 'Wallet' },
	{ id: 'Crypto', label: 'Crypto' },
	{ id: 'Auto Debit', label: 'Auto Debit' },
];

export const initialFormData = (userId: string): TransactionV2FormData => ({
	...EMPTY_FORM,
	userId,
});

// ── Mock transactions store ─────────────────────────────────
export let mockTransactions: TransactionV2FormData[] = [];

export function resetMockTransactions() {
	mockTransactions = [];
}

export function addMockTransaction(tx: TransactionV2FormData) {
	const entry = {
		...tx,
		id: uuidv4(),
		createdAt: new Date(),
		updatedAt: new Date(),
	};
	mockTransactions = [entry, ...mockTransactions];
	return entry;
}

export function updateMockTransaction(id: string, tx: TransactionV2FormData) {
	mockTransactions = mockTransactions.map((t) =>
		t.id === id ? { ...t, ...tx, updatedAt: new Date() } : t,
	);
}

export function deleteMockTransaction(id: string) {
	mockTransactions = mockTransactions.filter((t) => t.id !== id);
}

export function getMockTransaction(id: string) {
	return mockTransactions.find((t) => t.id === id);
}

export function TransactionsV2PageProvider({
	children,
}: Readonly<ProviderProps>) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const mode: 'add' | 'edit' | 'view' = pathname.endsWith('/add')
		? 'add'
		: pathname.includes('/transactions-v2/') && !pathname.endsWith('/add')
			? 'edit'
			: 'view';

	const userId = useSelector((state: RootState) => state.user.id);

	const [formData, setFormData] = useState<TransactionV2FormData>(
		initialFormData(userId),
	);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isFetching, setIsFetching] = useState(false);

	// Load existing transaction for edit mode
	useEffect(() => {
		if (mode === 'edit') {
			const id = pathname.split('/').pop();
			if (id) {
				setIsFetching(true);
				const tx = getMockTransaction(id);
				if (tx) {
					setFormData({ ...tx });
				}
				setIsFetching(false);
			}
		} else {
			setFormData(initialFormData(userId));
		}
	}, [pathname, userId, mode]);

	const setFormField = useCallback(
		<K extends keyof TransactionV2FormData>(
			field: K,
			value: TransactionV2FormData[K],
		) => {
			setFormData((prev) => ({ ...prev, [field]: value }));
		},
		[],
	);

	const handleTransactionTypeChange = useCallback(
		(transactionType: string) => {
			setFormField('transactionType', transactionType);
		},
		[setFormField],
	);

	const handleSubmit = useCallback(async () => {
		setIsSubmitting(true);
		try {
			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 500));

			addMockTransaction(formData);
			setIsSubmitting(false);
		} catch {
			setIsSubmitting(false);
		}
	}, [formData]);

	const handleDelete = useCallback(async (id: string) => {
		deleteMockTransaction(id);
	}, []);

	const validateForm = useCallback(() => {
		return (
			formData.transactionDate instanceof Date &&
			formData.description.length > 0 &&
			formData.amount > 0 &&
			formData.transactionType.length > 0 &&
			formData.creditAccount.length > 0 &&
			formData.debitAccount.length > 0
		);
	}, [formData]);

	const subTransactionTypeItems = useMemo(
		() => getSubTypesForType(formData.transactionType),
		[formData.transactionType],
	);

	const value: TransactionsV2Page = useMemo(
		() => ({
			userId,
			isLoading: false,
			isError: false,
			formData,
			isSubmitting,
			isFetching,
			transactionTypeItems: TRANSACTION_TYPE_ITEMS,
			subTransactionTypeItems,
			creditAccountItems: MOCK_ACCOUNTS,
			debitAccountItems: MOCK_ACCOUNTS,
			categoryItems: MOCK_CATEGORIES,
			tagItems: MOCK_TAGS,
			paymentModeItems: PAYMENT_MODE_ITEMS,
			setFormField,
			handleTransactionTypeChange,
			handleSubmit,
			handleDelete,
			validateForm,
			mode,
		}),
		[
			userId,
			formData,
			isSubmitting,
			isFetching,
			subTransactionTypeItems,
			setFormField,
			handleTransactionTypeChange,
			handleSubmit,
			handleDelete,
			validateForm,
			mode,
		],
	);

	return (
		<TransactionsV2PageContext.Provider value={value}>
			{children}
		</TransactionsV2PageContext.Provider>
	);
}
