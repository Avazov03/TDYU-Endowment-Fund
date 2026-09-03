import Image from 'next/image'
import type { Locale } from '@/i18n/routing'
import { loc } from './loc'
import { PageHero } from './PageHero'
import { GrantForm } from './GrantForm'
import { GrantsTypes } from './GrantsTypes'
import { GrantsFaq } from './GrantsFaq'
import { GrantsHelpCard } from './GrantsHelpCard'

const TERMS_LEFT = [
  {
    n: 1,
    uz: 'Akademik talablar',
    ru: 'Академические требования',
    en: 'Academic requirements',
    items: {
      uz: [
        'O‘rta yoki oliy ma’lumot to‘g‘risida hujjat.',
        'Akademik ko‘rsatkichlar va motivatsion xat — dastur shartlariga muvofiq.',
        'Magistratura/malaka oshirish: tegishli bakalavr diplomi va akademik ko‘rsatkich.',
      ],
      ru: [
        'Документ о среднем или высшем образовании.',
        'Академические показатели и мотивационное письмо — по условиям программы.',
        'Магистратура/повышение квалификации: диплом бакалавра и академические показатели.',
      ],
      en: [
        'Certificate of secondary or higher education.',
        'Academic record and motivation letter — according to programme terms.',
        'Master’s / professional development: relevant bachelor’s diploma and academic record.',
      ],
    },
  },
  {
    n: 3,
    uz: 'Til bilimi',
    ru: 'Знание языка',
    en: 'Language',
    items: {
      uz: [
        'IELTS/TOEFL yoki teng kuchli til sertifikati.',
        'Til sertifikati yoki dastur talabiga mos hujjat (agar kerak bo‘lsa).',
      ],
      ru: [
        'IELTS/TOEFL или равнозначный языковой сертификат.',
        'Языковой сертификат или документ по требованию программы (если нужен).',
      ],
      en: [
        'IELTS/TOEFL or an equivalent language certificate.',
        'A language certificate or programme-required document (if needed).',
      ],
    },
  },
  {
    n: 5,
    uz: 'Dasturga oid qo‘shimcha shartlar',
    ru: 'Дополнительные условия программы',
    en: 'Additional programme conditions',
    items: {
      uz: [
        'Portfolio yoki oldingi loyiha namunalari (agar kerak).',
        'Kasbiy yoki texnik baholash (dastur talabiga ko‘ra).',
        'Amaliyot/stajirovka tajribasi — dastur shartlariga muvofiq.',
      ],
      ru: [
        'Портфолио или образцы предыдущих проектов (если нужно).',
        'Профессиональная или техническая оценка (по требованию программы).',
        'Опыт практики/стажировки — по условиям программы.',
      ],
      en: [
        'Portfolio or previous project samples (if required).',
        'Professional or technical assessment (as required).',
        'Internship/placement experience — according to programme terms.',
      ],
    },
  },
] as const

const TERMS_RIGHT = [
  {
    n: 2,
    uz: 'Kerakli hujjatlar',
    ru: 'Необходимые документы',
    en: 'Required documents',
    items: {
      uz: ['To‘ldirilgan ariza shakli.', 'Diplom va baholar varaqasi.', 'Pasport yoki ID.'],
      ru: ['Заполненная форма заявки.', 'Диплом и ведомость оценок.', 'Паспорт или ID.'],
      en: ['Completed application form.', 'Diploma and transcript.', 'Passport or ID.'],
    },
  },
  {
    n: 4,
    uz: 'Tanlov / suhbat',
    ru: 'Отбор / собеседование',
    en: 'Selection / interview',
    items: {
      uz: [
        'Ba’zi dasturlar tanlov yoki imtihon talab qilishi mumkin.',
        'Tanlangan arizachilar suhbatga chaqirilishi mumkin.',
      ],
      ru: [
        'Некоторые программы могут требовать конкурс или экзамен.',
        'Отобранные заявители могут быть приглашены на собеседование.',
      ],
      en: [
        'Some programmes may require a contest or exam.',
        'Shortlisted applicants may be invited to interview.',
      ],
    },
  },
  {
    n: 6,
    uz: 'Moliyaviy asoslar',
    ru: 'Финансовые основания',
    en: 'Financial basis',
    items: {
      uz: [
        'Ariza yig‘imi (agar belgilangan bo‘lsa).',
        'Dastur va safar xarajatlarini qoplash asoslari (grant doirasida).',
      ],
      ru: [
        'Сбор за заявку (если установлен).',
        'Основания покрытия расходов программы и поездки (в рамках гранта).',
      ],
      en: [
        'Application fee (if set).',
        'Basis for covering programme and travel costs (within the grant).',
      ],
    },
  },
] as const

function TermCol({
  locale,
  blocks,
}: {
  locale: Locale
  blocks: typeof TERMS_LEFT | typeof TERMS_RIGHT
}) {
  const pack = locale === 'ru' ? 'ru' : locale === 'en' ? 'en' : 'uz'
  return (
    <div className="grants-terms-col">
      {blocks.map((b) => (
        <div key={b.n}>
          <h3>
            {b.n}. {loc(locale, b.uz, b.ru, b.en)}
          </h3>
          <ul>
            {b.items[pack].map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export function GrantsView({ locale }: { locale: Locale }) {
  return (
    <>
      <PageHero
        image="/media/grants/page-bnr-img1-6-min.jpg"
        objectPosition="center center"
        deco="/media/grants/bnr-arrow-1-1.png"
        title={loc(locale, 'Grantlar', 'Гранты', 'Grants')}
        lead={loc(
          locale,
          'TDYU Endowment Fund — bitiruvchilar, grantlar va xalqaro loyihalar orqali bilimga sarmoya kiritadi.',
          'TDYU Endowment Fund инвестирует в знания через выпускников, гранты и международные проекты.',
          'TDYU Endowment Fund invests in knowledge through alumni, grants and international projects.',
        )}
        crumbs={[
          { href: '/', label: loc(locale, 'Bosh', 'Главная', 'Home') },
          { href: '/grants', label: loc(locale, 'Grantlar', 'Гранты', 'Grants') },
        ]}
      />

      <section className="grants-shell">
        <div className="grants-inner">
          <header className="grants-intro">
            <h2 className="grants-h">
              {loc(locale, 'Grant va stipendiya dasturlari', 'Программы грантов и стипендий', 'Grant and scholarship programmes')}
            </h2>
            <p className="grants-lead">
              {loc(
                locale,
                'Fond iqtidorli talaba, xodim va tadqiqotchilar uchun ochiq grant dasturlarini moliyalashtiradi. Ariza ochiq; tanlov mezonlari — akademik natija, motivatsiya va fond maqsadlariga moslik.',
                'Фонд финансирует открытые грантовые программы для студентов, сотрудников и исследователей. Заявки открыты; критерии — академический результат, мотивация и соответствие целям фонда.',
                'The fund finances open grant programmes for talented students, staff and researchers. Applications are open; criteria are academic results, motivation and fit with the fund’s goals.',
              )}
            </p>
            <div className="grants-intro-img">
              <Image
                src="/media/grants/scholarship-main-img1-min.jpg"
                alt=""
                width={1280}
                height={520}
                className="object-cover w-full h-full"
                unoptimized
              />
            </div>
          </header>

          <GrantsTypes locale={locale} />

          <div className="grants-terms">
            <h2 className="grants-h">{loc(locale, 'Ariza shartlari', 'Условия заявки', 'Application terms')}</h2>
            <div className="grants-terms-card">
              <TermCol locale={locale} blocks={TERMS_LEFT} />
              <TermCol locale={locale} blocks={TERMS_RIGHT} />
            </div>
          </div>

          <div className="grants-deadlines">
            <h2 className="grants-h">{loc(locale, 'Ariza muddatlari', 'Сроки подачи', 'Application deadlines')}</h2>
            <div className="grants-table-wrap">
              <table className="grants-table">
                <thead>
                  <tr>
                    <th>{loc(locale, 'Dastur', 'Программа', 'Programme')}</th>
                    <th>{loc(locale, 'Qabul sessiyasi', 'Сессия приёма', 'Intake session')}</th>
                    <th>{loc(locale, 'Ariza ochiladi', 'Приём открывается', 'Applications open')}</th>
                    <th>{loc(locale, 'Ariza muddati', 'Срок подачи', 'Application deadline')}</th>
                    <th>{loc(locale, 'Boshlanish', 'Начало', 'Start')}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{loc(locale, 'Ta’lim va grantlar — 48%', 'Образование и гранты — 48%', 'Education and grants — 48%')}</td>
                    <td>{loc(locale, 'Bahor', 'Весна', 'Spring')}</td>
                    <td rowSpan={4}>{loc(locale, '1 oktabr', '1 октября', '1 October')}</td>
                    <td>{loc(locale, '15 dekabr', '15 декабря', '15 December')}</td>
                    <td>{loc(locale, '10 yanvar', '10 января', '10 January')}</td>
                  </tr>
                  <tr>
                    <td>{loc(locale, 'Ta’lim va grantlar — 48%', 'Образование и гранты — 48%', 'Education and grants — 48%')}</td>
                    <td>{loc(locale, 'Kuz', 'Осень', 'Fall')}</td>
                    <td>{loc(locale, '1 aprel', '1 апреля', '1 April')}</td>
                    <td>{loc(locale, '30 iyul', '30 июля', '30 July')}</td>
                    <td className="is-mute">{loc(locale, '1 sentabr', '1 сентября', '1 September')}</td>
                  </tr>
                  <tr>
                    <td>{loc(locale, 'Magistratura / CPD', 'Магистратура / CPD', 'Postgraduate / CPD')}</td>
                    <td>{loc(locale, 'Bahor', 'Весна', 'Spring')}</td>
                    <td>{loc(locale, '1 oktabr', '1 октября', '1 October')}</td>
                    <td>{loc(locale, '30 dekabr', '30 декабря', '30 December')}</td>
                    <td className="is-mute">{loc(locale, '15 yanvar', '15 января', '15 January')}</td>
                  </tr>
                  <tr>
                    <td>{loc(locale, 'Magistratura / CPD', 'Магистратура / CPD', 'Postgraduate / CPD')}</td>
                    <td>{loc(locale, 'Kuz', 'Осень', 'Fall')}</td>
                    <td>{loc(locale, '1 aprel', '1 апреля', '1 April')}</td>
                    <td>{loc(locale, '10 avgust', '10 августа', '10 August')}</td>
                    <td className="is-mute">{loc(locale, '5 sentabr', '5 сентября', '5 September')}</td>
                  </tr>
                  <tr className="is-foot">
                    <td>{loc(locale, 'Xalqaro arizalar', 'Международные заявки', 'International applications')}</td>
                    <td>{loc(locale, 'Yil davomida', 'В течение года', 'Year-round')}</td>
                    <td>{loc(locale, '6 oy oldin', 'За 6 месяцев', '6 months prior')}</td>
                    <td>{loc(locale, '2 oy oldin', 'За 2 месяца', '2 months before')}</td>
                    <td>{loc(locale, 'Reja bo‘yicha', 'По плану', 'As scheduled')}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <GrantsFaq locale={locale} />

          <div className="grants-apply">
            <div>
              <h2 className="grants-h">{loc(locale, 'Grant ariza formasi', 'Форма заявки на грант', 'Grant application form')}</h2>
              <p className="grants-lead">{loc(locale, 'Formani to‘ldiring va kerakli hujjatlarni yuklang.', 'Заполните форму и загрузите документы.', 'Fill in the form and upload the required documents.')}</p>
              <div className="grants-form-card">
                <GrantForm />
              </div>
            </div>
            <GrantsHelpCard locale={locale} />
          </div>
        </div>
      </section>
    </>
  )
}
