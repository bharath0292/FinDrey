import { AccountsPageProvider } from '@findrey/components/pages/UserPage/Accounts/hooks/context';

import { Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/user/accounts')({
	component: AccountsLayout,
});

function AccountsLayout() {
	return (
		<AccountsPageProvider>
			<Outlet />
		</AccountsPageProvider>
	);
}
