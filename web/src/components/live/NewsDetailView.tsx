import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { getAdjacentNews, localizePost, type NewsPost } from '@/content/news'
import { PageHero } from './PageHero'
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

/** Dump blog single — PageHero + alumni-shell (content + sticky sidebar) */
export function NewsDetailView({ locale, post }: { locale: Locale; post: NewsPost }) {
  const L = localizePost(post, locale)
  const { prev, next } = getAdjacentNews(post.slug)
  const prevL = prev ? localizePost(prev, locale) : null
  const nextL = next ? localizePost(next, locale) : null

  return (
    <>
      <PageHero
        image="/media/dump/page-bnr-img26-min.jpg"
        height={413}
        deco="/media/dump/news/bnr-arrow-1-1.png"
        title={L.title}
        lead={L.excerpt}
        crumbs={[
          { href: '/', label: loc(locale, 'Bosh', 'Главная', 'Home') },
          { href: '/news', label: loc(locale, 'Yangiliklar', 'Новости', 'News') },
          {
            href: `/news/${post.slug}`,
            label: L.title.length > 48 ? `${L.title.slice(0, 45)}…` : L.title,
          },
        ]}
      />

      <section className="alumni-shell news-shell">
        <div className="alumni-shell-inner">
          <article className="alumni-main news-detail">
            <div className="news-detail-card">
              <div className="news-detail-media">
                <Image src={post.img} alt="" width={1024} height={614} className="object-cover w-full h-full" unoptimized priority />
                <div className="news-card-cats">
                  <Link href={`/news?cat=${encodeURIComponent(post.tag)}`} className="news-card-badge">
                    {L.tag}
                  </Link>
                </div>
              </div>

              <div className="news-detail-body">
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

                <h2 className="news-detail-title">{L.title}</h2>

                <div className="news-detail-content">
                  {L.body.map((para) => (
                    <p key={para.slice(0, 48)}>{para}</p>
                  ))}
                </div>

                <div className="news-detail-tags">
                  <span className="news-detail-tags-label">{loc(locale, 'Bo‘lim:', 'Раздел:', 'Category:')}</span>
                  <Link href={`/news?cat=${encodeURIComponent(post.tag)}`} className="news-detail-tag">
                    {L.tag}
                  </Link>
                </div>
              </div>
            </div>

            <nav className="news-detail-nav" aria-label={loc(locale, 'Boshqa yangiliklar', 'Другие новости', 'More news')}>
              {prev && prevL ? (
                <Link href={`/news/${prev.slug}`} className="news-detail-nav-item is-prev">
                  <span className="news-detail-nav-label">{loc(locale, 'Oldingi', 'Предыдущая', 'Previous')}</span>
                  <span className="news-detail-nav-title">{prevL.title}</span>
                </Link>
              ) : (
                <span className="news-detail-nav-item is-empty" />
              )}
              {next && nextL ? (
                <Link href={`/news/${next.slug}`} className="news-detail-nav-item is-next">
                  <span className="news-detail-nav-label">{loc(locale, 'Keyingi', 'Следующая', 'Next')}</span>
                  <span className="news-detail-nav-title">{nextL.title}</span>
                </Link>
              ) : (
                <span className="news-detail-nav-item is-empty" />
              )}
            </nav>

            <div className="news-detail-back">
              <Link href="/news" className="alumni-read-more">
                {loc(locale, '← Barcha yangiliklar', '← Все новости', '← All news')}
              </Link>
            </div>
          </article>

          <NewsSidebar locale={locale} cat={post.tag} mode="links" />
        </div>
      </section>
    </>
  )
}
