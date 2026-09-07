import { useId } from 'react';

interface LogoProps {
	size?: number;
	className?: string;
}

export function Logo({ size = 32, className }: LogoProps) {
	const uid = useId().replace(/:/g, '');
	const gradId = `logo-grad-${uid}`;

	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 32 32"
			fill="none"
			className={className}
			aria-label="FinDrey"
		>
			<defs>
				<linearGradient
					id={gradId}
					x1="0"
					y1="0"
					x2="32"
					y2="32"
					gradientUnits="userSpaceOnUse"
				>
					<stop offset="0%" stopColor="var(--color-primary)" />
					<stop offset="100%" stopColor="var(--color-accent)" />
				</linearGradient>
			</defs>

			{/* Background tile */}
			<rect width="32" height="32" rx="8" fill={`url(#${gradId})`} />

			{/* "F" monogram — top bar + stem + mid bar */}
			<path d="M7 7H25V11H11V15H21V19H11V25H7Z" fill="white" />

			{/* Small upward-right trend dot — finance growth metaphor */}
			<circle cx="24" cy="20" r="2.5" fill="white" fillOpacity="0.75" />
			<path
				d="M21 23L26.5 17"
				stroke="white"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeOpacity="0.75"
			/>
		</svg>
	);
}
