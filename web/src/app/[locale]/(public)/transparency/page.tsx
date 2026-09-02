import { hasLocale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing, type Locale } from '@/i18n/routing'
import { TransparencyView } from '@/components/live/TransparencyView'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const title =
    locale === 'ru'
      ? 'Прозрачность — TDYU Endowment Fund'
      : locale === 'en'
        ? 'Transparency — TDYU Endowment Fund'
        : 'Shaffoflik — TDYU Endowment Fund'
  return { title }
}

export default async function TransparencyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)
  return <TransparencyView locale={locale as Locale} />
}
