import { TransactionsPageProvider } from '@findrey/components/pages/FinancePage/Transactions/context';

import { Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/finance/transactions')({
	component: TransactionsLayout,
});

function TransactionsLayout() {
	return (
		<TransactionsPageProvider>
			<Outlet />
		</TransactionsPageProvider>
	);
}
