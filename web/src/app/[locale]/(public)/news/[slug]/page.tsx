import { hasLocale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing, type Locale } from '@/i18n/routing'
import { NEWS_POSTS, getNewsPost, localizePost } from '@/content/news'
import { NewsDetailView } from '@/components/live/NewsDetailView'
import { loadNewsItem } from '@/lib/cms-source'

export function generateStaticParams() {
  return NEWS_POSTS.map((p) => ({ slug: p.slug }))
}

export const dynamicParams = true

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const post = (await loadNewsItem(slug)) || getNewsPost(slug)
  if (!post || !hasLocale(routing.locales, locale)) {
    return { title: 'TDYU Endowment Fund' }
  }
  const L = localizePost(post, locale as Locale)
  return { title: `${L.title} — TDYU Endowment Fund` }
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)
  const post = await loadNewsItem(slug)
  if (!post) notFound()
  return <NewsDetailView locale={locale as Locale} post={post} />
}
