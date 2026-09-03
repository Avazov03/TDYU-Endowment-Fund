import type { Locale } from '@/i18n/routing'
import { ALUMNI_PEOPLE, type AlumniMapCategoryId } from './alumni'

export type AlumniCountryId =
  | 'uz'
  | 'us'
  | 'gb'
  | 'de'
  | 'fr'
  | 'pl'
  | 'jp'
  | 'au'
  | 'sg'

export type AlumniMapPin = {
  id: string
  slug?: string
  countryId: AlumniCountryId
  name: string
  nameRu: string
  nameEn: string
  role: string
  roleRu: string
  roleEn: string
  category: AlumniMapCategoryId
  year?: string
  demo?: boolean
}

export type CountryPiece = {
  id: AlumniCountryId
  /** SVG path(s) — alohida davlat bo‘lagi */
  d: string
  labelX: number
  labelY: number
  uz: string
  ru: string
  en: string
}

/**
 * Stilizatsiya qilingan davlat-bo‘laklar (puzzle).
 * Geo-aniqlik emas — TDYU DNA: krem fon, bo‘laklar, hover.
 * viewBox 0 0 1000 480
 */
export const COUNTRY_PIECES: CountryPiece[] = [
  {
    id: 'us',
    d: 'M95 95 L175 78 L230 95 L255 140 L240 195 L195 220 L145 205 L110 165 L95 125 Z',
    labelX: 165,
    labelY: 145,
    uz: 'AQSH',
    ru: 'США',
    en: 'USA',
  },
  {
    id: 'gb',
    d: 'M445 95 L470 88 L488 102 L482 128 L458 138 L442 120 Z',
    labelX: 465,
    labelY: 108,
    uz: 'Buyuk Britaniya',
    ru: 'Великобритания',
    en: 'United Kingdom',
  },
  {
    id: 'fr',
    d: 'M455 145 L490 138 L508 160 L495 195 L462 200 L448 172 Z',
    labelX: 475,
    labelY: 168,
    uz: 'Fransiya',
    ru: 'Франция',
    en: 'France',
  },
  {
    id: 'de',
    d: 'M505 118 L535 112 L552 135 L540 165 L512 168 L498 142 Z',
    labelX: 525,
    labelY: 140,
    uz: 'Germaniya',
    ru: 'Германия',
    en: 'Germany',
  },
  {
    id: 'pl',
    d: 'M545 108 L575 105 L590 128 L578 155 L548 152 L538 128 Z',
    labelX: 562,
    labelY: 128,
    uz: 'Polsha',
    ru: 'Польша',
    en: 'Poland',
  },
  {
    id: 'uz',
    d: 'M620 155 L670 148 L705 168 L695 205 L650 218 L615 195 Z',
    labelX: 655,
    labelY: 180,
    uz: "O'zbekiston",
    ru: 'Узбекистан',
    en: 'Uzbekistan',
  },
  {
    id: 'jp',
    d: 'M820 145 L848 138 L868 158 L860 195 L835 205 L815 178 Z',
    labelX: 840,
    labelY: 170,
    uz: 'Yaponiya',
    ru: 'Япония',
    en: 'Japan',
  },
  {
    id: 'sg',
    d: 'M740 285 L758 280 L768 292 L760 305 L742 302 Z',
    labelX: 754,
    labelY: 292,
    uz: 'Singapur',
    ru: 'Сингапур',
    en: 'Singapore',
  },
  {
    id: 'au',
    d: 'M780 320 L860 308 L905 345 L880 395 L805 405 L760 360 Z',
    labelX: 830,
    labelY: 355,
    uz: 'Avstraliya',
    ru: 'Австралия',
    en: 'Australia',
  },
]

/** Fon qit’alari — faol emas, faqat kontekst */
export const MUTED_LANDS = [
  'M90 90 L250 70 L280 150 L250 230 L160 240 L100 180 Z',
  'M210 265 L270 255 L295 330 L270 410 L230 430 L205 360 Z',
  'M440 90 L580 85 L600 170 L560 200 L470 185 Z',
  'M470 200 L575 190 L600 280 L560 360 L490 340 Z',
  'M580 90 L810 85 L850 180 L780 240 L620 220 Z',
  'M760 300 L910 290 L940 360 L900 420 L780 420 Z',
]

export const MAP_CATEGORIES: Array<{
  id: 'all' | AlumniMapCategoryId
  uz: string
  ru: string
  en: string
}> = [
  { id: 'all', uz: 'Barchasi', ru: 'Все', en: 'All' },
  { id: 'law', uz: 'Yuristlar', ru: 'Юристы', en: 'Lawyers' },
  { id: 'state', uz: 'Davlat xizmati', ru: 'Госслужба', en: 'Public service' },
  { id: 'academia', uz: 'Akademiya', ru: 'Академия', en: 'Academia' },
  { id: 'international', uz: 'Xalqaro', ru: 'Международные', en: 'International' },
]

const EXTRA: AlumniMapPin[] = [
  {
    id: 'demo-paris-law',
    countryId: 'fr',
    name: 'Dilnoza Karimova',
    nameRu: 'Дильноза Каримова',
    nameEn: 'Dilnoza Karimova',
    role: 'Advokat — Firma',
    roleRu: 'Адвокат — Фирма',
    roleEn: 'Attorney — Firm',
    category: 'law',
    year: '2021',
    demo: true,
  },
  {
    id: 'demo-qarshi-law',
    countryId: 'uz',
    name: 'Sunnat Panjiyev',
    nameRu: 'Суннат Панджиев',
    nameEn: 'Sunnat Panjiyev',
    role: 'Advokat — Firma',
    roleRu: 'Адвокат — Фирма',
    roleEn: 'Attorney — Firm',
    category: 'law',
    year: '2025',
    demo: true,
  },
  {
    id: 'demo-warsaw-state',
    countryId: 'pl',
    name: 'Aziza Rahimova',
    nameRu: 'Азиза Рахимова',
    nameEn: 'Aziza Rahimova',
    role: 'Davlat xizmatchisi',
    roleRu: 'Госслужащая',
    roleEn: 'Civil servant',
    category: 'state',
    year: '2019',
    demo: true,
  },
  {
    id: 'demo-singapore-intl',
    countryId: 'sg',
    name: 'Bekzod Yusupov',
    nameRu: 'Бекзод Юсупов',
    nameEn: 'Bekzod Yusupov',
    role: 'Xalqaro tashkilot maslahatchisi',
    roleRu: 'Консультант международной организации',
    roleEn: 'International organization adviser',
    category: 'international',
    year: '2020',
    demo: true,
  },
]

const COUNTRY_BY_LABEL: Record<string, AlumniCountryId> = {
  UK: 'gb',
  Uzbekistan: 'uz',
  USA: 'us',
  Germany: 'de',
  Japan: 'jp',
  Australia: 'au',
}

function yearFromRole(role: string) {
  const m = role.match(/\b(19\d{2}|20\d{2})\b/)
  return m ? m[1] : undefined
}

export function getAlumniMapPins(): AlumniMapPin[] {
  const fromPeople: AlumniMapPin[] = ALUMNI_PEOPLE.filter((p) => p.mapLocation && p.mapCategory).map((p) => {
    const label = p.mapLocation!.label || ''
    const countryId = COUNTRY_BY_LABEL[label] || 'uz'
    return {
      id: p.slug,
      slug: p.slug,
      countryId: p.slug === 'jerome-bell' ? 'uz' : countryId,
      name: p.name,
      nameRu: p.nameRu,
      nameEn: p.nameEn,
      role: p.role,
      roleRu: p.roleRu,
      roleEn: p.roleEn,
      category: p.slug === 'jerome-bell' ? 'state' : p.mapCategory!,
      year: yearFromRole(p.role),
      demo: p.mapLocation!.demo,
    }
  })
  return [...fromPeople, ...EXTRA]
}

export function localizePin(pin: AlumniMapPin, locale: Locale) {
  if (locale === 'ru') return { name: pin.nameRu, role: pin.roleRu }
  if (locale === 'en') return { name: pin.nameEn, role: pin.roleEn }
  return { name: pin.name, role: pin.role }
}

export function localizeCountry(piece: CountryPiece, locale: Locale) {
  if (locale === 'ru') return piece.ru
  if (locale === 'en') return piece.en
  return piece.uz
}
