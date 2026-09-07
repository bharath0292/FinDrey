export enum TransactionTypeV2 {
  // Income sources
  SALARY = 'Salary',
  FREELANCE = 'Freelance',
  BUSINESS_REVENUE = 'Business Revenue',
  RENTAL_INCOME = 'Rental Income',
  DIVIDEND = 'Dividend',
  INTEREST_INCOME = 'Interest Income',
  TRADING_PROFIT = 'Trading Profit',
  CAPITAL_GAINS = 'Capital Gains',
  REFUND = 'Refund',
  CASHBACK = 'Cashback',
  GIFT = 'Gift',
  OTHER_INCOME = 'Other Income',

  // Expenses
  HOME_EXPENSE = 'Home Expense',
  UTILITY = 'Utility',
  GROCERY = 'Grocery',
  DINING = 'Dining',
  TRANSPORTATION = 'Transportation',
  HEALTHCARE = 'Healthcare',
  EDUCATION = 'Education',
  ENTERTAINMENT = 'Entertainment',
  SHOPPING = 'Shopping',
  INSURANCE = 'Insurance',
  TAX = 'Tax',
  SUBSCRIPTION = 'Subscription',
  TRAVEL = 'Travel',
  PERSONAL_CARE = 'Personal Care',
  KIDS = 'Kids',
  PETS = 'Pets',
  OTHER_EXPENSE = 'Other Expense',

  // EMI / Loans
  EMI = 'EMI',
  LOAN_REPAYMENT = 'Loan Repayment',
  CREDIT_CARD_PAYMENT = 'Credit Card Payment',

  // Lending & Debt
  LEND = 'Lend',
  LEND_RECEIVED = 'Lend Received',
  BORROW = 'Borrow',
  DEBT_REPAID = 'Debt Repaid',

  // Transfers
  TRANSFER_IN = 'Transfer In',
  TRANSFER_OUT = 'Transfer Out',
  WALLET_TOPUP = 'Wallet Top-up',
  ATM_WITHDRAWAL = 'ATM Withdrawal',
  CASH_DEPOSIT = 'Cash Deposit',

  // Investments
  STOCK_BUY = 'Stock Buy',
  STOCK_SELL = 'Stock Sell',
  MUTUAL_FUND = 'Mutual Fund',
  FD = 'Fixed Deposit',
  RD = 'Recurring Deposit',
  CRYPTO = 'Crypto',
  GOLD = 'Gold',
  REAL_ESTATE = 'Real Estate',
  NPS = 'NPS',
  PPF = 'PPF',
  BONDS = 'Bonds',
  OTHER_INVESTMENT = 'Other Investment',

  // Business
  BUSINESS_EXPENSE = 'Business Expense',
  PAYROLL = 'Payroll',
  INVENTORY = 'Inventory',
  OPERATING_COST = 'Operating Cost',
  MARKETING = 'Marketing',
  OFFICE_EXPENSE = 'Office Expense',
  PROFIT_WITHDRAWAL = 'Profit Withdrawal',
  CAPITAL_INVESTMENT = 'Capital Investment',

  // Fees & Charges
  BANK_CHARGES = 'Bank Charges',
  BROKERAGE = 'Brokerage',
  PENALTY = 'Penalty',
  GST = 'GST',
}