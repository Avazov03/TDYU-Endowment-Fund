'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useLocale } from 'next-intl'
import { Link, usePathname } from '@/i18n/navigation'

const TOP = [
  { href: '/reports', uz: 'Hisobotlar', ru: 'Отчёты', en: 'Reports' },
  { href: '/support', uz: 'Yordam', ru: 'Помощь', en: 'Help' },
  { href: '/legal', uz: 'Huquqiy asos', ru: 'Правовая основа', en: 'Legal' },
  { href: '/contact', uz: 'Aloqa', ru: 'Контакты', en: 'Contact' },
] as const

type Locale = 'uz' | 'ru' | 'en'

function t(locale: string, uz: string, ru: string, en: string) {
  if (locale === 'ru') return ru
  if (locale === 'en') return en
  return uz
}

export function SiteHeader() {
  const locale = useLocale() as Locale
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white shadow-[0_2px_18px_rgba(12,87,118,0.08)]">
      <div className="bg-tdyu text-white/90 text-[12px]">
        <div className="live-wrap flex flex-wrap items-center justify-between gap-3 py-2">
          <span>TDYU Endowment Fund</span>
          <div className="flex flex-wrap items-center gap-4 justify-end">
            {TOP.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-white">
                {item[locale]}
              </Link>
            ))}
            <nav className="flex items-center gap-1 border-l border-white/25 pl-4 font-[Maitree,Georgia,serif] font-semibold tracking-wide uppercase" aria-label="Language">
              {(['uz', 'ru', 'en'] as const).map((code, i) => (
                <span key={code}>
                  {i > 0 ? <span className="px-1 opacity-70">|</span> : null}
                  <Link
                    href={pathname}
                    locale={code}
                    className={locale === code ? 'text-white' : 'opacity-70 hover:opacity-100'}
                  >
                    {code === 'uz' ? "O'Z" : code === 'ru' ? 'РУ' : 'EN'}
                  </Link>
                </span>
              ))}
            </nav>
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="live-wrap flex items-center justify-between gap-4 py-3">
          <Link href="/" className="shrink-0" onClick={() => setOpen(false)}>
            <Image src="/brand/tdyu-logo.svg" alt="TDYU Endowment Fund" width={260} height={68} className="h-[68px] w-[260px] max-w-none" priority unoptimized />
          </Link>

          <nav className="hidden xl:flex items-center gap-6 text-[15px] font-medium text-tdyu" aria-label="Menyu">
            <Link className={pathname === '/' ? 'text-sky' : 'hover:text-sky'} href="/">
              {t(locale, 'Bosh', 'Главная', 'Home')}
            </Link>
            <Drop
              label={t(locale, 'Missiya', 'Миссия', 'Mission')}
              items={[
                { href: '/about-us', label: t(locale, 'Missiya', 'Миссия', 'Mission') },
                { href: '/about-us', label: t(locale, '6 ustun', '6 столпов', '6 pillars') },
                { href: '/governance', label: t(locale, 'Boshqaruv', 'Управление', 'Governance') },
              ]}
            />
            <Drop
              label={t(locale, 'Sahifalar', 'Страницы', 'Pages')}
              items={[
                { href: '/alumni', label: 'Alumni' },
                { href: '/projects', label: t(locale, 'Loyihalar', 'Проекты', 'Projects') },
                { href: '/grants', label: t(locale, 'Grantlar', 'Гранты', 'Grants') },
                { href: '/news', label: t(locale, 'Tadbirlar', 'События', 'Events') },
              ]}
            />
            <Drop
              label={t(locale, 'Dasturlar', 'Программы', 'Programs')}
              items={[
                { href: '/programs', label: t(locale, 'Dasturlar', 'Программы', 'Programs') },
                { href: '/programs', label: t(locale, '01 · Xalqaro stajirovkalar', '01 · Стажировки', '01 · Internships') },
                { href: '/programs', label: t(locale, '02 · Stipendiya va grantlar', '02 · Стипендии', '02 · Scholarships') },
                { href: '/programs', label: t(locale, '03 · Tanlovlar va musobaqalar', '03 · Конкурсы', '03 · Contests') },
                { href: '/programs', label: t(locale, '04 · Ilmiy va ta’limiy loyihalar', '04 · Наука', '04 · Research') },
              ]}
            />
            <Link className="hover:text-sky" href="/news">
              {t(locale, 'Yangiliklar', 'Новости', 'News')}
            </Link>
            <Link className="hover:text-sky" href="/contact">
              {t(locale, 'Aloqa', 'Контакты', 'Contact')}
            </Link>
          </nav>

          <div className="flex items-center gap-3 shrink-0">
            <button type="button" className="text-tdyu p-2" aria-label="Qidirish" onClick={() => setSearch((v) => !v)}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M18.031 16.617 22.314 20.9l-1.414 1.414-4.283-4.283A8 8 0 1 1 18 11a8 8 0 0 1 .031 5.617ZM16.025 15.875A6 6 0 1 0 4 11a6 6 0 0 0 12.025 4.875Z" />
              </svg>
            </button>
            <Link
              href="/donate"
              className="hidden sm:inline-flex items-center gap-2 rounded-[30px] bg-sky px-5 py-2.5 text-white font-semibold hover:bg-tdyu"
              onClick={() => setOpen(false)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12 21s-6.7-4.35-9.33-8.22C.8 10.2 1.2 6.9 4.05 5.4 6.1 4.3 8.55 5 12 8.1 15.45 5 17.9 4.3 19.95 5.4c2.85 1.5 3.25 4.8 1.38 7.38C18.7 16.65 12 21 12 21z" />
              </svg>
              {t(locale, 'Xayriya', 'Пожертвовать', 'Donate')}
            </Link>
            <button
              type="button"
              className="w-10 h-10 border border-[#e5e5e5] rounded-[10px] grid place-items-center"
              aria-label="Menyu"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="flex flex-col gap-1">
                <span className="block w-[18px] h-0.5 bg-tdyu" />
                <span className="block w-[18px] h-0.5 bg-tdyu" />
                <span className="block w-[18px] h-0.5 bg-tdyu" />
              </span>
            </button>
          </div>
        </div>

        {search ? (
          <div className="live-wrap pb-4">
            <input className="w-full border border-[#e5e5e5] rounded-[10px] px-4 py-3" placeholder={t(locale, 'Qidirish...', 'Поиск...', 'Search...')} />
          </div>
        ) : null}

        {open ? (
          <div className="xl:hidden absolute inset-x-0 top-full bg-white shadow-lg p-5 flex flex-col gap-3 text-tdyu font-medium">
            <Link href="/" onClick={() => setOpen(false)}>{t(locale, 'Bosh', 'Главная', 'Home')}</Link>
            <Link href="/about-us" onClick={() => setOpen(false)}>{t(locale, 'Missiya', 'Миссия', 'Mission')}</Link>
            <Link href="/programs" onClick={() => setOpen(false)}>{t(locale, 'Dasturlar', 'Программы', 'Programs')}</Link>
            <Link href="/news" onClick={() => setOpen(false)}>{t(locale, 'Yangiliklar', 'Новости', 'News')}</Link>
            <Link href="/contact" onClick={() => setOpen(false)}>{t(locale, 'Aloqa', 'Контакты', 'Contact')}</Link>
            <Link href="/donate" className="text-sky" onClick={() => setOpen(false)}>{t(locale, 'Xayriya', 'Пожертвовать', 'Donate')}</Link>
          </div>
        ) : null}
      </div>
    </header>
  )
}

function Drop({ label, items }: { label: string; items: { href: string; label: string }[] }) {
  return (
    <div className="relative group">
      <span className="inline-flex items-center gap-1 cursor-default group-hover:text-sky">
        {label}
        <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 15.5 5.6 9.1l1.4-1.4L12 12.7l5-5 1.4 1.4z" />
        </svg>
      </span>
      <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition duration-200 absolute left-0 top-full pt-3 min-w-[240px] z-50">
        <div className="bg-white rounded-2xl shadow-[0_12px_40px_rgba(12,87,118,0.16)] py-2 border border-black/5">
          {items.map((item) => (
            <Link key={item.label} href={item.href} className="block px-4 py-2 hover:bg-cream hover:text-sky">
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
