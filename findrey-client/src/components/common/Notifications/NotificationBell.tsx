import { cn } from '@findrey/lib/utils';

import { motion, useReducedMotion } from 'framer-motion';
import { Bell } from 'lucide-react';

interface NotificationBellProps {
	unreadCount: number;
	onClick: () => void;
}

export function NotificationBell({ unreadCount, onClick }: NotificationBellProps) {
	const reduce = useReducedMotion();
	const hasUnread = unreadCount > 0;

	return (
		<button
			type="button"
			onClick={onClick}
			className={cn(
				'group relative rounded-full p-2 text-muted-foreground transition-colors',
				'hover:bg-muted hover:text-foreground',
				'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
			)}
			aria-label={`${unreadCount} unread notifications`}
		>
			{!reduce && hasUnread && (
				<span
					className="absolute inset-0 rounded-full"
					style={{ animation: 'notif-ripple 2s ease-out infinite' }}
				/>
			)}

			<motion.span
				className="relative flex"
				whileHover={reduce ? undefined : { scale: 1.08 }}
				whileTap={reduce ? undefined : { scale: 0.92 }}
				transition={{ type: 'spring', stiffness: 400, damping: 20 }}
			>
				<Bell size={18} />
			</motion.span>

			{hasUnread && (
				<motion.span
					initial={reduce ? false : { scale: 0 }}
					animate={{ scale: 1 }}
					transition={reduce
						? { duration: 0 }
						: {
								type: 'spring',
								stiffness: 500,
								damping: 18,
								delay: 0.3,
							}}
					className={cn(
						'absolute -right-0.5 -top-0.5 flex items-center justify-center',
						'rounded-full bg-primary',
						'h-4 min-w-4 px-1 text-[9px] font-bold text-primary-foreground',
					)}
					style={{ fontFamily: 'var(--font-data)' }}
				>
					{unreadCount > 9 ? '9+' : unreadCount}
				</motion.span>
			)}
		</button>
	);
}
