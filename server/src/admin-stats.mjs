/** Pure helpers for admin dashboard / finance charts. No Prisma. */

export const UZ_MONTHS_SHORT = ['Yan', 'Fev', 'Mar', 'Apr', 'May', 'Iyun', 'Iyul', 'Avg', 'Sen', 'Okt', 'Noy', 'Dek']

export function monthKey(date) {
  const d = date instanceof Date ? date : new Date(date)
  if (Number.isNaN(d.getTime())) return ''
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
}

export function lastNMonths(n, now = new Date()) {
  const count = Math.max(1, Number(n) || 6)
  const months = []
  const y = now.getFullYear()
  const m = now.getMonth()
  for (let i = count - 1; i >= 0; i -= 1) {
    const d = new Date(y, m - i, 1)
    months.push({
      key: monthKey(d),
      label: UZ_MONTHS_SHORT[d.getMonth()],
    })
  }
  return months
}

export function trendPercent(current, previous) {
  const c = Number(current) || 0
  const p = Number(previous) || 0
  if (p === 0) return c === 0 ? 0 : 100
  return Math.round(((c - p) / p) * 1000) / 10
}

export function countByMonth(rows, months, getDate = (r) => r.createdAt) {
  const map = Object.fromEntries(months.map((m) => [m.key, 0]))
  for (const row of rows || []) {
    const k = monthKey(getDate(row))
    if (k in map) map[k] += 1
  }
  return months.map((m) => map[m.key])
}

export function sumByMonth(rows, months, getAmount, getDate = (r) => r.createdAt) {
  const map = Object.fromEntries(months.map((m) => [m.key, 0]))
  for (const row of rows || []) {
    const k = monthKey(getDate(row))
    if (k in map) map[k] += Number(getAmount(row)) || 0
  }
  return months.map((m) => map[m.key])
}

export function monthStart(now = new Date()) {
  return new Date(now.getFullYear(), now.getMonth(), 1)
}

export function prevMonthStart(now = new Date()) {
  return new Date(now.getFullYear(), now.getMonth() - 1, 1)
}

export function inRange(date, start, end) {
  const t = new Date(date).getTime()
  return t >= start.getTime() && t < end.getTime()
}

export function countInRange(rows, start, end, getDate = (r) => r.createdAt) {
  return (rows || []).filter((r) => inRange(getDate(r), start, end)).length
}

export function trendFromRows(rows, now = new Date(), getDate = (r) => r.createdAt) {
  const thisStart = monthStart(now)
  const prevStart = prevMonthStart(now)
  const nextStart = new Date(now.getFullYear(), now.getMonth() + 1, 1)
  const current = countInRange(rows, thisStart, nextStart, getDate)
  const previous = countInRange(rows, prevStart, thisStart, getDate)
  return { current, previous, pct: trendPercent(current, previous) }
}
