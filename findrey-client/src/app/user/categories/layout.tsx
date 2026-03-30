import { CategoryPageProvider } from '@findrey/components/pages/UserPage/Categories/hooks/context';

async function Layout({ children }: { children: React.ReactNode }) {
  return <CategoryPageProvider>{children}</CategoryPageProvider>;
}

export default Layout;
