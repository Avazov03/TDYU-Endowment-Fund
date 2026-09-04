import { Suspense } from 'react'
import { hasLocale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing, type Locale } from '@/i18n/routing'
import { ShopView } from '@/components/live/shop/ShopView'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const title =
    locale === 'ru' ? 'Избранное — TSUL SHOP' : locale === 'en' ? 'Favourites — TSUL SHOP' : 'Saralangan — TSUL SHOP'
  return { title }
}

export default async function ShopFavoritesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)
  return (
    <Suspense fallback={null}>
      <ShopView locale={locale as Locale} favoritesOnly />
    </Suspense>
  )
}
