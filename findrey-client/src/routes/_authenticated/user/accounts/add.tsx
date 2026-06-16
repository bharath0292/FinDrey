import AddAccounts from '@findrey/components/pages/UserPage/Accounts/Add';

import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/user/accounts/add')({
	component: AddAccounts,
});
