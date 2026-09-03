'use client'

import { useEffect, useState } from 'react'
import type { Locale } from '@/i18n/routing'

const STORIES = {
  uz: [
    {
      n: 'Aziz Karimov',
      r: 'Alumni',
      q: 'Oshkoralik va kollegiallik — fondning asosiy tamoyillari. Har bir loyiha shu mezonlar bilan baholanadi.',
      rating: '5.0',
      stars: 5,
    },
    {
      n: 'Nilufar Rashidova',
      r: 'Dasturchi',
      q: 'Fond stipendiyasi tufayli xalqaro tajriba oldim. Bu mening karyeram uchun muhim burilish bo‘ldi.',
      rating: '4.5',
      stars: 4.5,
    },
    {
      n: 'Zulfiya Ergasheva',
      r: 'Katta o‘qituvchi',
      q: 'Oshkoralik va kollegiallik — fondning asosiy tamoyillari. Har bir loyiha shu mezonlar bilan baholanadi.',
      rating: '4.0',
      stars: 4,
    },
    {
      n: 'TDYU Alumni',
      r: 'Manager',
      q: 'Fond stipendiyasi tufayli xalqaro tajriba oldim. Bu mening karyeram uchun muhim burilish bo‘ldi.',
      rating: '4.5',
      stars: 4.5,
    },
  ],
  ru: [
    {
      n: 'Aziz Karimov',
      r: 'Alumni',
      q: 'Открытость и коллегиальность — основные принципы фонда. Каждый проект оценивается по этим критериям.',
      rating: '5.0',
      stars: 5,
    },
    {
      n: 'Nilufar Rashidova',
      r: 'Разработчик',
      q: 'Благодаря стипендии фонда я получила международный опыт. Это стало важным поворотом в карьере.',
      rating: '4.5',
      stars: 4.5,
    },
    {
      n: 'Зульфия Эргашева',
      r: 'Старший преподаватель',
      q: 'Открытость и коллегиальность — основные принципы фонда. Каждый проект оценивается по этим критериям.',
      rating: '4.0',
      stars: 4,
    },
    {
      n: 'TDYU Alumni',
      r: 'Manager',
      q: 'Благодаря стипендии фонда я получила международный опыт. Это стало важным поворотом в карьере.',
      rating: '4.5',
      stars: 4.5,
    },
  ],
  en: [
    {
      n: 'Aziz Karimov',
      r: 'Alumni',
      q: 'Transparency and collegiality are the fund’s core principles. Every project is assessed against these criteria.',
      rating: '5.0',
      stars: 5,
    },
    {
      n: 'Nilufar Rashidova',
      r: 'Developer',
      q: 'The fund scholarship gave me international experience. It was a turning point in my career.',
      rating: '4.5',
      stars: 4.5,
    },
    {
      n: 'Zulfiya Ergasheva',
      r: 'Senior lecturer',
      q: 'Transparency and collegiality are the fund’s core principles. Every project is assessed against these criteria.',
      rating: '4.0',
      stars: 4,
    },
    {
      n: 'TDYU Alumni',
      r: 'Manager',
      q: 'The fund scholarship gave me international experience. It was a turning point in my career.',
      rating: '4.5',
      stars: 4.5,
    },
  ],
} as const

function QuoteIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="44" viewBox="0 0 60 44" fill="none" aria-hidden>
      <path
        d="M0.720703 11.624C2.05985 4.27024 9.11653 -0.618174 16.4697 0.720703C23.6971 2.03676 28.5612 9.17643 28.1611 16.2275L28.1377 16.5635C27.4789 24.8299 22.2284 35.1586 10.207 42.3857L9.62988 42.7275C9.0368 43.0735 8.27986 42.3888 8.64453 41.7266L8.64648 41.7227C10.1681 38.9033 12.0827 34.3794 13.2168 28.1084L13.3135 27.5732L12.7715 27.5215C4.75888 26.7561 -0.682171 19.3398 0.720703 11.624ZM32.0371 11.624C33.3763 4.27025 40.4329 -0.618173 47.7861 0.720703C55.0134 2.03682 59.8776 9.17648 59.4775 16.2275L59.4541 16.5635C58.7849 24.9611 53.3772 35.487 40.9463 42.7275H40.9453C40.3523 43.0733 39.5962 42.3887 39.9609 41.7266L39.9629 41.7227C41.4845 38.9033 43.3991 34.3794 44.5332 28.1084L44.6299 27.5732L44.0879 27.5215C36.0752 26.7561 30.6342 19.3399 32.0371 11.624Z"
        fill="#00ADE2"
      />
    </svg>
  )
}

function StarIcon({ half = false, empty = false }: { half?: boolean; empty?: boolean }) {
  if (empty) {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
        <path
          fill="none"
          stroke="#ff8e2b"
          strokeWidth="1.2"
          d="M12 2.5l2.9 6.1 6.6.7-4.9 4.5 1.4 6.5L12 16.8 5.9 20.3l1.4-6.5-4.9-4.5 6.6-.7L12 2.5z"
        />
      </svg>
    )
  }
  if (half) {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
        <path fill="#ff8e2b" d="M12 2.5l2.9 6.1 6.6.7-4.9 4.5 1.4 6.5L12 16.8V2.5z" />
        <path
          fill="none"
          stroke="#ff8e2b"
          strokeWidth="1.2"
          d="M12 2.5l2.9 6.1 6.6.7-4.9 4.5 1.4 6.5L12 16.8 5.9 20.3l1.4-6.5-4.9-4.5 6.6-.7L12 2.5z"
        />
      </svg>
    )
  }
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#ff8e2b" aria-hidden>
      <path d="M12 2.5l2.9 6.1 6.6.7-4.9 4.5 1.4 6.5L12 16.8 5.9 20.3l1.4-6.5-4.9-4.5 6.6-.7L12 2.5z" />
    </svg>
  )
}

function Stars({ value }: { value: number }) {
  const full = Math.floor(value)
  const half = value - full >= 0.5
  return (
    <span className="about-testi-stars" aria-hidden>
      {Array.from({ length: 5 }, (_, i) => {
        if (i < full) return <StarIcon key={i} />
        if (i === full && half) return <StarIcon key={i} half />
        return <StarIcon key={i} empty />
      })}
    </span>
  )
}

export function AboutTestimonials({ locale }: { locale: Locale }) {
  const items = STORIES[locale]
  const [visible, setVisible] = useState(2)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const read = () => setVisible(window.matchMedia('(min-width: 768px)').matches ? 2 : 1)
    read()
    window.addEventListener('resize', read)
    return () => window.removeEventListener('resize', read)
  }, [])

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((v) => (v + 1) % items.length)
    }, 3500)
    return () => window.clearInterval(id)
  }, [items.length])

  const trackItems = [...items, ...items.slice(0, visible)]

  return (
    <div className="about-testi">
      <div className="about-testi-viewport">
        <div
          className="about-testi-track"
          style={{ transform: `translateX(-${index * (100 / visible)}%)` }}
        >
          {trackItems.map((item, i) => (
            <div key={`${item.n}-${item.r}-${i}`} className="about-testi-slide" style={{ flex: `0 0 ${100 / visible}%` }}>
              <article className="about-testi-card">
                <div className="about-testi-quote-icon" aria-hidden>
                  <QuoteIcon />
                </div>
                <div>
                  <h5 className="about-testi-name">{item.n}</h5>
                  <p className="about-testi-role">{item.r}</p>
                </div>
                <div className="about-testi-ratings">
                  <span className="about-testi-rating">{item.rating}</span>
                  <Stars value={item.stars} />
                </div>
                <p className="about-testi-text">“{item.q}”</p>
              </article>
            </div>
          ))}
        </div>
      </div>
      <div className="about-testi-dots" role="tablist" aria-label="Testimonials">
        {items.map((_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={index === i}
            aria-label={`Go to slide ${i + 1}`}
            className={['about-testi-dot', index === i ? 'is-active' : ''].filter(Boolean).join(' ')}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  )
}
