import { hasLocale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing, type Locale } from '@/i18n/routing'
import { ALUMNI_PEOPLE, getAlumni, localizeAlumni } from '@/content/alumni'
import { AlumniDetailView } from '@/components/live/AlumniDetailView'

export function generateStaticParams() {
  return ALUMNI_PEOPLE.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  const person = getAlumni(slug)
  if (!person || !hasLocale(routing.locales, locale)) return { title: 'TDYU Endowment Fund' }
  const L = localizeAlumni(person, locale as Locale)
  return { title: `${L.name} — Alumni — TDYU Endowment Fund` }
}

export default async function AlumniDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)
  const person = getAlumni(slug)
  if (!person) notFound()
  return <AlumniDetailView locale={locale as Locale} person={person} />
}
