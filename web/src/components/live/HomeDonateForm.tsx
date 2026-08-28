'use client'

import { useState } from 'react'
import { useLocale } from 'next-intl'
import { postForm } from '@/lib/api'
import type { Locale } from '@/i18n/routing'

export function HomeDonateForm() {
  const locale = useLocale() as Locale
  const [busy, setBusy] = useState(false)
  const [ok, setOk] = useState('')
  const [err, setErr] = useState('')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const name = `${fd.get('firstName') || ''} ${fd.get('lastName') || ''}`.trim()
    const email = String(fd.get('email') || '')
    const message = String(fd.get('message') || 'Xayriya')
    if (!name || !email) {
      setErr(locale === 'en' ? 'Required fields' : locale === 'ru' ? 'Обязательные поля' : 'Majburiy maydonlar')
      return
    }
    setBusy(true)
    setErr('')
    try {
      await postForm('/api/forms/contact', {
        name,
        email,
        phone: String(fd.get('phone') || ''),
        message,
        lang: locale,
        page: 'home',
      })
      e.currentTarget.reset()
      setOk(locale === 'en' ? 'Sent' : locale === 'ru' ? 'Отправлено' : 'Yuborildi')
    } catch {
      setErr(locale === 'en' ? 'Failed' : locale === 'ru' ? 'Ошибка' : 'Xato')
    } finally {
      setBusy(false)
    }
  }

  const L =
    locale === 'ru'
      ? ['Имя', 'Фамилия', 'Email', 'Телефон', 'Адрес', 'Страна', 'Город', 'Индекс', 'Дата', 'Сообщение', 'Пожертвовать']
      : locale === 'en'
        ? ['First name', 'Last name', 'Email', 'Phone', 'Address', 'Country', 'City', 'ZIP', 'Date', 'Message', 'Donate']
        : ['Ism', 'Familiya', 'Elektron pochta', 'Telefon', 'Manzil', 'Mamlakat', 'Shahar', 'Pochta indeksi', 'Sana', 'Xabar', 'Xayriya']

  return (
    <form className="grid gap-3 sm:grid-cols-2" onSubmit={onSubmit}>
      <input name="firstName" required placeholder={L[0]} className="rounded-xl border border-[#e5e5e5] px-3 py-2.5" />
      <input name="lastName" placeholder={L[1]} className="rounded-xl border border-[#e5e5e5] px-3 py-2.5" />
      <input name="email" required type="email" placeholder={L[2]} className="rounded-xl border border-[#e5e5e5] px-3 py-2.5" />
      <input name="phone" placeholder={L[3]} className="rounded-xl border border-[#e5e5e5] px-3 py-2.5" />
      <input name="address" placeholder={L[4]} className="rounded-xl border border-[#e5e5e5] px-3 py-2.5" />
      <input name="country" placeholder={L[5]} className="rounded-xl border border-[#e5e5e5] px-3 py-2.5" />
      <input name="city" placeholder={L[6]} className="rounded-xl border border-[#e5e5e5] px-3 py-2.5" />
      <input name="zip" placeholder={L[7]} className="rounded-xl border border-[#e5e5e5] px-3 py-2.5" />
      <input name="date" placeholder={L[8]} className="rounded-xl border border-[#e5e5e5] px-3 py-2.5" />
      <textarea name="message" placeholder={L[9]} rows={3} className="sm:col-span-2 rounded-xl border border-[#e5e5e5] px-3 py-2.5" />
      <button disabled={busy} className="sm:col-span-2 rounded-[30px] bg-sky text-white font-semibold py-3 disabled:opacity-60" type="submit">
        {busy ? '…' : L[10]}
      </button>
      {ok ? <p className="sm:col-span-2 text-tdyu">{ok}</p> : null}
      {err ? <p className="sm:col-span-2 text-red-700">{err}</p> : null}
    </form>
  )
}
