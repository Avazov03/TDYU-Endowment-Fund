'use client'

import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { api } from '../api'
import { EmptyState, LoadingBlock } from '../ui'

type Announcement = {
  id: string
  title: string
  excerpt?: string | null
  dateLabel?: string | null
  lang: string
  published: boolean
  createdAt: string
}

const empty = { title: '', excerpt: '', dateLabel: '', lang: 'uz', published: true }

export default function AnnouncementsPage() {
  const [rows, setRows] = useState<Announcement[]>([])
  const [form, setForm] = useState(empty)
  const [editing, setEditing] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(true)

  async function load() {
    try {
      setRows(await api<Announcement[]>('/api/admin/announcements'))
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setMsg('')
    try {
      const payload = {
        title: form.title,
        excerpt: form.excerpt,
        dateLabel: form.dateLabel,
        lang: form.lang,
        published: form.published,
      }
      if (editing) {
        await api(`/api/admin/announcements/${editing}`, {
          method: 'PATCH',
          body: JSON.stringify(payload),
        })
        setMsg('Yangilandi')
      } else {
        await api('/api/admin/announcements', {
          method: 'POST',
          body: JSON.stringify(payload),
        })
        setMsg('Yaratildi')
      }
      setForm(empty)
      setEditing(null)
      load()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error')
    }
  }

  return (
    <>
      <div className="admin-top">
        <div>
          <h1>Yangiliklar / E’lonlar</h1>
          <p>Public saytda ko‘rinadigan e’lonlar</p>
        </div>
      </div>
      {error ? <div className="error">{error}</div> : null}
      {msg ? <div className="success">{msg}</div> : null}

      <div className="panel" style={{ marginBottom: 16 }}>
        <div className="panel-head">
          <h2>{editing ? 'E’lonni tahrirlash' : 'Yangi e’lon'}</h2>
          <span className="meta">Public saytdagi “E’lonlar” bloki</span>
        </div>
        <form className="form-grid" onSubmit={onSubmit}>
          <div className="row">
            <label>
              Sarlavha
              <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
            </label>
            <label>
              Til
              <select value={form.lang} onChange={(e) => setForm({ ...form, lang: e.target.value })}>
                <option value="uz">UZ</option>
                <option value="ru">RU</option>
                <option value="en">EN</option>
              </select>
            </label>
          </div>
          <label>
            Qisqa matn
            <textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} required />
          </label>
          <label>
            Sana yorlig‘i
            <input
              value={form.dateLabel}
              onChange={(e) => setForm({ ...form, dateLabel: e.target.value })}
              placeholder="Masalan: Dekabr 1, 2025"
            />
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, flexDirection: 'row' }}>
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) => setForm({ ...form, published: e.target.checked })}
            />
            Nashr qilingan
          </label>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn" type="submit">
              {editing ? 'Saqlash' : 'Qo‘shish'}
            </button>
            {editing ? (
              <button
                type="button"
                className="btn ghost"
                onClick={() => {
                  setEditing(null)
                  setForm(empty)
                }}
              >
                Bekor
              </button>
            ) : null}
          </div>
        </form>
      </div>

      <div className="panel">
        <div className="panel-head">
          <h2>Mavjud e’lonlar</h2>
          <span className="meta">{rows.length} ta</span>
        </div>
        {loading ? (
          <LoadingBlock />
        ) : !rows.length ? (
          <EmptyState title="E’lon yo‘q" hint="Yuqoridagi forma orqali birinchi e’lonni qo‘shing." />
        ) : (
          <table>
            <thead>
              <tr>
                <th>Sarlavha</th>
                <th>Til</th>
                <th>Holat</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id}>
                  <td>
                    <strong>{r.title}</strong>
                    <div style={{ color: '#5a7580', fontSize: 12 }}>
                      {(r.excerpt || '').slice(0, 80)}
                      {r.dateLabel ? ` · ${r.dateLabel}` : ''}
                    </div>
                  </td>
                  <td>{r.lang}</td>
                  <td>
                    <span className={`badge ${r.published ? 'tone-ok' : 'tone-neutral'}`}>
                      {r.published ? 'Nashr' : 'Qoralama'}
                    </span>
                  </td>
                  <td style={{ display: 'flex', gap: 8 }}>
                    <button
                      type="button"
                      className="btn ghost"
                      onClick={() => {
                        setEditing(r.id)
                        setForm({
                          title: r.title,
                          excerpt: r.excerpt || '',
                          dateLabel: r.dateLabel || '',
                          lang: r.lang,
                          published: r.published,
                        })
                      }}
                    >
                      Tahrir
                    </button>
                    <button
                      type="button"
                      className="btn danger"
                      onClick={async () => {
                        if (!confirm('O‘chirish?')) return
                        await api(`/api/admin/announcements/${r.id}`, { method: 'DELETE' })
                        load()
                      }}
                    >
                      O‘chirish
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  )
}
