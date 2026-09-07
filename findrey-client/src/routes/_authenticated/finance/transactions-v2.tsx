import { TransactionsV2PageProvider } from '@findrey/components/pages/FinancePage/TransactionsV2/context';
import { Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/finance/transactions-v2')({
  component: TransactionsV2Layout,
});

function TransactionsV2Layout() {
  return (
    <TransactionsV2PageProvider>
      <Outlet />
    </TransactionsV2PageProvider>
  );
}