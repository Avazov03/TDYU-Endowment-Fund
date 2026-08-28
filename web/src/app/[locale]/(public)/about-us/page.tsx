import { hasLocale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing, type Locale } from '@/i18n/routing'
import { AboutView } from '@/components/live/AboutView'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const title =
    locale === 'ru' ? 'Миссия — TDYU Endowment Fund' : locale === 'en' ? 'Mission — TDYU Endowment Fund' : 'Missiya — TDYU Endowment Fund'
  return { title }
}

export default async function AboutUsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)
  return <AboutView locale={locale as Locale} />
}
