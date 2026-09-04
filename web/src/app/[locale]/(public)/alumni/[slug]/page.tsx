import { hasLocale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing, type Locale } from '@/i18n/routing'
import { localizeAlumni } from '@/content/alumni'
import { AlumniDetailView } from '@/components/live/AlumniDetailView'
import { loadAlumni, loadAlumniItem } from '@/lib/cms-source'

export async function generateStaticParams() {
  const people = await loadAlumni()
  return people.map((p) => ({ slug: p.slug }))
}

export const dynamicParams = true

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  const person = await loadAlumniItem(slug)
  if (!person || !hasLocale(routing.locales, locale)) return { title: 'TDYU Endowment Fund' }
  const L = localizeAlumni(person, locale as Locale)
  return { title: `${L.name} — Alumni — TDYU Endowment Fund` }
}

export default async function AlumniDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)
  const person = await loadAlumniItem(slug)
  if (!person) notFound()
  const all = await loadAlumni()
  return <AlumniDetailView locale={locale as Locale} person={person} others={all} />
}
