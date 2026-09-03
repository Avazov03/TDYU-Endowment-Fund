import Image from 'next/image'
import { brand } from '@/content/site'
import type { Locale } from '@/i18n/routing'
import { PageHero } from './PageHero'
import { DonateForm } from './DonateForm'

function loc(locale: Locale, uz: string, ru: string, en: string) {
  return locale === 'ru' ? ru : locale === 'en' ? en : uz
}

export function DonateView({ locale }: { locale: Locale }) {
  return (
    <>
      <PageHero
        image="/media/page-bnr-img18-min.jpg"
        height={413}
        title={loc(locale, 'Xayriya', 'Пожертвование', 'Donate')}
        lead={loc(
          locale,
          'TDYU Endowment Fund — bilim, grant va xalqaro imkoniyatlarga sarmoya.',
          'TDYU Endowment Fund — инвестиции в знания, гранты и международные возможности.',
          'TDYU Endowment Fund — an investment in knowledge, grants and international opportunity.',
        )}
        crumbs={[
          { href: '/', label: loc(locale, 'Bosh', 'Главная', 'Home') },
          { href: '/donate', label: loc(locale, 'Xayriya', 'Пожертвование', 'Donate') },
        ]}
      />

      <section className="bg-cream pt-[120px] pb-16">
        <div className="live-content">
          <h3 className="text-[36px] leading-[46px] font-semibold" style={{ marginBottom: 20 }}>
            {loc(locale, 'Xayriya tartibi', 'Порядок пожертвования', 'How to donate')}
          </h3>
          <p className="text-[16px] leading-7 text-body" style={{ marginBottom: 31 }}>
            {loc(
              locale,
              'Xayriya mablag‘lari shaffof hisobotlar asosida taqsimlanadi. Har bir badal ta’lim, grant, tadbir yoki infratuzilmaga yo‘naltirilishi mumkin.',
              'Благотворительные средства распределяются на основе прозрачной отчётности. Каждый взнос может быть направлен на образование, грант, мероприятие или инфраструктуру.',
              'Donations are allocated based on transparent reporting. Each gift can go to education, grants, events or infrastructure.',
            )}
          </p>
          <Image
            src="/media/e-apply-img-1-1-min.jpg"
            alt=""
            width={1280}
            height={458}
            className="w-full h-[458px] object-cover"
            unoptimized
          />
        </div>
        <div className="live-content grid gap-10 lg:grid-cols-2 items-start mt-16">
          <div>
            <p className="text-sky font-semibold tracking-[0.14em] uppercase text-sm mb-2">{loc(locale, 'Xayriya qilish', 'Пожертвовать', 'Donate')}</p>
            <h2 className="text-[clamp(1.6rem,3vw,2.2rem)] mb-4">{loc(locale, 'Xayriya va qo‘llab-quvvatlash', 'Пожертвования и поддержка', 'Donations and support')}</h2>
            <p className="leading-7 mb-6">
              {loc(
                locale,
                'Bir martalik yoki muntazam xayriya. Mablag‘ ta’lim, stipendiya va xalqaro dasturlarga yo‘naltiriladi.',
                'Разовое или регулярное пожертвование. Средства идут на образование, стипендии и международные программы.',
                'One-off or regular donations. Funds go to education, scholarships and international programmes.',
              )}
            </p>
            <div className="rounded-[16px] bg-white p-6 mb-8 shadow-[0_4px_30px_rgba(0,0,0,0.05)]">
              <h3 className="text-lg mb-2">{loc(locale, 'Bank rekvizitlari', 'Банковские реквизиты', 'Bank details')}</h3>
              <p className="text-sm leading-6 m-0">
                {loc(locale, 'Oluvchi', 'Получатель', 'Payee')}: <strong>{brand.name}</strong>
                <br />
                Email: {brand.email}
                <br />
                {brand.address[locale]}
              </p>
            </div>
            <DonateForm />
          </div>
          <div className="relative min-h-[420px]">
            <Image src="/media/donate/side.jpg" alt="" fill className="object-cover rounded-[16px]" sizes="40vw" />
          </div>
        </div>
      </section>
    </>
  )
}
