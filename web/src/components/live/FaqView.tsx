import type { Locale } from '@/i18n/routing'
import { PageHero } from './PageHero'
import { loc } from './loc'

export function FaqView({ locale }: { locale: Locale }) {
  const items = [
    {
      q: loc(locale, 'Qanday xayriya qilaman?', 'Как сделать пожертвование?', 'How do I donate?'),
      a: loc(locale, 'Xayriya sahifasidagi forma orqali ariza yuboring. Bank rekvizitlari ko‘rsatilgan.', 'Отправьте заявку через форму на странице пожертвований. Банковские реквизиты указаны.', 'Submit the form on the donate page. Bank details are listed there.'),
    },
    {
      q: loc(locale, 'Grantga qanday ariza topshiraman?', 'Как подать заявку на грант?', 'How do I apply for a grant?'),
      a: loc(locale, 'Grantlar sahifasida dastur tanlang va ariza formasini to‘ldiring.', 'На странице грантов выберите программу и заполните форму.', 'Choose a programme on the grants page and complete the form.'),
    },
    {
      q: loc(locale, 'Hisobotlar qayerda?', 'Где отчёты?', 'Where are the reports?'),
      a: loc(locale, 'Hisobotlar sahifasida yillik faoliyat va audit hujjatlari ro‘yxati bor.', 'На странице отчётов — список годовых и аудиторских документов.', 'The reports page lists annual activity and audit documents.'),
    },
    {
      q: loc(locale, 'Fondni kim boshqaradi?', 'Кто управляет фондом?', 'Who governs the fund?'),
      a: loc(locale, 'Vasiylik kengashi, Boshqaruv kengashi va Taftish komissiyasi.', 'Попечительский совет, Правление и Ревизионная комиссия.', 'The Board of Trustees, Management Board and Audit Commission.'),
    },
  ]

  return (
    <>
      <PageHero
        image="/media/about/hero.jpg"
        title="FAQ"
        lead={loc(locale, 'Tez-tez so‘raladigan savollar.', 'Частые вопросы.', 'Frequently asked questions.')}
        crumbs={[
          { href: '/', label: loc(locale, 'Bosh', 'Главная', 'Home') },
          { href: '/faq', label: 'FAQ' },
        ]}
      />
      <section className="bg-cream py-16">
        <div className="live-wrap max-w-[800px] grid gap-3">
          {items.map((item) => (
            <details key={item.q} className="bg-white rounded-[16px] px-5 py-1 shadow-[0_4px_30px_rgba(0,0,0,0.05)]">
              <summary className="cursor-pointer font-semibold py-4">{item.q}</summary>
              <p className="leading-7 pb-4 m-0">{item.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  )
}
