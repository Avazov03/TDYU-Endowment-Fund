'use client'

import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { brand } from '@/content/site'
import type { Locale } from '@/i18n/routing'

export function SiteFooter({ locale }: { locale: Locale }) {
  const copy =
    locale === 'ru'
      ? {
          email: 'Электронная почта',
          phone: 'Телефон',
          address: 'Адрес',
          links: 'Полезные ссылки',
          news: 'Рассылка',
          agree: 'Я согласен:',
          privacy: 'Политика конфиденциальности.',
          mission: 'Миссия',
          help: 'Помощь',
        }
      : locale === 'en'
        ? {
            email: 'Email',
            phone: 'Phone',
            address: 'Address',
            links: 'Useful links',
            news: 'Newsletter',
            agree: 'I agree:',
            privacy: 'Privacy policy.',
            mission: 'Mission',
            help: 'Help',
          }
        : {
            email: 'Elektron pochta',
            phone: 'Telefon',
            address: 'Manzil',
            links: 'Foydali havolalar',
            news: 'Axborotnoma',
            agree: 'Men roziman:',
            privacy: 'Maxfiylik siyosati.',
            mission: 'Missiya',
            help: 'Yordam',
          }

  return (
    <footer className="bg-tdyu text-white/85 pt-14">
      <div className="live-wrap grid gap-10 pb-10 md:grid-cols-4">
        <div>
          <Image src="/brand/tdyu-logo-white.svg" alt={brand.name} width={180} height={44} className="h-11 w-auto mb-4" unoptimized />
          <p className="text-sm">{copy.email}:</p>
          <a className="text-sky" href={`mailto:${brand.email}`}>
            {brand.email}
          </a>
          <p className="mt-3 text-sm">{copy.phone}:</p>
          <a className="text-sky" href="tel:+998712336636">
            +998 71 233-66-36
          </a>
          <p className="mt-4 text-sm font-semibold text-white">{locale === 'en' ? 'Social' : locale === 'ru' ? 'Соцсети' : 'Ijtimoiy tarmoqlar'}</p>
        </div>
        <div>
          <h4 className="!text-white mb-3">{copy.address}</h4>
          <div className="grid gap-2 text-sm">
            <Link href="/about">{copy.mission}</Link>
            <Link href="/alumni">Alumni</Link>
          </div>
        </div>
        <div>
          <h4 className="!text-white mb-3">{copy.links}</h4>
          <div className="grid gap-2 text-sm">
            <Link href="/support">{copy.help}</Link>
            <Link href="/donate">{locale === 'en' ? 'Donate' : locale === 'ru' ? 'Пожертвовать' : 'Xayriya'}</Link>
          </div>
        </div>
        <div>
          <h4 className="!text-white mb-3">{copy.news}</h4>
          <form className="grid gap-3" onSubmit={(e) => e.preventDefault()}>
            <input className="rounded-xl px-3 py-2 text-ink" placeholder={copy.email} />
            <label className="text-xs flex gap-2 items-start">
              <input type="checkbox" className="mt-1" />
              <span>
                {copy.agree}{' '}
                <Link href="/privacy" className="text-sky">
                  {copy.privacy}
                </Link>
              </span>
            </label>
            <button type="button" className="rounded-[30px] bg-sky text-white font-semibold py-2">
              {locale === 'en' ? 'Send' : locale === 'ru' ? 'Отправить' : 'Yuborish'}
            </button>
          </form>
        </div>
      </div>
      <div className="border-t border-white/15 text-center text-sm text-white/55 py-4">© {new Date().getFullYear()} TDYU. Dizayn: RSTheme.</div>
    </footer>
  )
}
