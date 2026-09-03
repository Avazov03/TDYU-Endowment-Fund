import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { loc } from './loc'
import { brand } from '@/content/site'

export function GrantsHelpCard({ locale }: { locale: Locale }) {
  return (
    <aside className="grants-help">
      <Image
        src="/media/grants/apply-side-img1-min.jpg"
        alt=""
        fill
        className="object-cover"
        sizes="360px"
        unoptimized
      />
      <div className="grants-help-overlay" aria-hidden />
      <div className="grants-help-inner">
        <Image src="/brand/tdyu-logo-white.svg" alt="" width={72} height={72} className="grants-help-logo" unoptimized />
        <p className="grants-help-title">{loc(locale, 'Yordam kerakmi?', 'Нужна помощь?', 'Need help?')}</p>
        <a className="grants-help-phone" href={brand.phoneHref}>
          {brand.phone}
        </a>
        <a className="grants-help-mail" href={`mailto:${brand.email}`}>
          {brand.email}
        </a>
        <Link href="/contact" className="grants-help-btn">
          {loc(locale, 'Bog‘lanish', 'Связаться', 'Contact')}
          <span aria-hidden>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
              <circle cx="5" cy="8" r="1.4" />
              <circle cx="11" cy="8" r="1.4" />
            </svg>
          </span>
        </Link>
      </div>
    </aside>
  )
}
