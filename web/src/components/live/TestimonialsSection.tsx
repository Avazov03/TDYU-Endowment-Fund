'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import type { Locale } from '@/i18n/routing'

/** Dump ea7ef22 / bec342f — 7 ta slide */
const STORIES = {
  uz: [
    {
      n: 'Aziz Karimov',
      r: 'Founder & CEO',
      q: 'TDYU Endowment Fundda talabalar — e’tibor markazida. Ularning hikoyalari missiyamizni aks ettiradi: qo‘llab-quvvatlash, ilhomlantirish va tayyorlash.',
      rating: '4.5',
    },
    {
      n: 'Nilufar Rashidova',
      r: 'Dasturchi',
      q: 'Fond dasturlari amaliyotga yo‘naltirilgan. Grant va stajirovkalar orqali haqiqiy tajriba orttirdim.',
      rating: '4.5',
    },
    {
      n: 'Zulfiya Ergasheva',
      r: 'Dizayner',
      q: 'Har bir xayriya va grant — aniq maqsadga yo‘naltirilgan. Shaffoflik asosiy tamoyilimiz.',
      rating: '4.5',
    },
    {
      n: 'TDYU Alumni',
      r: 'Katta o‘qituvchi',
      q: 'TDYU Endowment Fundda talabalar — e’tibor markazida. Ularning hikoyalari missiyamizni aks ettiradi: qo‘llab-quvvatlash, ilhomlantirish va tayyorlash.',
      rating: '4.5',
    },
    {
      n: 'Aziz Karimov',
      r: 'Manager',
      q: 'Fond dasturlari amaliyotga yo‘naltirilgan. Grant va stajirovkalar orqali haqiqiy tajriba orttirdim.',
      rating: '4.5',
    },
    {
      n: 'Nilufar Rashidova',
      r: 'Tadqiqotchi',
      q: 'Har bir xayriya va grant — aniq maqsadga yo‘naltirilgan. Shaffoflik asosiy tamoyilimiz.',
      rating: '4.5',
    },
    {
      n: 'Zulfiya Ergasheva',
      r: 'Raqamli marketing',
      q: 'TDYU Endowment Fundda talabalar — e’tibor markazida. Ularning hikoyalari missiyamizni aks ettiradi: qo‘llab-quvvatlash, ilhomlantirish va tayyorlash.',
      rating: '4.5',
    },
  ],
  ru: [
    {
      n: 'Aziz Karimov',
      r: 'Founder & CEO',
      q: 'В TDYU Endowment Fund студенты — в центре внимания. Их истории отражают нашу миссию: поддержка, вдохновение и подготовка.',
      rating: '4.5',
    },
    {
      n: 'Nilufar Rashidova',
      r: 'Разработчик',
      q: 'Программы фонда ориентированы на практику. Благодаря грантам и стажировкам я получила реальный опыт.',
      rating: '4.5',
    },
    {
      n: 'Zulfiya Ergasheva',
      r: 'Дизайнер',
      q: 'Каждое пожертвование и грант направлены на конкретную цель. Прозрачность — наш главный принцип.',
      rating: '4.5',
    },
    {
      n: 'TDYU Alumni',
      r: 'Старший преподаватель',
      q: 'В TDYU Endowment Fund студенты — в центре внимания. Их истории отражают нашу миссию: поддержка, вдохновение и подготовка.',
      rating: '4.5',
    },
    {
      n: 'Aziz Karimov',
      r: 'Manager',
      q: 'Программы фонда ориентированы на практику. Благодаря грантам и стажировкам я получил реальный опыт.',
      rating: '4.5',
    },
    {
      n: 'Nilufar Rashidova',
      r: 'Исследователь',
      q: 'Каждое пожертвование и грант направлены на конкретную цель. Прозрачность — наш главный принцип.',
      rating: '4.5',
    },
    {
      n: 'Zulfiya Ergasheva',
      r: 'Цифровой маркетинг',
      q: 'В TDYU Endowment Fund студенты — в центре внимания. Их истории отражают нашу миссию: поддержка, вдохновение и подготовка.',
      rating: '4.5',
    },
  ],
  en: [
    {
      n: 'Aziz Karimov',
      r: 'Founder & CEO',
      q: 'At TDYU Endowment Fund, students are the focus. Their stories reflect our mission: to support, inspire and prepare.',
      rating: '4.5',
    },
    {
      n: 'Nilufar Rashidova',
      r: 'Developer',
      q: 'Fund programmes are practice-oriented. Through grants and internships I gained real experience.',
      rating: '4.5',
    },
    {
      n: 'Zulfiya Ergasheva',
      r: 'Designer',
      q: 'Every donation and grant is directed to a clear purpose. Transparency is our core principle.',
      rating: '4.5',
    },
    {
      n: 'TDYU Alumni',
      r: 'Senior lecturer',
      q: 'At TDYU Endowment Fund, students are the focus. Their stories reflect our mission: to support, inspire and prepare.',
      rating: '4.5',
    },
    {
      n: 'Aziz Karimov',
      r: 'Manager',
      q: 'Fund programmes are practice-oriented. Through grants and internships I gained real experience.',
      rating: '4.5',
    },
    {
      n: 'Nilufar Rashidova',
      r: 'Researcher',
      q: 'Every donation and grant is directed to a clear purpose. Transparency is our core principle.',
      rating: '4.5',
    },
    {
      n: 'Zulfiya Ergasheva',
      r: 'Digital marketing',
      q: 'At TDYU Endowment Fund, students are the focus. Their stories reflect our mission: to support, inspire and prepare.',
      rating: '4.5',
    },
  ],
} as const

const COPY = {
  uz: { eyebrow: 'Alumni fikrlari', title: 'Alumni muvaffaqiyat tarixlari' },
  ru: { eyebrow: 'Отзывы alumni', title: 'Истории успеха alumni' },
  en: { eyebrow: 'Alumni stories', title: 'Alumni success stories' },
} as const

function EyebrowIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M5.21484 12.8949V16.6564C5.21484 16.6564 8.82175 15.1537 12.0198 15.1537C15.2178 15.1537 18.8255 16.6564 18.8255 16.6564V12.8424C18.8255 12.8424 15.3844 11.0225 11.9665 11.0225C8.55018 11.021 5.21484 12.8949 5.21484 12.8949Z" />
      <path d="M22.6467 11.9993L24 11.2716L22.6467 10.5222V10.1666C22.6467 10.1666 23.0278 8.23413 20.862 9.24464C20.7517 9.30465 20.6924 9.36542 20.6684 9.42468L11.7367 4.47119L0 11.1884L4.43211 13.2019V12.5485C4.43211 12.5485 8.15079 10.4607 11.9625 10.4607C15.7734 10.4607 19.6092 12.4899 19.6092 12.4899V13.631L22.0563 12.3167V17.6377H21.2416V19.529L22.3248 18.7803L23.5274 19.529V17.637H22.6467V11.9993ZM22.0555 9.83803V10.1944L21.3413 9.79827C21.6017 9.62573 22.0555 9.38642 22.0555 9.83803ZM21.814 11.9251C21.737 11.9279 21.6603 11.9152 21.5883 11.8877C21.5164 11.8602 21.4507 11.8185 21.3952 11.7651C21.3398 11.7117 21.2956 11.6476 21.2655 11.5768C21.2353 11.5059 21.2198 11.4297 21.2197 11.3527C21.2197 11.2757 21.2351 11.1994 21.2652 11.1285C21.2953 11.0576 21.3393 10.9935 21.3947 10.94C21.4501 10.8865 21.5157 10.8447 21.5876 10.8172C21.6595 10.7896 21.7362 10.7768 21.8132 10.7795C21.9615 10.7848 22.102 10.8474 22.2051 10.9542C22.3082 11.0609 22.3659 11.2035 22.366 11.3519C22.3661 11.5003 22.3086 11.643 22.2056 11.7499C22.1027 11.8568 21.9623 11.9196 21.814 11.9251Z" />
    </svg>
  )
}

function QuoteIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="44" viewBox="0 0 60 44" fill="none" aria-hidden>
      <path
        d="M0.720703 11.624C2.05985 4.27024 9.11653 -0.618174 16.4697 0.720703C23.6971 2.03676 28.5612 9.17643 28.1611 16.2275L28.1377 16.5635C27.4789 24.8299 22.2284 35.1586 10.207 42.3857L9.62988 42.7275C9.0368 43.0735 8.27986 42.3888 8.64453 41.7266L8.64648 41.7227C10.1681 38.9033 12.0827 34.3794 13.2168 28.1084L13.3135 27.5732L12.7715 27.5215C4.75888 26.7561 -0.682171 19.3398 0.720703 11.624ZM32.0371 11.624C33.3763 4.27025 40.4329 -0.618173 47.7861 0.720703C55.0134 2.03682 59.8776 9.17648 59.4775 16.2275L59.4541 16.5635C58.7849 24.9611 53.3772 35.487 40.9463 42.7275H40.9453C40.3523 43.0733 39.5962 42.3887 39.9609 41.7266L39.9629 41.7227C41.4845 38.9033 43.3991 34.3794 44.5332 28.1084L44.6299 27.5732L44.0879 27.5215C36.0752 26.7561 30.6342 19.3399 32.0371 11.624Z"
        stroke="white"
      />
    </svg>
  )
}

function StarIcon({ half = false }: { half?: boolean }) {
  if (half) {
    return (
      <svg className="testi-star" width="18" height="18" viewBox="0 0 24 24" aria-hidden>
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
    <svg className="testi-star" width="18" height="18" viewBox="0 0 24 24" fill="#ff8e2b" aria-hidden>
      <path d="M12 2.5l2.9 6.1 6.6.7-4.9 4.5 1.4 6.5L12 16.8 5.9 20.3l1.4-6.5-4.9-4.5 6.6-.7L12 2.5z" />
    </svg>
  )
}

function useVisible() {
  const [visible, setVisible] = useState(3)

  useEffect(() => {
    const read = () => {
      if (window.matchMedia('(min-width: 1024px)').matches) setVisible(3)
      else if (window.matchMedia('(min-width: 640px)').matches) setVisible(2)
      else setVisible(1)
    }
    read()
    window.addEventListener('resize', read)
    return () => window.removeEventListener('resize', read)
  }, [])

  return visible
}

function TestimonialCard({ item }: { item: (typeof STORIES)['uz'][number] }) {
  return (
    <article className="testi-card">
      <div className="testi-card-quote" aria-hidden>
        <QuoteIcon />
      </div>

      <div className="testi-card-top">
        <h5 className="testi-card-name">{item.n}</h5>
        <p className="testi-card-role">{item.r}</p>
      </div>

      <div className="testi-card-ratings">
        <span className="testi-card-rating-count">{item.rating}</span>
        <span className="testi-card-stars" aria-hidden>
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarIcon half />
        </span>
      </div>

      <p className="testi-card-quote-text">“{item.q}”</p>
    </article>
  )
}

export function TestimonialsSection({ locale }: { locale: Locale }) {
  const t = COPY[locale]
  const items = STORIES[locale]
  const visible = useVisible()
  const [index, setIndex] = useState(0)

  // Dump slider_loop: true — oxirida clone slide lar
  const trackItems = [...items, ...items.slice(0, visible)]

  return (
    <section className="testi-section" aria-labelledby="testi-section-heading">
      <Image
        src="/media/home/cyan-testi-bg1.png"
        alt=""
        width={420}
        height={420}
        className="testi-section-deco testi-section-deco--bg pointer-events-none absolute hidden lg:block"
        unoptimized
      />
      <Image
        src="/media/home/testimonial-shape-2.png"
        alt=""
        width={120}
        height={120}
        className="testi-section-deco testi-section-deco--shape pointer-events-none absolute hidden md:block"
        unoptimized
      />

      <div className="live-wrap testi-section-inner relative z-10 px-2.5 lg:px-5">
        <div className="testi-section-heading">
          <p className="testi-section-eyebrow">
            <EyebrowIcon />
            {t.eyebrow}
          </p>
          <h2 id="testi-section-heading" className="testi-section-title">
            {t.title}
          </h2>
        </div>

        <div className="testi-slider">
          <div className="testi-slider-viewport">
            <div
              className="testi-slider-track"
              style={{ transform: `translateX(-${index * (100 / visible)}%)` }}
            >
              {trackItems.map((item, i) => (
                <div key={`${item.n}-${item.r}-${i}`} className="testi-slider-slide" style={{ width: `${100 / visible}%` }}>
                  <TestimonialCard item={item} />
                </div>
              ))}
            </div>
          </div>

          <div className="testi-slider-dots" role="tablist" aria-label={t.title}>
            {items.map((item, i) => (
              <button
                key={`${item.n}-${item.r}-dot-${i}`}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`${i + 1}`}
                className={`testi-slider-dot${i === index ? ' is-active' : ''}`}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
