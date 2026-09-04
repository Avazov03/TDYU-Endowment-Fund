import { hasLocale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing, type Locale } from '@/i18n/routing'
import { ShopCartView } from '@/components/live/shop/ShopCartView'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const title =
    locale === 'ru' ? 'Корзина — TSUL SHOP' : locale === 'en' ? 'Cart — TSUL SHOP' : 'Savat — TSUL SHOP'
  return { title }
}

export default async function ShopCartPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)
  return <ShopCartView locale={locale as Locale} />
}
