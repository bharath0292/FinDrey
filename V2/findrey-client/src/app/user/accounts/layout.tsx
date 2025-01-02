import { AccountsPageProvider } from '@findrey/components/pages/UserPage/Accounts/hooks/context';

async function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <AccountsPageProvider>{children}</AccountsPageProvider>;
}

export default Layout;
