'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { loc } from './loc'

type AlumniCard = {
  id: string
  image: string
  author: string
  date: string
  title: string
  titleRu: string
  titleEn: string
  excerpt: string
  excerptRu: string
  excerptEn: string
  cats: string[]
}

const CARDS: AlumniCard[] = [
  {
    id: 'aziz',
    image: '/media/dump/alumni/alamni-team-3.jpg',
    author: 'tanvir',
    date: 'Dekabr 15, 2025',
    title: 'Aziz Karimov',
    titleRu: 'Азиз Каримов',
    titleEn: 'Aziz Karimov',
    excerpt: 'Senior Associate, Clifford Chance · London. TDYU xalqaro huquq poydevori.',
    excerptRu: 'Senior Associate, Clifford Chance · Лондон. Фундамент международного права TDYU.',
    excerptEn: 'Senior Associate, Clifford Chance · London. TDYU international law foundation.',
    cats: ['alumni', 'talim'],
  },
  {
    id: 'nilufar',
    image: '/media/dump/alumni/alamni-team-2.jpg',
    author: 'tanvir',
    date: 'Dekabr 15, 2025',
    title: 'Nilufar Rashidova',
    titleRu: 'Нилуфар Рашидова',
    titleEn: 'Nilufar Rashidova',
    excerpt: 'Legal Counsel, UN Office · Jeneva. Fond stipendiyasi bilan tahsil oldi.',
    excerptRu: 'Legal Counsel, UN Office · Женева. Училась по стипендии фонда.',
    excerptEn: 'Legal Counsel, UN Office · Geneva. Studied with a fund scholarship.',
    cats: ['alumni', 'talim'],
  },
  {
    id: 'zulfiya',
    image: '/media/dump/alumni/alamni-team-1.jpg',
    author: 'tanvir',
    date: 'Dekabr 15, 2025',
    title: 'Zulfiya Ergasheva',
    titleRu: 'Зульфия Эргашева',
    titleEn: 'Zulfiya Ergasheva',
    excerpt: 'Professor, Heidelberg Universiteti · Germaniya.',
    excerptRu: 'Профессор, Университет Гейдельберга · Германия.',
    excerptEn: 'Professor, Heidelberg University · Germany.',
    cats: ['alumni', 'talim'],
  },
  {
    id: 'network',
    image: '/media/dump/alumni/e-viva-img3-min.jpg',
    author: 'TDYU',
    date: 'Dekabr 9, 2025',
    title: 'TDYU Alumni',
    titleRu: 'TDYU Alumni',
    titleEn: 'TDYU Alumni',
    excerpt: 'Davlat xizmati va yuridik amaliyotdagi bitiruvchilar tarmog‘i.',
    excerptRu: 'Сеть выпускников в государственной службе и юридической практике.',
    excerptEn: 'Alumni network in public service and legal practice.',
    cats: ['alumni', 'loyihalar'],
  },
  {
    id: 'grad',
    image: '/media/dump/alumni/e-viva-img2-min.jpg',
    author: 'TDYU',
    date: 'Dekabr 9, 2025',
    title: 'TDYU bitiruvchisi',
    titleRu: 'Выпускник TDYU',
    titleEn: 'TDYU graduate',
    excerpt: 'Xalqaro stajirovka va akademik martaba yo‘lidagi bitiruvchilar.',
    excerptRu: 'Выпускники на пути международных стажировок и академической карьеры.',
    excerptEn: 'Graduates on the path of international internships and academic careers.',
    cats: ['talim', 'loyihalar'],
  },
  {
    id: 'audit',
    image: '/media/dump/alumni/e-viva-img1-min.jpg',
    author: 'TDYU',
    date: 'Dekabr 9, 2025',
    title: 'Taftish a’zosi',
    titleRu: 'Член ревизии',
    titleEn: 'Audit member',
    excerpt: 'Xalqaro amaliyot va raqamli huquq yo‘nalishidagi bitiruvchi.',
    excerptRu: 'Выпускник в сфере международной практики и цифрового права.',
    excerptEn: 'Graduate in international practice and digital law.',
    cats: ['onlayn', 'tdyu'],
  },
]

const CATEGORIES = [
  { id: 'alumni', uz: 'Alumni', ru: 'Alumni', en: 'Alumni', count: 4 },
  { id: 'talim', uz: 'Ta’lim', ru: 'Образование', en: 'Education', count: 4 },
  { id: 'onlayn', uz: 'Onlayn', ru: 'Онлайн', en: 'Online', count: 1 },
  { id: 'loyihalar', uz: 'Loyihalar', ru: 'Проекты', en: 'Projects', count: 2 },
  { id: 'tdyu', uz: 'TDYU', ru: 'TDYU', en: 'TDYU', count: 1 },
] as const

const LATEST = [
  {
    image: '/media/dump/alumni/e-bl-img1-8-min.jpg',
    date: 'Dekabr 9, 2025',
    title: 'II Turk dunyosi yosh akademiklar kongressi',
    titleRu: 'II Конгресс молодых академиков тюркского мира',
    titleEn: 'II Turkic World Young Academics Congress',
  },
  {
    image: '/media/dump/alumni/e-bl-img1-10-min.jpg',
    date: 'Dekabr 9, 2025',
    title: 'Koreya iqtisodiy huquqi darsligi nashr etildi',
    titleRu: 'Издан учебник корейского экономического права',
    titleEn: 'Korean economic law textbook published',
  },
  {
    image: '/media/dump/alumni/e-bl-img1-11-min.jpg',
    date: 'Dekabr 9, 2025',
    title: '42 o‘qituvchi Westminster dasturini yakunladi',
    titleRu: '42 преподавателя завершили программу Westminster',
    titleEn: '42 teachers completed the Westminster programme',
  },
] as const

function UserIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M20 21a8 8 0 0 0-16 0" />
      <circle cx="12" cy="8" r="4" />
    </svg>
  )
}

function CalendarIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M16 3v4M8 3v4M3 11h18" />
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z" />
    </svg>
  )
}

export function AlumniArchive({ locale }: { locale: Locale }) {
  const [query, setQuery] = useState('')
  const [cat, setCat] = useState<string | null>(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return CARDS.filter((card) => {
      if (cat && !card.cats.includes(cat)) return false
      if (!q) return true
      const hay = [
        card.title,
        card.titleRu,
        card.titleEn,
        card.excerpt,
        card.excerptRu,
        card.excerptEn,
        card.author,
      ]
        .join(' ')
        .toLowerCase()
      return hay.includes(q)
    })
  }, [query, cat])

  return (
    <div className="alumni-shell-inner">
      <div className="alumni-main">
        {filtered.length === 0 ? (
          <p className="alumni-empty">
            {loc(locale, 'Natija topilmadi.', 'Ничего не найдено.', 'No results found.')}
          </p>
        ) : (
          filtered.map((card) => (
            <article key={card.id} className="alumni-card">
              <div className="alumni-card-media">
                <Image src={card.image} alt="" width={561} height={486} className="object-cover w-full h-full" unoptimized />
              </div>
              <div className="alumni-card-body">
                <div className="alumni-card-meta">
                  <span className="alumni-meta-item">
                    <UserIcon />
                    {card.author}
                  </span>
                  <span className="alumni-meta-item">
                    <CalendarIcon />
                    {card.date}
                  </span>
                </div>
                <h3 className="alumni-card-title">
                  <Link href="/alumni">{loc(locale, card.title, card.titleRu, card.titleEn)}</Link>
                </h3>
                <p className="alumni-card-excerpt">
                  {loc(locale, card.excerpt, card.excerptRu, card.excerptEn)}
                </p>
                <Link href="/alumni" className="alumni-read-more">
                  {loc(locale, 'Batafsil', 'Подробнее', 'Read more')}
                </Link>
              </div>
            </article>
          ))
        )}
      </div>

      <aside className="alumni-sidebar">
        <div className="alumni-sidebar-sticky">
          <div className="alumni-widget">
            <h4 className="alumni-widget-title">{loc(locale, 'Qidirish', 'Поиск', 'Search')}</h4>
            <form
              className="alumni-search"
              onSubmit={(e) => {
                e.preventDefault()
              }}
              role="search"
            >
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={loc(locale, 'Kalit so‘z...', 'Ключевое слово...', 'Keyword...')}
                aria-label={loc(locale, 'Qidirish', 'Поиск', 'Search')}
              />
              <button type="submit" className="alumni-search-btn" aria-label={loc(locale, 'Qidirish', 'Поиск', 'Search')}>
                <SearchIcon />
              </button>
            </form>
          </div>

          <div className="alumni-widget">
            <h4 className="alumni-widget-title">{loc(locale, 'Bo‘limlar', 'Разделы', 'Categories')}</h4>
            <ul className="alumni-cats">
              <li>
                <button
                  type="button"
                  className={['alumni-cat', cat === null ? 'is-active' : ''].filter(Boolean).join(' ')}
                  onClick={() => setCat(null)}
                >
                  <span>{loc(locale, 'Barchasi', 'Все', 'All')}</span>
                  <span>({CARDS.length})</span>
                </button>
              </li>
              {CATEGORIES.map((c) => (
                <li key={c.id}>
                  <button
                    type="button"
                    className={['alumni-cat', cat === c.id ? 'is-active' : ''].filter(Boolean).join(' ')}
                    onClick={() => setCat(cat === c.id ? null : c.id)}
                  >
                    <span>{loc(locale, c.uz, c.ru, c.en)}</span>
                    <span>({c.count})</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="alumni-widget">
            <h4 className="alumni-widget-title">
              {loc(locale, 'So‘nggi yangiliklar', 'Последние новости', 'Latest news')}
            </h4>
            <div className="alumni-latest">
              {LATEST.map((item) => (
                <Link key={item.image} href="/news" className="alumni-latest-item">
                  <span className="alumni-latest-thumb">
                    <Image src={item.image} alt="" width={80} height={80} className="object-cover w-full h-full" unoptimized />
                  </span>
                  <span className="alumni-latest-body">
                    <span className="alumni-latest-date">
                      <CalendarIcon />
                      {item.date}
                    </span>
                    <span className="alumni-latest-title">{loc(locale, item.title, item.titleRu, item.titleEn)}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </div>
  )
}
