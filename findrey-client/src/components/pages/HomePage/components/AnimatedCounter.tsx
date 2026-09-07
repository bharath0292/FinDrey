
import { useEffect, useRef, useState } from 'react';

interface AnimatedCounterProps {
	value: number;
	prefix?: string;
	dec?: number;
	suffix?: string;
}

export function AnimatedCounter({
	value,
	prefix = '',
	dec = 2,
	suffix = '',
}: AnimatedCounterProps) {
	const [display, setDisplay] = useState(value);
	const rafRef = useRef<number>(0);

	useEffect(() => {
		setDisplay(0);
		const duration = 1400;
		const start = performance.now();

		const tick = () => {
			const p = Math.min((performance.now() - start) / duration, 1);
			const eased = p === 1 ? 1 : 1 - 2 ** (-10 * p);
			setDisplay(value * eased);
			if (p < 1) rafRef.current = requestAnimationFrame(tick);
		};

		rafRef.current = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(rafRef.current);
	}, [value]);

	return (
		<span style={{ fontFamily: 'var(--font-data)' }}>
			{prefix}
			{display.toFixed(dec).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
			{suffix}
		</span>
	);
}
