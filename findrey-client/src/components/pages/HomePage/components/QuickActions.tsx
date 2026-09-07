import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@findrey/components/ui/card';

import { motion } from 'framer-motion';

import { quickActions } from './data';

export function QuickActions() {
	return (
		<Card className="border-border bg-card">
			<CardHeader className="pb-2">
				<CardTitle
					className="text-sm font-semibold"
					style={{ fontFamily: 'var(--font-headline)' }}
				>
					Quick Actions
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="grid grid-cols-2 gap-3">
					{quickActions.map(({ label, icon: Icon }) => (
						<motion.button
							key={label}
							whileHover={{ scale: 1.03 }}
							whileTap={{ scale: 0.97 }}
							className="flex flex-col items-center gap-2 rounded-xl border border-border bg-muted/30 py-5 text-center transition-colors hover:border-primary/40 hover:bg-primary/5"
						>
							<div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
								<Icon size={16} className="text-primary" />
							</div>
							<span
								className="text-[11px] font-medium text-foreground"
								style={{ fontFamily: 'var(--font-headline)' }}
							>
								{label}
							</span>
						</motion.button>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
