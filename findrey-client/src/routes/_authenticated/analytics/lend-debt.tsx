import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/analytics/lend-debt')({
	component: LendOrDebt,
});

function LendOrDebt() {
	return <div>LendOrDebt</div>;
}
