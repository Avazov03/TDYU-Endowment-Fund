import { hasLocale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing, type Locale } from '@/i18n/routing'
import { LegalView } from '@/components/live/LegalView'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const title =
    locale === 'ru' ? 'Правовая основа — TDYU Endowment Fund' : locale === 'en' ? 'Legal — TDYU Endowment Fund' : 'Huquqiy asos — TDYU Endowment Fund'
  return { title }
}

export default async function LegalPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)
  return <LegalView locale={locale as Locale} />
}
