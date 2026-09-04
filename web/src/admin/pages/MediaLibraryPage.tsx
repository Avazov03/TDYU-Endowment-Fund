'use client'

import { useEffect, useState } from 'react'
import { api, uploadFile } from '../api'
import { EmptyState, LoadingBlock, formatBytes, formatDate } from '../ui'
import type { MediaAsset } from '../cms/MediaPicker'

export default function MediaLibraryPage() {
  const [rows, setRows] = useState<MediaAsset[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [msg, setMsg] = useState('')
  const [busy, setBusy] = useState(false)

  async function load() {
    try {
      setRows(await api<MediaAsset[]>('/api/admin/media'))
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Yuklash xato')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  async function onFile(file: File | undefined) {
    if (!file) return
    setBusy(true)
    setError('')
    setMsg('')
    try {
      await uploadFile('/api/admin/media', file)
      setMsg('Rasm yuklandi')
      load()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Yuklash xato')
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      <div className="admin-top">
        <div>
          <h1>Media</h1>
          <p>Rasmlar kutubxonasi. Tadbir, yangilik, alumni va do‘kon shu yerdan rasm oladi.</p>
        </div>
        <label className="btn" style={{ cursor: 'pointer' }}>
          {busy ? 'Yuklanmoqda…' : '+ Rasm yuklash'}
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            hidden
            disabled={busy}
            onChange={(e) => onFile(e.target.files?.[0])}
          />
        </label>
      </div>
      {error ? <div className="error">{error}</div> : null}
      {msg ? <div className="success">{msg}</div> : null}

      {!loading ? (
        <div className="cards cards-4" style={{ marginBottom: 16 }}>
          <div className="stat-card mini">
            <div className="label">Fayllar</div>
            <div className="value">{rows.length}</div>
          </div>
          <div className="stat-card mini">
            <div className="label">Hajm</div>
            <div className="value">{formatBytes(rows.reduce((s, r) => s + (r.size || 0), 0))}</div>
          </div>
        </div>
      ) : null}

      <div className="panel">
        {loading ? (
          <LoadingBlock />
        ) : !rows.length ? (
          <EmptyState title="Rasm yo‘q" hint="JPG, PNG yoki WEBP yuklang — keyin yozuvlarga biriktiring." />
        ) : (
          <div className="media-grid media-grid-page">
            {rows.map((r) => (
              <article key={r.id} className="media-card">
                <img src={r.url} alt="" />
                <div>
                  <strong>{r.fileName}</strong>
                  <div className="cell-meta">
                    {(r.size / 1024).toFixed(0)} KB · {formatDate(r.createdAt)}
                  </div>
                  <div className="row-actions">
                    <button
                      type="button"
                      className="btn ghost sm"
                      onClick={() => navigator.clipboard.writeText(r.url)}
                    >
                      URL
                    </button>
                    <button
                      type="button"
                      className="btn danger sm"
                      onClick={async () => {
                        if (!confirm('Rasmni o‘chirish?')) return
                        await api(`/api/admin/media/${r.id}`, { method: 'DELETE' })
                        load()
                      }}
                    >
                      O‘chirish
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
