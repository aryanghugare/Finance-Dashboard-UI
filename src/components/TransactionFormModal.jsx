import { useEffect, useMemo, useState } from 'react'

const defaultTx = {
  date: new Date().toISOString().slice(0, 10),
  description: '',
  category: 'Other',
  type: 'expense',
  amount: '',
}

export default function TransactionFormModal({ open, onClose, initialValue, onSubmit, categories }) {
  const [value, setValue] = useState(defaultTx)

  useEffect(() => {
    if (open) {
      setValue(
        initialValue
          ? {
              ...initialValue,
              amount: String(initialValue.amount ?? ''),
            }
          : defaultTx,
      )
    }
  }, [open, initialValue])

  const categoryOptions = useMemo(() => {
    const known = new Set(categories || [])
    known.add('Other')
    return Array.from(known).sort((a, b) => a.localeCompare(b))
  }, [categories])

  if (!open) return null

  function submit(e) {
    e.preventDefault()
    const amount = Number(value.amount)
    if (!value.date || !value.description || !value.category || !value.type || !Number.isFinite(amount)) {
      return
    }
    onSubmit({
      ...value,
      amount,
    })
  }

  return (
    <div className="fixed inset-0 z-20 grid place-items-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-4 shadow-xl dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-sm font-semibold">{initialValue ? 'Edit transaction' : 'Add transaction'}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Admins can manage transactions</div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800"
          >
            Close
          </button>
        </div>

        <form onSubmit={submit} className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label className="text-xs text-slate-500 dark:text-slate-400">Date</label>
            <input
              type="date"
              value={value.date}
              onChange={(e) => setValue((v) => ({ ...v, date: e.target.value }))}
              className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-slate-300 focus:ring dark:border-slate-800 dark:bg-slate-950"
              required
            />
          </div>

          <div>
            <label className="text-xs text-slate-500 dark:text-slate-400">Type</label>
            <select
              value={value.type}
              onChange={(e) => setValue((v) => ({ ...v, type: e.target.value }))}
              className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-slate-300 focus:ring dark:border-slate-800 dark:bg-slate-950"
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="text-xs text-slate-500 dark:text-slate-400">Description</label>
            <input
              value={value.description}
              onChange={(e) => setValue((v) => ({ ...v, description: e.target.value }))}
              placeholder="What was this for?"
              className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-slate-300 focus:ring dark:border-slate-800 dark:bg-slate-950"
              required
            />
          </div>

          <div>
            <label className="text-xs text-slate-500 dark:text-slate-400">Category</label>
            <select
              value={value.category}
              onChange={(e) => setValue((v) => ({ ...v, category: e.target.value }))}
              className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-slate-300 focus:ring dark:border-slate-800 dark:bg-slate-950"
            >
              {categoryOptions.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs text-slate-500 dark:text-slate-400">Amount</label>
            <input
              inputMode="decimal"
              value={value.amount}
              onChange={(e) => setValue((v) => ({ ...v, amount: e.target.value }))}
              placeholder="0.00"
              className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-slate-300 focus:ring dark:border-slate-800 dark:bg-slate-950"
              required
            />
          </div>

          <div className="sm:col-span-2 flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
            <button type="submit" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-500">
              Save
            </button>
          </div>
        </form>

        <div className="mt-3 text-xs text-slate-500 dark:text-slate-400">
          Tip: Use Viewer role to demonstrate read-only UI.
        </div>
      </div>
    </div>
  )
}
