import Image from 'next/image'
import { getContent } from '@/content/site'
import type { Locale } from '@/i18n/routing'
import { PageHero } from './PageHero'
import { GrantForm } from './GrantForm'

function loc(locale: Locale, uz: string, ru: string, en: string) {
  return locale === 'ru' ? ru : locale === 'en' ? en : uz
}

export function GrantsView({ locale }: { locale: Locale }) {
  const c = getContent(locale)

  return (
    <>
      <PageHero
        image="/media/about/hero.jpg"
        title={loc(locale, 'Grantlar', 'Гранты', 'Grants')}
        lead={loc(
          locale,
          'Moliyaviy dasturlar: xalqaro ta’lim, tanlov stipendiyasi va ilmiy nashr grantlari.',
          'Финансовые программы: международное образование, конкурсные стипендии и гранты на публикации.',
          'Financial programmes: international education, contest scholarships and publishing grants.',
        )}
        crumbs={[
          { href: '/', label: loc(locale, 'Bosh', 'Главная', 'Home') },
          { href: '/grants', label: loc(locale, 'Grantlar', 'Гранты', 'Grants') },
        ]}
      />

      <section className="bg-cream py-16">
        <div className="live-wrap grid gap-10 lg:grid-cols-2 items-center mb-12">
          <div className="relative min-h-[320px] rounded-[16px] overflow-hidden">
            <Image src="/media/grants/main.jpg" alt="" fill className="object-cover" sizes="50vw" />
          </div>
          <div>
            <p className="text-sky font-semibold tracking-[0.14em] uppercase text-sm mb-2">{c.grantsEyebrow}</p>
            <h2 className="text-[clamp(1.6rem,3vw,2.2rem)] mb-4">{c.grantsTitle}</h2>
            <p className="leading-7">
              {loc(
                locale,
                'Iqtidorli talaba, xodim va tadqiqotchilar uchun ochiq grantlar. Ariza fondning mavjud API orqali qabul qilinadi.',
                'Открытые гранты для студентов, сотрудников и исследователей. Заявки принимаются через существующий API фонда.',
                'Open grants for students, staff and researchers. Applications go through the fund’s existing API.',
              )}
            </p>
          </div>
        </div>

        <div className="live-wrap grid gap-5 md:grid-cols-3 mb-14">
          {c.grants.map((g) => (
            <article key={g.t} className="bg-white rounded-[16px] p-6 shadow-[0_4px_30px_rgba(0,0,0,0.06)]">
              {g.b ? <p className="text-sky text-xs font-semibold uppercase tracking-wide mb-2">{g.b}</p> : null}
              <h3 className="text-lg text-tdyu mb-2">{g.t}</h3>
              <p className="text-sm leading-6 mb-3">{g.d}</p>
              <ul className="m-0 pl-4 text-sm text-body">
                {g.m.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="live-wrap max-w-[640px]">
          <h2 className="text-[clamp(1.4rem,2.5vw,1.9rem)] mb-4">{c.grantApply}</h2>
          <GrantForm />
        </div>
      </section>
    </>
  )
}
