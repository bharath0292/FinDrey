import { useContext } from 'react';

import { TransactionsPageContext } from '../context';

export default function useTransactionsPageContext() {
  const context = useContext(TransactionsPageContext);

  if (!context) {
    throw new Error(
      'useTransactionsPageContext should be inside TransactionContext',
    );
  }

  return context;
}
