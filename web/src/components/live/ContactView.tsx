import { brand } from '@/content/site'
import type { Locale } from '@/i18n/routing'
import { PageHero } from './PageHero'
import { ContactForm } from './ContactForm'
import { loc } from './loc'

export function ContactView({ locale }: { locale: Locale }) {
  return (
    <>
      <PageHero
        image="/media/about/hero.jpg"
        title={loc(locale, 'Aloqa', 'Контакты', 'Contact')}
        lead={loc(
          locale,
          'Savol, hamkorlik yoki xayriya bo‘yicha yozing. Jamoa javob beradi.',
          'Напишите по вопросу, партнёрству или пожертвованию. Команда ответит.',
          'Write about a question, partnership or donation. The team will reply.',
        )}
        crumbs={[
          { href: '/', label: loc(locale, 'Bosh', 'Главная', 'Home') },
          { href: '/contact', label: loc(locale, 'Aloqa', 'Контакты', 'Contact') },
        ]}
      />
      <section className="bg-cream py-16">
        <div className="live-wrap grid gap-10 lg:grid-cols-2 items-start">
          <div>
            <p className="text-sky font-semibold tracking-[0.14em] uppercase text-sm mb-2">{loc(locale, 'Murojaat', 'Обращение', 'Enquiry')}</p>
            <h2 className="text-[clamp(1.6rem,3vw,2.2rem)] mb-4">{loc(locale, 'Bizga yozing', 'Напишите нам', 'Write to us')}</h2>
            <ContactForm />
          </div>
          <div className="rounded-[16px] bg-white p-6 shadow-[0_4px_30px_rgba(0,0,0,0.06)]">
            <h3 className="text-lg mb-3">{brand.name}</h3>
            <p className="text-sm leading-7 m-0">
              Email: {brand.email}
              <br />
              Tel: +998 71 233-66-36
              <br />
              {brand.address[locale]}
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
