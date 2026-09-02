import { hasLocale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing, type Locale } from '@/i18n/routing'
import { GovernanceView } from '@/components/live/GovernanceView'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const title =
    locale === 'ru' ? 'Управление — TDYU Endowment Fund' : locale === 'en' ? 'Governance — TDYU Endowment Fund' : 'Boshqaruv — TDYU Endowment Fund'
  return { title }
}

export default async function GovernancePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)
  return <GovernanceView locale={locale as Locale} />
}
