'use client'

import { useState } from 'react'
import type { Locale } from '@/i18n/routing'

function loc(locale: Locale, uz: string, ru: string, en: string) {
  return locale === 'ru' ? ru : locale === 'en' ? en : uz
}

const YT = 'KIgz0XGDJZw'

export function AboutVideoPlay({ locale }: { locale: Locale }) {
  const [play, setPlay] = useState(false)

  return (
    <>
      <button
        type="button"
        className="tdyu-play about-video-play"
        aria-label={loc(locale, 'Videoni ko‘rish', 'Смотреть видео', 'Watch video')}
        onClick={() => setPlay(true)}
      >
        <svg width="24" height="24" viewBox="0 0 448 512" aria-hidden>
          <path d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z" />
        </svg>
      </button>
      {play ? (
        <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4" role="dialog" aria-modal>
          <button
            type="button"
            className="absolute top-4 right-4 text-white text-2xl border-0 bg-transparent"
            aria-label="Close"
            onClick={() => setPlay(false)}
          >
            ×
          </button>
          <iframe
            title="TDYU video"
            className="w-full max-w-4xl aspect-video rounded-lg"
            src={`https://www.youtube.com/embed/${YT}?autoplay=1`}
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>
      ) : null}
    </>
  )
}
