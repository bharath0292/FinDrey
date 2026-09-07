import {
	BudgetProgress,
	HeroSection,
	PortfolioChart,
	QuickActions,
	RecentActivity,
	SpendingChart,
	StatCard,
	UpcomingBills,
} from './components';
import { stats } from './components/data';

export default function HomePage() {
	return (
		<div className="mx-auto max-w-7xl space-y-5 p-4 md:p-6">
			<HeroSection />

			<div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
				{stats.map((s) => (
					<StatCard key={s.label} {...s} />
				))}
			</div>

			<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
				<SpendingChart />
				<PortfolioChart />
			</div>

			<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
				<QuickActions />
				<RecentActivity />
			</div>

			<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
				<BudgetProgress />
				<UpcomingBills />
			</div>
		</div>
	);
}
