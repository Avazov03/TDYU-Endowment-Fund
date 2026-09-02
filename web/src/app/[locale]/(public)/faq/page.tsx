import { hasLocale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing, type Locale } from '@/i18n/routing'
import { FaqView } from '@/components/live/FaqView'

export function generateMetadata() {
  return { title: 'FAQ — TDYU Endowment Fund' }
}

export default async function FaqPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)
  return <FaqView locale={locale as Locale} />
}
