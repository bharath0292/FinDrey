import type { transactionV2Schema } from '@findrey/schemas/transaction-v2';

import type { z } from 'zod';

export type TransactionV2Type = z.infer<typeof transactionV2Schema>;

// ── Static data for form dropdowns ──────────────────────────
export interface ItemType {
  id: string;
  label: string;
  group?: string;
}

export type FieldState = 'info' | 'success' | 'warning' | 'error';