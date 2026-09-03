import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { BOARD_DETAIL, localizeBoard, type BoardMember } from '@/content/board'
import { PageHero } from './PageHero'
import { loc } from './loc'

export function BoardDetailView({ locale, member }: { locale: Locale; member: BoardMember }) {
  const L = localizeBoard(member, locale)
  const others = BOARD_DETAIL.filter((m) => m.slug !== member.slug)

  return (
    <>
      <PageHero
        image="/media/dump/page-bnr-img1-1-min.jpg"
        title={L.name}
        lead={L.role}
        crumbs={[
          { href: '/', label: loc(locale, 'Bosh', 'Главная', 'Home') },
          { href: '/board', label: loc(locale, 'Boshqaruv', 'Управление', 'Governance') },
          { href: `/board/${member.slug}`, label: L.name },
        ]}
      />

      <section className="detail-shell">
        <div className="detail-inner detail-inner--profile">
          <aside className="detail-profile-card">
            <div className="detail-profile-photo">
              <Image src={member.img} alt="" width={560} height={620} className="object-cover object-top w-full h-full" unoptimized priority />
            </div>
            <h2 className="detail-profile-name">{L.name}</h2>
            <p className="detail-profile-role">{L.role}</p>
            <Link href="/contact" className="detail-profile-cta">
              {loc(locale, 'Aloqa', 'Контакты', 'Contact')}
            </Link>
          </aside>

          <article className="detail-main">
            <div className="detail-card">
              <div className="detail-body">
                <h3 className="detail-section-title">{loc(locale, 'Haqida', 'О профиле', 'About')}</h3>
                <div className="detail-content">
                  <p>{L.about || loc(locale, 'Profil ma’lumoti yangilanmoqda.', 'Профиль обновляется.', 'Profile details are being updated.')}</p>
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
            <Link href="/board" className="detail-back">
              {loc(locale, '← Barcha a’zolar', '← Все члены', '← All members')}
            </Link>
            <div className="detail-widget" style={{ marginTop: 24 }}>
              <h4>{loc(locale, 'Boshqa a’zolar', 'Другие члены', 'Other members')}</h4>
              <ul className="detail-related">
                {others.map((m) => {
                  const o = localizeBoard(m, locale)
                  return (
                    <li key={m.slug}>
                      <Link href={`/board/${m.slug}`}>{o.name}</Link>
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
