import { Outlet, createFileRoute, redirect } from '@tanstack/react-router';

import { Header } from '@findrey/components/common/Header';
import { Sidebar } from '@findrey/components/common/Sidebar';
import styles from '@findrey/styles/layout.module.css';

export const Route = createFileRoute('/_authenticated')({
	beforeLoad: ({ context }) => {
		// Auth guard — will be enforced once auth (Sprint 3) is implemented.
		// Uncomment when Better-Auth session is wired up:
		// if (!context.user) throw redirect({ to: '/login' });
	},
	component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
	return (
		<div className={styles.container}>
			<div className={styles.menu}>
				<Sidebar />
			</div>
			<div className={styles.content}>
				<Header />
				<Outlet />
			</div>
		</div>
	);
}
