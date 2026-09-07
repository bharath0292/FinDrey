'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import { cn } from '@findrey/lib/utils';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Bell, CheckCheck, Inbox } from 'lucide-react';

import { EmptyState } from './EmptyState';
import { MOCK_NOTIFICATIONS } from './mock';
import { NotificationCard } from './NotificationCard';
import type { Notification } from './types';

// ponytail: module cache persists read state across sheet open/close
let notifCache: Notification[] | null = null;
function getNotifications(): Notification[] {
	if (!notifCache) {
		notifCache = MOCK_NOTIFICATIONS.map((n) => ({ ...n }));
	}
	return notifCache;
}

type TabId = 'all' | 'unread' | 'mentions';

const TABS: { id: TabId; label: string; icon: typeof Bell }[] = [
	{ id: 'all', label: 'All', icon: Inbox },
	{ id: 'unread', label: 'Unread', icon: Bell },
	{ id: 'mentions', label: 'Mentions', icon: CheckCheck },
];
interface NotificationPanelBodyProps {
	onClose?: () => void;
	onUnreadChange?: (count: number) => void;
}

export function NotificationPanelBody({
	onClose,
	onUnreadChange,
}: NotificationPanelBodyProps) {
	const reduce = useReducedMotion();
	const [activeTab, setActiveTab] = useState<TabId>('all');
	const [notifications, setNotifications] =
		useState<Notification[]>(getNotifications);

	const unreadCount = useMemo(
		() => notifications.filter((n) => !n.read).length,
		[notifications],
	);

	// ponytail: single effect keeps bell badge in sync
	const prevUnread = useRef(unreadCount);
	useEffect(() => {
		if (prevUnread.current !== unreadCount) {
			prevUnread.current = unreadCount;
			onUnreadChange?.(unreadCount);
		}
	}, [unreadCount, onUnreadChange]);

	const filtered = useMemo(() => {
		switch (activeTab) {
			case 'unread':
				return notifications.filter((n) => !n.read);
			case 'mentions':
				return notifications.filter((n) => n.type === 'mention');
			default:
				return notifications;
		}
	}, [activeTab, notifications]);

	const handleMarkRead = (id: string) => {
		setNotifications((prev) => {
			const next = prev.map((n) =>
				n.id === id ? { ...n, read: true } : n,
			);
			notifCache = next;
			return next;
		});
	};

	const handleMarkAllRead = () => {
		if (unreadCount === 0) return;
		setNotifications((prev) => {
			const next = prev.map((n) => ({ ...n, read: true }));
			notifCache = next;
			return next;
		});
	};

	return (
		<div className="flex h-full flex-col">
			{/* Header */}
			<div className="flex items-center justify-between border-b border-border px-5 pb-3 pt-4">
				<div>
					<h2
						className="text-sm font-semibold text-foreground"
						style={{ fontFamily: 'var(--font-headline)' }}
					>
						Notifications
					</h2>
					<p className="text-[11px] text-muted-foreground">
						{unreadCount} unread
					</p>
				</div>

				{unreadCount > 0 && (
					<button
						type="button"
						onClick={handleMarkAllRead}
						className={cn(
							'flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-medium transition-colors',
							'text-muted-foreground hover:bg-muted hover:text-foreground',
						)}
					>
						<CheckCheck size={13} />
						Mark all read
					</button>
				)}
			</div>

			{/* Tabs */}
			<div className="flex gap-1 border-b border-border px-3 pb-2 pt-3">
				{TABS.map((tab) => {
					const isActive = activeTab === tab.id;
					const Icon = tab.icon;
					return (
						<button
							key={tab.id}
							type="button"
							onClick={() => setActiveTab(tab.id)}
							className={cn(
								'relative flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors',
								isActive
									? 'text-primary'
									: 'text-muted-foreground hover:text-foreground',
							)}
						>
							<Icon size={13} />
							{tab.label}
							{tab.id === 'unread' && unreadCount > 0 && (
								<span
									className="ml-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[9px] font-bold text-primary-foreground"
									style={{ fontFamily: 'var(--font-data)' }}
								>
									{unreadCount}
								</span>
							)}
							{isActive && (
								<motion.span
									layoutId="notif-tab-active"
									className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-primary"
									transition={
										reduce
											? { duration: 0 }
											: {
													type: 'spring',
													stiffness: 400,
													damping: 30,
												}
									}
								/>
							)}
						</button>
					);
				})}
			</div>

			{/* List */}
			<div className="flex-1 overflow-y-auto scrollbar-thin">
				<AnimatePresence mode="popLayout">
					{filtered.length === 0 ? (
						<EmptyState
							label={
								activeTab === 'unread'
									? 'No unread notifications'
									: activeTab === 'mentions'
										? 'No mentions'
										: 'All clear'
							}
							description={
								activeTab === 'unread'
									? 'You have read all notifications.'
									: 'Nothing here yet.'
							}
						/>
					) : (
						<div className="space-y-0.5 px-3 py-3">
							{filtered.map((notification, i) => (
								<NotificationCard
									key={notification.id}
									notification={notification}
									index={i}
									onMarkRead={handleMarkRead}
								/>
							))}
						</div>
					)}
				</AnimatePresence>
			</div>
		</div>
	);
}
