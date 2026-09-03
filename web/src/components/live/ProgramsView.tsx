'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { usePathname } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import {
  PROGRAMS,
  type ProgramAudience,
  type ProgramDirection,
  type ProgramFunding,
} from '@/content/programs'
import { PageHero } from './PageHero'
import { loc } from './loc'

type Direction = ProgramDirection
type Audience = ProgramAudience
type Funding = ProgramFunding

const DIRECTIONS = [
  { id: '01' as const, uz: '01 - Xalqaro stajirovka', ru: '01 - Стажировка', en: '01 - Internship' },
  { id: '02' as const, uz: '02 - Stipendiya va grant', ru: '02 - Стипендии и гранты', en: '02 - Scholarships' },
  { id: '03' as const, uz: '03 - Tanlovlar', ru: '03 - Конкурсы', en: '03 - Contests' },
  { id: '04' as const, uz: '04 - Ilmiy loyihalar', ru: '04 - Научные проекты', en: '04 - Research' },
  { id: '05' as const, uz: '05 - Xalqaro tadbirlar', ru: '05 - Мероприятия', en: '05 - Events' },
  { id: '06' as const, uz: '06 - Infratuzilma', ru: '06 - Инфраструктура', en: '06 - Infrastructure' },
  { id: '07' as const, uz: '07 - Nashrlar', ru: '07 - Издания', en: '07 - Publications' },
]

const AUDIENCES = [
  { id: 'talaba' as const, uz: 'Talaba', ru: 'Студент', en: 'Student' },
  { id: 'xodim' as const, uz: 'Xodim / o‘qituvchi', ru: 'Сотрудник / преподаватель', en: 'Staff / teacher' },
  { id: 'doktorant' as const, uz: 'Doktorant', ru: 'Докторант', en: 'Doctoral' },
  { id: 'alumni' as const, uz: 'Alumni', ru: 'Alumni', en: 'Alumni' },
  { id: 'hamkor' as const, uz: 'Hamkor tashkilot', ru: 'Партнёрская организация', en: 'Partner organisation' },
]

const FUNDING = [
  { id: 'full' as const, uz: 'To‘liq moliyalashtirish', ru: 'Полное финансирование', en: 'Full funding' },
  { id: 'partial' as const, uz: 'Qisman moliyalashtirish', ru: 'Частичное финансирование', en: 'Partial funding' },
  { id: 'donate' as const, uz: 'Xayriya hisobidan', ru: 'За счёт пожертвований', en: 'From donations' },
]

const PAGE_SIZE = 4

function toggleIn<T extends string>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((x) => x !== value) : [...list, value]
}

function PlusIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="10" fill="#00ADE2" />
      <path d="M12 7v10M7 12h10" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.031 16.617 22.314 20.9l-1.414 1.414-4.283-4.283A8 8 0 1 1 18 11a8 8 0 0 1 .031 5.617ZM16.025 15.875A6 6 0 1 0 4 11a6 6 0 0 0 12.025 4.875Z" />
    </svg>
  )
}

function readHashDirection(): Direction | null {
  if (typeof window === 'undefined') return null
  const h = window.location.hash.replace(/^#/, '')
  if (h === '01' || h === '02' || h === '03' || h === '04' || h === '05' || h === '06' || h === '07') return h
  return null
}

export function ProgramsView({ locale }: { locale: Locale }) {
  const pathname = usePathname()
  const [directions, setDirections] = useState<Direction[]>([])
  const [audiences, setAudiences] = useState<Audience[]>([])
  const [funding, setFunding] = useState<Funding[]>([])
  const [query, setQuery] = useState('')
  const [dirMore, setDirMore] = useState(false)
  const [audMore, setAudMore] = useState(false)
  const [visible, setVisible] = useState(PAGE_SIZE)

  useEffect(() => {
    const apply = () => {
      const d = readHashDirection()
      if (d) setDirections([d])
    }
    apply()
    window.addEventListener('hashchange', apply)
    return () => window.removeEventListener('hashchange', apply)
  }, [pathname])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return PROGRAMS.filter((p) => {
      if (directions.length && !directions.includes(p.direction)) return false
      if (audiences.length && !audiences.some((a) => p.audiences.includes(a))) return false
      if (funding.length && !funding.some((f) => p.funding.includes(f))) return false
      if (q) {
        const copy = p[locale]
        const hay = `${copy.t} ${copy.d} ${copy.tags.join(' ')}`.toLowerCase()
        if (!hay.includes(q)) return false
      }
      return true
    })
  }, [directions, audiences, funding, query, locale])

  useEffect(() => {
    setVisible(PAGE_SIZE)
  }, [directions, audiences, funding, query])

  const shown = filtered.slice(0, visible)
  const dirItems = dirMore ? DIRECTIONS : DIRECTIONS.slice(0, 5)
  const audItems = audMore ? AUDIENCES : AUDIENCES.slice(0, 5)

  const clearFilters = () => {
    setDirections([])
    setAudiences([])
    setFunding([])
    setQuery('')
    window.history.replaceState(null, '', pathname)
  }

  return (
    <>
      <PageHero
        image="/media/dump/page-bnr-img22-min.jpg"
        height={413}
        deco="/brand/tdyu-mark.svg"
        title={loc(locale, 'Dasturlar', 'Программы', 'Programs')}
        lead={loc(
          locale,
          'TDYU Endowment Fund — bilim, grant va xalqaro imkoniyatlarga sarmoya.',
          'TDYU Endowment Fund — инвестиции в знания, гранты и международные возможности.',
          'TDYU Endowment Fund — an investment in knowledge, grants and international opportunity.',
        )}
        crumbs={[
          { href: '/', label: loc(locale, 'Bosh', 'Главная', 'Home') },
          { href: '/programs', label: loc(locale, 'Dasturlar', 'Программы', 'Programs') },
        ]}
      />

      <section className="programs-page">
        <div className="live-wrap programs-layout">
          {/* Chap: filtr sticky */}
          <aside className="programs-filter" aria-label={loc(locale, 'Filtrlash', 'Фильтр', 'Filter')}>
            <div className="programs-filter-card">
              <div className="programs-filter-head">
                <h2 className="programs-filter-title">{loc(locale, 'Filtrlash', 'Фильтр', 'Filter')}</h2>
                <button type="button" className="programs-filter-clear" onClick={clearFilters}>
                  {loc(locale, 'Tozalash', 'Сбросить', 'Clear')}
                </button>
              </div>

              <div className="programs-filter-group">
                <h3 className="programs-filter-group-title">
                  {loc(locale, 'Dastur yo‘nalishlari', 'Направления программ', 'Program directions')}
                </h3>
                <ul className="programs-filter-options">
                  {dirItems.map((item) => (
                    <li key={item.id}>
                      <label className="programs-check">
                        <input
                          type="checkbox"
                          checked={directions.includes(item.id)}
                          onChange={() => {
                            const next = toggleIn(directions, item.id)
                            setDirections(next)
                            if (next.length === 1) window.history.replaceState(null, '', `${pathname}#${next[0]}`)
                            else window.history.replaceState(null, '', pathname)
                          }}
                        />
                        <span>{loc(locale, item.uz, item.ru, item.en)}</span>
                      </label>
                    </li>
                  ))}
                </ul>
                {DIRECTIONS.length > 5 ? (
                  <button type="button" className="programs-more-link" onClick={() => setDirMore((v) => !v)}>
                    {dirMore ? loc(locale, 'Kamroq', 'Меньше', 'Less') : loc(locale, 'Ko‘proq', 'Ещё', 'More')}
                  </button>
                ) : null}
              </div>

              <div className="programs-filter-group">
                <h3 className="programs-filter-group-title">
                  {loc(locale, 'Ishtirokchilar', 'Участники', 'Participants')}
                </h3>
                <ul className="programs-filter-options">
                  {audItems.map((item) => (
                    <li key={item.id}>
                      <label className="programs-check">
                        <input
                          type="checkbox"
                          checked={audiences.includes(item.id)}
                          onChange={() => setAudiences(toggleIn(audiences, item.id))}
                        />
                        <span>{loc(locale, item.uz, item.ru, item.en)}</span>
                      </label>
                    </li>
                  ))}
                </ul>
                {AUDIENCES.length > 5 ? (
                  <button type="button" className="programs-more-link" onClick={() => setAudMore((v) => !v)}>
                    {audMore ? loc(locale, 'Kamroq', 'Меньше', 'Less') : loc(locale, 'Ko‘proq', 'Ещё', 'More')}
                  </button>
                ) : null}
              </div>

              <div className="programs-filter-group">
                <h3 className="programs-filter-group-title">
                  {loc(locale, 'Moliyalashtirish', 'Финансирование', 'Funding')}
                </h3>
                <ul className="programs-filter-options">
                  {FUNDING.map((item) => (
                    <li key={item.id}>
                      <label className="programs-check">
                        <input
                          type="checkbox"
                          checked={funding.includes(item.id)}
                          onChange={() => setFunding(toggleIn(funding, item.id))}
                        />
                        <span>{loc(locale, item.uz, item.ru, item.en)}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>

          {/* O‘ng: kartalar skroll */}
          <div className="programs-results">
            <div className="programs-results-bar">
              <p className="programs-results-count">
                {loc(
                  locale,
                  `Jami ${filtered.length} ta dastur`,
                  `Всего ${filtered.length} программ`,
                  `${filtered.length} programs`,
                )}
              </p>
              <label className="programs-search">
                <span className="sr-only">{loc(locale, 'Qidirish', 'Поиск', 'Search')}</span>
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={loc(locale, 'Kalit so‘z...', 'Ключевое слово...', 'Keyword...')}
                />
                <SearchIcon />
              </label>
            </div>

            <div className="programs-cards">
              {shown.map((p) => {
                const copy = p[locale]
                return (
                  <article key={p.id} id={`program-${p.id}`} className="programs-card scroll-mt-28">
                    <div className="programs-card-body">
                      <h3 className="programs-card-title">
                        <Link href={`/programs/${p.id}`}>{copy.t}</Link>
                      </h3>
                      <div className="programs-card-tags">
                        {copy.tags.map((tag) => (
                          <span key={tag} className="programs-card-tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <p className="programs-card-desc">{copy.d}</p>
                      <Link href={`/programs/${p.id}`} className="programs-card-link">
                        {loc(locale, 'Batafsil', 'Подробнее', 'Details')}
                        <PlusIcon />
                      </Link>
                    </div>
                    <div className="programs-card-media">
                      <Link href={`/programs/${p.id}`}>
                        <Image src={p.img} alt="" width={280} height={200} className="h-full w-full object-cover" unoptimized />
                      </Link>
                    </div>
                  </article>
                )
              })}
            </div>

            {filtered.length === 0 ? (
              <p className="programs-empty">
                {loc(locale, 'Mos dastur topilmadi.', 'Подходящих программ нет.', 'No matching programs.')}
              </p>
            ) : null}

            {visible < filtered.length ? (
              <div className="programs-load-more-wrap">
                <button type="button" className="programs-load-more" onClick={() => setVisible((n) => n + PAGE_SIZE)}>
                  {loc(locale, 'Ko‘proq', 'Ещё', 'More')}
                </button>
              </div>
            ) : null}
          </div>

          {/* O‘ng: filtr sticky — skrol qilganda joyida qoladi */}
          
        </div>
      </section>
    </>
  )
}
