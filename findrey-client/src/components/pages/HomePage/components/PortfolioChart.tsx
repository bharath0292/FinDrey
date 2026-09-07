
import { useMemo } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@findrey/components/ui/card';

import { portfolioData } from './data';

export function PortfolioChart() {
	const total = useMemo(
		() => portfolioData.reduce((s, d) => s + d.value, 0),
		[],
	);

	const radius = 70;
	const circumference = 2 * Math.PI * radius;

	const slices = useMemo(() => {
		let acc = 0;
		return portfolioData.map((d) => {
			const fraction = d.value / total;
			const rotate = (acc / total) * 360 - 90;
			acc += d.value;
			return {
				...d,
				fraction,
				rotate,
			};
		});
	}, [total]);

	return (
		<Card className="border-border bg-card">
			<CardHeader className="pb-2">
				<CardTitle
					className="text-sm font-semibold"
					style={{ fontFamily: 'var(--font-headline)' }}
				>
					Portfolio Breakdown
				</CardTitle>
				<p className="text-xs text-muted-foreground">Total assets</p>
			</CardHeader>
			<CardContent>
				<div className="flex items-center gap-4">
					{/* Donut */}
					<div className="relative mx-auto aspect-square max-h-[180px] shrink-0 flex-1">
						<svg viewBox="0 0 200 200" className="h-full w-full -rotate-90">
							{slices.map((s) => (
								<circle
									key={s.name}
									cx={100}
									cy={100}
									r={radius}
									fill="none"
									stroke={s.color}
									strokeWidth={22}
									strokeDasharray={`${circumference * s.fraction} ${circumference}`}
									strokeDashoffset={0}
									transform={`rotate(${s.rotate} 100 100)`}
									strokeLinecap="butt"
								/>
							))}
						</svg>
						{/* Center text overlay */}
						<div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
							<span
								className="text-xl font-bold text-foreground"
								style={{ fontFamily: 'var(--font-data)' }}
							>
								${(total / 1000).toFixed(1)}k
							</span>
							<span className="text-[10px] text-muted-foreground">total</span>
						</div>
					</div>

					<ul className="flex-1 space-y-2">
						{portfolioData.map((item) => (
							<li key={item.name} className="flex items-center justify-between">
								<span className="flex items-center gap-2 text-xs text-muted-foreground">
									<span
										className="inline-block h-2 w-2 rounded-full"
										style={{ background: item.color }}
									/>
									{item.label}
								</span>
								<span
									className="text-xs font-semibold text-foreground"
									style={{ fontFamily: 'var(--font-data)' }}
								>
									${item.value.toLocaleString()}
								</span>
							</li>
						))}
					</ul>
				</div>
			</CardContent>
		</Card>
	);
}
