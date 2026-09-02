import { Link } from '@/i18n/navigation'
import { getContent } from '@/content/site'
import type { Locale } from '@/i18n/routing'
import { PageHero } from './PageHero'
import { loc } from './loc'

export function SupportView({ locale }: { locale: Locale }) {
  const c = getContent(locale)
  return (
    <>
      <PageHero
        image="/media/about/hero.jpg"
        title={loc(locale, 'Yordam', 'Помощь', 'Support')}
        lead={c.supportTitle}
        crumbs={[
          { href: '/', label: loc(locale, 'Bosh', 'Главная', 'Home') },
          { href: '/support', label: loc(locale, 'Yordam', 'Помощь', 'Support') },
        ]}
      />
      <section className="bg-cream py-16">
        <div className="live-wrap grid gap-5 md:grid-cols-2">
          {c.support.map((s) => (
            <article key={s.t} className="bg-white rounded-[16px] p-6 shadow-[0_4px_30px_rgba(0,0,0,0.06)]">
              <h3 className="text-lg mb-2">{s.t}</h3>
              <p className="text-sm leading-6 mb-4">{s.d}</p>
              <Link href={s.href as never} className="text-sky font-semibold">
                {s.cta} →
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
