import { useContext } from 'react';

import { TransactionsV2PageContext } from './PageContext';

export function useTransactionsV2PageContext() {
  const context = useContext(TransactionsV2PageContext);

  if (!context) {
    throw new Error(
      'useTransactionsV2PageContext must be used within TransactionsV2PageProvider',
    );
  }

  return context;
}