'use client'

import { useState } from 'react'
import type { Locale } from '@/i18n/routing'
import { PageHero } from './PageHero'
import { loc } from './loc'

type FaqItem = { q: string; qRu: string; qEn: string; a: string; aRu: string; aEn: string }

type FaqTab = {
  name: string
  nameRu: string
  nameEn: string
  intro: string
  introRu: string
  introEn: string
  items: FaqItem[]
}

const TABS: FaqTab[] = [
  {
    name: 'Fond haqida',
    nameRu: 'О фонде',
    nameEn: 'About the fund',
    intro:
      'TDYU Endowment Fund — a’zoligi bo‘lmagan jamoat fondi. Maqsad: TDYU talabalari va xodimlari uchun grant, stipendiya va xalqaro imkoniyatlar.',
    introRu:
      'TDYU Endowment Fund — общественный фонд без членства. Цель: гранты, стипендии и международные возможности для студентов и сотрудников ТГЮУ.',
    introEn:
      'TDYU Endowment Fund is a public fund without membership. Its purpose is grants, scholarships and international opportunities for TSUL students and staff.',
    items: [
      {
        q: 'Fond nima qiladi?',
        qRu: 'Чем занимается фонд?',
        qEn: 'What does the fund do?',
        a: 'Fond maqsadli kapitalni boshqaradi va daromadni ta’lim, grantlar, xalqaro tadbirlar, nashrlar va infratuzilmaga yo‘naltiradi.',
        aRu: 'Фонд управляет целевым капиталом и направляет доход на образование, гранты, международные мероприятия, издания и инфраструктуру.',
        aEn: 'The fund stewards endowment capital and directs income to education, grants, international events, publishing and infrastructure.',
      },
      {
        q: 'Grantlarga kim ariza topshira oladi?',
        qRu: 'Кто может подать заявку на грант?',
        qEn: 'Who can apply for grants?',
        a: 'Asosan TDYU talabalari, xodimlari, doktorantlari va bitiruvchilari. Aniq shartlar har bir dastur sahifasida.',
        aRu: 'В основном студенты, сотрудники, докторанты и выпускники ТГЮУ. Точные условия — на странице каждой программы.',
        aEn: 'Mainly TSUL students, staff, doctoral candidates and alumni. Exact terms are on each programme page.',
      },
      {
        q: 'Qanday dasturlar moliyalashtiriladi?',
        qRu: 'Какие программы финансируются?',
        qEn: 'Which programmes are funded?',
        a: 'Yetti yo‘nalish: stajirovka, stipendiya/grant, tanlovlar, ilmiy loyihalar, xalqaro tadbirlar, infratuzilma va nashrlar.',
        aRu: 'Семь направлений: стажировки, стипендии/гранты, конкурсы, научные проекты, международные мероприятия, инфраструктура и издания.',
        aEn: 'Seven strands: internships, scholarships/grants, contests, research projects, international events, infrastructure and publishing.',
      },
      {
        q: 'Hisobotlar qayerdan ko‘riladi?',
        qRu: 'Где посмотреть отчёты?',
        qEn: 'Where can I view reports?',
        a: 'Hisobotlar sahifasida mablag‘ taqsimoti, yillik hisobot va auditorlik xulosasi joylashtiriladi.',
        aRu: 'На странице «Отчёты» публикуются распределение средств, годовой отчёт и аудиторское заключение.',
        aEn: 'The Reports page publishes fund allocation, the annual report and the audit opinion.',
      },
      {
        q: 'Alumni Associationga qanday qo‘shilaman?',
        qRu: 'Как вступить в Alumni Association?',
        qEn: 'How do I join the Alumni Association?',
        a: 'Alumni sahifasidagi forma orqali ro‘yxatdan o‘ting — admin murojaatni ko‘rib chiqadi.',
        aRu: 'Зарегистрируйтесь через форму на странице Alumni — заявка будет рассмотрена администратором.',
        aEn: 'Register via the form on the Alumni page — the admin team will review your request.',
      },
      {
        q: 'Xayriya qanday amalga oshiriladi?',
        qRu: 'Как сделать пожертвование?',
        qEn: 'How is a donation made?',
        a: 'Xayriya sahifasida summani tanlang yoki bank rekvizitlari orqali o‘tkazing, so‘ng chekni emailga yuboring.',
        aRu: 'На странице пожертвования выберите сумму или переведите по банковским реквизитам, затем отправьте чек на email.',
        aEn: 'On the Donate page choose an amount or transfer via bank details, then email the receipt.',
      },
      {
        q: 'Fond manzili qayerda?',
        qRu: 'Где находится фонд?',
        qEn: 'Where is the fund located?',
        a: 'Saylgoh ko‘chasi 35-uy, Yunusobod tumani, Toshkent shahri, 100047.',
        aRu: 'ул. Сайилгох 35, Юнусабад, Ташкент, 100047.',
        aEn: '35 Saylgoh Street, Yunusobod, Tashkent 100047.',
      },
      {
        q: 'Talabalar uchun grantlar bormi?',
        qRu: 'Есть ли гранты для студентов?',
        qEn: 'Are there grants for students?',
        a: 'Ha — stipendiya, stajirovka va tanlov yo‘nalishlari talabalarga ochiq. Grantlar sahifasida ariza bering.',
        aRu: 'Да — стипендии, стажировки и конкурсы открыты для студентов. Подайте заявку на странице «Гранты».',
        aEn: 'Yes — scholarships, internships and contests are open to students. Apply on the Grants page.',
      },
    ],
  },
  {
    name: 'Grantlar',
    nameRu: 'Гранты',
    nameEn: 'Grants',
    intro:
      'Grant va stipendiya arizalari ochiq muddatlarda qabul qilinadi. Hujjatlar va motivatsiya xati majburiy.',
    introRu:
      'Заявки на гранты и стипендии принимаются в открытые сроки. Документы и мотивационное письмо обязательны.',
    introEn:
      'Grant and scholarship applications are accepted during open windows. Documents and a motivation letter are required.',
    items: [
      {
        q: 'Grantlarga kim ariza topshira oladi?',
        qRu: 'Кто может подать заявку на грант?',
        qEn: 'Who can apply for grants?',
        a: 'TDYU talaba, xodim, doktorant va alumni — dastur shartlariga muvofiq.',
        aRu: 'Студенты, сотрудники, докторанты и выпускники ТГЮУ — в соответствии с условиями программы.',
        aEn: 'TSUL students, staff, doctoral candidates and alumni — subject to programme terms.',
      },
      {
        q: 'Qanday hujjatlar kerak?',
        qRu: 'Какие документы нужны?',
        qEn: 'What documents are needed?',
        a: 'Pasport/ID, akademiya ma’lumotnomasi, motivatsiya xati va dasturga oid qo‘shimcha fayllar.',
        aRu: 'Паспорт/ID, академическая справка, мотивационное письмо и дополнительные файлы по программе.',
        aEn: 'Passport/ID, academic transcript, motivation letter and any programme-specific files.',
      },
      {
        q: 'Natijalar qachon e’lon qilinadi?',
        qRu: 'Когда объявляют результаты?',
        qEn: 'When are results announced?',
        a: 'Har bir tanlovning muddati Grants sahifasidagi jadvalda ko‘rsatiladi.',
        aRu: 'Сроки каждого конкурса указаны в таблице на странице «Гранты».',
        aEn: 'Each call’s timeline is shown in the table on the Grants page.',
      },
      {
        q: 'Talabalar uchun grantlar bormi?',
        qRu: 'Есть ли гранты для студентов?',
        qEn: 'Are there grants for students?',
        a: 'Ha. Ta’lim va grantlar yo‘nalishi mablag‘ning asosiy qismini tashkil etadi (~48%).',
        aRu: 'Да. Направление «Образование и гранты» составляет основную долю средств (~48%).',
        aEn: 'Yes. Education and grants make up the largest share of spending (~48%).',
      },
    ],
  },
  {
    name: 'Xayriya',
    nameRu: 'Пожертвования',
    nameEn: 'Donations',
    intro:
      'Xayriya ixtiyoriy. Mablag‘lar shaffof hisobotlar asosida taqsimlanadi.',
    introRu:
      'Пожертвования добровольны. Средства распределяются на основе прозрачной отчётности.',
    introEn:
      'Donations are voluntary. Funds are allocated based on transparent reporting.',
    items: [
      {
        q: 'Xayriya qanday amalga oshiriladi?',
        qRu: 'Как сделать пожертвование?',
        qEn: 'How is a donation made?',
        a: 'Donate sahifasidagi forma yoki bank o‘tkazmasi orqali. Chekni info@tdyu-endowment.uz ga yuboring.',
        aRu: 'Через форму на странице Donate или банковский перевод. Отправьте чек на info@tdyu-endowment.uz.',
        aEn: 'Via the Donate page form or a bank transfer. Email the receipt to info@tdyu-endowment.uz.',
      },
      {
        q: 'Xayriya qayerga ketadi?',
        qRu: 'Куда идут пожертвования?',
        qEn: 'Where do donations go?',
        a: 'Asosan ta’lim/grantlar, tadbirlar, nashrlar, infratuzilma va boshqaruv xarajatlariga.',
        aRu: 'В основном на образование/гранты, мероприятия, издания, инфраструктуру и управленческие расходы.',
        aEn: 'Mainly to education/grants, events, publishing, infrastructure and administration.',
      },
      {
        q: 'Chek kerakmi?',
        qRu: 'Нужен ли чек?',
        qEn: 'Is a receipt required?',
        a: 'Ha — bank o‘tkazmasidan keyin chekni emailga yuboring, ariza admin panelda tasdiqlanadi.',
        aRu: 'Да — после перевода отправьте чек на email; заявка подтверждается в админ-панели.',
        aEn: 'Yes — after the transfer email the receipt; the request is confirmed in admin.',
      },
    ],
  },
  {
    name: 'Boshqaruv',
    nameRu: 'Управление',
    nameEn: 'Governance',
    intro:
      'Fond Vasiylik kengashi, Boshqaruv kengashi va Taftish komissiyasi tomonidan boshqariladi.',
    introRu:
      'Фондом управляют Попечительский совет, Правление и Ревизионная комиссия.',
    introEn:
      'The fund is governed by the Board of Trustees, the Management Board and the Audit Commission.',
    items: [
      {
        q: 'Kim qaror qabul qiladi?',
        qRu: 'Кто принимает решения?',
        qEn: 'Who makes decisions?',
        a: 'Strategik qarorlar — Vasiylik kengashi; operatsion — Boshqaruv; nazorat — Taftish komissiyasi.',
        aRu: 'Стратегические решения — Попечительский совет; операционные — Правление; контроль — Ревизионная комиссия.',
        aEn: 'Strategy sits with the Board of Trustees; operations with Management; oversight with Audit.',
      },
      {
        q: 'Hisobotlar ochiqmi?',
        qRu: 'Открыты ли отчёты?',
        qEn: 'Are reports public?',
        a: 'Ha — Hisobotlar va Shaffoflik sahifalarida asosiy ko‘rsatkichlar e’lon qilinadi.',
        aRu: 'Да — ключевые показатели публикуются на страницах «Отчёты» и «Прозрачность».',
        aEn: 'Yes — key figures are published on the Reports and Transparency pages.',
      },
      {
        q: 'Aloqa qanday?',
        qRu: 'Как связаться?',
        qEn: 'How do I get in touch?',
        a: 'Aloqa formasidan yozing yoki info@tdyu-endowment.uz / +998 71 233-66-36.',
        aRu: 'Напишите через форму контактов или info@tdyu-endowment.uz / +998 71 233-66-36.',
        aEn: 'Use the contact form or info@tdyu-endowment.uz / +998 71 233-66-36.',
      },
    ],
  },
]

export function FaqView({ locale }: { locale: Locale }) {
  const [tab, setTab] = useState(0)
  const [open, setOpen] = useState(0)
  const active = TABS[tab]

  return (
    <>
      <PageHero
        image="/media/dump/page-bnr-img17-min.jpg"
        objectPosition="center center"
        deco="/media/dump/faq/bnr-arrow-1-1.png"
        title={loc(locale, 'Savol-javob', 'Вопросы и ответы', 'FAQ')}
        lead={loc(
          locale,
          'TDYU Endowment Fund — bitiruvchilar, grantlar va xalqaro loyihalar orqali bilimga sarmoya kiritadi.',
          'TDYU Endowment Fund инвестирует в знания через выпускников, гранты и международные проекты.',
          'TDYU Endowment Fund invests in knowledge through alumni, grants and international projects.',
        )}
        crumbs={[
          { href: '/', label: loc(locale, 'Bosh', 'Главная', 'Home') },
          { href: '/faq', label: loc(locale, 'Savol-javob', 'Вопросы и ответы', 'FAQ') },
        ]}
      />

      <section className="faq-shell">
        <div className="faq-inner">
          <div className="faq-layout">
            <div className="faq-tabs" role="tablist" aria-label={loc(locale, 'Bo‘limlar', 'Разделы', 'Sections')}>
              {TABS.map((t, i) => (
                <button
                  key={t.name}
                  type="button"
                  role="tab"
                  aria-selected={tab === i}
                  className={tab === i ? 'faq-tab is-active' : 'faq-tab'}
                  onClick={() => {
                    setTab(i)
                    setOpen(0)
                  }}
                >
                  {loc(locale, t.name, t.nameRu, t.nameEn)}
                </button>
              ))}
            </div>

            <div className="faq-panel" role="tabpanel">
              <p className="faq-intro">{loc(locale, active.intro, active.introRu, active.introEn)}</p>
              <div className="faq-list">
                {active.items.map((item, i) => {
                  const on = open === i
                  return (
                    <div key={`${tab}-${item.q}`} className={on ? 'faq-item is-open' : 'faq-item'}>
                      <button
                        type="button"
                        className="faq-q"
                        aria-expanded={on}
                        onClick={() => setOpen(on ? -1 : i)}
                      >
                        <span>{loc(locale, item.q, item.qRu, item.qEn)}</span>
                        <svg width="12" height="8" viewBox="0 0 12 8" aria-hidden>
                          {on ? (
                            <path d="M1 7l5-5 5 5" fill="none" stroke="currentColor" strokeWidth="1.6" />
                          ) : (
                            <path d="M1 1l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.6" />
                          )}
                        </svg>
                      </button>
                      {on ? <p className="faq-a">{loc(locale, item.a, item.aRu, item.aEn)}</p> : null}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
