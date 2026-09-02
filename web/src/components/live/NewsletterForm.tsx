'use client'

import { useState } from 'react'
import { useLocale } from 'next-intl'
import { postForm } from '@/lib/api'
import type { Locale } from '@/i18n/routing'

export function NewsletterForm() {
  const locale = useLocale() as Locale
  const [busy, setBusy] = useState(false)
  const [ok, setOk] = useState('')
  const [err, setErr] = useState('')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const email = String(new FormData(form).get('email') || '').trim()
    if (!email) {
      setErr(locale === 'en' ? 'Email required' : locale === 'ru' ? 'Нужен email' : 'Email kerak')
      return
    }
    setBusy(true)
    setErr('')
    setOk('')
    try {
      await postForm('/api/forms/newsletter', { email, lang: locale, page: 'footer' })
      form.reset()
      setOk(locale === 'en' ? 'Subscribed' : locale === 'ru' ? 'Подписка оформлена' : 'Obuna qilindi')
    } catch {
      setErr(locale === 'en' ? 'Failed' : locale === 'ru' ? 'Ошибка' : 'Xato')
    } finally {
      setBusy(false)
    }
  }

  return (
    <form className="grid gap-3" onSubmit={onSubmit}>
      <input name="email" type="email" required className="rounded-xl px-3 py-2 text-ink" placeholder="Email" />
      <button disabled={busy} type="submit" className="rounded-[30px] bg-sky text-white font-semibold py-2 disabled:opacity-60">
        {busy ? '…' : locale === 'en' ? 'Send' : locale === 'ru' ? 'Отправить' : 'Yuborish'}
      </button>
      {ok ? <p className="text-sky text-sm m-0">{ok}</p> : null}
      {err ? <p className="text-red-200 text-sm m-0">{err}</p> : null}
    </form>
  )
}
