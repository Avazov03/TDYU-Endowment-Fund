import { hasLocale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing, type Locale } from '@/i18n/routing'
import { ShopOrdersView } from '@/components/live/shop/ShopOrdersView'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const title =
    locale === 'ru' ? 'Мои заказы — TSUL SHOP' : locale === 'en' ? 'My orders — TSUL SHOP' : 'Buyurtmalarim — TSUL SHOP'
  return { title }
}

export default async function ShopOrdersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)
  return <ShopOrdersView locale={locale as Locale} />
}
