'use client'

import { loc } from '../loc'
import { useShopCart } from '@/lib/shop-cart'
import type { Locale } from '@/i18n/routing'

export function ShopHeartButton({
  slug,
  locale,
  light = false,
}: {
  slug: string
  locale: Locale
  light?: boolean
}) {
  const { isFav, toggleFav } = useShopCart()
  const on = isFav(slug)
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        toggleFav(slug)
      }}
      className={[
        'inline-flex items-center justify-center w-10 h-10 rounded-full appearance-none border',
        on
          ? 'bg-sky border-sky text-white'
          : light
            ? 'bg-white/15 border-white/40 text-white hover:bg-white hover:text-tdyu'
            : 'bg-white border-[#e5e5e5] text-tdyu hover:border-sky hover:text-sky',
      ].join(' ')}
      aria-pressed={on}
      aria-label={loc(locale, 'Saralanganlarga', 'В избранное', 'Save to favourites')}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill={on ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <path d="M12 20s-7-4.4-9.5-8.2C.8 9.2 2 6 5.2 6c1.8 0 3.1 1 3.8 2.2C9.7 7 11 6 12.8 6 16 6 17.2 9.2 15.5 11.8 13 15.6 12 20 12 20z" />
      </svg>
    </button>
  )
}
