import { hasLocale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing, type Locale } from '@/i18n/routing'
import { MissionValueView } from '@/components/live/MissionValueView'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const title =
    locale === 'ru'
      ? '6 столпов — TDYU Endowment Fund'
      : locale === 'en'
        ? '6 pillars — TDYU Endowment Fund'
        : '6 ustun — TDYU Endowment Fund'
  return { title }
}

export default async function MissionValuePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)
  return <MissionValueView locale={locale as Locale} />
}
