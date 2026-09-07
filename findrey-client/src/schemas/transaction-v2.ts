import { z } from 'zod';

import { ObjectId } from './_schemas';

// ── Recurring / EMI ─────────────────────────────────────────
const recurringSchema = z.object({
  isRecurring: z.boolean().default(false),
  frequency: z
    .enum(['daily', 'weekly', 'monthly', 'quarterly', 'half-yearly', 'yearly'])
    .optional(),
  nextDate: z.date().optional(),
  endDate: z.date().optional(),
  installmentsTotal: z.number().int().positive().optional(),
  installmentsPaid: z.number().int().min(0).default(0),
});

const emiSchema = z.object({
  loanPrincipal: z.number().nonnegative().optional(),
  interestRate: z.number().nonnegative().optional(),
  tenureMonths: z.number().int().positive().optional(),
  emiAmount: z.number().nonnegative().optional(),
  lenderName: z.string().optional(),
  loanAccountNumber: z.string().optional(),
});

// ── Tax / Fee ───────────────────────────────────────────────
const taxFeeSchema = z.object({
  taxableAmount: z.number().nonnegative().optional(),
  taxAmount: z.number().nonnegative().optional(),
  taxRate: z.number().nonnegative().optional(),
  feeAmount: z.number().nonnegative().optional(),
  feeDescription: z.string().optional(),
  tdsAmount: z.number().nonnegative().optional(),
  gstAmount: z.number().nonnegative().optional(),
  brokerageAmount: z.number().nonnegative().optional(),
});

// ── Investment / Trading ────────────────────────────────────
const investmentSchema = z.object({
  quantity: z.number().nonnegative().optional(),
  unitPrice: z.number().nonnegative().optional(),
  tickerSymbol: z.string().optional(),
  exchange: z.string().optional(),
  tradeDate: z.date().optional(),
  settlementDate: z.date().optional(),
  brokerName: z.string().optional(),
  totalInvested: z.number().nonnegative().optional(),
  currentValue: z.number().nonnegative().optional(),
  profitLoss: z.number().optional(),
  assetClass: z
    .enum([
      'equity',
      'mutual_fund',
      'crypto',
      'gold',
      'real_estate',
      'fixed_deposit',
      'recurring_deposit',
      'bonds',
      'nps',
      'ppf',
      'other',
    ])
    .optional(),
});

// ── Lending / Debt ──────────────────────────────────────────
const lendingDebtSchema = z.object({
  counterpartyName: z.string().optional(),
  counterpartyContact: z.string().optional(),
  dueDate: z.date().optional(),
  interestRate: z.number().nonnegative().optional(),
  collateral: z.string().optional(),
  agreementRef: z.string().optional(),
  isSettled: z.boolean().default(false),
  settledDate: z.date().optional(),
});

// ── Split / Shared ──────────────────────────────────────────
const splitSchema = z.object({
  isSplit: z.boolean().default(false),
  totalAmount: z.number().nonnegative().optional(),
  myShare: z.number().nonnegative().optional(),
  participants: z.array(z.string()).optional(),
  settled: z.boolean().default(false),
});

// ── Main Transaction Schema ─────────────────────────────────
export const transactionV2Schema = z.object({
  // Core
  id: z.string().optional(),
  userId: ObjectId,
  transactionDate: z.date(),
  description: z.string().min(1, 'Description is required'),
  notes: z.string().optional(),

  // Amount
  amount: z.number().nonnegative('Amount must be positive'),
  currency: z.string().default('INR'),
  exchangeRate: z.number().positive().optional(),

  // Classification
  transactionType: z.string(),
  subTransactionType: z.string().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),

  // Dual-entry accounting
  creditAccount: ObjectId,
  debitAccount: ObjectId,

  // Payment tracking
  paymentMode: z.string().optional(),
  transactionId: z.string().optional(),
  referenceNumber: z.string().optional(),
  receiptAttached: z.boolean().default(false),

  // Status
  status: z
    .enum(['pending', 'completed', 'cancelled', 'flagged', 'reconciled'])
    .default('completed'),
  isFlagged: z.boolean().default(false),

  // Location
  location: z.string().optional(),
  merchantName: z.string().optional(),

  // Business
  businessName: z.string().optional(),
  invoiceNumber: z.string().optional(),
  gstin: z.string().optional(),

  // Person / Counterparty
  counterpartyName: z.string().optional(),
  counterpartyAccount: z.string().optional(),

  // Nested schemas
  recurring: recurringSchema.optional(),
  emi: emiSchema.optional(),
  taxFee: taxFeeSchema.optional(),
  investment: investmentSchema.optional(),
  lendingDebt: lendingDebtSchema.optional(),
  split: splitSchema.optional(),

  // Metadata
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  importedFrom: z.string().optional(),
});

export type TransactionV2FormData = z.infer<typeof transactionV2Schema>;