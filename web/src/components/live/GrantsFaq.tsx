'use client'

import { useState } from 'react'
import type { Locale } from '@/i18n/routing'
import { loc } from './loc'
import { GrantsHelpCard } from './GrantsHelpCard'

const FAQ = [
  {
    q: 'Talabalar uchun grantlar bormi?',
    qRu: 'Есть ли гранты для студентов?',
    qEn: 'Are there grants for students?',
  },
  {
    q: 'Grantga qanday ariza topshiriladi?',
    qRu: 'Как подать заявку на грант?',
    qEn: 'How do I apply for a grant?',
  },
  {
    q: 'Yiliga nechta grant ajratiladi?',
    qRu: 'Сколько грантов выделяется в год?',
    qEn: 'How many grants are awarded each year?',
  },
  {
    q: 'Kimlar ariza topshira oladi?',
    qRu: 'Кто может подать заявку?',
    qEn: 'Who can apply?',
  },
  {
    q: 'Aloqa uchun qayerga murojaat qilaman?',
    qRu: 'Куда обращаться?',
    qEn: 'Where can I get in touch?',
  },
] as const

export function GrantsFaq({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(0)
  const answer = loc(
    locale,
    'Ha. Fond stipendiyalar va grantlar dasturlarini ochiq e’lon qiladi. Ariza muddatlari Grantlar sahifasida ko‘rsatiladi.',
    'Да. Фонд открыто объявляет стипендиальные и грантовые программы. Сроки указаны на странице грантов.',
    'Yes. The fund openly announces scholarship and grant programmes. Deadlines are listed on the Grants page.',
  )

  return (
    <div className="grants-faq-wrap">
      <div className="grants-faq">
        <h2 className="grants-h">{loc(locale, 'Ko‘p so‘raladigan savollar', 'Частые вопросы', 'Frequently asked questions')}</h2>
        <div className="grants-faq-list">
          {FAQ.map((item, i) => {
            const on = open === i
            return (
              <div key={item.q} className={on ? 'grants-faq-item is-open' : 'grants-faq-item'}>
                <button type="button" className="grants-faq-q" aria-expanded={on} onClick={() => setOpen(on ? -1 : i)}>
                  <span>{loc(locale, item.q, item.qRu, item.qEn)}</span>
                  <svg width="12" height="8" viewBox="0 0 12 8" aria-hidden>
                    {on ? <path d="M1 7l5-5 5 5" fill="none" stroke="currentColor" strokeWidth="1.6" /> : <path d="M1 1l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.6" />}
                  </svg>
                </button>
                {on ? <p className="grants-faq-a">{answer}</p> : null}
              </div>
            )
          })}
        </div>
      </div>
      <GrantsHelpCard locale={locale} />
    </div>
  )
}
