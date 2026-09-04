import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { getContent } from '@/content/site'
import type { Locale } from '@/i18n/routing'

const COPY = {
  uz: {
    eyebrow: 'Fond haqida',
    lead: 'TDYU Endowment Fund — a’zoligi bo‘lmagan jamoat fondi. Maqsadi: TDYU xodimlari va talabalari uchun grant, stipendiya va xalqaro imkoniyatlar.',
    more: 'Batafsil',
  },
  ru: {
    eyebrow: 'О фонде',
    lead: 'TDYU Endowment Fund — общественный фонд без членства. Цель: гранты, стипендии и международные возможности для сотрудников и студентов ТГЮУ.',
    more: 'Подробнее',
  },
  en: {
    eyebrow: 'About the fund',
    lead: 'TDYU Endowment Fund is a public fund without membership. Its goal: grants, scholarships and international opportunities for TSUL staff and students.',
    more: 'Read more',
  },
} as const

function EyebrowIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden className="shrink-0">
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

export function AboutFundSection({
  locale,
  statTitle,
  statDesc,
}: {
  locale: Locale
  statTitle: string
  statDesc: string
}) {
  const c = getContent(locale)
  const t = COPY[locale]

  return (
    <section className="relative overflow-hidden bg-tdyu text-white pt-[70px] lg:pt-[110px]" aria-labelledby="about-fund-heading">
      <Image
        src="/media/home/about-right.png"
        alt=""
        width={80}
        height={120}
        className="pointer-events-none absolute right-10 top-[70px] hidden w-20 opacity-35 lg:block xl:right-[55px] xl:top-[210px]"
        aria-hidden
      />

      <div className="live-wrap relative z-10 px-2.5 lg:px-5">
        <div className="flex flex-col-reverse items-center gap-10 py-2.5 lg:flex-row lg:items-center lg:gap-20">
          <div className="relative mx-auto w-full max-w-[560px] shrink-0 lg:mx-0">
            <Image
              src="/media/home/about-deco.png"
              alt=""
              width={320}
              height={320}
              className="pointer-events-none absolute -left-[83px] top-[97px] -z-0 hidden w-[280px] opacity-80 lg:block"
              aria-hidden
            />

            <div className="relative flex flex-nowrap items-end justify-center gap-5 sm:gap-6">
              <Image
                src="/media/home/about-1.jpg"
                alt=""
                width={268}
                height={360}
                className="relative z-[2] h-auto w-[min(268px,44vw)] rounded-2xl object-cover"
                priority
              />
              <Image
                src="/media/home/about-2.jpg"
                alt=""
                width={268}
                height={300}
                className="relative z-[5] mb-0 mt-10 h-auto w-[min(268px,44vw)] rounded-2xl object-cover sm:mt-14"
              />

              <div className="absolute left-1/2 top-1/2 z-[6] -translate-x-1/2 -translate-y-1/2 flex h-[108px] w-[108px] items-center justify-center overflow-hidden rounded-full bg-white shadow-[0_8px_30px_rgba(0,0,0,0.16)]">
                <Image
                  src="/brand/endowment-seal.png"
                  alt=""
                  width={108}
                  height={108}
                  className="h-full w-full scale-[1.28] object-contain"
                  unoptimized
                />
              </div>
            </div>
          </div>

          <div className="w-full max-w-[96%] lg:max-w-none lg:flex-1">
            <p className="mb-3.5 inline-flex items-center text-sm font-semibold uppercase tracking-[0.08em] text-white">
              <EyebrowIcon />
              <span className="ml-2.5">{t.eyebrow}</span>
            </p>

            <h2
              id="about-fund-heading"
              className="mb-5 font-[Maitree,Georgia,serif] text-[clamp(1.85rem,3.2vw,2.75rem)] font-bold leading-tight !text-white"
            >
              {c.mission.title}
            </h2>

            <p className="mb-0 max-w-[62ch] text-base leading-7 text-white">{t.lead}</p>

            <div className="mt-[30px] flex flex-col-reverse items-start gap-6 sm:flex-row sm:items-center sm:gap-11">
              <Link
                href="/about-us"
                className="inline-flex shrink-0 items-center gap-2.5 rounded-[30px] bg-sky px-[25px] py-4 text-[15px] font-medium leading-none !text-[#030303] transition-colors hover:bg-white hover:!text-[#030303]"
              >
                {t.more}
                <ButtonDotsIcon />
              </Link>

              <div className="flex w-full max-w-full items-start gap-6 rounded-xl bg-[#0F6487] p-5 sm:max-w-[58%] sm:p-[30px] lg:gap-[25px]">
                <Image
                  src="/media/home/about-trophy.svg"
                  alt=""
                  width={64}
                  height={64}
                  className="h-16 w-16 shrink-0 object-contain"
                  unoptimized
                />
                <div className="min-w-0">
                  <h3 className="mb-2.5 text-lg font-bold leading-snug !text-white">{statTitle}</h3>
                  <p className="m-0 text-[15px] leading-6 text-white">{statDesc}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="h-[58px] lg:h-[95px]" aria-hidden />
      </div>
    </section>
  )
}
