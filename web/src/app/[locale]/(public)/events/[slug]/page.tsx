import { hasLocale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing, type Locale } from '@/i18n/routing'
import { EVENTS, getEvent, localizeEvent } from '@/content/events'
import { EventDetailView } from '@/components/live/EventDetailView'

export function generateStaticParams() {
  return EVENTS.map((e) => ({ slug: e.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  const event = getEvent(slug)
  if (!event || !hasLocale(routing.locales, locale)) return { title: 'TDYU Endowment Fund' }
  const L = localizeEvent(event, locale as Locale)
  return { title: `${L.title} — TDYU Endowment Fund` }
}

export default async function EventDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)
  const event = getEvent(slug)
  if (!event) notFound()
  return <EventDetailView locale={locale as Locale} event={event} />
}
