import type { accountV2Schema } from '@findrey/schemas/account-v2';
import type { z } from 'zod';

export type AccountV2Type = z.infer<typeof accountV2Schema>;

// ── Static data for form dropdowns ──────────────────────────
export interface ItemType {
  id: string;
  label: string;
  group?: string;
  subtext?: string;
}

export type FieldState = 'info' | 'success' | 'warning' | 'error';

// ── Account category groups ─────────────────────────────────
export type AccountCategory =
  | 'bank'
  | 'credit'
  | 'investment'
  | 'wallet'
  | 'loan'
  | 'business'
  | 'lend-debt'
  | 'foreign'
  | 'tax'
  | 'insurance'
  | 'real-estate'
  | 'other';

export type AccountStatus =
  | 'active'
  | 'dormant'
  | 'closed'
  | 'frozen'
  | 'defaulted'
  | 'under-review';