'use client';

import { useMutation, useQueryClient } from 'react-query';

import {
  addTransaction,
  AddTransactionsArgsType,
  deleteTransaction,
  updateTransaction,
  UpdateTransactionsArgsType,
} from '@findrey/lib/transactions';

type TransactionActionType =
  | AddTransactionsArgsType
  | UpdateTransactionsArgsType
  | string;

const determineAction = (transactionAction: TransactionActionType) => {
  if (typeof transactionAction === 'string') {
    return () => deleteTransaction(transactionAction);
  } else if ('id' in transactionAction) {
    return () => updateTransaction(transactionAction);
  } else {
    return () => addTransaction(transactionAction);
  }
};

export const useTransactionActions = (
  onSuccess: (() => void) | undefined = undefined,
) => {
  const queryClient = useQueryClient();

  return useMutation(
    (transaction: TransactionActionType) => {
      const action = determineAction(transaction);

      return action();
    },
    {
      onSuccess: () => {
        if (onSuccess) {
          onSuccess();
        }
        queryClient.invalidateQueries('transactions');
        queryClient.invalidateQueries('accounts');
        queryClient.invalidateQueries('descriptions');
      },
    },
  );
};
