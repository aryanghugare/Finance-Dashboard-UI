import { useMemo } from 'react'
import { useDashboard } from '../context/DashboardContext'
import { groupExpensesByCategory } from '../utils/finance'
import { formatCurrency } from '../utils/format'
import EmptyState from './EmptyState'

function Bar({ label, value, max, right }) {
  const pct = max > 0 ? (value / max) * 100 : 0
  return (
    <div className="flex items-center gap-3">
      <div className="w-28 shrink-0 truncate text-xs text-slate-600 dark:text-slate-300">{label}</div>
      <div className="h-2 flex-1 rounded-full bg-slate-100 dark:bg-slate-800">
        <div className="h-2 rounded-full bg-indigo-500" style={{ width: `${Math.max(3, pct)}%` }} />
      </div>
      <div className="w-28 shrink-0 text-right text-xs text-slate-600 dark:text-slate-300">{right}</div>
    </div>
  )
}

export default function CategoryBreakdown() {
  const {
    state: { transactions, currency },
  } = useDashboard()

  const rows = useMemo(() => groupExpensesByCategory(transactions), [transactions])
  const max = rows[0]?.total ?? 0

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm font-semibold">Spending breakdown</div>
          <div className="text-xs text-slate-500 dark:text-slate-400">Expenses by category</div>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {rows.length === 0 ? (
          <EmptyState title="No expenses" description="Add an expense or clear filters." />
        ) : (
          rows.slice(0, 7).map((r) => (
            <Bar
              key={r.category}
              label={r.category}
              value={r.total}
              max={max}
              right={formatCurrency(r.total, currency)}
            />
          ))
        )}
      </div>
    </section>
  )
}
