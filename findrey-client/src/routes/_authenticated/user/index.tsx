import { motion } from 'framer-motion';
import { Camera, Mail, MapPin, User, Calendar } from 'lucide-react';

import { Avatar, AvatarFallback } from '@findrey/components/ui/avatar';
import { Button } from '@findrey/components/ui/button';
import { Card, CardContent } from '@findrey/components/ui/card';
import { Separator } from '@findrey/components/ui/separator';
import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/user/')({
	component: Profile,
});

function Profile() {
	return (
		<motion.div
			initial={{ opacity: 0, y: 8 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
			className="mx-auto max-w-3xl px-4 py-8"
		>
			<div className="mb-8 flex items-start gap-6">
				<div className="relative shrink-0">
					<Avatar className="size-20 ring-2 ring-primary/20">
						<AvatarFallback className="bg-primary/15 text-xl font-bold text-primary">
							JJ
						</AvatarFallback>
					</Avatar>
					<button
						type="button"
						className="absolute -bottom-1 -right-1 flex size-7 items-center justify-center rounded-full border border-border bg-card text-muted-foreground shadow-sm transition-colors hover:text-foreground"
					>
						<Camera size={12} />
					</button>
				</div>
				<div className="flex-1">
					<h1 className="text-2xl font-bold text-foreground">John Jacob</h1>
					<div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
						<span className="flex items-center gap-1">
							<Mail size={14} />
							john@findrey.app
						</span>
						<span className="flex items-center gap-1">
							<Calendar size={14} />
							Joined March 2025
						</span>
						<span className="flex items-center gap-1">
							<MapPin size={14} />
							Remote
						</span>
					</div>
					<div className="mt-4 flex gap-2">
						<Button size="sm" variant="outline" className="rounded-lg" asChild>
							<Link to="/user/settings">Edit profile</Link>
						</Button>
						<Button size="sm" className="rounded-lg">
							Share profile
						</Button>
					</div>
				</div>
			</div>

			<Separator className="bg-border/50" />

			<div className="mt-6 grid gap-4 sm:grid-cols-2">
				<Card className="border-border/50 bg-card/50">
					<CardContent className="p-4">
						<div className="flex items-center gap-2 text-sm text-muted-foreground">
							<User size={16} />
							Accounts
						</div>
						<p className="mt-2 text-2xl font-bold text-foreground">6</p>
					</CardContent>
				</Card>
				<Card className="border-border/50 bg-card/50">
					<CardContent className="p-4">
						<div className="flex items-center gap-2 text-sm text-muted-foreground">
							<Calendar size={16} />
							Categories
						</div>
						<p className="mt-2 text-2xl font-bold text-foreground">12</p>
					</CardContent>
				</Card>
			</div>
		</motion.div>
	);
}
