import { AccountsV2PageProvider } from '@findrey/components/pages/UserPage/AccountsV2/context';

import { Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/user/accounts-v2')({
	component: AccountsV2Layout,
});

function AccountsV2Layout() {
	return (
		<AccountsV2PageProvider>
			<Outlet />
		</AccountsV2PageProvider>
	);
}
