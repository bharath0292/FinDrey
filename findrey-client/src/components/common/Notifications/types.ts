import type { LucideIcon } from 'lucide-react';

export type NotificationType = 'transaction' | 'alert' | 'system' | 'mention' | 'reminder';

export interface Notification {
	id: string;
	type: NotificationType;
	title: string;
	body: string;
	timestamp: Date;
	read: boolean;
	action?: {
		label: string;
		path: string;
	};
}

export interface NotificationGroup {
	label: string;
	items: Notification[];
}

export interface NotificationTypeConfig {
	icon: LucideIcon;
	color: string;
	label: string;
}