import { hasLocale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing, type Locale } from '@/i18n/routing'
import { localizeBoard } from '@/content/board'
import { BoardDetailView } from '@/components/live/BoardDetailView'
import { loadBoard, loadBoardItem } from '@/lib/cms-source'

export async function generateStaticParams() {
  const members = await loadBoard()
  return members.map((m) => ({ slug: m.slug }))
}

export const dynamicParams = true

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  const member = await loadBoardItem(slug)
  if (!member || !hasLocale(routing.locales, locale)) return { title: 'TDYU Endowment Fund' }
  const L = localizeBoard(member, locale as Locale)
  return { title: `${L.name} — TDYU Endowment Fund` }
}

export default async function BoardDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)
  const member = await loadBoardItem(slug)
  if (!member) notFound()
  const all = await loadBoard()
  return <BoardDetailView locale={locale as Locale} member={member} others={all} />
}
