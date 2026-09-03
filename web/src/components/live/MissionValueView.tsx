import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { PageHero } from './PageHero'
import { GalleryStrip } from './GalleryStrip'
import { MissionMarquee, MissionPercentCounter, MissionVisionAccordion, MapDotsIcon } from './MissionValueWidgets'

function loc(locale: Locale, uz: string, ru: string, en: string) {
  return locale === 'ru' ? ru : locale === 'en' ? en : uz
}

const CARDS = {
  uz: [
    {
      t: 'Ilmiy nashrlar',
      d: 'Dunyo universitetlarida malaka oshirish va stipendiyalar.',
      img: '/media/mission-value/inner-cat-img1-min.jpg',
    },
    {
      t: 'TSUL brendi',
      d: 'Xorijda markazlar va kutubxonalar.',
      img: '/media/mission-value/inner-cat-img2-min.jpg',
    },
    {
      t: 'Tadbirkorlik',
      d: 'O‘quv kurslar va yozgi maktablar.',
      img: '/media/mission-value/inner-cat-img3-min.jpg',
    },
  ],
  ru: [
    {
      t: 'Научные публикации',
      d: 'Повышение квалификации и стипендии в университетах мира.',
      img: '/media/mission-value/inner-cat-img1-min.jpg',
    },
    {
      t: 'Бренд TSUL',
      d: 'Центры и библиотеки за рубежом.',
      img: '/media/mission-value/inner-cat-img2-min.jpg',
    },
    {
      t: 'Предпринимательство',
      d: 'Учебные курсы и летние школы.',
      img: '/media/mission-value/inner-cat-img3-min.jpg',
    },
  ],
  en: [
    {
      t: 'Academic publishing',
      d: 'Training and scholarships at universities worldwide.',
      img: '/media/mission-value/inner-cat-img1-min.jpg',
    },
    {
      t: 'TSUL brand',
      d: 'Centres and libraries abroad.',
      img: '/media/mission-value/inner-cat-img2-min.jpg',
    },
    {
      t: 'Entrepreneurship',
      d: 'Training courses and summer schools.',
      img: '/media/mission-value/inner-cat-img3-min.jpg',
    },
  ],
} as const

export function MissionValueView({ locale }: { locale: Locale }) {
  const cards = CARDS[locale]
  const title6 = loc(locale, '6 ustun', '6 столпов', '6 pillars')

  return (
    <>
      <PageHero
        image="/media/dump/page-bnr-img1-1-min.jpg"
        title={title6}
        lead={loc(
          locale,
          'Huquqiy ta’limning kelajagiga sarmoya. Oltita ustun — fond strategiyasi.',
          'Инвестиции в будущее юридического образования. Шесть столпов — стратегия фонда.',
          'Investment in the future of legal education. Six pillars — the fund’s strategy.',
        )}
        crumbs={[
          { href: '/', label: loc(locale, 'Bosh', 'Главная', 'Home') },
          { href: '/mission-value', label: title6 },
        ]}
      />

      <section className="mv-pillars">
        <div className="mv-pillars-inner">
          <aside className="mv-pillars-side">
            <div className="mv-pillars-sticky">
              <Image
                src="/media/mission-value/mission-1.png"
                alt=""
                width={120}
                height={120}
                className="mv-pillars-logo"
                unoptimized
              />
              <h2 className="mv-pillars-heading">
                {loc(locale, 'Fondning 6 ustuni', '6 столпов фонда', 'The fund’s 6 pillars')}
              </h2>
              <MissionPercentCounter />
              <p className="mv-pillars-note">
                {loc(
                  locale,
                  'ta ustun — ta’lim, hamkorlik, tanlov, nashr, brend va tadbirkorlik.',
                  'столпов — образование, сотрудничество, конкурсы, публикации, бренд и предпринимательство.',
                  'pillars — education, cooperation, contests, publishing, brand and entrepreneurship.',
                )}
              </p>
            </div>
          </aside>

          <div className="mv-pillars-main">
            <div className="mv-timeline" aria-hidden>
              <span className="mv-timeline-dot" />
            </div>
            <div className="mv-pillar-item">
              <h3 className="mv-pillar-title">{loc(locale, 'Xalqaro ta’lim', 'Международное образование', 'International education')}</h3>
              <p className="mv-pillar-text">
                {loc(
                  locale,
                  'Fond oltita ustun asosida ishlaydi: xalqaro ta’lim, hamkorlik, tanlovlar, ilmiy nashrlar, TSUL brendi va tadbirkorlik. Har bir yo‘nalish yillik dasturlar orqali amalga oshiriladi.',
                  'Фонд работает на шести столпах: международное образование, сотрудничество, конкурсы, научные публикации, бренд TSUL и предпринимательство. Каждое направление реализуется через годовые программы.',
                  'The fund operates on six pillars: international education, cooperation, contests, academic publishing, the TSUL brand and entrepreneurship. Each direction is delivered through annual programmes.',
                )}
              </p>
              <p className="mv-pillar-text">
                {loc(
                  locale,
                  'Ustunlar shaffof byudjet va hisobotlar bilan moliyalashtiriladi — ta’limdan nashrgacha',
                  'Столпы финансируются прозрачным бюджетом и отчётностью — от образования до публикаций',
                  'The pillars are funded with a transparent budget and reporting — from education to publishing',
                )}
              </p>
              <div className="mv-pillar-photo">
                <Image
                  src="/media/mission-value/mission-img1-1-min.jpg"
                  alt=""
                  width={900}
                  height={386}
                  className="object-cover w-full h-full"
                  unoptimized
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <MissionMarquee locale={locale} />

      <section className="mv-coop">
        <div className="live-wrap">
          <h2 className="mv-section-title">{loc(locale, 'Xalqaro hamkorlik', 'Международное сотрудничество', 'International cooperation')}</h2>
          <p className="mv-section-lead">
            {loc(
              locale,
              'Maqsad — TDYU jamoasini dunyoning yetakchi maktablari va tashkilotlari bilan bog‘lash.',
              'Цель — связать команду ТГЮУ с ведущими школами и организациями мира.',
              'Purpose — connect the TSUL community with leading schools and organisations worldwide.',
            )}
          </p>
          <div className="mv-coop-grid">
            <div className="mv-coop-media">
              <div className="mv-coop-sticky">
                <Image
                  src="/media/mission-value/vission-img1-1-min.jpg"
                  alt=""
                  width={640}
                  height={720}
                  className="object-cover w-full h-full rounded-[12px]"
                  unoptimized
                />
              </div>
            </div>
            <div className="mv-coop-acc">
              <MissionVisionAccordion locale={locale} />
            </div>
          </div>
        </div>
      </section>

      <section className="mv-awards">
        <div className="live-wrap">
          <h2 className="mv-section-title">{loc(locale, 'Tanlov va mukofotlar', 'Конкурсы и награды', 'Contests and awards')}</h2>
          <p className="mv-section-lead mv-awards-lead">
            {loc(
              locale,
              'Mablag‘lar shaffof taqsimlanadi — ta’lim, tadbir va nashrlarga.',
              'Средства распределяются прозрачно — на образование, мероприятия и публикации.',
              'Funds are allocated transparently — to education, events and publishing.',
            )}
          </p>
          <div className="mv-award-grid">
            {cards.map((c) => (
              <article key={c.t} className="mv-award-card">
                <div className="mv-award-body">
                  <h3>{c.t}</h3>
                  <p>{c.d}</p>
                </div>
                <Link href="/programs" className="mv-award-btn">
                  <span>{loc(locale, 'Batafsil', 'Подробнее', 'Details')}</span>
                  <span className="mv-award-btn-icon" aria-hidden>
                    <MapDotsIcon />
                  </span>
                </Link>
                <div className="mv-award-photo">
                  <Image src={c.img} alt="" width={420} height={280} className="object-cover w-full h-full" unoptimized />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <GalleryStrip locale={locale} />
    </>
  )
}
