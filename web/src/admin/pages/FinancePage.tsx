'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { api } from '../api'
import { EmptyState, LoadingBlock, StatusBadge, donationStatus, formatDate, shopOrderStatus } from '../ui'
import { BarChart } from '../charts'

type Finance = {
  donations: {
    pendingCount: number
    confirmedCount: number
    pendingSum: number
    confirmedSum: number
    recent: { id: string; firstName: string; lastName?: string | null; amount?: string | null; currency?: string | null; status: string; createdAt: string }[]
  }
  shop: {
    openCount: number
    doneCount: number
    openSum: number
    doneSum: number
    lowStock: { id: string; slug: string; nameUz: string; stock: number }[]
    recent: { id: string; name: string; total: number; status: string; createdAt: string }[]
  }
  grants: { new: number; reviewing: number; accepted: number; rejected: number }
  month?: { labels: string[]; donationSum: number[]; orderSum: number[] }
}

function money(n: number) {
  return `${Math.round(n).toLocaleString('uz-UZ')} so‘m`
}

export default function FinancePage() {
  const [data, setData] = useState<Finance | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api<Finance>('/api/admin/finance')
      .then(setData)
      .catch((e) => setError(e instanceof Error ? e.message : 'Xato'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <LoadingBlock label="Moliya yuklanmoqda…" />

  return (
    <>
      <div className="admin-top">
        <div>
          <h1>Moliya</h1>
          <p>Xayriya, do‘kon tushumi va grant arizalari — bir ekranda. To‘lov tizimi keyingi bosqich.</p>
        </div>
        <div className="toolbar">
          <Link className="btn ghost" href="/admin/donations">
            Xayriya
          </Link>
          <Link className="btn ghost" href="/admin/shop/orders">
            Buyurtmalar
          </Link>
        </div>
      </div>
      {error ? <div className="error">{error}</div> : null}

      <div className="cards cards-4">
        <div className="stat-card">
          <div className="label">Tasdiqlangan xayriya</div>
          <div className="value">{money(data?.donations.confirmedSum || 0)}</div>
          <div className="hint">{data?.donations.confirmedCount || 0} ta to‘lov</div>
        </div>
        <div className="stat-card">
          <div className="label">Kutilayotgan xayriya</div>
          <div className="value">{money(data?.donations.pendingSum || 0)}</div>
          <div className="hint">{data?.donations.pendingCount || 0} ta kutilmoqda</div>
        </div>
        <div className="stat-card">
          <div className="label">Do‘kon (berilgan)</div>
          <div className="value">{money(data?.shop.doneSum || 0)}</div>
          <div className="hint">{data?.shop.doneCount || 0} ta buyurtma</div>
        </div>
        <div className="stat-card">
          <div className="label">Do‘kon (jarayonda)</div>
          <div className="value">{money(data?.shop.openSum || 0)}</div>
          <div className="hint">{data?.shop.openCount || 0} ta ochiq</div>
        </div>
      </div>

      <div className="panel" style={{ marginBottom: 14 }}>
        <div className="panel-head">
          <h2>6 oylik tushum</h2>
          <span className="meta">Tasdiqlangan xayriya va berilgan buyurtmalar</span>
        </div>
        <div className="panel-pad">
          {data?.month?.labels?.length ? (
            <BarChart
              labels={data.month.labels}
              series={[
                { name: 'Xayriya', values: data.month.donationSum || [], tone: 'ok' },
                { name: 'Do‘kon', values: data.month.orderSum || [], tone: 'sky' },
              ]}
            />
          ) : (
            <EmptyState title="Hali oylik tushum yo‘q" />
          )}
        </div>
      </div>

      <div className="dash-grid">
        <div className="panel">
          <div className="panel-head">
            <h2>So‘nggi xayriya</h2>
            <Link className="meta" href="/admin/donations">
              Barchasi
            </Link>
          </div>
          {!data?.donations.recent.length ? (
            <EmptyState title="Hali xayriya yo‘q" />
          ) : (
            <ul className="quick-list">
              {data.donations.recent.map((d) => (
                <li key={d.id}>
                  <div>
                    <strong>
                      {d.firstName}
                      {d.lastName ? ` ${d.lastName}` : ''}
                    </strong>
                    <div className="sub">
                      {d.amount || '—'} {d.currency || 'UZS'} · {formatDate(d.createdAt)}
                    </div>
                  </div>
                  <StatusBadge value={d.status} map={donationStatus} />
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="panel">
          <div className="panel-head">
            <h2>Do‘kon buyurtmalari</h2>
            <Link className="meta" href="/admin/shop/orders">
              Barchasi
            </Link>
          </div>
          {!data?.shop.recent.length ? (
            <EmptyState title="Buyurtma yo‘q" />
          ) : (
            <ul className="quick-list">
              {data.shop.recent.map((o) => (
                <li key={o.id}>
                  <div>
                    <strong>{o.name}</strong>
                    <div className="sub">
                      {money(o.total)} · {formatDate(o.createdAt)}
                    </div>
                  </div>
                  <StatusBadge value={o.status} map={shopOrderStatus} />
                </li>
              ))}
            </ul>
          )}
          <div className="panel-head" style={{ borderTop: '1px solid var(--tdyu-line)' }}>
            <h2>Kam qolgan ombor</h2>
            <Link className="meta" href="/admin/shop/products">
              Mahsulotlar
            </Link>
          </div>
          {!data?.shop.lowStock.length ? (
            <div className="empty-state">
              <strong>Ombor barqaror</strong>
              <p>5 tadan kam mahsulot yo‘q.</p>
            </div>
          ) : (
            <ul className="quick-list">
              {data.shop.lowStock.map((p) => (
                <li key={p.id}>
                  <div>
                    <strong>{p.nameUz}</strong>
                    <div className="sub">{p.slug}</div>
                  </div>
                  <span className="badge tone-warn">{p.stock} dona</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="panel" style={{ marginTop: 14 }}>
        <div className="panel-head">
          <h2>Grant arizalari</h2>
          <Link className="meta" href="/admin/grants">
            Ochish
          </Link>
        </div>
        <div className="finance-grants">
          <span>Yangi: {data?.grants.new ?? 0}</span>
          <span>Ko‘rilmoqda: {data?.grants.reviewing ?? 0}</span>
          <span>Qabul: {data?.grants.accepted ?? 0}</span>
          <span>Rad: {data?.grants.rejected ?? 0}</span>
        </div>
      </div>
    </>
  )
}
