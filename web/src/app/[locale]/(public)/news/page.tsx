import { hasLocale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing, type Locale } from '@/i18n/routing'
import { NewsView } from '@/components/live/NewsView'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const title =
    locale === 'ru' ? 'Новости — TDYU Endowment Fund' : locale === 'en' ? 'News — TDYU Endowment Fund' : 'Yangiliklar — TDYU Endowment Fund'
  return { title }
}

export default async function NewsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)
  return <NewsView locale={locale as Locale} />
}
