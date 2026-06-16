import CategoriesPage from '@findrey/components/pages/UserPage/Categories';

import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/user/categories/')({
	component: CategoriesPage,
});
