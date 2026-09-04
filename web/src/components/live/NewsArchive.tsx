'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { NEWS_PER_PAGE, NEWS_POSTS, localizePost, type NewsPost } from '@/content/news'
import { NewsSidebar } from './NewsSidebar'
import { loc } from './loc'

function UserIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M20 21a8 8 0 0 0-16 0" />
      <circle cx="12" cy="8" r="4" />
    </svg>
  )
}

function CalendarIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M16 3v4M8 3v4M3 11h18" />
    </svg>
  )
}

function CommentIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M5 5.5h14a1.5 1.5 0 0 1 1.5 1.5v8A1.5 1.5 0 0 1 19 16.5H10l-4.5 3v-3H5A1.5 1.5 0 0 1 3.5 15V7A1.5 1.5 0 0 1 5 5.5Z" />
    </svg>
  )
}

function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M13.172 12 8.222 7.05l1.414-1.414L16 12l-6.364 6.364-1.414-1.414L13.172 12Z" />
    </svg>
  )
}

function PostCard({ post, locale }: { post: NewsPost; locale: Locale }) {
  const L = localizePost(post, locale)
  const href = `/news/${post.slug}`
  return (
    <article className="alumni-card news-card" id={post.slug}>
      <div className="alumni-card-media news-card-media">
        <Link href={href} className="news-card-media-link">
          <Image src={post.img} alt="" width={1024} height={614} className="object-cover w-full h-full" unoptimized />
        </Link>
        <div className="news-card-cats">
          <Link href={`/news?cat=${encodeURIComponent(post.tag)}`} className="news-card-badge">
            {L.tag}
          </Link>
        </div>
      </div>
      <div className="alumni-card-body">
        <div className="alumni-card-meta">
          <span className="alumni-meta-item">
            <UserIcon />
            TDYU Endowment
          </span>
          <span className="alumni-meta-item">
            <CalendarIcon />
            {L.date}
          </span>
          <span className="alumni-meta-item">
            <CommentIcon />
            {loc(locale, 'Izohlar (0)', 'Комментарии (0)', 'Comments (0)')}
          </span>
        </div>
        <h3 className="alumni-card-title">
          <Link href={href}>{L.title}</Link>
        </h3>
        <p className="alumni-card-excerpt">{L.excerpt}</p>
        <Link href={href} className="alumni-read-more">
          {loc(locale, 'Batafsil', 'Подробнее', 'Read more')}
        </Link>
      </div>
    </article>
  )
}

/** Dump /cyan/blog/ — Alumni arxivi bilan bir xil shell (sticky sidebar + kartalar) */
export function NewsArchive({
  locale,
  page = 1,
  initialQuery = '',
  initialCat = null,
  items = NEWS_POSTS,
}: {
  locale: Locale
  page?: number
  initialQuery?: string
  initialCat?: string | null
  items?: NewsPost[]
}) {
  const [query, setQuery] = useState(initialQuery)
  const [cat, setCat] = useState<string | null>(initialCat)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return items.filter((p) => {
      if (cat && p.tag !== cat) return false
      if (!q) return true
      const L = localizePost(p, locale)
      return [L.title, L.excerpt, L.tag, p.title, p.titleRu, p.titleEn, ...L.body].join(' ').toLowerCase().includes(q)
    })
  }, [items, query, cat, locale])

  const totalPages = Math.max(1, Math.ceil(filtered.length / NEWS_PER_PAGE))
  const safePage = Math.min(Math.max(1, page), totalPages)
  const posts = filtered.slice((safePage - 1) * NEWS_PER_PAGE, safePage * NEWS_PER_PAGE)

  function pageHref(n: number) {
    const params = new URLSearchParams()
    if (n > 1) params.set('page', String(n))
    if (cat) params.set('cat', cat)
    if (query.trim()) params.set('q', query.trim())
    const s = params.toString()
    return s ? `/news?${s}` : '/news'
  }

  return (
    <div className="alumni-shell-inner">
      <div className="alumni-main">
        {posts.length === 0 ? (
          <p className="alumni-empty">
            {loc(locale, 'Yangilik topilmadi.', 'Новости не найдены.', 'No news found.')}
          </p>
        ) : (
          posts.map((post) => <PostCard key={post.slug} post={post} locale={locale} />)
        )}

        {totalPages > 1 ? (
          <nav className="news-pager" aria-label={loc(locale, 'Sahifalar', 'Страницы', 'Pages')}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) =>
              n === safePage ? (
                <span key={n} className="news-pager-item is-current" aria-current="page">
                  {n}
                </span>
              ) : (
                <Link key={n} href={pageHref(n)} className="news-pager-item">
                  {n}
                </Link>
              ),
            )}
            {safePage < totalPages ? (
              <Link
                href={pageHref(safePage + 1)}
                className="news-pager-item news-pager-next"
                aria-label={loc(locale, 'Keyingi', 'Далее', 'Next')}
              >
                <ArrowRightIcon />
              </Link>
            ) : null}
          </nav>
        ) : null}
      </div>

      <NewsSidebar
        locale={locale}
        query={query}
        onQueryChange={setQuery}
        cat={cat}
        onCatChange={setCat}
        mode="filter"
      />
    </div>
  )
}
