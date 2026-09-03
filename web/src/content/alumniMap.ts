import type { Locale } from '@/i18n/routing'
import { ALUMNI_PEOPLE, type AlumniMapCategoryId } from './alumni'

/** ISO2 lower = Highcharts world.geo.json `hc-key` */
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

export type AlumniCountryMeta = {
  id: AlumniCountryId
  uz: string
  ru: string
  en: string
}

export const ALUMNI_COUNTRIES: AlumniCountryMeta[] = [
  { id: 'uz', uz: "O'zbekiston", ru: 'Узбекистан', en: 'Uzbekistan' },
  { id: 'us', uz: 'AQSH', ru: 'США', en: 'USA' },
  { id: 'gb', uz: 'Buyuk Britaniya', ru: 'Великобритания', en: 'United Kingdom' },
  { id: 'de', uz: 'Germaniya', ru: 'Германия', en: 'Germany' },
  { id: 'fr', uz: 'Fransiya', ru: 'Франция', en: 'France' },
  { id: 'pl', uz: 'Polsha', ru: 'Польша', en: 'Poland' },
  { id: 'jp', uz: 'Yaponiya', ru: 'Япония', en: 'Japan' },
  { id: 'au', uz: 'Avstraliya', ru: 'Австралия', en: 'Australia' },
  { id: 'sg', uz: 'Singapur', ru: 'Сингапур', en: 'Singapore' },
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

export function localizeCountry(id: AlumniCountryId, locale: Locale) {
  const meta = ALUMNI_COUNTRIES.find((c) => c.id === id)
  if (!meta) return id.toUpperCase()
  if (locale === 'ru') return meta.ru
  if (locale === 'en') return meta.en
  return meta.uz
}
