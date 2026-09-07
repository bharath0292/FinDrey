import { useEffect, useState } from 'react';

interface BudgetBarProps {
	pct: number;
	color: string;
}

export function BudgetBar({ pct, color }: BudgetBarProps) {
	const [width, setWidth] = useState(0);

	useEffect(() => {
		setWidth(pct);
	}, [pct]);

	return (
		<div className="h-1.5 overflow-hidden rounded-full bg-muted">
			<div
				className="h-full rounded-full"
				style={{
					width: `${width}%`,
					background: color,
					transition: 'width 1.2s cubic-bezier(0.22,1,0.36,1)',
				}}
			/>
		</div>
	);
}
