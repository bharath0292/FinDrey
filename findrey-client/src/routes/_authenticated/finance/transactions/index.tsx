import TransactionsPage from '@findrey/components/pages/FinancePage/Transactions/Transactions';

import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/finance/transactions/')({
	component: TransactionsPage,
});
