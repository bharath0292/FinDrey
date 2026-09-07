import { createContext } from 'react';

import type { TransactionsV2Page } from './types';

export const TransactionsV2PageContext = createContext<TransactionsV2Page | null>(
  null,
);