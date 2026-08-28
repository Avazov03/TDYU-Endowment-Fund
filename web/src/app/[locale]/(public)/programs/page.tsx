import { hasLocale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing, type Locale } from '@/i18n/routing'
import { ProgramsView } from '@/components/live/ProgramsView'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const title =
    locale === 'ru' ? 'Программы — TDYU Endowment Fund' : locale === 'en' ? 'Programs — TDYU Endowment Fund' : 'Dasturlar — TDYU Endowment Fund'
  return { title }
}

export default async function ProgramsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)
  return <ProgramsView locale={locale as Locale} />
}
