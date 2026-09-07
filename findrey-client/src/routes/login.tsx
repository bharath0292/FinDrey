import { AuthForm } from '@findrey/components/common/Auth';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/login')({
	component: RouteComponent,
});

function RouteComponent() {
	return <AuthForm />;
}
