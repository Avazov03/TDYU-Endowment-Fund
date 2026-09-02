import { brand } from '@/content/site'
import type { Locale } from '@/i18n/routing'
import { PageHero } from './PageHero'
import { loc } from './loc'

export function PrivacyView({ locale }: { locale: Locale }) {
  const paras = [
    loc(
      locale,
      'Fond saytida murojaat, xayriya, grant va axborotnoma formalarida ism, email, telefon va xabar qabul qilinadi. Ma’lumotlar admin panelda ko‘rib chiqiladi.',
      'На сайте фонда через формы обращений, пожертвований, грантов и рассылки принимаются имя, email, телефон и сообщение. Данные просматриваются в админ-панели.',
      'The fund site collects name, email, phone and message through contact, donation, grant and newsletter forms. Data is reviewed in the admin panel.',
    ),
    loc(
      locale,
      'Ma’lumotlar uchinchi shaxslarga sotilmaydi. Ular faqat fond faoliyati (javob, hisobot, grant tanlovi) uchun ishlatiladi.',
      'Данные не продаются третьим лицам. Они используются только для деятельности фонда (ответ, отчётность, отбор грантов).',
      'Data is not sold to third parties. It is used only for fund operations (reply, reporting, grant selection).',
    ),
    loc(
      locale,
      `So‘rov bo‘yicha ma’lumotni o‘chirish yoki tuzatish uchun yozing: ${brand.email}`,
      `Чтобы удалить или исправить данные, напишите: ${brand.email}`,
      `To delete or correct your data, write to ${brand.email}`,
    ),
  ]

  return (
    <>
      <PageHero
        image="/media/about/hero.jpg"
        title={loc(locale, 'Maxfiylik siyosati', 'Политика конфиденциальности', 'Privacy policy')}
        lead={loc(locale, 'Shaxsiy ma’lumotlar qanday qabul qilinadi.', 'Как принимаются персональные данные.', 'How personal data is collected.')}
        crumbs={[
          { href: '/', label: loc(locale, 'Bosh', 'Главная', 'Home') },
          { href: '/privacy', label: loc(locale, 'Maxfiylik', 'Конфиденциальность', 'Privacy') },
        ]}
      />
      <section className="bg-cream py-16">
        <div className="live-wrap max-w-[720px] grid gap-5">
          {paras.map((p) => (
            <p key={p} className="leading-7 bg-white rounded-[16px] p-6 m-0 shadow-[0_4px_30px_rgba(0,0,0,0.05)]">
              {p}
            </p>
          ))}
        </div>
      </section>
    </>
  )
}
