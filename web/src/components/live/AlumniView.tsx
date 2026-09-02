import { getContent } from '@/content/site'
import type { Locale } from '@/i18n/routing'
import { PageHero } from './PageHero'
import { ContactForm } from './ContactForm'
import { loc } from './loc'

export function AlumniView({ locale }: { locale: Locale }) {
  const c = getContent(locale)
  return (
    <>
      <PageHero
        image="/media/about/hero.jpg"
        title="Alumni"
        lead={c.alumniLead}
        crumbs={[
          { href: '/', label: loc(locale, 'Bosh', 'Главная', 'Home') },
          { href: '/alumni', label: 'Alumni' },
        ]}
      />
      <section className="bg-cream py-16">
        <div className="live-wrap grid gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-14">
          {c.alumniPoints.map((p) => (
            <article key={`${p.c}-${p.n}`} className="bg-white rounded-[16px] p-5 shadow-[0_4px_30px_rgba(0,0,0,0.06)]">
              <p className="text-sky text-xs font-semibold uppercase mb-1">{p.t}</p>
              <h3 className="text-lg mb-1">{p.n}</h3>
              <p className="text-sm m-0">{p.c}</p>
            </article>
          ))}
        </div>
        <div className="live-wrap max-w-[640px]" id="register">
          <h2 className="text-[clamp(1.4rem,2.5vw,1.9rem)] mb-4">{c.alumniRegTitle}</h2>
          <ContactForm page="alumni" />
        </div>
      </section>
    </>
  )
}
