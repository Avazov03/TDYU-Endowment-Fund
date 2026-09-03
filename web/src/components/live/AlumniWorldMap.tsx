'use client'

import { useEffect, useMemo, useState } from 'react'
import { MapContainer, TileLayer, CircleMarker, Tooltip, ZoomControl, useMap } from 'react-leaflet'
import type { Locale } from '@/i18n/routing'
import { Link } from '@/i18n/navigation'
import { localizeAlumni, type AlumniMapCategoryId, type AlumniPerson } from '@/content/alumni'
import { loc } from './loc'

import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

const TAB_DEFS: Array<{
  id: 'all' | AlumniMapCategoryId
  uz: string
  ru: string
  en: string
}> = [
  { id: 'all', uz: 'Barchasi', ru: 'Все', en: 'All' },
  { id: 'law', uz: 'Yuristlar / Advokatlar', ru: 'Юристы / Адвокаты', en: 'Lawyers / Attorneys' },
  { id: 'state', uz: 'Davlat xizimati', ru: 'Госслужба', en: 'Public service' },
  { id: 'academia', uz: 'Akademiya / Fan', ru: 'Академия / Наука', en: 'Academia / Science' },
  { id: 'international', uz: 'Xalqaro tashkilotlar', ru: 'Международные организации', en: 'International organizations' },
]

const COLOR_BY_CATEGORY: Record<AlumniMapCategoryId, string> = {
  law: '#00ADE2',
  state: '#0C5776',
  academia: '#0C5776',
  international: '#00ADE2',
}

function FitBounds({ bounds }: { bounds: L.LatLngBounds | null }) {
  const map = useMap()

  useEffect(() => {
    if (!bounds) return
    map.fitBounds(bounds, { padding: [30, 30], animate: true })
  }, [bounds, map])

  return null
}

function getYearFromRole(role: string) {
  const m = role.match(/\b(19\d{2}|20\d{2})\b/)
  return m ? m[1] : null
}

export function AlumniWorldMap({ locale, people }: { locale: Locale; people: AlumniPerson[] }) {
  const [activeTab, setActiveTab] = useState<(typeof TAB_DEFS)[number]['id']>('all')
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null)

  const points = useMemo(() => {
    return people
      .filter((p) => p.mapLocation && p.mapCategory)
      .map((p) => ({
        person: p,
        category: p.mapCategory as AlumniMapCategoryId,
      }))
  }, [people])

  const pointsAll = useMemo(() => {
    return people.filter((p) => p.mapLocation).map((p) => ({ person: p, category: p.mapCategory ?? null }))
  }, [people])

  const filtered = useMemo(() => {
    if (activeTab === 'all') return pointsAll
    return points.filter((p) => p.category === activeTab)
  }, [activeTab, points, pointsAll])

  const filteredKey = useMemo(() => filtered.map((p) => p.person.slug).join('|'), [filtered])

  useEffect(() => {
    if (filtered.length === 0) {
      setSelectedSlug(null)
      return
    }
    setSelectedSlug((prev) => (prev && filtered.some((p) => p.person.slug === prev) ? prev : filtered[0].person.slug))
  }, [filtered, filteredKey])

  const selected = useMemo(() => filtered.find((p) => p.person.slug === selectedSlug) ?? null, [filtered, selectedSlug])

  const counts = useMemo(() => {
    const map: Record<string, number> = {}
    for (const tab of TAB_DEFS) {
      if (tab.id === 'all') map[tab.id] = pointsAll.length
      else map[tab.id] = points.filter((p) => p.category === tab.id).length
    }
    return map as Record<(typeof TAB_DEFS)[number]['id'], number>
  }, [points, pointsAll.length])

  const bounds = useMemo(() => {
    if (filtered.length === 0) return null
    const latLngs = filtered
      .map((p) => p.person.mapLocation)
      .filter(Boolean)
      .map((loc) => [loc!.lat, loc!.lng] as [number, number])

    if (latLngs.length === 0) return null
    return L.latLngBounds(latLngs)
  }, [filtered])

  return (
    <section className="mt-8 mb-4">
      <div className="bg-white/70 rounded-[16px] border border-[#e6e6e6] shadow-[0_18px_70px_rgba(0,0,0,0.08)] overflow-hidden">
        <div className="px-5 py-4 flex items-center justify-between gap-3 flex-wrap">
          <div className="flex-1 min-w-[220px]">
            <h2 className="text-[13px] font-semibold tracking-[0.12em] uppercase text-[#0c5776] mb-2">
              {loc(locale, 'TDYU bitiruvchilari butun dunyoda', 'Выпускники TDYU по всему миру', 'TDYU alumni worldwide')}
            </h2>
          </div>

          <div className="flex gap-2 overflow-auto pb-1">
            {TAB_DEFS.map((tab) => {
              const isActive = tab.id === activeTab
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={[
                    'px-3 py-2 rounded-full text-[13px] font-medium whitespace-nowrap border transition',
                    isActive ? 'bg-[#0c5776] text-white border-[#0c5776]' : 'bg-white text-[#0c5776] border-[#cfe0ea] hover:bg-[#eaf4f8]',
                  ].join(' ')}
                  aria-pressed={isActive}
                >
                  <span>{loc(locale, tab.uz, tab.ru, tab.en)}</span>
                  <span className="ml-2 text-[11px] opacity-90">({counts[tab.id] ?? 0})</span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 pointer-events-none" aria-hidden />
          <div className="h-[520px] md:h-[560px]">
            <MapContainer
              center={[20, 0]}
              zoom={2}
              scrollWheelZoom={false}
              style={{ height: '100%', width: '100%' }}
              className="leaflet-world-map"
              zoomControl={false}
            >
              <ZoomControl position="topright" />

              <TileLayer
                attribution=""
                url="https://{s}.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}{r}.png"
              />

              {bounds && <FitBounds bounds={bounds} />}

              {filtered.map(({ person, category }) => {
                const { name, role } = localizeAlumni(person, locale)
                const year = getYearFromRole(role)
                const cat = category ?? 'academia'
                const color = activeTab === 'all' ? COLOR_BY_CATEGORY[cat as AlumniMapCategoryId] : COLOR_BY_CATEGORY[cat as AlumniMapCategoryId]
                const isSelected = person.slug === selectedSlug

                return (
                  <CircleMarker
                    key={person.slug}
                    center={[person.mapLocation!.lat, person.mapLocation!.lng]}
                    radius={isSelected ? 8 : 6}
                    pathOptions={{
                      color,
                      weight: isSelected ? 4 : 2,
                      fillColor: color,
                      fillOpacity: 0.95,
                    }}
                    eventHandlers={{
                      click: () => setSelectedSlug(person.slug),
                    }}
                  >
                    <Tooltip direction="top" offset={[0, -8]} opacity={0.95}>
                      <div className="min-w-[170px]">
                        <div className="font-semibold text-[13px] leading-snug">{name}</div>
                        <div className="text-[12px] text-[#4c4c4c] mt-1 leading-snug">{role}</div>
                        {year && <div className="text-[12px] text-[#777] mt-2">{year}</div>}
                        {person.mapLocation?.demo && (
                          <div className="text-[11px] text-[#777] mt-1">Demo data</div>
                        )}
                      </div>
                    </Tooltip>
                  </CircleMarker>
                )
              })}
            </MapContainer>
          </div>

          {selected && selected.person.mapLocation && (
            <div className="absolute left-4 bottom-4 right-4 sm:left-6 sm:right-auto sm:max-w-[340px] bg-white rounded-xl border border-[#e6e6e6] shadow-[0_18px_60px_rgba(0,0,0,0.10)] overflow-hidden">
              <div className="px-5 py-4">
                <div className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-[#00ADE2]" aria-hidden />
                  <span className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#0c5776]">
                    {loc(locale, 'TDYU alumni', 'Alumni TDYU', 'TDYU alumni')}
                  </span>
                </div>

                <div className="mt-3 text-[16px] font-semibold leading-snug text-[#030303]">{localizeAlumni(selected.person, locale).name}</div>
                <div className="text-[13px] text-[#777] mt-1 leading-snug">{localizeAlumni(selected.person, locale).role}</div>

                {selected.person.mapLocation?.label && (
                  <div className="text-[12px] text-[#777] mt-3 flex items-center gap-2">
                    <span className="inline-block w-2 h-2 rounded-full bg-[#00ADE2]" aria-hidden />
                    <span>
                      {selected.person.mapLocation.label}
                      {selected.person.mapLocation.demo ? ' (demo)' : ''}
                    </span>
                  </div>
                )}

                <div className="mt-4">
                  <Link
                    href={`/alumni/${selected.person.slug}`}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#0c5776] text-white text-[13px] font-medium hover:bg-[#00ADE2] transition"
                  >
                    {loc(locale, 'Profilni ko‘rish', 'Смотреть профиль', 'View profile')}
                    <span aria-hidden>→</span>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

