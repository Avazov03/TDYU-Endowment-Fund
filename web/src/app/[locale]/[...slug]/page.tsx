import { notFound } from 'next/navigation'
import { hasLocale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { DumpView } from '@/components/DumpView'
import { loadDump } from '@/lib/dump'
import { routing, type Locale } from '@/i18n/routing'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string[] }>
}) {
  const { locale, slug } = await params
  if (!hasLocale(routing.locales, locale)) return {}
  const dump = loadDump(locale, slug)
  if (!dump) return { title: 'TDYU Endowment Fund' }
  return { title: dump.title, description: 'Tashkent State University of Law Endowment Fund' }
}

export default async function DumpCatchAllPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string[] }>
}) {
  const { locale, slug } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)
  const dump = loadDump(locale, slug)
  if (!dump) notFound()
  return <DumpView dump={dump} locale={locale as Locale} />
}
