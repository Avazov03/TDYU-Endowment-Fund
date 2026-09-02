import { hasLocale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing, type Locale } from '@/i18n/routing'
import { ReportsView } from '@/components/live/ReportsView'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const title =
    locale === 'ru' ? 'Отчёты — TDYU Endowment Fund' : locale === 'en' ? 'Reports — TDYU Endowment Fund' : 'Hisobotlar — TDYU Endowment Fund'
  return { title }
}

export default async function ReportsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)
  return <ReportsView locale={locale as Locale} />
}
