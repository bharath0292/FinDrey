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
  Building2,
  ChevronDown,
  ChevronUp,
  CreditCard,
  Globe,
  HandCoins,
  Home,
  Landmark,
  Percent,
  PiggyBank,
  ShieldCheck,
  TrendingUp,
  User,
  Wallet,
} from 'lucide-react';

import { useAccountsV2PageContext } from '../../context';

// ── Static select items ─────────────────────────────────────

const DEPOSITORY_ITEMS = [
  { id: 'cdsl', label: 'CDSL' },
  { id: 'nsdl', label: 'NSDL' },
];

const DIVIDEND_OPTION_ITEMS = [
  { id: 'growth', label: 'Growth' },
  { id: 'dividend', label: 'Dividend' },
  { id: 'idcw', label: 'IDCW' },
  { id: 'reinvestment', label: 'Reinvestment' },
];

const EXCHANGE_ITEMS = [
  { id: 'nse', label: 'NSE' },
  { id: 'bse', label: 'BSE' },
  { id: 'nyse', label: 'NYSE' },
  { id: 'nasdaq', label: 'NASDAQ' },
  { id: 'other', label: 'Other' },
];

const WALLET_TYPE_ITEMS = [
  { id: 'closed', label: 'Closed' },
  { id: 'semi-closed', label: 'Semi-Closed' },
  { id: 'open', label: 'Open' },
];

const KYC_ITEMS = [
  { id: 'not-kyc', label: 'Not KYC' },
  { id: 'mini-kyc', label: 'Mini KYC' },
  { id: 'full-kyc', label: 'Full KYC' },
];

const AGREEMENT_TYPE_ITEMS = [
  { id: 'formal', label: 'Formal' },
  { id: 'informal', label: 'Informal' },
  { id: 'promissory-note', label: 'Promissory Note' },
  { id: 'legal', label: 'Legal' },
];

const REPAYMENT_SCHEDULE_ITEMS = [
  { id: 'lump-sum', label: 'Lump Sum' },
  { id: 'monthly', label: 'Monthly' },
  { id: 'quarterly', label: 'Quarterly' },
  { id: 'custom', label: 'Custom' },
];

const PREMIUM_FREQ_ITEMS = [
  { id: 'monthly', label: 'Monthly' },
  { id: 'quarterly', label: 'Quarterly' },
  { id: 'half-yearly', label: 'Half Yearly' },
  { id: 'yearly', label: 'Yearly' },
  { id: 'one-time', label: 'One Time' },
];

const AREA_UNIT_ITEMS = [
  { id: 'sqft', label: 'Sq. Ft.' },
  { id: 'sqm', label: 'Sq. M' },
  { id: 'acre', label: 'Acre' },
  { id: 'gunta', label: 'Gunta' },
];

const BUSINESS_TYPE_ITEMS = [
  { id: 'sole-proprietorship', label: 'Sole Proprietorship' },
  { id: 'partnership', label: 'Partnership' },
  { id: 'llp', label: 'LLP' },
  { id: 'pvt-ltd', label: 'Private Limited' },
  { id: 'public-ltd', label: 'Public Limited' },
  { id: 'huf', label: 'HUF' },
  { id: 'trust', label: 'Trust' },
];

const MSME_CATEGORY_ITEMS = [
  { id: 'micro', label: 'Micro' },
  { id: 'small', label: 'Small' },
  { id: 'medium', label: 'Medium' },
];

const CARD_NETWORK_ITEMS = [
  { id: 'visa', label: 'Visa' },
  { id: 'mastercard', label: 'Mastercard' },
  { id: 'rupay', label: 'RuPay' },
  { id: 'amex', label: 'American Express' },
  { id: 'diners', label: 'Diners Club' },
  { id: 'discover', label: 'Discover' },
];

const CARD_TYPE_ITEMS = [
  { id: 'classic', label: 'Classic' },
  { id: 'gold', label: 'Gold' },
  { id: 'platinum', label: 'Platinum' },
  { id: 'titanium', label: 'Titanium' },
  { id: 'signature', label: 'Signature' },
  { id: 'infinite', label: 'Infinite' },
];

// ── Sub-section icon map ────────────────────────────────────

const SECTION_ICONS: Record<string, React.ElementType> = {
  bank: Landmark,
  credit: CreditCard,
  loan: Building2,
  investment: TrendingUp,
  wallet: Wallet,
  business: Building2,
  'lend-debt': HandCoins,
  insurance: ShieldCheck,
  'real-estate': Home,
  foreign: Globe,
  tax: PiggyBank,
};

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

// ── Section renderers ───────────────────────────────────────

function BankDetails() {
  const { formData, setFormField } = useAccountsV2PageContext();
  const d = formData.bankDetails ?? {};

  const set = (field: string, value: unknown) =>
    setFormField('bankDetails', { ...formData.bankDetails, [field]: value });

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      <InputField label="Bank Name" value={d.bankName ?? ''} onChange={(v) => set('bankName', v)} />
      <InputField label="Branch" value={d.branchName ?? ''} onChange={(v) => set('branchName', v)} />
      <InputField label="IFSC Code" value={d.ifscCode ?? ''} onChange={(v) => set('ifscCode', v)} />
      <InputField label="MICR Code" value={d.micrCode ?? ''} onChange={(v) => set('micrCode', v)} />
      <InputField label="Account Holder Name" value={d.accountHolderName ?? ''} onChange={(v) => set('accountHolderName', v)} />
      <InputField label="Nominee Name" value={d.nomineeName ?? ''} onChange={(v) => set('nomineeName', v)} />
      <InputField label="UPI ID" value={d.upiId ?? ''} onChange={(v) => set('upiId', v)} />
    </div>
  );
}

function CreditCardDetails() {
  const { formData, setFormField } = useAccountsV2PageContext();
  const d = formData.creditCardDetails ?? {};

  const set = (field: string, value: unknown) =>
    setFormField('creditCardDetails', { ...formData.creditCardDetails, [field]: value });

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      <div>
        <label className="mb-1 block text-xs text-muted-foreground">Card Network</label>
        <SimpleSelect value={d.cardNetwork} onValueChange={(v) => set('cardNetwork', v)} placeholder="Network..." items={CARD_NETWORK_ITEMS} />
      </div>
      <div>
        <label className="mb-1 block text-xs text-muted-foreground">Card Type</label>
        <SimpleSelect value={d.cardType} onValueChange={(v) => set('cardType', v)} placeholder="Type..." items={CARD_TYPE_ITEMS} />
      </div>
      <NumberField label="Credit Limit" value={d.creditLimit} onChange={(v) => set('creditLimit', v)} />
      <NumberField label="Available Limit" value={d.availableLimit} onChange={(v) => set('availableLimit', v)} />
      <NumberField label="Billing Date (1-31)" value={d.billingDate} onChange={(v) => set('billingDate', v)} />
      <NumberField label="Due Date (1-31)" value={d.dueDate} onChange={(v) => set('dueDate', v)} />
      <NumberField label="Last Statement Balance" value={d.lastStatementBalance} onChange={(v) => set('lastStatementBalance', v)} />
      <NumberField label="Min Due %" value={d.minimumDuePercentage} onChange={(v) => set('minimumDuePercentage', v)} />
      <NumberField label="Interest %" value={d.interestOnOutstanding} onChange={(v) => set('interestOnOutstanding', v)} />
      <NumberField label="Cash Advance Limit" value={d.cashAdvanceLimit} onChange={(v) => set('cashAdvanceLimit', v)} />
      <NumberField label="Forex Markup" value={d.forexMarkup} onChange={(v) => set('forexMarkup', v)} />
      <NumberField label="Annual Fee" value={d.annualFee} onChange={(v) => set('annualFee', v)} />
      <NumberField label="Reward Points" value={d.rewardPoints} onChange={(v) => set('rewardPoints', v)} />
      <InputField label="Card Last 4 Digits" value={d.cardLastFour ?? ''} onChange={(v) => set('cardLastFour', v)} maxLength={4} />
      <div>
        <label className="mb-1 block text-xs text-muted-foreground">Lounge Access</label>
        <SimpleSelect
          value={d.loungeAccess === true ? 'yes' : d.loungeAccess === false ? 'no' : undefined}
          onValueChange={(v) => set('loungeAccess', v === 'yes')}
          placeholder="Select..."
          items={[
            { id: 'yes', label: 'Yes' },
            { id: 'no', label: 'No' },
          ]}
        />
      </div>
    </div>
  );
}

function LoanDetails() {
  const { formData, setFormField } = useAccountsV2PageContext();
  const d = formData.loanDetails ?? {};

  const set = (field: string, value: unknown) =>
    setFormField('loanDetails', { ...formData.loanDetails, [field]: value });

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      <InputField label="Lender Name" value={d.lenderName ?? ''} onChange={(v) => set('lenderName', v)} />
      <InputField label="Loan Account Number" value={d.loanAccountNumber ?? ''} onChange={(v) => set('loanAccountNumber', v)} />
      <NumberField label="Sanctioned Amount" value={d.loanSanctionedAmount} onChange={(v) => set('loanSanctionedAmount', v)} />
      <NumberField label="Outstanding Principal" value={d.outstandingPrincipal} onChange={(v) => set('outstandingPrincipal', v)} />
      <NumberField label="EMI Amount" value={d.emiAmount} onChange={(v) => set('emiAmount', v)} />
      <NumberField label="EMI Due Date (1-31)" value={d.emiDueDate} onChange={(v) => set('emiDueDate', v)} />
      <NumberField label="Tenure (months)" value={d.tenureMonths} onChange={(v) => set('tenureMonths', v)} />
      <DateField label="Start Date" value={d.tenureStartDate ?? ''} onChange={(v) => set('tenureStartDate', v)} />
      <DateField label="End Date" value={d.tenureEndDate ?? ''} onChange={(v) => set('tenureEndDate', v)} />
      <NumberField label="Processing Fee" value={d.processingFee} onChange={(v) => set('processingFee', v)} />
      <InputField label="Collateral" value={d.collateral ?? ''} onChange={(v) => set('collateral', v)} />
      <InputField label="Co-borrowers" value={d.coBorrowers?.join(', ') ?? ''} onChange={(v) => set('coBorrowers', v ? v.split(',').map((s: string) => s.trim()) : [])} placeholder="Comma separated names" />
    </div>
  );
}

function InvestmentDetails() {
  const { formData, setFormField } = useAccountsV2PageContext();
  const d = formData.investmentDetails ?? {};

  const set = (field: string, value: unknown) =>
    setFormField('investmentDetails', { ...formData.investmentDetails, [field]: value });

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      <InputField label="Broker Name" value={d.brokerName ?? ''} onChange={(v) => set('brokerName', v)} />
      <InputField label="Client ID" value={d.brokerClientId ?? ''} onChange={(v) => set('brokerClientId', v)} />
      <div>
        <label className="mb-1 block text-xs text-muted-foreground">Depository</label>
        <SimpleSelect value={d.depository} onValueChange={(v) => set('depository', v)} placeholder="Select..." items={DEPOSITORY_ITEMS} />
      </div>
      <InputField label="Folio Number" value={d.folioNumber ?? ''} onChange={(v) => set('folioNumber', v)} />
      <NumberField label="SIP Amount" value={d.sipAmount} onChange={(v) => set('sipAmount', v)} />
      <NumberField label="Units Held" value={d.unitsHeld} onChange={(v) => set('unitsHeld', v)} />
      <NumberField label="NAV" value={d.nav} onChange={(v) => set('nav', v)} />
      <NumberField label="Purchase NAV" value={d.purchaseNav} onChange={(v) => set('purchaseNav', v)} />
      <NumberField label="XIRR" value={d.xirr} onChange={(v) => set('xirr', v)} />
      <div>
        <label className="mb-1 block text-xs text-muted-foreground">Dividend Option</label>
        <SimpleSelect value={d.dividendOption} onValueChange={(v) => set('dividendOption', v)} placeholder="Select..." items={DIVIDEND_OPTION_ITEMS} />
      </div>
      <div>
        <label className="mb-1 block text-xs text-muted-foreground">Exchange</label>
        <SimpleSelect value={d.exchange} onValueChange={(v) => set('exchange', v)} placeholder="Select..." items={EXCHANGE_ITEMS} />
      </div>
    </div>
  );
}

function WalletDetails() {
  const { formData, setFormField } = useAccountsV2PageContext();
  const d = formData.walletDetails ?? {};

  const set = (field: string, value: unknown) =>
    setFormField('walletDetails', { ...formData.walletDetails, [field]: value });

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      <InputField label="Wallet Provider" value={d.walletProvider ?? ''} onChange={(v) => set('walletProvider', v)} />
      <div>
        <label className="mb-1 block text-xs text-muted-foreground">Wallet Type</label>
        <SimpleSelect value={d.walletType} onValueChange={(v) => set('walletType', v)} placeholder="Select..." items={WALLET_TYPE_ITEMS} />
      </div>
      <div>
        <label className="mb-1 block text-xs text-muted-foreground">KYC Status</label>
        <SimpleSelect value={d.kycStatus} onValueChange={(v) => set('kycStatus', v)} placeholder="Select..." items={KYC_ITEMS} />
      </div>
      <NumberField label="Cashback Balance" value={d.cashbackBalance} onChange={(v) => set('cashbackBalance', v)} />
      <NumberField label="Transaction Limit" value={d.transactionLimit} onChange={(v) => set('transactionLimit', v)} />
    </div>
  );
}

function BusinessDetails() {
  const { formData, setFormField } = useAccountsV2PageContext();
  const d = formData.businessDetails ?? {};

  const set = (field: string, value: unknown) =>
    setFormField('businessDetails', { ...formData.businessDetails, [field]: value });

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      <InputField label="Business Name" value={d.businessName ?? ''} onChange={(v) => set('businessName', v)} />
      <InputField label="GSTIN" value={d.gstin ?? ''} onChange={(v) => set('gstin', v)} />
      <InputField label="PAN" value={d.pan ?? ''} onChange={(v) => set('pan', v)} />
      <div>
        <label className="mb-1 block text-xs text-muted-foreground">Business Type</label>
        <SimpleSelect value={d.businessType} onValueChange={(v) => set('businessType', v)} placeholder="Select..." items={BUSINESS_TYPE_ITEMS} />
      </div>
      <div>
        <label className="mb-1 block text-xs text-muted-foreground">MSME Category</label>
        <SimpleSelect value={d.msmeCategory} onValueChange={(v) => set('msmeCategory', v)} placeholder="Select..." items={MSME_CATEGORY_ITEMS} />
      </div>
      <NumberField label="Turnover" value={d.turnover} onChange={(v) => set('turnover', v)} />
      <NumberField label="OD Limit" value={d.overdraftLimit} onChange={(v) => set('overdraftLimit', v)} />
    </div>
  );
}

function LendDebtDetails() {
  const { formData, setFormField } = useAccountsV2PageContext();
  const d = formData.lendDebtDetails ?? {};

  const set = (field: string, value: unknown) =>
    setFormField('lendDebtDetails', { ...formData.lendDebtDetails, [field]: value });

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      <InputField label="Borrower/Lender Name" value={d.borrowerName ?? ''} onChange={(v) => set('borrowerName', v)} />
      <InputField label="Contact" value={d.borrowerContact ?? ''} onChange={(v) => set('borrowerContact', v)} />
      <InputField label="Relation" value={d.borrowerRelation ?? ''} onChange={(v) => set('borrowerRelation', v)} />
      <InputField label="Purpose" value={d.purpose ?? ''} onChange={(v) => set('purpose', v)} />
      <div>
        <label className="mb-1 block text-xs text-muted-foreground">Agreement Type</label>
        <SimpleSelect value={d.agreementType} onValueChange={(v) => set('agreementType', v)} placeholder="Select..." items={AGREEMENT_TYPE_ITEMS} />
      </div>
      <NumberField label="Interest Rate" value={d.interestRate} onChange={(v) => set('interestRate', v)} />
      <div>
        <label className="mb-1 block text-xs text-muted-foreground">Repayment Schedule</label>
        <SimpleSelect value={d.repaymentSchedule} onValueChange={(v) => set('repaymentSchedule', v)} placeholder="Select..." items={REPAYMENT_SCHEDULE_ITEMS} />
      </div>
      <DateField label="Due Date" value={d.dueDate ?? ''} onChange={(v) => set('dueDate', v)} />
      <NumberField label="Amount Lent/Borrowed" value={d.amountLent} onChange={(v) => set('amountLent', v)} />
      <NumberField label="Amount Received/Paid" value={d.amountReceived} onChange={(v) => set('amountReceived', v)} />
    </div>
  );
}

function InsuranceDetails() {
  const { formData, setFormField } = useAccountsV2PageContext();
  const d = formData.insuranceDetails ?? {};

  const set = (field: string, value: unknown) =>
    setFormField('insuranceDetails', { ...formData.insuranceDetails, [field]: value });

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      <InputField label="Policy Number" value={d.policyNumber ?? ''} onChange={(v) => set('policyNumber', v)} />
      <InputField label="Insurer Name" value={d.insurerName ?? ''} onChange={(v) => set('insurerName', v)} />
      <InputField label="Policy Type" value={d.policyType ?? ''} onChange={(v) => set('policyType', v)} />
      <NumberField label="Sum Assured" value={d.sumAssured} onChange={(v) => set('sumAssured', v)} />
      <NumberField label="Premium Amount" value={d.premiumAmount} onChange={(v) => set('premiumAmount', v)} />
      <div>
        <label className="mb-1 block text-xs text-muted-foreground">Premium Frequency</label>
        <SimpleSelect value={d.premiumFrequency} onValueChange={(v) => set('premiumFrequency', v)} placeholder="Select..." items={PREMIUM_FREQ_ITEMS} />
      </div>
      <DateField label="Due Date" value={d.premiumDueDate ?? ''} onChange={(v) => set('premiumDueDate', v)} />
      <DateField label="Start Date" value={d.policyStartDate ?? ''} onChange={(v) => set('policyStartDate', v)} />
      <DateField label="End Date" value={d.policyEndDate ?? ''} onChange={(v) => set('policyEndDate', v)} />
      <InputField label="Nominee" value={d.nominee ?? ''} onChange={(v) => set('nominee', v)} />
    </div>
  );
}

function RealEstateDetails() {
  const { formData, setFormField } = useAccountsV2PageContext();
  const d = formData.realEstateDetails ?? {};

  const set = (field: string, value: unknown) =>
    setFormField('realEstateDetails', { ...formData.realEstateDetails, [field]: value });

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      <InputField label="Property Type" value={d.propertyType ?? ''} onChange={(v) => set('propertyType', v)} />
      <InputField label="Address" value={d.propertyAddress ?? ''} onChange={(v) => set('propertyAddress', v)} />
      <NumberField label="Area (sqft)" value={d.propertyArea} onChange={(v) => set('propertyArea', v)} />
      <div>
        <label className="mb-1 block text-xs text-muted-foreground">Area Unit</label>
        <SimpleSelect value={d.areaUnit} onValueChange={(v) => set('areaUnit', v)} placeholder="Select..." items={AREA_UNIT_ITEMS} />
      </div>
      <NumberField label="Purchase Price" value={d.purchasePrice} onChange={(v) => set('purchasePrice', v)} />
      <NumberField label="Current Market Value" value={d.currentMarketValue} onChange={(v) => set('currentMarketValue', v)} />
      <DateField label="Registration Date" value={d.registrationDate ?? ''} onChange={(v) => set('registrationDate', v)} />
      <NumberField label="Rental Income" value={d.rentalIncome} onChange={(v) => set('rentalIncome', v)} />
      <NumberField label="Property Tax" value={d.propertyTax} onChange={(v) => set('propertyTax', v)} />
    </div>
  );
}

function ForeignDetails() {
  const { formData, setFormField } = useAccountsV2PageContext();
  const d = formData.foreignDetails ?? {};

  const set = (field: string, value: unknown) =>
    setFormField('foreignDetails', { ...formData.foreignDetails, [field]: value });

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      <InputField label="Country" value={d.country ?? ''} onChange={(v) => set('country', v)} />
      <InputField label="SWIFT Code" value={d.swiftCode ?? ''} onChange={(v) => set('swiftCode', v)} />
      <InputField label="Foreign Currency" value={d.foreignCurrency ?? ''} onChange={(v) => set('foreignCurrency', v)} />
    </div>
  );
}

function TaxDetails() {
  const { formData, setFormField } = useAccountsV2PageContext();
  const d = formData.taxDetails ?? {};

  const set = (field: string, value: unknown) =>
    setFormField('taxDetails', { ...formData.taxDetails, [field]: value });

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      <InputField label="Section Code (e.g. 80C)" value={d.sectionCode ?? ''} onChange={(v) => set('sectionCode', v)} />
      <NumberField label="Tax Benefit Amount" value={d.taxBenefitAmount} onChange={(v) => set('taxBenefitAmount', v)} />
      <NumberField label="Lock-in Period (months)" value={d.lockInPeriod} onChange={(v) => set('lockInPeriod', v)} />
      <DateField label="Maturity Date" value={d.maturityDate ?? ''} onChange={(v) => set('maturityDate', v)} />
    </div>
  );
}

// ── Field helpers ───────────────────────────────────────────

function InputField({
  label,
  value,
  onChange,
  placeholder,
  maxLength,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  maxLength?: number;
}) {
  return (
    <div>
      <label className="mb-1 block text-xs text-muted-foreground">{label}</label>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        className="h-9"
      />
    </div>
  );
}

function NumberField({
  label,
  value,
  onChange,
}: {
  label: string;
  value?: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <label className="mb-1 block text-xs text-muted-foreground">{label}</label>
      <Input
        type="number"
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value ? Number(e.target.value) : 0)}
        className="h-9"
      />
    </div>
  );
}

function DateField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="mb-1 block text-xs text-muted-foreground">{label}</label>
      <Input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-9"
      />
    </div>
  );
}

// ── Section label map ───────────────────────────────────────

const SECTION_LABELS: Record<string, string> = {
  bank: 'Bank Account Details',
  credit: 'Credit Card Details',
  loan: 'Loan / EMI Details',
  investment: 'Investment Details',
  wallet: 'Wallet Details',
  business: 'Business Account Details',
  'lend-debt': 'Lend / Debt Details',
  insurance: 'Insurance Details',
  'real-estate': 'Real Estate Details',
  foreign: 'Foreign Account Details',
  tax: 'Tax Details',
};

// ── Main component ──────────────────────────────────────────

export function AdvancedSection() {
  const { formData } = useAccountsV2PageContext();
  const category = formData.accountCategory;

  const Icon = SECTION_ICONS[category] || Wallet;
  const label = SECTION_LABELS[category] || 'Account Details';

  const renderContent = () => {
    switch (category) {
      case 'bank':
        return <BankDetails />;
      case 'credit':
        return <CreditCardDetails />;
      case 'loan':
        return <LoanDetails />;
      case 'investment':
        return <InvestmentDetails />;
      case 'wallet':
        return <WalletDetails />;
      case 'business':
        return <BusinessDetails />;
      case 'lend-debt':
        return <LendDebtDetails />;
      case 'insurance':
        return <InsuranceDetails />;
      case 'real-estate':
        return <RealEstateDetails />;
      case 'foreign':
        return <ForeignDetails />;
      case 'tax':
        return <TaxDetails />;
      default:
        return null;
    }
  };

  return (
    <div className="mt-4">
      <CollapsibleCard title={label} icon={Icon} defaultOpen>
        {renderContent()}
      </CollapsibleCard>
    </div>
  );
}
