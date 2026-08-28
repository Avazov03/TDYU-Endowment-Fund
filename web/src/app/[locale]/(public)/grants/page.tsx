import { hasLocale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing, type Locale } from '@/i18n/routing'
import { GrantsView } from '@/components/live/GrantsView'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const title =
    locale === 'ru' ? 'Гранты — TDYU Endowment Fund' : locale === 'en' ? 'Grants — TDYU Endowment Fund' : 'Grantlar — TDYU Endowment Fund'
  return { title }
}

export default async function GrantsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)
  return <GrantsView locale={locale as Locale} />
}
