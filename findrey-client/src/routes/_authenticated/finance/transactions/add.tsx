import CrudTransactions from '@findrey/components/pages/FinancePage/Transactions/Crud';

import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/finance/transactions/add')({
	component: CrudTransactions,
});
