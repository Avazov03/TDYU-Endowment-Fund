'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { api } from '../api'
import { EmptyState, LoadingBlock, StatusBadge, contactStatus, donationStatus, formatDate, grantStatus } from '../ui'

type Stats = {
  contactsNew: number
  donationsPending: number
  grantsNew: number
  subscribers: number
  announcements: number
  documents?: number
  contentBlocks?: number
  shopOrdersNew?: number
  products?: number
  events?: number
  news?: number
}

type Contact = { id: string; name: string; email: string; status: string; createdAt: string; message: string }
type Donation = {
  id: string
  firstName: string
  lastName?: string | null
  email: string
  amount?: string | null
  currency?: string | null
  status: string
  createdAt: string
}
type Grant = { id: string; name: string; email: string; program?: string | null; status: string; createdAt: string }

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [contacts, setContacts] = useState<Contact[]>([])
  const [donations, setDonations] = useState<Donation[]>([])
  const [grants, setGrants] = useState<Grant[]>([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      api<Stats>('/api/admin/stats'),
      api<Contact[]>('/api/admin/contacts'),
      api<Donation[]>('/api/admin/donations'),
      api<Grant[]>('/api/admin/grants'),
    ])
      .then(([s, c, d, g]) => {
        setStats(s)
        setContacts(c.slice(0, 5))
        setDonations(d.slice(0, 5))
        setGrants(g.slice(0, 5))
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <LoadingBlock label="Dashboard yuklanmoqda…" />

  return (
    <>
      <div className="admin-top">
        <div>
          <h1>Dashboard</h1>
          <p>Bugungi holat: yangi murojaatlar, xayriya va grantlar — bir qarashda. Dasturlar, FAQ va hisobotlar hozircha kodda (keyingi CMS).</p>
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

      <div className="cards">
        <Link className="stat-card" href="/admin/contacts">
          <div className="stat-icon">✉</div>
          <div className="label">Yangi murojaatlar</div>
          <div className="value">{stats?.contactsNew ?? 0}</div>
          <div className="hint">Ko‘rib chiqish →</div>
        </Link>
        <Link className="stat-card" href="/admin/donations">
          <div className="stat-icon warn">₴</div>
          <div className="label">Kutilayotgan xayriya</div>
          <div className="value">{stats?.donationsPending ?? 0}</div>
          <div className="hint">Tasdiqlash →</div>
        </Link>
        <Link className="stat-card" href="/admin/grants">
          <div className="stat-icon">★</div>
          <div className="label">Yangi grantlar</div>
          <div className="value">{stats?.grantsNew ?? 0}</div>
          <div className="hint">Baholash →</div>
        </Link>
        <Link className="stat-card" href="/admin/subscribers">
          <div className="stat-icon ok">◎</div>
          <div className="label">Obunachilar</div>
          <div className="value">{stats?.subscribers ?? 0}</div>
          <div className="hint">Ro‘yxat →</div>
        </Link>
        <Link className="stat-card" href="/admin/shop/orders">
          <div className="stat-icon warn">▣</div>
          <div className="label">Yangi buyurtmalar</div>
          <div className="value">{stats?.shopOrdersNew ?? 0}</div>
          <div className="hint">Do‘kon →</div>
        </Link>
        <Link className="stat-card" href="/admin/events">
          <div className="stat-icon">☰</div>
          <div className="label">Tadbirlar</div>
          <div className="value">{stats?.events ?? 0}</div>
          <div className="hint">Boshqarish →</div>
        </Link>
        <Link className="stat-card" href="/admin/announcements">
          <div className="stat-icon">☰</div>
          <div className="label">Nashr e’lonlar</div>
          <div className="value">{stats?.announcements ?? 0}</div>
          <div className="hint">Boshqarish →</div>
        </Link>
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
                    <div className="sub">{c.message.slice(0, 90)}{c.message.length > 90 ? '…' : ''}</div>
                  </div>
                  <StatusBadge value={c.status} map={contactStatus} />
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="panel">
          <div className="panel-head">
            <h2>Tezkor amallar</h2>
          </div>
          <div className="quick-actions">
            <Link href="/admin/events">
              Tadbir qo‘shish / tahrirlash <span>→</span>
            </Link>
            <Link href="/admin/shop/products">
              Mahsulotlar va ombor <span>→</span>
            </Link>
            <Link href="/admin/shop/orders">
              Do‘kon buyurtmalari <span>→</span>
            </Link>
            <Link href="/admin/finance">
              Moliya paneli <span>→</span>
            </Link>
            <Link href="/admin/alumni">
              Bitiruvchilar <span>→</span>
            </Link>
            <Link href="/admin/content">
              Sayt matnlarini tahrirlash <span>→</span>
            </Link>
          </div>
          <div className="panel-head" style={{ borderTop: '1px solid var(--tdyu-line)' }}>
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
