export interface TransactionsType {
  transactionId: number;
  user_id: string;
  transactionDate: string;
  transactionType: string;
  subTransactionType: string;
  debitAccount: string;
  creditAccount: string;
  category: string;
  description: string;
  amount: number;
}

export interface TransactionAddType {
  user_id: string;
  transactionDate: string;
  transactionType: string;
  subTransactionType: string;
  debitAccount: string;
  creditAccount: string;
  category: string;
  description: string | number;
  amount: number;
}

export interface TransactionsUpdateType {
  transactionId: number;
  user_id: string;
  transactionDate: string;
  transactionType: string;
  subTransactionType: string;
  debitAccount: string;
  creditAccount: string;
  category: string;
  description: string | number;
  amount: number;
}

export interface TransactionDeleteType {
  user_id: string;
  transactionId: number;
}
