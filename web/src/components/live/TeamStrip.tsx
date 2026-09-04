'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { BoardMemberCard } from './BoardView'

const COPY = {
  uz: { eyebrow: 'Jamoa', title: 'Boshqaruv va kengash', more: 'Barchasini ko‘rish' },
  ru: { eyebrow: 'Команда', title: 'Управление и совет', more: 'Смотреть все' },
  en: { eyebrow: 'Team', title: 'Governance and board', more: 'View all' },
} as const

function EyebrowIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden className="shrink-0 text-sky">
      <path d="M5.21484 12.8949V16.6564C5.21484 16.6564 8.82175 15.1537 12.0198 15.1537C15.2178 15.1537 18.8255 16.6564 18.8255 16.6564V12.8424C18.8255 12.8424 15.3844 11.0225 11.9665 11.0225C8.55018 11.021 5.21484 12.8949 5.21484 12.8949Z" />
      <path d="M22.6467 11.9993L24 11.2716L22.6467 10.5222V10.1666C22.6467 10.1666 23.0278 8.23413 20.862 9.24464C20.7517 9.30465 20.6924 9.36542 20.6684 9.42468L11.7367 4.47119L0 11.1884L4.43211 13.2019V12.5485C4.43211 12.5485 8.15079 10.4607 11.9625 10.4607C15.7734 10.4607 19.6092 12.4899 19.6092 12.4899V13.631L22.0563 12.3167V17.6377H21.2416V19.529L22.3248 18.7803L23.5274 19.529V17.637H22.6467V11.9993ZM22.0555 9.83803V10.1944L21.3413 9.79827C21.6017 9.62573 22.0555 9.38642 22.0555 9.83803ZM21.814 11.9251C21.737 11.9279 21.6603 11.9152 21.5883 11.8877C21.5164 11.8602 21.4507 11.8185 21.3952 11.7651C21.3398 11.7117 21.2956 11.6476 21.2655 11.5768C21.2353 11.5059 21.2198 11.4297 21.2197 11.3527C21.2197 11.2757 21.2351 11.1994 21.2652 11.1285C21.2953 11.0576 21.3393 10.9935 21.3947 10.94C21.4501 10.8865 21.5157 10.8447 21.5876 10.8172C21.6595 10.7896 21.7362 10.7768 21.8132 10.7795C21.9615 10.7848 22.102 10.8474 22.2051 10.9542C22.3082 11.0609 22.3659 11.2035 22.366 11.3519C22.3661 11.5003 22.3086 11.643 22.2056 11.7499C22.1027 11.8568 21.9623 11.9196 21.814 11.9251Z" />
    </svg>
  )
}

function ButtonDotsIcon() {
  return (
    <svg width="18" height="15" viewBox="0 0 18 15" fill="currentColor" aria-hidden>
      <path d="M10.5 7.5C10.5 8.32843 9.82843 9 9 9C8.17157 9 7.5 8.32843 7.5 7.5C7.5 6.67157 8.17157 6 9 6C9.82843 6 10.5 6.67157 10.5 7.5Z" />
      <path d="M10.5 13.5C10.5 14.3284 9.82843 15 9 15C8.17157 15 7.5 14.3284 7.5 13.5C7.5 12.6716 8.17157 12 9 12C9.82843 12 10.5 12.6716 10.5 13.5Z" />
      <path d="M3 7.5C3 8.32843 2.32843 9 1.5 9C0.671573 9 0 8.32843 0 7.5C0 6.67157 0.671573 6 1.5 6C2.32843 6 3 6.67157 3 7.5Z" />
      <path d="M18 7.5C18 8.32843 17.3284 9 16.5 9C15.6716 9 15 8.32843 15 7.5C15 6.67157 15.6716 6 16.5 6C17.3284 6 18 6.67157 18 7.5Z" />
      <path d="M10.5 1.5C10.5 2.32843 9.82843 3 9 3C8.17157 3 7.5 2.32843 7.5 1.5C7.5 0.671573 8.17157 0 9 0C9.82843 0 10.5 0.671573 10.5 1.5Z" />
    </svg>
  )
}

function useVisible() {
  const [visible, setVisible] = useState(3)

  useEffect(() => {
    const read = () => {
      if (window.matchMedia('(min-width: 1024px)').matches) setVisible(3)
      else if (window.matchMedia('(min-width: 640px)').matches) setVisible(2)
      else setVisible(1)
    }
    read()
    window.addEventListener('resize', read)
    return () => window.removeEventListener('resize', read)
  }, [])

  return visible
}

export function TeamStrip({
  locale,
  members,
}: {
  locale: Locale
  members: { id: string; slug: string; img: string; t: string; r: string }[]
}) {
  const items = members
  const copy = COPY[locale]
  const visible = useVisible()
  const max = Math.max(0, items.length - visible)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    setIndex((i) => Math.min(i, max))
  }, [max])

  return (
    <section className="relative overflow-hidden bg-cream pb-[110px] pt-[70px] lg:pb-[183px] lg:pt-[110px]" aria-labelledby="team-strip-heading">
      <Image
        src="/media/home/team-cap.png"
        alt=""
        width={120}
        height={120}
        className="pointer-events-none absolute right-[55px] top-[222px] hidden w-[100px] opacity-80 xl:block"
        aria-hidden
      />
      <Image
        src="/media/home/calc-left.png"
        alt=""
        width={180}
        height={180}
        className="pointer-events-none absolute left-0 top-24 hidden w-[160px] opacity-70 lg:block"
        aria-hidden
      />

      <div className="live-wrap relative z-10 px-2.5 lg:px-5">
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between lg:mb-10">
          <div>
            <p className="mb-0 inline-flex items-center text-sm font-semibold uppercase tracking-[0.08em] text-[#030303]">
              <EyebrowIcon />
              <span className="ml-2.5">{copy.eyebrow}</span>
            </p>
            <h2 id="team-strip-heading" className="mt-0 font-[Maitree,Georgia,serif] text-[clamp(1.85rem,3.2vw,2.75rem)] font-bold leading-tight text-[#030303]">
              {copy.title}
            </h2>
          </div>

          <Link href="/board" className="team-strip-more self-start sm:self-center">
            <ButtonDotsIcon />
            <span>{copy.more}</span>
          </Link>
        </div>

        <div className="overflow-hidden pb-[75px]">
          <div
            className="flex items-stretch"
            style={{
              marginLeft: -10,
              marginRight: -10,
              transform: `translateX(-${index * (100 / visible)}%)`,
              transition: 'transform 0.5s ease-in-out',
            }}
          >
            {items.map((member) => (
              <div key={member.id} className="box-border shrink-0 px-2.5" style={{ width: `${100 / visible}%` }}>
                <BoardMemberCard member={member} href={`/board/${member.slug || member.id}`} />
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 flex justify-center gap-2.5" role="tablist" aria-label={copy.title}>
          {Array.from({ length: max + 1 }, (_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`${i + 1}`}
              className={`team-strip-dot ${i === index ? 'is-active' : ''}`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
