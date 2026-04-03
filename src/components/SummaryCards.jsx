import { useMemo } from 'react'
import { useDashboard } from '../context/DashboardContext'
import { formatCurrency } from '../utils/format'
import { sumByType, totalBalance } from '../utils/finance'

function Card({ label, value, hint }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="text-xs text-slate-500 dark:text-slate-400">{label}</div>
      <div className="mt-1 text-2xl font-semibold tracking-tight">{value}</div>
      {hint ? <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">{hint}</div> : null}
    </div>
  )
}

export default function SummaryCards() {
  const {
    state: { transactions, startingBalance, currency },
  } = useDashboard()

  const summary = useMemo(() => {
    const income = sumByType(transactions, 'income')
    const expenses = sumByType(transactions, 'expense')
    const balance = totalBalance(transactions, startingBalance)
    return { income, expenses, balance }
  }, [transactions, startingBalance])

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      <Card
        label="Total Balance"
        value={formatCurrency(summary.balance, currency)}
        hint={`Starting: ${formatCurrency(startingBalance, currency)}`}
      />
      <Card label="Income" value={formatCurrency(summary.income, currency)} hint="This period" />
      <Card label="Expenses" value={formatCurrency(summary.expenses, currency)} hint="This period" />
    </div>
  )
}
