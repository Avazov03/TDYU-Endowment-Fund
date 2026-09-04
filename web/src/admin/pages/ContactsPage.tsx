'use client'

import { useEffect, useMemo, useState } from 'react'
import { api } from '../api'
import { Drawer } from '../Drawer'
import { EmptyState, LoadingBlock, StatusBadge, contactStatus, formatDate } from '../ui'

type Contact = {
  id: string
  name: string
  email: string
  phone?: string | null
  subject?: string | null
  message: string
  status: string
  lang: string
  page?: string | null
  adminNote?: string | null
  createdAt: string
}

const statuses = [
  { v: 'new', l: 'Yangi' },
  { v: 'in_progress', l: 'Jarayonda' },
  { v: 'closed', l: 'Yopilgan' },
]

export default function ContactsPage() {
  const [rows, setRows] = useState<Contact[]>([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState('all')
  const [kind, setKind] = useState('all')
  const [q, setQ] = useState('')
  const [active, setActive] = useState<Contact | null>(null)
  const [note, setNote] = useState('')
  const [statusEdit, setStatusEdit] = useState('new')

  async function load() {
    try {
      setRows(await api<Contact[]>('/api/admin/contacts'))
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const filtered = useMemo(() => {
    return rows.filter((r) => {
      if (status !== 'all' && r.status !== status) return false
      if (kind === 'shop' && r.page !== 'shop') return false
      if (kind === 'contact' && r.page === 'shop') return false
      if (!q.trim()) return true
      const hay = `${r.name} ${r.email} ${r.phone || ''} ${r.subject || ''} ${r.message}`.toLowerCase()
      return hay.includes(q.trim().toLowerCase())
    })
  }, [rows, status, kind, q])

  function open(r: Contact) {
    setActive(r)
    setNote(r.adminNote || '')
    setStatusEdit(r.status)
  }

  async function saveDetail() {
    if (!active) return
    await api(`/api/admin/contacts/${active.id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status: statusEdit, adminNote: note }),
    })
    setActive(null)
    load()
  }

  return (
    <>
      <div className="admin-top">
        <div>
          <h1>Murojaatlar</h1>
          <p>Har bir murojaatni ochib ko‘ring, izoh qoldiring va statusni yuriting.</p>
        </div>
      </div>
      {error ? <div className="error">{error}</div> : null}
      <div className="panel">
        <div className="filters">
          <input className="search" placeholder="Qidirish…" value={q} onChange={(e) => setQ(e.target.value)} />
          <select value={kind} onChange={(e) => setKind(e.target.value)}>
            <option value="all">Barcha turlar</option>
            <option value="contact">Aloqa</option>
            <option value="shop">TSUL SHOP</option>
          </select>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="all">Barcha statuslar</option>
            {statuses.map((s) => (
              <option key={s.v} value={s.v}>
                {s.l}
              </option>
            ))}
          </select>
          <span className="badge tone-neutral">{filtered.length} ta</span>
        </div>
        {loading ? (
          <LoadingBlock />
        ) : !filtered.length ? (
          <EmptyState title="Murojaat topilmadi" hint="Saytdagi aloqa formasidan kelgan xabarlar shu yerda." />
        ) : (
          <table>
            <thead>
              <tr>
                <th>Kim</th>
                <th>Xabar</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id}>
                  <td>
                    <div className="cell-title">{r.name}</div>
                    <div className="cell-meta">
                      {r.email}
                      {r.phone ? ` · ${r.phone}` : ''}
                    </div>
                    <div className="cell-meta">{formatDate(r.createdAt)}</div>
                    {r.page === 'shop' ? <div className="badge tone-info">TSUL SHOP</div> : null}
                  </td>
                  <td style={{ maxWidth: 340 }}>
                    {r.subject ? <div className="cell-title">{r.subject}</div> : null}
                    {r.message.slice(0, 140)}
                    {r.message.length > 140 ? '…' : ''}
                  </td>
                  <td>
                    <StatusBadge value={r.status} map={contactStatus} />
                  </td>
                  <td>
                    <div className="row-actions">
                      <button type="button" className="btn sm" onClick={() => open(r)}>
                        Boshqarish
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Drawer
        open={!!active}
        title={active ? active.name : ''}
        onClose={() => setActive(null)}
        footer={
          <>
            <button type="button" className="btn ghost" onClick={() => setActive(null)}>
              Yopish
            </button>
            <button type="button" className="btn" onClick={saveDetail}>
              Saqlash
            </button>
          </>
        }
      >
        {active ? (
          <div className="form-grid" style={{ padding: 0 }}>
            <div className="detail-grid">
              <div>
                <span className="detail-label">Email</span>
                <a href={`mailto:${active.email}`}>{active.email}</a>
              </div>
              <div>
                <span className="detail-label">Telefon</span>
                <div>{active.phone || '—'}</div>
              </div>
              <div>
                <span className="detail-label">Til / sana</span>
                <div>
                  {active.lang.toUpperCase()} · {formatDate(active.createdAt)}
                </div>
              </div>
              <div>
                <span className="detail-label">Sahifa</span>
                <div className="cell-meta">{active.page || '—'}</div>
              </div>
            </div>
            <div>
              <span className="detail-label">Xabar</span>
              <div className="detail-box">{active.message}</div>
            </div>
            <label>
              Status
              <select value={statusEdit} onChange={(e) => setStatusEdit(e.target.value)}>
                {statuses.map((s) => (
                  <option key={s.v} value={s.v}>
                    {s.l}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Admin izohi (ichki)
              <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Masalan: qo‘ng‘iroq qilindi, javob berildi…" />
            </label>
            <div className="row-actions">
              <a className="btn ghost" href={`mailto:${active.email}`}>
                Email yuborish
              </a>
              <button
                type="button"
                className="btn danger"
                onClick={async () => {
                  if (!confirm('O‘chirish?')) return
                  await api(`/api/admin/contacts/${active.id}`, { method: 'DELETE' })
                  setActive(null)
                  load()
                }}
              >
                O‘chirish
              </button>
            </div>
          </div>
        ) : null}
      </Drawer>
    </>
  )
}
