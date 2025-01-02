import { useContext } from 'react';

import { AccountsPageContext } from './context';

export default function useAccountsPageContext() {
  const context = useContext(AccountsPageContext);

  if (!context) {
    throw new Error(
      'useAccountsPageContext should be inside UserAccessContext',
    );
  }

  return context;
}
