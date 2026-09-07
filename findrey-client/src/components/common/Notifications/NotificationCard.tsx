import { cn } from '@findrey/lib/utils';

import { motion, useReducedMotion } from 'framer-motion';
import {
	AlertTriangle,
	ArrowRightLeft,
	AtSign,
	Bell,
	Check,
	Settings2,
} from 'lucide-react';

import type { Notification, NotificationType, NotificationTypeConfig } from './types';

const TYPE_CONFIG: Record<NotificationType, NotificationTypeConfig> = {
	transaction: { icon: ArrowRightLeft, color: 'text-primary', label: 'Transaction' },
	alert: { icon: AlertTriangle, color: 'text-destructive', label: 'Alert' },
	system: { icon: Settings2, color: 'text-accent', label: 'System' },
	mention: { icon: AtSign, color: 'text-status-green', label: 'Mention' },
	reminder: { icon: Bell, color: 'text-amber-400', label: 'Reminder' },
};

function timeAgo(date: Date): string {
	const diff = Date.now() - date.getTime();
	const mins = Math.floor(diff / 60_000);
	if (mins < 1) return 'now';
	if (mins < 60) return `${mins}m`;
	const hours = Math.floor(mins / 60);
	if (hours < 24) return `${hours}h`;
	const days = Math.floor(hours / 24);
	if (days < 7) return `${days}d`;
	return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

interface NotificationCardProps {
	notification: Notification;
	index?: number;
	onMarkRead?: (id: string) => void;
}

export function NotificationCard({
	notification,
	index = 0,
	onMarkRead,
}: NotificationCardProps) {
	const config = TYPE_CONFIG[notification.type];
	const Icon = config.icon;
	const reduce = useReducedMotion();

	return (
		<motion.div
			layout
			initial={reduce ? false : { opacity: 0, x: 24, scale: 0.96 }}
			animate={{ opacity: 1, x: 0, scale: 1 }}
			exit={reduce ? undefined : { opacity: 0, x: -24, scale: 0.96 }}
			transition={reduce ? { duration: 0 } : {
				type: 'spring',
				stiffness: 350,
				damping: 28,
				delay: index * 0.04,
			}}
			className={cn(
				'group relative flex gap-3 rounded-xl p-3 transition-colors',
				!notification.read && 'bg-primary/[0.03]',
				'hover:bg-muted/50',
			)}
		>
			{/* Type indicator icon */}
			<div className="relative mt-0.5 flex shrink-0">
				<div
					className={cn(
						'flex h-8 w-8 items-center justify-center rounded-full',
						!notification.read ? 'bg-primary/10' : 'bg-muted',
					)}
				>
					<Icon
						size={14}
						className={cn(
							config.color,
							!notification.read ? 'opacity-100' : 'opacity-60',
						)}
					/>
				</div>
				{!notification.read && (
					<span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-primary" />
				)}
			</div>

			{/* Content */}
			<div className="flex min-w-0 flex-1 flex-col gap-0.5">
				<div className="flex items-start justify-between gap-2">
					<p
						className={cn(
							'text-sm leading-snug',
							!notification.read
								? 'font-semibold text-foreground'
								: 'font-medium text-muted-foreground',
						)}
					>
						{notification.title}
					</p>
					<span
						className={cn(
							'shrink-0 text-[11px] tabular-nums',
							!notification.read
								? 'text-muted-foreground'
								: 'text-muted-foreground/50',
						)}
						style={{ fontFamily: 'var(--font-data)' }}
					>
						{timeAgo(notification.timestamp)}
					</span>
				</div>

				<p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground/80">
					{notification.body}
				</p>

				{/* Actions row */}
				<div className="mt-1.5 flex items-center gap-2">
					{notification.action && (
						<button
							type="button"
							className={cn(
								'rounded-md px-2.5 py-1 text-[11px] font-medium transition-colors',
								'bg-primary/10 text-primary hover:bg-primary/20',
							)}
						>
							{notification.action.label}
						</button>
					)}

					{!notification.read && onMarkRead && (
						<button
							type="button"
							onClick={(e) => {
								e.stopPropagation();
								onMarkRead(notification.id);
							}}
							className={cn(
								'ml-auto flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium transition-all',
								'text-muted-foreground/50 opacity-0 group-hover:opacity-100',
								'hover:text-foreground',
							)}
						>
							<Check size={12} />
							Mark read
						</button>
					)}
				</div>
			</div>
		</motion.div>
	);
}
