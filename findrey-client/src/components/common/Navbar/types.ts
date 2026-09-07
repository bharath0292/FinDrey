import type { LucideIcon } from 'lucide-react';

export interface NavItem {
	icon: LucideIcon;
	label: string;
	path: string;
	match: (pathname: string) => boolean;
}

export interface NavGroup {
	id: string;
	label: string | null;
	items: NavItem[];
}