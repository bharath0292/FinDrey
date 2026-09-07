import { useState } from 'react';

import { Logo } from '@findrey/components/common/Logo';
import { Button } from '@findrey/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@findrey/components/ui/form';
import { Input } from '@findrey/components/ui/input';
import { cn } from '@findrey/lib/utils';

import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const loginSchema = z.object({
	email: z.string().email('Invalid email address'),
	password: z.string().min(6, 'Min 6 characters'),
});

const signupSchema = z.object({
	name: z.string().min(2, 'Name too short'),
	email: z.string().email('Invalid email address'),
	password: z.string().min(8, 'Min 8 characters'),
});

type Mode = 'login' | 'signup';

function Orb({ className, delay }: { className?: string; delay: number }) {
	return (
		<motion.div
			className={cn(
				'pointer-events-none absolute rounded-full opacity-[0.08] blur-3xl',
				className,
			)}
			animate={{
				x: [0, 30, -20, 10, 0],
				y: [0, -25, 15, -10, 0],
				scale: [1, 1.12, 0.94, 1.06, 1],
			}}
			transition={{
				duration: 8,
				delay,
				repeat: Infinity,
				ease: 'easeInOut',
			}}
		/>
	);
}

function Particles() {
	return (
		<div className="pointer-events-none absolute inset-0 overflow-hidden">
			{Array.from({ length: 30 }).map((_, i) => (
				<motion.div
					key={i}
					className="absolute h-0.5 w-0.5 rounded-full bg-primary/30"
					style={{
						left: `${Math.random() * 100}%`,
						top: `${Math.random() * 100}%`,
					}}
					animate={{
						y: [0, -80, 0],
						opacity: [0, 1, 0],
					}}
					transition={{
						duration: 3 + Math.random() * 4,
						delay: Math.random() * 5,
						repeat: Infinity,
						ease: 'easeInOut',
					}}
				/>
			))}
		</div>
	);
}

export function AuthForm() {
	const [mode, setMode] = useState<Mode>('login');

	const schema = mode === 'login' ? loginSchema : signupSchema;
	type FormData = z.infer<typeof schema>;

	const form = useForm<FormData>({
		resolver: zodResolver(schema),
		defaultValues: { email: '', password: '', name: '' },
	});

	const [loading, setLoading] = useState(false);

	function onSubmit(_values: FormData) {
		setLoading(true);
		setTimeout(() => setLoading(false), 1500);
	}

	const toggle = () => {
		setMode((m) => (m === 'login' ? 'signup' : 'login'));
		form.reset();
	};

	return (
		<div className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-background px-4">
			{/* Ambient orbs */}
			<Orb
				className="bg-primary -left-[20%] -top-[20%] h-[50%] w-[50%]"
				delay={0}
			/>
			<Orb
				className="bg-accent -bottom-[15%] -right-[15%] h-[45%] w-[45%]"
				delay={2.5}
			/>
			<Orb
				className="bg-primary left-[30%] top-[60%] h-[30%] w-[30%]"
				delay={5}
			/>
			<Particles />

			{/* Backdrop grid */}
			<div
				className="pointer-events-none absolute inset-0 opacity-[0.03]"
				style={{
					backgroundImage:
						'linear-gradient(var(--primary) 1px, transparent 1px), linear-gradient(90deg, var(--primary) 1px, transparent 1px)',
					backgroundSize: '60px 60px',
				}}
			/>

			{/* Logo */}
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
				className="mb-8 flex items-center gap-3"
			>
				<Logo size={36} />
				<span
					className="text-2xl font-bold tracking-wider text-foreground"
					style={{ fontFamily: 'var(--font-headline)' }}
				>
					FinDrey
				</span>
			</motion.div>

			{/* Card */}
			<motion.div
				initial={{ opacity: 0, y: 30, scale: 0.96 }}
				animate={{ opacity: 1, y: 0, scale: 1 }}
				transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
				className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-primary/10 bg-card/60 p-8 shadow-2xl backdrop-blur-xl"
			>
				<div className="pointer-events-none absolute -inset-1 rounded-[inherit] bg-gradient-to-b from-primary/[0.06] to-transparent" />

				{/* Title */}
				<AnimatePresence mode="wait">
					<motion.div
						key={mode}
						initial={{ opacity: 0, y: -8 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 8 }}
						transition={{ duration: 0.2 }}
						className="relative mb-6"
					>
						<h1 className="text-xl font-bold tracking-tight text-foreground">
							{mode === 'login' ? 'Welcome back' : 'Create account'}
						</h1>
						<p className="mt-1 text-sm text-muted-foreground">
							{mode === 'login'
								? 'Sign in to your FinDrey account'
								: 'Get started with FinDrey'}
						</p>
					</motion.div>
				</AnimatePresence>

				{/* Form */}
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="relative space-y-4"
					>
						<AnimatePresence mode="wait">
							{mode === 'signup' && (
								<motion.div
									key="name"
									initial={{ opacity: 0, height: 0 }}
									animate={{ opacity: 1, height: 'auto' }}
									exit={{ opacity: 0, height: 0 }}
									transition={{ duration: 0.2 }}
								>
									<FormField
										control={form.control}
										name="name"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Full name</FormLabel>
												<FormControl>
													<Input
														placeholder="Jane Doe"
														autoComplete="name"
														className="border-border/50 bg-background/50 focus-visible:border-primary/30"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</motion.div>
							)}
						</AnimatePresence>

						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											type="email"
											placeholder="you@example.com"
											autoComplete="email"
											className="border-border/50 bg-background/50 focus-visible:border-primary/30"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input
											type="password"
											placeholder="••••••••"
											autoComplete={
												mode === 'login' ? 'current-password' : 'new-password'
											}
											className="border-border/50 bg-background/50 focus-visible:border-primary/30"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button
							type="submit"
							disabled={loading}
							size="lg"
							className="relative w-full overflow-hidden rounded-xl font-semibold"
						>
							{loading && <Loader2 className="mr-2 size-4 animate-spin" />}
							{loading
								? mode === 'login'
									? 'Signing in...'
									: 'Creating account...'
								: mode === 'login'
									? 'Sign in'
									: 'Create account'}
						</Button>
					</form>
				</Form>

				{/* Divider */}
				<div className="relative my-6">
					<div className="absolute inset-0 flex items-center">
						<div className="w-full border-t border-border/50" />
					</div>
					<div className="relative flex justify-center text-xs uppercase">
						<span className="bg-card/60 px-2 text-muted-foreground">or</span>
					</div>
				</div>

				{/* Google */}
				<Button
					variant="outline"
					className="w-full rounded-xl border-border/50 bg-background/50 text-foreground/80 hover:bg-background/80"
				>
					<svg className="mr-2 size-4" viewBox="0 0 24 24">
						<path
							d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
							fill="#4285F4"
						/>
						<path
							d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
							fill="#34A853"
						/>
						<path
							d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
							fill="#FBBC05"
						/>
						<path
							d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
							fill="#EA4335"
						/>
					</svg>
					Google
				</Button>

				{/* Toggle mode */}
				<p className="relative mt-6 text-center text-sm text-muted-foreground">
					{mode === 'login' ? 'No account yet?' : 'Already have an account?'}
					<button
						type="button"
						onClick={toggle}
						className="ml-1 font-medium text-primary underline-offset-4 hover:underline"
					>
						{mode === 'login' ? 'Sign up' : 'Sign in'}
					</button>
				</p>
			</motion.div>
		</div>
	);
}
