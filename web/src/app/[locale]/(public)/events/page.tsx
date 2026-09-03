import { hasLocale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing, type Locale } from '@/i18n/routing'
import { EventsView } from '@/components/live/EventsView'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const title =
    locale === 'ru' ? 'Мероприятия — TDYU Endowment Fund' : locale === 'en' ? 'Events — TDYU Endowment Fund' : 'Tadbirlar — TDYU Endowment Fund'
  return { title }
}

export default async function EventsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)
  return <EventsView locale={locale as Locale} />
}
