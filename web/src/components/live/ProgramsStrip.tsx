'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'

const PROGRAMS = {
  uz: [
    { img: '/media/home/prog-1.jpg', t: 'Xalqaro stajirovkalar', d: 'Ma’lumotlar va innovatsiya — grant dasturlari orqali.' },
    { img: '/media/home/prog-2.jpg', t: 'Stipendiya va grantlar', d: 'Ilmiy tadqiqot va nashrlarni qo‘llab-quvvatlash.' },
    { img: '/media/home/prog-3.jpg', t: 'Tanlovlar va musobaqalar', d: 'Amaliy loyihalar va xalqaro musobaqalar.' },
    { img: '/media/home/prog-4.jpg', t: 'Ilmiy va ta’limiy loyihalar', d: 'Konferensiyalar, nashrlar va ilmiy tashabbuslar.' },
  ],
  ru: [
    { img: '/media/home/prog-1.jpg', t: 'Международные стажировки', d: 'Данные и инновации — через грантовые программы.' },
    { img: '/media/home/prog-2.jpg', t: 'Стипендии и гранты', d: 'Поддержка научных исследований и публикаций.' },
    { img: '/media/home/prog-3.jpg', t: 'Конкурсы и соревнования', d: 'Практические проекты и международные конкурсы.' },
    { img: '/media/home/prog-4.jpg', t: 'Научные и образовательные проекты', d: 'Конференции, публикации и научные инициативы.' },
  ],
  en: [
    { img: '/media/home/prog-1.jpg', t: 'International internships', d: 'Data and innovation — through grant programmes.' },
    { img: '/media/home/prog-2.jpg', t: 'Scholarships and grants', d: 'Support for research and publishing.' },
    { img: '/media/home/prog-3.jpg', t: 'Contests and competitions', d: 'Practical projects and international contests.' },
    { img: '/media/home/prog-4.jpg', t: 'Research and education projects', d: 'Conferences, publishing and academic initiatives.' },
  ],
} as const

export function ProgramsStrip({ locale }: { locale: Locale }) {
  const [dot, setDot] = useState(0)
  const items = PROGRAMS[locale]
  const title = locale === 'ru' ? '7 основных программ' : locale === 'en' ? '7 core programs' : '7 asosiy dastur'
  const more = locale === 'ru' ? 'Подробнее' : locale === 'en' ? 'Read more' : 'Batafsil'

  return (
    <section className="relative bg-cream py-20 overflow-hidden">
      <div className="absolute inset-x-0 top-6 flex justify-center pointer-events-none select-none" aria-hidden>
        <span className="font-[Maitree,Georgia,serif] text-[clamp(10rem,22vw,18rem)] font-bold leading-none text-black/[0.045]">7</span>
      </div>
      <Image src="/media/home/program-left.png" alt="" width={220} height={240} className="hidden md:block absolute left-0 top-10 w-[min(200px,22vw)] h-auto pointer-events-none" />
      <Image src="/media/home/program-right.png" alt="" width={220} height={240} className="hidden md:block absolute right-0 top-16 w-[min(180px,20vw)] h-auto pointer-events-none" />
      <Image src="/media/home/program-books.png" alt="" width={120} height={90} className="hidden md:block absolute right-[12%] top-24 w-24 h-auto pointer-events-none opacity-80" />

      <div className="live-wrap relative z-10 text-center mb-10">
        <p className="text-tdyu font-semibold tracking-[0.16em] uppercase text-[13px] mb-2 inline-flex items-center gap-2">
          <span className="inline-block w-2.5 h-2.5 rotate-45 bg-sky" aria-hidden />
          PROGRAMS &amp; STUDY
        </p>
        <h2 className="text-[clamp(1.7rem,3vw,2.4rem)]">{title}</h2>
      </div>
      <div className="live-wrap relative z-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((p) => (
          <article key={p.t} className="bg-white rounded-[16px] overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.06)]">
            <div className="relative h-[200px]">
              <Image src={p.img} alt="" fill className="object-cover" sizes="(max-width: 1024px) 50vw, 25vw" />
            </div>
            <div className="p-5">
              <h3 className="text-[1.15rem] text-tdyu mb-2">{p.t}</h3>
              <p className="text-sm leading-6 mb-3">{p.d}</p>
              <Link href="/programs" className="text-sky font-semibold inline-flex items-center gap-1">
                {more}
                <span aria-hidden>→</span>
              </Link>
            </div>
          </article>
        ))}
      </div>
      <div className="relative z-10 flex justify-center gap-2 mt-8" aria-label="slider">
        {[0, 1, 2].map((i) => (
          <button
            key={i}
            type="button"
            aria-label={`Slide ${i + 1}`}
            className={`h-2.5 rounded-full ${i === dot ? 'w-7 bg-sky' : 'w-2.5 bg-[#cfd8dc]'}`}
            onClick={() => setDot(i)}
          />
        ))}
      </div>
    </section>
  )
}
