import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'

const SUB_BLOCK = {
  uz: [
    { title: 'Fanlar kolleji', lines: ['Dastur moliyalashtirish: dastur shartlariga ko‘ra', 'Dastur moliyalashtirish: dastur shartlariga ko‘ra'] },
    { title: 'Ilmiy nashrlar — 16%', lines: ['Qo‘shimcha xarajatlar: dasturga qarab', 'Tadbir/loyiha xarajatlari: dasturga qarab'] },
  ],
  ru: [
    { title: 'Факультет', lines: ['Финансирование программы: по условиям договора', 'Финансирование программы: по условиям договора'] },
    { title: 'Научные публикации — 16%', lines: ['Дополнительные расходы: по программе', 'Расходы на мероприятия/проекты: по программе'] },
  ],
  en: [
    { title: 'Faculty', lines: ['Programme funding: per agreement terms', 'Programme funding: per agreement terms'] },
    { title: 'Publications — 16%', lines: ['Additional costs: programme-dependent', 'Event/project costs: programme-dependent'] },
  ],
} as const

const COPY = {
  uz: {
    eyebrow: 'Hisobotlar',
    title: 'Mablag‘ qayerga ketadi',
    summary: 'Ta’lim 48% · Tadbirlar 22% · Nashrlar 16% · Infratuzilma 9% · Boshqaruv 5%.',
    cta: 'Batafsil reja',
    cards: [
      { title: 'Ta’lim va grantlar — 48%', tone: 'light' as const },
      { title: 'Magistratura', tone: 'dark' as const },
      { title: 'Onlayn kurslar', tone: 'dark' as const },
      { title: 'Dasturlar bo‘yicha', tone: 'light' as const },
    ],
  },
  ru: {
    eyebrow: 'Отчёты',
    title: 'Куда идут средства',
    summary: 'Образование 48% · События 22% · Издания 16% · Инфраструктура 9% · Управление 5%.',
    cta: 'Подробный план',
    cards: [
      { title: 'Образование и гранты — 48%', tone: 'light' as const },
      { title: 'Магистратура', tone: 'dark' as const },
      { title: 'Онлайн-курсы', tone: 'dark' as const },
      { title: 'По программам', tone: 'light' as const },
    ],
  },
  en: {
    eyebrow: 'Reports',
    title: 'Where funds go',
    summary: 'Education 48% · Events 22% · Publishing 16% · Infrastructure 9% · Admin 5%.',
    cta: 'Detailed plan',
    cards: [
      { title: 'Education and grants — 48%', tone: 'light' as const },
      { title: 'Master’s programmes', tone: 'dark' as const },
      { title: 'Online courses', tone: 'dark' as const },
      { title: 'By programme', tone: 'light' as const },
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

export function SpendSection({ locale }: { locale: Locale }) {
  const t = COPY[locale]
  const blocks = SUB_BLOCK[locale]

  return (
    <section className="spend-section" aria-labelledby="spend-section-heading">
      <Image
        src="/media/home/calc-left.png"
        alt=""
        width={180}
        height={180}
        className="spend-section-deco spend-section-deco--spiro pointer-events-none absolute hidden lg:block"
        unoptimized
      />
      <Image
        src="/media/home/tuition-2.png"
        alt=""
        width={320}
        height={320}
        className="spend-section-deco spend-section-deco--diploma pointer-events-none absolute hidden lg:block"
        unoptimized
      />

      <div className="live-wrap spend-section-inner relative z-10 px-2.5 lg:px-5">
        <div className="spend-section-stage">
          <div className="spend-section-left">
            <div className="spend-section-copy">
              <p className="spend-section-eyebrow">
                <EyebrowIcon />
                {t.eyebrow}
              </p>
              <h2 id="spend-section-heading" className="spend-section-title">
                {t.title}
              </h2>
              <p className="spend-section-summary">{t.summary}</p>
              <Link href="/reports" className="spend-section-cta program-btn">
                <span className="program-btn-icon">
                  <ButtonDotsIcon />
                </span>
                <span className="program-btn-text" data-text={t.cta}>
                  {t.cta}
                </span>
              </Link>
            </div>

            <div className="spend-section-photo">
              <Image
                src="/media/home/spend-photo.jpg"
                alt=""
                width={450}
                height={328}
                className="spend-section-photo-img"
                sizes="(max-width: 1024px) 100vw, 450px"
                unoptimized
              />
            </div>
          </div>

          <div className="spend-section-cards">
            {t.cards.map((card) => (
              <article key={card.title} className={`spend-section-card spend-section-card--${card.tone}`}>
                <h4 className="spend-section-card-title">{card.title}</h4>
                {blocks.map((block) => (
                  <div key={block.title} className="spend-section-card-block">
                    <h6 className="spend-section-card-subtitle">{block.title}</h6>
                    <p className="spend-section-card-text">
                      {block.lines.map((line) => (
                        <span key={line}>{line}</span>
                      ))}
                    </p>
                  </div>
                ))}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
