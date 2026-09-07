import { z } from 'zod';
import { ObjectId } from './_schemas';

// ── Currency ────────────────────────────────────────────────
const currencySchema = z.string().default('INR');

// ── Account group / classification ──────────────────────────
const accountCategorySchema = z.enum([
  'bank',
  'credit',
  'investment',
  'wallet',
  'loan',
  'business',
  'lend-debt',
  'foreign',
  'tax',
  'insurance',
  'real-estate',
  'other',
]);

const accountTypeSchema = z.enum([
  // ── Bank accounts ──────────────────────────────────────────
  'savings',
  'current',
  'salary',
  'fixed-deposit',
  'recurring-deposit',
  'nre',
  'nro',
  'fcnr',
  'escrow',

  // ── Credit / cards ────────────────────────────────────────
  'credit-card',
  'charge-card',

  // ── Loans ──────────────────────────────────────────────────
  'personal-loan',
  'home-loan',
  'auto-loan',
  'education-loan',
  'gold-loan',
  'business-loan',
  'overdraft',
  'cc-account',
  'loan-against-property',
  'loan-against-securities',

  // ── Investment ─────────────────────────────────────────────
  'demat',
  'trading',
  'mutual-fund',
  'etf',
  'bonds',
  'ipo',
  'sip',
  'ppf',
  'nps',
  'elss',
  'sovereign-gold-bond',

  // ── Wallet / digital ───────────────────────────────────────
  'wallet-upi',
  'wallet-paytm',
  'wallet-phonepe',
  'wallet-gpay',
  'wallet-amazon-pay',
  'wallet-paypal',
  'wallet-crypto',
  'wallet-prepaid',

  // ── Real estate ────────────────────────────────────────────
  'real-estate-residential',
  'real-estate-commercial',
  'real-estate-land',

  // ── Insurance ──────────────────────────────────────────────
  'life-insurance',
  'health-insurance',
  'general-insurance',

  // ── Lend / Debt ────────────────────────────────────────────
  'lend-personal',
  'lend-business',
  'debt-personal',
  'debt-business',

  // ── Tax ────────────────────────────────────────────────────
  'tax-saver-fd',
  'tax-harvesting',

  // ── Other ──────────────────────────────────────────────────
  'cash',
  'prepaid-card',
  'gift-card',
  'other',
]);

const accountStatusSchema = z.enum([
  'active',
  'dormant',
  'closed',
  'frozen',
  'defaulted',
  'under-review',
]);

// ── Bank details (for banking type accounts) ────────────────
const bankDetailsSchema = z.object({
  bankName: z.string().optional(),
  branchName: z.string().optional(),
  ifscCode: z.string().optional(),
  micrCode: z.string().optional(),
  accountNumber: z.string().optional(),
  accountHolderName: z.string().optional(),
  nomineeName: z.string().optional(),
  upiId: z.string().optional(),
  chequeSeries: z.string().optional(),
});

// ── Interest details ────────────────────────────────────────
const interestDetailsSchema = z.object({
  interestRate: z.number().nonnegative().optional(),
  interestType: z.enum(['simple', 'compound', 'fixed']).optional(),
  compoundingFrequency: z
    .enum(['daily', 'monthly', 'quarterly', 'half-yearly', 'yearly'])
    .optional(),
  interestCreditedAccount: z.string().optional(),
  interestPaidDate: z.string().optional(),
  isTaxableInterest: z.boolean().optional(),
  tdsApplicable: z.boolean().optional(),
  tdsRate: z.number().nonnegative().max(100).optional(),
});

// ── Loan / EMI details ──────────────────────────────────────
const loanDetailsSchema = z.object({
  loanAccountNumber: z.string().optional(),
  lenderName: z.string().optional(),
  loanSanctionedAmount: z.number().nonnegative().optional(),
  outstandingPrincipal: z.number().nonnegative().optional(),
  emiAmount: z.number().nonnegative().optional(),
  emiDueDate: z.number().int().min(1).max(31).optional(),
  tenureMonths: z.number().int().positive().optional(),
  tenureStartDate: z.string().optional(),
  tenureEndDate: z.string().optional(),
  prepaymentPenalty: z.number().nonnegative().optional(),
  foreclosureCharges: z.number().nonnegative().optional(),
  processingFee: z.number().nonnegative().optional(),
  moratoriumPeriod: z.number().int().nonnegative().optional(),
  collateral: z.string().optional(),
  coBorrowers: z.array(z.string()).optional(),
  emiBounceCharges: z.number().nonnegative().optional(),
});

// ── Credit card details ────────────────────────────────────
const creditCardDetailsSchema = z.object({
  cardNetwork: z
    .enum(['visa', 'mastercard', 'rupay', 'amex', 'diners', 'discover'])
    .optional(),
  cardType: z.enum(['classic', 'gold', 'platinum', 'titanium', 'signature', 'infinite']).optional(),
  creditLimit: z.number().nonnegative().optional(),
  availableLimit: z.number().nonnegative().optional(),
  billingDate: z.number().int().min(1).max(31).optional(),
  dueDate: z.number().int().min(1).max(31).optional(),
  lastStatementDate: z.string().optional(),
  lastStatementBalance: z.number().optional(),
  minimumDuePercentage: z.number().nonnegative().max(100).optional(),
  interestOnOutstanding: z.number().nonnegative().optional(),
  cashAdvanceLimit: z.number().nonnegative().optional(),
  cashAdvanceFee: z.number().nonnegative().optional(),
  forexMarkup: z.number().nonnegative().optional(),
  annualFee: z.number().nonnegative().optional(),
  annualFeeWaiverSpend: z.number().nonnegative().optional(),
  rewardPoints: z.number().int().nonnegative().optional(),
  rewardProgramName: z.string().optional(),
  addOnCards: z.array(z.string()).optional(),
  cardLastFour: z.string().length(4).optional(),
  cardIssuer: z.string().optional(),
  contactlessLimit: z.number().nonnegative().optional(),
  loungeAccess: z.boolean().optional(),
});

// ── Investment details ──────────────────────────────────────
const investmentDetailsSchema = z.object({
  folioNumber: z.string().optional(),
  brokerName: z.string().optional(),
  brokerClientId: z.string().optional(),
  depository: z.enum(['cdsl', 'nsdl']).optional(),
  depositoryId: z.string().optional(),
  dpId: z.string().optional(),
  beneficiaryId: z.string().optional(),
  nomination: z.string().optional(),
  sipDate: z.number().int().min(1).max(31).optional(),
  sipAmount: z.number().nonnegative().optional(),
  unitsHeld: z.number().nonnegative().optional(),
  nav: z.number().nonnegative().optional(),
  purchaseNav: z.number().nonnegative().optional(),
  xirr: z.number().optional(),
  dividendOption: z.enum(['growth', 'dividend', 'idcw', 'reinvestment']).optional(),
  dividendFrequency: z.enum(['monthly', 'quarterly', 'half-yearly', 'yearly']).optional(),
  dematCharges: z.number().nonnegative().optional(),
  brokerageCharges: z.number().nonnegative().optional(),
  sttCharges: z.number().nonnegative().optional(),
  exchange: z.enum(['nse', 'bse', 'nyse', 'nasdaq', 'other']).optional(),
  tradingStrategy: z.string().optional(),
  stopLoss: z.number().optional(),
  targetPrice: z.number().optional(),
  realizedPnl: z.number().optional(),
  unrealizedPnl: z.number().optional(),
});

// ── Wallet details ──────────────────────────────────────────
const walletDetailsSchema = z.object({
  walletProvider: z.string().optional(),
  walletType: z.enum(['closed', 'semi-closed', 'open']).optional(),
  kycStatus: z.enum(['not-kyc', 'mini-kyc', 'full-kyc']).optional(),
  linkedBankAccount: z.string().optional(),
  cashbackBalance: z.number().nonnegative().optional(),
  rewardPoints: z.number().int().nonnegative().optional(),
  transactionLimit: z.number().nonnegative().optional(),
  dailyLimit: z.number().nonnegative().optional(),
  monthlyLimit: z.number().nonnegative().optional(),
});

// ── Lend / Debt details ─────────────────────────────────────
const lendDebtDetailsSchema = z.object({
  borrowerName: z.string().optional(),
  borrowerContact: z.string().optional(),
  borrowerRelation: z.string().optional(),
  purpose: z.string().optional(),
  agreementType: z.enum(['formal', 'informal', 'promissory-note', 'legal']).optional(),
  interestRate: z.number().nonnegative().optional(),
  repaymentSchedule: z.enum(['lump-sum', 'monthly', 'quarterly', 'custom']).optional(),
  dueDate: z.string().optional(),
  amountLent: z.number().nonnegative().optional(),
  amountReceived: z.number().default(0),
  collateralProvided: z.string().optional(),
  documents: z.array(z.string()).optional(),
  reminders: z.boolean().default(false),
});

// ── Insurance details ───────────────────────────────────────
const insuranceDetailsSchema = z.object({
  policyNumber: z.string().optional(),
  insurerName: z.string().optional(),
  policyType: z.string().optional(),
  sumAssured: z.number().nonnegative().optional(),
  premiumAmount: z.number().nonnegative().optional(),
  premiumFrequency: z.enum(['monthly', 'quarterly', 'half-yearly', 'yearly', 'one-time']).optional(),
  premiumDueDate: z.string().optional(),
  policyStartDate: z.string().optional(),
  policyEndDate: z.string().optional(),
  nominee: z.string().optional(),
  riderDetails: z.string().optional(),
  bonusAccumulated: z.number().nonnegative().optional(),
  loanAgainstPolicy: z.number().nonnegative().optional(),
});

// ── Real Estate details ─────────────────────────────────────
const realEstateDetailsSchema = z.object({
  propertyType: z.string().optional(),
  propertyAddress: z.string().optional(),
  propertyArea: z.number().nonnegative().optional(),
  areaUnit: z.enum(['sqft', 'sqm', 'acre', 'gunta']).optional(),
  purchasePrice: z.number().nonnegative().optional(),
  currentMarketValue: z.number().nonnegative().optional(),
  registrationDate: z.string().optional(),
  registrationNumber: z.string().optional(),
  jointOwners: z.array(z.string()).optional(),
  mortgageDetails: z.string().optional(),
  rentalIncome: z.number().nonnegative().optional(),
  propertyTax: z.number().nonnegative().optional(),
  maintenanceCharges: z.number().nonnegative().optional(),
});

// ── Business account details ────────────────────────────────
const businessDetailsSchema = z.object({
  businessName: z.string().optional(),
  gstin: z.string().optional(),
  pan: z.string().optional(),
  businessType: z.enum(['sole-proprietorship', 'partnership', 'llp', 'pvt-ltd', 'public-ltd', 'huf', 'trust']).optional(),
  udyamRegistration: z.string().optional(),
  msmeCategory: z.enum(['micro', 'small', 'medium']).optional(),
  turnover: z.number().nonnegative().optional(),
  overdraftLimit: z.number().nonnegative().optional(),
  cashCreditLimit: z.number().nonnegative().optional(),
  tradeLicenseNumber: z.string().optional(),
  authorizedSignatories: z.array(z.string()).optional(),
});

// ── Foreign account details ─────────────────────────────────
const foreignDetailsSchema = z.object({
  country: z.string().optional(),
  swiftCode: z.string().optional(),
  iban: z.string().optional(),
  routingNumber: z.string().optional(),
  correspondentBank: z.string().optional(),
  foreignCurrency: z.string().optional(),
  conversionRate: z.number().positive().optional(),
  repatriationAllowed: z.boolean().optional(),
});

// ── Tax details ─────────────────────────────────────────────
const taxDetailsSchema = z.object({
  sectionCode: z.string().optional(),
  taxBenefitAmount: z.number().nonnegative().optional(),
  lockInPeriod: z.number().int().nonnegative().optional(),
  maturityDate: z.string().optional(),
  isCumulative: z.boolean().optional(),
});

// ── Tags / labels ───────────────────────────────────────────
const tagsSchema = z.array(z.string()).default([]);

const notesSchema = z.string().optional();

// ── Alert / notification preferences ────────────────────────
const alertPreferencesSchema = z.object({
  balanceBelowThreshold: z.boolean().default(false),
  balanceThreshold: z.number().nonnegative().optional(),
  dueDateReminder: z.boolean().default(false),
  dueDateReminderDays: z.number().int().nonnegative().default(3),
  transactionAlert: z.boolean().default(true),
  monthlyStatement: z.boolean().default(false),
});

// ── Main account schema ───────────────────────────────────────
export const accountV2Schema = z.object({
  // Core
  id: ObjectId,
  userId: z.string().default('user-1'),
  accountCategory: accountCategorySchema,
  accountType: accountTypeSchema,
  accountLabel: z.string().min(1, 'Account label is required').max(100),
  accountNumber: z.string().optional(),
  accountNickname: z.string().optional(),

  // Balance / financial
  currency: currencySchema,
  currentBalance: z.number().default(0),
  availableBalance: z.number().optional(),
  openingBalance: z.number().default(0),
  asOfDate: z.string().optional(),

  // Status
  status: accountStatusSchema.default('active'),
  openedDate: z.string().optional(),
  closedDate: z.string().optional(),
  isPrimary: z.boolean().default(false),

  // Categorization
  tags: tagsSchema,
  notes: notesSchema,
  alertPreferences: alertPreferencesSchema.default({}),

  // Owner
  ownershipType: z
    .enum(['individual', 'joint', 'corporate', 'trust', 'huf'])
    .default('individual'),
  jointHolders: z.array(z.string()).optional(),

  // Detailed sections (at least one may be filled based on accountCategory)
  bankDetails: bankDetailsSchema.optional(),
  interestDetails: interestDetailsSchema.optional(),
  loanDetails: loanDetailsSchema.optional(),
  creditCardDetails: creditCardDetailsSchema.optional(),
  investmentDetails: investmentDetailsSchema.optional(),
  walletDetails: walletDetailsSchema.optional(),
  lendDebtDetails: lendDebtDetailsSchema.optional(),
  insuranceDetails: insuranceDetailsSchema.optional(),
  realEstateDetails: realEstateDetailsSchema.optional(),
  businessDetails: businessDetailsSchema.optional(),
  foreignDetails: foreignDetailsSchema.optional(),
  taxDetails: taxDetailsSchema.optional(),

  // Metadata
  createdAt: z.string().default(() => new Date().toISOString()),
  updatedAt: z.string().default(() => new Date().toISOString()),
});

export type AccountV2FormData = z.infer<typeof accountV2Schema>;