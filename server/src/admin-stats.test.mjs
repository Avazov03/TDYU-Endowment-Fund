import { describe, expect, it } from 'vitest'
import {
  countByMonth,
  lastNMonths,
  monthKey,
  sumByMonth,
  trendFromRows,
  trendPercent,
} from './admin-stats.mjs'

describe('admin-stats', () => {
  it('monthKey YYYY-MM qaytaradi', () => {
    expect(monthKey(new Date(2026, 8, 4))).toBe('2026-09')
    expect(monthKey('not-a-date')).toBe('')
  })

  it('lastNMonths oxirgi N oy, tartib o‘suvchi', () => {
    const months = lastNMonths(3, new Date(2026, 8, 4))
    expect(months.map((m) => m.key)).toEqual(['2026-07', '2026-08', '2026-09'])
    expect(months[2].label).toBe('Sen')
  })

  it('trendPercent: nol bazada 100, ikkalasi nol — 0', () => {
    expect(trendPercent(0, 0)).toBe(0)
    expect(trendPercent(5, 0)).toBe(100)
    expect(trendPercent(12, 10)).toBe(20)
    expect(trendPercent(8, 10)).toBe(-20)
  })

  it('countByMonth / sumByMonth faqat tanlangan oylarni oladi', () => {
    const months = lastNMonths(2, new Date(2026, 8, 15))
    const rows = [
      { createdAt: new Date(2026, 7, 2), amount: 100 },
      { createdAt: new Date(2026, 7, 20), amount: 50 },
      { createdAt: new Date(2026, 8, 1), amount: 200 },
      { createdAt: new Date(2026, 5, 1), amount: 999 },
    ]
    expect(countByMonth(rows, months)).toEqual([2, 1])
    expect(sumByMonth(rows, months, (r) => r.amount)).toEqual([150, 200])
  })

  it('trendFromRows shu oy vs o‘tgan oy', () => {
    const now = new Date(2026, 8, 10)
    const rows = [
      { createdAt: new Date(2026, 8, 2) },
      { createdAt: new Date(2026, 8, 9) },
      { createdAt: new Date(2026, 7, 20) },
    ]
    const t = trendFromRows(rows, now)
    expect(t.current).toBe(2)
    expect(t.previous).toBe(1)
    expect(t.pct).toBe(100)
  })
})
