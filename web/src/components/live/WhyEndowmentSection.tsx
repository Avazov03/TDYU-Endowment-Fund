import Image from 'next/image'
import type { Locale } from '@/i18n/routing'

const COPY = {
  uz: {
    eyebrow: 'PROGRAMS & STUDY',
    title: 'Nima uchun TDYU Endowment',
    subtitle: 'Fond ustunlari: ta’lim, hamkorlik, tanlov, nashr, brend, tadbirkorlik',
    cards: [
      {
        icon: '/media/home/why-icon-1.svg',
        iconClass: 'why-endowment-icon-glyph--sm',
        t: 'Ta’lim va grantlar',
        d: 'Mablag‘ning ~48% ta’lim, stipendiya va grantlarga yo‘naltiriladi.',
      },
      {
        icon: '/media/home/why-icon-2.svg',
        iconClass: 'why-endowment-icon-glyph--lg',
        t: 'Dasturlar',
        d: 'Xalqaro tadbirlar, ilmiy nashrlar va infratuzilma — shaffof hisobotlar bilan.',
      },
      {
        icon: '/media/home/why-icon-3.svg',
        iconClass: 'why-endowment-icon-glyph--lg',
        t: 'Alumni tarmog‘i',
        d: 'Fond bitiruvchilar va talabalarga xalqaro imkoniyatlar ochadi.',
      },
    ],
  },
  ru: {
    eyebrow: 'PROGRAMS & STUDY',
    title: 'Почему TDYU Endowment',
    subtitle: 'Столпы фонда: образование, партнёрство, конкурсы, публикации, бренд, предпринимательство',
    cards: [
      {
        icon: '/media/home/why-icon-1.svg',
        iconClass: 'why-endowment-icon-glyph--sm',
        t: 'Образование и гранты',
        d: 'Около 48% средств идёт на образование, стипендии и гранты.',
      },
      {
        icon: '/media/home/why-icon-2.svg',
        iconClass: 'why-endowment-icon-glyph--lg',
        t: 'Программы',
        d: 'Международные события, публикации и инфраструктура — с прозрачной отчётностью.',
      },
      {
        icon: '/media/home/why-icon-3.svg',
        iconClass: 'why-endowment-icon-glyph--lg',
        t: 'Сеть alumni',
        d: 'Фонд открывает международные возможности выпускникам и студентам.',
      },
    ],
  },
  en: {
    eyebrow: 'PROGRAMS & STUDY',
    title: 'Why TDYU Endowment',
    subtitle: 'Pillars: education, partnership, contests, publishing, brand, entrepreneurship',
    cards: [
      {
        icon: '/media/home/why-icon-1.svg',
        iconClass: 'why-endowment-icon-glyph--sm',
        t: 'Education and grants',
        d: 'About 48% of funds go to education, scholarships and grants.',
      },
      {
        icon: '/media/home/why-icon-2.svg',
        iconClass: 'why-endowment-icon-glyph--lg',
        t: 'Programs',
        d: 'International events, publishing and infrastructure — with transparent reports.',
      },
      {
        icon: '/media/home/why-icon-3.svg',
        iconClass: 'why-endowment-icon-glyph--lg',
        t: 'Alumni network',
        d: 'The fund opens international opportunities for alumni and students.',
      },
    ],
  },
} as const

function EyebrowIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M5.21484 12.8949V16.6564C5.21484 16.6564 8.82175 15.1537 12.0198 15.1537C15.2178 15.1537 18.8255 16.6564 18.8255 16.6564V12.8424C18.8255 12.8424 15.3844 11.0225 11.9665 11.0225C8.55018 11.021 5.21484 12.8949 5.21484 12.8949Z" />
      <path d="M22.6467 11.9993L24 11.2716L22.6467 10.5222V10.1666C22.6467 10.1666 23.0278 8.23413 20.862 9.24464C20.7517 9.30465 20.6924 9.36542 20.6684 9.42468L11.7367 4.47119L0 11.1884L4.43211 13.2019V12.5485C4.43211 12.5485 8.15079 10.4607 11.9625 10.4607C15.7734 10.4607 19.6092 12.4899 19.6092 12.4899V13.631L22.0563 12.3167V17.6377H21.2416V19.529L22.3248 18.7803L23.5274 19.529V17.637H22.6467V11.9993ZM22.0555 9.83803V10.1944L21.3413 9.79827C21.6017 9.62573 22.0555 9.38642 22.0555 9.83803ZM21.814 11.9251C21.737 11.9279 21.6603 11.9152 21.5883 11.8877C21.5164 11.8602 21.4507 11.8185 21.3952 11.7651C21.3398 11.7117 21.2956 11.6476 21.2655 11.5768C21.2353 11.5059 21.2198 11.4297 21.2197 11.3527C21.2197 11.2757 21.2351 11.1994 21.2652 11.1285C21.2953 11.0576 21.3393 10.9935 21.3947 10.94C21.4501 10.8865 21.5157 10.8447 21.5876 10.8172C21.6595 10.7896 21.7362 10.7768 21.8132 10.7795C21.9615 10.7848 22.102 10.8474 22.2051 10.9542C22.3082 11.0609 22.3659 11.2035 22.366 11.3519C22.3661 11.5003 22.3086 11.643 22.2056 11.7499C22.1027 11.8568 21.9623 11.9196 21.814 11.9251Z" />
    </svg>
  )
}

export function WhyEndowmentSection({ locale }: { locale: Locale }) {
  const t = COPY[locale]

  return (
    <section className="why-endowment-section relative bg-cream" aria-labelledby="why-endowment-heading">
      <div className="live-wrap why-endowment-inner relative z-10 px-2.5 lg:px-5">
        <Image
          src="/media/home/why-book-deco.png"
          alt=""
          width={450}
          height={400}
          className="why-endowment-deco-book pointer-events-none absolute hidden md:block"
          unoptimized
        />

        <header className="why-endowment-heading">
          <p className="why-endowment-eyebrow">
            <EyebrowIcon />
            {t.eyebrow}
          </p>
          <h2 id="why-endowment-heading" className="why-endowment-title">
            {t.title}
          </h2>
          <p className="why-endowment-subtitle">{t.subtitle}</p>
        </header>

        <div className="why-endowment-cards">
          {t.cards.map((card) => (
            <article key={card.t} className="why-endowment-card">
              <div className="why-endowment-icon">
                {/* Dump: elementor-icon-box — img ishlatiladi, Next Image SVG bilan muammo beradi */}
                <span className={`why-endowment-icon-glyph ${card.iconClass}`} aria-hidden>
                  <img src={card.icon} alt="" width={80} height={80} decoding="async" />
                </span>
              </div>
              <div className="why-endowment-card-body">
                <h4 className="why-endowment-card-title">{card.t}</h4>
                <p className="why-endowment-card-desc">{card.d}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
