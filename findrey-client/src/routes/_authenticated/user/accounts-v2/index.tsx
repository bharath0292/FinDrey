import { AccountsV2Page } from '@findrey/components/pages/UserPage/AccountsV2';

import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/user/accounts-v2/')({
	component: AccountsV2Page,
});
