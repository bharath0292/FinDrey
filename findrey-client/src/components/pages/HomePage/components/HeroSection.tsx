import { useEffect, useState } from 'react';

import { Button } from '@findrey/components/ui/button';

import { BarChart3, Plus } from 'lucide-react';

import { AnimatedCounter } from './AnimatedCounter';

export function HeroSection() {
	const [greeting, setGreeting] = useState('Welcome');

	useEffect(() => {
		const hour = new Date().getHours();
		setGreeting(
			hour < 12
				? 'Good morning'
				: hour < 17
					? 'Good afternoon'
					: 'Good evening',
		);
	}, []);

	return (
		<div
			className="relative overflow-hidden rounded-2xl border border-primary/20 p-8 md:p-12"
			style={{
				background: 'var(--gradient-hero-bg)',
			}}
		>
			<div
				aria-hidden="true"
				className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full"
				style={{
					background:
						'radial-gradient(circle, var(--gradient-hero-orb-1), transparent 65%)',
					animation: 'mesh-drift 14s ease-in-out infinite',
				}}
			/>
			<div
				aria-hidden="true"
				className="pointer-events-none absolute -bottom-20 right-0 h-72 w-72 rounded-full"
				style={{
					background:
						'radial-gradient(circle, var(--gradient-hero-orb-2), transparent 65%)',
					animation: 'mesh-drift 18s ease-in-out infinite reverse',
				}}
			/>

			<div className="relative z-10">
				<p
					className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary"
					style={{ fontFamily: 'var(--font-headline)' }}
				>
					{greeting}, John
				</p>

				<div className="mb-2">
					<p
						className="mb-1 text-xs font-medium"
						style={{ color: 'var(--hero-text-muted)' }}
					>
						Total net worth
					</p>
					<div className="flex flex-wrap items-end gap-4">
						<h1
							className="text-6xl font-bold leading-none tracking-tight md:text-7xl"
							style={{ color: 'var(--hero-text)' }}
						>
							<AnimatedCounter value={24850} prefix="$" dec={2} />
						</h1>
						<span className="mb-1 flex items-center gap-1 text-sm font-semibold text-emerald-400">
							<svg
								className="shrink-0"
								width="14"
								height="14"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path d="M7 17l9.2-9.2M17 17V7H7" />
							</svg>
							+2.4% this month
						</span>
					</div>
					<p
						className="mt-2 text-sm"
						style={{ color: 'var(--hero-text-muted)' }}
					>
						↑ $580 gained since last month
					</p>
				</div>

				<div className="mt-6 flex flex-wrap gap-3">
					<Button
						size="sm"
						className="gap-2 bg-primary text-primary-foreground hover:bg-primary/85"
					>
						<Plus size={14} />
						Add Transaction
					</Button>
					<Button
						variant="outline"
						size="sm"
						className="gap-2 hover:bg-[var(--hero-glass-hover)] hover:text-[var(--hero-text)]"
						style={{
							borderColor: 'var(--hero-glass-border)',
							backgroundColor: 'var(--hero-glass-bg)',
							color: 'var(--hero-glass-text)',
						}}
					>
						<BarChart3 size={14} />
						Analytics
					</Button>
				</div>
			</div>
		</div>
	);
}
