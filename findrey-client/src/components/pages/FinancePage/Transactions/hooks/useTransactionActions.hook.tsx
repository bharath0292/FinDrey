'use client';

import {
	type AddTransactionsArgsType,
	type UpdateTransactionsArgsType,
	addTransaction,
	deleteTransaction,
	updateTransaction,
} from '@findrey/lib/transactions';

import { useMutation, useQueryClient } from '@tanstack/react-query';

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
				queryClient.invalidateQueries({ queryKey: ['transactions'] });
				queryClient.invalidateQueries({ queryKey: ['accounts'] });
				queryClient.invalidateQueries({ queryKey: ['descriptions'] });
			},
		},
	);
};
