'use client'

import { useState } from 'react'
import { useLocale } from 'next-intl'
import { postForm } from '@/lib/api'
import { getContent } from '@/content/site'
import type { Locale } from '@/i18n/routing'

export function GrantForm() {
  const locale = useLocale() as Locale
  const c = getContent(locale)
  const [busy, setBusy] = useState(false)
  const [ok, setOk] = useState('')
  const [err, setErr] = useState('')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)
    const name = String(fd.get('name') || '').trim()
    const email = String(fd.get('email') || '').trim()
    if (!name || !email) {
      setErr(locale === 'en' ? 'Required fields' : locale === 'ru' ? 'Обязательные поля' : 'Majburiy maydonlar')
      return
    }
    setBusy(true)
    setErr('')
    setOk('')
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
      setOk(locale === 'en' ? 'Application sent' : locale === 'ru' ? 'Заявка отправлена' : 'Ariza yuborildi')
    } catch {
      setErr(locale === 'en' ? 'Failed' : locale === 'ru' ? 'Ошибка' : 'Xato')
    } finally {
      setBusy(false)
    }
  }

  const L =
    locale === 'ru'
      ? { name: 'Имя', email: 'Email', phone: 'Телефон', program: 'Программа', msg: 'Мотивация', send: 'Подать заявку' }
      : locale === 'en'
        ? { name: 'Name', email: 'Email', phone: 'Phone', program: 'Programme', msg: 'Motivation', send: 'Apply' }
        : { name: 'Ism', email: 'Elektron pochta', phone: 'Telefon', program: 'Dastur', msg: 'Motivatsiya', send: 'Ariza topshirish' }

  return (
    <form id="grant-apply" className="grid gap-3" onSubmit={onSubmit}>
      <input name="name" required placeholder={L.name} className="rounded-xl border border-[#e5e5e5] px-3 py-2.5" />
      <input name="email" required type="email" placeholder={L.email} className="rounded-xl border border-[#e5e5e5] px-3 py-2.5" />
      <input name="phone" placeholder={L.phone} className="rounded-xl border border-[#e5e5e5] px-3 py-2.5" />
      <select name="program" className="rounded-xl border border-[#e5e5e5] px-3 py-2.5 bg-white">
        {c.grants.map((g) => (
          <option key={g.t} value={g.t}>
            {g.t}
          </option>
        ))}
      </select>
      <textarea name="message" placeholder={L.msg} rows={4} className="rounded-xl border border-[#e5e5e5] px-3 py-2.5" />
      <button disabled={busy} className="rounded-[30px] bg-sky text-white font-semibold py-3 disabled:opacity-60" type="submit">
        {busy ? '…' : L.send}
      </button>
      {ok ? <p className="text-tdyu m-0">{ok}</p> : null}
      {err ? <p className="text-red-700 m-0">{err}</p> : null}
    </form>
  )
}
