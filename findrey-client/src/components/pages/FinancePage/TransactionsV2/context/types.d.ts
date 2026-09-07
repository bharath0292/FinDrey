import type { TransactionV2FormData } from '@findrey/schemas/transaction-v2';
import type { ItemType } from '@findrey/types/transaction-v2';

export interface TransactionsV2Page {
  userId: string;
  isLoading: boolean;
  isError: boolean;

  // Form state
  formData: TransactionV2FormData;
  isSubmitting: boolean;
  isFetching: boolean;

  // Dropdown options
  transactionTypeItems: ItemType[];
  subTransactionTypeItems: ItemType[];
  creditAccountItems: ItemType[];
  debitAccountItems: ItemType[];
  categoryItems: ItemType[];
  tagItems: ItemType[];
  paymentModeItems: ItemType[];

  // Actions
  setFormField: <K extends keyof TransactionV2FormData>(
    field: K,
    value: TransactionV2FormData[K],
  ) => void;
  handleTransactionTypeChange: (transactionType: string) => void;
  handleSubmit: () => Promise<void>;
  handleDelete: (id: string) => Promise<void>;
  validateForm: () => boolean;

  // Mode
  mode: 'add' | 'edit' | 'view';
} /**
 * Types for TransactionsV2 page context.
 * Uses static/mock data — replace with React Query when backend is ready.
 */