import EditCategory from '@findrey/components/pages/UserPage/Categories/Edit';

import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/user/categories/$id')({
	component: EditCategory,
});
