'use client'

import { useState } from 'react'
import { useLocale } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { postForm } from '@/lib/api'
import type { Locale } from '@/i18n/routing'

function ArrowIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path
        d="M9.67029 3.6295L1.78054 11.5192L0.484375 10.2231L8.37321 2.33333H1.42029V0.5H11.5036V10.5833H9.67029V3.6295Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function NewsletterForm() {
  const locale = useLocale() as Locale
  const [busy, setBusy] = useState(false)
  const [ok, setOk] = useState('')
  const [err, setErr] = useState('')

  const copy =
    locale === 'ru'
      ? {
          placeholder: 'Электронная почта',
          agree: 'Я согласен:',
          privacy: 'Политика конфиденциальности.',
          need: 'Нужен email',
          consent: 'Нужно согласие',
          done: 'Подписка оформлена',
          fail: 'Ошибка',
        }
      : locale === 'en'
        ? {
            placeholder: 'Email',
            agree: 'I agree:',
            privacy: 'Privacy policy.',
            need: 'Email required',
            consent: 'Consent required',
            done: 'Subscribed',
            fail: 'Failed',
          }
        : {
            placeholder: 'Elektron pochta',
            agree: 'Men roziman:',
            privacy: 'Maxfiylik siyosati.',
            need: 'Email kerak',
            consent: 'Rozilik kerak',
            done: 'Obuna qilindi',
            fail: 'Xato',
          }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const email = String(data.get('email') || '').trim()
    const consent = data.get('consent') === '1'
    if (!email) {
      setErr(copy.need)
      return
    }
    if (!consent) {
      setErr(copy.consent)
      return
    }
    setBusy(true)
    setErr('')
    setOk('')
    try {
      await postForm('/api/forms/newsletter', { email, lang: locale, page: 'footer' })
      form.reset()
      setOk(copy.done)
    } catch {
      setErr(copy.fail)
    } finally {
      setBusy(false)
    }
  }

  return (
    <form className="footer-nl-form" onSubmit={onSubmit}>
      <div className="footer-nl-field">
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          className="footer-nl-input"
          placeholder={copy.placeholder}
          aria-label={copy.placeholder}
        />
        <button type="submit" className="footer-nl-submit" disabled={busy} aria-label={copy.done}>
          <span className="footer-nl-submit-icons" aria-hidden>
            <ArrowIcon />
            <ArrowIcon />
          </span>
        </button>
      </div>
      <label className="footer-nl-consent">
        <input type="checkbox" name="consent" value="1" required />
        <span>
          {copy.agree}{' '}
          <Link href="/privacy">{copy.privacy}</Link>
        </span>
      </label>
      {ok ? <p className="footer-nl-msg footer-nl-msg--ok">{ok}</p> : null}
      {err ? <p className="footer-nl-msg footer-nl-msg--err">{err}</p> : null}
    </form>
  )
}
