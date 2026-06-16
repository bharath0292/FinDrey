import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/analytics/investment')({
	component: Investment,
});

function Investment() {
	return <div>Investment</div>;
}
