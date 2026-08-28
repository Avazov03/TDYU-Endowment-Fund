import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { brand, getContent } from '@/content/site'
import type { Locale } from '@/i18n/routing'
import { AlumniMap, GovernanceTabs, SpendBars } from './Interactive'

export async function HomeHero({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'hero' })
  const c = getContent(locale)
  return (
    <section className="tdyu-hero">
      <img
        className="tdyu-hero-bg"
        src="/media/hero-banner.jpg"
        alt=""
      />
      <div className="tdyu-hero-inner tdyu-hero-layout">
        <div className="tdyu-hero-copy">
          <span className="tdyu-play" aria-hidden />
          <span className="tdyu-eyebrow">TDYU Endowment Fund</span>
          <h1>
            {t.rich('title', {
              em: (chunks) => <em>{chunks}</em>,
            })}
          </h1>
          <div className="tdyu-hero-actions">
            <Link className="tdyu-btn tdyu-btn-cyan" href="/programs">
              {t('programsCta')}
            </Link>
          </div>
        </div>
        <div className="tdyu-hero-aside">
          <aside className="tdyu-announce">
            <h4>{t('announce')}</h4>
            <ul>
              {c.news.slice(0, 3).map((n) => (
                <li key={n.t}>
                  <strong>{n.t}</strong>
                  <span>{n.date}</span>
                  <p>{n.d}</p>
                </li>
              ))}
            </ul>
          </aside>
          <Link className="tdyu-announce-cta" href="/donate">
            {t('donateOpen')}
          </Link>
        </div>
      </div>
    </section>
  )
}

export function StatsBar({ locale }: { locale: Locale }) {
  const c = getContent(locale)
  return (
    <section className="tdyu-home-stats is-in" aria-label="TDYU Endowment stats">
      <div className="tdyu-home-stats__inner">
        {c.stats.map((s, i) => (
          <div key={s.l} className="tdyu-home-stats__item" style={{ ['--i' as string]: i }}>
            <div className="tdyu-home-stats__num">{s.n}</div>
            <div className="tdyu-home-stats__label">{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

export async function MissionBlock({ locale, full = false }: { locale: Locale; full?: boolean }) {
  const c = getContent(locale)
  const t = await getTranslations({ locale, namespace: 'common' })
  const paras = full ? c.mission.paragraphs : c.mission.paragraphs.slice(0, 2)
  return (
    <section className="tdyu-sec">
      <div className="tdyu-wrap">
        <div className="tdyu-grid-2">
          <div>
            <span className="tdyu-eyebrow">{c.mission.eyebrow}</span>
            <h2 className="tdyu-title">{c.mission.title}</h2>
            {paras.map((p) => (
              <p key={p.slice(0, 24)} className="tdyu-lead">
                {p}
              </p>
            ))}
            {!full ? (
              <Link className="tdyu-btn tdyu-btn-outline" href="/about">
                {t('more')}
              </Link>
            ) : null}
          </div>
          {!full ? (
            <div className="tdyu-about-photos">
              <img
                src="/media/about-1.jpg"
                alt=""
              />
              <img
                src="/media/about-2.jpg"
                alt=""
              />
            </div>
          ) : (
            <div className="tdyu-grid-3" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
              {c.pillars.map((p) => (
                <div className="tdyu-card" key={p.n}>
                  <div className="tdyu-num">{p.n}</div>
                  <h3 style={{ margin: '0 0 8px', fontSize: '1.05rem', color: 'var(--tdyu-title)' }}>{p.t}</h3>
                  <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55 }}>{p.d}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        {!full ? (
          <div className="tdyu-grid-3" style={{ gridTemplateColumns: 'repeat(2, 1fr)', marginTop: 36 }}>
            {c.pillars.map((p) => (
              <div className="tdyu-card" key={p.n}>
                <div className="tdyu-num">{p.n}</div>
                <h3 style={{ margin: '0 0 8px', fontSize: '1.05rem', color: 'var(--tdyu-title)' }}>{p.t}</h3>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55 }}>{p.d}</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}

export async function ProgramsBlock({ locale, limit }: { locale: Locale; limit?: number }) {
  const c = getContent(locale)
  const t = await getTranslations({ locale, namespace: 'common' })
  const list = typeof limit === 'number' ? c.programs.slice(0, limit) : c.programs
  return (
    <section className="tdyu-sec tdyu-sec-cream tdyu-sec-deco">
      <img
        className="tdyu-deco tdyu-deco-left"
        src="/media/program-left.png"
        alt=""
      />
      <img
        className="tdyu-deco tdyu-deco-right"
        src="/media/program-right.png"
        alt=""
      />
      <div className="tdyu-wrap">
        <div className="tdyu-head-row">
          <div>
            <span className="tdyu-eyebrow">{c.programsEyebrow}</span>
            <h2 className="tdyu-title">{c.programsTitle}</h2>
          </div>
          <p>{c.programsLead}</p>
        </div>
        <div className="tdyu-grid-7">
          {list.map((p) => (
            <article className="tdyu-card" key={p.n}>
              <div className="tdyu-num">{p.n}</div>
              <h3 style={{ margin: '0 0 8px', color: 'var(--tdyu-title)', fontSize: '1.1rem' }}>{p.t}</h3>
              <p style={{ margin: 0, lineHeight: 1.55 }}>{p.d}</p>
              <span className="tdyu-tag">{p.tag}</span>
            </article>
          ))}
        </div>
        {limit ? (
          <div style={{ marginTop: 28 }}>
            <Link className="tdyu-btn tdyu-btn-primary" href="/programs">
              {t('allPrograms')}
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  )
}

export async function ProjectsBlock({ locale, limit }: { locale: Locale; limit?: number }) {
  const c = getContent(locale)
  const t = await getTranslations({ locale, namespace: 'common' })
  const list = typeof limit === 'number' ? c.projects.slice(0, limit) : c.projects
  return (
    <section className="tdyu-sec">
      <div className="tdyu-wrap">
        <div className="tdyu-head-row">
          <div>
            <span className="tdyu-eyebrow">{c.projectsEyebrow}</span>
            <h2 className="tdyu-title">{c.projectsTitle}</h2>
          </div>
          <p>{c.projectsLead}</p>
        </div>
        <div className="tdyu-grid-3">
          {list.map((p) => (
            <article className="tdyu-card" key={p.t}>
              <span className="tdyu-tag">
                {p.tag} · {p.y}
              </span>
              <h3 style={{ margin: '12px 0 8px', color: 'var(--tdyu-title)' }}>{p.t}</h3>
              <p style={{ margin: 0, lineHeight: 1.55 }}>{p.d}</p>
            </article>
          ))}
        </div>
        {limit ? (
          <div style={{ marginTop: 28 }}>
            <Link className="tdyu-btn tdyu-btn-outline" href="/projects">
              {t('allProjects')}
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  )
}

export async function TransparencyBlock({ locale }: { locale: Locale }) {
  const c = getContent(locale)
  const t = await getTranslations({ locale, namespace: 'common' })
  return (
    <section className="tdyu-sec tdyu-sec-cream" id="shaffoflik">
      <div className="tdyu-wrap">
        <span className="tdyu-eyebrow">{c.spendEyebrow}</span>
        <h2 className="tdyu-title">{c.spendTitle}</h2>
        <div className="tdyu-grid-2">
          <div className="tdyu-card">
            <SpendBars items={[...c.spend]} />
          </div>
          <div>
            <h3 style={{ color: 'var(--tdyu-title)', marginTop: 0 }}>{c.sourcesTitle}</h3>
            <ul style={{ paddingLeft: 18, lineHeight: 1.8 }}>
              {c.sources.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <Link className="tdyu-btn tdyu-btn-primary" href="/reports">
              {t('reportsAudit')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export function ReportsBlock({ locale }: { locale: Locale }) {
  const c = getContent(locale)
  return (
    <section className="tdyu-sec">
      <div className="tdyu-wrap">
        <span className="tdyu-eyebrow">{c.reportsEyebrow}</span>
        <h2 className="tdyu-title">{c.reportsTitle}</h2>
        <div className="tdyu-grid-2">
          {c.reports.map((r) => (
            <article className="tdyu-card" key={r.t}>
              <h3 style={{ margin: '0 0 8px', color: 'var(--tdyu-title)' }}>{r.t}</h3>
              <p style={{ margin: '0 0 10px' }}>{r.d}</p>
              <span className="tdyu-tag">{r.date}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function GovernanceBlock({ locale }: { locale: Locale }) {
  const c = getContent(locale)
  return (
    <section className="tdyu-sec tdyu-sec-dark">
      <div className="tdyu-wrap">
        <span className="tdyu-eyebrow">{c.govEyebrow}</span>
        <h2 className="tdyu-title">{c.govTitle}</h2>
        <GovernanceTabs items={[...c.governance]} />
      </div>
    </section>
  )
}

export function AlumniMapBlock({ locale }: { locale: Locale }) {
  const c = getContent(locale)
  return (
    <section className="tdyu-sec tdyu-sec-dark" id="alumni-map">
      <div className="tdyu-wrap">
        <div className="tdyu-head-row">
          <div>
            <span className="tdyu-eyebrow">{c.alumniEyebrow}</span>
            <h2 className="tdyu-title">{c.alumniTitle}</h2>
          </div>
          <p>{c.alumniLead}</p>
        </div>
        <AlumniMap
          allLabel={c.mapAll}
          lawLabel={c.mapLaw}
          intlLabel={c.mapIntl}
          academiaLabel={c.mapAcademia}
          govtLabel={c.mapGovt}
          points={[...c.alumniPoints]}
        />
      </div>
    </section>
  )
}

export function StoriesBlock({ locale }: { locale: Locale }) {
  const c = getContent(locale)
  return (
    <section className="tdyu-sec">
      <div className="tdyu-wrap">
        <span className="tdyu-eyebrow">{c.storiesEyebrow}</span>
        <h2 className="tdyu-title">{c.storiesTitle}</h2>
        <div className="tdyu-grid-3">
          {c.stories.map((s) => (
            <blockquote className="tdyu-card" key={s.n}>
              <div className="tdyu-num">{s.i}</div>
              <p style={{ fontStyle: 'italic', lineHeight: 1.65 }}>“{s.q}”</p>
              <strong style={{ color: 'var(--tdyu-title)' }}>{s.n}</strong>
              <div style={{ fontSize: 13, marginTop: 4 }}>{s.r}</div>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}

export function GrantsCards({ locale }: { locale: Locale }) {
  const c = getContent(locale)
  return (
    <div className="tdyu-grid-3">
      {c.grants.map((g) => (
        <article className="tdyu-card" key={g.t}>
          {g.b ? <span className="tdyu-tag">{g.b}</span> : null}
          <h3 style={{ margin: '12px 0 8px', color: 'var(--tdyu-title)' }}>{g.t}</h3>
          <p>{g.d}</p>
          <ul style={{ paddingLeft: 18, margin: 0 }}>
            {g.m.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  )
}

export async function NewsBlock({ locale, limit }: { locale: Locale; limit?: number }) {
  const c = getContent(locale)
  const t = await getTranslations({ locale, namespace: 'common' })
  const list = typeof limit === 'number' ? c.news.slice(0, limit) : c.news
  return (
    <section className="tdyu-sec">
      <div className="tdyu-wrap">
        <div className="tdyu-head-row">
          <div>
            <span className="tdyu-eyebrow">{c.newsEyebrow}</span>
            <h2 className="tdyu-title">{c.newsTitle}</h2>
          </div>
          {limit ? (
            <Link className="tdyu-btn tdyu-btn-outline" href="/news">
              {t('allNews')}
            </Link>
          ) : null}
        </div>
        <div className="tdyu-grid-3">
          {list.map((n) => (
            <article className="tdyu-card" key={n.t}>
              <span className="tdyu-tag">{n.tag}</span>
              <h3 style={{ margin: '12px 0 8px', color: 'var(--tdyu-title)' }}>{n.t}</h3>
              <p>{n.d}</p>
              <div style={{ fontSize: 13, opacity: 0.7 }}>{n.date}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function SupportBlock({ locale }: { locale: Locale }) {
  const c = getContent(locale)
  return (
    <section className="tdyu-sec tdyu-sec-cream" id="yordam">
      <div className="tdyu-wrap">
        <span className="tdyu-eyebrow">{c.supportEyebrow}</span>
        <h2 className="tdyu-title">{c.supportTitle}</h2>
        <div className="tdyu-grid-4">
          {c.support.map((s) => (
            <article className="tdyu-card" key={s.t}>
              <h3 style={{ margin: '0 0 8px', color: 'var(--tdyu-title)' }}>{s.t}</h3>
              <p>{s.d}</p>
              <Link className="tdyu-btn tdyu-btn-primary" href={s.href}>
                {s.cta}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function LegalBlock({ locale }: { locale: Locale }) {
  const c = getContent(locale)
  return (
    <section className="tdyu-sec tdyu-sec-cream" id="huquqiy">
      <div className="tdyu-wrap">
        <span className="tdyu-eyebrow">{c.legalEyebrow}</span>
        <h2 className="tdyu-title">{c.legalTitle}</h2>
        <div className="tdyu-grid-3">
          {c.legal.map((l) => (
            <article className="tdyu-card" key={l.t}>
              <h3 style={{ margin: '0 0 8px', color: 'var(--tdyu-title)', fontSize: '1.05rem' }}>{l.t}</h3>
              <p style={{ margin: 0 }}>{l.d}</p>
            </article>
          ))}
        </div>
        <div className="tdyu-card" style={{ marginTop: 20 }}>
          <p style={{ margin: '0 0 6px' }}>
            <strong>{brand.name}</strong>
          </p>
          <p style={{ margin: '0 0 6px' }}>{brand.address[locale]}</p>
          <p style={{ margin: '0 0 6px' }}>
            {locale === 'ru' ? 'Регистратор' : locale === 'en' ? 'Registrar' : 'Ro‘yxatga oluvchi'}: {brand.registrar[locale]}
          </p>
          <p style={{ margin: 0 }}>
            {locale === 'ru' ? 'Связь' : locale === 'en' ? 'Contact' : 'Aloqa'}:{' '}
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
          </p>
        </div>
      </div>
    </section>
  )
}

export async function FaqBlock({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'faq' })
  const items = [
    { q: t('q1'), a: t('a1') },
    { q: t('q2'), a: t('a2') },
    { q: t('q3'), a: t('a3') },
    { q: t('q4'), a: t('a4') },
  ]
  return (
    <section className="tdyu-sec">
      <div className="tdyu-wrap">
        {items.map((item) => (
          <details className="tdyu-faq" key={item.q}>
            <summary>{item.q}</summary>
            <p>{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  )
}

export async function PrivacyBlock({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'privacy' })
  return (
    <section className="tdyu-sec">
      <div className="tdyu-wrap">
        <div className="tdyu-card">
          <p>{t('p1')}</p>
          <p>{t('p2')}</p>
          <p>{t('p3')}</p>
        </div>
      </div>
    </section>
  )
}
