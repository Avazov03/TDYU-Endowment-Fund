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
  const active = pathname === '/shop' || pathname.startsWith('/shop/')
  const label = loc(locale, 'Do‘kon', 'Магазин', 'Shop')

  return (
    <Link
      href="/shop"
      aria-label={count > 0 ? `${label} (${count})` : label}
      className={[
        'site-cta-shop relative inline-flex items-center justify-center gap-2 rounded-[30px] text-[15px] font-medium leading-none h-[50px] ml-3',
        'w-[50px] px-0 sm:w-auto sm:pl-[18px] sm:pr-[20px]',
        active ? 'bg-sky !text-white hover:bg-tdyu' : 'bg-tdyu !text-white hover:bg-sky',
      ].join(' ')}
    >
      <ShopBagIcon size={18} />
      <span className="hidden sm:inline">{label}</span>
      {count > 0 ? (
        <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-white !text-tdyu text-[10px] leading-[18px] text-center font-semibold">
          {count > 99 ? '99+' : count}
        </span>
      ) : null}
    </Link>
  )
}
