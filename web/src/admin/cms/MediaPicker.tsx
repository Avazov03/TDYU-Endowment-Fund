'use client'

import { useEffect, useMemo, useState } from 'react'
import { api, uploadFile } from '../api'

export type MediaAsset = {
  id: string
  url: string
  fileName: string
  size: number
  createdAt: string
}

export function MediaPicker({
  value,
  onChange,
  label = 'Rasm',
}: {
  value: string
  onChange: (url: string) => void
  label?: string
}) {
  const [open, setOpen] = useState(false)
  const [rows, setRows] = useState<MediaAsset[]>([])
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  async function load() {
    try {
      setRows(await api<MediaAsset[]>('/api/admin/media'))
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Media yuklanmadi')
    }
  }

  useEffect(() => {
    if (open) load()
  }, [open])

  async function onFile(file: File | undefined) {
    if (!file) return
    setBusy(true)
    setError('')
    try {
      const row = await uploadFile<MediaAsset>('/api/admin/media', file)
      onChange(row.url)
      setOpen(false)
      load()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Yuklash xato')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="media-field">
      <span className="media-field-label">{label}</span>
      <div className="media-field-row">
        <button type="button" className="media-preview" onClick={() => setOpen(true)}>
          {value ? (
            <img src={value} alt="" />
          ) : (
            <span>Rasm tanlash</span>
          )}
        </button>
        <div className="media-field-actions">
          <button type="button" className="btn ghost sm" onClick={() => setOpen(true)}>
            Kutubxona
          </button>
          <label className="btn ghost sm" style={{ cursor: 'pointer' }}>
            Yuklash
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              hidden
              onChange={(e) => onFile(e.target.files?.[0])}
            />
          </label>
          {value ? (
            <button type="button" className="btn ghost sm" onClick={() => onChange('')}>
              Olib tashlash
            </button>
          ) : null}
        </div>
      </div>
      {value ? <div className="cell-meta">{value}</div> : null}

      {open ? (
        <div className="media-modal" role="dialog" aria-modal="true">
          <button type="button" className="drawer-backdrop" aria-label="Yopish" onClick={() => setOpen(false)} />
          <div className="media-modal-panel">
            <div className="drawer-head">
              <h2>Media kutubxona</h2>
              <button type="button" className="btn ghost sm" onClick={() => setOpen(false)}>
                ✕
              </button>
            </div>
            <div className="media-modal-body">
              {error ? <div className="error">{error}</div> : null}
              <label className="media-drop">
                <strong>{busy ? 'Yuklanmoqda…' : 'Rasmni shu yerga tashlang yoki tanlang'}</strong>
                <span>JPG, PNG, WEBP — max 8 MB</span>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  hidden
                  disabled={busy}
                  onChange={(e) => onFile(e.target.files?.[0])}
                />
              </label>
              <div className="media-grid">
                {rows.map((r) => (
                  <button
                    type="button"
                    key={r.id}
                    className={`media-tile${r.url === value ? ' is-active' : ''}`}
                    onClick={() => {
                      onChange(r.url)
                      setOpen(false)
                    }}
                  >
                    <img src={r.url} alt="" />
                    <span>{r.fileName}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export function LangTabs({
  lang,
  onChange,
  filled,
}: {
  lang: 'uz' | 'ru' | 'en'
  onChange: (lang: 'uz' | 'ru' | 'en') => void
  filled: Record<'uz' | 'ru' | 'en', boolean>
}) {
  const tabs = useMemo(
    () =>
      [
        { id: 'uz' as const, label: 'O‘zbekcha' },
        { id: 'ru' as const, label: 'Русский' },
        { id: 'en' as const, label: 'English' },
      ] as const,
    [],
  )
  return (
    <div className="lang-tabs" role="tablist">
      {tabs.map((t) => (
        <button
          key={t.id}
          type="button"
          role="tab"
          className={lang === t.id ? 'is-active' : ''}
          aria-selected={lang === t.id}
          onClick={() => onChange(t.id)}
        >
          {t.label}
          <i className={filled[t.id] ? 'dot ok' : 'dot'} />
        </button>
      ))}
    </div>
  )
}
