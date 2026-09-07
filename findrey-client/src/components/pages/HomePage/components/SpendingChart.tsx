import { useMemo, useRef, useState } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@findrey/components/ui/card';

import { spendingData } from './data';

export function SpendingChart() {
	const width = 500;
	const height = 200;
	const pad = { top: 10, right: 12, bottom: 28, left: 12 };
	const innerW = width - pad.left - pad.right;
	const innerH = height - pad.top - pad.bottom;

	const yMax = useMemo(
		() => Math.max(...spendingData.map((d) => d.amount)) * 1.1,
		[],
	);

	const xAt = (i: number) =>
		pad.left + (i / (spendingData.length - 1)) * innerW;
	const yAt = (v: number) => pad.top + innerH - (v / yMax) * innerH;

	const areaPath = useMemo(() => {
		const top = spendingData
			.map((d, i) => `${i === 0 ? 'M' : 'L'} ${xAt(i)} ${yAt(d.amount)}`)
			.join(' ');
		const bottom = `L ${xAt(spendingData.length - 1)} ${pad.top + innerH} L ${pad.left} ${pad.top + innerH} Z`;
		return `${top} ${bottom}`;
	}, []);

	const linePath = useMemo(() => {
		return spendingData
			.map((d, i) => `${i === 0 ? 'M' : 'L'} ${xAt(i)} ${yAt(d.amount)}`)
			.join(' ');
	}, []);

	const [hover, setHover] = useState<number | null>(null);
	const hoverIdxRef = useRef<number | null>(null);

	return (
		<Card className="border-border bg-card">
			<CardHeader className="pb-2">
				<CardTitle
					className="text-sm font-semibold"
					style={{ fontFamily: 'var(--font-headline)' }}
				>
					Spending Trend
				</CardTitle>
				<p className="text-xs text-muted-foreground">Last 6 months</p>
			</CardHeader>
			<CardContent>
				<div className="relative w-full" style={{ aspectRatio: '2.5/1' }}>
					<svg
						viewBox={`0 0 ${width} ${height}`}
						className="h-full w-full overflow-visible"
						preserveAspectRatio="none"
					>
						<defs>
							<linearGradient id="spendingFill" x1="0" y1="0" x2="0" y2="1">
								<stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.35} />
								<stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0} />
							</linearGradient>
						</defs>

						{/* Grid lines */}
						{[0.25, 0.5, 0.75].map((r) => (
							<line
								key={r}
								x1={pad.left}
								x2={width - pad.right}
								y1={pad.top + innerH * (1 - r)}
								y2={pad.top + innerH * (1 - r)}
								stroke="var(--border)"
								strokeWidth={1}
								strokeDasharray="3 3"
								opacity={0.5}
							/>
						))}

						{/* Area */}
						<path d={areaPath} fill="url(#spendingFill)" />

						{/* Line */}
						<path
							d={linePath}
							fill="none"
							stroke="var(--chart-1)"
							strokeWidth={2.5}
							strokeLinecap="round"
							strokeLinejoin="round"
						/>

						{/* X labels */}
						{spendingData.map((d, i) => (
							<text
								key={d.month}
								x={xAt(i)}
								y={height - 4}
								className="fill-muted-foreground"
								textAnchor="middle"
								style={{ fontSize: '10px' }}
							>
								{d.month}
							</text>
						))}

						{/* Hover dot */}
						{hover != null && (
							<g>
								<circle
									cx={xAt(hover)}
									cy={yAt(spendingData[hover].amount)}
									r={4}
									fill="var(--chart-1)"
									stroke="var(--background)"
									strokeWidth={2}
								/>
								<line
									x1={xAt(hover)}
									x2={xAt(hover)}
									y1={pad.top}
									y2={pad.top + innerH}
									stroke="var(--border)"
									strokeWidth={1}
									strokeDasharray="3 2"
								/>
							</g>
						)}
					</svg>

					{/* Tooltip */}
					{hover != null && (
						<div
							className="pointer-events-none absolute rounded-md border border-border bg-popover px-2 py-1 text-xs shadow-md"
							style={{
								left: `${(xAt(hover) / width) * 100}%`,
								top: `${(yAt(spendingData[hover].amount) / height) * 100 - 16}%`,
								transform: 'translate(-50%, -100%)',
								whiteSpace: 'nowrap',
							}}
						>
							<div className="font-semibold">{spendingData[hover].month}</div>
							<div style={{ fontFamily: 'var(--font-data)' }}>
								${spendingData[hover].amount.toLocaleString()}
							</div>
						</div>
					)}

					{/* Invisible overlay for hit areas */}
					<div className="absolute inset-0 flex">
						{spendingData.map((d, i) => (
							<div
								key={d.month}
								className="flex-1 cursor-crosshair"
								onMouseEnter={() => {
									hoverIdxRef.current = i;
									setHover(i);
								}}
								onMouseLeave={() => {
									hoverIdxRef.current = null;
									setHover(null);
								}}
							/>
						))}
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
