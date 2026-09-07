import { useState } from 'react';

import { Input } from '@findrey/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@findrey/components/ui/select';

import { AnimatePresence, motion } from 'framer-motion';
import {
	Banknote,
	BarChart3,
	ChevronDown,
	ChevronUp,
	Coins,
	FileText,
	HandCoins,
	Percent,
	Repeat,
	Stamp,
	Tags,
	UserRound,
} from 'lucide-react';

import { useTransactionsV2PageContext } from '../../context';

// ── Static select items ─────────────────────────────────────
const freqItems = [
	{ id: 'daily', label: 'Daily' },
	{ id: 'weekly', label: 'Weekly' },
	{ id: 'monthly', label: 'Monthly' },
	{ id: 'quarterly', label: 'Quarterly' },
	{ id: 'half-yearly', label: 'Half Yearly' },
	{ id: 'yearly', label: 'Yearly' },
];

const assetClassItems = [
	{ id: 'equity', label: 'Equity' },
	{ id: 'mutual_fund', label: 'Mutual Fund' },
	{ id: 'crypto', label: 'Crypto' },
	{ id: 'gold', label: 'Gold' },
	{ id: 'real_estate', label: 'Real Estate' },
	{ id: 'fixed_deposit', label: 'Fixed Deposit' },
	{ id: 'recurring_deposit', label: 'Recurring Deposit' },
	{ id: 'bonds', label: 'Bonds' },
	{ id: 'nps', label: 'NPS' },
	{ id: 'ppf', label: 'PPF' },
	{ id: 'other', label: 'Other' },
];

// ── Collapsible card wrapper ────────────────────────────────
function CollapsibleCard({
	title,
	icon: Icon,
	defaultOpen = false,
	children,
}: {
	title: string;
	icon: React.ElementType;
	defaultOpen?: boolean;
	children: React.ReactNode;
}) {
	const [isOpen, setIsOpen] = useState(defaultOpen);

	return (
		<motion.div
			layout
			className="overflow-hidden rounded-xl border border-border/50 bg-card"
		>
			<button
				type="button"
				onClick={() => setIsOpen(!isOpen)}
				className="flex w-full items-center justify-between px-4 py-3 text-left transition-colors hover:bg-accent/50"
			>
				<div className="flex items-center gap-2">
					<Icon className="size-4 text-cyan-400" />
					<span className="text-sm font-medium text-foreground">{title}</span>
				</div>
				{isOpen ? (
					<ChevronUp className="size-4 text-muted-foreground" />
				) : (
					<ChevronDown className="size-4 text-muted-foreground" />
				)}
			</button>

			<AnimatePresence initial={false}>
				{isOpen && (
					<motion.div
						key="content"
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: 'auto', opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: 0.25, ease: 'easeInOut' }}
						className="overflow-hidden"
					>
						<div className="border-t border-border/50 px-4 py-4">
							{children}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	);
}

// ── Helper: render shadcn Select with items ─────────────────
function SimpleSelect({
	value,
	onValueChange,
	placeholder,
	items,
	disabled,
}: {
	value?: string;
	onValueChange: (v: string) => void;
	placeholder: string;
	items: { id: string; label: string }[];
	disabled?: boolean;
}) {
	return (
		<Select
			value={value ?? undefined}
			onValueChange={onValueChange}
			disabled={disabled}
		>
			<SelectTrigger className="h-9">
				<SelectValue placeholder={placeholder} />
			</SelectTrigger>
			<SelectContent>
				{items.map((item) => (
					<SelectItem key={item.id} value={item.id}>
						{item.label}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}

export function AdvancedSection() {
	const { formData, setFormField } = useTransactionsV2PageContext();

	const setNestedField = <S extends keyof typeof formData>(
		section: S,
		values: Record<string, unknown>,
	) => {
		setFormField(section, {
			...(formData[section] as object | undefined),
			...values,
		} as never);
	};

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.4, delay: 0.2 }}
			className="space-y-3"
		>
			{/* ponytail: collapsible cards use local state, not context — fine for presentation toggle */}

			{/* ── Recurring / EMI Card ── */}
			<CollapsibleCard title="Recurring & EMI" icon={Repeat}>
				<div className="space-y-4">
					<label className="flex items-center gap-2 text-sm text-muted-foreground">
						<input
							type="checkbox"
							checked={formData.recurring?.isRecurring ?? false}
							onChange={(e) =>
								setNestedField('recurring', { isRecurring: e.target.checked })
							}
							className="size-4 accent-cyan-500"
						/>
						Recurring Transaction
					</label>

					{formData.recurring?.isRecurring && (
						<div className="space-y-3 pl-4">
							<div className="grid grid-cols-1 gap-3 md:grid-cols-3">
								<div>
									<label className="mb-1 block text-xs text-muted-foreground">
										Frequency
									</label>
									<SimpleSelect
										value={formData.recurring?.frequency}
										onValueChange={(v) =>
											setNestedField('recurring', { frequency: v })
										}
										placeholder="Select..."
										items={freqItems}
									/>
								</div>
							</div>
						</div>
					)}

					<div className="border-t border-border/30 pt-3">
						<h4 className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-cyan-400">
							<Coins className="size-3.5" />
							EMI Details
						</h4>
						<div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
							<div>
								<label className="mb-1 block text-xs text-muted-foreground">
									Loan Principal
								</label>
								<Input
									type="number"
									value={formData.emi?.loanPrincipal ?? ''}
									onChange={(e) =>
										setNestedField('emi', {
											loanPrincipal: Number(e.target.value),
										})
									}
									placeholder="Principal"
								/>
							</div>
							<div>
								<label className="mb-1 block text-xs text-muted-foreground">
									Interest Rate (%)
								</label>
								<Input
									type="number"
									value={formData.emi?.interestRate ?? ''}
									onChange={(e) =>
										setNestedField('emi', {
											interestRate: Number(e.target.value),
										})
									}
									placeholder="Rate"
								/>
							</div>
							<div>
								<label className="mb-1 block text-xs text-muted-foreground">
									Tenure (months)
								</label>
								<Input
									type="number"
									value={formData.emi?.tenureMonths ?? ''}
									onChange={(e) =>
										setNestedField('emi', {
											tenureMonths: Number(e.target.value),
										})
									}
									placeholder="Tenure"
								/>
							</div>
							<div>
								<label className="mb-1 block text-xs text-muted-foreground">
									Lender
								</label>
								<Input
									value={formData.emi?.lenderName ?? ''}
									onChange={(e) =>
										setNestedField('emi', { lenderName: e.target.value })
									}
									placeholder="Lender name"
								/>
							</div>
						</div>
					</div>
				</div>
			</CollapsibleCard>

			{/* ── Tax & Fees Card ── */}
			<CollapsibleCard title="Tax & Fees" icon={Stamp}>
				<div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
					<div>
						<label className="mb-1 block text-xs text-muted-foreground">
							<Percent className="mr-1 inline size-3 text-cyan-400" />
							Taxable Amount
						</label>
						<Input
							type="number"
							value={formData.taxFee?.taxableAmount ?? ''}
							onChange={(e) =>
								setNestedField('taxFee', {
									taxableAmount: Number(e.target.value),
								})
							}
							placeholder="0"
						/>
					</div>
					<div>
						<label className="mb-1 block text-xs text-muted-foreground">
							Tax Amount
						</label>
						<Input
							type="number"
							value={formData.taxFee?.taxAmount ?? ''}
							onChange={(e) =>
								setNestedField('taxFee', { taxAmount: Number(e.target.value) })
							}
							placeholder="0"
						/>
					</div>
					<div>
						<label className="mb-1 block text-xs text-muted-foreground">
							GST
						</label>
						<Input
							type="number"
							value={formData.taxFee?.gstAmount ?? ''}
							onChange={(e) =>
								setNestedField('taxFee', { gstAmount: Number(e.target.value) })
							}
							placeholder="0"
						/>
					</div>
					<div>
						<label className="mb-1 block text-xs text-muted-foreground">
							TDS
						</label>
						<Input
							type="number"
							value={formData.taxFee?.tdsAmount ?? ''}
							onChange={(e) =>
								setNestedField('taxFee', { tdsAmount: Number(e.target.value) })
							}
							placeholder="0"
						/>
					</div>
					<div>
						<label className="mb-1 block text-xs text-muted-foreground">
							<Banknote className="mr-1 inline size-3 text-cyan-400" />
							Brokerage
						</label>
						<Input
							type="number"
							value={formData.taxFee?.brokerageAmount ?? ''}
							onChange={(e) =>
								setNestedField('taxFee', {
									brokerageAmount: Number(e.target.value),
								})
							}
							placeholder="0"
						/>
					</div>
					<div className="md:col-span-2 lg:col-span-2">
						<label className="mb-1 block text-xs text-muted-foreground">
							Fee Description
						</label>
						<Input
							value={formData.taxFee?.feeDescription ?? ''}
							onChange={(e) =>
								setNestedField('taxFee', { feeDescription: e.target.value })
							}
							placeholder="Description"
						/>
					</div>
				</div>
			</CollapsibleCard>

			{/* ── Investment / Trading Card ── */}
			<CollapsibleCard title="Investment / Trading" icon={BarChart3}>
				<div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
					<div>
						<label className="mb-1 block text-xs text-muted-foreground">
							Quantity
						</label>
						<Input
							type="number"
							value={formData.investment?.quantity ?? ''}
							onChange={(e) =>
								setNestedField('investment', {
									quantity: Number(e.target.value),
								})
							}
							placeholder="Qty"
						/>
					</div>
					<div>
						<label className="mb-1 block text-xs text-muted-foreground">
							Unit Price
						</label>
						<Input
							type="number"
							value={formData.investment?.unitPrice ?? ''}
							onChange={(e) =>
								setNestedField('investment', {
									unitPrice: Number(e.target.value),
								})
							}
							placeholder="Price"
						/>
					</div>
					<div>
						<label className="mb-1 block text-xs text-muted-foreground">
							Ticker / Symbol
						</label>
						<Input
							value={formData.investment?.tickerSymbol ?? ''}
							onChange={(e) =>
								setNestedField('investment', { tickerSymbol: e.target.value })
							}
							placeholder="RELIANCE"
						/>
					</div>
					<div>
						<label className="mb-1 block text-xs text-muted-foreground">
							Exchange
						</label>
						<Input
							value={formData.investment?.exchange ?? ''}
							onChange={(e) =>
								setNestedField('investment', { exchange: e.target.value })
							}
							placeholder="NSE/BSE"
						/>
					</div>
					<div>
						<label className="mb-1 block text-xs text-muted-foreground">
							Broker
						</label>
						<Input
							value={formData.investment?.brokerName ?? ''}
							onChange={(e) =>
								setNestedField('investment', { brokerName: e.target.value })
							}
							placeholder="Zerodha"
						/>
					</div>
					<div>
						<label className="mb-1 block text-xs text-muted-foreground">
							Asset Class
						</label>
						<SimpleSelect
							value={formData.investment?.assetClass}
							onValueChange={(v) =>
								setNestedField('investment', { assetClass: v })
							}
							placeholder="Select..."
							items={assetClassItems}
						/>
					</div>
				</div>
			</CollapsibleCard>

			{/* ── Lending / Debt Card ── */}
			<CollapsibleCard title="Lending / Debt" icon={HandCoins}>
				<div className="space-y-4">
					<div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
						<div>
							<label className="mb-1 block text-xs text-muted-foreground">
								<UserRound className="mr-1 inline size-3 text-cyan-400" />
								Counterparty
							</label>
							<Input
								value={formData.lendingDebt?.counterpartyName ?? ''}
								onChange={(e) =>
									setNestedField('lendingDebt', {
										counterpartyName: e.target.value,
									})
								}
								placeholder="Name"
							/>
						</div>
						<div>
							<label className="mb-1 block text-xs text-muted-foreground">
								Interest Rate (%)
							</label>
							<Input
								type="number"
								value={formData.lendingDebt?.interestRate ?? ''}
								onChange={(e) =>
									setNestedField('lendingDebt', {
										interestRate: Number(e.target.value),
									})
								}
								placeholder="Rate"
							/>
						</div>
						<div>
							<label className="mb-1 block text-xs text-muted-foreground">
								Collateral
							</label>
							<Input
								value={formData.lendingDebt?.collateral ?? ''}
								onChange={(e) =>
									setNestedField('lendingDebt', { collateral: e.target.value })
								}
								placeholder="Collateral"
							/>
						</div>
					</div>
					<label className="flex items-center gap-2 text-sm text-muted-foreground">
						<input
							type="checkbox"
							checked={formData.lendingDebt?.isSettled ?? false}
							onChange={(e) =>
								setNestedField('lendingDebt', { isSettled: e.target.checked })
							}
							className="size-4 accent-cyan-500"
						/>
						Settled
					</label>
				</div>
			</CollapsibleCard>

			{/* ── Split Card ── */}
			<CollapsibleCard title="Split / Shared" icon={UserRound}>
				<div className="space-y-4">
					<label className="flex items-center gap-2 text-sm text-muted-foreground">
						<input
							type="checkbox"
							checked={formData.split?.isSplit ?? false}
							onChange={(e) =>
								setNestedField('split', { isSplit: e.target.checked })
							}
							className="size-4 accent-cyan-500"
						/>
						Split Transaction
					</label>

					{formData.split?.isSplit && (
						<div className="grid grid-cols-1 gap-3 pl-4 md:grid-cols-3">
							<div>
								<label className="mb-1 block text-xs text-muted-foreground">
									Total Amount
								</label>
								<Input
									type="number"
									value={formData.split?.totalAmount ?? ''}
									onChange={(e) =>
										setNestedField('split', {
											totalAmount: Number(e.target.value),
										})
									}
									placeholder="Total"
								/>
							</div>
							<div>
								<label className="mb-1 block text-xs text-muted-foreground">
									My Share
								</label>
								<Input
									type="number"
									value={formData.split?.myShare ?? ''}
									onChange={(e) =>
										setNestedField('split', { myShare: Number(e.target.value) })
									}
									placeholder="My share"
								/>
							</div>
							<div>
								<label className="mb-1 block text-xs text-muted-foreground">
									Participants (comma sep)
								</label>
								<Input
									value={formData.split?.participants?.join(', ') ?? ''}
									onChange={(e) =>
										setNestedField('split', {
											participants: e.target.value
												.split(',')
												.map((s) => s.trim()),
										})
									}
									placeholder="Alice, Bob"
								/>
							</div>
						</div>
					)}
				</div>
			</CollapsibleCard>

			{/* ── Notes & Tags Card ── */}
			<CollapsibleCard title="Notes & Tags" icon={FileText} defaultOpen>
				<div className="space-y-4">
					<div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
						<div className="md:col-span-2 lg:col-span-2">
							<label className="mb-1 block text-xs text-muted-foreground">
								<FileText className="mr-1 inline size-3 text-cyan-400" />
								Notes
							</label>
							<textarea
								value={formData.notes ?? ''}
								onChange={(e) => setFormField('notes', e.target.value)}
								placeholder="Additional notes..."
								className="min-h-[80px] w-full resize-none rounded-lg border border-border/50 bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/30"
							/>
						</div>
						<div>
							<label className="mb-1 block text-xs text-muted-foreground">
								<Tags className="mr-1 inline size-3 text-cyan-400" />
								Tags
							</label>
							<Input
								value={
									(formData as Record<string, unknown>).tags?.toString() ?? ''
								}
								onChange={(e) =>
									setFormField(
										'tags',
										e.target.value.split(',').map((s) => s.trim()),
									)
								}
								placeholder="tax, urgent, work"
							/>
						</div>
					</div>

					<div className="grid grid-cols-1 gap-3 md:grid-cols-3">
						<div>
							<label className="mb-1 block text-xs text-muted-foreground">
								Merchant / Vendor
							</label>
							<Input
								value={formData.merchantName ?? ''}
								onChange={(e) => setFormField('merchantName', e.target.value)}
								placeholder="Vendor"
							/>
						</div>
						<div>
							<label className="mb-1 block text-xs text-muted-foreground">
								Location
							</label>
							<Input
								value={formData.location ?? ''}
								onChange={(e) => setFormField('location', e.target.value)}
								placeholder="City"
							/>
						</div>
						<div>
							<label className="mb-1 block text-xs text-muted-foreground">
								Business Name
							</label>
							<Input
								value={formData.businessName ?? ''}
								onChange={(e) => setFormField('businessName', e.target.value)}
								placeholder="Business"
							/>
						</div>
						<div>
							<label className="mb-1 block text-xs text-muted-foreground">
								Invoice #
							</label>
							<Input
								value={formData.invoiceNumber ?? ''}
								onChange={(e) => setFormField('invoiceNumber', e.target.value)}
								placeholder="INV-001"
							/>
						</div>
						<div>
							<label className="mb-1 block text-xs text-muted-foreground">
								GSTIN
							</label>
							<Input
								value={formData.gstin ?? ''}
								onChange={(e) => setFormField('gstin', e.target.value)}
								placeholder="GSTIN"
							/>
						</div>
					</div>
				</div>
			</CollapsibleCard>
		</motion.div>
	);
}
