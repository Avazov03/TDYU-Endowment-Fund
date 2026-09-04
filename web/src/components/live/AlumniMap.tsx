'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import type { Locale } from '@/i18n/routing'
import { Link } from '@/i18n/navigation'
import { type AlumniMapCategoryId, type AlumniPerson } from '@/content/alumni'
import { MAP_CATEGORIES, localizeCountry, localizePin, type AlumniCountryId, type AlumniMapPin } from '@/content/alumniMap'
import { loc } from './loc'

function EyebrowIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M5.2 12.9v3.8s3.6-1.5 6.8-1.5 6.8 1.5 6.8 1.5v-3.8s-3.4-1.8-6.9-1.8-6.7 1.8-6.7 1.8Z" />
      <path d="M22.6 12 24 11.3l-1.4-.8V10s.4-1.9-1.8-.9l-.2.2L11.7 4.5 0 11.2l4.4 2v-.7s3.7-2.1 7.5-2.1 7.6 2 7.6 2v1.1l2.5-1.3V17.6h-.8v1.9l1.1-.7 1.2.7v-1.9h-.9V12Z" />
    </svg>
  )
}

type ChartPoint = { 'hc-key': string; value: number }

function buildSeriesData(byCountry: Map<AlumniCountryId, AlumniMapPin[]>): ChartPoint[] {
  return [...byCountry.entries()].map(([id, list]) => ({
    'hc-key': id,
    value: list.length,
  }))
}

export function AlumniMap({ locale }: { locale: Locale }) {
  const [livePins, setLivePins] = useState<AlumniMapPin[]>([])
  const pins = livePins
  const [tab, setTab] = useState<'all' | AlumniMapCategoryId>('all')
  const [activeId, setActiveId] = useState<AlumniCountryId | null>('uz')
  const [mapReady, setMapReady] = useState(false)
  const [mapError, setMapError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/public/alumni')
      .then((r) => r.json())
      .then((d) => {
        const people = Array.isArray(d?.items) ? (d.items as AlumniPerson[]) : []
        const next: AlumniMapPin[] = people
          .filter((p) => p.mapCategory && (p.countryCode || p.mapLocation))
          .map((p) => ({
            id: p.slug,
            slug: p.slug,
            countryId: (p.countryCode || 'uz') as AlumniCountryId,
            name: p.name,
            nameRu: p.nameRu,
            nameEn: p.nameEn,
            role: p.role,
            roleRu: p.roleRu,
            roleEn: p.roleEn,
            category: p.mapCategory as AlumniMapCategoryId,
            demo: false,
          }))
        setLivePins(next)
      })
      .catch(() => {})
  }, [])

  const chartRef = useRef<HTMLDivElement>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const chartApi = useRef<any>(null)
  const byCountryRef = useRef<Map<AlumniCountryId, AlumniMapPin[]>>(new Map())
  const localeRef = useRef(locale)

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

  byCountryRef.current = byCountry
  localeRef.current = locale

  const activeCountries = useMemo(() => new Set(byCountry.keys()), [byCountry])
  const focusId =
    (activeId && activeCountries.has(activeId) ? activeId : null) || [...activeCountries][0] || null
  const focusPins = focusId ? byCountry.get(focusId) || [] : []
  const primary = focusPins[0] || null
  const countryCount = activeCountries.size

  useEffect(() => {
    let cancelled = false

    async function boot() {
      try {
        const [{ default: Highcharts }, topoRes] = await Promise.all([
          import('highcharts/highmaps'),
          fetch('/maps/world.geo.json'),
        ])
        if (!topoRes.ok) throw new Error('world map load failed')
        const topology = await topoRes.json()
        if (cancelled || !chartRef.current) return

        const chart = Highcharts.mapChart(chartRef.current, {
          chart: {
            map: topology,
            backgroundColor: '#ffffff',
            height: undefined,
            spacing: [16, 16, 16, 16],
            style: { fontFamily: 'Inter, system-ui, sans-serif' },
          },
          title: { text: undefined },
          credits: { enabled: false },
          mapNavigation: {
            enabled: true,
            enableDoubleClickZoomTo: true,
            buttonOptions: {
              verticalAlign: 'top',
              align: 'left',
              theme: {
                fill: '#ffffff',
                stroke: '#e6e1d7',
                'stroke-width': 1,
                r: 8,
                states: { hover: { fill: '#f6f4ee' } },
              },
            },
          },
          colorAxis: {
            min: 0,
            softMax: 3,
            minColor: '#d4e8f2',
            maxColor: '#0C5776',
            labels: { style: { color: '#4c4c4c', fontSize: '11px' } },
          },
          legend: {
            layout: 'horizontal',
            align: 'left',
            verticalAlign: 'bottom',
            floating: true,
            backgroundColor: 'rgba(255,255,255,0.92)',
            borderRadius: 8,
            padding: 10,
            itemStyle: { color: '#0c5776', fontWeight: '500', fontSize: '12px' },
            title: {
              text: loc(localeRef.current, 'Alumni soni', 'Число alumni', 'Alumni count'),
              style: { color: '#0c5776', fontWeight: '700', fontSize: '11px' },
            },
          },
          tooltip: {
            useHTML: true,
            backgroundColor: '#ffffff',
            borderColor: '#e6e1d7',
            borderRadius: 10,
            shadow: true,
            style: { color: '#030303', fontSize: '13px' },
            formatter() {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const self = this as any
              const p = self.point || self
              const locNow = localeRef.current
              const mapNow = byCountryRef.current
              const key = String(p['hc-key'] || '').toLowerCase() as AlumniCountryId
              const list = mapNow.get(key) || []
              const name = localizeCountry(key, locNow)
              const alumniWord = loc(locNow, 'alumni', 'alumni', 'alumni')
              if (!list.length) return false
              const rows = list
                .slice(0, 3)
                .map((pin: AlumniMapPin) => {
                  const L = localizePin(pin, locNow)
                  return `<div style="margin-top:4px"><b>${L.name}</b><br/><span style="color:#666">${L.role}</span></div>`
                })
                .join('')
              return `<b>${name}</b><br/><span style="color:#0c5776">${list.length} ${alumniWord}</span>${rows}<div style="margin-top:8px;color:#00ade2;font-size:12px">${loc(
                locNow,
                'Bosing — batafsil',
                'Нажмите — подробнее',
                'Click for details',
              )}</div>`
            },
          },
          series: [
            {
              type: 'map',
              name: loc(localeRef.current, 'Alumni', 'Alumni', 'Alumni'),
              mapData: topology,
              data: buildSeriesData(byCountryRef.current),
              joinBy: 'hc-key',
              allAreas: true,
              nullInteraction: true,
              nullColor: '#eef2f5',
              borderColor: '#ffffff',
              borderWidth: 0.75,
              states: {
                hover: {
                  enabled: true,
                  brightness: 0,
                  borderColor: '#ffffff',
                },
                select: { color: '#00ade2' },
              },
              dataLabels: { enabled: false },
              point: {
                events: {
                  mouseOver() {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const pt = this as any
                    const key = String(pt['hc-key'] || '').toLowerCase() as AlumniCountryId
                    const has = byCountryRef.current.has(key)
                    if (pt.graphic) {
                      pt.graphic.attr({ fill: has ? '#f59a23' : '#c5dce8' })
                    }
                  },
                  mouseOut() {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const pt = this as any
                    const key = String(pt['hc-key'] || '').toLowerCase() as AlumniCountryId
                    const has = byCountryRef.current.has(key)
                    if (pt.graphic) {
                      pt.graphic.attr({ fill: has ? pt.color || '#0C5776' : '#eef2f5' })
                    }
                  },
                  click() {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const key = String((this as any)['hc-key'] || '').toLowerCase() as AlumniCountryId
                    if (byCountryRef.current.has(key)) setActiveId(key)
                  },
                },
              },
            },
          ],
        } as never)

        chartApi.current = chart
        setMapReady(true)
      } catch (e) {
        setMapError(e instanceof Error ? e.message : 'map error')
      }
    }

    void boot()
    return () => {
      cancelled = true
      if (chartApi.current) {
        chartApi.current.destroy()
        chartApi.current = null
      }
    }
  }, [])

  useEffect(() => {
    const el = chartRef.current
    if (!el || !mapReady) return
    const ro = new ResizeObserver(() => {
      chartApi.current?.reflow?.()
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [mapReady])

  useEffect(() => {
    const chart = chartApi.current
    if (!chart?.series?.[0]) return
    const data = buildSeriesData(byCountry)
    const max = Math.max(1, ...data.map((d) => d.value), 3)
    chart.series[0].setData(data, true)
    if (chart.colorAxis?.[0]) {
      chart.colorAxis[0].update({ max, softMax: max }, false)
    }
    chart.redraw()
  }, [byCountry])

  useEffect(() => {
    if (focusId && activeId && !activeCountries.has(activeId)) {
      setActiveId([...activeCountries][0] || null)
    }
  }, [activeCountries, activeId, focusId])

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
                'Haqiqiy dunyo xaritasi (Highcharts Maps). Davlat ustiga boring yoki bosing — alumni soni va ismlar chiqadi.',
                'Настоящая карта мира (Highcharts Maps). Наведите или нажмите на страну — число и имена alumni.',
                'Real world map (Highcharts Maps). Hover or click a country to see alumni counts and names.',
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

        <div className="alumni-map-board-wrap">
          <div className="alumni-map-board alumni-map-board--hc">
            <div
              ref={chartRef}
              className="alumni-map-hc"
              aria-label={loc(locale, 'Dunyo xaritasi', 'Карта мира', 'World map')}
            />
            {!mapReady && !mapError && (
              <p className="alumni-map-loading">{loc(locale, 'Xarita yuklanmoqda…', 'Карта загружается…', 'Loading map…')}</p>
            )}
            {mapError && (
              <p className="alumni-map-loading" role="alert">
                {loc(locale, 'Xarita yuklanmadi.', 'Карта не загрузилась.', 'Map failed to load.')} {mapError}
              </p>
            )}

            {focusId && primary && (
              <aside className="alumni-map-panel" aria-live="polite">
                <p className="alumni-map-panel-country">{localizeCountry(focusId, locale)}</p>
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
      </div>
    </section>
  )
}
