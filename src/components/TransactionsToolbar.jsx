import { useMemo } from 'react'
import { useDashboard } from '../context/DashboardContext'

export default function TransactionsToolbar({ categories }) {
  const {
    state: { filters, role },
    dispatch,
    roles,
  } = useDashboard()

  const canEdit = role === roles.admin

  const categoryOptions = useMemo(() => {
    const base = [{ value: 'all', label: 'All categories' }]
    return base.concat(categories.map((c) => ({ value: c, label: c })))
  }, [categories])

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-4">
        <div>
          <label className="text-xs text-slate-500 dark:text-slate-400">Search</label>
          <input
            value={filters.query}
            onChange={(e) => dispatch({ type: 'SET_FILTERS', payload: { query: e.target.value } })}
            placeholder="e.g. rent, salary"
            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-slate-300 focus:ring dark:border-slate-800 dark:bg-slate-900"
          />
        </div>

        <div>
          <label className="text-xs text-slate-500 dark:text-slate-400">Type</label>
          <select
            value={filters.type}
            onChange={(e) => dispatch({ type: 'SET_FILTERS', payload: { type: e.target.value } })}
            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-slate-300 focus:ring dark:border-slate-800 dark:bg-slate-900"
          >
            <option value="all">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <div>
          <label className="text-xs text-slate-500 dark:text-slate-400">Category</label>
          <select
            value={filters.category}
            onChange={(e) => dispatch({ type: 'SET_FILTERS', payload: { category: e.target.value } })}
            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-slate-300 focus:ring dark:border-slate-800 dark:bg-slate-900"
          >
            {categoryOptions.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs text-slate-500 dark:text-slate-400">Sort</label>
          <select
            value={filters.sort}
            onChange={(e) => dispatch({ type: 'SET_FILTERS', payload: { sort: e.target.value } })}
            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-slate-300 focus:ring dark:border-slate-800 dark:bg-slate-900"
          >
            <option value="date_desc">Date (newest)</option>
            <option value="date_asc">Date (oldest)</option>
            <option value="amount_desc">Amount (high → low)</option>
            <option value="amount_asc">Amount (low → high)</option>
          </select>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 sm:justify-end">
        {!canEdit ? (
          <div className="text-xs text-slate-500 dark:text-slate-400">Viewer role: read-only</div>
        ) : (
          <div className="text-xs text-emerald-700 dark:text-emerald-300">Admin role: can add/edit</div>
        )}
      </div>
    </div>
  )
}
