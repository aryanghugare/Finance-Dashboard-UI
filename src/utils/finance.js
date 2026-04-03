import { monthKey } from './format'

export function sumByType(transactions, type) {
  return transactions
    .filter((t) => t.type === type)
    .reduce((acc, t) => acc + Number(t.amount || 0), 0)
}

export function totalBalance(transactions, startingBalance = 0) {
  const income = sumByType(transactions, 'income')
  const expenses = sumByType(transactions, 'expense')
  return Number(startingBalance || 0) + income - expenses
}

export function groupExpensesByCategory(transactions) {
  const map = new Map()
  for (const t of transactions) {
    if (t.type !== 'expense') continue
    const key = t.category || 'Uncategorized'
    map.set(key, (map.get(key) || 0) + Number(t.amount || 0))
  }
  return Array.from(map.entries())
    .map(([category, total]) => ({ category, total }))
    .sort((a, b) => b.total - a.total)
}

export function groupNetByDay(transactions) {
  // returns [{date, net}] sorted asc by date
  const map = new Map()
  for (const t of transactions) {
    const key = t.date
    const sign = t.type === 'expense' ? -1 : 1
    map.set(key, (map.get(key) || 0) + sign * Number(t.amount || 0))
  }
  return Array.from(map.entries())
    .map(([date, net]) => ({ date, net }))
    .sort((a, b) => a.date.localeCompare(b.date))
}

export function cumulativeSeries(netByDay, startingBalance = 0) {
  let running = Number(startingBalance || 0)
  return netByDay.map((p) => {
    running += Number(p.net || 0)
    return { date: p.date, balance: running }
  })
}

export function groupNetByMonth(transactions) {
  const map = new Map()
  for (const t of transactions) {
    const key = monthKey(t.date)
    const sign = t.type === 'expense' ? -1 : 1
    map.set(key, (map.get(key) || 0) + sign * Number(t.amount || 0))
  }
  return Array.from(map.entries())
    .map(([month, net]) => ({ month, net }))
    .sort((a, b) => a.month.localeCompare(b.month))
}

export function topSpendingCategory(transactions) {
  const grouped = groupExpensesByCategory(transactions)
  return grouped[0] || null
}
