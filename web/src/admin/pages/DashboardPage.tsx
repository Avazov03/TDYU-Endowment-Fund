'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { api } from '../api'
import MonthlyBarChart from '../apex/MonthlyBarChart'
import OpenWorkRadial from '../apex/OpenWorkRadial'
import StatisticsAreaChart from '../apex/StatisticsAreaChart'
import { QueueMix, TrendBadge } from '../charts'
import { EmptyState, LoadingBlock, StatusBadge, contactStatus, donationStatus, formatDate, formatMoney, grantStatus, shopOrderStatus } from '../ui'

type Trend = { current: number; previous: number; pct: number }

type Stats = {
  contactsNew: number
  donationsPending: number
  donationsConfirmed?: number
  donationsConfirmedSum?: number
  grantsNew: number
  subscribers: number
  announcements: number
  documents?: number
  contentBlocks?: number
  shopOrdersNew?: number
  shopOrdersOpen?: number
  products?: number
  productsLowStock?: number
  events?: number
  news?: number
  alumni?: number
  board?: number
  media?: number
  mediaBytes?: number
  openWork?: number
  trends?: { contacts: Trend; donations: Trend; grants: Trend; orders: Trend }
  month?: {
    labels: string[]
    contacts: number[]
    donations: number[]
    grants: number[]
    orders: number[]
  }
  recentContacts?: Contact[]
  recentDonations?: Donation[]
  recentGrants?: Grant[]
  recentOrders?: ShopOrder[]
  recentEvents?: EventRow[]
}

type Contact = { id: string; name: string; email: string; status: string; createdAt: string; message: string }
type Donation = {
  id: string
  firstName: string
  lastName?: string | null
  email?: string
  amount?: string | null
  currency?: string | null
  status: string
  createdAt: string
}
type Grant = { id: string; name: string; email: string; program?: string | null; status: string; createdAt: string }
type ShopOrder = { id: string; name: string; total: number; status: string; createdAt: string }
type EventRow = { slug: string; titleUz: string; dateUz: string; locUz: string; coverUrl?: string | null }

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [who, setWho] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      api<Stats>('/api/admin/stats'),
      api<{ name?: string; email?: string }>('/api/auth/me').catch(() => ({ name: '', email: '' })),
    ])
      .then(([s, u]) => {
        setStats(s)
        setWho(u.name || u.email || '')
      })
      .catch((e) => setError(e instanceof Error ? e.message : 'Yuklash xato'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <LoadingBlock label="Dashboard yuklanmoqda…" />

  const contacts = stats?.recentContacts || []
  const donations = stats?.recentDonations || []
  const grants = stats?.recentGrants || []
  const orders = stats?.recentOrders || []
  const events = stats?.recentEvents || []
  const labels = stats?.month?.labels || []
  const today = new Date().toLocaleDateString('uz-UZ', { weekday: 'long', day: 'numeric', month: 'long' })

  return (
    <>
      <div className="admin-top">
        <div>
          <p className="dash-kicker">{today}</p>
          <h1>{who ? `Xush kelibsiz, ${who.split(' ')[0]}` : 'Dashboard'}</h1>
          <p>Fond holati: murojaat, xayriya, grant, do‘kon va sayt katalogi — shu oy va 6 oylik tendensiya.</p>
        </div>
        <div className="toolbar">
          <Link className="btn ghost" href="/admin/events">
            + Tadbir
          </Link>
          <Link className="btn ghost" href="/admin/shop/products">
            Do‘kon
          </Link>
          <Link className="btn ghost" href="/admin/finance">
            Moliya
          </Link>
          <a className="btn" href="/uz" target="_blank" rel="noreferrer">
            Saytni ko‘rish
          </a>
        </div>
      </div>

      {error ? <div className="error">{error}</div> : null}

      <div className="cards cards-kpi">
        <Link className="stat-card" href="/admin/contacts">
          <div className="stat-card-top">
            <div className="stat-icon" aria-hidden>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 6 9-6" />
              </svg>
            </div>
            <TrendBadge pct={stats?.trends?.contacts.pct} />
          </div>
          <div className="label">Yangi murojaatlar</div>
          <div className="value">{stats?.contactsNew ?? 0}</div>
          <div className="hint">Shu oy {stats?.trends?.contacts.current ?? 0} ta · ko‘rib chiqish →</div>
        </Link>
        <Link className="stat-card" href="/admin/donations">
          <div className="stat-card-top">
            <div className="stat-icon warn" aria-hidden>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="3" y="8" width="18" height="13" rx="2" />
                <path d="M12 8v13M3 12h18" />
              </svg>
            </div>
            <TrendBadge pct={stats?.trends?.donations.pct} />
          </div>
          <div className="label">Kutilayotgan xayriya</div>
          <div className="value">{stats?.donationsPending ?? 0}</div>
          <div className="hint">Tasdiqlangan: {formatMoney(stats?.donationsConfirmedSum || 0)} →</div>
        </Link>
        <Link className="stat-card" href="/admin/grants">
          <div className="stat-card-top">
            <div className="stat-icon" aria-hidden>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="12" cy="9" r="5" />
                <path d="M8.5 13.5 7 21l5-3 5 3-1.5-7.5" />
              </svg>
            </div>
            <TrendBadge pct={stats?.trends?.grants.pct} />
          </div>
          <div className="label">Yangi grantlar</div>
          <div className="value">{stats?.grantsNew ?? 0}</div>
          <div className="hint">Shu oy {stats?.trends?.grants.current ?? 0} ta · baholash →</div>
        </Link>
        <Link className="stat-card" href="/admin/shop/orders">
          <div className="stat-card-top">
            <div className="stat-icon warn" aria-hidden>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M6 8h12l-1 13H7L6 8z" />
                <path d="M9 8V7a3 3 0 0 1 6 0v1" />
              </svg>
            </div>
            <TrendBadge pct={stats?.trends?.orders.pct} />
          </div>
          <div className="label">Yangi buyurtmalar</div>
          <div className="value">{stats?.shopOrdersNew ?? 0}</div>
          <div className="hint">Ochiq: {stats?.shopOrdersOpen ?? 0} · do‘kon →</div>
        </Link>
      </div>

      <div className="cards cards-mini">
        <Link className="stat-card mini" href="/admin/events">
          <div className="label">Tadbirlar</div>
          <div className="value">{stats?.events ?? 0}</div>
        </Link>
        <Link className="stat-card mini" href="/admin/news">
          <div className="label">Maqolalar</div>
          <div className="value">{stats?.news ?? 0}</div>
        </Link>
        <Link className="stat-card mini" href="/admin/shop/products">
          <div className="label">Mahsulotlar</div>
          <div className="value">{stats?.products ?? 0}</div>
          <div className="hint">{stats?.productsLowStock ?? 0} ta kam ombor</div>
        </Link>
        <Link className="stat-card mini" href="/admin/alumni">
          <div className="label">Bitiruvchilar</div>
          <div className="value">{stats?.alumni ?? 0}</div>
        </Link>
        <Link className="stat-card mini" href="/admin/media">
          <div className="label">Media</div>
          <div className="value">{stats?.media ?? 0}</div>
        </Link>
        <Link className="stat-card mini" href="/admin/subscribers">
          <div className="label">Obunachilar</div>
          <div className="value">{stats?.subscribers ?? 0}</div>
        </Link>
      </div>

      <div className="dash-grid dash-grid-chart">
        <div className="panel">
          <div className="panel-head">
            <h2>6 oylik harakat</h2>
            <span className="meta">Murojaat · xayriya · grant · buyurtma</span>
          </div>
          <div className="panel-pad">
            {labels.length ? (
              <MonthlyBarChart
                labels={labels}
                series={[
                  { name: 'Murojaat', data: stats?.month?.contacts || [] },
                  { name: 'Xayriya', data: stats?.month?.donations || [] },
                  { name: 'Grant', data: stats?.month?.grants || [] },
                  { name: 'Buyurtma', data: stats?.month?.orders || [] },
                ]}
              />
            ) : (
              <EmptyState title="Hali oylik ma’lumot yo‘q" />
            )}
          </div>
        </div>
        <div className="panel">
          <div className="panel-head">
            <h2>Ochiq ishlar</h2>
            <span className="meta">{stats?.openWork ?? 0} ta navbat</span>
          </div>
          <div className="panel-pad">
            <OpenWorkRadial
              rate={Math.min(
                100,
                Math.round(
                  (((stats?.donationsConfirmed ?? 0) + (stats?.announcements ?? 0)) /
                    Math.max(
                      1,
                      (stats?.donationsConfirmed ?? 0) +
                        (stats?.announcements ?? 0) +
                        (stats?.openWork ?? 0),
                    )) *
                    100,
                ),
              )}
              label="Bajarilgan ulushi"
              hint="Tasdiqlangan / e’lon qilingan ishlarning ochiq navbatga nisbati"
              foot={`${stats?.openWork ?? 0} ta tasdiq yoki javob kutmoqda`}
            />
            <QueueMix
              items={[
                { label: 'Murojaat', value: stats?.contactsNew ?? 0, href: '/admin/contacts', tone: 'info' },
                { label: 'Xayriya', value: stats?.donationsPending ?? 0, href: '/admin/donations', tone: 'warn' },
                { label: 'Grant', value: stats?.grantsNew ?? 0, href: '/admin/grants', tone: 'ok' },
                { label: 'Buyurtma', value: stats?.shopOrdersNew ?? 0, href: '/admin/shop/orders', tone: 'info' },
              ]}
            />
          </div>
        </div>
      </div>

      <div className="panel" style={{ marginBottom: 20 }}>
        <div className="panel-head">
          <h2>Tendensiya</h2>
          <span className="meta">Murojaat va xayriya</span>
        </div>
        <div className="panel-pad">
          {labels.length ? (
            <StatisticsAreaChart
              labels={labels}
              contacts={stats?.month?.contacts || []}
              donations={stats?.month?.donations || []}
            />
          ) : (
            <EmptyState title="Hali tendensiya yo‘q" />
          )}
        </div>
      </div>

      <div className="dash-grid">
        <div className="panel">
          <div className="panel-head">
            <h2>So‘nggi murojaatlar</h2>
            <Link className="meta" href="/admin/contacts">
              Barchasi
            </Link>
          </div>
          {!contacts.length ? (
            <EmptyState title="Hali murojaat yo‘q" hint="Saytdagi aloqa formasidan kelgan xabarlar shu yerda chiqadi." />
          ) : (
            <ul className="quick-list">
              {contacts.map((c) => (
                <li key={c.id}>
                  <div>
                    <strong>{c.name}</strong>
                    <div className="sub">
                      {c.email} · {formatDate(c.createdAt)}
                    </div>
                    <div className="sub">
                      {c.message.slice(0, 90)}
                      {c.message.length > 90 ? '…' : ''}
                    </div>
                  </div>
                  <StatusBadge value={c.status} map={contactStatus} />
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="panel">
          <div className="panel-head">
            <h2>So‘nggi xayriya</h2>
            <Link className="meta" href="/admin/donations">
              Barchasi
            </Link>
          </div>
          {!donations.length ? (
            <EmptyState title="Xayriya yo‘q" />
          ) : (
            <ul className="quick-list">
              {donations.map((d) => (
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
      </div>

      <div className="dash-grid" style={{ marginTop: 14 }}>
        <div className="panel">
          <div className="panel-head">
            <h2>Nashrdagi tadbirlar</h2>
            <Link className="meta" href="/admin/events">
              Boshqarish
            </Link>
          </div>
          {!events.length ? (
            <EmptyState title="Tadbir yo‘q" hint="CMS orqali tadbir qo‘shing — sayt katalogi saqlanadi." />
          ) : (
            <ul className="quick-list event-list">
              {events.map((ev) => (
                <li key={ev.slug}>
                  <div className="cms-row-main">
                    {ev.coverUrl ? <img className="cms-thumb" src={ev.coverUrl} alt="" /> : null}
                    <div>
                      <strong>{ev.titleUz}</strong>
                      <div className="sub">{[ev.dateUz, ev.locUz].filter(Boolean).join(' · ') || ev.slug}</div>
                    </div>
                  </div>
                  <a className="btn ghost sm" href={`/uz/events/${ev.slug}`} target="_blank" rel="noreferrer">
                    Sayt
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="panel">
          <div className="panel-head">
            <h2>So‘nggi buyurtmalar</h2>
            <Link className="meta" href="/admin/shop/orders">
              Barchasi
            </Link>
          </div>
          {!orders.length ? (
            <EmptyState title="Buyurtma yo‘q" />
          ) : (
            <ul className="quick-list">
              {orders.map((o) => (
                <li key={o.id}>
                  <div>
                    <strong>{o.name}</strong>
                    <div className="sub">
                      {formatMoney(o.total)} · {formatDate(o.createdAt)}
                    </div>
                  </div>
                  <StatusBadge value={o.status} map={shopOrderStatus} />
                </li>
              ))}
            </ul>
          )}
          <div className="panel-head" style={{ borderTop: '1px solid var(--tdyu-line)' }}>
            <h2>So‘nggi grantlar</h2>
            <Link className="meta" href="/admin/grants">
              Barchasi
            </Link>
          </div>
          {!grants.length ? (
            <EmptyState title="Grant yo‘q" />
          ) : (
            <ul className="quick-list">
              {grants.map((g) => (
                <li key={g.id}>
                  <div>
                    <strong>{g.name}</strong>
                    <div className="sub">
                      {g.program || 'Dastur ko‘rsatilmagan'} · {formatDate(g.createdAt)}
                    </div>
                  </div>
                  <StatusBadge value={g.status} map={grantStatus} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  )
}
