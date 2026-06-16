import { CategoryPageProvider } from '@findrey/components/pages/UserPage/Categories/hooks/context';

import { Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/user/categories')({
	component: CategoriesLayout,
});

function CategoriesLayout() {
	return (
		<CategoryPageProvider>
			<Outlet />
		</CategoryPageProvider>
	);
}
