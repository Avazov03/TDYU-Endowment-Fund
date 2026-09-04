'use client'

import { Link, usePathname } from '@/i18n/navigation'
import { useLocale } from 'next-intl'
import { loc } from '../loc'
import { useShopCart } from '@/lib/shop-cart'
import { ShopBagIcon } from './ShopBagIcon'
import type { Locale } from '@/i18n/routing'

export function ShopHeaderCta() {
  const locale = useLocale() as Locale
  const pathname = usePathname()
  const { count } = useShopCart()
  const shopActive = pathname === '/shop' || (pathname.startsWith('/shop/') && pathname !== '/shop/cart' && pathname !== '/shop/favorites' && pathname !== '/shop/orders')
  const cartActive = pathname === '/shop/cart'
  const ordersActive = pathname === '/shop/orders'
  const label = loc(locale, 'Do‘kon', 'Магазин', 'Shop')
  const cartLabel = loc(locale, 'Savat', 'Корзина', 'Cart')
  const ordersLabel = loc(locale, 'Buyurtmalar', 'Заказы', 'Orders')

  return (
    <div className="flex items-center ml-3 gap-2">
      <Link
        href="/shop"
        aria-label={label}
        className={[
          'inline-flex sm:hidden items-center justify-center w-[50px] h-[50px] rounded-full',
          shopActive ? 'bg-sky !text-white' : 'bg-tdyu !text-white hover:bg-sky',
        ].join(' ')}
      >
        <ShopBagIcon size={18} />
      </Link>
      <Link
        href="/shop"
        className={[
          'hidden sm:inline-flex items-center justify-center gap-2 rounded-[30px] text-[15px] font-medium leading-none pl-[18px] pr-[20px] h-[50px]',
          shopActive ? 'bg-sky !text-white hover:bg-tdyu' : 'bg-tdyu !text-white hover:bg-sky',
        ].join(' ')}
      >
        <ShopBagIcon size={18} />
        {label}
      </Link>
      <Link
        href="/shop/orders"
        aria-label={ordersLabel}
        title={ordersLabel}
        className={[
          'relative inline-flex items-center justify-center w-[50px] h-[50px] rounded-full border-2',
          ordersActive ? 'bg-sky border-sky !text-white' : 'border-tdyu !text-tdyu hover:bg-tdyu hover:!text-white',
        ].join(' ')}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M7 7V5.8A2.8 2.8 0 0 1 9.8 3h4.4A2.8 2.8 0 0 1 17 5.8V7" stroke="currentColor" strokeWidth="1.7" />
          <rect x="4" y="7" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.7" />
          <path d="M8 12h8M8 16h5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      </Link>
      <Link
        href="/shop/cart"
        aria-label={cartLabel}
        className={[
          'relative inline-flex items-center justify-center w-[50px] h-[50px] rounded-full border-2',
          cartActive ? 'bg-sky border-sky !text-white' : 'border-tdyu !text-tdyu hover:bg-tdyu hover:!text-white',
        ].join(' ')}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="9" cy="20" r="1.4" fill="currentColor" />
          <circle cx="18" cy="20" r="1.4" fill="currentColor" />
          <path d="M3 4h2l2.2 11.2a2 2 0 0 0 2 1.6h8.6a2 2 0 0 0 2-1.5L21 8H7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {count > 0 ? (
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-sky text-white text-[10px] leading-[18px] text-center font-semibold">
            {count > 99 ? '99+' : count}
          </span>
        ) : null}
      </Link>
    </div>
  )
}
