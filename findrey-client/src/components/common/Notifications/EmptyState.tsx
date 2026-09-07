import { cn } from '@findrey/lib/utils';

import { BellOff } from 'lucide-react';

interface EmptyStateProps {
	label?: string;
	description?: string;
}

export function EmptyState({
	label = 'All clear',
	description = 'No notifications yet. We will let you know when something arrives.',
}: EmptyStateProps) {
	return (
		<div className="flex flex-col items-center justify-center px-6 py-16 text-center">
			<div className="relative mb-4">
				<div
					className={cn(
						'flex h-14 w-14 items-center justify-center rounded-full',
						'bg-muted',
					)}
				>
					<BellOff size={22} className="text-muted-foreground/40" />
				</div>
				<div
					className="absolute inset-0 rounded-full opacity-20"
					style={{
						background:
							'radial-gradient(circle, var(--primary) 0%, transparent 70%)',
					}}
				/>
			</div>

			<p className="mb-1 text-sm font-semibold text-foreground">{label}</p>
			<p className="max-w-[200px] text-xs leading-relaxed text-muted-foreground/60">
				{description}
			</p>
		</div>
	);
}
