import { TransactionsPageProvider } from '@findrey/components/pages/FinancePage/Transactions/context';

async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <TransactionsPageProvider>{children}</TransactionsPageProvider>;
}

export default Layout;
