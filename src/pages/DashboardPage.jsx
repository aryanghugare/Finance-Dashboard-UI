import SummaryCards from '../components/SummaryCards'
import TrendChart from '../components/TrendChart'
import CategoryBreakdown from '../components/CategoryBreakdown'
import TransactionsTable from '../components/TransactionsTable'
import InsightsPanel from '../components/InsightsPanel'

export default function DashboardPage() {
  return (
    <main className="mx-auto max-w-6xl space-y-6 px-4 py-6">
      <SummaryCards />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <TrendChart />
        <CategoryBreakdown />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <TransactionsTable />
        </div>
        <InsightsPanel />
      </div>

      <footer className="pb-8 text-center text-xs text-slate-500 dark:text-slate-400">
        Built by Aryan Ghugare
      </footer>
    </main>
  )
}
