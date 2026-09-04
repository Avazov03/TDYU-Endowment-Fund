import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { PROJECTS, localizeProject } from '@/content/projects'
import { PageHero } from './PageHero'
import { loc } from './loc'

const PDF = '/media/projects/semester_exam_schedule_notice.pdf'

const SHARED_BULLETS = {
  uz: [
    'O‘rta yoki oliy ma’lumot to‘g‘risida hujjat.',
    'Loyiha fond maqsadlariga mos, oshkora va hisobotli bo‘lishi shart.',
    'Magistratura/malaka oshirish: tegishli bakalavr diplomi va akademik ko‘rsatkich.',
  ],
  ru: [
    'Документ о среднем или высшем образовании.',
    'Проект должен соответствовать целям фонда, быть открытым и подотчётным.',
    'Магистратура/повышение квалификации: соответствующий диплом бакалавра и академические показатели.',
  ],
  en: [
    'Certificate of secondary or higher education.',
    'The project must align with the fund’s goals and be transparent and accountable.',
    'Master’s / professional development: relevant bachelor’s diploma and academic record.',
  ],
} as const

const DIR4_BULLETS = {
  uz: [
    'O‘rta yoki oliy ma’lumot to‘g‘risida hujjat.',
    'Tanlangan arizachilar suhbatga chaqirilishi mumkin.',
    'Loyiha fond maqsadlariga mos, oshkora va hisobotli bo‘lishi shart.',
  ],
  ru: [
    'Документ о среднем или высшем образовании.',
    'Отобранные заявители могут быть приглашены на собеседование.',
    'Проект должен соответствовать целям фонда, быть открытым и подотчётным.',
  ],
  en: [
    'Certificate of secondary or higher education.',
    'Selected applicants may be invited for an interview.',
    'The project must align with the fund’s goals and be transparent and accountable.',
  ],
} as const

const DIRECTIONS = [
  { n: 1, uz: 'Xalqaro tanlovlar', ru: 'Международные конкурсы', en: 'International contests', bullets: 'shared' as const },
  { n: 2, uz: 'Ta’lim dasturlari', ru: 'Образовательные программы', en: 'Educational programmes', bullets: 'shared' as const },
  { n: 3, uz: 'Infratuzilma', ru: 'Инфраструктура', en: 'Infrastructure', bullets: 'shared' as const },
  { n: 4, uz: 'Amaliyot va stajirovka', ru: 'Практика и стажировка', en: 'Practice and internship', bullets: 'dir4' as const },
] as const

const FEATURES = [
  {
    icon: '/media/projects/icon-westminster.svg',
    title: 'Westminster Teaching & Learning',
    titleRu: 'Westminster Teaching & Learning',
    titleEn: 'Westminster Teaching & Learning',
    desc: 'Mablag‘ning ~48% ta’lim, stipendiya va grantlarga yo‘naltiriladi.',
    descRu: 'Около 48% средств направляется на образование, стипендии и гранты.',
    descEn: 'About 48% of funds go to education, scholarships and grants.',
  },
  {
    icon: '/media/projects/icon-tsul-shop.svg',
    title: 'TSUL SHOP',
    titleRu: 'TSUL SHOP',
    titleEn: 'TSUL SHOP',
    href: '/shop' as const,
    desc: 'Campus do‘koni: brend mahsulotlar, aksiya va olib ketish.',
    descRu: 'Магазин кампуса: брендовые товары, акции и самовывоз.',
    descEn: 'Campus shop: branded goods, sale prices and pickup.',
  },
  {
    icon: '/media/projects/icon-internship.svg',
    title: 'Xorijiy stajirovka dasturlari',
    titleRu: 'Программы зарубежных стажировок',
    titleEn: 'Overseas internship programs',
    desc: 'Fond qo‘llab-quvvatlagan loyihalar: tanlovlar, nashrlar, kongresslar, stajirovkalar va infratuzilma.',
    descRu: 'Проекты при поддержке Фонда: конкурсы, издания, конгрессы, стажировки и инфраструктура.',
    descEn: 'Fund-supported projects: contests, publications, congresses, internships and infrastructure.',
  },
] as const

function CalendarIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M16 3v4M8 3v4M3 11h18" />
    </svg>
  )
}

function PdfDocIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path d="M13.6306 8.65779V4.87288C13.6306 4.76456 13.5806 4.66444 13.5098 4.58526L9.26635 0.129258C9.18709 0.0459374 9.07455 0 8.96205 0H2.23421C0.992107 0 0 1.01289 0 2.25507V14.9771C0 16.2193 0.992107 17.2156 2.23418 17.2156H7.54483C8.54932 18.8829 10.3752 20 12.4551 20C15.6147 20 18.195 17.4322 18.195 14.2684C18.1993 11.5048 16.215 9.19553 13.6306 8.65783V8.65779ZM9.37897 1.4632L12.2259 4.46019H10.3793C9.82908 4.46019 9.37893 4.00589 9.37893 3.4557L9.37897 1.4632ZM2.23418 16.3818C1.45476 16.3818 0.833748 15.7565 0.833748 14.9771V2.25507C1.45476 0.833748 2.23418 0.833748H8.54522V3.45562C8.54522 4.46851 9.36643 5.2939 10.3793 5.2939H12.7969V8.54936C12.6719 8.54522 12.5719 8.53268 12.4635 8.53268C11.0087 8.53268 9.67068 9.09131 8.66194 9.9667H3.36808C3.13874 9.9667 2.95121 10.1542 2.95121 10.3834C2.95121 10.6128 3.13871 10.8003 3.36808 10.8003H7.88663C7.59061 11.2172 7.34463 11.634 7.15303 12.0926H3.36804C3.13871 12.0926 2.95117 12.2801 2.95117 12.5094C2.95117 12.7386 3.13867 12.9263 3.36804 12.9263H6.88198C6.77776 13.3432 6.72358 13.8058 6.72358 14.2685C6.72358 15.0187 6.86944 15.7608 7.13206 16.3861H2.23418V16.3818ZM12.4594 19.1705C9.75826 19.1705 7.56147 16.9737 7.56147 14.2726C7.56147 11.5715 9.75404 9.37467 12.4594 9.37467C15.1646 9.37467 17.3572 11.5715 17.3572 14.2726C17.3572 16.9737 15.1605 19.1705 12.4594 19.1705Z" />
      <path d="M3.36805 8.71188H7.59059C7.81992 8.71188 8.00746 8.52423 8.00746 8.29501C8.00746 8.06571 7.81996 7.87817 7.59059 7.87817H3.36805C3.13871 7.87817 2.95117 8.06567 2.95117 8.29501C2.95117 8.52423 3.13867 8.71188 3.36805 8.71188ZM14.5935 14.1849L12.8804 16.0315V11.4797C12.8804 11.2504 12.6927 11.0628 12.4635 11.0628C12.2342 11.0628 12.0466 11.2503 12.0466 11.4797V16.0315L10.3209 14.1849C10.1625 14.0183 9.89574 14.0058 9.72898 14.1642C9.56219 14.3225 9.54969 14.5852 9.7082 14.7519L12.1467 17.3738C12.2259 17.4572 12.3342 17.5072 12.451 17.5072C12.5677 17.5072 12.676 17.4572 12.7552 17.3738L15.198 14.752C15.3564 14.5852 15.348 14.3184 15.1812 14.1642C15.0104 14.0058 14.752 14.0183 14.5935 14.1849Z" />
    </svg>
  )
}

function BulletList({ items }: { items: readonly string[] }) {
  return (
    <ul className="projects-dir-list">
      {items.map((t) => (
        <li key={t}>
          <span className="projects-dir-dot" aria-hidden />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  )
}

export function ProjectsView({ locale }: { locale: Locale }) {
  const shared = locale === 'ru' ? SHARED_BULLETS.ru : locale === 'en' ? SHARED_BULLETS.en : SHARED_BULLETS.uz
  const dir4 = locale === 'ru' ? DIR4_BULLETS.ru : locale === 'en' ? DIR4_BULLETS.en : DIR4_BULLETS.uz

  return (
    <>
      <PageHero
        image="/media/projects/page-bnr-img19-min.jpg"
        objectPosition="left center"
        title={loc(locale, 'Loyihalar', 'Проекты', 'Projects')}
        lead={loc(
          locale,
          'TDYU Endowment Fund — bitiruvchilar, grantlar va xalqaro loyihalar orqali bilimga sarmoya kiritadi.',
          'TDYU Endowment Fund инвестирует в знания через выпускников, гранты и международные проекты.',
          'TDYU Endowment Fund invests in knowledge through alumni, grants and international projects.',
        )}
        crumbs={[
          { href: '/', label: loc(locale, 'Bosh', 'Главная', 'Home') },
          { href: '/projects', label: loc(locale, 'Loyihalar', 'Проекты', 'Projects') },
        ]}
      />

      <section className="projects-shell">
        <div className="projects-inner">
          <header className="projects-intro">
            <h2 className="projects-intro-title">
              {loc(
                locale,
                'Loyihalar — Jessup, Westminster, TSUL SHOP',
                'Проекты — Jessup, Westminster, TSUL SHOP',
                'Projects — Jessup, Westminster, TSUL SHOP',
              )}
            </h2>
            <p className="projects-intro-lead">
              {loc(
                locale,
                'Fond Jessup, Westminster, TSUL SHOP va xorijiy stajirovka kabi amaliy loyihalarni qo‘llab-quvvatlaydi — nashr, konferensiya va xalqaro hamkorlik orqali.',
                'Фонд поддерживает практические проекты — Jessup, Westminster, TSUL SHOP и зарубежные стажировки — через издания, конференции и международное сотрудничество.',
                'The fund supports practical projects — Jessup, Westminster, TSUL SHOP and overseas internships — through publishing, conferences and international collaboration.',
              )}
            </p>
          </header>

          <div className="projects-rows">
            {PROJECTS.slice(0, 6).map((row) => {
              const L = localizeProject(row, locale)
              const href = `/projects/${row.slug}`
              return (
                <article key={row.slug} className="projects-row">
                  <div className="projects-row-content">
                    <div className="projects-row-inner">
                      <div className="projects-row-date">
                        <CalendarIcon />
                        {L.date}
                      </div>
                      <h4 className="projects-row-title">
                        <Link href={href}>{L.title}</Link>
                      </h4>
                      <p className="projects-row-year">{row.year}</p>
                      <Link href={href} className="projects-row-more">
                        {loc(locale, 'Batafsil', 'Подробнее', 'Read more')}
                      </Link>
                    </div>
                    <a className="projects-pdf" href={PDF} target="_blank" rel="noopener noreferrer">
                      {loc(locale, 'PDF yuklab olish', 'Скачать PDF', 'Download PDF')}
                      <span className="projects-pdf-icon" aria-hidden>
                        <PdfDocIcon />
                      </span>
                    </a>
                  </div>
                  <Link href={href} className="projects-row-media">
                    <Image src={row.img} alt="" fill className="object-cover" sizes="280px" unoptimized />
                  </Link>
                </article>
              )
            })}
          </div>

          <div className="projects-lab">
            <Image
              src="/media/projects/research-img1-min.jpg"
              alt=""
              width={1280}
              height={458}
              className="object-cover w-full h-full"
              unoptimized
            />
          </div>

          <h2 className="projects-dir-heading">
            {loc(locale, 'Loyiha yo‘nalishlari', 'Направления проектов', 'Project directions')}
          </h2>

          <div className="projects-dir-card">
            <div className="projects-dir-col">
              {DIRECTIONS.slice(0, 2).map((d) => (
                <div key={d.n} className="projects-dir-block">
                  <h3 className="projects-dir-title">
                    {d.n}. {loc(locale, d.uz, d.ru, d.en)}
                  </h3>
                  <BulletList items={d.bullets === 'shared' ? shared : dir4} />
                </div>
              ))}
            </div>
            <div className="projects-dir-col">
              {DIRECTIONS.slice(2).map((d) => (
                <div key={d.n} className="projects-dir-block">
                  <h3 className="projects-dir-title">
                    {d.n}. {loc(locale, d.uz, d.ru, d.en)}
                  </h3>
                  <BulletList items={d.bullets === 'shared' ? shared : dir4} />
                </div>
              ))}
            </div>
          </div>

          <div className="projects-features">
            {FEATURES.map((f) => (
              <article key={f.icon} className="projects-feature">
                <div className="projects-feature-badge">
                  <Image src={f.icon} alt="" width={60} height={60} unoptimized />
                </div>
                <h3 className="projects-feature-title">
                  {'href' in f && f.href ? (
                    <Link href={f.href} className="hover:!text-sky">
                      {loc(locale, f.title, f.titleRu, f.titleEn)}
                    </Link>
                  ) : (
                    loc(locale, f.title, f.titleRu, f.titleEn)
                  )}
                </h3>
                <p className="projects-feature-desc">{loc(locale, f.desc, f.descRu, f.descEn)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
