import '@findrey/styles/globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import Header from '@findrey/components/common/Header';
import Sidebar from '@findrey/components/common/Sidebar';
import { ReactQueryProvider } from '@findrey/context/ReactQueryProvider';
import { RecoilProvider } from '@findrey/context/RecoilProvider';
import styles from '@findrey/styles/layout.module.css';

export const metadata: Metadata = {
  title: 'FinDrey',
  description: 'The app to analyze personal finance',
};
const inter = Inter({ subsets: ['latin'] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RecoilProvider>
          <ReactQueryProvider>
            <div className={styles.container}>
              <div className={styles.menu}>
                <Sidebar />
              </div>
              <div className={styles.content}>
                <Header />
                {children}
              </div>
            </div>
          </ReactQueryProvider>
        </RecoilProvider>
      </body>
    </html>
  );
}
