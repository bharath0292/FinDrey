import { useContext } from 'react';

import { AccountsV2PageContext } from './PageContext';

export function useAccountsV2PageContext() {
	const ctx = useContext(AccountsV2PageContext);
	if (!ctx) {
		throw new Error(
			'useAccountsV2PageContext must be used within AccountsV2PageProvider',
		);
	}
	return ctx;
}
