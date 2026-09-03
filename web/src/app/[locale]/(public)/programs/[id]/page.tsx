import { hasLocale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing, type Locale } from '@/i18n/routing'
import { PROGRAMS, getProgram, localizeProgram } from '@/content/programs'
import { ProgramDetailView } from '@/components/live/ProgramDetailView'

export function generateStaticParams() {
  return PROGRAMS.map((p) => ({ id: p.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { locale, id } = await params
  const program = getProgram(id)
  if (!program || !hasLocale(routing.locales, locale)) return { title: 'TDYU Endowment Fund' }
  const L = localizeProgram(program, locale as Locale)
  return { title: `${L.t} — TDYU Endowment Fund` }
}

export default async function ProgramDetailPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { locale, id } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)
  const program = getProgram(id)
  if (!program) notFound()
  return <ProgramDetailView locale={locale as Locale} program={program} />
}
