'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { brand } from '@/content/site'

type Locale = 'uz' | 'ru' | 'en'

function t(locale: Locale, uz: string, ru: string, en: string) {
  if (locale === 'ru') return ru
  if (locale === 'en') return en
  return uz
}

const GALLERY = [1, 2, 3, 4, 5, 6] as const

const SOCIALS = [
  { id: 'facebook', label: 'Facebook', href: 'https://www.facebook.com/', path: 'M22 12.07C22 6.48 17.52 2 12 2S2 6.48 2 12.07c0 5.02 3.66 9.18 8.44 9.93v-7.03H7.9v-2.9h2.54V9.41c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.9h-2.34V22c4.78-.75 8.44-4.91 8.44-9.93z' },
  { id: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/', path: 'M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm10 1.8H7A2.2 2.2 0 0 0 4.8 7v10A2.2 2.2 0 0 0 7 19.2h10a2.2 2.2 0 0 0 2.2-2.2V7A2.2 2.2 0 0 0 17 4.8zM12 8.2A3.8 3.8 0 1 1 8.2 12 3.8 3.8 0 0 1 12 8.2zm0 1.7A2.1 2.1 0 1 0 14.1 12 2.1 2.1 0 0 0 12 9.9zm4.35-3.05a.95.95 0 1 1-.95.95.95.95 0 0 1 .95-.95z' },
  { id: 'pinterest', label: 'Pinterest', href: 'https://www.pinterest.com/', path: 'M12 2a10 10 0 0 0-3.64 19.31c-.05-.82-.1-2.08.02-2.97.11-.8.71-3.4.71-3.4s-.18-.36-.18-.9c0-.84.49-1.47 1.1-1.47.52 0 .77.39.77.86 0 .52-.33 1.3-.5 2.02-.14.6.3 1.09.89 1.09 1.07 0 1.9-1.13 1.9-2.76 0-1.44-1.04-2.45-2.52-2.45-1.72 0-2.73 1.29-2.73 2.62 0 .52.2 1.08.45 1.38a.18.18 0 0 1 .04.17l-.17.69c-.03.11-.09.14-.21.08-1.05-.49-1.7-2.02-1.7-3.25 0-2.65 1.93-5.08 5.56-5.08 2.92 0 5.19 2.08 5.19 4.86 0 2.9-1.83 5.24-4.37 5.24-.85 0-1.66-.44-1.93-.97l-.53 2.01c-.19.74-.71 1.66-1.06 2.22A10 10 0 1 0 12 2z' },
  { id: 'x', label: 'X', href: 'https://x.com/', path: 'M17.3 3h2.9l-6.3 7.2L21.5 21h-5.3l-4.2-5.5L7.2 21H4.3l6.8-7.7L2.7 3h5.4l3.8 5 4.4-5zm-1 16.2h1.6L7.8 4.7H6.1z' },
] as const

export function SiteOffcanvas({
  open,
  locale,
  onClose,
}: {
  open: boolean
  locale: Locale
  onClose: () => void
}) {
  const [host, setHost] = useState<HTMLElement | null>(null)

  useEffect(() => {
    setHost(document.querySelector('.live-root') as HTMLElement | null)
  }, [])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  if (!open || !host) return null

  const address = t(
    locale,
    "Sayilgoh ko'chasi 35, Yunusobod, Toshkent 100047",
    'ул. Сайилгох 35, Юнусабад, Ташкент 100047',
    '35 Saylgoh Street, Yunusobod, Tashkent 100047',
  )

  return createPortal(
    <div className="tdyu-offcanvas" role="dialog" aria-modal="true" aria-label={brand.name}>
      <button type="button" className="absolute inset-0 bg-black/45 border-0 cursor-default" aria-label={t(locale, 'Yopish', 'Закрыть', 'Close')} onClick={onClose} />
      <aside
        className="absolute top-0 right-0 h-full w-[min(430px,100vw)] bg-[#0c5776] text-white overflow-y-auto shadow-[-24px_0_60px_rgba(0,0,0,0.28)]"
        style={{ animation: 'tdyu-offcanvas-in 0.38s ease forwards' }}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-0 right-0 z-10 w-11 h-11 bg-sky text-white border-0 hover:bg-[#0098c8]"
          aria-label={t(locale, 'Yopish', 'Закрыть', 'Close')}
        >
          <svg className="mx-auto" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M18.3 5.7 12 12l6.3 6.3-1.4 1.4L10.6 13.4 4.3 19.7 2.9 18.3 9.2 12 2.9 5.7 4.3 4.3l6.3 6.3 6.3-6.3z" />
          </svg>
        </button>

        <div className="px-8 pt-16 pb-10">
          <Link href="/" onClick={onClose} className="inline-block mb-5">
            <Image src="/brand/tdyu-logo-white.svg" alt={brand.name} width={220} height={58} className="h-[52px] w-auto" unoptimized />
          </Link>
          <p className="text-[15px] leading-6 text-white/85 mb-8">
            {t(
              locale,
              'TDYU Endowment Fund — bilim, grant va xalqaro imkoniyatlarga sarmoya.',
              'TDYU Endowment Fund — инвестиции в знания, гранты и международные возможности.',
              'TDYU Endowment Fund — investing in knowledge, grants and international opportunity.',
            )}
          </p>

          <nav className="xl:hidden grid gap-2 mb-8 text-[15px] font-medium" aria-label={t(locale, 'Menyu', 'Меню', 'Menu')}>
            <Link href="/" className="!text-white hover:!text-sky" onClick={onClose}>{t(locale, 'Bosh', 'Главная', 'Home')}</Link>
            <Link href="/about-us" className="!text-white hover:!text-sky" onClick={onClose}>{t(locale, 'Missiya', 'Миссия', 'Mission')}</Link>
            <Link href="/mission-value" className="!text-white/85 hover:!text-sky pl-3 text-[14px]" onClick={onClose}>{t(locale, '6 ustun', '6 столпов', '6 pillars')}</Link>
            <Link href="/governance" className="!text-white/85 hover:!text-sky pl-3 text-[14px]" onClick={onClose}>{t(locale, 'Boshqaruv', 'Управление', 'Governance')}</Link>
            <Link href="/programs" className="!text-white hover:!text-sky" onClick={onClose}>{t(locale, 'Dasturlar', 'Программы', 'Programs')}</Link>
            <Link href="/news" className="!text-white hover:!text-sky" onClick={onClose}>{t(locale, 'Yangiliklar', 'Новости', 'News')}</Link>
            <Link href="/contact" className="!text-white hover:!text-sky" onClick={onClose}>{t(locale, 'Aloqa', 'Контакты', 'Contact')}</Link>
            <Link href="/donate" className="!text-sky" onClick={onClose}>{t(locale, 'Xayriya', 'Пожертвование', 'Donate')}</Link>
          </nav>
          <Link
            href="/shop"
            onClick={onClose}
            className="mb-8 inline-flex items-center justify-center gap-2 w-full h-[50px] rounded-[30px] bg-sky !text-white text-[15px] font-medium hover:bg-white hover:!text-tdyu"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M6.5 8h11l-.7 11.2a2 2 0 0 1-2 1.8H9.2a2 2 0 0 1-2-1.8L6.5 8Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
              <path d="M9 8V6.4A3 3 0 0 1 12 3.5 3 3 0 0 1 15 6.4V8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            </svg>
            {t(locale, 'Do‘kon', 'Магазин', 'Shop')}
          </Link>
          <Link
            href="/shop/orders"
            onClick={onClose}
            className="mb-8 inline-flex items-center justify-center gap-2 w-full h-[46px] rounded-[30px] border border-white/40 !text-white text-[15px] font-medium hover:bg-white hover:!text-tdyu"
          >
            {t(locale, 'Buyurtmalarim', 'Мои заказы', 'My orders')}
          </Link>

          <div className="grid grid-cols-3 gap-2 mb-9">
            {GALLERY.map((n) => (
              <Link key={n} href="/about-us" onClick={onClose} className="relative aspect-square overflow-hidden rounded-[8px]">
                <Image src={`/media/home/gallery-${n}.jpg`} alt="" fill className="object-cover" sizes="120px" unoptimized />
              </Link>
            ))}
          </div>

          <h3 className="!text-white font-[Bitter,Georgia,serif] text-[20px] leading-7 font-semibold mb-4">
            {t(locale, 'Tezkor aloqa', 'Быстрая связь', 'Quick contact')}
          </h3>
          <ul className="m-0 p-0 list-none grid gap-3.5 text-[14px] leading-6 text-white/90 mb-9">
            <li>
              <a href={brand.phoneHref} className="flex items-start gap-3 !text-white hover:!text-sky">
                <PhoneIcon />
                {brand.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${brand.email}`} className="flex items-start gap-3 !text-white hover:!text-sky">
                <MailIcon />
                {brand.email}
              </a>
            </li>
            <li>
              <Link href="/contact" onClick={onClose} className="flex items-start gap-3 !text-white hover:!text-sky">
                <PinIcon />
                {address}
              </Link>
            </li>
          </ul>

          <h3 className="!text-white font-[Bitter,Georgia,serif] text-[20px] leading-7 font-semibold mb-4">
            {t(locale, 'Bizni kuzating', 'Следите за нами', 'Follow us')}
          </h3>
          <div className="flex items-center gap-3">
            {SOCIALS.map((s) => (
              <a
                key={s.id}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-white/25 !text-white hover:bg-sky hover:border-sky"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </aside>
    </div>,
    host,
  )
}

function PhoneIcon() {
  return (
    <span className="mt-0.5 inline-flex w-5 h-5 shrink-0 text-sky" aria-hidden>
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M6.6 10.8c1.4 2.7 3.9 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.3 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.4 21 3 13.6 3 4.5 3 3.9 3.4 3.5 4 3.5h3.4c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1L6.6 10.8z" />
      </svg>
    </span>
  )
}

function MailIcon() {
  return (
    <span className="mt-0.5 inline-flex w-5 h-5 shrink-0 text-sky" aria-hidden>
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5L4 8V6l8 5 8-5z" />
      </svg>
    </span>
  )
}

function PinIcon() {
  return (
    <span className="mt-0.5 inline-flex w-5 h-5 shrink-0 text-sky" aria-hidden>
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 14.5 9 2.5 2.5 0 0 1 12 11.5z" />
      </svg>
    </span>
  )
}
