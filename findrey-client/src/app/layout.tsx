import '@findrey/styles/globals.css';

import Header from '@findrey/components/common/Header';
import Sidebar from '@findrey/components/common/Sidebar';
import { ReactQueryProvider, ReduxProvider } from '@findrey/context';
import styles from '@findrey/styles/layout.module.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

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
				<ReduxProvider>
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
				</ReduxProvider>
			</body>
		</html>
	);
}
