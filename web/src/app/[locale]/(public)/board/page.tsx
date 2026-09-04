import { hasLocale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing, type Locale } from '@/i18n/routing'
import { BoardView } from '@/components/live/BoardView'
import { loadBoard } from '@/lib/cms-source'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const title =
    locale === 'ru'
      ? 'Управление — TDYU Endowment Fund'
      : locale === 'en'
        ? 'Governance — TDYU Endowment Fund'
        : 'Boshqaruv — TDYU Endowment Fund'
  return { title }
}

export default async function BoardPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)
  const members = await loadBoard()
  return <BoardView locale={locale as Locale} members={members} />
}
