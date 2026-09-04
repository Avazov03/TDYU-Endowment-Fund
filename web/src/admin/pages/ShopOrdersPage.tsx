'use client'

import { useEffect, useMemo, useState } from 'react'
import { api } from '../api'
import { Drawer } from '../Drawer'
import { EmptyState, LoadingBlock, StatusBadge, formatDate, shopOrderStatus } from '../ui'

type Order = {
  id: string
  name: string
  email: string
  phone: string
  pickup: string
  message: string
  total: number
  status: string
  adminNote?: string | null
  createdAt: string
  items: { slug: string; qty: number; size?: string }[]
}

const STATUSES = ['new', 'packing', 'ready', 'done', 'cancelled'] as const

export default function ShopOrdersPage() {
  const [rows, setRows] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [status, setStatus] = useState('')
  const [q, setQ] = useState('')
  const [open, setOpen] = useState<Order | null>(null)
  const [note, setNote] = useState('')

  async function load() {
    try {
      const params = new URLSearchParams()
      if (status) params.set('status', status)
      if (q.trim()) params.set('q', q.trim())
      setRows(await api<Order[]>(`/api/admin/shop-orders?${params.toString()}`))
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Yuklash xato')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status])

  const counts = useMemo(() => {
    const all = rows
    return {
      new: all.filter((r) => r.status === 'new').length,
      packing: all.filter((r) => r.status === 'packing').length,
      ready: all.filter((r) => r.status === 'ready').length,
    }
  }, [rows])

  async function setOrderStatus(id: string, next: string) {
    await api(`/api/admin/shop-orders/${id}`, { method: 'PATCH', body: JSON.stringify({ status: next }) })
    load()
    if (open?.id === id) setOpen((cur) => (cur ? { ...cur, status: next } : cur))
  }

  return (
    <>
      <div className="admin-top">
        <div>
          <h1>Buyurtmalar</h1>
          <p>Do‘kon buyurtmalari: holatni yangilang, mijozga olib ketishga tayyor deb belgilang.</p>
        </div>
      </div>
      {error ? <div className="error">{error}</div> : null}

      <div className="order-pills">
        <button type="button" className={!status ? 'is-active' : ''} onClick={() => setStatus('')}>
          Barchasi
        </button>
        <button type="button" className={status === 'new' ? 'is-active' : ''} onClick={() => setStatus('new')}>
          Yangi {counts.new ? `(${counts.new})` : ''}
        </button>
        <button type="button" className={status === 'packing' ? 'is-active' : ''} onClick={() => setStatus('packing')}>
          Tayyorlanmoqda
        </button>
        <button type="button" className={status === 'ready' ? 'is-active' : ''} onClick={() => setStatus('ready')}>
          Tayyor
        </button>
        <button type="button" className={status === 'done' ? 'is-active' : ''} onClick={() => setStatus('done')}>
          Berildi
        </button>
        <button type="button" className={status === 'cancelled' ? 'is-active' : ''} onClick={() => setStatus('cancelled')}>
          Bekor
        </button>
      </div>

      <div className="panel">
        <div className="filters">
          <input
            className="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') load()
            }}
            placeholder="Ism, telefon, email…"
          />
          <button type="button" className="btn ghost sm" onClick={load}>
            Qidirish
          </button>
        </div>
        {loading ? (
          <LoadingBlock />
        ) : !rows.length ? (
          <EmptyState title="Buyurtma yo‘q" hint="Saytdan kelgan do‘kon buyurtmalari shu yerda." />
        ) : (
          <table>
            <thead>
              <tr>
                <th>Mijoz</th>
                <th>Summa</th>
                <th>Holat</th>
                <th>Sana</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id}>
                  <td>
                    <div className="cell-title">{r.name}</div>
                    <div className="cell-meta">
                      {r.phone} · {r.email}
                    </div>
                  </td>
                  <td>
                    <strong>{Number(r.total || 0).toLocaleString('uz-UZ')} so‘m</strong>
                    <div className="cell-meta">{r.items?.length || 0} ta mahsulot</div>
                  </td>
                  <td>
                    <StatusBadge value={r.status} map={shopOrderStatus} />
                  </td>
                  <td className="cell-meta">{formatDate(r.createdAt)}</td>
                  <td>
                    <button
                      type="button"
                      className="btn ghost sm"
                      onClick={() => {
                        setOpen(r)
                        setNote(r.adminNote || '')
                      }}
                    >
                      Ochish
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
        title={open ? open.name : 'Buyurtma'}
        onClose={() => setOpen(null)}
        footer={
          open ? (
            <button
              type="button"
              className="btn"
              onClick={async () => {
                await api(`/api/admin/shop-orders/${open.id}`, {
                  method: 'PATCH',
                  body: JSON.stringify({ adminNote: note }),
                })
                setOpen(null)
                load()
              }}
            >
              Izohni saqlash
            </button>
          ) : null
        }
      >
        {open ? (
          <div className="detail-grid" style={{ gridTemplateColumns: '1fr' }}>
            <div className="detail-box">
              <span className="detail-label">Aloqa</span>
              {open.phone}
              <br />
              {open.email}
              <br />
              Olib ketish: {open.pickup}
            </div>
            <div className="detail-box">
              <span className="detail-label">Mahsulotlar</span>
              {(open.items || []).map((it, i) => (
                <div key={`${it.slug}-${i}`}>
                  {it.slug} × {it.qty}
                  {it.size ? ` (${it.size})` : ''}
                </div>
              ))}
              <strong>Jami: {Number(open.total || 0).toLocaleString('uz-UZ')} so‘m</strong>
            </div>
            {open.message ? (
              <div className="detail-box">
                <span className="detail-label">Izoh</span>
                {open.message}
              </div>
            ) : null}
            <label>
              Holat
              <select value={open.status} onChange={(e) => setOrderStatus(open.id, e.target.value)}>
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {shopOrderStatus[s].label}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Admin izohi
              <textarea value={note} onChange={(e) => setNote(e.target.value)} />
            </label>
          </div>
        ) : null}
      </Drawer>
    </>
  )
}
