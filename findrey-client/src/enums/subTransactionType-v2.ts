export enum SubTransactionTypeV2 {
  // Standard
  DEBIT = 'Debit',
  CREDIT = 'Credit',

  // Payment modes
  UPI = 'UPI',
  NEFT = 'NEFT',
  IMPS = 'IMPS',
  RTGS = 'RTGS',
  CHEQUE = 'Cheque',
  CASH = 'Cash',
  CARD_SWIPE = 'Card Swipe',

  // EMI
  EMI_MONTHLY = 'EMI Monthly',
  EMI_PREPAYMENT = 'EMI Prepayment',
  EMI_FORECLOSURE = 'EMI Foreclosure',

  // Investment actions
  SIP = 'SIP',
  LUMPSUM = 'Lumpsum',
  SWP = 'SWP',
  STP = 'STP',
  DIVIDEND_REINVEST = 'Dividend Reinvest',

  // Business
  PURCHASE = 'Purchase',
  SALE = 'Sale',
  RETURN = 'Return',
  TAX_INPUT = 'Tax Input',
  TAX_OUTPUT = 'Tax Output',
  COMMISSION = 'Commission',

  // Financial
  PRINCIPAL = 'Principal',
  INTEREST = 'Interest',
  PENALTY = 'Penalty',
  CHARGES = 'Charges',
  TDS = 'TDS',

  // Claims & Settlements
  INSURANCE_CLAIM = 'Insurance Claim',
  SETTLEMENT = 'Settlement',
  ADJUSTMENT = 'Adjustment',

  // Transfer specifics
  ACCOUNT_TRANSFER = 'Account Transfer',
  WALLET_TRANSFER = 'Wallet Transfer',
  INTERNATIONAL = 'International',

  // Recurring
  SUBSCRIPTION_RENEWAL = 'Subscription Renewal',
  AUTO_DEBIT = 'Auto Debit',
  STANDING_INSTRUCTION = 'Standing Instruction',
}