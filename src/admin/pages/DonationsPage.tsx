import { useEffect, useMemo, useState } from 'react'
import { api } from '../api'
import { Drawer } from '../Drawer'
import { EmptyState, LoadingBlock, StatusBadge, donationStatus, formatDate } from '../ui'

type Donation = {
  id: string
  firstName: string
  lastName?: string | null
  email: string
  phone?: string | null
  amount?: string | null
  currency?: string | null
  note?: string | null
  adminNote?: string | null
  paymentMethod?: string | null
  paymentDemo?: boolean
  paymentStatus?: string | null
  cardLast4?: string | null
  status: string
  createdAt: string
}

const statuses = [
  { v: 'pending', l: 'Kutilmoqda' },
  { v: 'confirmed', l: 'Tasdiqlangan' },
  { v: 'cancelled', l: 'Bekor' },
]

export default function DonationsPage() {
  const [rows, setRows] = useState<Donation[]>([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState('all')
  const [q, setQ] = useState('')
  const [active, setActive] = useState<Donation | null>(null)
  const [note, setNote] = useState('')
  const [statusEdit, setStatusEdit] = useState('pending')

  async function load() {
    try {
      setRows(await api<Donation[]>('/api/admin/donations'))
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
      if (!q.trim()) return true
      const hay = `${r.firstName} ${r.lastName || ''} ${r.email} ${r.amount || ''} ${r.note || ''}`.toLowerCase()
      return hay.includes(q.trim().toLowerCase())
    })
  }, [rows, status, q])

  function open(r: Donation) {
    setActive(r)
    setNote(r.adminNote || '')
    setStatusEdit(r.status)
  }

  async function saveDetail() {
    if (!active) return
    await api(`/api/admin/donations/${active.id}`, {
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
          <h1>Xayriya arizalari</h1>
          <p>Bank o‘tkazmasini tekshirib, arizani tasdiqlang yoki bekor qiling.</p>
        </div>
      </div>
      {error ? <div className="error">{error}</div> : null}
      <div className="panel">
        <div className="filters">
          <input className="search" placeholder="Qidirish…" value={q} onChange={(e) => setQ(e.target.value)} />
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
          <EmptyState title="Xayriya arizasi yo‘q" />
        ) : (
          <table>
            <thead>
              <tr>
                <th>Donor</th>
                <th>Miqdor</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id}>
                  <td>
                    <div className="cell-title">
                      {r.firstName}
                      {r.lastName ? ` ${r.lastName}` : ''}
                    </div>
                    <div className="cell-meta">{r.email}</div>
                    <div className="cell-meta">{formatDate(r.createdAt)}</div>
                    <div className="cell-meta">
                      {(r.paymentMethod || 'bank').toUpperCase()}
                      {r.paymentDemo ? ' · DEMO' : ''}
                      {r.cardLast4 ? ` · ****${r.cardLast4}` : ''}
                    </div>
                  </td>
                  <td className="cell-title">
                    {r.amount || '—'} {r.currency || 'UZS'}
                  </td>
                  <td>
                    <StatusBadge value={r.status} map={donationStatus} />
                  </td>
                  <td>
                    <button type="button" className="btn sm" onClick={() => open(r)}>
                      Boshqarish
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Drawer
        open={!!active}
        title={active ? `${active.firstName} ${active.lastName || ''}`.trim() : ''}
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
                <span className="detail-label">Miqdor</span>
                <div className="cell-title">
                  {active.amount || '—'} {active.currency || 'UZS'}
                </div>
              </div>
              <div>
                <span className="detail-label">To‘lov</span>
                <div>
                  {(active.paymentMethod || 'bank').toUpperCase()}
                  {active.paymentDemo ? ' · DEMO' : ''}
                  {active.paymentStatus ? ` · ${active.paymentStatus}` : ''}
                  {active.cardLast4 ? ` · ****${active.cardLast4}` : ''}
                </div>
              </div>
              <div>
                <span className="detail-label">Sana</span>
                <div>{formatDate(active.createdAt)}</div>
              </div>
            </div>
            {active.adminNote ? (
              <div>
                <span className="detail-label">Tizim izohi</span>
                <div className="detail-box">{active.adminNote}</div>
              </div>
            ) : null}
            <div>
              <span className="detail-label">Donor izohi</span>
              <div className="detail-box">{active.note || '—'}</div>
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
              Admin izohi
              <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="To‘lov cheki tekshirildi…" />
            </label>
            <button
              type="button"
              className="btn danger"
              onClick={async () => {
                if (!confirm('O‘chirish?')) return
                await api(`/api/admin/donations/${active.id}`, { method: 'DELETE' })
                setActive(null)
                load()
              }}
            >
              O‘chirish
            </button>
          </div>
        ) : null}
      </Drawer>
    </>
  )
}
