import { brand } from '@/content/site'
import type { Locale } from '@/i18n/routing'
import { PageHero } from './PageHero'
import { ContactForm } from './ContactForm'
import { loc } from './loc'

/** Dump /cyan/contact/ page 55 */

const MAP_SRC =
  'https://maps.google.com/maps?q=Toshkent%20davlat%20yuridik%20universiteti%20Saylgoh%2035&t=m&z=15&output=embed&iwloc=near'

const CARDS = [
  {
    icon: '/media/contact/icon-mail.svg',
    iconW: 40,
    iconH: 29,
    tUz: 'Elektron pochta',
    tRu: 'Электронная почта',
    tEn: 'Email',
    kind: 'email' as const,
  },
  {
    icon: '/media/contact/icon-phone.svg',
    iconW: 35,
    iconH: 34,
    tUz: 'Telefon',
    tRu: 'Телефон',
    tEn: 'Phone',
    kind: 'phone' as const,
  },
  {
    icon: '/media/contact/icon-pin.svg',
    iconW: 32,
    iconH: 36,
    tUz: 'Manzil',
    tRu: 'Адрес',
    tEn: 'Address',
    kind: 'address' as const,
  },
  {
    icon: '/media/contact/icon-partner.svg',
    iconW: 34,
    iconH: 38,
    tUz: 'Hamkorlik',
    tRu: 'Партнёрство',
    tEn: 'Partnership',
    kind: 'partner' as const,
  },
]

export function ContactView({ locale }: { locale: Locale }) {
  return (
    <>
      <PageHero
        image="/media/page-bnr-img17-min.jpg"
        height={413}
        deco="/media/contact/bnr-arrow-1-1.png"
        title={loc(locale, 'Aloqa', 'Контакты', 'Contact')}
        lead={loc(
          locale,
          'TDYU Endowment Fund — bilim, grant va xalqaro imkoniyatlarga sarmoya.',
          'TDYU Endowment Fund — инвестиции в знания, гранты и международные возможности.',
          'TDYU Endowment Fund — an investment in knowledge, grants and international opportunity.',
        )}
        crumbs={[
          { href: '/', label: loc(locale, 'Bosh', 'Главная', 'Home') },
          { href: '/contact', label: loc(locale, 'Aloqa', 'Контакты', 'Contact') },
        ]}
      />

      <section className="contact-page">
        <div className="live-wrap">
          <div className="contact-cards">
            {CARDS.map((c) => (
              <article key={c.tUz} className="contact-card">
                <div className="contact-card-icon">
                  <img src={c.icon} alt="" width={c.iconW} height={c.iconH} />
                </div>
                <h3 className="contact-card-title">{loc(locale, c.tUz, c.tRu, c.tEn)}</h3>
                <div className="contact-card-body">
                  {c.kind === 'email' ? (
                    <a href={`mailto:${brand.email}`} className="contact-card-link">
                      {brand.email}
                    </a>
                  ) : null}
                  {c.kind === 'phone' ? (
                    <a href={brand.phoneHref} className="contact-card-link">
                      {brand.phone}
                    </a>
                  ) : null}
                  {c.kind === 'address' ? (
                    <span>
                      {loc(
                        locale,
                        "Saylgoh ko'chasi 35-uy, Yunusobod, Toshkent 100047",
                        'ул. Сайилгох 35, Юнусабад, Ташкент 100047',
                        '35 Saylgoh St, Yunusobod, Tashkent 100047',
                      )}
                    </span>
                  ) : null}
                  {c.kind === 'partner' ? (
                    <span className="contact-card-stack">
                      <a href={`mailto:${brand.email}`} className="contact-card-link">
                        {brand.email}
                      </a>
                      <a href={brand.phoneHref} className="contact-card-link">
                        {brand.phone}
                      </a>
                    </span>
                  ) : null}
                </div>
              </article>
            ))}
          </div>

          <div className="contact-main">
            <div className="contact-panel">
              <h2 className="contact-panel-title">{loc(locale, 'Bizga yozing', 'Напишите нам', 'Write to us')}</h2>

              <div className="contact-panel-intro">
                <h3>{loc(locale, 'Biz bilan bog‘laning', 'Свяжитесь с нами', 'Get in touch')}</h3>
                <p>
                  {loc(
                    locale,
                    'Savol, taklif yoki hamkorlik uchun forma to‘ldiring — jamoa tez orada javob beradi.',
                    'Заполните форму по вопросам, предложениям или партнёрству — команда ответит в ближайшее время.',
                    'Fill in the form for questions, suggestions or partnership — the team will reply soon.',
                  )}
                </p>
              </div>

              <ul className="contact-panel-meta">
                <li>
                  <strong>Email:</strong> {brand.email}
                </li>
                <li>
                  <strong>Tel:</strong> {brand.phone}
                </li>
                <li>
                  <strong>{loc(locale, 'Vaqt', 'Время', 'Hours')}:</strong>{' '}
                  {loc(locale, 'Dush–Jum: 09:00–18:00', 'Пн–Пт: 09:00–18:00', 'Mon–Fri: 09:00–18:00')}
                </li>
                <li>
                  <strong>{loc(locale, 'Manzil', 'Адрес', 'Address')}:</strong> {brand.address[locale]}
                </li>
              </ul>

              <ContactForm />
            </div>

            <div className="contact-map">
              <iframe
                title={loc(locale, 'TDYU — Saylgoh 35, Toshkent', 'ТГЮУ — Сайилгох 35, Ташкент', 'TSUL — Saylgoh 35, Tashkent')}
                src={MAP_SRC}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
