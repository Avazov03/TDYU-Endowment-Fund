import { EVENTS, getEvent, type EventItem } from '@/content/events'
import { NEWS_POSTS, getNewsPost, type NewsPost } from '@/content/news'
import { ALUMNI_PEOPLE, getAlumni, type AlumniPerson } from '@/content/alumni'
import { BOARD_DETAIL, getBoardMember, type BoardMember } from '@/content/board'
import { SHOP_PRODUCTS, getShopProduct, type ShopProduct } from '@/content/shop'

const API = process.env.API_ORIGIN || 'http://127.0.0.1:8787'

type ManagedList<T> = { managed?: boolean; items?: T[] }
type ManagedItem<T> = { managed?: boolean; item?: T | null }

async function readJson<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API}/api/public${path}`, { next: { revalidate: 20 } })
    if (!res.ok) return null
    return (await res.json()) as T
  } catch {
    return null
  }
}

export async function loadEvents(): Promise<EventItem[]> {
  const data = await readJson<ManagedList<EventItem>>('/events')
  if (data?.managed && Array.isArray(data.items)) return data.items
  return EVENTS
}

export async function loadEvent(slug: string): Promise<EventItem | undefined> {
  const data = await readJson<ManagedItem<EventItem>>(`/events/${slug}`)
  if (data?.managed) return data.item || undefined
  return getEvent(slug)
}

export async function loadNews(): Promise<NewsPost[]> {
  const data = await readJson<ManagedList<NewsPost>>('/news')
  if (data?.managed && Array.isArray(data.items)) return data.items
  return NEWS_POSTS
}

export async function loadNewsItem(slug: string): Promise<NewsPost | undefined> {
  const data = await readJson<ManagedItem<NewsPost>>(`/news/${slug}`)
  if (data?.managed) return data.item || undefined
  return getNewsPost(slug)
}

export async function loadAlumni(): Promise<AlumniPerson[]> {
  const data = await readJson<ManagedList<AlumniPerson>>('/alumni')
  if (data?.managed && Array.isArray(data.items)) return data.items
  return ALUMNI_PEOPLE
}

export async function loadAlumniItem(slug: string): Promise<AlumniPerson | undefined> {
  const data = await readJson<ManagedItem<AlumniPerson>>(`/alumni/${slug}`)
  if (data?.managed) return data.item || undefined
  return getAlumni(slug)
}

export async function loadBoard(): Promise<BoardMember[]> {
  const data = await readJson<ManagedList<BoardMember>>('/board')
  if (data?.managed && Array.isArray(data.items)) return data.items
  return BOARD_DETAIL
}

export async function loadBoardItem(slug: string): Promise<BoardMember | undefined> {
  const data = await readJson<ManagedItem<BoardMember>>(`/board/${slug}`)
  if (data?.managed) return data.item || undefined
  return getBoardMember(slug)
}

export async function loadShopProducts(): Promise<ShopProduct[]> {
  const data = await readJson<ManagedList<ShopProduct>>('/shop/products')
  if (data?.managed && Array.isArray(data.items)) return data.items
  return SHOP_PRODUCTS
}

export async function loadShopProduct(slug: string): Promise<ShopProduct | undefined> {
  const data = await readJson<ManagedItem<ShopProduct>>(`/shop/products/${slug}`)
  if (data?.managed) return data.item || undefined
  return getShopProduct(slug)
}
