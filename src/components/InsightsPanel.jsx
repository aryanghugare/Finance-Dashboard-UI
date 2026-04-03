import { useMemo } from 'react'
import { useDashboard } from '../context/DashboardContext'
import { formatCurrency } from '../utils/format'
import { groupNetByMonth, topSpendingCategory } from '../utils/finance'

function Insight({ title, value, sub }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="text-sm font-semibold">{title}</div>
      <div className="mt-2 text-xl font-semibold tracking-tight">{value}</div>
      {sub ? <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">{sub}</div> : null}
    </div>
  )
}

export default function InsightsPanel() {
  const {
    state: { transactions, currency },
  } = useDashboard()

  const data = useMemo(() => {
    const top = topSpendingCategory(transactions)
    const monthly = groupNetByMonth(transactions)
    const last = monthly[monthly.length - 1]
    const prev = monthly[monthly.length - 2]
    const diff = last && prev ? last.net - prev.net : null

    return { top, last, prev, diff }
  }, [transactions])

  return (
    <section className="space-y-3">
      <div className="flex items-baseline justify-between">
        <div>
          <div className="text-sm font-semibold">Insights</div>
          <div className="text-xs text-slate-500 dark:text-slate-400">Quick observations</div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Insight
          title="Highest spending category"
          value={data.top ? data.top.category : '—'}
          sub={data.top ? formatCurrency(data.top.total, currency) : 'No expenses yet'}
        />
        <Insight
          title="This month net"
          value={data.last ? formatCurrency(data.last.net, currency) : '—'}
          sub={data.last ? data.last.month : 'No monthly data'}
        />
        <Insight
          title="Monthly change"
          value={data.diff == null ? '—' : `${data.diff >= 0 ? '+' : ''}${formatCurrency(data.diff, currency)}`}
          sub={data.prev ? `vs ${data.prev.month}` : 'Need at least 2 months'}
        />
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
        <div className="font-semibold text-slate-900 dark:text-slate-50">Suggestion</div>
        <div className="mt-1">
          {data.top
            ? `Consider setting a budget for “${data.top.category}” since it’s your biggest expense.`
            : 'Add a few transactions to see more insights.'}
        </div>
      </div>
    </section>
  )
}
