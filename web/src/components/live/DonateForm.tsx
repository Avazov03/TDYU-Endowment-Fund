'use client'

import { useState } from 'react'
import { useLocale } from 'next-intl'
import { postForm } from '@/lib/api'
import type { Locale } from '@/i18n/routing'

const AMOUNTS = [
  { n: 100000, l: '100 000 so‘m' },
  { n: 500000, l: '500 000 so‘m' },
  { n: 1000000, l: '1 000 000 so‘m' },
  { n: 5000000, l: '5 000 000 so‘m' },
]

function money(n: number) {
  return AMOUNTS.find((a) => a.n === n)?.l || `${n} so‘m`
}

export function DonateForm() {
  const locale = useLocale() as Locale
  const [amount, setAmount] = useState(500000)
  const [busy, setBusy] = useState(false)
  const [ok, setOk] = useState('')
  const [err, setErr] = useState('')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)
    const firstName = String(fd.get('firstName') || '').trim()
    const email = String(fd.get('email') || '').trim()
    if (!firstName || !email) {
      setErr(locale === 'en' ? 'Required fields' : locale === 'ru' ? 'Обязательные поля' : 'Majburiy maydonlar')
      return
    }
    setBusy(true)
    setErr('')
    setOk('')
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
      setOk(locale === 'en' ? 'Donation request sent' : locale === 'ru' ? 'Заявка отправлена' : 'Xayriya arizasi yuborildi')
    } catch {
      setErr(locale === 'en' ? 'Failed' : locale === 'ru' ? 'Ошибка' : 'Xato')
    } finally {
      setBusy(false)
    }
  }

  const L =
    locale === 'ru'
      ? { first: 'Имя', last: 'Фамилия', email: 'Email', phone: 'Телефон', note: 'Комментарий', send: 'Пожертвовать', pick: 'Сумма' }
      : locale === 'en'
        ? { first: 'First name', last: 'Last name', email: 'Email', phone: 'Phone', note: 'Note', send: 'Donate', pick: 'Amount' }
        : { first: 'Ism', last: 'Familiya', email: 'Elektron pochta', phone: 'Telefon', note: 'Izoh', send: 'Xayriya qilish', pick: 'Miqdor' }

  return (
    <form className="grid gap-3 sm:grid-cols-2" onSubmit={onSubmit} id="calc">
      <p className="sm:col-span-2 font-semibold text-ink m-0">{L.pick}</p>
      <div className="sm:col-span-2 flex flex-wrap gap-2">
        {AMOUNTS.map((a) => (
          <button
            key={a.n}
            type="button"
            className={`rounded-[30px] px-4 py-2 text-sm font-semibold border ${amount === a.n ? 'bg-sky text-white border-sky' : 'border-[#e5e5e5] text-tdyu'}`}
            onClick={() => setAmount(a.n)}
          >
            {a.l}
          </button>
        ))}
      </div>
      <input name="firstName" required placeholder={L.first} className="rounded-xl border border-[#e5e5e5] px-3 py-2.5" />
      <input name="lastName" placeholder={L.last} className="rounded-xl border border-[#e5e5e5] px-3 py-2.5" />
      <input name="email" required type="email" placeholder={L.email} className="rounded-xl border border-[#e5e5e5] px-3 py-2.5" />
      <input name="phone" placeholder={L.phone} className="rounded-xl border border-[#e5e5e5] px-3 py-2.5" />
      <textarea name="note" placeholder={L.note} rows={3} className="sm:col-span-2 rounded-xl border border-[#e5e5e5] px-3 py-2.5" />
      <button disabled={busy} className="sm:col-span-2 rounded-[30px] bg-sky text-white font-semibold py-3 disabled:opacity-60" type="submit">
        {busy ? '…' : `${L.send} · ${money(amount)}`}
      </button>
      {ok ? <p className="sm:col-span-2 text-tdyu">{ok}</p> : null}
      {err ? <p className="sm:col-span-2 text-red-700">{err}</p> : null}
    </form>
  )
}
