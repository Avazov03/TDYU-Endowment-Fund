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
    const first = String(fd.get('name') || '').trim()
    const last = String(fd.get('lastName') || '').trim()
    const name = [first, last].filter(Boolean).join(' ')
    const email = String(fd.get('email') || '').trim()
    const message = String(fd.get('message') || '').trim()
    const consent = fd.get('consent') === '1'
    if (!first || !email || !message) {
      setErr(locale === 'en' ? 'Required fields' : locale === 'ru' ? 'Обязательные поля' : 'Majburiy maydonlar')
      return
    }
    if (!consent) {
      setErr(
        locale === 'en'
          ? 'Please accept the privacy policy'
          : locale === 'ru'
            ? 'Примите политику конфиденциальности'
            : 'Maxfiylik siyosatiga rozilik bering',
      )
      return
    }
    setBusy(true)
    setErr('')
    setOk('')
    try {
      await postForm('/api/forms/contact', {
        name,
        email,
        phone: '',
        subject: '',
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
      ? {
          first: 'Имя*',
          last: 'Фамилия*',
          email: 'Электронная почта*',
          msg: 'Ваше сообщение...*',
          consent: 'Согласен с политикой конфиденциальности',
          send: 'Отправить',
        }
      : locale === 'en'
        ? {
            first: 'First name*',
            last: 'Last name*',
            email: 'Email*',
            msg: 'Your message...*',
            consent: 'I agree to the privacy policy',
            send: 'Send',
          }
        : {
            first: 'Ism*',
            last: 'Familiya*',
            email: 'Elektron pochta*',
            msg: 'Xabaringiz...*',
            consent: 'Maxfiylik siyosatiga roziman',
            send: 'Yuborish',
          }

  return (
    <form className="contact-form" onSubmit={onSubmit} id="contact-form" noValidate={false}>
      <div className="contact-form-row">
        <input name="name" type="text" required placeholder={L.first} autoComplete="given-name" />
        <input name="lastName" type="text" required placeholder={L.last} autoComplete="family-name" />
      </div>
      <input name="email" required type="email" placeholder={L.email} autoComplete="email" />
      <textarea name="message" required placeholder={L.msg} rows={6} />
      <label className="contact-form-consent">
        <input type="checkbox" name="consent" value="1" required />
        <span>{L.consent}</span>
      </label>
      <button disabled={busy} className="contact-form-submit" type="submit">
        {busy ? '…' : L.send}
      </button>
      {ok ? <p className="contact-form-ok">{ok}</p> : null}
      {err ? <p className="contact-form-err">{err}</p> : null}
    </form>
  )
}
