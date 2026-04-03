import './App.css'

import { DashboardProvider } from './context/DashboardContext'
import PageShell from './components/PageShell'
import DashboardPage from './pages/DashboardPage'

function App() {
  return (
    <DashboardProvider>
      <PageShell>
        <DashboardPage />
      </PageShell>
    </DashboardProvider>
  )
}

export default App
