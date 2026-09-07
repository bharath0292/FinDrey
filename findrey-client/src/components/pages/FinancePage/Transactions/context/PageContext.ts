import { createContext } from 'react';

import type { TransactionsPage } from './types';

export const TransactionsPageContext = createContext<TransactionsPage | null>(
	null,
);
