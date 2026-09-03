import Image from 'next/image'
import type { Locale } from '@/i18n/routing'
import { PageHero } from './PageHero'
import { loc } from './loc'
import { GovernanceQuote, GovernanceTabs } from './GovernanceTabs'

export function GovernanceView({ locale }: { locale: Locale }) {
  return (
    <>
      <PageHero
        image="/media/dump/page-bnr-img1-1-min.jpg"
        title={loc(locale, 'Boshqaruv', 'Управление', 'Governance')}
        lead={loc(
          locale,
          'Huquqiy ta’limning kelajagiga sarmoya. Kollegial boshqaruv va shaffoflik.',
          'Инвестиции в будущее юридического образования. Коллегиальное управление и прозрачность.',
          'Investment in the future of legal education. Collegial governance and transparency.',
        )}
        crumbs={[
          { href: '/', label: loc(locale, 'Bosh', 'Главная', 'Home') },
          { href: '/governance', label: loc(locale, 'Boshqaruv', 'Управление', 'Governance') },
        ]}
      />

      <section className="gov-intro">
        <div className="gov-intro-inner">
          <aside className="gov-intro-side">
            <div className="gov-profile-card">
              <div className="gov-profile-photo">
                <Image
                  src="/media/dump/founder-img1-min.png"
                  alt="N. Salayev"
                  width={276}
                  height={298}
                  className="object-cover w-full h-full"
                  unoptimized
                />
              </div>
              <h2 className="gov-profile-name">N. Salayev</h2>
              <p className="gov-profile-role">
                {loc(locale, 'Boshqaruv kengashi raisi', 'Председатель правления', 'Chair of the Executive Board')}
              </p>
            </div>
          </aside>

          <div className="gov-intro-main">
            <h2 className="gov-intro-title">{loc(locale, 'Boshqaruv', 'Управление', 'Governance')}</h2>
            <p className="gov-intro-text">
              {loc(
                locale,
                'Fond uchta organ orqali boshqariladi: Vasiylik kengashi (oliy qarorlar), Boshqaruv kengashi (joriy faoliyat) va Taftish komissiyasi (moliyaviy nazorat). Maqsad — shaffoflik, kollegiallik va samaradorlik.',
                'Фонд управляется через три органа: Попечительский совет (высшие решения), Правление (текущая деятельность) и Ревизионная комиссия (финансовый контроль). Цель — прозрачность, коллегиальность и эффективность.',
                'The fund is governed through three bodies: the Board of Trustees (highest decisions), the Executive Board (day-to-day work) and the Audit Commission (financial oversight). The aim is transparency, collegiality and effectiveness.',
              )}
            </p>

            <GovernanceQuote locale={locale} />

            <p className="gov-intro-foot">
              {loc(
                locale,
                'Vasiylik kengashi — oliy organ; Boshqaruv kengashi — joriy ishlar; Taftish komissiyasi — moliyaviy nazorat.',
                'Попечительский совет — высший орган; Правление — текущая работа; Ревизионная комиссия — финансовый контроль.',
                'Board of Trustees — highest body; Executive Board — day-to-day work; Audit Commission — financial oversight.',
              )}
            </p>
            <p className="gov-intro-thanks">
              {loc(
                locale,
                'Saytimizga tashrif buyurganingiz uchun rahmat. Birgalikda huquqiy ta’lim kelajagiga sarmoya qilamiz.',
                'Спасибо за визит на наш сайт. Вместе инвестируем в будущее юридического образования.',
                'Thank you for visiting our site. Together we invest in the future of legal education.',
              )}
            </p>
          </div>
        </div>
      </section>

      <section className="gov-organs">
        <div className="live-wrap">
          <div className="gov-organs-head">
            <h2 className="gov-organs-title">
              {loc(locale, 'Vasiylik · Boshqaruv · Taftish', 'Попечительство · Правление · Ревизия', 'Trustees · Board · Audit')}
            </h2>
            <p className="gov-organs-lead">
              {loc(
                locale,
                'Uchta organ — bir maqsad: shaffof va samarali fond.',
                'Три органа — одна цель: прозрачный и эффективный фонд.',
                'Three bodies — one goal: a transparent and effective fund.',
              )}
            </p>
          </div>
          <GovernanceTabs locale={locale} />
        </div>
      </section>
    </>
  )
}
