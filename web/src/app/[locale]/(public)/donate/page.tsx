import { hasLocale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing, type Locale } from '@/i18n/routing'
import { DonateView } from '@/components/live/DonateView'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const title =
    locale === 'ru' ? 'Пожертвовать — TDYU Endowment Fund' : locale === 'en' ? 'Donate — TDYU Endowment Fund' : 'Xayriya — TDYU Endowment Fund'
  return { title }
}

export default async function DonatePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)
  return <DonateView locale={locale as Locale} />
}
