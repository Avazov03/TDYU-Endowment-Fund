'use client'

import { useMemo, useState } from 'react'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { formatSom, pickupLabel } from '@/content/shop'
import { loc } from '../loc'
import { PageHero } from '../PageHero'
import { readLocalShopOrders, type LocalShopOrder } from '@/lib/shop-orders'
import { useShopCart } from '@/lib/shop-cart'

type RemoteOrder = {
  id: string
  createdAt: string
  status?: string
  pickup?: string | null
  total?: number | null
  items?: { slug?: string; qty?: number; size?: string; price?: number }[]
  message?: string
}

function statusLabel(status: string | undefined, locale: Locale) {
  if (status === 'in_progress') return loc(locale, 'Tayyorlanmoqda', 'Готовится', 'In progress')
  if (status === 'closed') return loc(locale, 'Berildi', 'Выдан', 'Completed')
  return loc(locale, 'Qabul qilindi', 'Принят', 'Received')
}

export function ShopOrdersView({ locale }: { locale: Locale }) {
  const { catalog } = useShopCart()
  const local = useMemo(() => readLocalShopOrders(), [])
  const [email, setEmail] = useState(local[0]?.email || '')
  const [phone, setPhone] = useState(local[0]?.phone || '')
  const [remote, setRemote] = useState<RemoteOrder[] | null>(null)
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')

  function itemName(slug: string | undefined) {
    if (!slug) return slug || ''
    const product = catalog.find((p) => p.slug === slug)
    return product ? product.name[locale] : slug
  }

  const orders = useMemo(() => {
    const map = new Map<string, LocalShopOrder | RemoteOrder>()
    for (const row of local) map.set(row.id, row)
    for (const row of remote || []) map.set(row.id, row)
    return [...map.values()].sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)))
  }, [local, remote])

  async function onLookup(e: React.FormEvent) {
    e.preventDefault()
    setErr('')
    setBusy(true)
    try {
      const res = await fetch('/api/forms/shop-orders-lookup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, phone, lang: locale }),
      })
      const data = (await res.json().catch(() => ({}))) as { error?: string; orders?: RemoteOrder[] }
      if (!res.ok) throw new Error(data.error || 'Request failed')
      setRemote(data.orders || [])
      if (!(data.orders || []).length) {
        setErr(loc(locale, 'Bu telefon va email bo‘yicha buyurtma topilmadi.', 'Заказы по этим данным не найдены.', 'No orders found for this phone and email.'))
      }
    } catch (error) {
      const msg = error instanceof Error ? error.message : ''
      setErr(
        msg === 'Too many requests'
          ? loc(locale, 'Juda ko‘p so‘rov. Keyinroq urinib ko‘ring.', 'Слишком много запросов. Попробуйте позже.', 'Too many requests. Try again later.')
          : loc(locale, 'Qidirib bo‘lmadi. Qayta urinib ko‘ring.', 'Не удалось найти заказы. Попробуйте ещё раз.', 'Could not look up orders. Try again.'),
      )
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      <PageHero
        image="/media/shop/shop-hero.png"
        height={320}
        objectPosition="50% 55%"
        title={loc(locale, 'Buyurtmalarim', 'Мои заказы', 'My orders')}
        crumbs={[
          { href: '/', label: loc(locale, 'Bosh', 'Главная', 'Home') },
          { href: '/shop', label: loc(locale, 'Do‘kon', 'Магазин', 'Shop') },
          { href: '/shop/orders', label: loc(locale, 'Buyurtmalar', 'Заказы', 'Orders') },
        ]}
      />
      <section className="bg-cream pt-12 pb-20">
        <div className="live-wrap grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] items-start">
          <aside className="rounded-[16px] bg-white border border-[#ece7dc] p-5 sm:p-7">
            <h2 className="mt-0 mb-2 font-[Bitter,Georgia,serif] text-[24px] text-ink">
              {loc(locale, 'Buyurtmani topish', 'Найти заказ', 'Find an order')}
            </h2>
            <p className="mt-0 mb-5 text-[14px] leading-6 text-body">
              {loc(
                locale,
                'Buyurtma berganingizdagi telefon va emailni kiriting. Shu brauzerdagi buyurtmalar pastda ham chiqadi.',
                'Введите телефон и email, указанные при заказе. Заказы с этого браузера тоже видны ниже.',
                'Enter the phone and email used at checkout. Orders from this browser also appear below.',
              )}
            </p>
            <form onSubmit={onLookup} className="grid gap-3">
              <label className="grid gap-1 text-[13px] text-body">
                {loc(locale, 'Telefon*', 'Телефон*', 'Phone*')}
                <input
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  autoComplete="tel"
                  placeholder="+998"
                  className="h-11 rounded-[10px] border border-[#e5e5e5] px-3 text-[15px] text-ink"
                />
              </label>
              <label className="grid gap-1 text-[13px] text-body">
                {loc(locale, 'Email*', 'Email*', 'Email*')}
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  className="h-11 rounded-[10px] border border-[#e5e5e5] px-3 text-[15px] text-ink"
                />
              </label>
              <button
                type="submit"
                disabled={busy}
                className="h-12 rounded-[30px] bg-tdyu text-white text-[15px] font-medium appearance-none border-0 hover:bg-sky disabled:opacity-50"
              >
                {busy ? '…' : loc(locale, 'Ko‘rsatish', 'Показать', 'Show orders')}
              </button>
              {err ? <p className="m-0 text-[14px] text-[#b42318]">{err}</p> : null}
            </form>
          </aside>

          <div className="grid gap-4">
            {orders.length === 0 ? (
              <div className="rounded-[16px] bg-white border border-[#ece7dc] px-6 py-12 text-center">
                <p className="m-0 font-[Bitter,Georgia,serif] text-[22px] text-ink">
                  {loc(locale, 'Hozircha buyurtma yo‘q', 'Пока нет заказов', 'No orders yet')}
                </p>
                <p className="m-0 mt-2 text-[15px] text-body">
                  {loc(locale, 'Chapdagi forma orqali qidiring yoki do‘kondan xarid qiling.', 'Найдите заказ формой слева или купите в магазине.', 'Look up an order on the left or shop first.')}
                </p>
                <Link href="/shop" className="inline-flex mt-5 h-[46px] px-5 items-center rounded-[30px] bg-tdyu !text-white hover:bg-sky">
                  {loc(locale, 'Do‘konga o‘tish', 'В магазин', 'Go to shop')}
                </Link>
              </div>
            ) : (
              orders.map((order) => (
                <article key={order.id} className="rounded-[16px] bg-white border border-[#ece7dc] p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="m-0 text-[13px] text-body">{new Date(order.createdAt).toLocaleString(locale)}</p>
                      <p className="m-0 mt-1 font-medium text-ink">
                        {loc(locale, 'Buyurtma', 'Заказ', 'Order')} #{order.id.slice(-8)}
                      </p>
                    </div>
                    <span className="h-8 px-3 rounded-full bg-[#e8f7fb] text-tdyu text-[13px] font-medium leading-8">
                      {statusLabel('status' in order ? order.status : 'new', locale)}
                    </span>
                  </div>
                  {'items' in order && Array.isArray(order.items) && order.items.length ? (
                    <ul className="mt-4 mb-0 pl-5 text-[15px] text-body">
                      {order.items.map((item, i) => (
                        <li key={`${item.slug || i}-${item.size || ''}`}>
                          {itemName(item.slug)}
                          {item.size ? ` (${item.size})` : ''} × {item.qty}
                          {item.price ? ` — ${formatSom(item.price * (item.qty || 1), locale)}` : ''}
                        </li>
                      ))}
                    </ul>
                  ) : 'message' in order && order.message ? (
                    <p className="mt-4 mb-0 text-[14px] leading-6 text-body whitespace-pre-wrap">{order.message}</p>
                  ) : null}
                  <p className="m-0 mt-3 text-[14px] text-body">
                    {loc(locale, 'Olib ketish', 'Самовывоз', 'Pickup')}: {pickupLabel(String(order.pickup || ''), locale) || '—'}
                  </p>
                  {order.total ? (
                    <p className="m-0 mt-1 font-[Bitter,Georgia,serif] text-[20px] text-tdyu">
                      {loc(locale, 'Jami', 'Итого', 'Total')}: {formatSom(Number(order.total), locale)}
                    </p>
                  ) : null}
                </article>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  )
}
