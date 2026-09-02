import { getContent } from '@/content/site'
import type { Locale } from '@/i18n/routing'
import { PageHero } from './PageHero'
import { loc } from './loc'

export function GovernanceView({ locale }: { locale: Locale }) {
  const c = getContent(locale)
  return (
    <>
      <PageHero
        image="/media/about/hero.jpg"
        title={loc(locale, 'Boshqaruv', 'Управление', 'Governance')}
        lead={c.govTitle}
        crumbs={[
          { href: '/', label: loc(locale, 'Bosh', 'Главная', 'Home') },
          { href: '/governance', label: loc(locale, 'Boshqaruv', 'Управление', 'Governance') },
        ]}
      />
      <section className="bg-cream py-16">
        <div className="live-wrap grid gap-6 md:grid-cols-3">
          {c.governance.map((g) => (
            <article key={g.id} className="bg-white rounded-[16px] p-6 shadow-[0_4px_30px_rgba(0,0,0,0.06)]">
              <h3 className="text-lg mb-2">{g.label}</h3>
              <p className="text-sm leading-6 mb-3">{g.intro}</p>
              <ul className="m-0 pl-4 text-sm leading-7">
                {g.powers.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
