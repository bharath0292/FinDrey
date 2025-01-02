'use client';

import { useMutation, useQueryClient } from 'react-query';

import {
  addAccount,
  AddAccountsArgsType,
  deleteAccount,
  updateAccount,
  UpdateAccountsArgsType,
} from '@findrey/lib/accounts';

type AccountActionType = AddAccountsArgsType | UpdateAccountsArgsType | string;

const determineAction = (accountAction: AccountActionType) => {
  if (typeof accountAction === 'string') {
    return () => deleteAccount(accountAction);
  } else if ('id' in accountAction) {
    return () => updateAccount(accountAction);
  } else {
    return () => addAccount(accountAction);
  }
};

export const useAccountActions = (
  onSuccess: (() => void) | undefined = undefined,
) => {
  const queryClient = useQueryClient();

  return useMutation(
    (account: AccountActionType) => {
      const action = determineAction(account);
      return action();
    },
    {
      onSuccess: () => {
        if (onSuccess) {
          onSuccess();
        }
        queryClient.invalidateQueries({ queryKey: ['accounts', '', 1] });
      },
    },
  );
};
