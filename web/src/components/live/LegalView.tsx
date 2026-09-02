import { brand, officialNames } from '@/content/site'
import { getContent } from '@/content/site'
import type { Locale } from '@/i18n/routing'
import { PageHero } from './PageHero'
import { loc } from './loc'

export function LegalView({ locale }: { locale: Locale }) {
  const c = getContent(locale)
  return (
    <>
      <PageHero
        image="/media/about/hero.jpg"
        title={loc(locale, 'Huquqiy asos', 'Правовая основа', 'Legal basis')}
        lead={c.legalTitle}
        crumbs={[
          { href: '/', label: loc(locale, 'Bosh', 'Главная', 'Home') },
          { href: '/legal', label: loc(locale, 'Huquqiy asos', 'Правовая основа', 'Legal') },
        ]}
      />
      <section className="bg-cream py-16">
        <div className="live-wrap grid gap-5 md:grid-cols-3 mb-10">
          {c.legal.map((l) => (
            <article key={l.t} className="bg-white rounded-[16px] p-6 shadow-[0_4px_30px_rgba(0,0,0,0.06)]">
              <h3 className="text-lg mb-2">{l.t}</h3>
              <p className="text-sm leading-6 m-0">{l.d}</p>
            </article>
          ))}
        </div>
        <div className="live-wrap bg-white rounded-[16px] p-6">
          <h2 className="text-lg mb-3">{loc(locale, 'Rasmiy nomlar', 'Официальные названия', 'Official names')}</h2>
          <ul className="m-0 pl-4 text-sm leading-7">
            {officialNames.map((n) => (
              <li key={n.lang}>
                <strong>{n.lang}:</strong> {n.name}
              </li>
            ))}
          </ul>
          <p className="text-sm mt-4 mb-0">{brand.registrar[locale]}</p>
        </div>
      </section>
    </>
  )
}
