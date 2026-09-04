'use client'

import Link from 'next/link'

type Series = { name: string; values: number[]; tone?: 'sky' | 'cyan' | 'ok' | 'warn' }

export function TrendBadge({ pct }: { pct?: number }) {
  const n = Number(pct) || 0
  if (n === 0) return <span className="trend flat">0%</span>
  const up = n > 0
  return (
    <span className={`trend ${up ? 'up' : 'down'}`}>
      {up ? '↑' : '↓'} {Math.abs(n).toLocaleString('uz-UZ')}%
    </span>
  )
}

export function BarChart({
  labels,
  series,
}: {
  labels: string[]
  series: Series[]
}) {
  const max = Math.max(1, ...series.flatMap((s) => s.values))
  return (
    <div className="chart-block">
      <div className="chart-legend">
        {series.map((s) => (
          <span key={s.name} className={`chart-key tone-${s.tone || 'sky'}`}>
            {s.name}
          </span>
        ))}
      </div>
      <div className="spark-chart" role="img" aria-label="Oylik statistika">
        {labels.map((label, i) => (
          <div className="spark-col" key={`${label}-${i}`}>
            <div className="spark-bars">
              {series.map((s) => (
                <div
                  key={s.name}
                  className={`spark-bar tone-${s.tone || 'sky'}`}
                  style={{ height: `${Math.round(((s.values[i] || 0) / max) * 100)}%` }}
                  title={`${s.name}: ${s.values[i] || 0}`}
                />
              ))}
            </div>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function QueueMix({
  items,
}: {
  items: { label: string; value: number; href: string; tone?: string }[]
}) {
  const total = items.reduce((s, i) => s + i.value, 0) || 1
  return (
    <div className="queue-mix">
      <div className="queue-track" aria-hidden>
        {items.map((i) =>
          i.value ? (
            <span
              key={i.label}
              className={`queue-seg tone-${i.tone || 'info'}`}
              style={{ width: `${(i.value / total) * 100}%` }}
            />
          ) : null,
        )}
      </div>
      <ul className="queue-list">
        {items.map((i) => (
          <li key={i.label}>
            <Link href={i.href} className="queue-row">
              <span>{i.label}</span>
              <strong>{i.value}</strong>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
