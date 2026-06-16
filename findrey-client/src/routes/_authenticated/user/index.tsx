import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/user/')({
	component: Profile,
});

function Profile() {
	return <div>Profile</div>;
}
