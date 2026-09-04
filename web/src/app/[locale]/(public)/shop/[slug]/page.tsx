import { hasLocale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing, type Locale } from '@/i18n/routing'
import { SHOP_PRODUCTS, getShopProduct } from '@/content/shop'
import { ShopProductView } from '@/components/live/shop/ShopProductView'

export function generateStaticParams() {
  return SHOP_PRODUCTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  const product = getShopProduct(slug)
  const name = product ? product.name[(locale as Locale) || 'uz'] : 'TSUL SHOP'
  return { title: `${name} — TSUL SHOP` }
}

export default async function ShopProductPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  if (slug === 'cart' || slug === 'favorites' || slug === 'orders') notFound()
  const product = getShopProduct(slug)
  if (!product) notFound()
  setRequestLocale(locale)
  return <ShopProductView locale={locale as Locale} product={product} />
}
