import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { BOARD_DETAIL } from '@/content/board'
import { PageHero } from './PageHero'
import { loc } from './loc'

/** Dump all-faculty-members (page-id 7604) — e-bl-team order. */
export const BOARD_MEMBERS = {
  uz: [
    { id: 'vasiylik-kengashi', img: '/media/board/e-bl-team-6-min.jpg', t: 'Vasiylik kengashi', r: 'Mentor' },
    { id: 'boshqaruv-kengashi', img: '/media/board/e-bl-team-5-min.jpg', t: 'Boshqaruv kengashi', r: 'Maslahatchi' },
    { id: 'taftish-komissiyasi', img: '/media/board/e-bl-team-4-min.jpg', t: 'Taftish komissiyasi', r: 'Yordamchi' },
    { id: 'vasiylik-azosi', img: '/media/board/e-bl-team-3-min.jpg', t: 'Vasiylik a’zosi', r: 'Maslahatchi' },
    { id: 'boshqaruv-azosi', img: '/media/board/e-bl-team-2-min.jpg', t: 'Boshqaruv a’zosi', r: 'Tadqiqotchi' },
    { id: 'taftish-azosi', img: '/media/board/e-bl-team-1-min.jpg', t: 'Taftish a’zosi', r: 'Yordamchi o‘qituvchi' },
  ],
  ru: [
    { id: 'vasiylik-kengashi', img: '/media/board/e-bl-team-6-min.jpg', t: 'Попечительский совет', r: 'Наставник' },
    { id: 'boshqaruv-kengashi', img: '/media/board/e-bl-team-5-min.jpg', t: 'Правление', r: 'Советник' },
    { id: 'taftish-komissiyasi', img: '/media/board/e-bl-team-4-min.jpg', t: 'Ревизионная комиссия', r: 'Помощник' },
    { id: 'vasiylik-azosi', img: '/media/board/e-bl-team-3-min.jpg', t: 'Член попечительского совета', r: 'Советник' },
    { id: 'boshqaruv-azosi', img: '/media/board/e-bl-team-2-min.jpg', t: 'Член правления', r: 'Исследователь' },
    { id: 'taftish-azosi', img: '/media/board/e-bl-team-1-min.jpg', t: 'Член ревизионной комиссии', r: 'Помощник преподавателя' },
  ],
  en: [
    { id: 'vasiylik-kengashi', img: '/media/board/e-bl-team-6-min.jpg', t: 'Board of Trustees', r: 'Mentor' },
    { id: 'boshqaruv-kengashi', img: '/media/board/e-bl-team-5-min.jpg', t: 'Management Board', r: 'Adviser' },
    { id: 'taftish-komissiyasi', img: '/media/board/e-bl-team-4-min.jpg', t: 'Audit Commission', r: 'Assistant' },
    { id: 'vasiylik-azosi', img: '/media/board/e-bl-team-3-min.jpg', t: 'Trustee member', r: 'Adviser' },
    { id: 'boshqaruv-azosi', img: '/media/board/e-bl-team-2-min.jpg', t: 'Board member', r: 'Researcher' },
    { id: 'taftish-azosi', img: '/media/board/e-bl-team-1-min.jpg', t: 'Audit member', r: 'Teaching assistant' },
  ],
} as const

const SOCIAL = [
  { label: 'Facebook', icon: 'M14 8h-4v3h3v3h-3v8h-4v-8H6v-3h1V7a4 4 0 0 1 4-4h3v4h-3a1 1 0 0 0-1 1v1h4l-.5 3z' },
  { label: 'X', icon: 'M17.5 3h3.1l-6.8 7.8L21 21h-6.3l-4.9-6.4L4.2 21H1.1l7.3-8.4L3 3h6.5l4.4 5.8L17.5 3zm-1.1 16h1.7L7.9 5H6.1l10.3 14z' },
  { label: 'Instagram', icon: 'M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm5 4a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.9a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2z' },
  { label: 'LinkedIn', icon: 'M6.5 8.5h3V21h-3V8.5zM8 3a1.75 1.75 0 1 1 0 3.5A1.75 1.75 0 0 1 8 3zm4.5 5.5h2.9v2h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.6V21h-3v-5.6c0-1.34-.02-3.06-1.86-3.06-1.86 0-2.14 1.45-2.14 2.95V21h-3V8.5z' },
] as const

function ShareIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z" />
    </svg>
  )
}

export function BoardMemberCard({
  member,
  href,
}: {
  member: { id: string; img: string; t: string; r: string }
  href: string
}) {
  return (
    <article id={member.id} className="team-faculty-member h-full scroll-mt-28">
      <div className="team-faculty-photo-wrap">
        <Link href={href} className="team-faculty-photo">
          <Image
            src={member.img}
            alt=""
            width={768}
            height={850}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            unoptimized
          />
        </Link>
        <div className="team-faculty-social">
          <span className="team-faculty-social-icon team-faculty-social-share" aria-hidden>
            <ShareIcon />
          </span>
          {SOCIAL.map((s) => (
            <Link
              key={s.label}
              href="/contact"
              aria-label={s.label}
              className="team-faculty-social-icon"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d={s.icon} />
              </svg>
            </Link>
          ))}
        </div>
      </div>
      <div className="team-faculty-content">
        <h3 className="team-faculty-name">
          <Link href={href}>{member.t}</Link>
        </h3>
        <span className="team-faculty-designation">{member.r}</span>
      </div>
    </article>
  )
}

export function BoardView({ locale }: { locale: Locale }) {
  const members = BOARD_MEMBERS[locale]

  return (
    <>
      <PageHero
        image="/media/page-bnr-img1-1-min.jpg"
        title={loc(locale, 'Boshqaruv', 'Управление', 'Governance')}
        lead={loc(
          locale,
          'TDYU Endowment Fund — bilim, grant va xalqaro imkoniyatlarga sarmoya.',
          'TDYU Endowment Fund — инвестиции в знания, гранты и международные возможности.',
          'TDYU Endowment Fund — an investment in knowledge, grants and international opportunity.',
        )}
        crumbs={[
          { href: '/', label: loc(locale, 'Bosh', 'Главная', 'Home') },
          { href: '/board', label: loc(locale, 'Boshqaruv', 'Управление', 'Governance') },
        ]}
      />

      <section className="board-members-section">
        <div className="live-wrap">
          <div className="board-members-grid">
            {members.map((m) => {
              const detail = BOARD_DETAIL.find((d) => d.id === m.id)
              return <BoardMemberCard key={m.id} member={m} href={detail ? `/board/${detail.slug}` : `/board#${m.id}`} />
            })}
          </div>
        </div>
      </section>
    </>
  )
}
