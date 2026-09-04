'use client'

import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { api } from '../api'
import { Drawer } from '../Drawer'
import { EmptyState, LoadingBlock, formatDate } from '../ui'

type Staff = {
  id: string
  email: string
  name: string
  role: string
  active: boolean
  createdAt: string
}

const empty = { name: '', email: '', password: '', role: 'admin' }

export default function StaffPage() {
  const [me, setMe] = useState<Staff | null>(null)
  const [rows, setRows] = useState<Staff[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [msg, setMsg] = useState('')
  const [form, setForm] = useState(empty)
  const [open, setOpen] = useState<Staff | null>(null)
  const [edit, setEdit] = useState({ name: '', role: 'admin', active: true, password: '' })
  const [busy, setBusy] = useState(false)

  async function load() {
    try {
      const self = await api<Staff>('/api/auth/me')
      setMe(self)
      if (self.role !== 'super') return
      setRows(await api<Staff[]>('/api/admin/staff'))
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Yuklash xato')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  async function onCreate(e: FormEvent) {
    e.preventDefault()
    setBusy(true)
    setError('')
    setMsg('')
    try {
      await api('/api/admin/staff', { method: 'POST', body: JSON.stringify(form) })
      setMsg('Admin qo‘shildi')
      setForm(empty)
      load()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Xato')
    } finally {
      setBusy(false)
    }
  }

  if (loading) return <LoadingBlock label="Adminlar yuklanmoqda…" />
  if (me && me.role !== 'super') {
    return (
      <>
        <div className="admin-top">
          <div>
            <h1>Adminlar</h1>
            <p>Bu bo‘lim faqat super admin uchun.</p>
          </div>
        </div>
        <EmptyState title="Ruxsat yo‘q" hint="Admin tayinlash uchun super admin kerak." />
      </>
    )
  }

  return (
    <>
      <div className="admin-top">
        <div>
          <h1>Adminlar</h1>
          <p>Operatorlarni qo‘shing, rolini o‘zgartiring yoki vaqtincha o‘chiring. Super admin to‘liq huquqqa ega.</p>
        </div>
      </div>
      {error ? <div className="error">{error}</div> : null}
      {msg ? <div className="success">{msg}</div> : null}

      <div className="panel" style={{ marginBottom: 16 }}>
        <div className="panel-head">
          <h2>Yangi admin</h2>
          <span className="meta">Parol kamida 8 belgi</span>
        </div>
        <form className="form-grid" onSubmit={onCreate}>
          <div className="row">
            <label>
              Ism
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            </label>
            <label>
              Email
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            </label>
          </div>
          <div className="row">
            <label>
              Parol
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                minLength={8}
                autoComplete="new-password"
              />
            </label>
            <label>
              Rol
              <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
                <option value="admin">Admin — sayt va do‘kon</option>
                <option value="super">Super admin — hammasi + adminlar</option>
              </select>
            </label>
          </div>
          <button className="btn" type="submit" disabled={busy}>
            {busy ? 'Saqlanmoqda…' : 'Admin qo‘shish'}
          </button>
        </form>
      </div>

      <div className="panel">
        <div className="panel-head">
          <h2>Mavjud hisoblar</h2>
          <span className="meta">{rows.length} ta</span>
        </div>
        {!rows.length ? (
          <EmptyState title="Admin yo‘q" />
        ) : (
          <table>
            <thead>
              <tr>
                <th>Odam</th>
                <th>Rol</th>
                <th>Holat</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id}>
                  <td>
                    <div className="cell-title">{r.name}</div>
                    <div className="cell-meta">
                      {r.email}
                      {me?.id === r.id ? ' · siz' : ''}
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${r.role === 'super' ? 'tone-info' : 'tone-neutral'}`}>
                      {r.role === 'super' ? 'Super admin' : 'Admin'}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${r.active ? 'tone-ok' : 'tone-danger'}`}>{r.active ? 'Faol' : 'O‘chirilgan'}</span>
                    <div className="cell-meta">{formatDate(r.createdAt)}</div>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn ghost sm"
                      onClick={() => {
                        setOpen(r)
                        setEdit({ name: r.name, role: r.role, active: r.active, password: '' })
                        setError('')
                      }}
                    >
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
        open={Boolean(open)}
        title={open ? open.email : 'Admin'}
        onClose={() => setOpen(null)}
        footer={
          open ? (
            <>
              {open.id !== me?.id ? (
                <button
                  type="button"
                  className="btn danger"
                  onClick={async () => {
                    if (!confirm('Bu adminni o‘chirish?')) return
                    try {
                      await api(`/api/admin/staff/${open.id}`, { method: 'DELETE' })
                      setOpen(null)
                      load()
                    } catch (err) {
                      setError(err instanceof Error ? err.message : 'Xato')
                    }
                  }}
                >
                  O‘chirish
                </button>
              ) : null}
              <button
                type="button"
                className="btn"
                onClick={async () => {
                  try {
                    await api(`/api/admin/staff/${open.id}`, {
                      method: 'PATCH',
                      body: JSON.stringify({
                        name: edit.name,
                        role: edit.role,
                        active: edit.active,
                        password: edit.password || undefined,
                      }),
                    })
                    setOpen(null)
                    setMsg('Yangilandi')
                    load()
                  } catch (err) {
                    setError(err instanceof Error ? err.message : 'Xato')
                  }
                }}
              >
                Saqlash
              </button>
            </>
          ) : null
        }
      >
        {open ? (
          <div className="form-grid" style={{ padding: 0 }}>
            <label>
              Ism
              <input value={edit.name} onChange={(e) => setEdit({ ...edit, name: e.target.value })} />
            </label>
            <label>
              Rol
              <select value={edit.role} onChange={(e) => setEdit({ ...edit, role: e.target.value })}>
                <option value="admin">Admin</option>
                <option value="super">Super admin</option>
              </select>
            </label>
            <label className="check-row">
              <input type="checkbox" checked={edit.active} onChange={(e) => setEdit({ ...edit, active: e.target.checked })} />
              Faol (kirishi mumkin)
            </label>
            <label>
              Yangi parol (ixtiyoriy)
              <input
                type="password"
                value={edit.password}
                onChange={(e) => setEdit({ ...edit, password: e.target.value })}
                minLength={8}
                autoComplete="new-password"
                placeholder="O‘zgartirmasangiz bo‘sh qoldiring"
              />
            </label>
          </div>
        ) : null}
      </Drawer>
    </>
  )
}
