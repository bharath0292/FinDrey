import HomePage from '@findrey/components/pages/HomePage';

import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/')({
	component: HomePage,
});
