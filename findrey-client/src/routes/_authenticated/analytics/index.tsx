import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/analytics/')({
	component: Analytics,
});

function Analytics() {
	return <div>Analytics</div>;
}
