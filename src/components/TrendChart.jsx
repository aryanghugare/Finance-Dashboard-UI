import { useMemo } from 'react'
import { useDashboard } from '../context/DashboardContext'
import { cumulativeSeries, groupNetByDay } from '../utils/finance'
import { formatCurrency } from '../utils/format'

function Sparkline({ points }) {
  if (!points?.length) return null
  const w = 600
  const h = 120
  const pad = 10
  const ys = points.map((p) => p.y)
  const minY = Math.min(...ys)
  const maxY = Math.max(...ys)
  const range = maxY - minY || 1

  const scaleX = (i) => pad + (i * (w - pad * 2)) / Math.max(1, points.length - 1)
  const scaleY = (y) => pad + (h - pad * 2) * (1 - (y - minY) / range)

  const d = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${scaleX(i).toFixed(2)} ${scaleY(p.y).toFixed(2)}`)
    .join(' ')

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-32 w-full">
      <path d={d} fill="none" stroke="currentColor" strokeWidth="2" className="text-indigo-500" />
      <path
        d={`${d} L ${scaleX(points.length - 1).toFixed(2)} ${h - pad} L ${scaleX(0).toFixed(2)} ${h - pad} Z`}
        className="fill-indigo-500/10"
      />
    </svg>
  )
}

export default function TrendChart() {
  const {
    state: { transactions, startingBalance, currency },
  } = useDashboard()

  const series = useMemo(() => {
    const netByDay = groupNetByDay(transactions)
    const cum = cumulativeSeries(netByDay, startingBalance)
    const points = cum.map((p, i) => ({ x: i, y: p.balance, date: p.date }))
    const last = cum[cum.length - 1]
    const first = cum[0]
    const delta = last && first ? last.balance - first.balance : 0
    return { points, lastBalance: last?.balance ?? startingBalance, delta }
  }, [transactions, startingBalance])

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm font-semibold">Balance trend</div>
          <div className="text-xs text-slate-500 dark:text-slate-400">Cumulative by day</div>
        </div>
        <div className="text-right">
          <div className="text-sm font-semibold">{formatCurrency(series.lastBalance, currency)}</div>
          <div className={`text-xs ${series.delta >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
            {series.delta >= 0 ? '+' : ''}
            {formatCurrency(series.delta, currency)}
          </div>
        </div>
      </div>
      <div className="mt-3 text-slate-900 dark:text-slate-50">
        <Sparkline points={series.points} />
      </div>
    </section>
  )
}
