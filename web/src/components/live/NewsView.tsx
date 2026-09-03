import type { Locale } from '@/i18n/routing'
import { PageHero } from './PageHero'
import { NewsArchive } from './NewsArchive'
import { loc } from './loc'

/** Dump /cyan/blog/ — Alumni arxivi bilan bir xil layout uslubi */
export function NewsView({
  locale,
  page = 1,
  initialQuery = '',
  initialCat = null,
}: {
  locale: Locale
  page?: number
  initialQuery?: string
  initialCat?: string | null
}) {
  return (
    <>
      <PageHero
        image="/media/dump/page-bnr-img26-min.jpg"
        height={413}
        deco="/media/dump/news/bnr-arrow-1-1.png"
        title={loc(locale, 'Yangiliklar', 'Новости', 'News')}
        lead={loc(
          locale,
          'TDYU Endowment Fund — bilim, grant va xalqaro imkoniyatlarga sarmoya.',
          'TDYU Endowment Fund — инвестиции в знания, гранты и международные возможности.',
          'TDYU Endowment Fund — an investment in knowledge, grants and international opportunity.',
        )}
        crumbs={[
          { href: '/', label: loc(locale, 'Bosh', 'Главная', 'Home') },
          { href: '/news', label: loc(locale, 'Yangiliklar', 'Новости', 'News') },
        ]}
      />

      <section className="alumni-shell news-shell">
        <NewsArchive locale={locale} page={page} initialQuery={initialQuery} initialCat={initialCat} />
      </section>
    </>
  )
}
