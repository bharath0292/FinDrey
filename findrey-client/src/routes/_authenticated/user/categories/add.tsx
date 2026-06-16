import AddCategory from '@findrey/components/pages/UserPage/Categories/Add';

import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/user/categories/add')({
	component: AddCategory,
});
