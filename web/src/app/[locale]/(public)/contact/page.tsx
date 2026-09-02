import { hasLocale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing, type Locale } from '@/i18n/routing'
import { ContactView } from '@/components/live/ContactView'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const title =
    locale === 'ru' ? 'Контакты — TDYU Endowment Fund' : locale === 'en' ? 'Contact — TDYU Endowment Fund' : 'Aloqa — TDYU Endowment Fund'
  return { title }
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)
  return <ContactView locale={locale as Locale} />
}
