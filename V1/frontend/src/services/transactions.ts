import axios from 'axios';
import { API_URL } from '../constants/api';
import { ErrorResponseType } from '../types/Response';
import {
  TransactionAddType,
  TransactionDeleteType,
  TransactionsType,
  TransactionsUpdateType
} from '../types/Transactions';

export async function getTransactions(
  user_id: string
): Promise<{ transactions: TransactionsType[] } | ErrorResponseType> {
  try {
    const { data, status } = await axios.get(API_URL + '/transactions?user_id=' + user_id);

    if (status === 200) {
      console.info('Transactions lists fetched');
      return { transactions: data };
    } else {
      console.error('Unexpected error status code:', status);
      return { error: 'An unexpected error occurred', statusCode: status };
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('error message: ', error.message);
      return { error: error.message, statusCode: error.status };
    } else {
      console.error('unexpected error: ', error);
      return { error: 'An unexpected error occurred' };
    }
  }
}

export async function addTransaction(new_account: TransactionAddType): Promise<TransactionsType | ErrorResponseType> {
  const body = {
    user_id: new_account.user_id,
    transactionDate: new_account.transactionDate,
    transactionType: new_account.transactionType,
    subTransactionType: new_account.subTransactionType,
    debitAccount: new_account.debitAccount,
    creditAccount: new_account.creditAccount,
    category: new_account.category,
    description: new_account.description,
    amount: new_account.amount
  };

  try {
    const { data, status } = await axios.post(API_URL + '/transactions', body);

    if (status === 201) {
      console.info('Transaction added successfully');
      return data;
    } else {
      console.error('Unexpected error status code:', status);
      return { error: 'An unexpected error occurred', statusCode: status };
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('error message: ', error);
      return { error: error.response.data, statusCode: error.response.status };
    } else {
      console.error('unexpected error: ', error);
      return { error: 'An unexpected error occurred' };
    }
  }
}

export async function updateTransaction(
  updateTransaction: TransactionsUpdateType
): Promise<TransactionsType | ErrorResponseType> {
  const body = {
    transactionId: updateTransaction.transactionId,
    user_id: updateTransaction.user_id,
    transactionDate: updateTransaction.transactionDate,
    transactionType: updateTransaction.transactionType,
    subTransactionType: updateTransaction.subTransactionType,
    debitAccount: updateTransaction.debitAccount,
    creditAccount: updateTransaction.creditAccount,
    category: updateTransaction.category,
    description: updateTransaction.description,
    amount: updateTransaction.amount
  };

  try {
    const { data, status } = await axios.put(API_URL + '/transactions', body);

    if (status === 200) {
      console.info('Transaction updated successfully');
      return data;
    } else {
      console.error('Unexpected error status code:', status);
      return { error: 'An unexpected error occurred', statusCode: status };
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('error message: ', error);
      return { error: error.response.data, statusCode: error.response.status };
    } else {
      console.error('unexpected error: ', error);
      return { error: 'An unexpected error occurred' };
    }
  }
}

export async function deleteTransaction(
  deleteTransaction: TransactionDeleteType
): Promise<boolean | ErrorResponseType> {
  const body = {
    transactionId: deleteTransaction.transactionId,
    user_id: deleteTransaction.user_id
  };
  try {
    const { status } = await axios.delete(API_URL + '/transactions', { data: body });

    if (status === 204) {
      console.info('Transaction deleted');
      return true;
    } else {
      console.error('Unexpected error status code:', status);
      return { error: 'An unexpected error occurred', statusCode: status };
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('error message: ', error.message);
      return { error: error.message, statusCode: error.status };
    } else {
      console.error('unexpected error: ', error);
      return { error: 'An unexpected error occurred' };
    }
  }
}
