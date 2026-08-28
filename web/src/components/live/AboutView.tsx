import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { getContent } from '@/content/site'
import type { Locale } from '@/i18n/routing'
import { PageHero } from './PageHero'

function loc(locale: Locale, uz: string, ru: string, en: string) {
  return locale === 'ru' ? ru : locale === 'en' ? en : uz
}

const DIRECTIONS = {
  uz: [
    { t: 'Xalqaro ta’lim', d: 'Dunyo yetakchi universitetlarida malaka oshirish va stipendiyalar.' },
    { t: 'Xalqaro hamkorlik', d: 'Global ilmiy tashkilotlar va oliy ta’lim muassasalari bilan aloqalar.' },
    { t: 'Tanlov va nashrlar', d: 'Milliy va xalqaro tanlovlar, ilmiy nashrlar va tarjimalar.' },
    { t: 'TSUL brendi', d: 'Xalqaro hamkorlik va ilmiy aloqalar orqali TDYU jamoasiga yangi imkoniyatlar ochiladi.' },
  ],
  ru: [
    { t: 'Международное образование', d: 'Повышение квалификации и стипендии в ведущих университетах мира.' },
    { t: 'Международное сотрудничество', d: 'Связи с глобальными научными организациями и вузами.' },
    { t: 'Конкурсы и издания', d: 'Национальные и международные конкурсы, научные публикации и переводы.' },
    { t: 'Бренд TSUL', d: 'Международное сотрудничество открывает новые возможности команде ТГЮУ.' },
  ],
  en: [
    { t: 'International education', d: 'Training and scholarships at leading universities worldwide.' },
    { t: 'International cooperation', d: 'Links with global academic organisations and universities.' },
    { t: 'Contests and publishing', d: 'National and international contests, academic publishing and translations.' },
    { t: 'TSUL brand', d: 'International cooperation opens new opportunities for the TSUL community.' },
  ],
} as const

export function AboutView({ locale }: { locale: Locale }) {
  const c = getContent(locale)
  const quotes = [
    {
      q: loc(
        locale,
        'Fond faoliyati oshkoralik, kollegiallik, teng huquqlilik va ixtiyoriylik tamoyillariga asoslanadi. Har bir dastur shu mezonlar bilan baholanadi.',
        'Деятельность фонда основана на принципах открытости, коллегиальности, равноправия и добровольности. Каждая программа оценивается по этим критериям.',
        'The fund operates on transparency, collegiality, equality and voluntary participation. Every programme is assessed against these criteria.',
      ),
      n: loc(locale, 'Zulfiya Ergasheva', 'Зульфия Эргашева', 'Zulfiya Ergasheva'),
      r: loc(locale, 'Katta o‘qituvchi', 'Старший преподаватель', 'Senior lecturer'),
    },
    {
      q: loc(
        locale,
        'Fond stipendiyasi tufayli xalqaro tajriba oldim. Bu mening karyeram uchun muhim burilish bo‘ldi.',
        'Благодаря стипендии фонда я получила международный опыт. Это стало важным поворотом в карьере.',
        'The fund scholarship gave me international experience. It was a turning point in my career.',
      ),
      n: 'TDYU Alumni',
      r: 'Manager',
    },
    {
      q: c.stories[0]?.q ?? '',
      n: c.stories[0]?.n ?? 'Aziz Karimov',
      r: loc(locale, 'Alumni', 'Alumni', 'Alumni'),
    },
  ]

  return (
    <>
      <PageHero
        image="/media/about/hero.jpg"
        title={loc(locale, 'Missiya', 'Миссия', 'Mission')}
        lead={loc(
          locale,
          'Huquqiy ta’limning kelajagiga sarmoya. Bilim, grant va xalqaro imkoniyatlar.',
          'Инвестиция в будущее юридического образования. Знания, гранты и международные возможности.',
          'Investment in the future of legal education. Knowledge, grants and international opportunity.',
        )}
        crumbs={[
          { href: '/', label: loc(locale, 'Bosh', 'Главная', 'Home') },
          { href: '/about-us', label: loc(locale, 'Missiya', 'Миссия', 'Mission') },
        ]}
      />

      <section className="bg-cream py-16">
        <div className="live-wrap grid gap-10 lg:grid-cols-[280px_1fr] items-start">
          <aside className="bg-white rounded-[16px] p-6 shadow-[0_4px_30px_rgba(0,0,0,0.06)]">
            <h2 className="text-lg mb-2">{loc(locale, 'Fond haqida', 'О фонде', 'About the fund')}</h2>
            <span className="block w-14 h-[3px] bg-sky mb-5" aria-hidden />
            <Link
              href="/about-us"
              className="flex items-center justify-between gap-3 rounded-[12px] bg-tdyu text-white px-4 py-3 font-semibold"
            >
              {loc(locale, 'Fond nima uchun mavjud', 'Зачем существует фонд', 'Why the fund exists')}
              <span aria-hidden>→</span>
            </Link>
            <div className="relative mt-5 h-[160px] rounded-[12px] overflow-hidden">
              <Image src="/media/about/sidebar.jpg" alt="" fill className="object-cover" sizes="280px" />
            </div>
          </aside>

          <div>
            <h2 className="text-[clamp(1.6rem,3vw,2.2rem)] mb-4">{c.mission.title}</h2>
            <p className="leading-7 mb-6 max-w-[62ch]">
              {loc(
                locale,
                'TDYU Endowment Fund — a’zoligi bo‘lmagan jamoat fondi. Maqsad: TDYU xodimlari va talabalari uchun xalqaro malaka oshirish, grant va stipendiya, universitet nufuzini oshirish.',
                'TDYU Endowment Fund — общественный фонд без членства. Цель: международное повышение квалификации сотрудников и студентов ТГЮУ, гранты и стипендии, укрепление авторитета университета.',
                'TDYU Endowment Fund is a public fund without membership. Purpose: international training for TSUL staff and students, grants and scholarships, and a stronger university standing.',
              )}
            </p>
            <blockquote className="relative bg-white rounded-[16px] p-8 shadow-[0_4px_30px_rgba(0,0,0,0.05)]">
              <span className="text-sky text-5xl leading-none font-[Maitree,Georgia,serif]" aria-hidden>
                “
              </span>
              <p className="italic leading-7 mt-2">{c.mission.paragraphs[2]}</p>
              <footer className="mt-4 text-sm font-semibold text-tdyu">— TDYU Endowment Fund</footer>
            </blockquote>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="live-wrap grid gap-8 lg:grid-cols-2 items-center">
          <div className="relative min-h-[380px]">
            <Image src="/media/about/photo-1.jpg" alt="" width={640} height={420} className="rounded-[16px] w-[78%] h-[300px] object-cover shadow-[0_18px_40px_rgba(12,87,118,0.16)]" />
            <Image src="/media/about/photo-2.jpg" alt="" width={400} height={280} className="absolute right-0 bottom-0 w-[48%] h-[220px] object-cover rounded-[16px] border-8 border-white" />
          </div>
          <div>
            <p className="text-sky font-semibold tracking-[0.14em] uppercase text-sm mb-3">{loc(locale, 'Imkoniyatlar', 'Возможности', 'Opportunities')}</p>
            <h2 className="text-[clamp(1.5rem,3vw,2.1rem)] mb-4">
              {loc(
                locale,
                'Xalqaro hamkorlik va ilmiy aloqalar orqali TDYU jamoasiga yangi imkoniyatlar ochiladi.',
                'Международное сотрудничество открывает новые возможности команде ТГЮУ.',
                'International cooperation opens new opportunities for the TSUL community.',
              )}
            </h2>
            <p className="leading-7 max-w-[54ch]">{c.mission.paragraphs[1]}</p>
          </div>
        </div>
      </section>

      <section className="relative py-14 text-white overflow-hidden">
        <Image src="/media/about/count-bg.jpg" alt="" fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-tdyu/80" />
        <div className="live-wrap relative z-10 grid grid-cols-3 gap-6 text-center">
          {[
            { n: '31', l: loc(locale, 'Loyihalar', 'Проекты', 'Projects') },
            { n: '18', l: loc(locale, 'Hamkorlar', 'Партнёры', 'Partners') },
            { n: '24', l: loc(locale, 'Davlatlar', 'Страны', 'Countries') },
          ].map((s) => (
            <div key={s.l}>
              <div className="font-[Maitree,Georgia,serif] text-[clamp(1.8rem,3vw,2.6rem)] font-bold">{s.n}</div>
              <div className="text-xs uppercase tracking-wide text-white/80">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-cream py-16">
        <div className="live-wrap text-center mb-10 max-w-[60ch] mx-auto">
          <h2 className="text-[clamp(1.6rem,3vw,2.2rem)] mb-3">{loc(locale, 'Asosiy yo‘nalishlar', 'Основные направления', 'Core directions')}</h2>
          <p>
            {loc(
              locale,
              'Oshkoralik, kollegiallik, o‘zaro hurmat, teng huquqlilik va ixtiyoriylik — faoliyatimiz asosi.',
              'Открытость, коллегиальность, взаимное уважение, равноправие и добровольность — основа нашей работы.',
              'Transparency, collegiality, mutual respect, equality and voluntary participation are the basis of our work.',
            )}
          </p>
        </div>
        <div className="live-wrap grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {DIRECTIONS[locale].map((d) => (
            <article key={d.t} className="bg-white rounded-[16px] p-6 shadow-[0_4px_30px_rgba(0,0,0,0.06)]">
              <h3 className="text-tdyu text-lg mb-2">{d.t}</h3>
              <p className="text-sm leading-6 m-0">{d.d}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="py-16">
        <div className="live-wrap text-center mb-10">
          <h2 className="text-[clamp(1.6rem,3vw,2.2rem)] mb-3">{loc(locale, 'Bizning tamoyillarimiz', 'Наши принципы', 'Our principles')}</h2>
          <p className="max-w-[55ch] mx-auto">
            {loc(
              locale,
              'Oshkoralik, kollegiallik, o‘zaro hurmat, teng huquqlilik va ixtiyoriylik — faoliyatimiz asosi. Fond yetakchi jamoat fondi.',
              'Открытость, коллегиальность, взаимное уважение, равноправие и добровольность — основа нашей работы.',
              'Transparency, collegiality, mutual respect, equality and voluntary participation — the foundation of our work.',
            )}
          </p>
        </div>
        <div className="live-wrap grid gap-5 md:grid-cols-3">
          {quotes.map((s) => (
            <blockquote key={s.n + s.r} className="bg-cream rounded-[16px] p-6">
              <p className="italic leading-7 mb-3">“{s.q}”</p>
              <strong className="text-ink">{s.n}</strong>
              <div className="text-sm mt-1">{s.r}</div>
            </blockquote>
          ))}
        </div>
      </section>
    </>
  )
}
