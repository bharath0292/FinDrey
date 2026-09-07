"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { motion } from "framer-motion"
import {
	Bell,
	CreditCard,
	Globe,
	Key,
	Palette,
	Save,
	Shield,
	User,
	UserCog,
} from "lucide-react"

import { Button } from "@findrey/components/ui/button"
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@findrey/components/ui/form"
import { Input } from "@findrey/components/ui/input"
import { Separator } from "@findrey/components/ui/separator"
import { cn } from "@findrey/lib/utils"

const profileSchema = z.object({
	name: z.string().min(2, "Name too short"),
	email: z.string().email("Invalid email"),
	bio: z.string().max(200, "Max 200 characters").optional(),
})

type Section = "profile" | "security" | "appearance" | "notifications" | "billing"

const SECTIONS: { id: Section; label: string; icon: typeof User }[] = [
	{ id: "profile", label: "Profile", icon: User },
	{ id: "security", label: "Security", icon: Shield },
	{ id: "appearance", label: "Appearance", icon: Palette },
	{ id: "notifications", label: "Notifications", icon: Bell },
	{ id: "billing", label: "Billing", icon: CreditCard },
]

function SectionNav({
	active,
	onChange,
}: {
	active: Section
	onChange: (s: Section) => void
}) {
	return (
		<nav className="flex shrink-0 flex-col gap-1 md:w-48">
			{SECTIONS.map((s) => {
				const Icon = s.icon
				const isActive = s.id === active
				return (
					<button
						key={s.id}
						type="button"
						onClick={() => onChange(s.id)}
						className={cn(
							"flex items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-medium transition-all",
							isActive
								? "bg-primary/10 text-primary"
								: "text-muted-foreground hover:bg-muted hover:text-foreground",
						)}
					>
						<Icon size={16} />
						{s.label}
					</button>
				)
			})}
		</nav>
	)
}

function ProfileSection() {
	const form = useForm<z.infer<typeof profileSchema>>({
		resolver: zodResolver(profileSchema),
		defaultValues: {
			name: "John Jacob",
			email: "john@findrey.app",
			bio: "Making finance fun again.",
		},
	})

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit((v) => console.log(v))}
				className="space-y-6"
			>
				<div>
					<h2 className="text-lg font-semibold text-foreground">Profile</h2>
					<p className="text-sm text-muted-foreground">
						Manage your public profile information
					</p>
				</div>

				<Separator className="bg-border/50" />

				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Full name</FormLabel>
							<FormControl>
								<Input {...field} className="max-w-sm border-border/50 bg-background/50" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input
									type="email"
									{...field}
									className="max-w-sm border-border/50 bg-background/50"
								/>
							</FormControl>
							<FormDescription>Used for login and notifications</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="bio"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Bio</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder="A short bio..."
									className="max-w-sm border-border/50 bg-background/50"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit" className="rounded-xl">
					<Save size={16} />
					Save changes
				</Button>
			</form>
		</Form>
	)
}

function SecuritySection() {
	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-lg font-semibold text-foreground">Security</h2>
				<p className="text-sm text-muted-foreground">
					Manage your password and authentication methods
				</p>
			</div>
			<Separator className="bg-border/50" />
			<div className="space-y-4">
				<div className="flex items-center justify-between rounded-lg border border-border/50 bg-card/50 p-4">
					<div className="flex items-start gap-3">
						<Key size={18} className="mt-0.5 text-muted-foreground" />
						<div>
							<p className="text-sm font-medium text-foreground">Password</p>
							<p className="text-xs text-muted-foreground">
								Last changed 3 months ago
							</p>
						</div>
					</div>
					<Button variant="outline" size="sm" className="rounded-lg">
						Change
					</Button>
				</div>
				<div className="flex items-center justify-between rounded-lg border border-border/50 bg-card/50 p-4">
					<div className="flex items-start gap-3">
						<Globe size={18} className="mt-0.5 text-muted-foreground" />
						<div>
							<p className="text-sm font-medium text-foreground">Google sign-in</p>
							<p className="text-xs text-muted-foreground">
								Connected — john@gmail.com
							</p>
						</div>
					</div>
					<Button variant="outline" size="sm" className="rounded-lg">
						Manage
					</Button>
				</div>
			</div>
		</div>
	)
}

function AppearanceSection() {
	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-lg font-semibold text-foreground">Appearance</h2>
				<p className="text-sm text-muted-foreground">
					Customize how FinDrey looks for you
				</p>
			</div>
			<Separator className="bg-border/50" />
			<p className="text-sm text-muted-foreground">Theme settings coming soon.</p>
		</div>
	)
}

function NotificationsSection() {
	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-lg font-semibold text-foreground">Notifications</h2>
				<p className="text-sm text-muted-foreground">
					Choose which notifications you receive
				</p>
			</div>
			<Separator className="bg-border/50" />
			<p className="text-sm text-muted-foreground">Notification preferences coming soon.</p>
		</div>
	)
}

function BillingSection() {
	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-lg font-semibold text-foreground">Billing</h2>
				<p className="text-sm text-muted-foreground">
					Manage your subscription and payment methods
				</p>
			</div>
			<Separator className="bg-border/50" />
			<div className="flex items-center justify-between rounded-lg border border-border/50 bg-card/50 p-4">
				<div className="flex items-start gap-3">
					<CreditCard size={18} className="mt-0.5 text-muted-foreground" />
					<div>
						<p className="text-sm font-medium text-foreground">Free plan</p>
						<p className="text-xs text-muted-foreground">No payment method</p>
					</div>
				</div>
				<Button variant="outline" size="sm" className="rounded-lg">
					Upgrade
				</Button>
			</div>
		</div>
	)
}

export function UserSettingsPage() {
	const [section, setSection] = useState<Section>("profile")

	return (
		<motion.div
			initial={{ opacity: 0, y: 8 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
			className="mx-auto max-w-4xl px-4 py-8"
		>
			<div className="mb-8 flex items-center gap-3">
				<UserCog size={24} className="text-primary" />
				<div>
					<h1 className="text-xl font-bold text-foreground">Settings</h1>
					<p className="text-sm text-muted-foreground">
						Manage your account and preferences
					</p>
				</div>
			</div>

			<div className="flex flex-col gap-8 md:flex-row">
				<SectionNav active={section} onChange={setSection} />
				<div className="flex-1">
					<motion.div
						key={section}
						initial={{ opacity: 0, x: 8 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.2 }}
					>
						{section === "profile" && <ProfileSection />}
						{section === "security" && <SecuritySection />}
						{section === "appearance" && <AppearanceSection />}
						{section === "notifications" && <NotificationsSection />}
						{section === "billing" && <BillingSection />}
					</motion.div>
				</div>
			</div>
		</motion.div>
	)
}