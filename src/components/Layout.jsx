import { useDashboard } from '../context/DashboardContext'

export default function Layout({ children }) {
  const {
    state: {
      ui: { darkMode },
    },
  } = useDashboard()

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-dvh bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50">
        {children}
      </div>
    </div>
  )
}
