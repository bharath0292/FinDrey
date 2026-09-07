import { Card, CardContent } from '@findrey/components/ui/card';

import { motion } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';

import { AnimatedCounter } from './AnimatedCounter';
import type { StatItem } from './data';

export function StatCard({
	label,
	value,
	sub,
	icon: Icon,
	up,
	prefix,
	dec,
}: StatItem) {
	return (
		<motion.div
			whileHover={{
				y: -3,
				transition: { type: 'spring', stiffness: 400, damping: 22 },
			}}
		>
			<Card className="h-full border-border bg-card transition-colors duration-200 hover:border-primary/40">
				<CardContent className="p-5">
					<div className="mb-3 flex items-center justify-between">
						<span
							className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground"
							style={{ fontFamily: 'var(--font-headline)' }}
						>
							{label}
						</span>
						<div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
							<Icon size={13} className="text-primary" />
						</div>
					</div>

					<div className="text-[1.65rem] font-bold leading-none text-foreground">
						<AnimatedCounter value={value} prefix={prefix} dec={dec} />
					</div>

					<div className="mt-2.5 flex items-center gap-1">
						{up ? (
							<ArrowUpRight size={11} className="shrink-0 text-emerald-500" />
						) : (
							<ArrowDownRight size={11} className="shrink-0 text-destructive" />
						)}
						<span className="text-[11px] text-muted-foreground">{sub}</span>
					</div>
				</CardContent>
			</Card>
		</motion.div>
	);
}
