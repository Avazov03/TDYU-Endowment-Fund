'use client'

import { useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { api } from '../api'
import { Drawer } from '../Drawer'
import { EmptyState, LoadingBlock } from '../ui'
import { LangTabs, MediaPicker } from './MediaPicker'

export type CmsLang = 'uz' | 'ru' | 'en'

export type CmsField =
  | { type: 'text'; key: string; label: string; lang?: boolean; required?: boolean; placeholder?: string }
  | { type: 'textarea'; key: string; label: string; lang?: boolean; hint?: string }
  | { type: 'media'; key: string; label: string; lang?: boolean }
  | { type: 'select'; key: string; label: string; options: { value: string; label: string }[]; lang?: boolean }
  | { type: 'number'; key: string; label: string; lang?: boolean }
  | { type: 'toggle'; key: string; label: string; lang?: boolean }

export type CmsRow = Record<string, unknown> & {
  id?: string
  slug?: string
  published?: boolean
  coverUrl?: string | null
}

export type CmsConfig = {
  title: string
  hint: string
  path: string
  query?: string
  createLabel: string
  emptyTitle: string
  emptyHint: string
  importType?: string
  importItems?: unknown[]
  previewHref?: (row: CmsRow) => string
  titleOf: (row: CmsRow) => string
  metaOf?: (row: CmsRow) => string
  thumbOf?: (row: CmsRow) => string
  defaults: CmsRow
  fields: CmsField[]
  langFillKeys?: string[]
  extraFilters?: { key: string; options: { value: string; label: string }[] }
}

function langKey(base: string, lang: CmsLang) {
  return `${base}${lang[0]!.toUpperCase()}${lang.slice(1)}`
}

function filledLang(form: CmsRow, bases: string[], lang: CmsLang) {
  return bases.some((b) => String(form[langKey(b, lang)] || '').trim())
}

export function CmsResourcePage({ config }: { config: CmsConfig }) {
  const [rows, setRows] = useState<CmsRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [msg, setMsg] = useState('')
  const [q, setQ] = useState('')
  const [status, setStatus] = useState<'all' | 'published' | 'draft'>('all')
  const [extra, setExtra] = useState('')
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState<CmsRow>(config.defaults)
  const [lang, setLang] = useState<CmsLang>('uz')
  const [busy, setBusy] = useState(false)
  const [importing, setImporting] = useState(false)

  const listPath = config.query ? `${config.path}?${config.query}` : config.path

  async function load() {
    try {
      setRows(await api<CmsRow[]>(listPath))
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Yuklash xato')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listPath])

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return rows.filter((r) => {
      if (status === 'published' && !r.published) return false
      if (status === 'draft' && r.published) return false
      if (config.extraFilters && extra && String(r[config.extraFilters.key] || '') !== extra) return false
      if (!needle) return true
      const blob = `${config.titleOf(r)} ${r.slug || ''} ${config.metaOf?.(r) || ''}`.toLowerCase()
      return blob.includes(needle)
    })
  }, [rows, q, status, extra, config])

  function openNew() {
    setForm({ ...config.defaults, published: true, sortOrder: rows.length })
    setLang('uz')
    setOpen(true)
    setError('')
    setMsg('')
  }

  function openEdit(row: CmsRow) {
    setForm({ ...config.defaults, ...row, coverUrl: row.coverUrl || '' })
    setLang('uz')
    setOpen(true)
    setError('')
    setMsg('')
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setBusy(true)
    setError('')
    setMsg('')
    try {
      const payload = { ...form, kind: config.query?.includes('board') ? 'board' : config.query?.includes('alumni') ? 'alumni' : form.kind }
      if (form.id) {
        await api(`${config.path}/${form.id}`, { method: 'PATCH', body: JSON.stringify(payload) })
        setMsg('Saqlandi')
      } else {
        await api(config.path, { method: 'POST', body: JSON.stringify(payload) })
        setMsg('Yaratildi')
      }
      setOpen(false)
      load()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Saqlash xato')
    } finally {
      setBusy(false)
    }
  }

  async function onImport() {
    if (!config.importType || !config.importItems?.length) return
            if (!confirm(`Mavjud ${config.importItems.length} ta yozuv admin bazasiga ko‘chirilsinmi? Matn o‘zgarmaydi — slug bo‘yicha yangilanadi.`)) return
    setImporting(true)
    setError('')
    try {
      const res = await api<{ count: number }>('/api/admin/cms/import', {
        method: 'POST',
        body: JSON.stringify({ type: config.importType, items: config.importItems }),
      })
      setMsg(`${res.count} ta yozuv admin’ga ko‘chirildi`)
      load()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Import xato')
    } finally {
      setImporting(false)
    }
  }

  const fillBases = config.langFillKeys || ['title', 'name']

  return (
    <>
      <div className="admin-top">
        <div>
          <h1>{config.title}</h1>
          <p>{config.hint}</p>
        </div>
        <div className="toolbar">
          {config.importType && config.importItems?.length ? (
            <button type="button" className="btn ghost" onClick={onImport} disabled={importing}>
              {importing ? 'Ko‘chirilmoqda…' : `Mavjud ${config.importItems.length} tasini adminga ko‘chir`}
            </button>
          ) : null}
          <button type="button" className="btn" onClick={openNew}>
            {config.createLabel}
          </button>
        </div>
      </div>

      {error && !open ? <div className="error">{error}</div> : null}
      {msg && !open ? <div className="success">{msg}</div> : null}

      <div className="panel">
        <div className="filters">
          <input className="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Qidirish…" />
          <select value={status} onChange={(e) => setStatus(e.target.value as typeof status)}>
            <option value="all">Barcha holat</option>
            <option value="published">Nashr</option>
            <option value="draft">Qoralama</option>
          </select>
          {config.extraFilters ? (
            <select value={extra} onChange={(e) => setExtra(e.target.value)}>
              <option value="">Barcha turlar</option>
              {config.extraFilters.options.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          ) : null}
          <span className="meta" style={{ marginLeft: 'auto', alignSelf: 'center' }}>
            {filtered.length} / {rows.length}
          </span>
        </div>

        {loading ? (
          <LoadingBlock />
        ) : !filtered.length ? (
          <EmptyState title={config.emptyTitle} hint={config.emptyHint} />
        ) : (
          <table>
            <thead>
              <tr>
                <th>Yozuv</th>
                <th>Slug</th>
                <th>Holat</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={String(r.id)} onClick={() => openEdit(r)} style={{ cursor: 'pointer' }}>
                  <td>
                    <div className="cms-row-main">
                      {config.thumbOf?.(r) ? (
                        <img className="cms-thumb" src={config.thumbOf(r)} alt="" />
                      ) : null}
                      <div>
                        <div className="cell-title">{config.titleOf(r)}</div>
                        {config.metaOf ? <div className="cell-meta">{config.metaOf(r)}</div> : null}
                      </div>
                    </div>
                  </td>
                  <td>
                    <code className="slug-code">{String(r.slug || '—')}</code>
                  </td>
                  <td>
                    <span className={`badge ${r.published ? 'tone-ok' : 'tone-neutral'}`}>
                      {r.published ? 'Nashr' : 'Qoralama'}
                    </span>
                  </td>
                  <td>
                    <div className="row-actions" onClick={(e) => e.stopPropagation()}>
                      {config.previewHref && r.published ? (
                        <a className="btn ghost sm" href={config.previewHref(r)} target="_blank" rel="noreferrer">
                          Sayt
                        </a>
                      ) : null}
                      <button type="button" className="btn ghost sm" onClick={() => openEdit(r)}>
                        Tahrir
                      </button>
                      <button
                        type="button"
                        className="btn danger sm"
                        onClick={async () => {
                          if (!confirm('O‘chirish? Bu yozuv saytdan ham yashirinadi (statik nusxasi qaytib chiqmaydi).')) return
                          await api(`${config.path}/${r.id}`, { method: 'DELETE' })
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

      <Drawer
        open={open}
        size="wide"
        title={form.id ? 'Tahrirlash' : config.createLabel}
        onClose={() => setOpen(false)}
        footer={
          <>
            {form.id ? (
              <button
                type="button"
                className="btn danger"
                onClick={async () => {
                  if (!confirm('O‘chirish?')) return
                  await api(`${config.path}/${form.id}`, { method: 'DELETE' })
                  setOpen(false)
                  load()
                }}
              >
                O‘chirish
              </button>
            ) : null}
            <button type="button" className="btn ghost" onClick={() => setOpen(false)}>
              Bekor
            </button>
            <button type="submit" form="cms-editor-form" className="btn" disabled={busy}>
              {busy ? 'Saqlanmoqda…' : form.id ? 'Saqlash' : 'Qo‘shish'}
            </button>
          </>
        }
      >
        <form id="cms-editor-form" className="form-grid" onSubmit={onSubmit}>
          {error ? <div className="error">{error}</div> : null}
          <LangTabs
            lang={lang}
            onChange={setLang}
            filled={{
              uz: filledLang(form, fillBases, 'uz'),
              ru: filledLang(form, fillBases, 'ru'),
              en: filledLang(form, fillBases, 'en'),
            }}
          />
          <p className="lang-hint">UZ majburiy. RU/EN bo‘sh qolsa, saytda o‘zbekcha ko‘rinadi.</p>
          {config.fields.map((field) => {
            if (field.type === 'media') {
              return (
                <MediaPicker
                  key={field.key}
                  label={field.label}
                  value={String(form[field.key] || '')}
                  onChange={(url) => setForm({ ...form, [field.key]: url })}
                />
              )
            }
            if (field.type === 'toggle') {
              return (
                <label key={field.key} className="check-row">
                  <input
                    type="checkbox"
                    checked={Boolean(form[field.key])}
                    onChange={(e) => setForm({ ...form, [field.key]: e.target.checked })}
                  />
                  {field.label}
                </label>
              )
            }
            const key = field.lang ? langKey(field.key, lang) : field.key
            if (field.type === 'select') {
              return (
                <label key={field.key}>
                  {field.label}
                  <select value={String(form[key] || '')} onChange={(e) => setForm({ ...form, [key]: e.target.value })}>
                    {field.options.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </label>
              )
            }
            if (field.type === 'number') {
              return (
                <label key={field.key}>
                  {field.label}
                  <input
                    type="number"
                    value={String(form[key] ?? '')}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value === '' ? 0 : Number(e.target.value) })}
                  />
                </label>
              )
            }
            if (field.type === 'textarea') {
              return (
                <label key={`${field.key}-${lang}`}>
                  {field.label}
                  {field.hint ? <span className="field-hint">{field.hint}</span> : null}
                  <textarea
                    value={String(form[key] || '')}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    placeholder={field.lang && lang !== 'uz' ? 'Bo‘sh qoldirish mumkin' : undefined}
                  />
                </label>
              )
            }
            return (
              <label key={`${field.key}-${lang}`}>
                {field.label}
                <input
                  required={Boolean(field.required) && lang === 'uz'}
                  value={String(form[key] || '')}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  placeholder={field.placeholder}
                />
              </label>
            )
          })}
        </form>
      </Drawer>
    </>
  )
}
