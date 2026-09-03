import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { ALUMNI_PEOPLE, localizeAlumni } from '@/content/alumni'
import { EVENTS as ALL_EVENTS, localizeEvent } from '@/content/events'
import { NEWS_POSTS, localizePost } from '@/content/news'
import { PageHero } from './PageHero'
import { loc } from './loc'

const INTRO_IMG = '/media/alumni/alamni-single-thumb-1.jpg'

const STORY_ROWS = [
  {
    title: 'TDYU talabalari hikoyalari',
    titleRu: 'Истории студентов ТГЮУ',
    titleEn: 'Stories of TDYU students',
    lead: 'Talabalar qiyinchiliklarni yengib, amaliy ta’lim va grantlar orqali o‘z yo‘lini topadi. Bu hikoyalar jamiyatimiz ruhini aks ettiradi.',
    leadRu:
      'Студенты преодолевают трудности и находят свой путь благодаря практическому обучению и грантам. Эти истории отражают дух нашего сообщества.',
    leadEn:
      'Students overcome challenges and find their path through hands-on learning and grants. These stories reflect the spirit of our community.',
    img: '/media/alumni/alamni-single-thumb-2.jpg',
  },
  {
    title: 'Alumni muvaffaqiyat tarixlari',
    titleRu: 'Истории успеха выпускников',
    titleEn: 'Alumni success stories',
    lead: 'Bitiruvchilar dunyo bo‘ylab innovatsiya, tadqiqot va yetakchilikda namuna ko‘rsatadi — fond tarmog‘i ularni bog‘lab turadi.',
    leadRu:
      'Выпускники задают тон в инновациях, исследованиях и лидерстве по всему миру — сеть фонда поддерживает эту связь.',
    leadEn:
      'Alumni lead in innovation, research and leadership worldwide — the fund’s network keeps them connected.',
    img: '/media/alumni/alamni-single-thumb-3.jpg',
  },
] as const

const STORY_BULLETS = {
  uz: [
    'O‘rta yoki oliy ma’lumot to‘g‘risida hujjat.',
    'Akademik ko‘rsatkichlar — dastur shartlariga muvofiq.',
    'Magistratura/malaka oshirish: tegishli bakalavr diplomi.',
    'Motivatsiya xati va tavsiyanoma (zarur bo‘lsa).',
  ],
  ru: [
    'Документ о среднем или высшем образовании.',
    'Академические показатели — по условиям программы.',
    'Магистратура / повышение квалификации: соответствующий диплом бакалавра.',
    'Мотивационное письмо и рекомендация (при необходимости).',
  ],
  en: [
    'Proof of secondary or higher education.',
    'Academic results that meet programme requirements.',
    'For graduate / CPD tracks: a relevant bachelor’s degree.',
    'Motivation letter and reference (if required).',
  ],
} as const

const GALLERY = [
  '/media/alumni/e-sports-img1-min.jpg',
  '/media/alumni/e-sports-img2-min.jpg',
  '/media/alumni/e-sports-img3-min.jpg',
  '/media/alumni/e-sports-img4-min.jpg',
  '/media/alumni/e-sports-img5-min.jpg',
  '/media/alumni/e-sports-img6-min.jpg',
] as const

const HOME_EVENTS = ALL_EVENTS.slice(0, 4)
const HOME_NEWS = NEWS_POSTS.slice(0, 4)

function CalIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M16 3v4M8 3v4M3 11h18" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  )
}

function PinIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M12 21s7-5.3 7-11a7 7 0 1 0-14 0c0 5.7 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  )
}

function DotsIcon() {
  return (
    <svg width="14" height="12" viewBox="0 0 18 15" fill="currentColor" aria-hidden>
      <path d="M10.5 7.5C10.5 8.32843 9.82843 9 9 9C8.17157 9 7.5 8.32843 7.5 7.5C7.5 6.67157 8.17157 6 9 6C9.82843 6 10.5 6.67157 10.5 7.5Z" />
      <path d="M18 7.5C18 8.32843 17.3284 9 16.5 9C15.6716 9 15 8.32843 15 7.5C15 6.67157 15.6716 6 16.5 6C17.3284 6 18 6.67157 18 7.5Z" />
      <path d="M3 7.5C3 8.32843 2.32843 9 1.5 9C0.671573 9 0 8.32843 0 7.5C0 6.67157 0.671573 6 1.5 6C2.32843 6 3 6.67157 3 7.5Z" />
    </svg>
  )
}

function EyebrowIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M5.2 12.9v3.8s3.6-1.5 6.8-1.5 6.8 1.5 6.8 1.5v-3.8s-3.4-1.8-6.9-1.8-6.7 1.8-6.7 1.8Z" />
      <path d="M22.6 12 24 11.3l-1.4-.8V10s.4-1.9-1.8-.9l-.2.2L11.7 4.5 0 11.2l4.4 2v-.7s3.7-2.1 7.5-2.1 7.6 2 7.6 2v1.1l2.5-1.3V17.6h-.8v1.9l1.1-.7 1.2.7v-1.9h-.9V12Z" />
    </svg>
  )
}

export function AlumniView({ locale }: { locale: Locale }) {
  const bullets = STORY_BULLETS[locale]
  const viewProfile = loc(locale, 'Profilni ko‘rish', 'Смотреть профиль', 'View profile')

  return (
    <>
      <PageHero
        image="/media/alumni/page-bnr-img25-min.jpg"
        objectPosition="center right"
        deco="/media/alumni/bnr-arrow-1-1.png"
        title="Alumni"
        lead={loc(
          locale,
          'TDYU Endowment Fund — bilim, grant va xalqaro imkoniyatlarga sarmoya.',
          'TDYU Endowment Fund — инвестиции в знания, гранты и международные возможности.',
          'TDYU Endowment Fund — investing in knowledge, grants and international opportunity.',
        )}
        crumbs={[
          { href: '/', label: loc(locale, 'Bosh', 'Главная', 'Home') },
          { href: '/alumni', label: loc(locale, 'Barcha alumni', 'Все alumni', 'All alumni') },
        ]}
      />

      <section className="ap-shell">
        <div className="ap-inner">
          {/* Intro */}
          <header className="ap-block">
            <h2 className="ap-h">
              {loc(locale, 'Alumni jamiyati', 'Сообщество Alumni', 'Alumni community')}
            </h2>
            <p className="ap-lead">
              {loc(
                locale,
                'Bitiruvchilar fond merosining muhim qismi. Tadbirlar, imkoniyatlar va umrbod aloqa orqali ular birgalikda TDYU brendini mustahkamlaydi.',
                'Выпускники — важная часть наследия фонда. Через мероприятия, возможности и пожизненную связь они укрепляют бренд ТГЮУ.',
                'Alumni are a vital part of the fund’s legacy. Through events, opportunities and lifelong connection they strengthen the TSUL brand.',
              )}
            </p>
            <div className="ap-intro-img">
              <Image src={INTRO_IMG} alt="" width={1200} height={620} className="ap-round-img" unoptimized />
            </div>
          </header>

          {/* Unveiling */}
          <header className="ap-block ap-block--tight">
            <h2 className="ap-h">
              {loc(locale, 'TDYU: ilhomlantiruvchi hikoyalar', 'ТГЮУ: вдохновляющие истории', 'TDYU: inspiring stories')}
            </h2>
            <p className="ap-lead">
              {loc(
                locale,
                'Haqiqiy talaba va bitiruvchi yo‘llari — orzu, mehnat va innovatsiya. Bu hikoyalar TDYUning yetakchilarni tarbiyalash ruhini ko‘rsatadi.',
                'Реальные пути студентов и выпускников — мечта, труд и инновации. Эти истории показывают дух ТГЮУ в воспитании лидеров.',
                'Real student and alumni journeys — ambition, hard work and innovation. These stories show TDYU’s spirit of growing leaders.',
              )}
            </p>
          </header>

          <div className="ap-stories">
            {STORY_ROWS.map((row) => (
              <div key={row.title} className="ap-story-row">
                <div className="ap-story-card">
                  <div className="ap-story-head">{loc(locale, row.title, row.titleRu, row.titleEn)}</div>
                  <div className="ap-story-body">
                    <p className="ap-story-italic">{loc(locale, row.lead, row.leadRu, row.leadEn)}</p>
                    <ul className="ap-story-list">
                      {bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="ap-story-media">
                  <Image src={row.img} alt="" fill className="object-cover" sizes="(max-width:767px) 100vw, 50vw" unoptimized />
                </div>
              </div>
            ))}
          </div>

          {/* People */}
          <header className="ap-block">
            <h2 className="ap-h">{loc(locale, 'Dunyo bo‘ylab bitiruvchilar', 'Выпускники по всему миру', 'Graduates around the world')}</h2>
            <p className="ap-lead">
              {loc(
                locale,
                'Farqli sohalardagi bitiruvchilar innovatsiya va tadqiqotda yetakchilik qiladi — ularning muvaffaqiyati keyingi avlodni ilhomlantiradi.',
                'Выпускники в разных отраслях ведут инновации и исследования — их успех вдохновляет следующее поколение.',
                'Alumni across industries lead in innovation and research — their success inspires the next generation.',
              )}
            </p>
          </header>

          <div className="ap-people">
            {ALUMNI_PEOPLE.map((p) => {
              const L = localizeAlumni(p, locale)
              const href = `/alumni/${p.slug}`
              return (
                <article key={p.slug} className="ap-person">
                  <Link href={href} className="ap-person-thumb">
                    <Image src={p.img} alt="" fill className="object-cover object-top" sizes="(max-width:767px) 100vw, 33vw" unoptimized />
                  </Link>
                  <div className="ap-person-body">
                    <h3 className="ap-person-name">
                      <Link href={href}>{L.name}</Link>
                    </h3>
                    <p className="ap-person-role">{L.role}</p>
                    <p className="ap-person-bio">{L.about.slice(0, 120)}…</p>
                    <Link href={href} className="ap-profile-btn">
                      {viewProfile}
                      <DotsIcon />
                    </Link>
                  </div>
                </article>
              )
            })}
          </div>

          {/* Events */}
          <div className="ap-events-head">
            <div>
              <p className="ap-eyebrow">
                <EyebrowIcon />
                {loc(locale, 'Yaqinlashayotgan tadbirlar', 'Ближайшие события', 'Upcoming events')}
              </p>
              <h2 className="ap-h ap-h--flush">{loc(locale, 'Fond tadbirlari', 'События фонда', 'Fund events')}</h2>
            </div>
            <Link href="/events" className="ap-events-cta">
              {loc(locale, 'Barcha tadbirlar', 'Все события', 'All events')}
              <span aria-hidden>→</span>
            </Link>
          </div>

          <div className="ap-events-grid">
            {HOME_EVENTS.map((ev) => {
              const L = localizeEvent(ev, locale)
              const href = `/events/${ev.slug}`
              return (
                <article key={ev.slug} className="ap-event">
                  <Link href={href} className="ap-event-thumb">
                    <Image src={ev.img} alt="" fill className="object-cover" sizes="220px" unoptimized />
                  </Link>
                  <div className="ap-event-body">
                    <p className="ap-event-meta">
                      <span>
                        <CalIcon /> {L.date}
                      </span>
                      <span>
                        <ClockIcon /> {L.time}
                      </span>
                    </p>
                    <h3 className="ap-event-title">
                      <Link href={href}>{L.title}</Link>
                    </h3>
                    <p className="ap-event-loc">
                      <PinIcon />
                      {L.loc}
                    </p>
                  </div>
                </article>
              )
            })}
          </div>

          {/* Gallery */}
          <header className="ap-block ap-block--center">
            <h2 className="ap-h">{loc(locale, 'Alumni foto galereya', 'Фотогалерея Alumni', 'Alumni photo gallery')}</h2>
            <p className="ap-lead ap-lead--center">
              {loc(
                locale,
                'Tadbirlar, bitirish marosimlari va jamiyat lahzalaridan tanlangan suratlar.',
                'Избранные фото с мероприятий, вручений дипломов и встреч сообщества.',
                'Selected photos from events, graduations and community moments.',
              )}
            </p>
          </header>
          <div className="ap-gallery">
            {GALLERY.map((src) => (
              <div key={src} className="ap-gallery-item">
                <Image src={src} alt="" fill className="object-cover" sizes="(max-width:767px) 50vw, 33vw" unoptimized />
              </div>
            ))}
          </div>

          {/* News */}
          <div className="ap-news-head">
            <div>
              <p className="ap-eyebrow ap-eyebrow--caps">
                <span className="ap-eyebrow-mark" aria-hidden />
                {loc(locale, 'ALUMNI YANGILIKLARI', 'НОВОСТИ ALUMNI', 'ALUMNI NEWS')}
              </p>
              <h2 className="ap-h ap-h--flush">{loc(locale, 'Fond yangiliklari', 'Новости фонда', 'Fund news')}</h2>
            </div>
            <Link href="/news" className="ap-news-cta">
              {loc(locale, 'Barcha yangiliklar', 'Все новости', 'View all news')}
              <DotsIcon />
            </Link>
          </div>

          <div className="ap-news-grid">
            {HOME_NEWS.map((n) => {
              const L = localizePost(n, locale)
              const href = `/news/${n.slug}`
              return (
                <article key={n.slug} className="ap-news">
                  <Link href={href} className="ap-news-thumb">
                    <Image src={n.img} alt="" fill className="object-cover" sizes="220px" unoptimized />
                  </Link>
                  <div className="ap-news-body">
                    <p className="ap-news-meta">
                      <span>{L.tag}</span>
                      <span>{L.date}</span>
                    </p>
                    <h3 className="ap-news-title">
                      <Link href={href}>{L.title}</Link>
                    </h3>
                    <p className="ap-news-brand">
                      <span className="ap-eyebrow-mark" aria-hidden />
                      TDYU Endowment
                    </p>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
