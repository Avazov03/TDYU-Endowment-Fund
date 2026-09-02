import { hasLocale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing, type Locale } from '@/i18n/routing'
import { PrivacyView } from '@/components/live/PrivacyView'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const title =
    locale === 'ru'
      ? 'Конфиденциальность — TDYU Endowment Fund'
      : locale === 'en'
        ? 'Privacy — TDYU Endowment Fund'
        : 'Maxfiylik — TDYU Endowment Fund'
  return { title }
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)
  return <PrivacyView locale={locale as Locale} />
}
