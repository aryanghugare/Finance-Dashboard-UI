import { useMemo, useState } from 'react'
import { useDashboard } from '../context/DashboardContext'
import { formatCurrency, formatDateISO } from '../utils/format'
import EmptyState from './EmptyState'
import TransactionFormModal from './TransactionFormModal'

function badgeClasses(type) {
  return type === 'income'
    ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
    : 'bg-rose-500/10 text-rose-700 dark:text-rose-300'
}

function matchesFilters(t, filters) {
  const q = filters.query.trim().toLowerCase()
  if (q) {
    const hay = `${t.description} ${t.category} ${t.type}`.toLowerCase()
    if (!hay.includes(q)) return false
  }
  if (filters.type !== 'all' && t.type !== filters.type) return false
  if (filters.category !== 'all' && t.category !== filters.category) return false
  return true
}

function sortTx(a, b, sort) {
  switch (sort) {
    case 'date_asc':
      return a.date.localeCompare(b.date)
    case 'date_desc':
      return b.date.localeCompare(a.date)
    case 'amount_asc':
      return Number(a.amount) - Number(b.amount)
    case 'amount_desc':
      return Number(b.amount) - Number(a.amount)
    default:
      return b.date.localeCompare(a.date)
  }
}

export default function TransactionsTable() {
  const { state, dispatch, roles } = useDashboard()
  const { transactions, filters, currency, role } = state
  const canEdit = role === roles.admin

  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)

  const categories = useMemo(() => {
    const set = new Set(transactions.map((t) => t.category).filter(Boolean))
    return Array.from(set).sort((a, b) => a.localeCompare(b))
  }, [transactions])

  const rows = useMemo(() => {
    return transactions.filter((t) => matchesFilters(t, filters)).sort((a, b) => sortTx(a, b, filters.sort))
  }, [transactions, filters])

  function openAdd() {
    setEditing(null)
    setModalOpen(true)
  }

  function openEdit(tx) {
    setEditing(tx)
    setModalOpen(true)
  }

  function closeModal() {
    setModalOpen(false)
    setEditing(null)
  }

  function submitTx(formValue) {
    if (!canEdit) return

    if (editing) {
      dispatch({ type: 'UPDATE_TX', tx: { ...editing, ...formValue } })
    } else {
      dispatch({
        type: 'ADD_TX',
        tx: {
          id: `t_${Math.random().toString(16).slice(2)}`,
          ...formValue,
        },
      })
    }
    closeModal()
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm font-semibold">Transactions</div>
          <div className="text-xs text-slate-500 dark:text-slate-400">Search, filter and sort</div>
        </div>
        {canEdit ? (
          <button
            type="button"
            onClick={openAdd}
            className="rounded-lg bg-indigo-600 px-3 py-2 text-sm text-white hover:bg-indigo-500"
          >
            + Add
          </button>
        ) : null}
      </div>

      <div className="mt-4 overflow-x-auto">
        {rows.length === 0 ? (
          <EmptyState title="No transactions" description="Try clearing filters or add some (Admin role)." />
        ) : (
          <table className="w-full min-w-170 text-left text-sm">
            <thead className="text-xs text-slate-500 dark:text-slate-400">
              <tr className="border-b border-slate-200 dark:border-slate-800">
                <th className="py-2 pr-4">Date</th>
                <th className="py-2 pr-4">Description</th>
                <th className="py-2 pr-4">Category</th>
                <th className="py-2 pr-4">Type</th>
                <th className="py-2 pr-4 text-right">Amount</th>
                {canEdit ? <th className="py-2 pr-0 text-right">Actions</th> : null}
              </tr>
            </thead>
            <tbody>
              {rows.map((t) => (
                <tr key={t.id} className="border-b border-slate-100 last:border-0 dark:border-slate-800">
                  <td className="py-3 pr-4 whitespace-nowrap">{formatDateISO(t.date)}</td>
                  <td className="py-3 pr-4">{t.description}</td>
                  <td className="py-3 pr-4">{t.category}</td>
                  <td className="py-3 pr-4">
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs ${badgeClasses(t.type)}`}>
                      {t.type}
                    </span>
                  </td>
                  <td className={`py-3 pr-4 text-right ${t.type === 'expense' ? 'text-rose-600' : 'text-emerald-600'}`}>
                    {t.type === 'expense' ? '-' : '+'}
                    {formatCurrency(t.amount, currency)}
                  </td>
                  {canEdit ? (
                    <td className="py-3 pr-0 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => openEdit(t)}
                          className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => dispatch({ type: 'DELETE_TX', id: t.id })}
                          className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs text-rose-700 hover:bg-rose-50 dark:border-slate-800 dark:bg-slate-950 dark:text-rose-300 dark:hover:bg-rose-950/40"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  ) : null}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <TransactionFormModal
        open={modalOpen}
        onClose={closeModal}
        initialValue={editing}
        onSubmit={submitTx}
        categories={categories}
      />
    </section>
  )
}
