import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { PageHero } from './PageHero'
import { loc } from './loc'

/** Dump admission-requirements / Huquqiy asos page 26.
 *  Template “Apply Now” block on live dump = Xayriya (cards + donate CTAs).
 */

type T3 = { uz: string; ru: string; en: string }

const LAW_LEFT: { title: T3; items: T3[] }[] = [
  {
    title: {
      uz: '1. Konstitutsiya asoslari',
      ru: '1. Конституционные основы',
      en: '1. Constitutional foundations',
    },
    items: [
      {
        uz: 'Fuqarolik jamiyati va uyushma erkinligi kafolatlari.',
        ru: 'Гарантии гражданского общества и свободы ассоциаций.',
        en: 'Guarantees of civil society and freedom of association.',
      },
      {
        uz: 'Mulkiy huquqlar va ixtiyoriy birlashish asoslari.',
        ru: 'Основы имущественных прав и добровольного объединения.',
        en: 'Foundations of property rights and voluntary association.',
      },
      {
        uz: 'Fond faoliyati Konstitutsiya doirasida amalga oshiriladi.',
        ru: 'Деятельность фонда осуществляется в рамках Конституции.',
        en: 'The fund operates within the framework of the Constitution.',
      },
    ],
  },
  {
    title: {
      uz: '3. Jamoat fondlari to‘g‘risidagi Qonun',
      ru: '3. Закон об общественных фондах',
      en: '3. Law on Public Funds',
    },
    items: [
      {
        uz: 'Jamoat fondining huquqiy holati',
        ru: 'Правовой статус общественного фонда',
        en: 'Legal status of a public fund',
      },
      {
        uz: 'Boshqaruv va nazorat tartibi',
        ru: 'Порядок управления и контроля',
        en: 'Governance and oversight procedures',
      },
    ],
  },
  {
    title: {
      uz: '5. Boshqaruv tartibi',
      ru: '5. Порядок управления',
      en: '5. Governance procedure',
    },
    items: [
      {
        uz: 'Vasiylik kengashi tarkibi va vakolatlari',
        ru: 'Состав и полномочия Попечительского совета',
        en: 'Composition and powers of the Board of Trustees',
      },
      {
        uz: 'Boshqaruv kengashi majburiyatlari',
        ru: 'Обязанности Правления',
        en: 'Duties of the Management Board',
      },
      {
        uz: 'Vasiylik kengashi vakolatlari',
        ru: 'Полномочия Попечительского совета',
        en: 'Powers of the Board of Trustees',
      },
      {
        uz: 'Ichki reglament va qarorlar',
        ru: 'Внутренний регламент и решения',
        en: 'Internal regulations and decisions',
      },
    ],
  },
  {
    title: {
      uz: '7. Shaffoflik va hisobotlar',
      ru: '7. Прозрачность и отчётность',
      en: '7. Transparency and reports',
    },
    items: [
      {
        uz: 'Adliya vazirligida ro‘yxat',
        ru: 'Регистрация в Министерстве юстиции',
        en: 'Registration with the Ministry of Justice',
      },
      {
        uz: 'Yillik hisobot e’lon qilish',
        ru: 'Публикация годового отчёта',
        en: 'Publication of the annual report',
      },
      {
        uz: 'Byudjet va xarajatlar ochiqligi',
        ru: 'Открытость бюджета и расходов',
        en: 'Openness of budget and expenditures',
      },
      {
        uz: 'Auditorlik xulosasi',
        ru: 'Аудиторское заключение',
        en: 'Audit opinion',
      },
    ],
  },
]

const LAW_RIGHT: { title: T3; items: T3[] }[] = [
  {
    title: {
      uz: '2. NNO to‘g‘risidagi Qonun',
      ru: '2. Закон о ННО',
      en: '2. Law on NGOs',
    },
    items: [
      {
        uz: 'NNO sifatida ro‘yxatdan o‘tish',
        ru: 'Регистрация в качестве ННО',
        en: 'Registration as an NGO',
      },
      {
        uz: 'Faoliyat maqsadlari va cheklovlar',
        ru: 'Цели деятельности и ограничения',
        en: 'Activity goals and restrictions',
      },
      {
        uz: 'Rasmiy nomlar (4 til)',
        ru: 'Официальные названия (4 языка)',
        en: 'Official names (4 languages)',
      },
      {
        uz: 'Yillik faoliyat hisoboti',
        ru: 'Годовой отчёт о деятельности',
        en: 'Annual activity report',
      },
      {
        uz: 'Hisobot topshirish majburiyati',
        ru: 'Обязанность сдачи отчётности',
        en: 'Obligation to submit reports',
      },
      {
        uz: 'Davlat nazorati tartibi',
        ru: 'Порядок государственного контроля',
        en: 'State oversight procedure',
      },
      {
        uz: 'Moliyaviy shaffoflik talablari',
        ru: 'Требования финансовой прозрачности',
        en: 'Financial transparency requirements',
      },
    ],
  },
  {
    title: {
      uz: '4. Fond ustavi',
      ru: '4. Устав фонда',
      en: '4. Fund charter',
    },
    items: [
      {
        uz: 'Fond ustavi — asosiy ichki hujjat',
        ru: 'Устав фонда — основной внутренний документ',
        en: 'Fund charter — the main internal document',
      },
      {
        uz: 'Ustav o‘zgarishlari belgilangan tartibda qabul qilinadi',
        ru: 'Изменения устава принимаются в установленном порядке',
        en: 'Charter amendments are adopted in the prescribed manner',
      },
    ],
  },
  {
    title: {
      uz: '6. Moliyaviy nazorat',
      ru: '6. Финансовый контроль',
      en: '6. Financial control',
    },
    items: [
      {
        uz: 'Mustaqil audit va ichki nazorat',
        ru: 'Независимый аудит и внутренний контроль',
        en: 'Independent audit and internal control',
      },
      {
        uz: 'Mablag‘lar maqsadli sarflanishi',
        ru: 'Целевое расходование средств',
        en: 'Targeted use of funds',
      },
    ],
  },
]

/** Dump table quirk: Holat “Oktabr 1” rowspan=4; extra date cells spill right. */
const DOC_HEADERS = {
  uz: ['Dastur darajasi', 'Hujjat turi', 'Holat', 'Yangilanish', 'Izoh'],
  ru: ['Уровень программы', 'Тип документа', 'Статус', 'Обновление', 'Примечание'],
  en: ['Programme level', 'Document type', 'Status', 'Update', 'Note'],
}

const WAYS = [
  {
    title: { uz: 'Xayriya', ru: 'Пожертвование', en: 'Donation' },
    desc: {
      uz: 'Xayriya orqali fondni qo‘llab-quvvatlang — mablag‘lar shaffof taqsimlanadi.',
      ru: 'Поддержите фонд пожертвованием — средства распределяются прозрачно.',
      en: 'Support the fund with a donation — funds are allocated transparently.',
    },
    img: '/media/legal/inner-cat-img1-min.jpg',
    href: '/donate' as const,
    cta: { uz: 'Xayriya', ru: 'Пожертвовать', en: 'Donate' },
  },
  {
    title: { uz: 'Ustav', ru: 'Устав', en: 'Charter' },
    desc: {
      uz: 'Fond ustavi va ichki hujjatlar — Hisobotlar sahifasida.',
      ru: 'Устав фонда и внутренние документы — на странице «Отчёты».',
      en: 'Fund charter and internal documents — on the Reports page.',
    },
    img: '/media/legal/inner-cat-img2-min.jpg',
    href: '/reports' as const,
    cta: { uz: 'Hisobotlar', ru: 'Отчёты', en: 'Reports' },
  },
  {
    title: { uz: 'Qonunlar', ru: 'Законы', en: 'Laws' },
    desc: {
      uz: 'Huquqiy savollar uchun info@tdyu-endowment.uz yoki Aloqa formasi.',
      ru: 'По правовым вопросам — info@tdyu-endowment.uz или форма контактов.',
      en: 'For legal questions — info@tdyu-endowment.uz or the contact form.',
    },
    img: '/media/legal/inner-cat-img3-min.jpg',
    href: '/contact' as const,
    cta: { uz: 'Aloqa', ru: 'Связаться', en: 'Contact' },
  },
]

function DotsIcon() {
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

function pick(locale: Locale, t: T3) {
  return locale === 'ru' ? t.ru : locale === 'en' ? t.en : t.uz
}

function LawBlock({ locale, block }: { locale: Locale; block: { title: T3; items: T3[] } }) {
  return (
    <div className="legal-law">
      <h4 className="legal-law-title">{pick(locale, block.title)}</h4>
      <ul className="legal-law-list">
        {block.items.map((item) => (
          <li key={item.uz}>{pick(locale, item)}</li>
        ))}
      </ul>
    </div>
  )
}

export function LegalView({ locale }: { locale: Locale }) {
  const headers = locale === 'ru' ? DOC_HEADERS.ru : locale === 'en' ? DOC_HEADERS.en : DOC_HEADERS.uz

  return (
    <>
      <PageHero
        image="/media/page-bnr-img15-min.jpg"
        height={413}
        deco="/media/legal/bnr-arrow-1-1.png"
        title={loc(locale, 'Huquqiy asos', 'Правовая основа', 'Legal basis')}
        lead={loc(
          locale,
          'TDYU Endowment Fund — bilim, grant va xalqaro imkoniyatlarga sarmoya.',
          'TDYU Endowment Fund — инвестиции в знания, гранты и международные возможности.',
          'TDYU Endowment Fund — an investment in knowledge, grants and international opportunity.',
        )}
        crumbs={[
          { href: '/', label: loc(locale, 'Bosh', 'Главная', 'Home') },
          { href: '/legal', label: loc(locale, 'Huquqiy asos', 'Правовая основа', 'Legal basis') },
        ]}
      />

      <section className="legal-page">
        <div className="live-wrap">
          <div className="legal-gallery">
            <div className="legal-gallery-img">
              <Image
                src="/media/legal/blue-inner-img1-2-min.jpg"
                alt=""
                width={633}
                height={384}
                unoptimized
              />
            </div>
            <div className="legal-gallery-img">
              <Image
                src="/media/legal/blue-inner-img1-1-min.jpg"
                alt=""
                width={633}
                height={384}
                unoptimized
              />
            </div>
            <div className="legal-gallery-seal" aria-hidden>
              <Image
                src="/media/legal/cyan-m-logo1.png"
                alt=""
                width={90}
                height={90}
                unoptimized
              />
            </div>
          </div>

          <div className="legal-intro">
            <h2 className="legal-intro-title">
              {loc(locale, 'Huquqiy asos va hujjatlar', 'Правовая основа и документы', 'Legal basis and documents')}
            </h2>
            <p className="legal-intro-lead">
              {loc(
                locale,
                'Fond mablag‘lari shaffof hisobotlar asosida taqsimlanadi.',
                'Средства фонда распределяются на основе прозрачной отчётности.',
                'Fund resources are allocated on the basis of transparent reporting.',
              )}
            </p>
            <h3 className="legal-basis-title">
              {loc(locale, 'Fondning huquqiy asosi', 'Правовая основа фонда', 'Legal basis of the fund')}
            </h3>
          </div>

          <div className="legal-laws-card">
            <div className="legal-laws-col">
              {LAW_LEFT.map((b) => (
                <LawBlock key={b.title.uz} locale={locale} block={b} />
              ))}
            </div>
            <div className="legal-laws-col">
              {LAW_RIGHT.map((b) => (
                <LawBlock key={b.title.uz} locale={locale} block={b} />
              ))}
            </div>
          </div>

          <div className="legal-docs">
            <h3 className="legal-docs-title">{loc(locale, 'Asosiy hujjatlar', 'Основные документы', 'Key documents')}</h3>
            <div className="legal-table-wrap">
              <table className="legal-table">
                <thead>
                  <tr>
                    {headers.map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{loc(locale, 'Xayriya', 'Пожертвование', 'Donation')}</td>
                    <td>{loc(locale, 'Ustav', 'Устав', 'Charter')}</td>
                    <td rowSpan={4}>{loc(locale, 'Oktabr 1', '1 октября', 'October 1')}</td>
                    <td>{loc(locale, 'Dekabr 15', '15 декабря', 'December 15')}</td>
                    <td>{loc(locale, 'Yanvar 10', '10 января', 'January 10')}</td>
                  </tr>
                  <tr>
                    <td>{loc(locale, 'Xayriya', 'Пожертвование', 'Donation')}</td>
                    <td>{loc(locale, 'Hisobot', 'Отчёт', 'Report')}</td>
                    <td>{loc(locale, 'Aprel 1', '1 апреля', 'April 1')}</td>
                    <td>{loc(locale, 'Iyul 30', '30 июля', 'July 30')}</td>
                    <td>{loc(locale, 'Sentabr 1', '1 сентября', 'September 1')}</td>
                  </tr>
                  <tr>
                    <td>{loc(locale, 'Audit', 'Аудит', 'Audit')}</td>
                    <td>{loc(locale, 'Ustav', 'Устав', 'Charter')}</td>
                    <td>{loc(locale, 'Oktabr 1', '1 октября', 'October 1')}</td>
                    <td>{loc(locale, 'Dekabr 30', '30 декабря', 'December 30')}</td>
                    <td>{loc(locale, 'Yanvar 15', '15 января', 'January 15')}</td>
                  </tr>
                  <tr>
                    <td>{loc(locale, 'Audit', 'Аудит', 'Audit')}</td>
                    <td>{loc(locale, 'Hisobot', 'Отчёт', 'Report')}</td>
                    <td>{loc(locale, '2025', '2025', '2025')}</td>
                    <td>{loc(locale, 'Avgust 10', '10 августа', 'August 10')}</td>
                    <td>{loc(locale, 'Sentabr 5', '5 сентября', 'September 5')}</td>
                  </tr>
                  <tr>
                    <td>{loc(locale, 'Xalqaro arizalar', 'Международные заявки', 'International applications')}</td>
                    <td>{loc(locale, 'Taftish', 'Ревизия', 'Revision')}</td>
                    <td>{loc(locale, 'Amalda', 'Действует', 'Active')}</td>
                    <td>{loc(locale, 'Yillik', 'Ежегодно', 'Annual')}</td>
                    <td>{loc(locale, 'Reja bo‘yicha', 'По плану', 'As planned')}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="legal-ways" id="xayriya">
            <h2 className="legal-ways-title">{loc(locale, 'Xayriya', 'Пожертвование', 'Donation')}</h2>
            <p className="legal-ways-lead">
              {loc(
                locale,
                'Fond mablag‘lari shaffof va ochiq hisobotlar asosida taqsimlanadi.',
                'Средства фонда распределяются на основе прозрачной и открытой отчётности.',
                'Fund resources are allocated on the basis of transparent and open reporting.',
              )}
            </p>
            <div className="legal-ways-grid">
              {WAYS.map((w) => {
                const cta = pick(locale, w.cta)
                return (
                <article key={w.title.uz} className="legal-way-card">
                  <div className="legal-way-copy">
                    <h3 className="legal-way-title">{pick(locale, w.title)}</h3>
                    <p className="legal-way-desc">{pick(locale, w.desc)}</p>
                  </div>
                  <Link href={w.href} className="legal-way-cta program-btn">
                    <span className="program-btn-icon" aria-hidden>
                      <DotsIcon />
                    </span>
                    <span className="program-btn-text" data-text={cta}>
                      {cta}
                    </span>
                  </Link>
                  <div className="legal-way-media">
                    <Image src={w.img} alt="" width={420} height={280} className="h-full w-full object-cover" unoptimized />
                  </div>
                </article>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
