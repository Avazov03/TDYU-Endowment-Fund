'use client'

import { useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { Link, usePathname } from '@/i18n/navigation'
import { brand } from '@/content/site'
import type { Locale } from '@/i18n/routing'

const NAV = [
  { href: '/', key: 'home' as const },
  { href: '/about', key: 'mission' as const },
  { href: '/projects', key: 'pages' as const },
  { href: '/programs', key: 'programs' as const },
  { href: '/news', key: 'news' as const },
  { href: '/contact', key: 'contact' as const },
]

const TOP = [
  { href: '/reports', key: 'reports' as const },
  { href: '/donate', key: 'support' as const },
  { href: '/privacy', key: 'legalBar' as const },
  { href: '/contact', key: 'contact' as const },
]

const FOOTER_NAV = [
  ...NAV,
  { href: '/governance', key: 'governance' as const },
  { href: '/alumni', key: 'alumni' as const },
  { href: '/grants', key: 'grants' as const },
  { href: '/faq', key: 'faq' as const },
  { href: '/privacy', key: 'privacy' as const },
]

export function Header() {
  const t = useTranslations('nav')
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className={`rstb-header tdyu-site-header${open ? ' is-open' : ''}`}>
      <div className="tdyu-topbar">
        <div className="tdyu-wrap tdyu-topbar-inner">
          <span>TDYU Endowment Fund</span>
          <span className="tdyu-topbar-right">
            {TOP.map((item) => (
              <Link key={item.key} href={item.href}>
                {t(item.key)}
              </Link>
            ))}
            <LangSwitch />
          </span>
        </div>
      </div>
      <div className="tdyu-navbar">
        <div className="tdyu-wrap tdyu-navbar-inner">
          <Link className="tdyu-brand" href="/" onClick={() => setOpen(false)}>
            <img src="/brand/tdyu-logo.svg" alt={brand.name} height={68} />
          </Link>
          <nav className="tdyu-nav" aria-label={t('menu')}>
            {NAV.map((item) => (
              <Link
                key={item.key}
                className="tdyu-nav-link"
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={pathname === item.href ? 'page' : undefined}
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>
          <div className="tdyu-nav-tools">
            <span className="tdyu-search-btn" aria-hidden>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M18.031 16.617 22.314 20.9l-1.414 1.414-4.283-4.283A8 8 0 1 1 18 11a8 8 0 0 1 .031 5.617ZM16.025 15.875A6 6 0 1 0 4 11a6 6 0 0 0 12.025 4.875Z" />
              </svg>
            </span>
            <Link className="tdyu-nav-cta" href="/donate" onClick={() => setOpen(false)}>
              {t('donate')}
            </Link>
            <button
              type="button"
              className="tdyu-nav-toggle"
              aria-label={t('menu')}
              onClick={() => setOpen((v) => !v)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

function LangSwitch() {
  const locale = useLocale()
  const pathname = usePathname()
  const items = [
    { code: 'uz', label: "O'Z" },
    { code: 'ru', label: 'РУ' },
    { code: 'en', label: 'EN' },
  ] as const

  return (
    <div className="tdyu-lang" role="navigation" aria-label="Language">
      {items.map((loc, i) => (
        <span key={loc.code}>
          {i > 0 ? <span className="sep">|</span> : null}
          <Link href={pathname} locale={loc.code} className={locale === loc.code ? 'is-active' : undefined}>
            {loc.label}
          </Link>
        </span>
      ))}
    </div>
  )
}

export function Footer() {
  const t = useTranslations()
  const locale = useLocale() as Locale
  return (
    <footer className="tdyu-site-footer">
      <div className="tdyu-wrap tdyu-footer-grid">
        <div>
          <img src="/brand/tdyu-logo-white.svg" alt={brand.name} height={44} />
          <p>{brand.name}</p>
          <p>{brand.address[locale]}</p>
          <p>
            {locale === 'ru' ? 'Регистратор' : locale === 'en' ? 'Registrar' : 'Ro‘yxatga oluvchi'}: {brand.registrar[locale]}
          </p>
          <p>
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
          </p>
        </div>
        <div>
          <h4>{t('footer.nav')}</h4>
          <div className="tdyu-footer-links">
            {FOOTER_NAV.map((item) => (
              <Link key={item.key} href={item.href}>
                {t(`nav.${item.key}`)}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h4>{t('footer.legal')}</h4>
          <p>{t('footer.legalText')}</p>
          <Link className="tdyu-btn tdyu-btn-cyan" href="/donate#calc">
            {t('footer.donate')}
          </Link>
        </div>
      </div>
      <div className="tdyu-footer-copy">
        © {new Date().getFullYear()} {brand.name}
      </div>
    </footer>
  )
}

export function PageHero({ title, lead }: { title: string; lead: string }) {
  return (
    <section className="tdyu-page-hero">
      <div className="tdyu-wrap">
        <h1>{title}</h1>
        <p>{lead}</p>
      </div>
    </section>
  )
}
