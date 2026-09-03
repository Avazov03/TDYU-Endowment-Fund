import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { localizeProject, PROJECTS, type ProjectItem } from '@/content/projects'
import { PageHero } from './PageHero'
import { loc } from './loc'

export function ProjectDetailView({ locale, project }: { locale: Locale; project: ProjectItem }) {
  const L = localizeProject(project, locale)
  const others = PROJECTS.filter((p) => p.slug !== project.slug).slice(0, 4)

  return (
    <>
      <PageHero
        image="/media/dump/projects/page-bnr-img19-min.jpg"
        objectPosition="left center"
        title={L.title}
        lead={L.body[0]?.slice(0, 140)}
        crumbs={[
          { href: '/', label: loc(locale, 'Bosh', 'Главная', 'Home') },
          { href: '/projects', label: loc(locale, 'Loyihalar', 'Проекты', 'Projects') },
          { href: `/projects/${project.slug}`, label: L.title.length > 42 ? `${L.title.slice(0, 40)}…` : L.title },
        ]}
      />

      <section className="detail-shell">
        <div className="detail-inner">
          <article className="detail-main">
            <div className="detail-card">
              <div className="detail-media">
                <Image src={project.img} alt="" width={900} height={560} className="object-cover w-full h-full" unoptimized priority />
              </div>
              <div className="detail-body">
                <p className="detail-meta">
                  <span>{L.date}</span>
                  <span aria-hidden>·</span>
                  <span>{project.year}</span>
                </p>
                <h2 className="detail-title">{L.title}</h2>
                <div className="detail-content">
                  {L.body.map((p) => (
                    <p key={p.slice(0, 40)}>{p}</p>
                  ))}
                </div>
              </div>
            </div>
            <Link href="/projects" className="detail-back">
              {loc(locale, '← Barcha loyihalar', '← Все проекты', '← All projects')}
            </Link>
          </article>

          <aside className="detail-aside">
            <div className="detail-widget">
              <h4>{loc(locale, 'Boshqa loyihalar', 'Другие проекты', 'Other projects')}</h4>
              <ul className="detail-related">
                {others.map((p) => {
                  const o = localizeProject(p, locale)
                  return (
                    <li key={p.slug}>
                      <Link href={`/projects/${p.slug}`}>{o.title}</Link>
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
