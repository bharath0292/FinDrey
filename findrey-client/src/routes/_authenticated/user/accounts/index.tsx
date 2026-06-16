import AccountsPage from '@findrey/components/pages/UserPage/Accounts/Accounts';

import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/user/accounts/')({
	component: AccountsPage,
});
