'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useLocale } from 'next-intl'
import { Link, usePathname, useRouter } from '@/i18n/navigation'
import { SiteOffcanvas } from './SiteOffcanvas'
import { ShopHeaderCta } from './shop/ShopHeaderCta'

const TOP = [
  { href: '/reports', uz: 'Hisobotlar', ru: 'Отчёты', en: 'Reports' },
  { href: '/support', uz: 'Yordam', ru: 'Помощь', en: 'Help' },
  { href: '/legal', uz: 'Huquqiy Asos', ru: 'Правовая Основа', en: 'Legal' },
  { href: '/contact', uz: 'Aloqa', ru: 'Контакты', en: 'Contact' },
] as const

type Locale = 'uz' | 'ru' | 'en'

function t(locale: string, uz: string, ru: string, en: string) {
  if (locale === 'ru') return ru
  if (locale === 'en') return en
  return uz
}

function navClass(active: boolean) {
  return [
    'inline-flex items-center h-[106px] text-[16px] leading-[22.4px] font-normal',
    active ? 'is-active text-sky' : 'text-[#030303] hover:text-sky',
  ].join(' ')
}

function startsWithPath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function SiteHeader() {
  const locale = useLocale() as Locale
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState(false)
  const [query, setQuery] = useState('')
  const [compact, setCompact] = useState(false)
  const router = useRouter()

  useEffect(() => {
    let raf = 0
    function onScroll() {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const next = window.scrollY > 24
        setCompact((cur) => (cur === next ? cur : next))
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  function submitSearch(e: React.FormEvent) {
    e.preventDefault()
    const q = query.trim()
    setSearch(false)
    const shop = pathname === '/shop' || pathname.startsWith('/shop/')
    router.push(q ? `${shop ? '/shop' : '/news'}?q=${encodeURIComponent(q)}` : shop ? '/shop' : '/news')
  }

  return (
    <header className={`site-chrome${compact ? ' is-compact' : ''}`}>
      <div className="site-topbar h-[45px] bg-tdyu text-white text-[14px] font-medium leading-none">
        <div className="live-wrap flex items-center justify-between h-full">
          <span className="text-[16px] font-normal leading-none">TDYU Endowment Fund</span>
          <div className="live-top-links flex flex-wrap items-center justify-end">
            {TOP.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-white mr-4 last:mr-0 leading-none">
                {item[locale]}
              </Link>
            ))}
            <nav
              className="tdyu-lang ml-7 pl-4 border-l border-white/28 inline-flex items-center gap-[2px] font-[Maitree,Bitter,Georgia,serif] text-[12px] font-semibold leading-none tracking-[0.04em] uppercase"
              aria-label="Language"
            >
              {(['uz', 'ru', 'en'] as const).map((code, i) => (
                <span key={code} className="inline-flex items-center">
                  {i > 0 ? <span className="sep px-px opacity-40 select-none">|</span> : null}
                  <Link
                    href={pathname}
                    locale={code}
                    className={
                      locale === code
                        ? 'is-active opacity-100 bg-white/[0.18] px-1.5 py-1 rounded-[2px]'
                        : 'opacity-[0.78] px-1.5 py-1 rounded-[2px] hover:opacity-100 hover:bg-white/[0.18]'
                    }
                  >
                    {code === 'uz' ? "O'Z" : code === 'ru' ? 'РУ' : 'EN'}
                  </Link>
                </span>
              ))}
            </nav>
          </div>
        </div>
      </div>

      <div className="relative overflow-visible">
        <div className={`live-wrap site-navrow flex items-center justify-between overflow-visible ${locale === 'ru' ? 'site-navrow--ru min-h-[106px]' : ''}`}>
          <Link href="/" className="site-logo shrink-0" onClick={() => setOpen(false)}>
            <Image src="/brand/tdyu-logo.svg" alt="TDYU Endowment Fund" width={260} height={68} className="block h-[68px] w-[260px] max-w-none" priority unoptimized />
          </Link>

          <nav
            className={`live-nav hidden xl:flex ${locale === 'ru' ? 'flex-wrap items-start max-w-[610px]' : 'items-center'}`}
            style={locale === 'ru' ? { marginLeft: 91 } : undefined}
            aria-label={t(locale, 'Menyu', 'Меню', 'Menu')}
          >
            <Link className={navClass(pathname === '/')} href="/">
              {t(locale, 'Bosh', 'Главная', 'Home')}
            </Link>
            <Drop
              active={
                startsWithPath(pathname, '/about-us') ||
                startsWithPath(pathname, '/governance') ||
                startsWithPath(pathname, '/board') ||
                startsWithPath(pathname, '/mission-value')
              }
              label={t(locale, 'Missiya', 'Миссия', 'Mission')}
              items={[
                { href: '/about-us', label: t(locale, 'Missiya', 'Миссия', 'Mission') },
                { href: '/mission-value', label: t(locale, '6 ustun', '6 столпов', '6 pillars') },
                { href: '/governance', label: t(locale, 'Boshqaruv', 'Управление', 'Governance') },
                { href: '/board', label: t(locale, 'Vasiylik kengashi', 'Попечительский совет', 'Board of Trustees') },
              ]}
            />
            <Drop
              active={
                startsWithPath(pathname, '/alumni') ||
                startsWithPath(pathname, '/projects') ||
                startsWithPath(pathname, '/grants') ||
                startsWithPath(pathname, '/events') ||
                startsWithPath(pathname, '/faq')
              }
              label={t(locale, 'Sahifalar', 'Страницы', 'Pages')}
              items={[
                { href: '/alumni', label: 'Alumni' },
                { href: '/projects', label: t(locale, 'Loyihalar', 'Проекты', 'Projects'), nested: true },
                { href: '/grants', label: t(locale, 'Grantlar', 'Гранты', 'Grants') },
                { href: '/events', label: t(locale, 'Tadbirlar', 'Мероприятия', 'Events'), nested: true },
                { href: '/faq', label: 'FAQ', nested: true },
              ]}
            />
            <Mega
              active={startsWithPath(pathname, '/programs')}
              label={t(locale, 'Dasturlar', 'Программы', 'Programs')}
              locale={locale}
            />
            <Link className={navClass(startsWithPath(pathname, '/news'))} href="/news">
              {t(locale, 'Yangiliklar', 'Новости', 'News')}
            </Link>
            <Link className={navClass(startsWithPath(pathname, '/contact'))} href="/contact">
              {t(locale, 'Aloqa', 'Контакты', 'Contact')}
            </Link>
          </nav>

          <div className="flex items-center shrink-0">
            <button type="button" className="text-tdyu p-1.5 border-0 bg-transparent appearance-none" aria-label={t(locale, 'Qidirish', 'Поиск', 'Search')} onClick={() => setSearch((v) => !v)}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M18.031 16.617 22.314 20.9l-1.414 1.414-4.283-4.283A8 8 0 1 1 18 11a8 8 0 0 1 .031 5.617ZM16.025 15.875A6 6 0 1 0 4 11a6 6 0 0 0 12.025 4.875Z" />
              </svg>
            </button>
            <span className="mx-3 h-5 w-px bg-[#030303]/25" aria-hidden />
            <button type="button" className="text-tdyu p-1.5 border-0 bg-transparent appearance-none" aria-label={t(locale, 'Menyu', 'Меню', 'Menu')} aria-expanded={open} onClick={() => setOpen((v) => !v)}>
              <span className="flex flex-col gap-[5px]">
                <span className="block w-[20px] h-[2px] bg-tdyu" />
                <span className="block w-[20px] h-[2px] bg-tdyu" />
                <span className="block w-[20px] h-[2px] bg-tdyu" />
              </span>
            </button>
            <ShopHeaderCta />
            <Link
              href="/donate"
              className="site-cta-donate hidden sm:inline-flex items-center justify-center gap-2 rounded-[30px] bg-sky !text-white text-[15px] font-medium leading-none pl-[22px] pr-[18px] ml-4 h-[50px] hover:bg-tdyu"
              onClick={() => setOpen(false)}
            >
              {t(locale, 'Xayriya', 'Пожертвование', 'Donate')}
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full border border-white/80" aria-hidden>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13.172 12 8.222 7.05l1.414-1.414L16 12l-6.364 6.364-1.414-1.414z" />
                </svg>
              </span>
            </Link>
          </div>
        </div>

        {search ? (
          <div className="live-wrap pb-4">
            <form onSubmit={submitSearch} role="search">
              <input
                className="w-full border border-[#e5e5e5] rounded-[10px] px-4 py-3"
                placeholder={t(locale, 'Qidirish...', 'Поиск...', 'Search...')}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label={t(locale, 'Qidirish', 'Поиск', 'Search')}
              />
            </form>
          </div>
        ) : null}

        <SiteOffcanvas open={open} locale={locale} onClose={() => setOpen(false)} />
      </div>
    </header>
  )
}

function Drop({
  label,
  items,
  active = false,
}: {
  label: string
  items: { href: string; label: string; nested?: boolean }[]
  active?: boolean
}) {
  return (
    <div className={['nav-drop relative group h-[106px] flex items-center after:absolute after:left-0 after:right-0 after:top-full after:h-4', active ? 'is-section-active' : ''].filter(Boolean).join(' ')}>
      <span className={['nav-drop-trigger', active ? 'is-active' : ''].filter(Boolean).join(' ')}>
        {label}
        <span className="nav-drop-chevron" aria-hidden>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z" />
          </svg>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M11.9999 10.8284L7.0502 15.7782L5.63599 14.364L11.9999 8L18.3639 14.364L16.9497 15.7782L11.9999 10.8284Z" />
          </svg>
        </span>
      </span>
      <div className="nav-drop-panel">
        <ul className="nav-drop-list">
          {items.map((item, i) => (
            <li key={`${item.href}-${item.label}-${i}`}>
              <Link href={item.href} className="nav-drop-link">
                <span>{item.label}</span>
                {item.nested ? (
                  <svg className="nav-drop-nested-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z" />
                  </svg>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function Mega({ label, locale, active = false }: { label: string; locale: Locale; active?: boolean }) {
  const col = (title: string, items: { href: string; label: string }[]) => (
    <div>
      <p className="flex items-center gap-2 text-[16px] font-semibold text-[#030303] pb-3 mb-1 border-b border-[#e6e6e6]">
        <Image src="/brand/tdyu-mark.svg" alt="" width={22} height={22} className="h-[22px] w-[22px]" unoptimized />
        {title}
      </p>
      <ul className="m-0 p-0 list-none">
        {items.map((item) => (
          <li key={item.label} className="border-b border-[#eeeeee] last:border-b-0">
            <Link href={item.href} className="block py-[11px] text-[15px] leading-[22px] text-[#4c4c4c] hover:text-sky">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )

  return (
    <div className={['nav-mega relative group h-[106px] flex items-center after:absolute after:left-0 after:right-0 after:top-full after:h-3', active ? 'is-section-active' : ''].filter(Boolean).join(' ')}>
      <span className={['nav-mega-trigger inline-flex items-center gap-1 cursor-default text-[16px] leading-[22.4px] font-normal group-hover:text-sky', active ? 'text-sky' : 'text-[#030303]'].join(' ')}>
        {label}
        <svg className="group-hover:rotate-180 transition-transform" width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 15.5 5.6 9.1l1.4-1.4L12 12.7l5-5 1.4 1.4z" />
        </svg>
      </span>
      <div className="hidden group-hover:block fixed inset-x-0 top-[var(--site-header-h)] z-[70] pointer-events-none">
        <div className="live-wrap pointer-events-auto">
          <div className="bg-white rounded-[16px] shadow-[0_18px_50px_rgba(12,87,118,0.16)] px-8 py-8 grid gap-8 lg:grid-cols-[0.85fr_1.2fr_0.85fr_minmax(380px,440px)]">
            {col(t(locale, 'Boshqaruv', 'Управление', 'Governance'), [
              { href: '/board', label: t(locale, 'Vasiylik kengashi', 'Попечительский совет', 'Board of Trustees') },
              {
                href: '/board',
                label: t(locale, 'Boshqaruv kengashi', 'Правление', 'Management Board'),
              },
            ])}
            {col(t(locale, 'Dasturlar', 'Программы', 'Programs'), [
              { href: '/programs', label: t(locale, 'Dasturlar', 'Программы', 'Programs') },
              {
                href: '/programs/01',
                label: t(locale, '01 · Xalqaro stajirovkalar', '01 · Международные стажировки', '01 · Internships'),
              },
              {
                href: '/programs/02',
                label: t(locale, '02 · Stipendiya va grantlar', '02 · Стипендии и гранты', '02 · Scholarships'),
              },
              {
                href: '/programs/03',
                label: t(locale, '03 · Tanlovlar va musobaqalar', '03 · Конкурсы и соревнования', '03 · Contests'),
              },
              {
                href: '/programs/04',
                label: t(locale, '04 · Ilmiy va ta’limiy loyihalar', '04 · Научные и образовательные проекты', '04 · Research'),
              },
            ])}
            {col(t(locale, 'Others', 'Другое', 'Others'), [
              { href: '/reports', label: t(locale, 'Hisobotlar', 'Отчёты', 'Reports') },
              { href: '/support', label: t(locale, 'Yordam', 'Помощь', 'Help') },
              { href: '/legal', label: t(locale, 'Huquqiy asos', 'Правовая основа', 'Legal') },
              { href: '/transparency', label: t(locale, 'Shaffoflik', 'Прозрачность', 'Transparency') },
              { href: '/donate', label: t(locale, 'Xayriya', 'Пожертвование', 'Donate') },
            ])}
            <Link href="/donate" className="relative min-h-[268px] rounded-[24px] overflow-hidden bg-sky text-white">
              <span className="relative z-10 flex h-full min-h-[268px] flex-col justify-between p-6 pr-[46%]">
                <span>
                  <span className="block font-[Inter,system-ui,sans-serif] text-[48px] leading-none font-extrabold tracking-tight !text-white">2K+</span>
                  <span className="block mt-2 text-[17px] leading-6 font-medium !text-white">
                    {t(locale, 'Qo‘llab-quvvatlanganlar', 'Поддержанные', 'People supported')}
                  </span>
                </span>
                <span className="inline-flex items-center gap-2 text-[15px] font-medium !text-white">
                  {t(locale, 'Xayriya', 'Пожертвовать', 'Donate')}
                  <span aria-hidden>→</span>
                </span>
              </span>
              <Image
                src="/media/inside-thumb-1.png"
                alt=""
                width={420}
                height={420}
                className="absolute right-0 bottom-0 h-full w-[52%] object-contain object-right object-bottom"
                unoptimized
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
