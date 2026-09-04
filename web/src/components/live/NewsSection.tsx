import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { localizePost, type NewsPost } from '@/content/news'

const COPY = {
  uz: {
    eyebrow: 'Blog & News',
    title: 'Fond yangiliklari',
    all: 'Barcha yangiliklar',
    author: 'TDYU Endowment',
  },
  ru: {
    eyebrow: 'Blog & News',
    title: 'Новости фонда',
    all: 'Все новости',
    author: 'TDYU Endowment',
  },
  en: {
    eyebrow: 'Blog & News',
    title: 'Fund news',
    all: 'All news',
    author: 'TDYU Endowment',
  },
} as const

function EyebrowIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M5.21484 12.8949V16.6564C5.21484 16.6564 8.82175 15.1537 12.0198 15.1537C15.2178 15.1537 18.8255 16.6564 18.8255 16.6564V12.8424C18.8255 12.8424 15.3844 11.0225 11.9665 11.0225C8.55018 11.021 5.21484 12.8949 5.21484 12.8949Z" />
      <path d="M22.6467 11.9993L24 11.2716L22.6467 10.5222V10.1666C22.6467 10.1666 23.0278 8.23413 20.862 9.24464C20.7517 9.30465 20.6924 9.36542 20.6684 9.42468L11.7367 4.47119L0 11.1884L4.43211 13.2019V12.5485C4.43211 12.5485 8.15079 10.4607 11.9625 10.4607C15.7734 10.4607 19.6092 12.4899 19.6092 12.4899V13.631L22.0563 12.3167V17.6377H21.2416V19.529L22.3248 18.7803L23.5274 19.529V17.637H22.6467V11.9993ZM22.0555 9.83803V10.1944L21.3413 9.79827C21.6017 9.62573 22.0555 9.38642 22.0555 9.83803ZM21.814 11.9251C21.737 11.9279 21.6603 11.9152 21.5883 11.8877C21.5164 11.8602 21.4507 11.8185 21.3952 11.7651C21.3398 11.7117 21.2956 11.6476 21.2655 11.5768C21.2353 11.5059 21.2198 11.4297 21.2197 11.3527C21.2197 11.2757 21.2351 11.1994 21.2652 11.1285C21.2953 11.0576 21.3393 10.9935 21.3947 10.94C21.4501 10.8865 21.5157 10.8447 21.5876 10.8172C21.6595 10.7896 21.7362 10.7768 21.8132 10.7795C21.9615 10.7848 22.102 10.8474 22.2051 10.9542C22.3082 11.0609 22.3659 11.2035 22.366 11.3519C22.3661 11.5003 22.3086 11.643 22.2056 11.7499C22.1027 11.8568 21.9623 11.9196 21.814 11.9251Z" />
    </svg>
  )
}

function ButtonDotsIcon() {
  return (
    <svg width="18" height="15" viewBox="0 0 18 15" fill="currentColor" aria-hidden>
      <path d="M10.5 7.5C10.5 8.32843 9.82843 9 9 9C8.17157 9 7.5 8.32843 7.5 7.5C7.5 6.67157 8.17157 6 9 6C9.82843 6 10.5 6.67157 10.5 7.5Z" />
      <path d="M10.5 13.5C10.5 14.3284 9.82843 15 9 15C8.17157 15 7.5 14.3284 7.5 13.5C7.5 12.6716 8.17157 12 9 12C9.82843 12 10.5 12.6716 10.5 13.5Z" />
      <path d="M3 7.5C3 8.32843 2.32843 9 1.5 9C0.671573 9 0 8.32843 0 7.5C0 6.67157 0.671573 6 1.5 6C2.32843 6 3 6.67157 3 7.5Z" />
      <path d="M18 7.5C18 8.32843 17.3284 9 16.5 9C15.6716 9 15 8.32843 15 7.5C15 6.67157 15.6716 6 16.5 6C17.3284 6 18 6.67157 18 7.5Z" />
      <path d="M10.5 1.5C10.5 2.32843 9.82843 3 9 3C8.17157 3 7.5 2.32843 7.5 1.5C7.5 0.671573 8.17157 0 9 0C9.82843 0 10.5 0.671573 10.5 1.5Z" />
    </svg>
  )
}

function TagIcon() {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M10.9042 2.1003L20.8037 3.51452L22.2179 13.414L13.0255 22.6065C12.635 22.997 12.0019 22.9971 11.6113 22.6065L1.81184 12.8071C1.42132 12.4166 1.42127 11.7834 1.81179 11.3929L10.9042 2.1003ZM13.7326 10.6837C14.5137 11.4648 15.7801 11.4647 16.5611 10.6837C17.3422 9.90261 17.3422 8.63628 16.5611 7.85522C15.7801 7.07417 14.5137 7.07412 13.7326 7.85517C12.9516 8.63622 12.9516 9.9026 13.7326 10.6837Z" />
    </svg>
  )
}

function CalendarIcon() {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
      <path d="M8 3.5v3M16 3.5v3M3.5 10h17" />
    </svg>
  )
}

function UserIcon() {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <circle cx="12" cy="8" r="3.25" />
      <path d="M5.5 19.5c1.6-3.2 4-4.75 6.5-4.75s4.9 1.55 6.5 4.75" />
    </svg>
  )
}

/** Home news strip — CMS/API posts (fallback handled by parent loadNews) */
export function NewsSection({ locale, posts }: { locale: Locale; posts: NewsPost[] }) {
  const t = COPY[locale]
  const items = posts.slice(0, 3)

  return (
    <section className="news-section" aria-labelledby="news-section-heading">
      <div className="live-wrap news-section-inner">
        <div className="news-section-head">
          <div className="news-section-heading">
            <p className="news-section-eyebrow">
              <EyebrowIcon />
              {t.eyebrow}
            </p>
            <h2 id="news-section-heading" className="news-section-title">
              {t.title}
            </h2>
          </div>
          <Link href="/news" className="news-all-btn program-btn">
            <span className="program-btn-icon">
              <ButtonDotsIcon />
            </span>
            <span className="program-btn-text" data-text={t.all}>
              {t.all}
            </span>
          </Link>
        </div>

        <div className="news-section-grid">
          {items.map((post) => {
            const L = localizePost(post, locale)
            const href = `/news/${post.slug}`
            return (
              <article key={post.slug} className="news-card">
                <Link href={href} className="news-card-thumb">
                  <Image src={post.img} alt="" fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" unoptimized />
                </Link>
                <div className="news-card-body">
                  <div className="news-card-meta news-card-meta--before">
                    <span className="news-card-meta-item">
                      <TagIcon />
                      {L.tag}
                    </span>
                    <span className="news-card-meta-item">
                      <CalendarIcon />
                      {L.date}
                    </span>
                  </div>
                  <h3 className="news-card-title">
                    <Link href={href}>{L.title}</Link>
                  </h3>
                  <div className="news-card-meta news-card-meta--after">
                    <span className="news-card-meta-item">
                      <UserIcon />
                      {t.author}
                    </span>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
