import { useState } from 'react';

import { Button } from '@findrey/components/ui/button';
import { DatePickerV2 } from '@findrey/components/ui/datepicker-v2';
import { Input } from '@findrey/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@findrey/components/ui/select';
import { Textarea } from '@findrey/components/ui/textarea';
import { cn } from '@findrey/lib/utils';

import { useNavigate, useRouterState } from '@tanstack/react-router';
import { AnimatePresence, motion } from 'framer-motion';
import {
	ArrowLeft,
	CalendarDays,
	Camera,
	CircleArrowDown,
	CircleArrowUp,
	Download,
	Hash,
	ImageUp,
	IndianRupee,
	Layers,
	Loader2,
	Save,
	Tag,
	Trash2,
	Type,
	Wallet,
} from 'lucide-react';

import { useTransactionsV2PageContext } from '../context';
import { AdvancedSection } from './sections/AdvancedSection';

// ── Helpers ─────────────────────────────────────────────

function FieldLabel({
	icon: Icon,
	label,
}: {
	icon: React.ElementType;
	label: string;
}) {
	return (
		<label className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
			<Icon className="size-4 text-primary" />
			{label}
		</label>
	);
}

function FieldWrapper({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<div className={cn('flex flex-col gap-1.5', className)}>{children}</div>
	);
}

// ── Stagger variants ────────────────────────────────────

const fadeUp = (delay: number) => ({
	initial: { opacity: 0, y: 10 },
	animate: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.35, ease: 'easeOut', delay },
	},
});

// ── Component ───────────────────────────────────────────

export function CrudFormV2() {
	const navigate = useNavigate();
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const action = pathname?.endsWith('/add') ? 'add' : 'edit';

	const {
		mode,
		isSubmitting,
		formData,
		setFormField,
		handleSubmit,
		validateForm,
		transactionTypeItems,
		subTransactionTypeItems,
		categoryItems,
		debitAccountItems,
		creditAccountItems,
		tagItems,
	} = useTransactionsV2PageContext();
	const showAdvanced = !(
		formData.transactionType === '' &&
		formData.amount === 0 &&
		formData.description === ''
	);

	// Local receipt state
	const [receiptFiles, setReceiptFiles] = useState<
		{ name: string; size: number; url: string }[]
	>([]);

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!validateForm()) return;
		setFormField('receiptAttached', receiptFiles.length > 0);
		await handleSubmit();
	};

	const onCancel = () => {
		navigate({ to: '/finance/transactions-v2' });
	};

	const toggleTag = (tagId: string) => {
		const current = formData.tags ?? [];
		const exists = current.includes(tagId);
		setFormField(
			'tags',
			exists ? current.filter((t) => t !== tagId) : [...current, tagId],
		);
	};

	const handleReceiptUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(e.target.files ?? []);
		const newFiles = files.map((f) => ({
			name: f.name,
			size: f.size,
			url: URL.createObjectURL(f),
		}));
		setReceiptFiles((prev) => [...prev, ...newFiles]);
	};

	const removeReceipt = (index: number) => {
		setReceiptFiles((prev) => {
			URL.revokeObjectURL(prev[index].url);
			return prev.filter((_, i) => i !== index);
		});
	};

	const downloadReceipt = (file: { name: string; url: string }) => {
		const a = document.createElement('a');
		a.href = file.url;
		a.download = file.name;
		a.click();
	};

	const formatSize = (bytes: number) => {
		if (bytes < 1024) return `${bytes} B`;
		if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
		return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
	};

	return (
		<div className="relative min-h-screen bg-background">
			<div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
				{/* Header */}
				<motion.div
					initial={{ opacity: 0, x: -16 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.3 }}
					className="mb-6 flex items-center gap-3"
				>
					<Button type="button" variant="ghost" size="icon" onClick={onCancel}>
						<ArrowLeft className="size-4" />
					</Button>
					<div>
						<h1 className="text-lg font-semibold text-foreground sm:text-xl">
							{action === 'add' ? 'New Transaction' : 'Edit Transaction'}
						</h1>
						<p className="text-sm text-muted-foreground">
							{mode === 'view'
								? 'Viewing transaction details'
								: 'Record a financial transaction'}
						</p>
					</div>
				</motion.div>

				{/* Form */}
				<form onSubmit={onSubmit}>
					<motion.div
						initial="initial"
						animate="animate"
						className="rounded-xl border border-border/50 bg-card p-5 shadow-sm sm:p-6"
					>
						<div className="space-y-5">
							{/* Row 1: Date, Type, Sub-type */}
							<motion.div
								{...fadeUp(0)}
								className="grid grid-cols-1 gap-4 sm:grid-cols-3"
							>
								<FieldWrapper>
									<FieldLabel icon={CalendarDays} label="Date" />
									<DatePickerV2
										value={formData.transactionDate}
										onChange={(d) => d && setFormField('transactionDate', d)}
										label="Pick a date"
										required
									/>
								</FieldWrapper>
								<FieldWrapper>
									<FieldLabel icon={Type} label="Type" />
									<Select
										value={formData.transactionType || undefined}
										onValueChange={(v) => {
											setFormField('transactionType', v);
											setFormField('subTransactionType', '');
										}}
										required
									>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Select type..." />
										</SelectTrigger>
										<SelectContent>
											{transactionTypeItems.map((item) => (
												<SelectItem key={item.id} value={item.id}>
													{item.label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</FieldWrapper>
								<FieldWrapper>
									<FieldLabel icon={Layers} label="Sub-type" />
									<Select
										value={formData.subTransactionType || undefined}
										onValueChange={(v) => setFormField('subTransactionType', v)}
										disabled={subTransactionTypeItems.length === 0}
									>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Select sub-type..." />
										</SelectTrigger>
										<SelectContent>
											{subTransactionTypeItems.map((item) => (
												<SelectItem key={item.id} value={item.id}>
													{item.label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</FieldWrapper>
							</motion.div>

							{/* Row 2: Debit Account, Credit Account, Category — single line */}
							<motion.div
								{...fadeUp(0.05)}
								className="grid grid-cols-1 gap-4 sm:grid-cols-3"
							>
								<FieldWrapper>
									<FieldLabel icon={CircleArrowDown} label="Debit Account" />
									<Select
										value={formData.debitAccount || undefined}
										onValueChange={(v) => setFormField('debitAccount', v)}
										required
									>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Source account..." />
										</SelectTrigger>
										<SelectContent>
											{debitAccountItems.map((item) => (
												<SelectItem key={item.id} value={item.id}>
													{item.label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</FieldWrapper>
								<FieldWrapper>
									<FieldLabel icon={CircleArrowUp} label="Credit Account" />
									<Select
										value={formData.creditAccount || undefined}
										onValueChange={(v) => setFormField('creditAccount', v)}
										required
									>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Destination account..." />
										</SelectTrigger>
										<SelectContent>
											{creditAccountItems.map((item) => (
												<SelectItem key={item.id} value={item.id}>
													{item.label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</FieldWrapper>
								<FieldWrapper>
									<FieldLabel icon={Tag} label="Category" />
									<Select
										value={formData.category || undefined}
										onValueChange={(v) => setFormField('category', v)}
									>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Select category..." />
										</SelectTrigger>
										<SelectContent>
											{categoryItems.map((item) => (
												<SelectItem key={item.id} value={item.id}>
													{item.label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</FieldWrapper>
							</motion.div>

							{/* Row 3: Tags + Description — same height, same width */}
							<motion.div
								{...fadeUp(0.1)}
								className="grid grid-cols-1 gap-4 sm:grid-cols-2"
							>
								<FieldWrapper>
									<FieldLabel icon={Hash} label="Tags" />
									<div className="flex max-h-[104px] flex-wrap gap-1.5 overflow-y-auto rounded-lg border border-border bg-background/50 p-2.5">
										{tagItems.map((tag) => {
											const active = (formData.tags ?? []).includes(tag.id);
											return (
												<button
													key={tag.id}
													type="button"
													onClick={() => toggleTag(tag.id)}
													className={cn(
														'rounded-full px-3 py-1 text-xs font-medium transition-all',
														active
															? 'bg-primary text-primary-foreground shadow-sm'
															: 'bg-muted text-muted-foreground hover:bg-muted/80',
													)}
												>
													{tag.label}
												</button>
											);
										})}
									</div>
								</FieldWrapper>
								<FieldWrapper>
									<FieldLabel icon={Hash} label="Description" />
									<Textarea
										value={formData.description}
										onChange={(e) =>
											setFormField('description', e.target.value)
										}
										placeholder="What was this transaction for?"
										required
										className="min-h-[104px]"
									/>
								</FieldWrapper>
							</motion.div>

							{/* Row 4: Receipt (left) + Amount/Currency (right stacked) */}
							<motion.div
								{...fadeUp(0.15)}
								className="grid grid-cols-1 gap-4 sm:grid-cols-3"
							>
								{/* Receipt — takes 2/3, same height as description */}
								<FieldWrapper className="sm:col-span-2">
									<FieldLabel icon={Camera} label="Receipt (optional)" />
									<div className="flex min-h-[104px] flex-col rounded-lg border border-dashed border-border transition-colors hover:border-primary/50">
										{/* Upload area */}
										<label className="flex cursor-pointer items-center gap-2 px-4 py-3 text-sm text-muted-foreground hover:text-foreground">
											<ImageUp className="size-4 text-primary shrink-0" />
											<span>Tap to upload receipt images</span>
											<input
												type="file"
												accept="image/*"
												multiple
												className="hidden"
												onChange={handleReceiptUpload}
											/>
										</label>

										{/* File list */}
										{receiptFiles.length > 0 && (
											<div className="flex flex-wrap gap-2 border-t border-border/50 px-4 py-3">
												{receiptFiles.map((file, i) => (
													<motion.div
														key={`${file.name}-${i}`}
														initial={{ opacity: 0, scale: 0.9 }}
														animate={{ opacity: 1, scale: 1 }}
														className="flex items-center gap-2 rounded-lg border border-border/50 bg-background/50 px-3 py-1.5 text-xs"
													>
														<Camera className="size-3.5 shrink-0 text-primary" />
														<span className="max-w-[120px] truncate">
															{file.name}
														</span>
														<span className="text-muted-foreground">
															{formatSize(file.size)}
														</span>
														<button
															type="button"
															onClick={() => downloadReceipt(file)}
															className="text-muted-foreground hover:text-foreground"
															title="Download"
														>
															<Download className="size-3.5" />
														</button>
														<button
															type="button"
															onClick={() => removeReceipt(i)}
															className="text-muted-foreground hover:text-destructive"
															title="Remove"
														>
															<Trash2 className="size-3.5" />
														</button>
													</motion.div>
												))}
											</div>
										)}
									</div>
								</FieldWrapper>

								{/* Amount + Currency — stacked vertically */}
								<div className="flex flex-col gap-4">
									<FieldWrapper>
										<FieldLabel icon={IndianRupee} label="Amount" />
										<div className="relative">
											<IndianRupee className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
											<Input
												type="number"
												value={formData.amount || ''}
												onChange={(e) =>
													setFormField('amount', Number(e.target.value))
												}
												placeholder="0.00"
												required
												className="pl-9 w-full"
											/>
										</div>
									</FieldWrapper>
									<FieldWrapper>
										<FieldLabel icon={Wallet} label="Currency" />
										<Input
											value={formData.currency ?? 'INR'}
											onChange={(e) => setFormField('currency', e.target.value)}
											placeholder="INR"
											className="w-full"
										/>
									</FieldWrapper>
								</div>
							</motion.div>

							{/* Advanced section */}
							<AnimatePresence>
								{showAdvanced && (
									<motion.div
										initial={{ opacity: 0, height: 0 }}
										animate={{ opacity: 1, height: 'auto' }}
										exit={{ opacity: 0, height: 0 }}
										transition={{ duration: 0.35, ease: 'easeInOut' }}
									>
										<motion.div
											initial={{ opacity: 0, y: 8 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ duration: 0.3, delay: 0.05 }}
										>
											<AdvancedSection />
										</motion.div>
									</motion.div>
								)}
							</AnimatePresence>
						</div>

						{/* Actions */}
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.25 }}
							className="mt-6 flex items-center justify-end gap-3 border-t border-border/30 pt-4"
						>
							<Button type="button" variant="outline" onClick={onCancel}>
								Cancel
							</Button>
							<Button type="submit" disabled={isSubmitting}>
								{isSubmitting ? (
									<Loader2 className="mr-1.5 size-4 animate-spin" />
								) : (
									<Save className="mr-1.5 size-4" />
								)}
								{isSubmitting
									? 'Saving...'
									: action === 'add'
										? 'Save Transaction'
										: 'Update Transaction'}
							</Button>
						</motion.div>
					</motion.div>
				</form>
			</div>
		</div>
	);
}
