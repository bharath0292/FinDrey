import EditAccounts from '@findrey/components/pages/UserPage/Accounts/Edit';

import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/user/accounts/$id')({
	component: EditAccounts,
});
