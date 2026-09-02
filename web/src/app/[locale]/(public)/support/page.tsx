import { hasLocale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing, type Locale } from '@/i18n/routing'
import { SupportView } from '@/components/live/SupportView'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const title =
    locale === 'ru' ? 'Помощь — TDYU Endowment Fund' : locale === 'en' ? 'Support — TDYU Endowment Fund' : 'Yordam — TDYU Endowment Fund'
  return { title }
}

export default async function SupportPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)
  return <SupportView locale={locale as Locale} />
}
