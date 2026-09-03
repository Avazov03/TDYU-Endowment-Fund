import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { localizeEvent, type EventItem, EVENTS } from '@/content/events'
import { PageHero } from './PageHero'
import { loc } from './loc'

export function EventDetailView({ locale, event }: { locale: Locale; event: EventItem }) {
  const L = localizeEvent(event, locale)
  const others = EVENTS.filter((e) => e.slug !== event.slug).slice(0, 3)

  return (
    <>
      <PageHero
        image="/media/page-bnr-img1-1-min.jpg"
        objectPosition="center left"
        deco="/media/events/bnr-arrow-1-1.png"
        title={L.title}
        lead={L.body[0]?.slice(0, 140)}
        crumbs={[
          { href: '/', label: loc(locale, 'Bosh', 'Главная', 'Home') },
          { href: '/events', label: loc(locale, 'Tadbirlar', 'Мероприятия', 'Events') },
          { href: `/events/${event.slug}`, label: L.title.length > 42 ? `${L.title.slice(0, 40)}…` : L.title },
        ]}
      />

      <section className="detail-shell">
        <div className="detail-inner">
          <article className="detail-main">
            <div className="detail-card">
              <div className="detail-media">
                <Image src={event.img} alt="" width={900} height={560} className="object-cover w-full h-full" unoptimized priority />
              </div>
              <div className="detail-body">
                <p className="detail-meta">
                  <span>{L.date}</span>
                  <span aria-hidden>·</span>
                  <span>{L.time}</span>
                  <span aria-hidden>·</span>
                  <span>{L.loc}</span>
                </p>
                <h2 className="detail-title">{L.title}</h2>
                <div className="detail-content">
                  {L.body.map((p) => (
                    <p key={p.slice(0, 40)}>{p}</p>
                  ))}
                </div>
                {L.goals.length ? (
                  <div className="detail-goals">
                    <h3>{loc(locale, 'Maqsadlar', 'Цели', 'Goals')}</h3>
                    <ul>
                      {L.goals.map((g) => (
                        <li key={g}>{g}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </div>
            <Link href="/events" className="detail-back">
              {loc(locale, '← Barcha tadbirlar', '← Все мероприятия', '← All events')}
            </Link>
          </article>

          <aside className="detail-aside">
            <div className="detail-widget">
              <h4>{loc(locale, 'Boshqa tadbirlar', 'Другие мероприятия', 'Other events')}</h4>
              <ul className="detail-related">
                {others.map((e) => {
                  const o = localizeEvent(e, locale)
                  return (
                    <li key={e.slug}>
                      <Link href={`/events/${e.slug}`}>{o.title}</Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
