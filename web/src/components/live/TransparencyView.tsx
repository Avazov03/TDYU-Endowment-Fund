import { getContent } from '@/content/site'
import type { Locale } from '@/i18n/routing'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { PageHero } from './PageHero'
import { loc } from './loc'

export function TransparencyView({ locale }: { locale: Locale }) {
  const c = getContent(locale)
  return (
    <>
      <PageHero
        image="/media/dump/page-bnr-img1-10-min.jpg"
        height={413}
        title={loc(locale, 'Shaffoflik', 'Прозрачность', 'Transparency')}
        lead={loc(
          locale,
          'TDYU Endowment Fund — bilim, grant va xalqaro imkoniyatlarga sarmoya.',
          'TDYU Endowment Fund — инвестиции в знания, гранты и международные возможности.',
          'TDYU Endowment Fund — an investment in knowledge, grants and international opportunity.',
        )}
        crumbs={[
          { href: '/', label: loc(locale, 'Bosh', 'Главная', 'Home') },
          { href: '/transparency', label: loc(locale, 'Shaffoflik', 'Прозрачность', 'Transparency') },
        ]}
      />
      <section className="bg-cream pt-[120px] pb-16">
        <div className="live-content grid grid-cols-[652px_1fr] gap-[52px] items-start">
          <div>
            <h3 className="text-[36px] leading-[46px] font-semibold" style={{ marginBottom: 20 }}>
              {loc(locale, 'Mablag‘ taqsimoti', 'Распределение средств', 'Fund allocation')}
            </h3>
            <p className="text-[16px] leading-7 text-body" style={{ marginBottom: 30 }}>
              {loc(
                locale,
                'Xayriya mablag‘lari shaffof hisobotlar asosida taqsimlanadi. Har bir badal ta’lim, grant, tadbir yoki infratuzilmaga yo‘naltirilishi mumkin.',
                'Пожертвования распределяются на основе прозрачной отчётности. Каждый взнос может быть направлен на образование, гранты, мероприятия или инфраструктуру.',
                'Donations are allocated based on transparent reporting. Each gift can go to education, grants, events or infrastructure.',
              )}
            </p>
            <Link href="/reports" className="inline-flex items-center justify-center bg-tdyu !text-white text-[16px] font-medium rounded-[30px] h-[50px] px-[26px]">
              {loc(locale, 'Hisobotlar', 'Отчёты', 'Reports')}
            </Link>
          </div>
          <Image
            src="/media/dump/viva-group-bg1-min.jpg"
            alt=""
            width={575}
            height={226}
            className="w-[575px] h-[226px] object-cover"
            unoptimized
          />
        </div>
        <div className="live-wrap grid gap-10 lg:grid-cols-2 mt-16">
          <div>
            <h2 className="text-[clamp(1.5rem,3vw,2rem)] mb-6">{c.spendTitle}</h2>
            <ul className="grid gap-4 m-0 p-0 list-none">
              {c.spend.map((s) => (
                <li key={s.l}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{s.l}</span>
                    <strong>{s.p}%</strong>
                  </div>
                  <div className="h-2 rounded-full bg-white overflow-hidden">
                    <div className="h-full bg-sky rounded-full" style={{ width: `${s.p}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-[clamp(1.5rem,3vw,2rem)] mb-4">{c.sourcesTitle}</h2>
            <ul className="pl-4 leading-7">
              {c.sources.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}
