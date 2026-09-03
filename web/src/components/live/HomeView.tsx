import type { Locale } from '@/i18n/routing'
import { AboutFundSection } from './AboutFundSection'
import { AlumniEventsSection } from './AlumniEventsSection'
import { DonateSection } from './DonateSection'
import { GalleryStrip } from './GalleryStrip'
import { HomeHero } from './HomeHero'
import { NewsSection } from './NewsSection'
import { ProgramsStrip } from './ProgramsStrip'
import { SpendSection } from './SpendSection'
import { TeamStrip } from './TeamStrip'
import { TestimonialsSection } from './TestimonialsSection'
import { WhyEndowmentSection } from './WhyEndowmentSection'

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


export function HomeView({ locale }: { locale: Locale }) {
  const stats = STATS[locale]

  return (
    <>
      <HomeHero locale={locale} />

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

      <AboutFundSection locale={locale} />

      <TeamStrip locale={locale} />

      <DonateSection locale={locale} />

      <WhyEndowmentSection locale={locale} />

      <AlumniEventsSection locale={locale} />

      <SpendSection locale={locale} />

      <TestimonialsSection locale={locale} />

      <NewsSection locale={locale} />

      <GalleryStrip locale={locale} />
    </>
  )
}
