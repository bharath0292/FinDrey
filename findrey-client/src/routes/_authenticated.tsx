import { MobileTabBar, Navbar } from '@findrey/components/common/Navbar';

import { Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated')({
	beforeLoad: () => {
		// Auth guard — enforced in Sprint 3.
	},
	component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
	return (
		<div className="relative min-h-screen bg-background">
			<Navbar />
			<main className="min-h-screen pt-16 pb-14 md:pb-0">
				<Outlet />
			</main>
			<MobileTabBar />
		</div>
	);
}