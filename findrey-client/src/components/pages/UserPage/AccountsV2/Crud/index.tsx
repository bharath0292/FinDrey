import { useEffect, useState } from 'react';

import { Button } from '@findrey/components/ui/button';
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

import { useNavigate, useParams, useRouterState } from '@tanstack/react-router';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft,
  Building2,
  Calendar,
  Check,
  CreditCard,
  Globe,
  HandCoins,
  Home,
  IndianRupee,
  Landmark,
  Loader2,
  PiggyBank,
  Save,
  ShieldCheck,
  Tag,
  TrendingUp,
  User,
  Wallet,
} from 'lucide-react';

import { useAccountsV2PageContext } from '../context';
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

// ── Category icon map ───────────────────────────────────

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  bank: Landmark,
  credit: CreditCard,
  investment: TrendingUp,
  wallet: Wallet,
  loan: Building2,
  business: Building2,
  'lend-debt': HandCoins,
  insurance: ShieldCheck,
  'real-estate': Home,
  foreign: Globe,
  tax: PiggyBank,
  other: Wallet,
};

// ── Category items ──────────────────────────────────────

const CATEGORY_ITEMS = [
  { id: 'bank', label: 'Bank' },
  { id: 'credit', label: 'Credit Card' },
  { id: 'investment', label: 'Investment' },
  { id: 'wallet', label: 'Wallet' },
  { id: 'loan', label: 'Loan' },
  { id: 'business', label: 'Business' },
  { id: 'lend-debt', label: 'Lend / Debt' },
  { id: 'insurance', label: 'Insurance' },
  { id: 'real-estate', label: 'Real Estate' },
  { id: 'foreign', label: 'Foreign' },
  { id: 'tax', label: 'Tax' },
  { id: 'other', label: 'Other' },
];

const OWNERSHIP_ITEMS = [
  { id: 'individual', label: 'Individual' },
  { id: 'joint', label: 'Joint' },
  { id: 'corporate', label: 'Corporate' },
  { id: 'trust', label: 'Trust' },
  { id: 'huf', label: 'HUF' },
];

const STATUS_ITEMS = [
  { id: 'active', label: 'Active' },
  { id: 'dormant', label: 'Dormant' },
  { id: 'closed', label: 'Closed' },
  { id: 'frozen', label: 'Frozen' },
  { id: 'defaulted', label: 'Defaulted' },
  { id: 'under-review', label: 'Under Review' },
];

const TAG_ITEMS = [
  { id: 'personal', label: 'Personal' },
  { id: 'business', label: 'Business' },
  { id: 'joint', label: 'Joint' },
  { id: 'savings', label: 'Savings' },
  { id: 'emergency', label: 'Emergency' },
  { id: 'tax-saving', label: 'Tax Saving' },
  { id: 'travel', label: 'Travel' },
  { id: 'investment', label: 'Investment' },
];

// ── Component ───────────────────────────────────────────

export function AccountsV2CrudForm() {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const action = pathname?.endsWith('/add') ? 'add' : 'edit';
  const { id } = useParams({ from: '/_authenticated/user/accounts-v2/$id', shouldThrow: false }) ?? {};

  const {
    mode,
    isSubmitting,
    formData,
    setFormField,
    handleSubmit,
    validateForm,
    accountTypeItems,
    loadAccount,
    resetForm,
  } = useAccountsV2PageContext();

  // Load account data when editing
  useEffect(() => {
    if (id) {
      loadAccount(id);
    } else {
      resetForm();
    }
  }, [id]);

  const isEdit = !!id;

  // Filter account types by selected category
  const filteredTypeItems = accountTypeItems.filter(
    (item) => item.category === formData.accountCategory,
  );

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    await handleSubmit();
  };

  const onCancel = () => {
    navigate({ to: '/user/accounts-v2' });
  };

  const toggleTag = (tagId: string) => {
    const current = formData.tags ?? [];
    const exists = current.includes(tagId);
    setFormField(
      'tags',
      exists ? current.filter((t) => t !== tagId) : [...current, tagId],
    );
  };

  // Derived: show section panel when category has extra fields
  const hasSectionPanels = !['other'].includes(formData.accountCategory);

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
              {isEdit ? 'Edit Account' : 'New Account'}
            </h1>
            <p className="text-sm text-muted-foreground">
              {mode === 'view'
                ? 'Viewing account details'
                : 'Manage your financial account'}
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
              {/* Row 1: Category, Type, Label */}
              <motion.div
                {...fadeUp(0)}
                className="grid grid-cols-1 gap-4 sm:grid-cols-3"
              >
                <FieldWrapper>
                  <FieldLabel icon={Building2} label="Account Category" />
                  <Select
                    value={formData.accountCategory || undefined}
                    onValueChange={(v) => {
                      setFormField('accountCategory', v);
                      // Reset account type when category changes
                      setFormField('accountType', '');
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select category..." />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORY_ITEMS.map((item) => {
                        const Icon = CATEGORY_ICONS[item.id] || Wallet;
                        return (
                          <SelectItem key={item.id} value={item.id}>
                            <span className="flex items-center gap-2">
                              <Icon className="size-3.5" />
                              {item.label}
                            </span>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </FieldWrapper>
                <FieldWrapper>
                  <FieldLabel icon={Tag} label="Account Type" />
                  <Select
                    value={formData.accountType || undefined}
                    onValueChange={(v) => setFormField('accountType', v)}
                    disabled={filteredTypeItems.length === 0}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select type..." />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredTypeItems.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FieldWrapper>
                <FieldWrapper>
                  <FieldLabel icon={User} label="Account Label" />
                  <Input
                    value={formData.accountLabel}
                    onChange={(e) =>
                      setFormField('accountLabel', e.target.value)
                    }
                    placeholder="e.g. My Primary Savings"
                    required
                    className="w-full"
                  />
                </FieldWrapper>
              </motion.div>

              {/* Row 2: Nickname, Account Number, Ownership */}
              <motion.div
                {...fadeUp(0.05)}
                className="grid grid-cols-1 gap-4 sm:grid-cols-3"
              >
                <FieldWrapper>
                  <FieldLabel icon={User} label="Account Nickname" />
                  <Input
                    value={formData.accountNickname ?? ''}
                    onChange={(e) =>
                      setFormField('accountNickname', e.target.value)
                    }
                    placeholder="Optional nickname"
                    className="w-full"
                  />
                </FieldWrapper>
                <FieldWrapper>
                  <FieldLabel icon={Tag} label="Account Number" />
                  <Input
                    value={formData.accountNumber ?? ''}
                    onChange={(e) =>
                      setFormField('accountNumber', e.target.value)
                    }
                    placeholder="XXXX XXXX XXXX XXXX"
                    className="w-full"
                  />
                </FieldWrapper>
                <FieldWrapper>
                  <FieldLabel icon={User} label="Ownership Type" />
                  <Select
                    value={formData.ownershipType || undefined}
                    onValueChange={(v) => setFormField('ownershipType', v)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select ownership..." />
                    </SelectTrigger>
                    <SelectContent>
                      {OWNERSHIP_ITEMS.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FieldWrapper>
              </motion.div>

              {/* Row 3: Currency, Current Balance, Opening Balance */}
              <motion.div
                {...fadeUp(0.1)}
                className="grid grid-cols-1 gap-4 sm:grid-cols-3"
              >
                <FieldWrapper>
                  <FieldLabel icon={Wallet} label="Currency" />
                  <Input
                    value={formData.currency ?? 'INR'}
                    onChange={(e) => setFormField('currency', e.target.value)}
                    placeholder="INR"
                    className="w-full"
                  />
                </FieldWrapper>
                <FieldWrapper>
                  <FieldLabel icon={IndianRupee} label="Current Balance" />
                  <div className="relative">
                    <IndianRupee className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="number"
                      value={formData.currentBalance || ''}
                      onChange={(e) =>
                        setFormField(
                          'currentBalance',
                          Number(e.target.value),
                        )
                      }
                      placeholder="0.00"
                      className="w-full pl-9"
                    />
                  </div>
                </FieldWrapper>
                <FieldWrapper>
                  <FieldLabel icon={IndianRupee} label="Opening Balance" />
                  <div className="relative">
                    <IndianRupee className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="number"
                      value={formData.openingBalance || ''}
                      onChange={(e) =>
                        setFormField(
                          'openingBalance',
                          Number(e.target.value),
                        )
                      }
                      placeholder="0.00"
                      className="w-full pl-9"
                    />
                  </div>
                </FieldWrapper>
              </motion.div>

              {/* Row 4: Status, Opened Date, Closed Date */}
              <motion.div
                {...fadeUp(0.15)}
                className="grid grid-cols-1 gap-4 sm:grid-cols-3"
              >
                <FieldWrapper>
                  <FieldLabel icon={ShieldCheck} label="Status" />
                  <Select
                    value={formData.status || undefined}
                    onValueChange={(v) => setFormField('status', v)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select status..." />
                    </SelectTrigger>
                    <SelectContent>
                      {STATUS_ITEMS.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FieldWrapper>
                <FieldWrapper>
                  <FieldLabel icon={Calendar} label="Opened Date" />
                  <Input
                    type="date"
                    value={formData.openedDate ?? ''}
                    onChange={(e) =>
                      setFormField('openedDate', e.target.value)
                    }
                    className="w-full"
                  />
                </FieldWrapper>
                <FieldWrapper>
                  <FieldLabel icon={Calendar} label="Closed Date" />
                  <Input
                    type="date"
                    value={formData.closedDate ?? ''}
                    onChange={(e) =>
                      setFormField('closedDate', e.target.value)
                    }
                    className="w-full"
                  />
                </FieldWrapper>
              </motion.div>

              {/* Row 5: Tags — full width */}
              <motion.div
                {...fadeUp(0.2)}
                className="grid grid-cols-1 gap-4"
              >
                <FieldWrapper>
                  <FieldLabel icon={Tag} label="Tags" />
                  <div className="flex flex-wrap gap-1.5 rounded-lg border border-border bg-background/50 p-2.5">
                    {TAG_ITEMS.map((tag) => {
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
              </motion.div>

              {/* Row 6: Notes */}
              <motion.div {...fadeUp(0.25)} className="grid grid-cols-1 gap-4">
                <FieldWrapper>
                  <FieldLabel icon={Tag} label="Notes" />
                  <Textarea
                    value={formData.notes ?? ''}
                    onChange={(e) => setFormField('notes', e.target.value)}
                    placeholder="Any additional notes about this account..."
                    className="min-h-[80px]"
                  />
                </FieldWrapper>
              </motion.div>

              {/* Row 7: Alert Preferences */}
              <motion.div
                {...fadeUp(0.3)}
                className="grid grid-cols-1 gap-4 sm:grid-cols-3"
              >
                <FieldWrapper>
                  <FieldLabel icon={Check} label="Balance Threshold Alert" />
                  <Select
                    value={
                      formData.alertPreferences?.balanceBelowThreshold
                        ? 'yes'
                        : 'no'
                    }
                    onValueChange={(v) =>
                      setFormField('alertPreferences', {
                        ...formData.alertPreferences,
                        balanceBelowThreshold: v === 'yes',
                      })
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </FieldWrapper>
                <FieldWrapper>
                  <FieldLabel icon={Check} label="Due Date Reminder" />
                  <Select
                    value={
                      formData.alertPreferences?.dueDateReminder
                        ? 'yes'
                        : 'no'
                    }
                    onValueChange={(v) =>
                      setFormField('alertPreferences', {
                        ...formData.alertPreferences,
                        dueDateReminder: v === 'yes',
                      })
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </FieldWrapper>
                <FieldWrapper>
                  <FieldLabel icon={Check} label="Transaction Alert" />
                  <Select
                    value={
                      formData.alertPreferences?.transactionAlert
                        ? 'yes'
                        : 'no'
                    }
                    onValueChange={(v) =>
                      setFormField('alertPreferences', {
                        ...formData.alertPreferences,
                        transactionAlert: v === 'yes',
                      })
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </FieldWrapper>
              </motion.div>

              {/* Section-specific panels */}
              <AnimatePresence>
                {hasSectionPanels && (
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
                    ? 'Save Account'
                    : 'Update Account'}
              </Button>
            </motion.div>
          </motion.div>
        </form>
      </div>
    </div>
  );
}
