const KEY = 'tdyu-shop-orders-v1'

export type LocalShopOrderItem = {
  slug: string
  name: string
  qty: number
  size?: string
  price: number
}

export type LocalShopOrder = {
  id: string
  createdAt: string
  name: string
  email: string
  phone: string
  pickup: string
  total: number
  items: LocalShopOrderItem[]
  status?: string
}

export function readLocalShopOrders(): LocalShopOrder[] {
  if (typeof window === 'undefined') return []
  try {
    const data = JSON.parse(window.localStorage.getItem(KEY) || '[]') as unknown
    if (!Array.isArray(data)) return []
    return data.filter((row): row is LocalShopOrder => Boolean(row && typeof row.id === 'string'))
  } catch {
    return []
  }
}

export function rememberShopOrder(order: LocalShopOrder) {
  if (typeof window === 'undefined' || !order.id) return
  const list = readLocalShopOrders().filter((row) => row.id !== order.id)
  window.localStorage.setItem(KEY, JSON.stringify([order, ...list].slice(0, 20)))
}
