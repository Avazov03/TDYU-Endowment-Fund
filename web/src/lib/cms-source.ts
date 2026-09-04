import { EVENTS, getEvent, type EventItem } from '@/content/events'
import { NEWS_POSTS, getNewsPost, type NewsPost } from '@/content/news'
import { ALUMNI_PEOPLE, getAlumni, type AlumniPerson } from '@/content/alumni'
import { BOARD_DETAIL, getBoardMember, type BoardMember } from '@/content/board'
import { SHOP_PRODUCTS, getShopProduct, type ShopProduct } from '@/content/shop'
import { overlayItem, overlayList } from '@/lib/cms-merge'

const API = process.env.API_ORIGIN || 'http://127.0.0.1:8787'

type OverlayList<T> = { items?: T[]; suppressed?: string[] }
type OverlayItem<T> = { item?: T | null; suppressed?: boolean }

async function readJson<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API}/api/public${path}`, { next: { revalidate: 20 } })
    if (!res.ok) return null
    return (await res.json()) as T
  } catch {
    return null
  }
}

function slugOf<T extends { slug: string }>(row: T) {
  return row.slug
}

export async function loadEvents(): Promise<EventItem[]> {
  const data = await readJson<OverlayList<EventItem>>('/events')
  return overlayList(EVENTS, data?.items, data?.suppressed, slugOf)
}

export async function loadEvent(slug: string): Promise<EventItem | undefined> {
  const data = await readJson<OverlayItem<EventItem>>(`/events/${slug}`)
  return overlayItem(getEvent(slug), data)
}

export async function loadNews(): Promise<NewsPost[]> {
  const data = await readJson<OverlayList<NewsPost>>('/news')
  return overlayList(NEWS_POSTS, data?.items, data?.suppressed, slugOf)
}

export async function loadNewsItem(slug: string): Promise<NewsPost | undefined> {
  const data = await readJson<OverlayItem<NewsPost>>(`/news/${slug}`)
  return overlayItem(getNewsPost(slug), data)
}

export async function loadAlumni(): Promise<AlumniPerson[]> {
  const data = await readJson<OverlayList<AlumniPerson>>('/alumni')
  return overlayList(ALUMNI_PEOPLE, data?.items, data?.suppressed, slugOf)
}

export async function loadAlumniItem(slug: string): Promise<AlumniPerson | undefined> {
  const data = await readJson<OverlayItem<AlumniPerson>>(`/alumni/${slug}`)
  return overlayItem(getAlumni(slug), data)
}

export async function loadBoard(): Promise<BoardMember[]> {
  const data = await readJson<OverlayList<BoardMember>>('/board')
  return overlayList(BOARD_DETAIL, data?.items, data?.suppressed, slugOf)
}

export async function loadBoardItem(slug: string): Promise<BoardMember | undefined> {
  const data = await readJson<OverlayItem<BoardMember>>(`/board/${slug}`)
  return overlayItem(getBoardMember(slug), data)
}

export async function loadShopProducts(): Promise<ShopProduct[]> {
  const data = await readJson<OverlayList<ShopProduct>>('/shop/products')
  return overlayList(SHOP_PRODUCTS, data?.items, data?.suppressed, slugOf)
}

export async function loadShopProduct(slug: string): Promise<ShopProduct | undefined> {
  const data = await readJson<OverlayItem<ShopProduct>>(`/shop/products/${slug}`)
  return overlayItem(getShopProduct(slug), data)
}
