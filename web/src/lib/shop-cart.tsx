'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { getShopProduct, productSizes, type ShopProduct } from '@/content/shop'

const CART_KEY = 'tdyu-shop-cart-v2'
const FAV_KEY = 'tdyu-shop-fav-v1'
const MAX_QTY = 20

export type ShopCartItem = { slug: string; qty: number; size?: string }
export type ShopCartLine = { product: ShopProduct; qty: number; size?: string; lineTotal: number }

type ShopCartApi = {
  ready: boolean
  items: ShopCartItem[]
  lines: ShopCartLine[]
  count: number
  total: number
  favorites: string[]
  add: (slug: string, qty?: number, size?: string) => boolean
  setQty: (slug: string, qty: number, size?: string) => void
  remove: (slug: string, size?: string) => void
  clear: () => void
  isFav: (slug: string) => boolean
  toggleFav: (slug: string) => void
}

const ShopCartContext = createContext<ShopCartApi | null>(null)

export function lineKey(slug: string, size?: string) {
  return size ? `${slug}::${size}` : slug
}

function sameLine(a: ShopCartItem, slug: string, size?: string) {
  return a.slug === slug && (a.size || '') === (size || '')
}

function clampQty(n: number) {
  if (!Number.isFinite(n)) return 1
  return Math.min(MAX_QTY, Math.max(1, Math.round(n)))
}

function parseCart(raw: string | null): ShopCartItem[] {
  if (!raw) return []
  try {
    const data = JSON.parse(raw) as unknown
    if (!Array.isArray(data)) return []
    const out: ShopCartItem[] = []
    for (const row of data) {
      if (!row || typeof row.slug !== 'string' || !getShopProduct(row.slug)) continue
      const size = typeof row.size === 'string' && row.size ? row.size : undefined
      out.push({ slug: row.slug, qty: clampQty(Number(row.qty) || 1), size })
    }
    return out
  } catch {
    return []
  }
}

function parseFavs(raw: string | null): string[] {
  if (!raw) return []
  try {
    const data = JSON.parse(raw) as unknown
    if (!Array.isArray(data)) return []
    return data.filter((s): s is string => typeof s === 'string' && Boolean(getShopProduct(s)))
  } catch {
    return []
  }
}

export function ShopCartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ShopCartItem[]>([])
  const [favorites, setFavorites] = useState<string[]>([])
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const legacy = window.localStorage.getItem('tdyu-shop-cart-v1')
    const current = window.localStorage.getItem(CART_KEY)
    setItems(parseCart(current || legacy))
    setFavorites(parseFavs(window.localStorage.getItem(FAV_KEY)))
    setReady(true)
  }, [])

  useEffect(() => {
    if (!ready) return
    window.localStorage.setItem(CART_KEY, JSON.stringify(items))
    window.localStorage.setItem(FAV_KEY, JSON.stringify(favorites))
  }, [items, favorites, ready])

  const add = useCallback((slug: string, qty = 1, size?: string) => {
    const product = getShopProduct(slug)
    if (!product) return false
    const sizes = productSizes(product)
    const normalized = size?.trim() || undefined
    if (sizes.length && (!normalized || !sizes.includes(normalized))) return false
    setItems((prev) => {
      const found = prev.find((i) => sameLine(i, slug, normalized))
      if (!found) return [...prev, { slug, qty: clampQty(qty), size: normalized }]
      return prev.map((i) => (sameLine(i, slug, normalized) ? { ...i, qty: clampQty(i.qty + qty) } : i))
    })
    return true
  }, [])

  const setQty = useCallback((slug: string, qty: number, size?: string) => {
    if (qty < 1) {
      setItems((prev) => prev.filter((i) => !sameLine(i, slug, size)))
      return
    }
    setItems((prev) => prev.map((i) => (sameLine(i, slug, size) ? { ...i, qty: clampQty(qty) } : i)))
  }, [])

  const remove = useCallback((slug: string, size?: string) => {
    setItems((prev) => prev.filter((i) => !sameLine(i, slug, size)))
  }, [])

  const clear = useCallback(() => setItems([]), [])

  const isFav = useCallback((slug: string) => favorites.includes(slug), [favorites])

  const toggleFav = useCallback((slug: string) => {
    if (!getShopProduct(slug)) return
    setFavorites((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]))
  }, [])

  const value = useMemo<ShopCartApi>(() => {
    const lines: ShopCartLine[] = []
    for (const item of items) {
      const product = getShopProduct(item.slug)
      if (!product) continue
      lines.push({ product, qty: item.qty, size: item.size, lineTotal: product.price * item.qty })
    }
    return {
      ready,
      items,
      lines,
      count: lines.reduce((n, l) => n + l.qty, 0),
      total: lines.reduce((n, l) => n + l.lineTotal, 0),
      favorites,
      add,
      setQty,
      remove,
      clear,
      isFav,
      toggleFav,
    }
  }, [items, favorites, ready, add, setQty, remove, clear, isFav, toggleFav])

  return <ShopCartContext.Provider value={value}>{children}</ShopCartContext.Provider>
}

export function useShopCart() {
  const ctx = useContext(ShopCartContext)
  if (!ctx) throw new Error('useShopCart must be used within ShopCartProvider')
  return ctx
}
