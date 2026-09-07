import { Card, CardContent, CardHeader, CardTitle } from '@findrey/components/ui/card';
import { cn } from '@findrey/lib/utils';

import { upcomingBills } from './data';

export function UpcomingBills() {
	return (
		<Card className="border-border bg-card">
			<CardHeader className="pb-2">
				<CardTitle
					className="text-sm font-semibold"
					style={{ fontFamily: 'var(--font-headline)' }}
				>
					Upcoming Bills
				</CardTitle>
			</CardHeader>
			<CardContent>
				<ul className="space-y-0.5">
					{upcomingBills.map((bill) => (
						<li
							key={bill.name}
							className="flex items-center justify-between rounded-lg px-2 py-3 transition-colors hover:bg-muted/40"
						>
							<div>
								<p className="text-sm font-medium text-foreground">
									{bill.name}
								</p>
								<p className="text-[10px] text-muted-foreground">
									Due {bill.due}
								</p>
							</div>
							<span
								className={cn(
									'text-sm font-semibold tabular-nums',
									bill.urgent ? 'text-destructive' : 'text-muted-foreground',
								)}
								style={{ fontFamily: 'var(--font-data)' }}
							>
								{bill.amount}
							</span>
						</li>
					))}
				</ul>
			</CardContent>
		</Card>
	);
}
