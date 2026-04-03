export default function EmptyState({ title = 'No data', description = 'Try changing filters.' }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
      <div className="text-base font-semibold text-slate-900 dark:text-slate-50">{title}</div>
      <div className="mt-1">{description}</div>
    </div>
  )
}
