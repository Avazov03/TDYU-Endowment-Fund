import { getContent } from '@/content/site'
import type { Locale } from '@/i18n/routing'
import { PageHero } from './PageHero'
import { loc } from './loc'

export function TransparencyView({ locale }: { locale: Locale }) {
  const c = getContent(locale)
  return (
    <>
      <PageHero
        image="/media/home/spend-bg.jpg"
        title={loc(locale, 'Shaffoflik', 'Прозрачность', 'Transparency')}
        lead={c.spendTitle}
        crumbs={[
          { href: '/', label: loc(locale, 'Bosh', 'Главная', 'Home') },
          { href: '/transparency', label: loc(locale, 'Shaffoflik', 'Прозрачность', 'Transparency') },
        ]}
      />
      <section className="bg-cream py-16">
        <div className="live-wrap grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-[clamp(1.5rem,3vw,2rem)] mb-6">{c.spendTitle}</h2>
            <ul className="grid gap-4 m-0 p-0 list-none">
              {c.spend.map((s) => (
                <li key={s.l}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{s.l}</span>
                    <strong>{s.p}%</strong>
                  </div>
                  <div className="h-2 rounded-full bg-white overflow-hidden">
                    <div className="h-full bg-sky rounded-full" style={{ width: `${s.p}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-[clamp(1.5rem,3vw,2rem)] mb-4">{c.sourcesTitle}</h2>
            <ul className="pl-4 leading-7">
              {c.sources.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}
