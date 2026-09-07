import { type ReactNode, useCallback, useMemo, useState } from 'react';

import {
	ACCOUNT_TYPE_ITEMS,
	MOCK_ACCOUNTS,
	OWNERSHIP_TYPE_ITEMS,
	STATUS_ITEMS,
} from '@findrey/lib/accounts-v2';
import type { AccountV2FormData } from '@findrey/schemas/account-v2';

import { useNavigate } from '@tanstack/react-router';

import { AccountsV2PageContext } from './PageContext';

// ── Default empty form ─────────────────────────────────────
function getDefaultFormData(): AccountV2FormData {
	return {
		id: '',
		userId: 'user-1',
		accountCategory: 'bank',
		accountType: 'savings',
		accountLabel: '',
		currency: 'INR',
		currentBalance: 0,
		openingBalance: 0,
		status: 'active',
		isPrimary: false,
		ownershipType: 'individual',
		tags: [],
		alertPreferences: {},
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	};
}

// ── Props ───────────────────────────────────────────────────
interface PageProviderProps {
	children: ReactNode;
}

export function AccountsV2PageProvider({ children }: PageProviderProps) {
	const navigate = useNavigate();

	// ── State ──────────────────────────────────────────────────
	const [accounts, setAccounts] = useState<AccountV2FormData[]>(MOCK_ACCOUNTS);
	const [formData, setFormData] = useState<AccountV2FormData>(
		getDefaultFormData(),
	);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isFetching] = useState(false);

	// ── Mode ───────────────────────────────────────────────────
	const mode: 'add' | 'edit' | 'view' = formData.id ? 'edit' : 'add';

	// ── Form field setter ──────────────────────────────────────
	const setFormField = useCallback(
		<K extends keyof AccountV2FormData>(
			field: K,
			value: AccountV2FormData[K],
		) => {
			setFormData((prev) => ({ ...prev, [field]: value }));
		},
		[],
	);

	// ── Validate ──────────────────────────────────────────────
	const validateForm = useCallback((): boolean => {
		return true; // Will be enhanced with Zod when TanStack Form is fully integrated
	}, []);

	// ── Submit ─────────────────────────────────────────────────
	const handleSubmit = useCallback(async () => {
		if (!validateForm()) return;
		setIsSubmitting(true);
		try {
			await new Promise((resolve) => setTimeout(resolve, 600));
			const now = new Date().toISOString();

			if (formData.id) {
				setAccounts((prev) =>
					prev.map((a) =>
						a.id === formData.id ? { ...formData, updatedAt: now } : a,
					),
				);
			} else {
				const newAccount = {
					...formData,
					id: `acc-${Date.now()}`,
					createdAt: now,
					updatedAt: now,
				};
				setAccounts((prev) => [...prev, newAccount]);
			}

			navigate({ to: '/user/accounts-v2' });
		} finally {
			setIsSubmitting(false);
		}
	}, [formData, validateForm, navigate]);

	// ── Delete ─────────────────────────────────────────────────
	const handleDelete = useCallback(async (id: string) => {
		setIsSubmitting(true);
		try {
			await new Promise((resolve) => setTimeout(resolve, 400));
			setAccounts((prev) => prev.filter((a) => a.id !== id));
		} finally {
			setIsSubmitting(false);
		}
	}, []);
	// ── Reset form ─────────────────────────────────────────────
	const resetForm = useCallback(() => {
		setFormData(getDefaultFormData());
	}, []);

	// ── Load account into form (for edit) ──────────────────────
	const loadAccount = useCallback(
		(id: string) => {
			const account = accounts.find((a) => a.id === id);
			if (account) {
				setFormData({ ...account });
			}
		},
		[accounts],
	);

	// ── Context value ──────────────────────────────────────────
	const value = useMemo(
		() => ({
			userId: 'user-1',
			isLoading: false,
			isError: false,
			formData,
			isSubmitting,
			isFetching,
			accounts,
			accountTypeItems: ACCOUNT_TYPE_ITEMS,
			ownershipTypeItems: OWNERSHIP_TYPE_ITEMS,
			statusItems: STATUS_ITEMS,
			setFormField,
			handleSubmit,
			handleDelete,
			validateForm,
			resetForm,
			loadAccount,
			mode,
		}),
		[
			formData,
			isSubmitting,
			isFetching,
			accounts,
			setFormField,
			handleSubmit,
			handleDelete,
			validateForm,
			resetForm,
			loadAccount,
			mode,
		],
	);

	return (
		<AccountsV2PageContext value={value}>{children}</AccountsV2PageContext>
	);
}

// Re-export context hook
export { useAccountsV2PageContext } from './useAccountsV2PageContext';
