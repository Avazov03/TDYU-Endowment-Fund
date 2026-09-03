'use client'

import { useEffect, useRef, useState } from 'react'
import type { Locale } from '@/i18n/routing'

function loc(locale: Locale, uz: string, ru: string, en: string) {
  return locale === 'ru' ? ru : locale === 'en' ? en : uz
}

const ITEMS = {
  uz: {
    vision: {
      title: 'Vision',
      lead: 'Dunyo yetakchi universitetlarida malaka oshirish, grant va stipendiyalar.',
      bullets: [
        'Ilmiy nashrlar va tarjimalar.',
        'Xorijiy jurnallarda chop etishni qo‘llab-quvvatlash.',
        'TSUL brendi va tadbirkorlik yo‘nalishlari.',
      ],
    },
    value: {
      title: 'Value',
      lead: 'Dunyo yetakchi universitetlarida malaka oshirish, grant va stipendiyalar.',
      bullets: [
        'Ilmiy nashrlar va tarjimalar.',
        'Xorijiy jurnallarda chop etishni qo‘llab-quvvatlash.',
        'TSUL brendi va tadbirkorlik yo‘nalishlari.',
      ],
    },
  },
  ru: {
    vision: {
      title: 'Vision',
      lead: 'Повышение квалификации в ведущих университетах мира, гранты и стипендии.',
      bullets: [
        'Научные публикации и переводы.',
        'Поддержка публикаций в зарубежных журналах.',
        'Бренд TSUL и предпринимательские направления.',
      ],
    },
    value: {
      title: 'Value',
      lead: 'Повышение квалификации в ведущих университетах мира, гранты и стипендии.',
      bullets: [
        'Научные публикации и переводы.',
        'Поддержка публикаций в зарубежных журналах.',
        'Бренд TSUL и предпринимательские направления.',
      ],
    },
  },
  en: {
    vision: {
      title: 'Vision',
      lead: 'Training at leading universities worldwide, grants and scholarships.',
      bullets: [
        'Academic publishing and translations.',
        'Support for publishing in foreign journals.',
        'TSUL brand and entrepreneurship directions.',
      ],
    },
    value: {
      title: 'Value',
      lead: 'Training at leading universities worldwide, grants and scholarships.',
      bullets: [
        'Academic publishing and translations.',
        'Support for publishing in foreign journals.',
        'TSUL brand and entrepreneurship directions.',
      ],
    },
  },
} as const

/** Dump rs-counter odometer — 0 → 87 on view */
export function MissionPercentCounter() {
  const ref = useRef<HTMLSpanElement>(null)
  const [value, setValue] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setValue(87)
      return
    }

    const run = () => {
      if (started.current) return
      started.current = true
      const from = 0
      const to = 87
      const duration = 1600
      const t0 = performance.now()
      const tick = (now: number) => {
        const p = Math.min(1, (now - t0) / duration)
        const eased = 1 - Math.pow(1 - p, 3)
        setValue(Math.round(from + (to - from) * eased))
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          run()
          io.disconnect()
        }
      },
      { threshold: 0.2 },
    )
    io.observe(el)

    // already in view on first paint
    const r = el.getBoundingClientRect()
    if (r.top < window.innerHeight && r.bottom > 0) run()

    return () => io.disconnect()
  }, [])

  return (
    <p className="mv-pillars-stat">
      <span ref={ref} className="mv-pillars-stat-num">
        {value}
      </span>
      <span className="mv-pillars-stat-prefix">%</span>
    </p>
  )
}

export function MissionVisionAccordion({ locale }: { locale: Locale }) {
  const copy = ITEMS[locale]
  const [open, setOpen] = useState<Record<'vision' | 'value', boolean>>({
    vision: true,
    value: false,
  })

  return (
    <div className="mv-accordion">
      {(['vision', 'value'] as const).map((key) => {
        const item = copy[key]
        const isOpen = open[key]
        return (
          <div key={key} className={['mv-acc-item', isOpen ? 'is-open' : ''].filter(Boolean).join(' ')}>
            <button
              type="button"
              className="mv-acc-trigger"
              aria-expanded={isOpen}
              onClick={() => setOpen((s) => ({ ...s, [key]: !s[key] }))}
            >
              {item.title}
            </button>
            <div className="mv-acc-panel-wrap" aria-hidden={!isOpen}>
              <div className="mv-acc-panel">
                <p className="mv-acc-lead">
                  <span className="mv-acc-dot" aria-hidden />
                  {item.lead}
                </p>
                <ul className="mv-acc-list">
                  {item.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export function MissionMarquee({ locale }: { locale: Locale }) {
  const text = loc(locale, '2023-yilda tashkil etilgan', 'Основан в 2023 году', 'Established in 2023')
  const items = Array.from({ length: 8 }, (_, i) => i)

  return (
    <div className="mv-marquee" aria-hidden>
      <div className="mv-marquee-track">
        {items.map((i) => (
          <span key={i} className="mv-marquee-item">
            <img src="/media/mission-value/m-g-icon1.png" alt="" width={60} height={60} />
            <span className={i % 2 === 0 ? 'is-ink' : 'is-sky'}>{text}</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export function MapDotsIcon() {
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
