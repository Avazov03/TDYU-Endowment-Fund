'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { PageHero } from './PageHero'
import { loc } from './loc'

type TabId = 'spend' | 'annual' | 'audit' | 'charter'

const TABS: { id: TabId; uz: string; ru: string; en: string }[] = [
  { id: 'spend', uz: 'Mablag‘ taqsimoti', ru: 'Распределение средств', en: 'Fund allocation' },
  { id: 'annual', uz: 'Yillik hisobot', ru: 'Годовой отчёт', en: 'Annual report' },
  { id: 'audit', uz: 'Auditorlik xulosasi', ru: 'Аудиторское заключение', en: 'Audit opinion' },
  { id: 'charter', uz: 'Fond ustavi', ru: 'Устав фонда', en: 'Fund charter' },
]

/** Hisobotlar jadvallari — fond yo‘nalishlari (UZ/RU/EN). */
const TABLES: Record<
  Locale,
  Record<TabId, { headers: string[]; rows: string[][] }>
> = {
  uz: {
    spend: {
      headers: ['Yo‘nalish', 'Ulush', 'Davr', 'Izoh'],
      rows: [
        ['Ta’lim va grantlar', '48%', 'Doimiy', 'Stipendiya, stajirovka, tanlov'],
        ['Xalqaro tadbirlar', '22%', 'Doimiy', 'Kongress, forum, delegatsiya'],
        ['Ilmiy nashrlar', '16%', 'Doimiy', 'Tarjima va nashr'],
        ['Infratuzilma', '9%', 'Doimiy', 'Kampus va brend'],
        ['Boshqaruv', '5%', 'Doimiy', 'Operatsion xarajatlar'],
      ],
    },
    annual: {
      headers: ['Ko‘rsatkich', 'Qiymat', 'Davr', 'Izoh'],
      rows: [
        ['Yillik hisobot', '2025', 'Yillik', 'PDF — Hisobotlar'],
        ['Xayriya tushumlari', 'Ochiq', 'Yillik', 'Shaffoflik sahifasi'],
        ['Moliyalashtirilgan dasturlar', '7', 'Yillik', 'Dasturlar sahifasi'],
        ['Amalga oshirilgan loyihalar', '31+', 'Yillik', 'Loyihalar'],
      ],
    },
    audit: {
      headers: ['Hujjat', 'Holat', 'Davr', 'Izoh'],
      rows: [
        ['Auditorlik xulosasi', 'Chop etiladi', 'Yillik', 'Mustaqil audit'],
        ['Ichki nazorat', 'Faol', 'Davriy', 'Taftish komissiyasi'],
        ['Moliya balansi', 'Ochiq', 'Yillik', 'Hisobotlar'],
      ],
    },
    charter: {
      headers: ['Hujjat', 'Holat', 'Izoh'],
      rows: [
        ['Fond ustavi', 'Amalda', 'NNO va jamoat fondlari qonunlari'],
        ['Shaffoflik siyosati', 'Amalda', 'Ochiq hisobotlar'],
        ['Maxfiylik siyosati', 'Amalda', 'Shaxsiy ma’lumotlar'],
      ],
    },
  },
  ru: {
    spend: {
      headers: ['Направление', 'Доля', 'Период', 'Примечание'],
      rows: [
        ['Образование и гранты', '48%', 'Постоянно', 'Стипендии, стажировки, конкурсы'],
        ['Международные мероприятия', '22%', 'Постоянно', 'Конгрессы, форумы, делегации'],
        ['Научные издания', '16%', 'Постоянно', 'Перевод и публикация'],
        ['Инфраструктура', '9%', 'Постоянно', 'Кампус и бренд'],
        ['Управление', '5%', 'Постоянно', 'Операционные расходы'],
      ],
    },
    annual: {
      headers: ['Показатель', 'Значение', 'Период', 'Примечание'],
      rows: [
        ['Годовой отчёт', '2025', 'Ежегодно', 'PDF — Отчёты'],
        ['Поступления', 'Открыто', 'Ежегодно', 'Страница прозрачности'],
        ['Финансируемые программы', '7', 'Ежегодно', 'Страница программ'],
        ['Реализованные проекты', '31+', 'Ежегодно', 'Проекты'],
      ],
    },
    audit: {
      headers: ['Документ', 'Статус', 'Период', 'Примечание'],
      rows: [
        ['Аудиторское заключение', 'Публикуется', 'Ежегодно', 'Независимый аудит'],
        ['Внутренний контроль', 'Активен', 'Периодически', 'Ревизионная комиссия'],
        ['Финансовый баланс', 'Открыт', 'Ежегодно', 'Отчёты'],
      ],
    },
    charter: {
      headers: ['Документ', 'Статус', 'Примечание'],
      rows: [
        ['Устав фонда', 'Действует', 'Законы о ННО и общественных фондах'],
        ['Политика прозрачности', 'Действует', 'Открытая отчётность'],
        ['Политика конфиденциальности', 'Действует', 'Персональные данные'],
      ],
    },
  },
  en: {
    spend: {
      headers: ['Direction', 'Share', 'Period', 'Note'],
      rows: [
        ['Education and grants', '48%', 'Ongoing', 'Scholarships, internships, contests'],
        ['International events', '22%', 'Ongoing', 'Congresses, forums, delegations'],
        ['Academic publishing', '16%', 'Ongoing', 'Translation and publishing'],
        ['Infrastructure', '9%', 'Ongoing', 'Campus and brand'],
        ['Administration', '5%', 'Ongoing', 'Operating costs'],
      ],
    },
    annual: {
      headers: ['Metric', 'Value', 'Period', 'Note'],
      rows: [
        ['Annual report', '2025', 'Yearly', 'PDF — Reports'],
        ['Donations received', 'Open', 'Yearly', 'Transparency page'],
        ['Funded programmes', '7', 'Yearly', 'Programs page'],
        ['Completed projects', '31+', 'Yearly', 'Projects'],
      ],
    },
    audit: {
      headers: ['Document', 'Status', 'Period', 'Note'],
      rows: [
        ['Audit opinion', 'Published', 'Yearly', 'Independent audit'],
        ['Internal control', 'Active', 'Periodic', 'Audit Commission'],
        ['Financial balance', 'Open', 'Yearly', 'Reports'],
      ],
    },
    charter: {
      headers: ['Document', 'Status', 'Note'],
      rows: [
        ['Fund charter', 'In force', 'NGO and public fund laws'],
        ['Transparency policy', 'In force', 'Open reporting'],
        ['Privacy policy', 'In force', 'Personal data'],
      ],
    },
  },
}

function CapIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden className="shrink-0 text-sky">
      <path d="M12 3 1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" />
    </svg>
  )
}

function ArrowBtnIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="10" fill="currentColor" fillOpacity="0.2" />
      <path d="M10 8l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function ReportsView({ locale }: { locale: Locale }) {
  const [tab, setTab] = useState<TabId>('spend')
  const table = TABLES[locale][tab]

  return (
    <>
      <PageHero
        image="/media/page-bnr-img22-min.jpg"
        height={413}
        deco="/media/reports/bnr-arrow-1-1.png"
        title={loc(locale, 'Hisobotlar', 'Отчёты', 'Reports')}
        lead={loc(
          locale,
          'TDYU Endowment Fund — bilim, grant va xalqaro imkoniyatlarga sarmoya.',
          'TDYU Endowment Fund — инвестиции в знания, гранты и международные возможности.',
          'TDYU Endowment Fund — an investment in knowledge, grants and international opportunity.',
        )}
        crumbs={[
          { href: '/', label: loc(locale, 'Bosh', 'Главная', 'Home') },
          { href: '/reports', label: loc(locale, 'Hisobotlar', 'Отчёты', 'Reports') },
        ]}
      />

      <section className="reports-page">
        <div className="live-wrap">
          <div className="reports-feature">
            <div className="reports-feature-media">
              <Image
                src="/media/reports/e-event-img-2-min.jpg"
                alt=""
                width={560}
                height={360}
                className="h-full w-full object-cover"
                unoptimized
              />
            </div>
            <div className="reports-feature-body">
              <h2 className="reports-feature-title">
                {loc(locale, 'Mablag‘ qayerga ketadi', 'Куда идут средства', 'Where funds go')}
              </h2>
              <p className="reports-feature-text">
                {loc(
                  locale,
                  'Fond mablag‘lari shaffof taqsimlanadi: ta’lim va grantlar, xalqaro tadbirlar, ilmiy nashrlar, infratuzilma va boshqaruv xarajatlari.',
                  'Средства фонда распределяются прозрачно: образование и гранты, международные мероприятия, научные издания, инфраструктура и управленческие расходы.',
                  'Fund resources are allocated transparently: education and grants, international events, publishing, infrastructure and administration.',
                )}
              </p>
              <Link href="/donate" className="reports-feature-cta">
                {loc(locale, 'Xayriya', 'Пожертвовать', 'Donate')}
                <ArrowBtnIcon />
              </Link>
            </div>
          </div>

          <div className="reports-docs">
            <h2 className="reports-docs-title">
              {loc(locale, 'Yillik hisobot · audit · ustav', 'Годовой отчёт · аудит · устав', 'Annual report · audit · charter')}
            </h2>
            <p className="reports-docs-lead">
              {loc(
                locale,
                'Yillik hisobot, auditorlik xulosasi va ustav — fond faoliyatining asosiy hujjatlari. Mablag‘lar taqsimoti ochiq e’lon qilinadi.',
                'Годовой отчёт, аудиторское заключение и устав — основные документы фонда. Распределение средств публикуется открыто.',
                'Annual report, audit opinion and charter — the fund’s core documents. Fund allocation is published openly.',
              )}
            </p>

            <div className="reports-tabs" role="tablist" aria-label={loc(locale, 'Hujjatlar', 'Документы', 'Documents')}>
              {TABS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  id={`reports-tab-${t.id}`}
                  aria-selected={tab === t.id}
                  aria-controls={`reports-panel-${t.id}`}
                  className={['reports-tab', tab === t.id ? 'is-active' : ''].filter(Boolean).join(' ')}
                  onClick={() => setTab(t.id)}
                >
                  <CapIcon />
                  <span>{loc(locale, t.uz, t.ru, t.en)}</span>
                </button>
              ))}
            </div>

            <div
              className="reports-panel"
              role="tabpanel"
              id={`reports-panel-${tab}`}
              aria-labelledby={`reports-tab-${tab}`}
              key={tab}
            >
              <div className="reports-table-wrap">
                <table className="reports-table">
                  <thead>
                    <tr>
                      {table.headers.map((h) => (
                        <th key={h} scope="col">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {table.rows.map((row, i) => (
                      <tr key={`${tab}-${i}`}>
                        {row.map((cell, j) => (
                          <td key={`${i}-${j}`}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
