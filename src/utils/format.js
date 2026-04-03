export function formatCurrency(value, currency = 'USD') {
  const v = Number(value || 0)
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency,
    maximumFractionDigits: v % 1 === 0 ? 0 : 2,
  }).format(v)
}

export function formatDateISO(iso) {
  if (!iso) return ''
  const d = new Date(iso + 'T00:00:00')
  return d.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  })
}

export function monthKey(iso) {
  const d = new Date(iso + 'T00:00:00')
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  return `${yyyy}-${mm}`
}
