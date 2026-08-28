'use client'

import { useEffect, useMemo, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { brand, getContent, impactText } from '@/content/site'
import { postForm } from '@/lib/api'
import type { Locale } from '@/i18n/routing'

export function SpendBars({ items }: { items: { l: string; p: number }[] }) {
  const [on, setOn] = useState(false)
  useEffect(() => {
    const t = requestAnimationFrame(() => setOn(true))
    return () => cancelAnimationFrame(t)
  }, [])
  return (
    <>
      {items.map((s) => (
        <div className="tdyu-bar-row" key={s.l}>
          <span>{s.l}</span>
          <div className="tdyu-bar-track">
            <div className="tdyu-bar-fill" style={{ width: on ? `${s.p}%` : 0 }} />
          </div>
          <strong>{s.p}%</strong>
        </div>
      ))}
    </>
  )
}

export function GovernanceTabs({
  items,
}: {
  items: { id: string; label: string; intro: string; powers: readonly string[] }[]
}) {
  const [id, setId] = useState(items[0]?.id || '')
  return (
    <>
      <div className="tdyu-tabs" role="tablist">
        {items.map((g) => (
          <button
            key={g.id}
            type="button"
            className={`tdyu-tab${id === g.id ? ' active' : ''}`}
            onClick={() => setId(g.id)}
          >
            {g.label}
          </button>
        ))}
      </div>
      {items.map((g) => (
        <div key={g.id} className={`tdyu-panel${id === g.id ? ' active' : ''}`}>
          <p className="tdyu-lead">{g.intro}</p>
          <div className="tdyu-grid-3">
            {g.powers.map((p) => (
              <div className="tdyu-card-dark" key={p}>
                <p style={{ margin: 0 }}>{p}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  )
}

export function AlumniMap({
  allLabel,
  lawLabel,
  intlLabel,
  academiaLabel,
  govtLabel,
  points,
}: {
  allLabel: string
  lawLabel: string
  intlLabel: string
  academiaLabel: string
  govtLabel: string
  points: { f: string; c: string; t: string; n: string }[]
}) {
  const [f, setF] = useState('all')
  const filters = [
    { id: 'all', label: allLabel },
    { id: 'law', label: lawLabel },
    { id: 'intl', label: intlLabel },
    { id: 'academia', label: academiaLabel },
    { id: 'govt', label: govtLabel },
  ]
  return (
    <div className="tdyu-map-box">
      <div className="tdyu-map-filters">
        {filters.map((x) => (
          <button key={x.id} type="button" className={f === x.id ? 'active' : ''} onClick={() => setF(x.id)}>
            {x.label}
          </button>
        ))}
      </div>
      <div className="tdyu-map-points">
        {points
          .filter((p) => f === 'all' || p.f === f)
          .map((p) => (
            <div className="tdyu-map-point" key={`${p.c}-${p.n}`}>
              <strong>{p.c}</strong>
              {p.t} · {p.n}
            </div>
          ))}
      </div>
    </div>
  )
}

function Toast({
  toast,
  onClear,
}: {
  toast: { title: string; msg: string } | null
  onClear: () => void
}) {
  useEffect(() => {
    if (!toast) return
    const id = window.setTimeout(onClear, 6500)
    return () => window.clearTimeout(id)
  }, [toast, onClear])
  if (!toast) return null
  return (
    <div className="tdyu-toast is-on" role="status">
      <strong>{toast.title}</strong>
      {toast.msg}
    </div>
  )
}

export function ContactForm() {
  const locale = useLocale() as Locale
  const t = useTranslations()
  const [busy, setBusy] = useState(false)
  const [toast, setToast] = useState<{ title: string; msg: string } | null>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)
    const name = String(fd.get('name') || '')
    const email = String(fd.get('email') || '')
    const message = String(fd.get('message') || '')
    if (!name || !email || !message) {
      setToast({ title: t('common.required'), msg: '' })
      return
    }
    setBusy(true)
    try {
      await postForm('/api/forms/contact', {
        name,
        email,
        phone: String(fd.get('phone') || ''),
        subject: String(fd.get('subject') || ''),
        message,
        lang: locale,
        page: 'contact',
      })
      form.reset()
      setToast({ title: t('forms.contactOk'), msg: t('forms.contactHint') })
    } catch {
      setToast({ title: t('common.fail'), msg: '' })
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="tdyu-sec">
      <div className="tdyu-wrap">
        <div className="tdyu-card">
          <form className={`tdyu-form${busy ? ' tdyu-form-busy' : ''}`} onSubmit={onSubmit}>
            <div>
              <label>{t('forms.name')}</label>
              <input required name="name" />
            </div>
            <div>
              <label>{t('forms.email')}</label>
              <input required type="email" name="email" />
            </div>
            <div>
              <label>{t('forms.phone')}</label>
              <input name="phone" />
            </div>
            <div>
              <label>{t('forms.subject')}</label>
              <input name="subject" />
            </div>
            <div className="full">
              <label>{t('forms.message')}</label>
              <textarea required rows={5} name="message" />
            </div>
            <div className="full">
              <button className="tdyu-btn tdyu-btn-primary" type="submit" disabled={busy}>
                {busy ? t('common.sending') : t('forms.sendContact')}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Toast toast={toast} onClear={() => setToast(null)} />
    </section>
  )
}

export function GrantForm() {
  const locale = useLocale() as Locale
  const c = getContent(locale)
  const t = useTranslations()
  const [busy, setBusy] = useState(false)
  const [toast, setToast] = useState<{ title: string; msg: string } | null>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)
    const name = String(fd.get('name') || '')
    const email = String(fd.get('email') || '')
    if (!name || !email) {
      setToast({ title: t('common.required'), msg: '' })
      return
    }
    setBusy(true)
    try {
      await postForm('/api/forms/grant', {
        name,
        email,
        phone: String(fd.get('phone') || ''),
        program: String(fd.get('program') || ''),
        message: String(fd.get('message') || ''),
        lang: locale,
        page: 'grants',
      })
      form.reset()
      setToast({ title: t('forms.grantOk'), msg: t('forms.grantHint') })
    } catch {
      setToast({ title: t('common.fail'), msg: '' })
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="tdyu-card" style={{ marginTop: 24 }}>
      <h3 style={{ marginTop: 0, color: 'var(--tdyu-title)' }}>{c.grantApply}</h3>
      <form className={`tdyu-form${busy ? ' tdyu-form-busy' : ''}`} onSubmit={onSubmit}>
        <div>
          <label>{t('forms.name')}</label>
          <input required name="name" />
        </div>
        <div>
          <label>{t('forms.email')}</label>
          <input required type="email" name="email" />
        </div>
        <div className="full">
          <label>{t('forms.program')}</label>
          <select name="program">
            {c.grants.map((g) => (
              <option key={g.t}>{g.t}</option>
            ))}
          </select>
        </div>
        <div className="full">
          <label>{t('forms.motivation')}</label>
          <textarea rows={4} name="message" />
        </div>
        <div className="full">
          <button className="tdyu-btn tdyu-btn-primary" type="submit" disabled={busy}>
            {busy ? t('common.sending') : t('forms.sendGrant')}
          </button>
        </div>
      </form>
      <Toast toast={toast} onClear={() => setToast(null)} />
    </div>
  )
}

export function DonateCalc() {
  const locale = useLocale() as Locale
  const t = useTranslations()
  const amounts = [100000, 500000, 1000000, 5000000]
  const [amount, setAmount] = useState(500000)
  const [preset, setPreset] = useState(500000)
  const [busy, setBusy] = useState(false)
  const [toast, setToast] = useState<{ title: string; msg: string } | null>(null)
  const info = useMemo(() => impactText(locale, amount || 0), [locale, amount])

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)
    const firstName = String(fd.get('firstName') || '')
    const email = String(fd.get('email') || '')
    if (!firstName || !email) {
      setToast({ title: t('common.required'), msg: '' })
      return
    }
    setBusy(true)
    try {
      await postForm('/api/forms/donation', {
        firstName,
        lastName: String(fd.get('lastName') || ''),
        email,
        phone: String(fd.get('phone') || ''),
        amount: String(amount || ''),
        currency: 'UZS',
        note: String(fd.get('note') || ''),
        lang: locale,
        page: 'donate',
        paymentMethod: 'bank',
      })
      form.reset()
      setAmount(500000)
      setPreset(500000)
      setToast({ title: t('forms.donateOk'), msg: t('forms.donateHint') })
    } catch {
      setToast({ title: t('common.fail'), msg: '' })
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="tdyu-sec" id="calc">
      <div className="tdyu-wrap">
        <span className="tdyu-eyebrow">{t('donate.eyebrow')}</span>
        <h2 className="tdyu-title">{t('donate.title')}</h2>
        <div className="tdyu-grid-2">
          <div className="tdyu-card">
            <div className="tdyu-bank-box">
              <h4>{t('donate.bankTitle')}</h4>
              <p style={{ margin: '0 0 8px' }}>{t('donate.bankBody')}</p>
              <p style={{ margin: 0 }}>
                {t('donate.payee')}: <strong>{brand.name}</strong>
                <br />
                Email: <code>{brand.email}</code>
                <br />
                {brand.address[locale]}
              </p>
            </div>
            <form className={busy ? 'tdyu-form-busy' : ''} onSubmit={onSubmit}>
              <label style={{ fontWeight: 600, display: 'block', marginBottom: 8 }}>{t('donate.pick')}</label>
              <div className="tdyu-amount">
                {amounts.map((a) => (
                  <button
                    key={a}
                    type="button"
                    className={preset === a ? 'active' : ''}
                    onClick={() => {
                      setAmount(a)
                      setPreset(a)
                    }}
                  >
                    {a.toLocaleString(locale === 'en' ? 'en-US' : locale === 'ru' ? 'ru-RU' : 'uz-UZ')}
                  </button>
                ))}
              </div>
              <input
                className="tdyu-input"
                type="number"
                min={10000}
                step={10000}
                placeholder={t('donate.custom')}
                value={amount}
                onChange={(e) => {
                  setAmount(Number(e.target.value || 0))
                  setPreset(0)
                }}
              />
              <div className="tdyu-impact">
                {info.prefix}: <strong>{info.formatted} {info.unit}</strong> — {info.msg}.
              </div>
              <div className="tdyu-form">
                <div>
                  <label>{t('forms.firstName')}</label>
                  <input required name="firstName" />
                </div>
                <div>
                  <label>{t('forms.lastName')}</label>
                  <input name="lastName" />
                </div>
                <div>
                  <label>{t('forms.email')}</label>
                  <input required type="email" name="email" />
                </div>
                <div>
                  <label>{t('forms.phone')}</label>
                  <input name="phone" />
                </div>
                <div className="full">
                  <label>{t('forms.note')}</label>
                  <textarea rows={3} name="note" />
                </div>
                <div className="full">
                  <button className="tdyu-btn tdyu-btn-cyan" type="submit" disabled={busy}>
                    {busy ? t('common.sending') : t('forms.sendDonate')}
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div>
            <h3 style={{ color: 'var(--tdyu-title)', marginTop: 0 }}>{t('donate.impact')}</h3>
            <ul style={{ lineHeight: 1.8, paddingLeft: 18 }}>
              <li>{t('donate.i100')}</li>
              <li>{t('donate.i500')}</li>
              <li>{t('donate.i1m')}</li>
              <li>{t('donate.i5m')}</li>
            </ul>
            <p className="tdyu-demo-inline">{t('donate.demoNote')}</p>
          </div>
        </div>
      </div>
      <Toast toast={toast} onClear={() => setToast(null)} />
    </section>
  )
}

export function AlumniRegister() {
  const locale = useLocale() as Locale
  const c = getContent(locale)
  const t = useTranslations()
  const [busy, setBusy] = useState(false)
  const [toast, setToast] = useState<{ title: string; msg: string } | null>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)
    const name = String(fd.get('name') || '')
    const email = String(fd.get('email') || '')
    if (!name || !email) {
      setToast({ title: t('common.required'), msg: '' })
      return
    }
    setBusy(true)
    try {
      await postForm('/api/forms/contact', {
        name,
        email,
        subject: 'Alumni registration',
        message: `year=${fd.get('year') || ''} city=${fd.get('city') || ''}`,
        lang: locale,
        page: 'alumni',
      })
      form.reset()
      setToast({ title: t('forms.alumniOk'), msg: t('forms.contactHint') })
    } catch {
      setToast({ title: t('common.fail'), msg: '' })
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="tdyu-sec" id="register">
      <div className="tdyu-wrap">
        <span className="tdyu-eyebrow">{c.alumniRegEyebrow}</span>
        <h2 className="tdyu-title">{c.alumniRegTitle}</h2>
        <div className="tdyu-card">
          <form className={`tdyu-form${busy ? ' tdyu-form-busy' : ''}`} onSubmit={onSubmit}>
            <div>
              <label>{t('forms.name')}</label>
              <input required name="name" />
            </div>
            <div>
              <label>{t('forms.email')}</label>
              <input required type="email" name="email" />
            </div>
            <div>
              <label>{t('forms.year')}</label>
              <input type="number" min={1990} max={2030} name="year" />
            </div>
            <div>
              <label>{t('forms.city')}</label>
              <input name="city" />
            </div>
            <div className="full">
              <button className="tdyu-btn tdyu-btn-primary" type="submit" disabled={busy}>
                {busy ? t('common.sending') : t('forms.register')}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Toast toast={toast} onClear={() => setToast(null)} />
    </section>
  )
}
