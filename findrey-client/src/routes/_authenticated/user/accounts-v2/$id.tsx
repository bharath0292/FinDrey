import { AccountsV2CrudForm } from '@findrey/components/pages/UserPage/AccountsV2';

import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/user/accounts-v2/$id')({
	component: AccountsV2CrudForm,
});
