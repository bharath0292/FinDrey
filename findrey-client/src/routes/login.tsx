import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/login')({
	component: LoginPage,
});

function LoginPage() {
	return (
		<div className="flex min-h-screen items-center justify-center">
			<div className="w-full max-w-sm space-y-4 p-8">
				<h1 className="text-2xl font-bold tracking-tight">Sign in to FinDrey</h1>
				<p className="text-sm text-muted-foreground">Authentication coming in Sprint 3.</p>
			</div>
		</div>
	);
}
