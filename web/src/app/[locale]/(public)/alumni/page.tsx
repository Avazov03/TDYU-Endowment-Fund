import { hasLocale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing, type Locale } from '@/i18n/routing'
import { AlumniView } from '@/components/live/AlumniView'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const title =
    locale === 'ru' ? 'Alumni — TDYU Endowment Fund' : locale === 'en' ? 'Alumni — TDYU Endowment Fund' : 'Alumni — TDYU Endowment Fund'
  return { title }
}

export default async function AlumniPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)
  return <AlumniView locale={locale as Locale} />
}
