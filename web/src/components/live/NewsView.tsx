import Image from 'next/image'
import { getContent } from '@/content/site'
import type { Locale } from '@/i18n/routing'
import { PageHero } from './PageHero'
import { loc } from './loc'

export function NewsView({ locale }: { locale: Locale }) {
  const c = getContent(locale)
  const photos = ['/media/home/news-1.jpg', '/media/home/news-2.jpg', '/media/home/news-3.jpg']

  return (
    <>
      <PageHero
        image="/media/about/hero.jpg"
        title={loc(locale, 'Yangiliklar', 'Новости', 'News')}
        lead={c.newsTitle}
        crumbs={[
          { href: '/', label: loc(locale, 'Bosh', 'Главная', 'Home') },
          { href: '/news', label: loc(locale, 'Yangiliklar', 'Новости', 'News') },
        ]}
      />
      <section className="bg-cream py-16">
        <div className="live-wrap grid gap-6 md:grid-cols-3">
          {c.news.map((n, i) => (
            <article key={n.t} className="bg-white rounded-[16px] overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.06)]">
              <div className="relative h-[180px]">
                <Image src={photos[i] || photos[0]} alt="" fill className="object-cover" sizes="33vw" />
              </div>
              <div className="p-5">
                <p className="text-xs text-sky mb-2">
                  {n.tag} · {n.date}
                </p>
                <h3 className="text-[1.1rem] mb-2">{n.t}</h3>
                <p className="text-sm leading-6 m-0">{n.d}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
