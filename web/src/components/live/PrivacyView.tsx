import { BrandLogo } from './BrandLogo'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { loc } from './loc'

export function PrivacyView({ locale }: { locale: Locale }) {
  return (
    <div
      className="live-root min-h-screen font-[Maitree,Bitter,Georgia,serif] text-tdyu"
      style={{ backgroundImage: 'linear-gradient(180deg, #f6f4ee 0%, #eef6f8 100%)' }}
    >
      <div className="mx-auto max-w-[760px] px-5 pt-10 pb-20">
        <Link href="/" className="inline-flex mb-7 no-underline text-inherit">
          <BrandLogo variant="footer" locale={locale === 'ru' || locale === 'en' ? locale : 'uz'} />
        </Link>

        <h1 className="!font-[Maitree,Bitter,Georgia,serif] !text-tdyu !font-bold text-[32px] leading-[51.2px] mb-3">
          {loc(locale, 'Maxfiylik siyosati', 'Политика конфиденциальности', 'Privacy policy')}
        </h1>
        <p className="text-[16px] leading-[25.6px] text-[#244a58] m-0 mb-0">
          {loc(
            locale,
            'Ushbu siyosat TDYU Endowment Fund veb-sayti orqali yuborilgan shaxsiy ma’lumotlarning qanday ishlatilishini tushuntiradi.',
            'Настоящая политика объясняет, как используются персональные данные, отправленные через сайт TDYU Endowment Fund.',
            'This policy explains how personal data submitted through the TDYU Endowment Fund website is used.',
          )}
        </p>

        <h2 className="!font-[Maitree,Bitter,Georgia,serif] !text-tdyu !font-bold text-[18.4px] leading-[29.44px] mt-7 mb-2">
          {loc(locale, 'Qanday ma’lumotlar yig‘iladi', 'Какие данные собираются', 'What data is collected')}
        </h2>
        <ul className="m-0 pl-10 text-[16px] leading-[25.6px] text-[#244a58]">
          <li>
            {loc(
              locale,
              'Ism, familiya, email, telefon va murojaat matni',
              'Имя, фамилия, email, телефон и текст обращения',
              'Name, email, phone and message text',
            )}
          </li>
          <li>
            {loc(
              locale,
              'Xayriya yoki grant arizasiga oid qo‘shimcha ma’lumotlar',
              'Дополнительные сведения по заявке на пожертвование или грант',
              'Extra details for a donation or grant application',
            )}
          </li>
          <li>
            {loc(
              locale,
              'Axborotnomaga obuna bo‘lish uchun email',
              'Email для подписки на рассылку',
              'Email for newsletter subscription',
            )}
          </li>
        </ul>

        <h2 className="!font-[Maitree,Bitter,Georgia,serif] !text-tdyu !font-bold text-[18.4px] leading-[29.44px] mt-7 mb-2">
          {loc(locale, 'Maqsad', 'Цель', 'Purpose')}
        </h2>
        <p className="text-[16px] leading-[25.6px] text-[#244a58] m-0">
          {loc(
            locale,
            'Ma’lumotlar faqat fond faoliyati doirasida: murojaatlarga javob berish, xayriya/grant jarayonini yuritish va axborotnoma yuborish uchun ishlatiladi.',
            'Данные используются только в рамках деятельности фонда: ответы на обращения, обработка пожертвований и грантов, а также рассылка новостей.',
            'Data is used only for fund operations: answering requests, running donations and grants, and sending newsletters.',
          )}
        </p>

        <h2 className="!font-[Maitree,Bitter,Georgia,serif] !text-tdyu !font-bold text-[18.4px] leading-[29.44px] mt-7 mb-2">
          {loc(locale, 'Uchinchi tomon', 'Третьи стороны', 'Third parties')}
        </h2>
        <p className="text-[16px] leading-[25.6px] text-[#244a58] m-0">
          {loc(
            locale,
            'Ma’lumotlar uchinchi tomonga sotilmaydi. Qonun talab qilgan hollarda yoki xizmat ko‘rsatuvchi hamkorlarga (masalan, email xizmati) cheklangan holda uzatilishi mumkin.',
            'Данные не продаются третьим лицам. Они могут передаваться в ограниченном объёме, если этого требует закон, или сервисным партнёрам (например, почтовому провайдеру).',
            'Data is not sold to third parties. It may be shared in a limited way when required by law or with a service partner (for example an email provider).',
          )}
        </p>

        <h2 className="!font-[Maitree,Bitter,Georgia,serif] !text-tdyu !font-bold text-[18.4px] leading-[29.44px] mt-7 mb-2">
          {loc(locale, 'Aloqa', 'Контакты', 'Contact')}
        </h2>
        <p className="text-[16px] leading-[25.6px] text-[#244a58] m-0">
          {loc(locale, 'Savollar uchun: ', 'По вопросам: ', 'Questions: ')}
          <a href="mailto:info@tdyu-endowment.uz" className="text-tdyu">
            info@tdyu-endowment.uz
          </a>
        </p>

        <Link href="/" className="inline-block mt-7 font-semibold text-sky">
          {loc(locale, '← Bosh sahifa', '← Главная', '← Home')}
        </Link>
      </div>
    </div>
  )
}
