import type { EventItem } from '@/content/events'
import type { NewsPost } from '@/content/news'
import type { AlumniPerson } from '@/content/alumni'
import type { BoardMember } from '@/content/board'
import type { ShopProduct } from '@/content/shop'
import type { Locale } from '@/i18n/routing'

const API = process.env.API_ORIGIN || 'http://127.0.0.1:8787'

type OverlayList<T> = { items?: T[]; suppressed?: string[] }
type OverlayItem<T> = { item?: T | null; suppressed?: boolean }

export type ContentBlockMap = Record<string, { title?: string | null; body?: string; page?: string | null }>

export type PublicAnnouncement = {
  id: string
  title: string
  excerpt?: string | null
  dateLabel?: string | null
  lang: string
}

async function readJson<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API}/api/public${path}`, { next: { revalidate: 20 } })
    if (!res.ok) return null
    return (await res.json()) as T
  } catch {
    return null
  }
}

/** Public CMS — faqat DB (kod katalogi emas). */
function fromDbList<T>(data: OverlayList<T> | null): T[] {
  return Array.isArray(data?.items) ? data!.items! : []
}

export async function loadContent(locale: Locale): Promise<ContentBlockMap> {
  return (await readJson<ContentBlockMap>(`/content?lang=${locale}`)) || {}
}

export async function loadAnnouncements(locale: Locale): Promise<PublicAnnouncement[]> {
  return (await readJson<PublicAnnouncement[]>(`/announcements?lang=${locale}`)) || []
}

/** Home KPI strip — admin ContentBlock keys stats.1…stats.5 */
export function homeStatsFromContent(
  content: ContentBlockMap,
  fallback: readonly { n: string; l: string }[],
): { n: string; l: string }[] {
  return [1, 2, 3, 4, 5].map((i) => {
    const row = content[`stats.${i}`]
    const fb = fallback[i - 1]!
    return {
      n: (row?.title || fb.n).trim() || fb.n,
      l: (row?.body || fb.l).trim() || fb.l,
    }
  })
}

export async function loadEvents(): Promise<EventItem[]> {
  return fromDbList(await readJson<OverlayList<EventItem>>('/events'))
}

export async function loadEvent(slug: string): Promise<EventItem | undefined> {
  const data = await readJson<OverlayItem<EventItem>>(`/events/${slug}`)
  if (data?.suppressed) return undefined
  return data?.item || undefined
}

export async function loadNews(): Promise<NewsPost[]> {
  return fromDbList(await readJson<OverlayList<NewsPost>>('/news'))
}

export async function loadNewsItem(slug: string): Promise<NewsPost | undefined> {
  const data = await readJson<OverlayItem<NewsPost>>(`/news/${slug}`)
  if (data?.suppressed) return undefined
  return data?.item || undefined
}

export async function loadAlumni(): Promise<AlumniPerson[]> {
  return fromDbList(await readJson<OverlayList<AlumniPerson>>('/alumni'))
}

export async function loadAlumniItem(slug: string): Promise<AlumniPerson | undefined> {
  const data = await readJson<OverlayItem<AlumniPerson>>(`/alumni/${slug}`)
  if (data?.suppressed) return undefined
  return data?.item || undefined
}

export async function loadBoard(): Promise<BoardMember[]> {
  return fromDbList(await readJson<OverlayList<BoardMember>>('/board'))
}

export async function loadBoardItem(slug: string): Promise<BoardMember | undefined> {
  const data = await readJson<OverlayItem<BoardMember>>(`/board/${slug}`)
  if (data?.suppressed) return undefined
  return data?.item || undefined
}

export async function loadShopProducts(): Promise<ShopProduct[]> {
  return fromDbList(await readJson<OverlayList<ShopProduct>>('/shop/products'))
}

export async function loadShopProduct(slug: string): Promise<ShopProduct | undefined> {
  const data = await readJson<OverlayItem<ShopProduct>>(`/shop/products/${slug}`)
  if (data?.suppressed) return undefined
  return data?.item || undefined
}
