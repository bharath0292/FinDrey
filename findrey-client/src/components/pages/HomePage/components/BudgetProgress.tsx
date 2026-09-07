
import { Card, CardContent, CardHeader, CardTitle } from '@findrey/components/ui/card';

import { BudgetBar } from './BudgetBar';
import { budgets } from './data';

export function BudgetProgress() {
	return (
		<Card className="border-border bg-card">
			<CardHeader className="pb-2">
				<CardTitle
					className="text-sm font-semibold"
					style={{ fontFamily: 'var(--font-headline)' }}
				>
					Budget Progress
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-5">
				{budgets.map((b) => {
					const pct = Math.min((b.spent / b.total) * 100, 100);
					return (
						<div key={b.label}>
							<div className="mb-1.5 flex items-center justify-between text-xs">
								<span className="font-medium text-foreground">{b.label}</span>
								<span
									className="text-muted-foreground"
									style={{ fontFamily: 'var(--font-data)' }}
								>
									${b.spent.toLocaleString()} / ${b.total.toLocaleString()}
								</span>
							</div>
							<BudgetBar pct={pct} color={b.color} />
							<p className="mt-1 text-right text-[10px] text-muted-foreground">
								{pct.toFixed(0)}% used
							</p>
						</div>
					);
				})}
			</CardContent>
		</Card>
	);
}
