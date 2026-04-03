import { createContext, useContext, useEffect, useMemo, useReducer } from 'react'
import { initialTransactions } from '../data/mockTransactions'
import { loadState, saveState } from '../utils/storage'

const DashboardContext = createContext(null)

const roles = /** @type {const} */ ({
  viewer: 'viewer',
  admin: 'admin',
})

const initialState = {
  role: roles.viewer,
  currency: 'USD',
  startingBalance: 1200,
  transactions: initialTransactions,
  filters: {
    query: '',
    type: 'all', // all | income | expense
    category: 'all',
    sort: 'date_desc', // date_desc | date_asc | amount_desc | amount_asc
  },
  ui: {
    darkMode: false,
  },
}

function reducer(state, action) {
  switch (action.type) {
    case 'HYDRATE': {
      const next = { ...state, ...action.payload }
      // keep shape safe
      next.filters = { ...state.filters, ...(action.payload?.filters || {}) }
      next.ui = { ...state.ui, ...(action.payload?.ui || {}) }
      return next
    }
    case 'SET_ROLE':
      return { ...state, role: action.role }
    case 'TOGGLE_DARK':
      return { ...state, ui: { ...state.ui, darkMode: !state.ui.darkMode } }
    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload } }
    case 'ADD_TX':
      return { ...state, transactions: [action.tx, ...state.transactions] }
    case 'UPDATE_TX': {
      const txs = state.transactions.map((t) => (t.id === action.tx.id ? action.tx : t))
      return { ...state, transactions: txs }
    }
    case 'DELETE_TX': {
      const txs = state.transactions.filter((t) => t.id !== action.id)
      return { ...state, transactions: txs }
    }
    default:
      return state
  }
}

export function DashboardProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const saved = loadState()
    if (saved) dispatch({ type: 'HYDRATE', payload: saved })
  }, [])

  useEffect(() => {
    saveState({
      role: state.role,
      currency: state.currency,
      startingBalance: state.startingBalance,
      transactions: state.transactions,
      filters: state.filters,
      ui: state.ui,
    })
  }, [state.role, state.currency, state.startingBalance, state.transactions, state.filters, state.ui])

  const value = useMemo(() => ({ state, dispatch, roles }), [state])

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>
}

export function useDashboard() {
  const ctx = useContext(DashboardContext)
  if (!ctx) throw new Error('useDashboard must be used within DashboardProvider')
  return ctx
}
