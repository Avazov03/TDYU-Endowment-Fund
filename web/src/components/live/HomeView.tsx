import type { Locale } from '@/i18n/routing'
import { localizeBoard } from '@/content/board'
import { localizeEvent } from '@/content/events'
import { localizePost } from '@/content/news'
import { homeStatsFromContent, loadAnnouncements, loadBoard, loadContent, loadEvents, loadNews } from '@/lib/cms-source'
import { AboutFundSection } from './AboutFundSection'
import { AlumniEventsSection } from './AlumniEventsSection'
import { AlumniMapGate } from './AlumniMapGate'
import { DonateSection } from './DonateSection'
import { GalleryStrip } from './GalleryStrip'
import { HomeHero } from './HomeHero'
import { NewsSection } from './NewsSection'
import { ProgramsStrip } from './ProgramsStrip'
import { SpendSection } from './SpendSection'
import { TeamStrip } from './TeamStrip'
import { WhyEndowmentSection } from './WhyEndowmentSection'

const STATS_FALLBACK = {
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

const HERO_NOTE_SLUGS = ['tsul-shop', 'turk-dunyosi-kongressi', 'grant-arizalari'] as const

export async function HomeView({ locale }: { locale: Locale }) {
  const [content, news, board, events, announcements] = await Promise.all([
    loadContent(locale),
    loadNews(),
    loadBoard(),
    loadEvents(),
    loadAnnouncements(locale),
  ])

  const stats = homeStatsFromContent(content, STATS_FALLBACK[locale]).map((s) => ({
    n: s.n,
    l: s.l.toUpperCase(),
  }))

  const heroNotes = (() => {
    const fromSlug = HERO_NOTE_SLUGS.map((slug) => news.find((p) => p.slug === slug)).filter(Boolean)
    const pool = (fromSlug.length ? fromSlug : news.slice(0, 3)) as typeof news
    return pool.slice(0, 3).map((post) => {
      const L = localizePost(post, locale)
      return { slug: post.slug, t: L.title, date: L.date, excerpt: L.excerpt }
    })
  })()

  const teamMembers = board.map((m) => {
    const L = localizeBoard(m, locale)
    return { id: m.id, slug: m.slug, img: m.img, t: L.name, r: L.role }
  })

  const eventCards = events.slice(0, 4).map((e) => {
    const L = localizeEvent(e, locale)
    return {
      slug: e.slug,
      title: L.title,
      location: L.loc,
      date: L.date,
      time: e.time || '',
      img: e.img,
    }
  })

  const newsItems = news.slice(0, 3)
  const aboutStat = stats[0]

  return (
    <>
      <HomeHero locale={locale} notes={heroNotes} announcements={announcements.slice(0, 3)} />

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

      <AlumniMapGate locale={locale} />

      <AboutFundSection
        locale={locale}
        statTitle={
          locale === 'ru'
            ? `${aboutStat.n} проект`
            : locale === 'en'
              ? `${aboutStat.n} projects`
              : `${aboutStat.n} loyiha`
        }
        statDesc={aboutStat.l}
      />

      <TeamStrip locale={locale} members={teamMembers} />

      <DonateSection locale={locale} />

      <WhyEndowmentSection locale={locale} />

      <AlumniEventsSection locale={locale} events={eventCards} />

      <SpendSection locale={locale} />

      <NewsSection locale={locale} posts={newsItems} />

      <GalleryStrip locale={locale} />
    </>
  )
}
