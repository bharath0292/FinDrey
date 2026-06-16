import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/finance/bills')({
	component: Bills,
});

function Bills() {
	return <div>Bills</div>;
}
