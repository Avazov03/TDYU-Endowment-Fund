import { getContent } from '@/content/site'
import type { Locale } from '@/i18n/routing'
import { PageHero } from './PageHero'
import { loc } from './loc'

export function ReportsView({ locale }: { locale: Locale }) {
  const c = getContent(locale)
  return (
    <>
      <PageHero
        image="/media/home/spend-bg.jpg"
        title={loc(locale, 'Hisobotlar', 'Отчёты', 'Reports')}
        lead={c.reportsTitle}
        crumbs={[
          { href: '/', label: loc(locale, 'Bosh', 'Главная', 'Home') },
          { href: '/reports', label: loc(locale, 'Hisobotlar', 'Отчёты', 'Reports') },
        ]}
      />
      <section className="bg-cream py-16">
        <div className="live-wrap grid gap-5 md:grid-cols-2">
          {c.reports.map((r) => (
            <article key={r.t} className="bg-white rounded-[16px] p-6 shadow-[0_4px_30px_rgba(0,0,0,0.06)]">
              <p className="text-xs text-sky mb-2">{r.date}</p>
              <h3 className="text-lg mb-2">{r.t}</h3>
              <p className="text-sm leading-6 m-0">{r.d}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
