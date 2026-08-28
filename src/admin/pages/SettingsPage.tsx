import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { api } from '../api'
import { LoadingBlock } from '../ui'

type Settings = Record<string, string>

const fields: { key: string; label: string; multiline?: boolean }[] = [
  { key: 'orgName', label: 'Tashkilot nomi' },
  { key: 'siteTagline', label: 'Sayt tagline' },
  { key: 'email', label: 'Aloqa email' },
  { key: 'phone', label: 'Telefon' },
  { key: 'workingHours', label: 'Ish vaqti' },
  { key: 'address', label: 'Manzil', multiline: true },
  { key: 'bankPayee', label: 'Bank oluvchi' },
  { key: 'bankDetails', label: 'Bank rekvizitlari / ko‘rsatma', multiline: true },
  { key: 'privacyText', label: 'Maxfiylik matni', multiline: true },
  { key: 'socialTelegram', label: 'Telegram URL' },
  { key: 'socialInstagram', label: 'Instagram URL' },
  { key: 'socialFacebook', label: 'Facebook URL' },
  { key: 'socialYoutube', label: 'YouTube URL' },
]

export default function SettingsPage() {
  const [form, setForm] = useState<Settings>({})
  const [error, setError] = useState('')
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api<Settings>('/api/admin/settings')
      .then(setForm)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setMsg('')
    try {
      await api('/api/admin/settings', { method: 'PUT', body: JSON.stringify(form) })
      setMsg('Sozlamalar saqlandi')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error')
    }
  }

  if (loading) return <LoadingBlock label="Sozlamalar yuklanmoqda…" />

  return (
    <>
      <div className="admin-top">
        <div>
          <h1>Sozlamalar</h1>
          <p>Aloqa, bank rekvizitlari va ijtimoiy tarmoqlar — public saytda ishlatiladi.</p>
        </div>
      </div>
      {error ? <div className="error">{error}</div> : null}
      {msg ? <div className="success">{msg}</div> : null}
      <div className="panel">
        <div className="panel-head">
          <h2>Fond rekvizitlari</h2>
          <span className="meta">Saqlangandan keyin saytda yangilanadi</span>
        </div>
        <form className="form-grid" onSubmit={onSubmit}>
          {fields.map((f) => (
            <label key={f.key}>
              {f.label}
              {f.multiline ? (
                <textarea
                  value={form[f.key] || ''}
                  onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                />
              ) : (
                <input
                  value={form[f.key] || ''}
                  onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                />
              )}
            </label>
          ))}
          <div>
            <button className="btn" type="submit">
              O‘zgarishlarni saqlash
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
