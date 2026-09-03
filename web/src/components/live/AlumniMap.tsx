'use client'

import { useMemo, useState } from 'react'
import type { Locale } from '@/i18n/routing'
import { Link } from '@/i18n/navigation'
import type { AlumniMapCategoryId } from '@/content/alumni'
import {
  COUNTRY_PIECES,
  MAP_CATEGORIES,
  MUTED_LANDS,
  getAlumniMapPins,
  localizeCountry,
  localizePin,
  type AlumniCountryId,
  type AlumniMapPin,
} from '@/content/alumniMap'
import { loc } from './loc'

function EyebrowIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M5.2 12.9v3.8s3.6-1.5 6.8-1.5 6.8 1.5 6.8 1.5v-3.8s-3.4-1.8-6.9-1.8-6.7 1.8-6.7 1.8Z" />
      <path d="M22.6 12 24 11.3l-1.4-.8V10s.4-1.9-1.8-.9l-.2.2L11.7 4.5 0 11.2l4.4 2v-.7s3.7-2.1 7.5-2.1 7.6 2 7.6 2v1.1l2.5-1.3V17.6h-.8v1.9l1.1-.7 1.2.7v-1.9h-.9V12Z" />
    </svg>
  )
}

export function AlumniMap({ locale }: { locale: Locale }) {
  const pins = useMemo(() => getAlumniMapPins(), [])
  const [tab, setTab] = useState<'all' | AlumniMapCategoryId>('all')
  const [hoverId, setHoverId] = useState<AlumniCountryId | null>(null)
  const [activeId, setActiveId] = useState<AlumniCountryId | null>('uz')

  const filtered = useMemo(() => {
    if (tab === 'all') return pins
    return pins.filter((p) => p.category === tab)
  }, [pins, tab])

  const byCountry = useMemo(() => {
    const map = new Map<AlumniCountryId, AlumniMapPin[]>()
    for (const pin of filtered) {
      const list = map.get(pin.countryId) || []
      list.push(pin)
      map.set(pin.countryId, list)
    }
    return map
  }, [filtered])

  const activeCountries = useMemo(() => new Set(byCountry.keys()), [byCountry])

  const focusId = (hoverId && activeCountries.has(hoverId) ? hoverId : null) || (activeId && activeCountries.has(activeId) ? activeId : null) || [...activeCountries][0] || null

  const focusPins = focusId ? byCountry.get(focusId) || [] : []
  const focusPiece = COUNTRY_PIECES.find((c) => c.id === focusId) || null
  const primary = focusPins[0] || null

  const countryCount = activeCountries.size

  return (
    <section className="alumni-map-section" aria-labelledby="alumni-map-heading">
      <div className="live-wrap alumni-map-inner px-2.5 lg:px-5">
        <header className="alumni-map-intro">
          <p className="alumni-map-eyebrow">
            <EyebrowIcon />
            {loc(locale, 'Alumni xaritasi', 'Карта alumni', 'Alumni map')}
          </p>
          <div className="alumni-map-intro-row">
            <h2 id="alumni-map-heading" className="alumni-map-heading">
              {loc(locale, 'TDYU bitiruvchilari butun dunyoda', 'Выпускники TDYU по всему миру', 'TDYU graduates worldwide')}
            </h2>
            <p className="alumni-map-lead">
              {loc(
                locale,
                'Har bir davlat — alohida bo‘lak. Ustiga boring: rang o‘zgaradi va alumni ma’lumoti chiqadi.',
                'Каждая страна — отдельный фрагмент. Наведите: цвет меняется и появляется информация об alumni.',
                'Each country is a separate piece. Hover to highlight and see alumni details.',
              )}
            </p>
          </div>
        </header>

        <div className="alumni-map-meta">
          <div className="alumni-map-stats">
            <div>
              <strong>{filtered.length}</strong>
              <span>{loc(locale, 'Alumni', 'Alumni', 'Alumni')}</span>
            </div>
            <div>
              <strong>{countryCount}</strong>
              <span>{loc(locale, 'Davlat', 'Страны', 'Countries')}</span>
            </div>
          </div>

          <div className="alumni-map-tabs" role="tablist">
            {MAP_CATEGORIES.map((c) => {
              const on = tab === c.id
              const n = c.id === 'all' ? pins.length : pins.filter((p) => p.category === c.id).length
              return (
                <button
                  key={c.id}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  className={`alumni-map-tab${on ? ' is-on' : ''}`}
                  onClick={() => {
                    setTab(c.id)
                    setActiveId(null)
                  }}
                >
                  {loc(locale, c.uz, c.ru, c.en)}
                  <em>{n}</em>
                </button>
              )
            })}
          </div>
        </div>

        <div className="alumni-map-board">
          <svg viewBox="0 0 1000 480" className="alumni-map-svg" role="img" aria-label={loc(locale, 'Dunyo xaritasi', 'Карта мира', 'World map')}>
            <rect width="1000" height="480" fill="#f6f4ee" />

            {MUTED_LANDS.map((d, i) => (
              <path key={i} d={d} className="alumni-map-land" />
            ))}

            {COUNTRY_PIECES.map((piece) => {
              const has = activeCountries.has(piece.id)
              const isFocus = focusId === piece.id
              const count = byCountry.get(piece.id)?.length || 0
              return (
                <g key={piece.id}>
                  <path
                    d={piece.d}
                    className={[
                      'alumni-map-country',
                      has ? 'is-active' : 'is-idle',
                      isFocus ? 'is-focus' : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    onMouseEnter={() => has && setHoverId(piece.id)}
                    onMouseLeave={() => setHoverId(null)}
                    onClick={() => has && setActiveId(piece.id)}
                    style={{ cursor: has ? 'pointer' : 'default' }}
                  >
                    <title>
                      {localizeCountry(piece, locale)}
                      {has ? ` · ${count}` : ''}
                    </title>
                  </path>
                  {has && (
                    <text
                      x={piece.labelX}
                      y={piece.labelY}
                      className={`alumni-map-count${isFocus ? ' is-focus' : ''}`}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      {count}
                    </text>
                  )}
                </g>
              )
            })}
          </svg>

          {focusPiece && primary && (
            <aside className="alumni-map-panel" aria-live="polite">
              <p className="alumni-map-panel-country">{localizeCountry(focusPiece, locale)}</p>
              <p className="alumni-map-panel-count">
                {focusPins.length} {loc(locale, 'alumni', 'alumni', 'alumni')}
              </p>
              <ul className="alumni-map-panel-list">
                {focusPins.slice(0, 3).map((pin) => {
                  const L = localizePin(pin, locale)
                  return (
                    <li key={pin.id}>
                      <strong>{L.name}</strong>
                      <span>{L.role}</span>
                      {pin.year && <em>{pin.year}</em>}
                    </li>
                  )
                })}
              </ul>
              {primary.slug && (
                <Link href={`/alumni/${primary.slug}`} className="alumni-map-panel-link">
                  {loc(locale, 'Profilni ko‘rish', 'Смотреть профиль', 'View profile')}
                </Link>
              )}
              <Link href="/alumni" className="alumni-map-panel-more">
                {loc(locale, 'Barcha alumni', 'Все alumni', 'All alumni')}
              </Link>
            </aside>
          )}
        </div>
      </div>
    </section>
  )
}
