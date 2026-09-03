'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Link, useRouter } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import {
  NEWS_CATEGORIES,
  NEWS_POSTS,
  localizePost,
  type NewsPost,
} from '@/content/news'
import { loc } from './loc'

function CalendarIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M16 3v4M8 3v4M3 11h18" />
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z" />
    </svg>
  )
}

/** Sticky sidebar — list va single uchun (dump blog sidebar) */
export function NewsSidebar({
  locale,
  query: queryProp,
  onQueryChange,
  cat,
  onCatChange,
  mode = 'filter',
}: {
  locale: Locale
  query?: string
  onQueryChange?: (v: string) => void
  cat: string | null
  onCatChange?: (v: string | null) => void
  /** filter = client archive; links = detail page → /news?… */
  mode?: 'filter' | 'links'
}) {
  const router = useRouter()
  const [localQuery, setLocalQuery] = useState(queryProp ?? '')
  const query = onQueryChange ? (queryProp ?? '') : localQuery
  const setQuery = onQueryChange ?? setLocalQuery
  const recent = NEWS_POSTS.slice(0, 3)

  function submitSearch(e: React.FormEvent) {
    e.preventDefault()
    if (mode === 'links') {
      const q = query.trim()
      router.push(q ? `/news?q=${encodeURIComponent(q)}` : '/news')
    }
  }

  return (
    <aside className="alumni-sidebar">
      <div className="alumni-sidebar-sticky">
        <div className="alumni-widget">
          <h4 className="alumni-widget-title">{loc(locale, 'Qidirish', 'Поиск', 'Search')}</h4>
          <form className="alumni-search" role="search" onSubmit={submitSearch}>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={loc(locale, 'Kalit so‘z...', 'Ключевое слово...', 'Keyword...')}
              aria-label={loc(locale, 'Qidirish', 'Поиск', 'Search')}
            />
            <button type="submit" className="alumni-search-btn" aria-label={loc(locale, 'Qidirish', 'Поиск', 'Search')}>
              <SearchIcon />
            </button>
          </form>
        </div>

        <div className="alumni-widget">
          <h4 className="alumni-widget-title">{loc(locale, 'Bo‘limlar', 'Разделы', 'Categories')}</h4>
          <ul className="alumni-cats">
            <li>
              {mode === 'links' ? (
                <Link href="/news" className={['alumni-cat', cat === null ? 'is-active' : ''].filter(Boolean).join(' ')}>
                  <span>{loc(locale, 'Barchasi', 'Все', 'All')}</span>
                  <span>({NEWS_POSTS.length})</span>
                </Link>
              ) : (
                <button
                  type="button"
                  className={['alumni-cat', cat === null ? 'is-active' : ''].filter(Boolean).join(' ')}
                  onClick={() => onCatChange?.(null)}
                >
                  <span>{loc(locale, 'Barchasi', 'Все', 'All')}</span>
                  <span>({NEWS_POSTS.length})</span>
                </button>
              )}
            </li>
            {NEWS_CATEGORIES.map((c) => {
              const label = locale === 'ru' ? c.ru : locale === 'en' ? c.en : c.uz
              const active = cat === c.key
              if (mode === 'links') {
                return (
                  <li key={c.key}>
                    <Link
                      href={`/news?cat=${encodeURIComponent(c.key)}`}
                      className={['alumni-cat', active ? 'is-active' : ''].filter(Boolean).join(' ')}
                    >
                      <span>{label}</span>
                      <span>({c.count})</span>
                    </Link>
                  </li>
                )
              }
              return (
                <li key={c.key}>
                  <button
                    type="button"
                    className={['alumni-cat', active ? 'is-active' : ''].filter(Boolean).join(' ')}
                    onClick={() => onCatChange?.(active ? null : c.key)}
                  >
                    <span>{label}</span>
                    <span>({c.count})</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="alumni-widget">
          <h4 className="alumni-widget-title">
            {loc(locale, 'So‘nggi yangiliklar', 'Последние новости', 'Recent news')}
          </h4>
          <div className="alumni-latest">
            {recent.map((post) => {
              const L = localizePost(post, locale)
              return (
                <Link key={post.slug} href={`/news/${post.slug}`} className="alumni-latest-item">
                  <span className="alumni-latest-thumb">
                    <Image src={post.img} alt="" width={80} height={80} className="object-cover w-full h-full" unoptimized />
                  </span>
                  <span className="alumni-latest-body">
                    <span className="alumni-latest-date">
                      <CalendarIcon />
                      {L.date}
                    </span>
                    <span className="alumni-latest-title">{L.title}</span>
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </aside>
  )
}

export type { NewsPost }
