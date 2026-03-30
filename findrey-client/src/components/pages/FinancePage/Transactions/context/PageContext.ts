'use client';

import { createContext } from 'react';

import { TransactionsPage } from './types';

export const TransactionsPageContext = createContext<TransactionsPage | null>(
  null,
);
