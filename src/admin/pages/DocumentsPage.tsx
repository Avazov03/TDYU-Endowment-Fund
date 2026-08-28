import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { api, getToken } from '../api'
import { EmptyState, LoadingBlock, formatDate } from '../ui'

type Doc = {
  id: string
  title: string
  description?: string | null
  category: string
  lang: string
  fileName: string
  storedName: string
  size: number
  published: boolean
  createdAt: string
}

export default function DocumentsPage() {
  const [rows, setRows] = useState<Doc[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [msg, setMsg] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('report')
  const [lang, setLang] = useState('uz')
  const [file, setFile] = useState<File | null>(null)
  const [busy, setBusy] = useState(false)

  async function load() {
    try {
      setRows(await api<Doc[]>('/api/admin/documents'))
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
    if (!file) {
      setError('Fayl tanlang')
      return
    }
    setBusy(true)
    setError('')
    setMsg('')
    try {
      const fd = new FormData()
      fd.append('file', file)
      fd.append('title', title || file.name)
      fd.append('description', description)
      fd.append('category', category)
      fd.append('lang', lang)
      const token = getToken()
      const res = await fetch('/api/admin/documents', {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: fd,
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || 'Upload failed')
      setMsg('Hujjat yuklandi')
      setTitle('')
      setDescription('')
      setFile(null)
      load()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error')
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      <div className="admin-top">
        <div>
          <h1>Hujjatlar</h1>
          <p>Hisobot, huquqiy va boshqa fayllarni yuklang — public saytda ko‘rinadi.</p>
        </div>
      </div>
      {error ? <div className="error">{error}</div> : null}
      {msg ? <div className="success">{msg}</div> : null}

      <div className="panel" style={{ marginBottom: 16 }}>
        <div className="panel-head">
          <h2>Yangi hujjat yuklash</h2>
          <span className="meta">PDF, DOC, XLS — max 15MB</span>
        </div>
        <form className="form-grid" onSubmit={onSubmit}>
          <div className="row">
            <label>
              Sarlavha
              <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Masalan: 2025 yillik hisobot" />
            </label>
            <label>
              Kategoriya
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="report">Hisobot</option>
                <option value="legal">Huquqiy</option>
                <option value="media">Media</option>
                <option value="other">Boshqa</option>
              </select>
            </label>
          </div>
          <div className="row">
            <label>
              Til
              <select value={lang} onChange={(e) => setLang(e.target.value)}>
                <option value="uz">UZ</option>
                <option value="ru">RU</option>
                <option value="en">EN</option>
                <option value="all">Barcha tillar</option>
              </select>
            </label>
            <label>
              Fayl
              <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} required />
            </label>
          </div>
          <label>
            Izoh
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
          </label>
          <button className="btn" type="submit" disabled={busy}>
            {busy ? 'Yuklanmoqda…' : 'Yuklash'}
          </button>
        </form>
      </div>

      <div className="panel">
        <div className="panel-head">
          <h2>Yuklangan hujjatlar</h2>
          <span className="meta">{rows.length} ta</span>
        </div>
        {loading ? (
          <LoadingBlock />
        ) : !rows.length ? (
          <EmptyState title="Hujjat yo‘q" hint="Hisobot yoki huquqiy fayl yuklang." />
        ) : (
          <table>
            <thead>
              <tr>
                <th>Hujjat</th>
                <th>Kategoriya</th>
                <th>Til</th>
                <th>Holat</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id}>
                  <td>
                    <div className="cell-title">{r.title}</div>
                    <div className="cell-meta">
                      {r.fileName} · {(r.size / 1024).toFixed(0)} KB · {formatDate(r.createdAt)}
                    </div>
                  </td>
                  <td>
                    <span className="badge tone-neutral">{r.category}</span>
                  </td>
                  <td>{r.lang.toUpperCase()}</td>
                  <td>
                    <span className={`badge ${r.published ? 'tone-ok' : 'tone-neutral'}`}>
                      {r.published ? 'Nashr' : 'Yashirin'}
                    </span>
                  </td>
                  <td>
                    <div className="row-actions">
                      <a className="btn ghost sm" href={`/uploads/${r.storedName}`} target="_blank" rel="noreferrer">
                        Ochish
                      </a>
                      <button
                        type="button"
                        className="btn ghost sm"
                        onClick={async () => {
                          await api(`/api/admin/documents/${r.id}`, {
                            method: 'PATCH',
                            body: JSON.stringify({ published: !r.published }),
                          })
                          load()
                        }}
                      >
                        {r.published ? 'Yashirish' : 'Nashr'}
                      </button>
                      <button
                        type="button"
                        className="btn danger sm"
                        onClick={async () => {
                          if (!confirm('O‘chirish?')) return
                          await api(`/api/admin/documents/${r.id}`, { method: 'DELETE' })
                          load()
                        }}
                      >
                        O‘chirish
                      </button>
                    </div>
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
