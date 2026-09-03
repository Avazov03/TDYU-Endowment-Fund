import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { localizeProgram, PROGRAMS, type Program } from '@/content/programs'
import { PageHero } from './PageHero'
import { loc } from './loc'

export function ProgramDetailView({ locale, program }: { locale: Locale; program: Program }) {
  const L = localizeProgram(program, locale)
  const related = PROGRAMS.filter((p) => p.id !== program.id).slice(0, 4)
  const relatedLabel =
    locale === 'ru' ? program.relatedLabel.ru : locale === 'en' ? program.relatedLabel.en : program.relatedLabel.uz

  return (
    <>
      <PageHero
        image="/media/dump/page-bnr-img22-min.jpg"
        height={413}
        deco="/brand/tdyu-mark.svg"
        title={L.t}
        lead={L.d}
        crumbs={[
          { href: '/', label: loc(locale, 'Bosh', 'Главная', 'Home') },
          { href: '/programs', label: loc(locale, 'Dasturlar', 'Программы', 'Programs') },
          { href: `/programs/${program.id}`, label: L.t.length > 42 ? `${L.t.slice(0, 40)}…` : L.t },
        ]}
      />

      <section className="detail-shell">
        <div className="detail-inner">
          <article className="detail-main">
            <div className="detail-card">
              <div className="detail-media">
                <Image src={program.img} alt="" width={900} height={560} className="object-cover w-full h-full" unoptimized priority />
              </div>
              <div className="detail-body">
                <div className="programs-card-tags" style={{ marginBottom: 16 }}>
                  {L.tags.map((tag) => (
                    <span key={tag} className="programs-card-tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="detail-title">{L.t}</h2>
                <div className="detail-content">
                  {L.body.map((p) => (
                    <p key={p.slice(0, 40)}>{p}</p>
                  ))}
                </div>
                <div className="detail-goals" style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                  <Link href={program.relatedHref} className="detail-profile-cta">
                    {relatedLabel}
                  </Link>
                  <Link href="/contact" className="alumni-read-more">
                    {loc(locale, 'Savol berish', 'Задать вопрос', 'Ask a question')}
                  </Link>
                </div>
              </div>
            </div>
            <Link href="/programs" className="detail-back">
              {loc(locale, '← Barcha dasturlar', '← Все программы', '← All programs')}
            </Link>
          </article>

          <aside className="detail-aside">
            <div className="detail-widget">
              <h4>{loc(locale, 'Boshqa dasturlar', 'Другие программы', 'Other programmes')}</h4>
              <ul className="detail-related">
                {related.map((p) => {
                  const o = localizeProgram(p, locale)
                  return (
                    <li key={p.id}>
                      <Link href={`/programs/${p.id}`}>{o.t}</Link>
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
