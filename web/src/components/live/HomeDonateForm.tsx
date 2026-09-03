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
    const firstName = String(fd.get('firstName') || '').trim()
    const lastName = String(fd.get('lastName') || '').trim()
    const email = String(fd.get('email') || '').trim()
    const messageBody = String(fd.get('message') || '').trim()
    const address = String(fd.get('address') || '').trim()
    const country = String(fd.get('country') || '').trim()
    const city = String(fd.get('city') || '').trim()
    const zip = String(fd.get('zip') || '').trim()
    const date = String(fd.get('date') || '').trim()

    if (!firstName || !email || !messageBody) {
      setErr(locale === 'en' ? 'Required fields' : locale === 'ru' ? 'Обязательные поля' : 'Majburiy maydonlar')
      return
    }

    const message = [
      messageBody,
      address && `Manzil: ${address}`,
      country && `Mamlakat: ${country}`,
      city && `Shahar: ${city}`,
      zip && `Indeks: ${zip}`,
      date && `Sana: ${date}`,
    ]
      .filter(Boolean)
      .join('\n')

    setBusy(true)
    setErr('')
    setOk('')
    try {
      await postForm('/api/forms/donation', {
        firstName,
        lastName,
        email,
        phone: String(fd.get('phone') || ''),
        amount: '',
        currency: 'UZS',
        note: message,
        lang: locale,
        page: 'home-donate',
        paymentMethod: 'bank',
        address,
        country,
        city,
        zip,
        date,
      })
      e.currentTarget.reset()
      setOk(locale === 'en' ? 'Donation request sent' : locale === 'ru' ? 'Заявка на пожертвование отправлена' : 'Xayriya arizasi yuborildi')
    } catch {
      setErr(locale === 'en' ? 'Failed' : locale === 'ru' ? 'Ошибка' : 'Xato')
    } finally {
      setBusy(false)
    }
  }

  const L =
    locale === 'ru'
      ? {
          first: 'Имя',
          last: 'Фамилия',
          email: 'Email',
          phone: 'Телефон',
          address: 'Адрес',
          country: 'Страна',
          city: 'Город',
          zip: 'Почтовый индекс',
          date: 'дд/мм/гг',
          message: 'Сообщение',
          send: 'Пожертвовать',
        }
      : locale === 'en'
        ? {
            first: 'First name',
            last: 'Last name',
            email: 'Email',
            phone: 'Phone',
            address: 'Address',
            country: 'Country',
            city: 'City',
            zip: 'ZIP code',
            date: 'dd/mm/yy',
            message: 'Message',
            send: 'Donate',
          }
        : {
            first: 'Ism',
            last: 'Familiya',
            email: 'Elektron pochta',
            phone: 'Telefon',
            address: 'Manzil',
            country: 'Mamlakat',
            city: 'Shahar',
            zip: 'Pochta indeksi',
            date: 'dd/mm/yy',
            message: 'Xabar',
            send: 'Xayriya',
          }

  return (
    <form className="donate-form-grid" onSubmit={onSubmit} noValidate>
      <input name="firstName" required placeholder={L.first} className="donate-form-field" autoComplete="given-name" />
      <input name="lastName" placeholder={L.last} className="donate-form-field" autoComplete="family-name" />
      <input name="email" required type="email" placeholder={L.email} className="donate-form-field" autoComplete="email" />
      <input name="phone" placeholder={L.phone} className="donate-form-field" autoComplete="tel" />
      <input name="address" placeholder={L.address} className="donate-form-field" autoComplete="street-address" />
      <input name="country" placeholder={L.country} className="donate-form-field" autoComplete="country-name" />
      <input name="city" placeholder={L.city} className="donate-form-field" autoComplete="address-level2" />
      <input name="zip" placeholder={L.zip} className="donate-form-field" autoComplete="postal-code" />
      <input name="date" placeholder={L.date} className="donate-form-field donate-form-span-2" />
      <textarea
        name="message"
        required
        placeholder={L.message}
        rows={5}
        className="donate-form-field donate-form-textarea donate-form-span-2"
      />
      <button disabled={busy} className="donate-form-submit donate-form-span-2" type="submit">
        {busy ? '…' : L.send}
      </button>
      {ok ? <p className="donate-form-msg donate-form-span-2 donate-form-msg-ok">{ok}</p> : null}
      {err ? <p className="donate-form-msg donate-form-span-2 donate-form-msg-err">{err}</p> : null}
    </form>
  )
}
