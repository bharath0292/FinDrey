import { createFileRoute } from '@tanstack/react-router';

import { UserSettingsPage } from '@findrey/components/pages/UserSettingsPage';

export const Route = createFileRoute('/_authenticated/user/settings')({
	component: UserSettingsPage,
});