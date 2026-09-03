import { hasLocale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing, type Locale } from '@/i18n/routing'
import { BOARD_DETAIL, getBoardMember, localizeBoard } from '@/content/board'
import { BoardDetailView } from '@/components/live/BoardDetailView'

export function generateStaticParams() {
  return BOARD_DETAIL.map((m) => ({ slug: m.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  const member = getBoardMember(slug)
  if (!member || !hasLocale(routing.locales, locale)) return { title: 'TDYU Endowment Fund' }
  const L = localizeBoard(member, locale as Locale)
  return { title: `${L.name} — TDYU Endowment Fund` }
}

export default async function BoardDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)
  const member = getBoardMember(slug)
  if (!member) notFound()
  return <BoardDetailView locale={locale as Locale} member={member} />
}
