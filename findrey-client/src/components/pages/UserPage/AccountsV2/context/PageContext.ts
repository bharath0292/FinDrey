import { createContext } from 'react';

import type { AccountsV2Page } from './types';

export const AccountsV2PageContext = createContext<AccountsV2Page | null>(null);
