import { hasLocale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing, type Locale } from '@/i18n/routing'
import { NEWS_CATEGORIES } from '@/content/news'
import { NewsView } from '@/components/live/NewsView'
import { loadNews } from '@/lib/cms-source'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const title =
    locale === 'ru' ? 'Новости — TDYU Endowment Fund' : locale === 'en' ? 'News — TDYU Endowment Fund' : 'Yangiliklar — TDYU Endowment Fund'
  return { title }
}

export default async function NewsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ page?: string; q?: string; cat?: string }>
}) {
  const { locale } = await params
  const sp = await searchParams
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)
  const page = Math.max(1, Number.parseInt(sp.page || '1', 10) || 1)
  const initialQuery = (sp.q || '').trim()
  const catRaw = (sp.cat || '').trim()
  const validCat = NEWS_CATEGORIES.some((c) => c.key === catRaw) ? catRaw : null
  const items = await loadNews()
  return (
    <NewsView
      locale={locale as Locale}
      page={page}
      initialQuery={initialQuery}
      initialCat={validCat}
      items={items}
    />
  )
}
