import { useDashboard } from '../context/DashboardContext'

export default function Topbar() {
  const { state, dispatch, roles } = useDashboard()

  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/70">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="grid size-9 place-items-center rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900">
            <span className="text-sm font-semibold">FD</span>
          </div>
          <div>
            <div className="text-sm font-semibold leading-tight">Finance Dashboard</div>

          </div>
        </div>

        <div className="flex items-center gap-2">
          <label className="hidden text-xs text-slate-500 dark:text-slate-400 sm:block">Role</label>
          <select
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-slate-300 focus:ring dark:border-slate-800 dark:bg-slate-900"
            value={state.role}
            onChange={(e) => dispatch({ type: 'SET_ROLE', role: e.target.value })}
            aria-label="Select role"
          >
            <option value={roles.viewer}>Viewer</option>
            <option value={roles.admin}>Admin</option>
          </select>

          <button
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800"
            onClick={() => dispatch({ type: 'TOGGLE_DARK' })}
            type="button"
          >
            {state.ui.darkMode ? 'Light' : 'Dark'}
          </button>
        </div>
      </div>
    </header>
  )
}
