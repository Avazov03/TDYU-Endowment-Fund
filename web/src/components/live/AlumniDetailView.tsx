import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { ALUMNI_PEOPLE, localizeAlumni, type AlumniPerson } from '@/content/alumni'
import { PageHero } from './PageHero'
import { loc } from './loc'

export function AlumniDetailView({ locale, person }: { locale: Locale; person: AlumniPerson }) {
  const L = localizeAlumni(person, locale)
  const others = ALUMNI_PEOPLE.filter((p) => p.slug !== person.slug).slice(0, 3)

  return (
    <>
      <PageHero
        image="/media/alumni/page-bnr-img25-min.jpg"
        objectPosition="center right"
        deco="/media/alumni/bnr-arrow-1-1.png"
        title={L.name}
        lead={L.role}
        crumbs={[
          { href: '/', label: loc(locale, 'Bosh', 'Главная', 'Home') },
          { href: '/alumni', label: 'Alumni' },
          { href: `/alumni/${person.slug}`, label: L.name },
        ]}
      />

      <section className="detail-shell">
        <div className="detail-inner detail-inner--profile">
          <aside className="detail-profile-card">
            <div className="detail-profile-photo">
              <Image src={person.img} alt="" width={560} height={560} className="object-cover object-top w-full h-full" unoptimized priority />
            </div>
            <h2 className="detail-profile-name">{L.name}</h2>
            <p className="detail-profile-role">{L.role}</p>
          </aside>

          <article className="detail-main">
            <div className="detail-card">
              <div className="detail-body">
                <h3 className="detail-section-title">{loc(locale, 'Haqida', 'О профиле', 'About')}</h3>
                <div className="detail-content">
                  <p>{L.about}</p>
                </div>
                {L.quals.length ? (
                  <div className="detail-goals">
                    <h3>{loc(locale, 'Malaka', 'Квалификация', 'Qualifications')}</h3>
                    <ul>
                      {L.quals.map((g) => (
                        <li key={g}>{g}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </div>
            <Link href="/alumni" className="detail-back">
              {loc(locale, '← Barcha alumni', '← Все alumni', '← All alumni')}
            </Link>
            <div className="detail-widget" style={{ marginTop: 24 }}>
              <h4>{loc(locale, 'Boshqa bitiruvchilar', 'Другие выпускники', 'Other alumni')}</h4>
              <ul className="detail-related">
                {others.map((p) => {
                  const o = localizeAlumni(p, locale)
                  return (
                    <li key={p.slug}>
                      <Link href={`/alumni/${p.slug}`}>{o.name}</Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          </article>
        </div>
      </section>
    </>
  )
}
