export interface TransactionType {
  id: string;
  userId: string;
  bankName: string;
  accountName: string;
  transactionDate: string;
  transactionType: string;
  subTransactionType: string;
  category: string;
  creditAccount: string;
  debitAccount: string;
  description: string;
  amount: number;
}
