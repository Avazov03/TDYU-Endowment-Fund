import { getContent } from '@/content/site'
import type { Locale } from '@/i18n/routing'
import { PageHero } from './PageHero'
import { loc } from './loc'

export function ProjectsView({ locale }: { locale: Locale }) {
  const c = getContent(locale)
  return (
    <>
      <PageHero
        image="/media/about/hero.jpg"
        title={loc(locale, 'Loyihalar', 'Проекты', 'Projects')}
        lead={c.projectsLead}
        crumbs={[
          { href: '/', label: loc(locale, 'Bosh', 'Главная', 'Home') },
          { href: '/projects', label: loc(locale, 'Loyihalar', 'Проекты', 'Projects') },
        ]}
      />
      <section className="bg-cream py-16">
        <div className="live-wrap grid gap-5 md:grid-cols-2">
          {c.projects.map((p) => (
            <article key={p.t} className="bg-white rounded-[16px] p-6 shadow-[0_4px_30px_rgba(0,0,0,0.06)]">
              <p className="text-sky text-xs font-semibold uppercase mb-2">
                {p.tag} · {p.y}
              </p>
              <h3 className="text-lg mb-2">{p.t}</h3>
              <p className="text-sm leading-6 m-0">{p.d}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
