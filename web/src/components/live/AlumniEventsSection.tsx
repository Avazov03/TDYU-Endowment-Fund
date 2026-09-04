'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'

const ALUMNI_VIDEO = 'v-Z3jc0-LhU'

const COPY = {
  uz: {
    alumniTitle: 'Alumni',
    eventsEyebrow: 'Yaqinlashayotgan tadbirlar',
    eventsTitle: 'Fond tadbirlari',
    eventsCta: 'Barcha tadbirlar',
    videoTitle: 'TDYU haqida xorijiy talabalar fikri',
  },
  ru: {
    alumniTitle: 'Alumni',
    eventsEyebrow: 'Ближайшие события',
    eventsTitle: 'События фонда',
    eventsCta: 'Все события',
    videoTitle: 'Мнение иностранных студентов о ТГЮУ',
  },
  en: {
    alumniTitle: 'Alumni',
    eventsEyebrow: 'Upcoming events',
    eventsTitle: 'Fund events',
    eventsCta: 'All events',
    videoTitle: 'International students on TSUL',
  },
} as const

export type HomeEventCard = {
  slug: string
  title: string
  location: string
  date: string
  time: string
  img: string
}

const THUMBS = [
  '/media/home/alumni-thumb-1.jpg',
  '/media/home/alumni-thumb-2.jpg',
  '/media/home/alumni-thumb-3.jpg',
] as const

const EVENT_IMAGES = [
  '/media/home/home-event-1.jpg',
  '/media/home/home-event-2.jpg',
  '/media/home/home-event-3.jpg',
  '/media/home/home-event-4.jpg',
] as const

function EyebrowIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M5.21484 12.8949V16.6564C5.21484 16.6564 8.82175 15.1537 12.0198 15.1537C15.2178 15.1537 18.8255 16.6564 18.8255 16.6564V12.8424C18.8255 12.8424 15.3844 11.0225 11.9665 11.0225C8.55018 11.021 5.21484 12.8949 5.21484 12.8949Z" />
      <path d="M22.6467 11.9993L24 11.2716L22.6467 10.5222V10.1666C22.6467 10.1666 23.0278 8.23413 20.862 9.24464C20.7517 9.30465 20.6924 9.36542 20.6684 9.42468L11.7367 4.47119L0 11.1884L4.43211 13.2019V12.5485C4.43211 12.5485 8.15079 10.4607 11.9625 10.4607C15.7734 10.4607 19.6092 12.4899 19.6092 12.4899V13.631L22.0563 12.3167V17.6377H21.2416V19.529L22.3248 18.7803L23.5274 19.529V17.637H22.6467V11.9993ZM22.0555 9.83803V10.1944L21.3413 9.79827C21.6017 9.62573 22.0555 9.38642 22.0555 9.83803ZM21.814 11.9251C21.737 11.9279 21.6603 11.9152 21.5883 11.8877C21.5164 11.8602 21.4507 11.8185 21.3952 11.7651C21.3398 11.7117 21.2956 11.6476 21.2655 11.5768C21.2353 11.5059 21.2198 11.4297 21.2197 11.3527C21.2197 11.2757 21.2351 11.1994 21.2652 11.1285C21.2953 11.0576 21.3393 10.9935 21.3947 10.94C21.4501 10.8865 21.5157 10.8447 21.5876 10.8172C21.6595 10.7896 21.7362 10.7768 21.8132 10.7795C21.9615 10.7848 22.102 10.8474 22.2051 10.9542C22.3082 11.0609 22.3659 11.2035 22.366 11.3519C22.3661 11.5003 22.3086 11.643 22.2056 11.7499C22.1027 11.8568 21.9623 11.9196 21.814 11.9251Z" />
    </svg>
  )
}

function ButtonDotsIcon() {
  return (
    <svg width="18" height="15" viewBox="0 0 18 15" fill="currentColor" aria-hidden>
      <path d="M10.5 7.5C10.5 8.32843 9.82843 9 9 9C8.17157 9 7.5 8.32843 7.5 7.5C7.5 6.67157 8.17157 6 9 6C9.82843 6 10.5 6.67157 10.5 7.5Z" />
      <path d="M10.5 13.5C10.5 14.3284 9.82843 15 9 15C8.17157 15 7.5 14.3284 7.5 13.5C7.5 12.6716 8.17157 12 9 12C9.82843 12 10.5 12.6716 10.5 13.5Z" />
      <path d="M3 7.5C3 8.32843 2.32843 9 1.5 9C0.671573 9 0 8.32843 0 7.5C0 6.67157 0.671573 6 1.5 6C2.32843 6 3 6.67157 3 7.5Z" />
      <path d="M18 7.5C18 8.32843 17.3284 9 16.5 9C15.6716 9 15 8.32843 15 7.5C15 6.67157 15.6716 6 16.5 6C17.3284 6 18 6.67157 18 7.5Z" />
      <path d="M10.5 1.5C10.5 2.32843 9.82843 3 9 3C8.17157 3 7.5 2.32843 7.5 1.5C7.5 0.671573 8.17157 0 9 0C9.82843 0 10.5 0.671573 10.5 1.5Z" />
    </svg>
  )
}

function CalendarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M9 2a1 1 0 0 0-1 1v1H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3h-2V3a1 1 0 1 0-2 0v1H10V3a1 1 0 0 0-1-1Zm-3 7a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-8Z" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 5a1 1 0 0 0-2 0v5.382l-2.447 1.632a1 1 0 1 0 1.11 1.664l3-2A1 1 0 0 0 13 12V7Z" />
    </svg>
  )
}

function MapIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z" />
    </svg>
  )
}

function VideoModal({ open, title, videoId, onClose }: { open: boolean; title: string; videoId: string; onClose: () => void }) {
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
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
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

export function AlumniEventsSection({ locale, events }: { locale: Locale; events: HomeEventCard[] }) {
  const t = COPY[locale]
  const [play, setPlay] = useState(false)

  return (
    <section className="alumni-events-section" aria-labelledby="alumni-events-heading">
      <div className="alumni-events-alumni">
        <div className="live-wrap alumni-events-alumni-inner px-2.5 lg:px-5">
          <div className="alumni-campus-banner-wrap">
            <div className="alumni-campus-banner">
              <h2 id="alumni-events-heading" className="alumni-campus-title">
                {t.alumniTitle}
              </h2>
              <div className="alumni-campus-thumbs">
                {THUMBS.map((src, i) => (
                  <div key={src} className={`alumni-campus-thumb${i === 1 ? ' alumni-campus-thumb--video' : ''}`}>
                    <Image src={src} alt="" fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" unoptimized />
                    {i === 1 && (
                      <button
                        type="button"
                        className="alumni-campus-play"
                        onClick={() => setPlay(true)}
                        aria-label={t.videoTitle}
                      >
                        <svg width="24" height="24" viewBox="0 0 448 512" fill="currentColor" aria-hidden>
                          <path d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z" />
                        </svg>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="alumni-events-events">
        <Image
          src="/media/home/events-deco-balloon.png"
          alt=""
          width={70}
          height={70}
          className="alumni-events-deco alumni-events-deco--balloon pointer-events-none absolute hidden lg:block"
          unoptimized
        />
        <Image
          src="/media/home/events-deco-flask.png"
          alt=""
          width={80}
          height={80}
          className="alumni-events-deco alumni-events-deco--flask pointer-events-none absolute hidden lg:block"
          unoptimized
        />

        <div className="live-wrap alumni-events-events-inner relative z-10 px-2.5 lg:px-5">
          <div className="alumni-events-header">
            <div className="alumni-events-heading">
              <p className="alumni-events-eyebrow">
                <EyebrowIcon />
                {t.eventsEyebrow}
              </p>
              <h3 className="alumni-events-title">{t.eventsTitle}</h3>
            </div>
            <Link href="/events" className="alumni-events-cta program-btn">
              <span className="program-btn-icon">
                <ButtonDotsIcon />
              </span>
              <span className="program-btn-text" data-text={t.eventsCta}>
                {t.eventsCta}
              </span>
            </Link>
          </div>

          <div className="alumni-events-grid">
            {events.map((event, i) => {
              const href = `/events/${event.slug}`
              return (
                <article key={event.slug} className="alumni-events-card">
                  <Link href={href} className="alumni-events-card-thumb">
                    <Image src={EVENT_IMAGES[i] || event.img} alt="" fill className="object-cover" sizes="220px" unoptimized />
                  </Link>
                  <div className="alumni-events-card-body">
                    <div className="alumni-events-meta">
                      <span>
                        <CalendarIcon />
                        {event.date}
                      </span>
                      {event.time ? (
                        <span>
                          <ClockIcon />
                          {event.time}
                        </span>
                      ) : null}
                    </div>
                    <h4 className="alumni-events-card-title">
                      <Link href={href}>{event.title}</Link>
                    </h4>
                    <div className="alumni-events-meta alumni-events-meta--location">
                      <span>
                        <MapIcon />
                        {event.location}
                      </span>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </div>

      <VideoModal open={play} title={t.videoTitle} videoId={ALUMNI_VIDEO} onClose={() => setPlay(false)} />
    </section>
  )
}
