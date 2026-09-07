import type { AccountTypeItem } from '@findrey/lib/accounts-v2';
import type { AccountV2FormData } from '@findrey/schemas/account-v2';
import type { ItemType } from '@findrey/types/account-v2';

export interface AccountsV2Page {
	userId: string;
	isLoading: boolean;
	isError: boolean;

	// Form state
	formData: AccountV2FormData;
	isSubmitting: boolean;
	isFetching: boolean;

	// Account list
	accounts: AccountV2FormData[];

	// Dropdown options
	accountTypeItems: AccountTypeItem[];
	ownershipTypeItems: ItemType[];
	statusItems: (ItemType & { color?: string })[];

	// Actions
	setFormField: <K extends keyof AccountV2FormData>(
		field: K,
		value: AccountV2FormData[K],
	) => void;
	handleSubmit: () => Promise<void>;
	handleDelete: (id: string) => Promise<void>;
	validateForm: () => boolean;
	resetForm: () => void;
	loadAccount: (id: string) => void;

	// Mode
	mode: 'add' | 'edit' | 'view';
}

/**
 * Types for AccountsV2 page context.
 * Uses static/mock data — replace with React Query when backend is ready.
 */
