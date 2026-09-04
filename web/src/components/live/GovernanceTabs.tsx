'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import type { Locale } from '@/i18n/routing'
import { loc } from './loc'

const TABS = [
  {
    id: 'vk',
    uz: 'Vasiylik kengashi',
    ru: 'Попечительский совет',
    en: 'Board of Trustees',
    images: [
      '/media/gov/gallery-img5-5-min.jpg',
      '/media/gov/gallery-img-5.jpg',
      '/media/gov/gallery-img4-min.jpg',
      '/media/gov/gallery-img3-min.jpg',
      '/media/gov/gallery-img-6.jpg',
      '/media/gov/gallery-img2-min.jpg',
    ],
  },
  {
    id: 'bk',
    uz: 'Boshqaruv kengashi',
    ru: 'Правление',
    en: 'Executive Board',
    images: [
      '/media/gov/gallery-img-6.jpg',
      '/media/gov/gallery-img4-min.jpg',
      '/media/gov/gallery-img-1.jpg',
      '/media/gov/gallery-img2-min.jpg',
      '/media/gov/gallery-img3-min.jpg',
      '/media/gov/gallery-img-5.jpg',
    ],
  },
  {
    id: 'tk',
    uz: 'Taftish komissiyasi',
    ru: 'Ревизионная комиссия',
    en: 'Audit Commission',
    images: [
      '/media/gov/gallery-img-1.jpg',
      '/media/gov/gallery-img-6.jpg',
      '/media/gov/gallery-img-5.jpg',
      '/media/gov/gallery-img3-min.jpg',
      '/media/gov/gallery-img2-min.jpg',
      '/media/gov/gallery-img4-min.jpg',
    ],
  },
  {
    id: 'az',
    uz: 'A’zolar va vakolatlar',
    ru: 'Члены и полномочия',
    en: 'Members and powers',
    images: [
      '/media/gov/gallery-img-3.jpg',
      '/media/gov/gallery-img-4.jpg',
      '/media/gov/gallery-img-1.jpg',
      '/media/gov/gallery-img6-min.jpg',
      '/media/gov/gallery-img-2.jpg',
      '/media/gov/gallery-img1-min.jpg',
    ],
  },
] as const

export function GovernanceTabs({ locale }: { locale: Locale }) {
  const [active, setActive] = useState(0)
  const [lightbox, setLightbox] = useState<string | null>(null)
  const tab = TABS[active]

  return (
    <div className="gov-tabs">
      <div className="gov-tabs-list" role="tablist" aria-label={loc(locale, 'Organlar', 'Органы', 'Bodies')}>
        {TABS.map((t, i) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            id={`gov-tab-${t.id}`}
            aria-selected={active === i}
            aria-controls={`gov-panel-${t.id}`}
            className={['gov-tab', active === i ? 'is-active' : ''].filter(Boolean).join(' ')}
            onClick={() => setActive(i)}
          >
            {loc(locale, t.uz, t.ru, t.en)}
          </button>
        ))}
      </div>

      <div
        className="gov-tabs-panel"
        role="tabpanel"
        id={`gov-panel-${tab.id}`}
        aria-labelledby={`gov-tab-${tab.id}`}
        key={tab.id}
      >
        <div className="gov-gallery">
          {tab.images.map((src) => (
            <button
              key={src}
              type="button"
              className="gov-gallery-cell"
              onClick={() => setLightbox(src)}
              aria-label={loc(locale, 'Rasmni ochish', 'Открыть изображение', 'Open image')}
            >
              <Image src={src} alt="" width={420} height={320} className="object-cover w-full h-full" unoptimized />
            </button>
          ))}
        </div>
      </div>

      <GovLightbox src={lightbox} onClose={() => setLightbox(null)} locale={locale} />
    </div>
  )
}

function GovLightbox({
  src,
  onClose,
  locale,
}: {
  src: string | null
  onClose: () => void
  locale: Locale
}) {
  const [host, setHost] = useState<HTMLElement | null>(null)

  useEffect(() => {
    setHost(document.querySelector('.live-root') as HTMLElement | null)
  }, [])

  useEffect(() => {
    if (!src) return
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
  }, [src, onClose])

  if (!src || !host) return null

  return createPortal(
    <div
      className="tdyu-lightbox flex items-center justify-center p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={loc(locale, 'Galereya', 'Галерея', 'Gallery')}
    >
      <button type="button" className="absolute inset-0 bg-black/80 cursor-default border-0" aria-label="Close" onClick={onClose} />
      <div className="relative z-10 w-full max-w-[980px]">
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-1 right-0 z-20 w-9 h-9 rounded-full bg-[#e11d48] text-white text-xl leading-none border-0 hover:bg-red-700"
          aria-label="Close"
        >
          ×
        </button>
        <div className="overflow-hidden rounded-[10px] shadow-[0_24px_80px_rgba(0,0,0,0.45)] bg-black">
          <img src={src} alt="" className="block w-full h-auto max-h-[80vh] object-contain mx-auto" />
        </div>
      </div>
    </div>,
    host,
  )
}

function QuoteIcon() {
  /* Dump icon-box 7705b1d — speech bubbles, fill secondary #00ADE2 */
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="#00ADE2" aria-hidden>
      <path d="M11.25 3.75H2.8125C1.26187 3.75 0 5.01187 0 6.5625V15C0 16.5506 1.26187 17.8125 2.8125 17.8125H6.59719L5.17406 25.1344C5.14781 25.27 5.15187 25.4098 5.18593 25.5437C5.21999 25.6775 5.28322 25.8022 5.3711 25.9088C5.45898 26.0154 5.56932 26.1013 5.69425 26.1603C5.81918 26.2193 5.9556 26.2499 6.09375 26.25H9.13125C9.94687 26.25 10.6706 25.7166 10.9181 24.9441L13.6462 18.4706C13.6622 18.4331 13.6753 18.3956 13.6866 18.3581C13.9359 17.4591 14.0625 16.53 14.0625 15.5972V6.5625C14.0625 5.01187 12.8006 3.75 11.25 3.75ZM27.1875 3.75H18.75C17.1994 3.75 15.9375 5.01187 15.9375 6.5625V15C15.9375 16.5506 17.1994 17.8125 18.75 17.8125H22.5347L21.1116 25.1344C21.0848 25.2701 21.0885 25.41 21.1223 25.5441C21.1562 25.6782 21.2194 25.8031 21.3074 25.9099C21.3953 26.0166 21.5059 26.1025 21.6311 26.1613C21.7563 26.2201 21.8929 26.2504 22.0312 26.25H25.0688C25.8844 26.25 26.6091 25.7166 26.8547 24.9441L29.5847 18.4706C29.5997 18.4331 29.6128 18.3956 29.6241 18.3572C29.8734 17.4581 30 16.5291 30 15.5972V6.5625C30 5.01187 28.7381 3.75 27.1875 3.75Z" />
    </svg>
  )
}

export function GovernanceQuote({ locale }: { locale: Locale }) {
  return (
    <blockquote className="gov-quote">
      <QuoteIcon />
      <p>
        {loc(
          locale,
          'Hurmatli hamkorlar, Boshqaruv kengashi fondning joriy faoliyatini boshqaradi: byudjet ijrosi, dasturlar va xalqaro loyihalar. Rais: N. Salayev. Har bir qaror kollegiallik va oshkoralik tamoyiliga asoslanadi.',
          'Уважаемые партнёры, Правление управляет текущей деятельностью фонда: исполнение бюджета, программы и международные проекты. Председатель: Н. Салаев. Каждое решение основано на коллегиальности и открытости.',
          'Dear partners, the Executive Board manages the fund’s day-to-day work: budget execution, programmes and international projects. Chair: N. Salayev. Every decision is grounded in collegiality and transparency.',
        )}
      </p>
    </blockquote>
  )
}
