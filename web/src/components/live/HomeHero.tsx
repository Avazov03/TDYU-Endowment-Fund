'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import type { PublicAnnouncement } from '@/lib/cms-source'

const YT = 'KIgz0XGDJZw'

export type HomeHeroNote = { slug: string; t: string; date: string; excerpt: string }

function loc(locale: Locale, uz: string, ru: string, en: string) {
  return locale === 'ru' ? ru : locale === 'en' ? en : uz
}

export function HomeHero({
  locale,
  notes,
  announcements = [],
}: {
  locale: Locale
  notes: HomeHeroNote[]
  announcements?: PublicAnnouncement[]
}) {
  const [play, setPlay] = useState(false)
  const items =
    announcements.length > 0
      ? announcements.map((a) => ({
          key: a.id,
          href: '/news' as const,
          t: a.title,
          date: a.dateLabel || '',
          excerpt: a.excerpt || '',
        }))
      : notes.map((n) => ({
          key: n.slug,
          href: `/news/${n.slug}` as const,
          t: n.t,
          date: n.date,
          excerpt: n.excerpt,
        }))
  const videoTitle = loc(locale, 'TDYU haqida xorijiy talabalar fikri', 'Мнение иностранных студентов о ТГЮУ', 'International students on TSUL')

  return (
    <section className="relative min-h-[679px] lg:h-[829px] text-white overflow-visible bg-sky">
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/media/home-remote.jpg)' }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'linear-gradient(176deg, rgba(0, 0, 0, 0) 14%, rgb(0, 0, 0) 129%)' }}
        />
      </div>

      <div className="live-wrap relative z-10 h-full min-h-[679px] lg:min-h-0 pt-10 lg:pt-[90px] pb-16 lg:pb-[120px]">
        <div className="max-w-[690px]">
          <button
            type="button"
            onClick={() => setPlay(true)}
            className="tdyu-play mb-6"
            aria-label={loc(locale, 'Videoni ko‘rish', 'Смотреть видео', 'Watch video')}
          >
            <svg width="24" height="24" viewBox="0 0 448 512" aria-hidden>
              <path d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z" />
            </svg>
          </button>
          <p className="flex items-center gap-2 text-[17px] leading-7 font-medium text-white" style={{ marginBottom: 14 }}>
            <Image src="/brand/endowment-seal.png" alt="" width={24} height={24} className="h-6 w-6 object-contain" unoptimized />
            TDYU Endowment Fund
          </p>
          <h1 className="!text-white font-[Bitter,Georgia,serif] text-[36px] sm:text-[48px] lg:text-[64px] leading-[1.16] lg:leading-[74px] font-semibold w-[690px] max-w-full" style={{ marginBottom: 28 }}>
            {loc(locale, "Huquqiy ta’limning kelajagiga sarmoya", 'Инвестиции в будущее юридического образования', 'Investing in the future of legal education')}
          </h1>
          <Link
            href="/programs"
            className="inline-flex items-center gap-3 rounded-[30px] bg-sky !text-white text-[15px] font-medium leading-none px-7 h-[50px] hover:bg-white hover:!text-tdyu"
          >
            {loc(locale, "Dasturlarni ko'rish", 'Смотреть программы', 'View programs')}
            <span className="inline-flex items-center gap-[3px]" aria-hidden>
              <span className="block w-1 h-1 rounded-full bg-current" />
              <span className="block w-1 h-1 rounded-full bg-current" />
              <span className="block w-1 h-1 rounded-full bg-current" />
            </span>
          </Link>
        </div>

        <aside className="mt-10 lg:mt-0 lg:absolute bg-tdyu/92 text-white rounded-[16px] w-full lg:w-[415px] min-h-[425px] px-9 py-[29px] text-[16px] leading-7 lg:top-[155px] lg:right-0 flex flex-col">
          <h2
            className="!text-white font-[Bitter,Georgia,serif] text-[24px] leading-[34px] font-semibold inline-flex items-center"
            style={{ paddingBottom: 10, marginBottom: 18, borderBottom: '1px solid rgba(255, 255, 255, 0.15)' }}
          >
            <span className="block w-2.5 h-2.5 rounded-full bg-[#fdc72f] shrink-0" style={{ marginRight: 12 }} aria-hidden />
            {loc(locale, 'E’lonlar', 'Объявления', 'Announcements')}
          </h2>
          <ul className="m-0 p-0 list-none flex-1">
            {items.map((n, i) => {
              const last = i === items.length - 1
              return (
                <li
                  key={n.key}
                  style={{
                    paddingBottom: last ? 8 : 13.5,
                    marginBottom: last ? 12 : 13.5,
                    borderBottom: last ? 'none' : '1px solid rgba(255, 255, 255, 0.15)',
                  }}
                >
                  <Link href={n.href} className="block">
                    <strong className="block font-[Bitter,Georgia,serif] text-[17px] leading-5 font-semibold !text-white" style={{ marginBottom: 8 }}>
                      {n.t}
                    </strong>
                    {n.date ? (
                      <span className="flex items-center text-[14px] leading-5 text-white/80">
                        <svg className="block" width="14" height="14" viewBox="0 0 448 512" fill="currentColor" aria-hidden style={{ marginRight: 8 }}>
                          <path d="M148 288h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm108-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-96 96v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm192 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96-260v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h48V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h128V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h48c26.5 0 48 21.5 48 48zm-48 346V160H48v298c0 3.3 2.7 6 6 6h340c3.3 0 6-2.7 6-6z" />
                        </svg>
                        {n.date}
                      </span>
                    ) : null}
                    {n.excerpt ? <span className="block mt-1 text-[13px] leading-5 text-white/70">{n.excerpt}</span> : null}
                  </Link>
                </li>
              )
            })}
          </ul>
          <Link
            href="/donate"
            className="mt-auto inline-flex items-center justify-center gap-2 w-full rounded-[12px] bg-[#0f6487] hover:bg-sky !text-white text-[15px] font-medium h-[48px]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zm-1 1.5 5.5 5.5H13z" />
            </svg>
            {loc(locale, 'Xayriya ochiq', 'Пожертвования открыты', 'Donations open')}
          </Link>
        </aside>
      </div>

      <VideoModal open={play} title={videoTitle} onClose={() => setPlay(false)} />
    </section>
  )
}

function VideoModal({ open, title, onClose }: { open: boolean; title: string; onClose: () => void }) {
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

  return createPortal(
    <div className="tdyu-lightbox flex items-center justify-center p-4 sm:p-8" role="dialog" aria-modal="true" aria-label={title}>
      <button type="button" className="absolute inset-0 bg-black/80 cursor-default border-0" aria-label="Close" onClick={onClose} />
      <div className="relative z-10 w-full max-w-[980px]">
        <p className="text-white text-[15px] font-medium mb-3 pr-12">{title}</p>
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-1 right-0 z-20 w-9 h-9 rounded-full bg-[#e11d48] text-white text-xl leading-none border-0 hover:bg-red-700"
          aria-label="Close"
        >
          ×
        </button>
        <div className="aspect-video bg-black rounded-[10px] overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${YT}?autoplay=1`}
            title={title}
            allow="autoplay; encrypted-media; fullscreen"
            allowFullScreen
          />
        </div>
      </div>
    </div>,
    host,
  )
}
