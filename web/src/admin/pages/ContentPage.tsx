'use client'

import { useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { ALUMNI_PEOPLE } from '@/content/alumni'
import { BOARD_DETAIL } from '@/content/board'
import { EVENTS } from '@/content/events'
import { NEWS_POSTS } from '@/content/news'
import { SHOP_PRODUCTS } from '@/content/shop'
import { api } from '../api'
import { EmptyState, LoadingBlock } from '../ui'

type Block = {
  id: string
  key: string
  lang: string
  title?: string | null
  body: string
  page?: string | null
}

const presets = [
  { key: 'home.welcome', page: 'home', label: 'Bosh — xush kelibsiz' },
  { key: 'about.mission', page: 'about', label: 'Missiya matni' },
  { key: 'donate.howto', page: 'donate', label: 'Xayriya qo‘llanma' },
  { key: 'grants.intro', page: 'grants', label: 'Grantlar kirish' },
  { key: 'contact.intro', page: 'contact', label: 'Aloqa kirish' },
  { key: 'stats.1', page: 'home', label: 'Stats 1 (raqam=sarlavha)' },
  { key: 'stats.2', page: 'home', label: 'Stats 2' },
  { key: 'stats.3', page: 'home', label: 'Stats 3' },
  { key: 'stats.4', page: 'home', label: 'Stats 4' },
  { key: 'stats.5', page: 'home', label: 'Stats 5' },
]

const CMS_BOOTSTRAP = [
  { type: 'news', items: NEWS_POSTS, label: 'Maqolalar' },
  { type: 'events', items: EVENTS, label: 'Tadbirlar' },
  {
    type: 'alumni',
    items: ALUMNI_PEOPLE.map((p) => ({
      ...p,
      countryCode:
        p.slug === 'jerome-bell'
          ? 'uz'
          : p.mapLocation?.label === 'UK'
            ? 'gb'
            : p.mapLocation?.label === 'USA'
              ? 'us'
              : p.mapLocation?.label === 'Germany'
                ? 'de'
                : p.mapLocation?.label === 'Japan'
                  ? 'jp'
                  : p.mapLocation?.label === 'Australia'
                    ? 'au'
                    : 'uz',
    })),
    label: 'Alumni',
  },
  { type: 'board', items: BOARD_DETAIL, label: 'Kengash' },
  { type: 'shop', items: SHOP_PRODUCTS, label: 'Do‘kon' },
] as const

export default function ContentPage() {
  const [rows, setRows] = useState<Block[]>([])
  const [lang, setLang] = useState('uz')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [msg, setMsg] = useState('')
  const [form, setForm] = useState({ key: 'home.welcome', title: '', body: '', page: 'home', lang: 'uz' })
  const [editing, setEditing] = useState<string | null>(null)
  const [bootstrapping, setBootstrapping] = useState(false)

  async function load() {
    try {
      setRows(await api<Block[]>('/api/admin/content'))
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const filtered = useMemo(() => rows.filter((r) => r.lang === lang), [rows, lang])

  async function onBootstrapCms() {
    const total = CMS_BOOTSTRAP.reduce((n, b) => n + b.items.length, 0)
    if (
      !confirm(
        `Mavjud sayt kontenti (${total} ta yozuv: yangilik, tadbir, alumni, kengash, do‘kon) admin bazasiga ko‘chirilsinmi? Matn o‘zgarmaydi — faqat boshqaruv uchun DB ga yoziladi.`,
      )
    ) {
      return
    }
    setBootstrapping(true)
    setError('')
    setMsg('')
    try {
      const parts: string[] = []
      for (const batch of CMS_BOOTSTRAP) {
        const res = await api<{ count: number }>('/api/admin/cms/import', {
          method: 'POST',
          body: JSON.stringify({ type: batch.type, items: batch.items }),
        })
        parts.push(`${batch.label}: ${res.count}`)
      }
      setMsg(
        `CMS ko‘chirildi — ${parts.join(' · ')}. Endi /admin/news, /events, /alumni, /board, /shop/products da tahrirlashingiz mumkin.`,
      )
    } catch (err) {
      setError(err instanceof Error ? err.message : 'CMS ko‘chirish xato')
    } finally {
      setBootstrapping(false)
    }
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setMsg('')
    try {
      if (editing) {
        await api(`/api/admin/content/${editing}`, {
          method: 'PATCH',
          body: JSON.stringify(form),
        })
        setMsg('Kontent yangilandi')
      } else {
        await api('/api/admin/content', {
          method: 'POST',
          body: JSON.stringify(form),
        })
        setMsg('Kontent saqlandi — public saytda ko‘rinadi')
      }
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
          <h1>Sayt kontenti</h1>
          <p>Asosiy matn va KPI (stats.1–5) — 3 tilda. CMS kataloglar (yangilik/tadbir/…) alohida bo‘limlarda.</p>
        </div>
        <div className="toolbar">
          <button type="button" className="btn ghost" onClick={onBootstrapCms} disabled={bootstrapping}>
            {bootstrapping ? 'Ko‘chirilmoqda…' : 'Mavjud CMS kontentni adminga ko‘chir'}
          </button>
          {(['uz', 'ru', 'en'] as const).map((l) => (
            <button key={l} type="button" className={`btn ${lang === l ? '' : 'ghost'} sm`} onClick={() => setLang(l)}>
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
      {error ? <div className="error">{error}</div> : null}
      {msg ? <div className="success">{msg}</div> : null}

      <div className="dash-grid">
        <div className="panel">
          <div className="panel-head">
            <h2>{editing ? 'Tahrirlash' : 'Kontent yozish / yangilash'}</h2>
          </div>
          <form className="form-grid" onSubmit={onSubmit}>
            <label>
              Blok
              <select
                value={form.key}
                onChange={(e) => {
                  const p = presets.find((x) => x.key === e.target.value)
                  setForm({ ...form, key: e.target.value, page: p?.page || form.page })
                }}
              >
                {presets.map((p) => (
                  <option key={p.key} value={p.key}>
                    {p.label} ({p.key})
                  </option>
                ))}
              </select>
            </label>
            <div className="row">
              <label>
                Til
                <select value={form.lang} onChange={(e) => setForm({ ...form, lang: e.target.value })}>
                  <option value="uz">UZ</option>
                  <option value="ru">RU</option>
                  <option value="en">EN</option>
                </select>
              </label>
              <label>
                Sahifa
                <input value={form.page} onChange={(e) => setForm({ ...form, page: e.target.value })} />
              </label>
            </div>
            <label>
              Sarlavha
              <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </label>
            <label>
              Matn
              <textarea value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} required />
            </label>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn" type="submit">
                {editing ? 'Saqlash' : 'Upsert qilish'}
              </button>
              {editing ? (
                <button
                  type="button"
                  className="btn ghost"
                  onClick={() => {
                    setEditing(null)
                    setForm({ key: 'home.welcome', title: '', body: '', page: 'home', lang })
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
            <h2>{lang.toUpperCase()} kontentlar</h2>
            <span className="meta">{filtered.length} ta</span>
          </div>
          {loading ? (
            <LoadingBlock />
          ) : !filtered.length ? (
            <EmptyState title="Kontent yo‘q" hint="Chapdagi forma orqali qo‘shing." />
          ) : (
            <ul className="quick-list">
              {filtered.map((r) => (
                <li key={r.id}>
                  <div>
                    <strong>{r.title || r.key}</strong>
                    <div className="sub">{r.key}</div>
                    <div className="sub">
                      {r.body.slice(0, 120)}
                      {r.body.length > 120 ? '…' : ''}
                    </div>
                  </div>
                  <div className="row-actions">
                    <button
                      type="button"
                      className="btn ghost sm"
                      onClick={() => {
                        setEditing(r.id)
                        setForm({
                          key: r.key,
                          title: r.title || '',
                          body: r.body,
                          page: r.page || '',
                          lang: r.lang,
                        })
                      }}
                    >
                      Tahrir
                    </button>
                    <button
                      type="button"
                      className="btn ghost sm"
                      onClick={async () => {
                        if (!confirm('O‘chirilsinmi?')) return
                        try {
                          await api(`/api/admin/content/${r.id}`, { method: 'DELETE' })
                          load()
                        } catch (err) {
                          setError(err instanceof Error ? err.message : 'Error')
                        }
                      }}
                    >
                      O‘chirish
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  )
}
