import { hasLocale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing, type Locale } from '@/i18n/routing'
import { localizeEvent } from '@/content/events'
import { EventDetailView } from '@/components/live/EventDetailView'
import { loadEvent, loadEvents } from '@/lib/cms-source'

export async function generateStaticParams() {
  const events = await loadEvents()
  return events.map((e) => ({ slug: e.slug }))
}

export const dynamicParams = true

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  const event = await loadEvent(slug)
  if (!event || !hasLocale(routing.locales, locale)) return { title: 'TDYU Endowment Fund' }
  const L = localizeEvent(event, locale as Locale)
  return { title: `${L.title} — TDYU Endowment Fund` }
}

export default async function EventDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)
  const event = await loadEvent(slug)
  if (!event) notFound()
  const all = await loadEvents()
  return <EventDetailView locale={locale as Locale} event={event} others={all.filter((e) => e.slug !== event.slug)} />
}
