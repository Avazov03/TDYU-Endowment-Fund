import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { PageHero } from './PageHero'
import { GalleryStrip } from './GalleryStrip'
import { AboutTestimonials } from './AboutTestimonials'
import { AboutVideoPlay } from './AboutVideoPlay'

function loc(locale: Locale, uz: string, ru: string, en: string) {
  return locale === 'ru' ? ru : locale === 'en' ? en : uz
}

const DIRECTION_COPY = {
  uz: [
    { t: "Xalqaro ta’lim", d: 'Dunyo yetakchi universitetlarida malaka oshirish va stipendiyalar.' },
    { t: 'Xalqaro hamkorlik', d: 'Global ilmiy tashkilotlar va oliy ta’lim muassasalari bilan aloqalar.' },
    { t: 'Tanlov va nashrlar', d: 'Milliy va xalqaro tanlovlar, ilmiy nashrlar va tarjimalar.' },
  ],
  ru: [
    { t: 'Международное образование', d: 'Повышение квалификации и стипендии в ведущих университетах мира.' },
    { t: 'Международное сотрудничество', d: 'Связи с глобальными научными организациями и вузами.' },
    { t: 'Конкурсы и издания', d: 'Национальные и международные конкурсы, научные публикации и переводы.' },
  ],
  en: [
    { t: 'International education', d: 'Training and scholarships at leading universities worldwide.' },
    { t: 'International cooperation', d: 'Links with global academic organisations and universities.' },
    { t: 'Contests and publishing', d: 'National and international contests, academic publishing and translations.' },
  ],
} as const

const DIRECTION_ICONS = [
  <svg key="edu" viewBox="0 0 64 64" width="51" height="51" fill="currentColor" aria-hidden>
    <path d="M32 8 4 20l28 12 28-12L32 8Zm0 28L8.5 25.4v10.3C12.8 42.2 21.6 48 32 48s19.2-5.8 23.5-12.3V25.4L32 36Z" />
  </svg>,
  <svg key="net" viewBox="0 0 64 64" width="51" height="51" fill="currentColor" aria-hidden>
    <path d="M32 6a18 18 0 1 0 0 36 18 18 0 0 0 0-36Zm0 6c2.4 0 4.6.7 6.5 1.9L32 24.4 25.5 13.9A11.9 11.9 0 0 1 32 12Zm-14 12a14 14 0 0 1 5.2-8.1L30 28.4v11.3A14 14 0 0 1 18 24Zm14 16.8V28.4l6.8-12.5A14 14 0 0 1 46 24a14 14 0 0 1-14 16.8Z" />
    <path d="M12 48h40v4H12zM18 54h28v4H18z" />
  </svg>,
  <svg key="pub" viewBox="0 0 64 64" width="51" height="51" fill="currentColor" aria-hidden>
    <path d="M18 8h20l12 12v36H18V8Zm20 2.8V22h11.2L38 10.8ZM24 30h16v3H24v-3Zm0 8h16v3H24v-3Zm0 8h12v3H24v-3Z" />
  </svg>,
]

function CounterIcon({ kind }: { kind: 'projects' | 'partners' | 'countries' }) {
  if (kind === 'projects') {
    return (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="#00ADE2" aria-hidden>
        <path d="M9 21h6v-1.5H9V21Zm3-19a6 6 0 0 0-3.5 10.9c.7.5 1.1 1.2 1.3 2.1h4.4c.2-.9.6-1.6 1.3-2.1A6 6 0 0 0 12 2Z" />
      </svg>
    )
  }
  if (kind === 'partners') {
    return (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="#00ADE2" aria-hidden>
        <path d="M16 11a3 3 0 1 0-3-3 3 3 0 0 0 3 3ZM8 11a3 3 0 1 0-3-3 3 3 0 0 0 3 3Zm0 2c-2.7 0-8 1.3-8 4v2h10v-2c0-1.5.7-2.7 1.8-3.5C10.7 13.2 9.3 13 8 13Zm8 0c-.4 0-.8 0-1.2.1 1.4.8 2.2 2 2.2 3.4v2h7v-2c0-2.7-5.3-4-8-4Z" />
      </svg>
    )
  }
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="#00ADE2" aria-hidden>
      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm7.9 9h-3.1a15 15 0 0 0-1.3-5.1A8 8 0 0 1 19.9 11ZM12 4c.9 0 2.3 2.2 3 7H9c.7-4.8 2.1-7 3-7ZM4.1 13h3.1a15 15 0 0 0 1.3 5.1A8 8 0 0 1 4.1 13Zm3.1-2H4.1a8 8 0 0 1 4.4-5.1A15 15 0 0 0 7.2 11Zm1.8 2h6c-.7 4.8-2.1 7-3 7s-2.3-2.2-3-7Zm6.7 5.1A15 15 0 0 0 16.8 13h3.1a8 8 0 0 1-4.4 5.1Z" />
    </svg>
  )
}

function QuoteMark() {
  return (
    <svg width="40" height="30" viewBox="0 0 60 44" fill="#00ADE2" aria-hidden>
      <path d="M0.720703 11.624C2.05985 4.27024 9.11653 -0.618174 16.4697 0.720703C23.6971 2.03676 28.5612 9.17643 28.1611 16.2275L28.1377 16.5635C27.4789 24.8299 22.2284 35.1586 10.207 42.3857L9.62988 42.7275C9.0368 43.0735 8.27986 42.3888 8.64453 41.7266L8.64648 41.7227C10.1681 38.9033 12.0827 34.3794 13.2168 28.1084L13.3135 27.5732L12.7715 27.5215C4.75888 26.7561 -0.682171 19.3398 0.720703 11.624ZM32.0371 11.624C33.3763 4.27025 40.4329 -0.618173 47.7861 0.720703C55.0134 2.03682 59.8776 9.17648 59.4775 16.2275L59.4541 16.5635C58.7849 24.9611 53.3772 35.487 40.9463 42.7275H40.9453C40.3523 43.0733 39.5962 42.3887 39.9609 41.7266L39.9629 41.7227C41.4845 38.9033 43.3991 34.3794 44.5332 28.1084L44.6299 27.5732L44.0879 27.5215C36.0752 26.7561 30.6342 19.3399 32.0371 11.624Z" />
    </svg>
  )
}

export function AboutView({ locale }: { locale: Locale }) {
  const dirs = DIRECTION_COPY[locale].map((item, i) => ({
    ...item,
    icon: DIRECTION_ICONS[i],
  }))

  const principlesLead = loc(
    locale,
    'Oshkoralik, kollegiallik, o‘zaro hurmat, teng huquqlilik va ixtiyoriylik — faoliyatimiz asosi. Fond yetakchi jamoat fondi.',
    'Открытость, коллегиальность, взаимное уважение, равноправие и добровольность — основа нашей работы. Фонд — ведущий общественный фонд.',
    'Transparency, collegiality, mutual respect, equality and voluntary participation are the basis of our work. The fund is a leading public fund.',
  )

  const opportunityLead = loc(
    locale,
    'Xalqaro hamkorlik va ilmiy aloqalar orqali TDYU jamoasiga yangi imkoniyatlar ochiladi.',
    'Международное сотрудничество и научные связи открывают новые возможности команде ТГЮУ.',
    'International cooperation and academic links open new opportunities for the TSUL community.',
  )

  return (
    <>
      <PageHero
        image="/media/about-remote.jpg"
        title={loc(locale, 'Missiya', 'Миссия', 'Mission')}
        lead={loc(
          locale,
          'Huquqiy ta’limning kelajagiga sarmoya. Bilim, grant va xalqaro imkoniyatlar.',
          'Инвестиции в будущее юридического образования. Знания, гранты и международные возможности.',
          'Investment in the future of legal education. Knowledge, grants and international opportunity.',
        )}
        crumbs={[
          { href: '/', label: loc(locale, 'Bosh', 'Главная', 'Home') },
          { href: '/about-us', label: loc(locale, 'Missiya', 'Миссия', 'Mission') },
        ]}
      />

      <section id="mission" className="about-shell scroll-mt-[120px]">
        <div className="about-shell-inner">
          <aside className="about-sidebar">
            <div className="about-sidebar-card">
              <h2 className="about-sidebar-title">{loc(locale, 'Fond haqida', 'О фонде', 'About the fund')}</h2>
              <span className="about-sidebar-line" aria-hidden />
              <Link href="/about-us#mission" className="about-sidebar-link">
                <span>{loc(locale, 'Fond nima uchun mavjud', 'Зачем существует фонд', 'Why the fund exists')}</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M13.172 12 8.222 7.05l1.414-1.414L16 12l-6.364 6.364-1.414-1.414z" />
                </svg>
              </Link>
              <div className="about-sidebar-thumb">
                <Image src="/media/about/sidebar.jpg" alt="" width={236} height={160} className="object-cover w-full h-full" unoptimized />
              </div>
            </div>
          </aside>

          <div className="about-main">
            <div className="about-intro">
              <h2 className="about-intro-title">
                {loc(locale, 'Bilim — eng yaxshi sarmoya', 'Знание — лучшая инвестиция', 'Knowledge is the best investment')}
              </h2>
              <p className="about-intro-text">
                {loc(
                  locale,
                  'TDYU Endowment Fund — a’zoligi bo‘lmagan jamoat fondi. Maqsad: TDYU xodimlari va talabalari uchun xalqaro malaka oshirish, grant va stipendiya, universitet nufuzini oshirish.',
                  'TDYU Endowment Fund — общественный фонд без членства. Цель: международное повышение квалификации сотрудников и студентов ТГЮУ, гранты и стипендии, укрепление авторитета университета.',
                  'TDYU Endowment Fund is a public fund without membership. Purpose: international training for TSUL staff and students, grants and scholarships, and a stronger university standing.',
                )}
              </p>
            </div>

            <blockquote className="about-quote">
              <QuoteMark />
              <p>
                {loc(
                  locale,
                  'Fond faoliyati oshkoralik, kollegiallik, teng huquqlilik va ixtiyoriylik tamoyillariga asoslanadi. Har bir dastur shu mezonlar bilan baholanadi.',
                  'Деятельность фонда основана на принципах открытости, коллегиальности, равноправия и добровольности. Каждая программа оценивается по этим критериям.',
                  'The fund operates on transparency, collegiality, equality and voluntary participation. Every programme is assessed against these criteria.',
                )}
              </p>
              <footer>— TDYU Endowment Fund</footer>
            </blockquote>

            <p className="about-opportunity-lead">{opportunityLead}</p>

            <div className="about-photos">
              <div className="about-photos-grid">
                <div className="about-photo">
                  <Image src="/media/about/photo-1.jpg" alt="" width={640} height={420} className="object-cover w-full h-full" unoptimized />
                </div>
                <div className="about-photo">
                  <Image src="/media/about/photo-2.jpg" alt="" width={640} height={420} className="object-cover w-full h-full" unoptimized />
                </div>
              </div>
              <div className="about-photos-seal" aria-hidden>
                <Image src="/media/about/deco.png" alt="" width={140} height={140} className="object-contain" unoptimized />
              </div>
            </div>

            <div className="about-counters">
              {[
                { n: '10.5', suffix: 'K', l: loc(locale, 'Loyihalar', 'Проекты', 'Projects'), kind: 'projects' as const },
                { n: '150', suffix: '+', l: loc(locale, 'Hamkorlar', 'Партнёры', 'Partners'), kind: 'partners' as const },
                { n: '120', suffix: '+', l: loc(locale, 'Davlatlar', 'Страны', 'Countries'), kind: 'countries' as const },
              ].map((s) => (
                <div key={s.l} className="about-counter">
                  <CounterIcon kind={s.kind} />
                  <div>
                    <div className="about-counter-num">
                      {s.n}
                      <span>{s.suffix}</span>
                    </div>
                    <div className="about-counter-label">{s.l}</div>
                  </div>
                </div>
              ))}
            </div>

            <div id="pillars" className="about-directions scroll-mt-[120px]">
              <h3 className="about-block-title">{loc(locale, 'Asosiy yo‘nalishlar', 'Основные направления', 'Core directions')}</h3>
              <p className="about-block-lead">{principlesLead}</p>
              <div className="about-direction-grid">
                {dirs.map((d) => (
                  <article key={d.t} className="about-direction-card">
                    <div className="about-direction-icon">{d.icon}</div>
                    <h4>{d.t}</h4>
                    <p>{d.d}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="about-brand">
              <h3 className="about-block-title">{loc(locale, 'TSUL brendi', 'Бренд TSUL', 'TSUL brand')}</h3>
              <p className="about-block-lead">{opportunityLead}</p>
              <div className="about-video">
                <Image src="/media/about/video.jpg" alt="" fill className="object-cover" sizes="(max-width:1024px) 100vw, 74vw" unoptimized />
                <AboutVideoPlay locale={locale} />
              </div>
            </div>

            <div className="about-principles">
              <h3 className="about-block-title text-center">{loc(locale, 'Bizning tamoyillarimiz', 'Наши принципы', 'Our principles')}</h3>
              <p className="about-block-lead text-center mx-auto max-w-[62ch]">{principlesLead}</p>
              <AboutTestimonials locale={locale} />
            </div>
          </div>
        </div>
      </section>

      <GalleryStrip locale={locale} />
    </>
  )
}
