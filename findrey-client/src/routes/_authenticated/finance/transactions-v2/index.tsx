import TransactionsV2Page from '@findrey/components/pages/FinancePage/TransactionsV2';

import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
	'/_authenticated/finance/transactions-v2/',
)({
	component: TransactionsV2Page,
});
98;
