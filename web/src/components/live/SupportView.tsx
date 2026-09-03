import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { PageHero } from './PageHero'
import { loc } from './loc'

/** Dump how-to-apply / Yordam page 5156 */

const STEPS: {
  n: string
  title: { uz: string; ru: string; en: string }
  body: { uz: string; ru: string; en: string }
}[] = [
  {
    n: '01',
    title: {
      uz: '01. Maqsadni tanlang',
      ru: '01. Выберите цель',
      en: '01. Choose a goal',
    },
    body: {
      uz: 'Xayriya, grant arizasi, alumni ro‘yxati yoki hamkorlik taklifidan birini tanlang.',
      ru: 'Выберите пожертвование, заявку на грант, регистрацию alumni или предложение о партнёрстве.',
      en: 'Choose a donation, grant application, alumni registration or partnership proposal.',
    },
  },
  {
    n: '02',
    title: {
      uz: '02. Ma’lumotlarni to‘ldiring',
      ru: '02. Заполните данные',
      en: '02. Fill in the details',
    },
    body: {
      uz: 'Ism, aloqa va murojaat mazmunini aniq yozing. Kerak bo‘lsa qo‘shimcha izoh qo‘shing.',
      ru: 'Укажите имя, контакты и суть обращения. При необходимости добавьте пояснение.',
      en: 'Write your name, contact details and the purpose clearly. Add a note if needed.',
    },
  },
  {
    n: '03',
    title: {
      uz: '03. Hujjat yoki xayriyani yuboring',
      ru: '03. Отправьте документы или пожертвование',
      en: '03. Submit documents or a donation',
    },
    body: {
      uz: 'Kerakli hujjatlarni biriktiring yoki xayriya miqdorini ko‘rsating; so‘ngra yuboring.',
      ru: 'Прикрепите нужные документы или укажите сумму пожертвования, затем отправьте.',
      en: 'Attach the required documents or specify the donation amount, then submit.',
    },
  },
  {
    n: '04',
    title: {
      uz: '04. Javobni kuting',
      ru: '04. Дождитесь ответа',
      en: '04. Wait for a reply',
    },
    body: {
      uz: 'Fond murojaatingizni ko‘rib chiqadi va email orqali javob beradi.',
      ru: 'Фонд рассмотрит обращение и ответит по электронной почте.',
      en: 'The fund will review your request and reply by email.',
    },
  },
]

const WAYS = [
  {
    title: { uz: 'Xayriya', ru: 'Пожертвование', en: 'Donation' },
    desc: {
      uz: 'Xayriya, grant yoki hamkorlik orqali fondni qo‘llab-quvvatlang.',
      ru: 'Поддержите фонд через пожертвование, грант или партнёрство.',
      en: 'Support the fund through a donation, grant or partnership.',
    },
    img: '/media/dump/support/inner-cat-img1-min.jpg',
    href: '/donate' as const,
    cta: { uz: 'Xayriya', ru: 'Пожертвовать', en: 'Donate' },
  },
  {
    title: { uz: 'Grant arizasi', ru: 'Заявка на грант', en: 'Grant application' },
    desc: {
      uz: 'Alumni, xodim va talabalar uchun ochiq dasturlar va grantlar.',
      ru: 'Открытые программы и гранты для alumni, сотрудников и студентов.',
      en: 'Open programmes and grants for alumni, staff and students.',
    },
    img: '/media/dump/support/inner-cat-img2-min.jpg',
    href: '/grants' as const,
    cta: { uz: 'Ariza berish', ru: 'Подать заявку', en: 'Apply' },
  },
  {
    title: { uz: 'Hamkorlik', ru: 'Партнёрство', en: 'Partnership' },
    desc: {
      uz: 'Savol va takliflar uchun info@tdyu-endowment.uz manziliga yozing.',
      ru: 'Вопросы и предложения — на info@tdyu-endowment.uz.',
      en: 'For questions and proposals write to info@tdyu-endowment.uz.',
    },
    img: '/media/dump/support/inner-cat-img3-min.jpg',
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

function pick(locale: Locale, t: { uz: string; ru: string; en: string }) {
  return locale === 'ru' ? t.ru : locale === 'en' ? t.en : t.uz
}

export function SupportView({ locale }: { locale: Locale }) {
  return (
    <>
      <PageHero
        image="/media/dump/page-bnr-img17-min.jpg"
        height={413}
        deco="/media/dump/support/bnr-arrow-1-1.png"
        title={loc(locale, 'Yordam', 'Помощь', 'Support')}
        lead={loc(
          locale,
          'TDYU Endowment Fund — bilim, grant va xalqaro imkoniyatlarga sarmoya.',
          'TDYU Endowment Fund — инвестиции в знания, гранты и международные возможности.',
          'TDYU Endowment Fund — an investment in knowledge, grants and international opportunity.',
        )}
        crumbs={[
          { href: '/', label: loc(locale, 'Bosh', 'Главная', 'Home') },
          { href: '/support', label: loc(locale, 'Yordam', 'Помощь', 'Support') },
        ]}
      />

      <section className="support-page">
        <div className="live-wrap">
          <div className="support-feature">
            <div className="support-feature-body">
              <h2 className="support-feature-title">
                {loc(locale, 'Fondga murojaat qilish', 'Обращение в фонд', 'Contacting the fund')}
              </h2>
              <p className="support-feature-text">
                {loc(
                  locale,
                  'Fondga murojaat qilish — xayriya, grant arizasi yoki hamkorlik taklifini tayyorlashdan boshlanadi. Kerakli ma’lumotlar tayyor bo‘lgach, Aloqa formasi orqali yuboring.',
                  'Обращение в фонд начинается с подготовки пожертвования, заявки на грант или предложения о партнёрстве. Когда данные готовы, отправьте их через форму контактов.',
                  'Contacting the fund starts with preparing a donation, grant application or partnership proposal. When the details are ready, send them via the contact form.',
                )}
              </p>
              <a href="#process" className="support-feature-cta">
                <span>{loc(locale, 'Murojaat', 'Обращение', 'Enquire')}</span>
                <span className="support-feature-cta-icon" aria-hidden>
                  <DotsIcon />
                </span>
              </a>
            </div>
            <div className="support-feature-media">
              <Image
                src="/media/dump/support/e-event-img-1-min.jpg"
                alt=""
                width={640}
                height={400}
                className="h-full w-full object-cover"
                unoptimized
              />
            </div>
          </div>

          <div className="support-process" id="process">
            <div className="support-process-media">
              <div className="support-process-photo">
                <Image
                  src="/media/dump/support/apply-img1-1-min.jpg"
                  alt=""
                  width={560}
                  height={560}
                  className="h-full w-full object-cover"
                  unoptimized
                />
              </div>
              <div className="support-process-seal" aria-hidden>
                <Image
                  src="/media/dump/support/marquee-logo.png"
                  alt=""
                  width={140}
                  height={140}
                  className="h-full w-full object-contain"
                  unoptimized
                />
              </div>
            </div>

            <ol className="support-process-steps">
              {STEPS.map((s) => (
                <li key={s.n} className="support-step">
                  <h3 className="support-step-title">{pick(locale, s.title)}</h3>
                  <div className="support-step-body">
                    <p>{pick(locale, s.body)}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="support-ways">
            <h2 className="support-ways-title">{loc(locale, 'Xayriya', 'Пожертвование', 'Donation')}</h2>
            <p className="support-ways-lead">
              {loc(
                locale,
                'Fond mablag‘lari shaffof hisobotlar asosida taqsimlanadi.',
                'Средства фонда распределяются на основе прозрачной отчётности.',
                'Fund resources are allocated on the basis of transparent reporting.',
              )}
            </p>

            <div className="support-ways-grid">
              {WAYS.map((w) => {
                const cta = pick(locale, w.cta)
                return (
                <article key={w.title.uz} className="support-way-card">
                  <div className="support-way-copy">
                    <h3 className="support-way-title">{pick(locale, w.title)}</h3>
                    <p className="support-way-desc">{pick(locale, w.desc)}</p>
                  </div>
                  <Link href={w.href} className="support-way-cta program-btn">
                    <span className="program-btn-icon" aria-hidden>
                      <DotsIcon />
                    </span>
                    <span className="program-btn-text" data-text={cta}>
                      {cta}
                    </span>
                  </Link>
                  <div className="support-way-media">
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
