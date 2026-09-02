'use client'

import { useState } from 'react'
import { useLocale } from 'next-intl'
import { postForm } from '@/lib/api'
import type { Locale } from '@/i18n/routing'

export function ContactForm({ page = 'contact' }: { page?: string }) {
  const locale = useLocale() as Locale
  const [busy, setBusy] = useState(false)
  const [ok, setOk] = useState('')
  const [err, setErr] = useState('')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)
    const name = String(fd.get('name') || '').trim()
    const email = String(fd.get('email') || '').trim()
    const message = String(fd.get('message') || '').trim()
    if (!name || !email || !message) {
      setErr(locale === 'en' ? 'Required fields' : locale === 'ru' ? 'Обязательные поля' : 'Majburiy maydonlar')
      return
    }
    setBusy(true)
    setErr('')
    setOk('')
    try {
      await postForm('/api/forms/contact', {
        name,
        email,
        phone: String(fd.get('phone') || ''),
        subject: String(fd.get('subject') || ''),
        message,
        lang: locale,
        page,
      })
      form.reset()
      setOk(locale === 'en' ? 'Message sent' : locale === 'ru' ? 'Сообщение отправлено' : 'Murojaat yuborildi')
    } catch {
      setErr(locale === 'en' ? 'Failed' : locale === 'ru' ? 'Ошибка' : 'Xato')
    } finally {
      setBusy(false)
    }
  }

  const L =
    locale === 'ru'
      ? { name: 'Имя', email: 'Email', phone: 'Телефон', subject: 'Тема', msg: 'Сообщение', send: 'Отправить' }
      : locale === 'en'
        ? { name: 'Name', email: 'Email', phone: 'Phone', subject: 'Subject', msg: 'Message', send: 'Send' }
        : { name: 'Ism', email: 'Elektron pochta', phone: 'Telefon', subject: 'Mavzu', msg: 'Xabar', send: 'Yuborish' }

  return (
    <form className="grid gap-3" onSubmit={onSubmit} id="contact-form">
      <input name="name" required placeholder={L.name} className="rounded-xl border border-[#e5e5e5] px-3 py-2.5" />
      <input name="email" required type="email" placeholder={L.email} className="rounded-xl border border-[#e5e5e5] px-3 py-2.5" />
      <input name="phone" placeholder={L.phone} className="rounded-xl border border-[#e5e5e5] px-3 py-2.5" />
      <input name="subject" placeholder={L.subject} className="rounded-xl border border-[#e5e5e5] px-3 py-2.5" />
      <textarea name="message" required placeholder={L.msg} rows={5} className="rounded-xl border border-[#e5e5e5] px-3 py-2.5" />
      <button disabled={busy} className="rounded-[30px] bg-sky text-white font-semibold py-3 disabled:opacity-60" type="submit">
        {busy ? '…' : L.send}
      </button>
      {ok ? <p className="text-tdyu m-0">{ok}</p> : null}
      {err ? <p className="text-red-700 m-0">{err}</p> : null}
    </form>
  )
}
