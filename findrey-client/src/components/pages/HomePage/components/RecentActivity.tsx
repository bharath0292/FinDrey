import { Card, CardContent, CardHeader, CardTitle } from '@findrey/components/ui/card';
import { cn } from '@findrey/lib/utils';

import { recentActivity } from './data';

export function RecentActivity() {
	return (
		<Card className="border-border bg-card">
			<CardHeader className="pb-2">
				<CardTitle
					className="text-sm font-semibold"
					style={{ fontFamily: 'var(--font-headline)' }}
				>
					Recent Activity
				</CardTitle>
			</CardHeader>
			<CardContent>
				<ul className="space-y-0.5">
					{recentActivity.map((tx) => (
						<li
							key={tx.name + tx.date}
							className="flex items-center justify-between rounded-lg px-2 py-3 transition-colors hover:bg-muted/40"
						>
							<div className="flex items-center gap-3">
								<div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
									{tx.name[0]}
								</div>
								<div>
									<p className="text-sm font-medium text-foreground">
										{tx.name}
									</p>
									<p className="text-[11px] text-muted-foreground">{tx.date}</p>
								</div>
							</div>
							<span
								className={cn(
									'text-sm font-semibold tabular-nums',
									tx.income ? 'text-emerald-500' : 'text-foreground',
								)}
								style={{ fontFamily: 'var(--font-data)' }}
							>
								{tx.amount}
							</span>
						</li>
					))}
				</ul>
			</CardContent>
		</Card>
	);
}
