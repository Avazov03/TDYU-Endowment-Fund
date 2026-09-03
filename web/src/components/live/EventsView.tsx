import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { EVENTS, localizeEvent } from '@/content/events'
import { PageHero } from './PageHero'
import { loc } from './loc'

export function EventsView({ locale }: { locale: Locale }) {
  const more = loc(locale, 'Batafsil', 'Подробнее', 'View Details')

  return (
    <>
      <PageHero
        image="/media/page-bnr-img1-1-min.jpg"
        objectPosition="center left"
        deco="/media/events/bnr-arrow-1-1.png"
        title={loc(locale, 'Tadbirlar', 'Мероприятия', 'Events')}
        lead={loc(
          locale,
          'TDYU Endowment Fund — bilim, grant va xalqaro imkoniyatlarga sarmoya.',
          'TDYU Endowment Fund — инвестиции в знания, гранты и международные возможности.',
          'TDYU Endowment Fund — investing in knowledge, grants and international opportunity.',
        )}
        crumbs={[
          { href: '/', label: loc(locale, 'Bosh', 'Главная', 'Home') },
          { href: '/events', label: loc(locale, 'Tadbirlar', 'Мероприятия', 'Events') },
        ]}
      />

      <section className="events-shell">
        <div className="events-inner">
          <div className="events-grid">
            {EVENTS.map((ev) => {
              const L = localizeEvent(ev, locale)
              const href = `/events/${ev.slug}`
              return (
                <article key={ev.slug} className="events-card">
                  <Link href={href} className="events-thumb">
                    <Image src={ev.img} alt="" fill className="object-cover" sizes="(max-width: 767px) 100vw, (max-width: 1024px) 50vw, 400px" unoptimized />
                    <span className="events-badge">{L.loc}</span>
                  </Link>
                  <div className="events-body">
                    <p className="events-meta">
                      <span>{L.date}</span>
                      <span className="events-meta-div" aria-hidden />
                      <span>{L.time}</span>
                    </p>
                    <h3 className="events-title">
                      <Link href={href}>{L.title}</Link>
                    </h3>
                    <Link href={href} className="events-more">
                      {more}
                    </Link>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
