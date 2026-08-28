import { useEffect, useMemo, useState } from 'react'
import { api } from '../api'
import { Drawer } from '../Drawer'
import { EmptyState, LoadingBlock, StatusBadge, formatDate, grantStatus } from '../ui'

type Grant = {
  id: string
  name: string
  email: string
  phone?: string | null
  program?: string | null
  message?: string | null
  adminNote?: string | null
  status: string
  createdAt: string
}

const statuses = [
  { v: 'new', l: 'Yangi' },
  { v: 'reviewing', l: 'Ko‘rib chiqilmoqda' },
  { v: 'accepted', l: 'Qabul' },
  { v: 'rejected', l: 'Rad' },
]

export default function GrantsPage() {
  const [rows, setRows] = useState<Grant[]>([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState('all')
  const [q, setQ] = useState('')
  const [active, setActive] = useState<Grant | null>(null)
  const [note, setNote] = useState('')
  const [statusEdit, setStatusEdit] = useState('new')

  async function load() {
    try {
      setRows(await api<Grant[]>('/api/admin/grants'))
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
      const hay = `${r.name} ${r.email} ${r.program || ''} ${r.message || ''}`.toLowerCase()
      return hay.includes(q.trim().toLowerCase())
    })
  }, [rows, status, q])

  function open(r: Grant) {
    setActive(r)
    setNote(r.adminNote || '')
    setStatusEdit(r.status)
  }

  async function saveDetail() {
    if (!active) return
    await api(`/api/admin/grants/${active.id}`, {
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
          <h1>Grant arizalari</h1>
          <p>Arizani oching, baholang va ichki izoh bilan qaror qabul qiling.</p>
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
          <EmptyState title="Grant arizasi yo‘q" />
        ) : (
          <table>
            <thead>
              <tr>
                <th>Arizachi</th>
                <th>Dastur</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id}>
                  <td>
                    <div className="cell-title">{r.name}</div>
                    <div className="cell-meta">{r.email}</div>
                    <div className="cell-meta">{formatDate(r.createdAt)}</div>
                  </td>
                  <td>{r.program || '—'}</td>
                  <td>
                    <StatusBadge value={r.status} map={grantStatus} />
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
        title={active?.name || ''}
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
                <span className="detail-label">Dastur</span>
                <div>{active.program || '—'}</div>
              </div>
              <div>
                <span className="detail-label">Sana</span>
                <div>{formatDate(active.createdAt)}</div>
              </div>
            </div>
            <div>
              <span className="detail-label">Motivatsiya</span>
              <div className="detail-box">{active.message || '—'}</div>
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
              Admin izohi / qaror asosi
              <textarea value={note} onChange={(e) => setNote(e.target.value)} />
            </label>
            <button
              type="button"
              className="btn danger"
              onClick={async () => {
                if (!confirm('O‘chirish?')) return
                await api(`/api/admin/grants/${active.id}`, { method: 'DELETE' })
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
