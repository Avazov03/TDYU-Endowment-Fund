import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { getContent } from '@/content/site'
import type { Locale } from '@/i18n/routing'
import { HomeDonateForm } from './HomeDonateForm'
import { ProgramsStrip } from './ProgramsStrip'

function loc(locale: Locale, uz: string, ru: string, en: string) {
  return locale === 'ru' ? ru : locale === 'en' ? en : uz
}

const STATS = {
  uz: [
    { n: '31', l: 'AMALGA OSHIRILGAN LOYIHALAR' },
    { n: '24', l: 'MUTAXASSISLAR SONI' },
    { n: '400', l: 'QO‘LLAB-QUVVATLANGAN TASHABBUSLAR' },
    { n: '18', l: 'YILLIK TAJRIBA' },
    { n: '2023', l: 'TASHKIL ETILGAN' },
  ],
  ru: [
    { n: '31', l: 'РЕАЛИЗОВАННЫЕ ПРОЕКТЫ' },
    { n: '24', l: 'ЧИСЛО СПЕЦИАЛИСТОВ' },
    { n: '400', l: 'ПОДДЕРЖАННЫЕ ИНИЦИАТИВЫ' },
    { n: '18', l: 'ЛЕТ ОПЫТА' },
    { n: '2023', l: 'ГОД ОСНОВАНИЯ' },
  ],
  en: [
    { n: '31', l: 'COMPLETED PROJECTS' },
    { n: '24', l: 'SPECIALISTS' },
    { n: '400', l: 'SUPPORTED INITIATIVES' },
    { n: '18', l: 'YEARS OF EXPERIENCE' },
    { n: '2023', l: 'ESTABLISHED' },
  ],
} as const

const ANNOUNCEMENTS = {
  uz: [
    { t: 'Yangi raqamli resurslar mavjud', date: 'Dekabr 1, 2025', d: 'Fond kutubxonasi va raqamli materiallar yangilandi.' },
    { t: 'II Turk dunyosi yosh akademiklar kongressi', date: 'Dekabr 1, 2025', d: 'TDYUda xalqaro kongress muvaffaqiyatli o‘tkazildi.' },
    { t: 'Grant arizalari qabul qilinmoqda', date: 'Dekabr 1, 2025', d: 'Xalqaro ta’lim va stipendiya grantlari uchun arizalar ochiq.' },
  ],
  ru: [
    { t: 'Доступны новые цифровые ресурсы', date: '1 декабря 2025', d: 'Библиотека фонда и цифровые материалы обновлены.' },
    { t: 'II Конгресс молодых академиков тюркского мира', date: '1 декабря 2025', d: 'Международный конгресс успешно проведён в ТГЮУ.' },
    { t: 'Приём заявок на гранты открыт', date: '1 декабря 2025', d: 'Открыт приём заявок на международное образование и стипендии.' },
  ],
  en: [
    { t: 'New digital resources available', date: 'December 1, 2025', d: 'The fund library and digital materials have been updated.' },
    { t: 'II Turkic World Young Academics Congress', date: 'December 1, 2025', d: 'The international congress was successfully held at TSUL.' },
    { t: 'Grant applications are open', date: 'December 1, 2025', d: 'Applications for international education and scholarships are open.' },
  ],
} as const

const TEAM = [
  { img: '/media/home/team-1.jpg', uz: 'Vasiylik kengashi', ru: 'Попечительский совет', en: 'Board of Trustees' },
  { img: '/media/home/team-2.jpg', uz: 'Boshqaruv kengashi', ru: 'Правление', en: 'Management Board' },
  { img: '/media/home/team-3.jpg', uz: 'Taftish komissiyasi', ru: 'Ревизионная комиссия', en: 'Audit Commission' },
  { img: '/media/home/team-4.jpg', uz: 'Vasiylik a’zosi', ru: 'Член попечителей', en: 'Trustee' },
  { img: '/media/home/team-5.jpg', uz: 'Boshqaruv a’zosi', ru: 'Член правления', en: 'Board member' },
  { img: '/media/home/team-6.jpg', uz: 'Taftish a’zosi', ru: 'Член комиссии', en: 'Auditor' },
]

const EVENTS = [
  { img: '/media/home/event-1.jpg', uz: 'Philip C. Jessup Moot Court', ru: 'Philip C. Jessup Moot Court', en: 'Philip C. Jessup Moot Court' },
  { img: '/media/home/event-2.jpg', uz: 'Westminster Teaching & Learning', ru: 'Westminster Teaching & Learning', en: 'Westminster Teaching & Learning' },
  { img: '/media/home/event-3.jpg', uz: 'TSUL SHOP infratuzilmasi', ru: 'TSUL SHOP', en: 'TSUL SHOP' },
  { img: '/media/home/event-4.jpg', uz: 'Xorijiy stajirovka dasturlari', ru: 'Зарубежные стажировки', en: 'Overseas internships' },
]

export function HomeView({ locale }: { locale: Locale }) {
  const c = getContent(locale)
  const news = c.news.slice(0, 3)
  const notes = ANNOUNCEMENTS[locale]
  const stats = STATS[locale]

  return (
    <>
      <section className="relative min-h-[min(78vh,720px)] text-white overflow-hidden">
        <Image src="/media/home/hero.jpg" alt="" fill priority className="object-cover object-[center_30%]" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#08384d]/75 via-[#0c5776]/25 to-transparent" />
        <div className="live-wrap relative z-10 grid items-center gap-8 py-16 lg:grid-cols-[1.05fr_0.95fr] min-h-[min(78vh,720px)]">
          <div>
            <span className="mb-6 inline-flex w-[72px] h-[72px] rounded-full border-2 border-white/70 bg-white/15 items-center justify-center" aria-hidden>
              <span className="ml-1 border-y-[10px] border-y-transparent border-l-[16px] border-l-white" />
            </span>
            <p className="flex items-center gap-2 text-sm font-semibold tracking-wide mb-5">
              <Image src="/brand/tdyu-mark.svg" alt="" width={28} height={28} className="h-7 w-7" unoptimized />
              TDYU Endowment Fund
            </p>
            <h1 className="!text-white text-[clamp(2rem,4.6vw,3.35rem)] leading-[1.15] max-w-[12em] mb-7">
              {loc(locale, "Huquqiy ta’limning kelajagiga sarmoya", 'Инвестиция в будущее юридического образования', 'Investment in the future of legal education')}
            </h1>
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 rounded-[30px] bg-sky px-6 py-3 font-semibold text-white hover:bg-white hover:text-tdyu"
            >
              {loc(locale, 'Dasturlarni ko‘rish', 'Смотреть программы', 'View programs')}
              <span aria-hidden className="text-lg leading-none">✦</span>
            </Link>
          </div>
          <div className="flex flex-col gap-3 max-w-[420px] justify-self-end w-full">
            <aside className="rounded-[16px] bg-tdyu p-5 shadow-[0_18px_40px_rgba(8,56,77,0.28)]">
              <h4 className="!text-white flex items-center gap-2 text-base mb-3">
                <span className="text-[#f5d76e]" aria-hidden>
                  📣
                </span>
                {loc(locale, 'E’lonlar', 'Объявления', 'Announcements')}
              </h4>
              <ul className="divide-y divide-white/15">
                {notes.map((n) => (
                  <li key={n.t} className="py-3 first:pt-0 last:pb-0">
                    <strong className="block text-white text-sm mb-1">{n.t}</strong>
                    <span className="block text-xs text-[#f5d76e] mb-1">{n.date}</span>
                    <p className="m-0 text-[13px] text-white/90 leading-5">{n.d}</p>
                  </li>
                ))}
              </ul>
            </aside>
            <Link href="/donate" className="rounded-[14px] bg-tdyu text-white font-semibold text-center py-3.5 flex items-center justify-center gap-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
              </svg>
              {loc(locale, 'Xayriya ochiq', 'Пожертвования открыты', 'Donations open')}
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-[#0a4a66] via-tdyu to-[#083d54] text-white py-11" aria-label="TDYU Endowment stats">
        <div className="live-wrap grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
          {stats.map((s) => (
            <div key={s.l}>
              <div className="font-[Maitree,Georgia,serif] text-[clamp(1.9rem,3vw,2.7rem)] font-bold leading-none mb-2">{s.n}</div>
              <span className="block w-8 h-[3px] bg-sky mx-auto mb-2" aria-hidden />
              <div className="text-[11px] uppercase tracking-[0.08em] text-white/80 leading-4">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      <ProgramsStrip locale={locale} />

      <section className="py-20">
        <div className="live-wrap grid gap-12 lg:grid-cols-2 items-center">
          <div className="relative min-h-[420px]">
            <Image src="/media/home/about-1.jpg" alt="" width={640} height={420} className="rounded-[16px] w-[74%] h-[340px] object-cover shadow-[0_18px_40px_rgba(12,87,118,0.18)]" />
            <Image src="/media/home/about-2.jpg" alt="" width={400} height={280} className="absolute right-0 bottom-0 w-1/2 h-[250px] object-cover rounded-[16px] border-8 border-white" />
          </div>
          <div>
            <p className="text-sky font-semibold tracking-[0.14em] uppercase text-sm mb-3">{loc(locale, 'Fond haqida', 'О фонде', 'About the fund')}</p>
            <h2 className="text-[clamp(1.7rem,3vw,2.4rem)] mb-4">{c.mission.title}</h2>
            <p className="leading-7 mb-6 max-w-[62ch]">{c.mission.paragraphs[0]}</p>
            <Link href="/about" className="inline-flex rounded-[30px] border-[1.5px] border-tdyu text-tdyu font-semibold px-6 py-3 hover:bg-tdyu hover:text-white">
              {loc(locale, 'Batafsil', 'Подробнее', 'Read more')}
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-cream py-20">
        <div className="live-wrap text-center mb-10">
          <p className="text-sky font-semibold tracking-[0.14em] uppercase text-sm mb-2">{loc(locale, 'Jamoa', 'Команда', 'Team')}</p>
          <h2 className="text-[clamp(1.7rem,3vw,2.4rem)]">{loc(locale, 'Boshqaruv va kengash', 'Управление и совет', 'Governance and board')}</h2>
        </div>
        <div className="live-wrap grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM.map((m) => (
            <article key={m.img} className="bg-white rounded-[16px] overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.06)]">
              <div className="relative h-[240px]">
                <Image src={m.img} alt="" fill className="object-cover" sizes="(max-width: 1024px) 50vw, 33vw" />
              </div>
              <div className="p-4">
                <h3 className="text-base m-0">{m[locale]}</h3>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="py-20">
        <div className="live-wrap grid gap-10 lg:grid-cols-2 items-start">
          <div>
            <p className="text-sky font-semibold tracking-[0.14em] uppercase text-sm mb-2">{loc(locale, 'Xayriya qilish', 'Пожертвовать', 'Donate')}</p>
            <h2 className="text-[clamp(1.7rem,3vw,2.4rem)] mb-4">{loc(locale, 'Xayriya va qo‘llab-quvvatlash', 'Пожертвования и поддержка', 'Donations and support')}</h2>
            <h3 className="text-lg mb-4">{loc(locale, 'Xayriya / aloqa formasi', 'Форма пожертвования / связи', 'Donation / contact form')}</h3>
            <HomeDonateForm />
          </div>
          <div className="relative min-h-[360px]">
            <Image src="/media/home/contact-img.png" alt="" fill className="object-contain" sizes="40vw" />
          </div>
        </div>
      </section>

      <section className="bg-cream py-20">
        <div className="live-wrap text-center mb-10">
          <p className="text-sky font-semibold tracking-[0.14em] uppercase text-sm mb-2">PROGRAMS &amp; STUDY</p>
          <h2 className="text-[clamp(1.7rem,3vw,2.4rem)] mb-3">{loc(locale, 'Nima uchun TDYU Endowment', 'Почему TDYU Endowment', 'Why TDYU Endowment')}</h2>
          <p className="max-w-[50ch] mx-auto">{loc(locale, 'Fond ustunlari: ta’lim, hamkorlik, tanlov, nashr, brend, tadbirkorlik', 'Столпы фонда: образование, партнёрство, конкурсы, публикации, бренд, предпринимательство', 'Pillars: education, partnership, contests, publishing, brand, entrepreneurship')}</p>
        </div>
        <div className="live-wrap grid gap-5 md:grid-cols-3">
          {[
            { t: loc(locale, 'Ta’lim va grantlar', 'Образование и гранты', 'Education and grants'), d: loc(locale, 'Mablag‘ning ~48% ta’lim, stipendiya va grantlarga yo‘naltiriladi.', 'Около 48% средств идёт на образование и гранты.', 'About 48% of funds go to education and grants.') },
            { t: loc(locale, 'Dasturlar', 'Программы', 'Programs'), d: loc(locale, 'Xalqaro tadbirlar, ilmiy nashrlar va infratuzilma — shaffof hisobotlar bilan.', 'Международные события, публикации и инфраструктура — с прозрачной отчётностью.', 'International events, publishing and infrastructure — with transparent reports.') },
            { t: loc(locale, 'Alumni tarmog‘i', 'Сеть alumni', 'Alumni network'), d: loc(locale, 'Fond bitiruvchilar va talabalarga xalqaro imkoniyatlar ochadi.', 'Фонд открывает международные возможности выпускникам и студентам.', 'The fund opens international opportunities for alumni and students.') },
          ].map((x) => (
            <article key={x.t} className="bg-white rounded-[16px] p-6 shadow-[0_4px_30px_rgba(0,0,0,0.06)]">
              <h3 className="mb-2">{x.t}</h3>
              <p className="m-0">{x.d}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="py-16">
        <div className="live-wrap grid grid-cols-3 gap-3">
          {['/media/home/campus-1.jpg', '/media/home/campus-2.jpg', '/media/home/campus-3.jpg'].map((src) => (
            <div key={src} className="relative h-[180px] md:h-[260px] rounded-[16px] overflow-hidden">
              <Image src={src} alt="" fill className="object-cover" sizes="33vw" />
            </div>
          ))}
        </div>
      </section>

      <section className="bg-cream py-20">
        <div className="live-wrap flex justify-between items-end gap-4 mb-8 flex-wrap">
          <div>
            <p className="text-sky font-semibold tracking-[0.14em] uppercase text-sm mb-2">{loc(locale, 'Yaqinlashayotgan tadbirlar', 'Ближайшие события', 'Upcoming events')}</p>
            <h2 className="text-[clamp(1.7rem,3vw,2.4rem)]">{loc(locale, 'Fond tadbirlari', 'События фонда', 'Fund events')}</h2>
          </div>
          <Link href="/news" className="text-sky font-semibold">
            {loc(locale, 'Barcha tadbirlar', 'Все события', 'All events')}
          </Link>
        </div>
        <div className="live-wrap grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {EVENTS.map((e) => (
            <article key={e.img} className="bg-white rounded-[16px] overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.06)]">
              <div className="relative h-[160px]">
                <Image src={e.img} alt="" fill className="object-cover" sizes="25vw" />
              </div>
              <div className="p-4">
                <p className="text-xs text-sky mb-2">Avgust 4, 2025</p>
                <h3 className="text-base">{e[locale]}</h3>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="relative py-20 text-white overflow-hidden">
        <Image src="/media/home/spend-bg.jpg" alt="" fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-tdyu/85" />
        <div className="live-wrap relative z-10">
          <p className="text-sky font-semibold tracking-[0.14em] uppercase text-sm mb-2">{loc(locale, 'Hisobotlar', 'Отчёты', 'Reports')}</p>
          <h2 className="!text-white text-[clamp(1.7rem,3vw,2.4rem)] mb-3">{loc(locale, 'Mablag‘ qayerga ketadi', 'Куда идут средства', 'Where funds go')}</h2>
          <p className="mb-6 max-w-[60ch]">{loc(locale, 'Ta’lim 48% · Tadbirlar 22% · Nashrlar 16% · Infratuzilma 9% · Boshqaruv 5%.', 'Образование 48% · События 22% · Издания 16% · Инфраструктура 9% · Управление 5%.', 'Education 48% · Events 22% · Publishing 16% · Infrastructure 9% · Admin 5%.')}</p>
          <Link href="/reports" className="inline-flex rounded-[30px] bg-sky px-6 py-3 font-semibold">
            {loc(locale, 'Batafsil reja', 'Подробный план', 'Detailed plan')}
          </Link>
        </div>
      </section>

      <section className="py-20">
        <div className="live-wrap text-center mb-10">
          <p className="text-sky font-semibold tracking-[0.14em] uppercase text-sm mb-2">{loc(locale, 'Alumni fikrlari', 'Отзывы alumni', 'Alumni stories')}</p>
          <h2 className="text-[clamp(1.7rem,3vw,2.4rem)]">{loc(locale, 'Alumni muvaffaqiyat tarixlari', 'Истории успеха alumni', 'Alumni success stories')}</h2>
        </div>
        <div className="live-wrap grid gap-5 md:grid-cols-3">
          {c.stories.map((s) => (
            <blockquote key={s.n} className="bg-cream rounded-[16px] p-6">
              <p className="italic leading-7 mb-3">“{s.q}”</p>
              <strong className="text-ink">{s.n}</strong>
              <div className="text-sm mt-1">{s.r}</div>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="bg-cream py-20">
        <div className="live-wrap flex justify-between items-end gap-4 mb-8 flex-wrap">
          <div>
            <p className="text-sky font-semibold tracking-[0.14em] uppercase text-sm mb-2">Blog &amp; News</p>
            <h2 className="text-[clamp(1.7rem,3vw,2.4rem)]">{loc(locale, 'Fond yangiliklari', 'Новости фонда', 'Fund news')}</h2>
          </div>
          <Link href="/news" className="text-sky font-semibold">
            {loc(locale, 'Barcha yangiliklar', 'Все новости', 'All news')}
          </Link>
        </div>
        <div className="live-wrap grid gap-5 md:grid-cols-3">
          {news.map((n, i) => (
            <article key={n.t} className="bg-white rounded-[16px] overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.06)]">
              <div className="relative h-[180px]">
                <Image src={`/media/home/news-${i + 1}.jpg`} alt="" fill className="object-cover" sizes="33vw" />
              </div>
              <div className="p-5">
                <p className="text-xs text-sky mb-2">
                  {n.tag} · {n.date}
                </p>
                <h3 className="text-[1.05rem]">{n.t}</h3>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="py-0">
        <div className="grid grid-cols-3 md:grid-cols-6">
          {['gallery-1', 'gallery-2', 'gallery-3', 'gallery-4', 'gallery-5', 'gallery-6'].map((g) => (
            <div key={g} className="relative h-[120px] md:h-[160px]">
              <Image src={`/media/home/${g}.jpg`} alt="" fill className="object-cover" sizes="16vw" />
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
