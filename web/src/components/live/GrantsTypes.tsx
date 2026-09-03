'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { Locale } from '@/i18n/routing'
import { loc } from './loc'

const TABS = [
  { uz: 'Xalqaro Ta’lim Granti', ru: 'Грант на международное образование', en: 'International education grant' },
  { uz: 'Tanlov Stipendiyasi', ru: 'Конкурсная стипендия', en: 'Competitive scholarship' },
  { uz: 'Ilmiy Nashr Granti', ru: 'Грант на научную публикацию', en: 'Research publication grant' },
  { uz: 'Stipendiya Dasturi', ru: 'Стипендиальная программа', en: 'Scholarship programme' },
] as const

const CARDS = [
  [
    { t: 'Xalqaro stajirovka', ru: 'Зарубежная стажировка', en: 'Overseas internship', img: '/media/dump/grants/card-1.jpg' },
    { t: 'Stipendiya va grant', ru: 'Стипендия и грант', en: 'Scholarship and grant', img: '/media/dump/grants/card-2.jpg' },
    { t: 'Tanlov va musobaqa', ru: 'Конкурс и соревнование', en: 'Contest and competition', img: '/media/dump/grants/card-3.jpg' },
  ],
  [
    { t: 'Ilmiy loyiha', ru: 'Научный проект', en: 'Research project', img: '/media/dump/grants/card-2.jpg' },
    { t: 'Xalqaro tadbir', ru: 'Международное мероприятие', en: 'International event', img: '/media/dump/grants/card-3.jpg' },
    { t: 'Infratuzilma', ru: 'Инфраструктура', en: 'Infrastructure', img: '/media/dump/grants/card-1.jpg' },
  ],
  [
    { t: 'Nashr va tarjima', ru: 'Издание и перевод', en: 'Publishing and translation', img: '/media/dump/grants/card-3.jpg' },
    { t: 'Alumni qo‘llab-quvvatlash', ru: 'Поддержка выпускников', en: 'Alumni support', img: '/media/dump/grants/card-1.jpg' },
    { t: 'Malaka oshirish', ru: 'Повышение квалификации', en: 'Professional development', img: '/media/dump/grants/card-2.jpg' },
  ],
  [
    { t: 'Xorijiy delegatsiya', ru: 'Зарубежная делегация', en: 'Foreign delegation', img: '/media/dump/grants/card-1.jpg' },
    { t: 'Protokol xizmati', ru: 'Протокольная служба', en: 'Protocol service', img: '/media/dump/grants/card-2.jpg' },
    { t: 'TSUL brendi', ru: 'Бренд TSUL', en: 'TSUL brand', img: '/media/dump/grants/card-3.jpg' },
  ],
] as const

function TabIcon({ i }: { i: number }) {
  const common = { width: 18, height: 18, fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, 'aria-hidden': true as const }
  if (i === 0) {
    return (
      <svg {...common} viewBox="0 0 24 24">
        <path d="M4 19V7l8-3 8 3v12" />
        <path d="M8 10h8M8 14h8" />
      </svg>
    )
  }
  if (i === 1) {
    return (
      <svg {...common} viewBox="0 0 24 24">
        <circle cx="12" cy="8" r="3.2" />
        <path d="M6 19c1.2-3 3.4-4.5 6-4.5S16.8 16 18 19" />
      </svg>
    )
  }
  if (i === 2) {
    return (
      <svg {...common} viewBox="0 0 24 24">
        <path d="M5 6h14v12H5z" />
        <path d="M8 10h8M8 14h5" />
      </svg>
    )
  }
  return (
    <svg {...common} viewBox="0 0 24 24">
      <path d="M4 8h16l-2 11H6L4 8z" />
      <path d="M9 8V6h6v2" />
    </svg>
  )
}

function CardIcon({ i }: { i: number }) {
  const common = { width: 22, height: 22, fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, 'aria-hidden': true as const }
  if (i === 0) {
    return (
      <svg {...common} viewBox="0 0 24 24">
        <path d="M4 7h12v10H4z" />
        <path d="M16 10h4v7h-4" />
      </svg>
    )
  }
  if (i === 1) {
    return (
      <svg {...common} viewBox="0 0 24 24">
        <path d="M12 3l2.2 6.6H21l-5.4 4 2.1 6.4L12 16.8 6.3 20l2.1-6.4L3 9.6h6.8z" />
      </svg>
    )
  }
  return (
    <svg {...common} viewBox="0 0 24 24">
      <path d="M4 19V8l8-4 8 4v11" />
      <path d="M9 19v-6h6v6" />
    </svg>
  )
}

export function GrantsTypes({ locale }: { locale: Locale }) {
  const [active, setActive] = useState(0)
  const amount = loc(
    locale,
    'To‘liq yoki qisman moliyalashtirish — dastur shartlariga ko‘ra',
    'Полное или частичное финансирование — по условиям программы',
    'Full or partial funding — according to programme terms',
  )
  const extra = loc(locale, 'Yiliga ochiq — ariza: mart–may', 'Открыто ежегодно — заявка: март–май', 'Open yearly — apply March–May')

  return (
    <div className="grants-types">
      <h2 className="grants-h">{loc(locale, 'Grant turlari', 'Типы грантов', 'Grant types')}</h2>
      <p className="grants-lead">
        {loc(
          locale,
          'Har bir grant turi uchun alohida shartlar va muddatlar belgilangan.',
          'Для каждого типа гранта установлены отдельные условия и сроки.',
          'Each grant type has its own terms and deadlines.',
        )}
      </p>

      <div className="grants-tabs" role="tablist">
        {TABS.map((t, i) => (
          <button
            key={t.uz}
            type="button"
            role="tab"
            aria-selected={active === i}
            className={active === i ? 'is-active' : undefined}
            onClick={() => setActive(i)}
          >
            <TabIcon i={i} />
            <span>{loc(locale, t.uz, t.ru, t.en)}</span>
          </button>
        ))}
      </div>

      <div className="grants-type-grid" role="tabpanel">
        {CARDS[active].map((c, i) => (
          <div key={c.t} className="grants-type-card">
            <div className="grants-type-media">
              <Image src={c.img} alt="" width={420} height={220} className="object-cover w-full h-full" unoptimized />
            </div>
            <div className="grants-type-badge" aria-hidden>
              <CardIcon i={i} />
            </div>
            <div className="grants-type-body">
              <h3>{loc(locale, c.t, c.ru, c.en)}</h3>
              <p className="grants-type-label">{loc(locale, 'Miqdor:', 'Сумма:', 'Amount:')}</p>
              <p>{amount}</p>
              <p className="grants-type-label">{loc(locale, 'Qo‘shimcha:', 'Дополнительно:', 'Extra:')}</p>
              <p>{extra}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
