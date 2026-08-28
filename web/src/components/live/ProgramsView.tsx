import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { getContent } from '@/content/site'
import type { Locale } from '@/i18n/routing'
import { PageHero } from './PageHero'

function loc(locale: Locale, uz: string, ru: string, en: string) {
  return locale === 'ru' ? ru : locale === 'en' ? en : uz
}

const PHOTOS = [
  '/media/programs/p1.jpg',
  '/media/programs/p2.jpg',
  '/media/programs/p3.jpg',
  '/media/programs/p4.jpg',
  '/media/programs/p5.jpg',
  '/media/programs/p6.jpg',
  '/media/programs/p7.jpg',
]

export function ProgramsView({ locale }: { locale: Locale }) {
  const c = getContent(locale)

  return (
    <>
      <PageHero
        image="/media/about/hero.jpg"
        title={loc(locale, '7 asosiy dastur', '7 основных программ', '7 core programs')}
        lead={c.programsLead}
        crumbs={[
          { href: '/', label: loc(locale, 'Bosh', 'Главная', 'Home') },
          { href: '/programs', label: loc(locale, 'Dasturlar', 'Программы', 'Programs') },
        ]}
      />

      <section className="bg-cream py-16">
        <div className="live-wrap text-center mb-10">
          <p className="text-tdyu font-semibold tracking-[0.16em] uppercase text-[13px] mb-2">PROGRAMS &amp; STUDY</p>
          <h2 className="text-[clamp(1.6rem,3vw,2.2rem)]">{c.programsTitle}</h2>
        </div>
        <div className="live-wrap grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {c.programs.map((p, i) => (
            <article key={p.n} className="bg-white rounded-[16px] overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.06)]">
              <div className="relative h-[200px]">
                <Image src={PHOTOS[i] || PHOTOS[0]} alt="" fill className="object-cover" sizes="33vw" />
              </div>
              <div className="p-5">
                <p className="text-sky text-sm font-semibold mb-1">{p.n}</p>
                <h3 className="text-[1.15rem] text-tdyu mb-2">{p.t}</h3>
                <p className="text-sm leading-6 mb-3">{p.d}</p>
                <p className="text-xs text-body m-0">{p.tag}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="live-wrap text-center mt-10">
          <Link href="/grants" className="inline-flex rounded-[30px] bg-sky text-white font-semibold px-6 py-3">
            {loc(locale, 'Grantlarga ariza', 'Заявка на грант', 'Apply for a grant')}
          </Link>
        </p>
      </section>
    </>
  )
}
