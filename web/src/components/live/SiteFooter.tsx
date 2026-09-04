'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { brand } from '@/content/site'
import type { Locale } from '@/i18n/routing'
import { BrandLogo } from './BrandLogo'
import { NewsletterForm } from './NewsletterForm'

function loc(locale: Locale, uz: string, ru: string, en: string) {
  return locale === 'ru' ? ru : locale === 'en' ? en : uz
}

function XIcon() {
  return (
    <svg viewBox="0 0 512 512" aria-hidden>
      <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 320 512" aria-hidden>
      <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 448 512" aria-hidden>
      <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
    </svg>
  )
}

function ArrowUpIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
      <path d="M12 19V5M5 12l7-7 7 7" />
    </svg>
  )
}

function FooterDivider() {
  return <span className="site-footer-col-line" aria-hidden />
}

export function SiteFooter({ locale }: { locale: Locale }) {
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /** Dump: Missiya, Alumni, Loyihalar */
  const addressLinks = [
    { href: '/about-us' as const, label: loc(locale, 'Missiya', 'Миссия', 'Mission') },
    { href: '/alumni' as const, label: 'Alumni', key: 'alumni' },
    { href: '/projects' as const, label: loc(locale, 'Loyihalar', 'Проекты', 'Projects'), key: 'projects' },
  ]

  const usefulLinks = [
    { href: '/shop' as const, label: loc(locale, 'Do‘kon', 'Магазин', 'Shop') },
    { href: '/shop/orders' as const, label: loc(locale, 'Buyurtmalarim', 'Мои заказы', 'My orders') },
    { href: '/support' as const, label: loc(locale, 'Yordam', 'Поддержка', 'Support') },
  ]

  return (
    <footer className="site-footer">
      <div className="site-footer-shell">
        <Image
          src="/media/home/testimonial-shape-2.png"
          alt=""
          width={220}
          height={220}
          className="site-footer-deco pointer-events-none absolute hidden lg:block"
          unoptimized
        />

        <div className="live-wrap site-footer-inner relative z-10">
          <div className="site-footer-grid">
            <div className="site-footer-brand">
              <BrandLogo variant="footerWhite" locale={locale} alt={brand.name} className="site-footer-logo" />

              {/* dump be02a0e: email + phone bir qatorda */}
              <div className="site-footer-contacts">
                <a className="site-footer-contact" href={`mailto:${brand.email}`}>
                  <span className="site-footer-contact-label">{loc(locale, 'Elektron pochta', 'Электронная почта', 'Email')}:</span>
                  <span className="site-footer-contact-value">{brand.email}</span>
                </a>
                <a className="site-footer-contact" href={brand.phoneHref}>
                  <span className="site-footer-contact-label">{loc(locale, 'Telefon', 'Телефон', 'Phone')}:</span>
                  <span className="site-footer-contact-value">{brand.phone}</span>
                </a>
              </div>

              <div className="site-footer-stores">
                <a href="https://play.google.com" target="_blank" rel="noopener noreferrer" className="site-footer-store">
                  <Image src="/media/home/store-1.png" alt="Google Play" width={120} height={36} unoptimized />
                </a>
                <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer" className="site-footer-store">
                  <Image src="/media/home/store-2.png" alt="App Store" width={120} height={36} unoptimized />
                </a>
              </div>

              {/* dump 8452319: label + ikonlar bir qatorda */}
              <div className="site-footer-social-block">
                <p className="site-footer-social-label">{loc(locale, 'Ijtimoiy tarmoqlar', 'Соцсети', 'Social networks')}</p>
                <div className="site-footer-social">
                  <Link href="/contact" aria-label="X">
                    <span className="site-footer-social-icon">
                      <XIcon />
                    </span>
                  </Link>
                  <Link href="/contact" aria-label="Facebook">
                    <span className="site-footer-social-icon">
                      <FacebookIcon />
                    </span>
                  </Link>
                  <Link href="/contact" aria-label="Instagram">
                    <span className="site-footer-social-icon">
                      <InstagramIcon />
                    </span>
                  </Link>
                </div>
              </div>
            </div>

            <div className="site-footer-cols">
              <div className="site-footer-col site-footer-col--nav">
                <h4 className="site-footer-col-title">{loc(locale, 'Manzil', 'Адрес', 'Address')}</h4>
                <FooterDivider />
                <ul className="site-footer-col-list">
                  {addressLinks.map((item) => (
                    <li key={item.key ?? item.label}>
                      <Link href={item.href}>{item.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="site-footer-col site-footer-col--nav">
                <h4 className="site-footer-col-title">{loc(locale, 'Foydali havolalar', 'Полезные ссылки', 'Useful links')}</h4>
                <FooterDivider />
                <ul className="site-footer-col-list">
                  {usefulLinks.map((item) => (
                    <li key={item.label}>
                      <Link href={item.href}>{item.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="site-footer-col site-footer-col--nl">
                <h4 className="site-footer-col-title">{loc(locale, 'Axborotnoma', 'Рассылка', 'Newsletter')}</h4>
                <FooterDivider />
                <NewsletterForm />
              </div>
            </div>
          </div>

          <div className="site-footer-bottom">
            <p className="site-footer-copy">
              © {new Date().getFullYear()} TDYU. {loc(locale, 'Dizayn', 'Дизайн', 'Design')}:{' '}
              <a href="https://rstheme.com/" target="_blank" rel="noopener noreferrer">
                RSTheme.
              </a>
            </p>
          </div>
        </div>
      </div>

      <button
        type="button"
        className={`site-footer-top${showTop ? ' is-visible' : ''}`}
        aria-label={loc(locale, 'Yuqoriga', 'Наверх', 'Back to top')}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <ArrowUpIcon />
      </button>
    </footer>
  )
}
