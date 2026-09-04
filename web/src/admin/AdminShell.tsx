'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { api, setToken } from './api'

type NavItem = { to: string; end?: boolean; label: string; icon: string; superOnly?: boolean }

const groups: { title: string; items: NavItem[] }[] = [
  {
    title: 'Asosiy',
    items: [
      { to: '/admin', end: true, label: 'Dashboard', icon: 'dash' },
      { to: '/admin/finance', label: 'Moliya', icon: 'gift' },
    ],
  },
  {
    title: 'Inbox',
    items: [
      { to: '/admin/contacts', label: 'Murojaatlar', icon: 'mail' },
      { to: '/admin/donations', label: 'Xayriya', icon: 'gift' },
      { to: '/admin/grants', label: 'Grantlar', icon: 'award' },
    ],
  },
  {
    title: 'Sayt',
    items: [
      { to: '/admin/events', label: 'Tadbirlar', icon: 'cal' },
      { to: '/admin/news', label: 'Maqolalar', icon: 'news' },
      { to: '/admin/announcements', label: 'Yangiliklar', icon: 'news' },
      { to: '/admin/alumni', label: 'Bitiruvchilar', icon: 'users' },
      { to: '/admin/board', label: 'Kengash', icon: 'users' },
      { to: '/admin/media', label: 'Media', icon: 'image' },
      { to: '/admin/content', label: 'Sayt kontenti', icon: 'news' },
      { to: '/admin/documents', label: 'Hujjatlar', icon: 'file' },
    ],
  },
  {
    title: 'Do‘kon',
    items: [
      { to: '/admin/shop/products', label: 'Mahsulotlar', icon: 'bag' },
      { to: '/admin/shop/orders', label: 'Buyurtmalar', icon: 'bag' },
    ],
  },
  {
    title: 'Tizim',
    items: [
      { to: '/admin/staff', label: 'Adminlar', icon: 'users', superOnly: true },
      { to: '/admin/subscribers', label: 'Axborotnoma', icon: 'users' },
      { to: '/admin/settings', label: 'Sozlamalar', icon: 'gear' },
      { to: '/admin/account', label: 'Hisob / parol', icon: 'gear' },
    ],
  },
]

function Icon({ name }: { name: string }) {
  const common = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }
  switch (name) {
    case 'dash':
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <rect x="3" y="3" width="7" height="9" rx="1.5" />
          <rect x="14" y="3" width="7" height="5" rx="1.5" />
          <rect x="14" y="12" width="7" height="9" rx="1.5" />
          <rect x="3" y="16" width="7" height="5" rx="1.5" />
        </svg>
      )
    case 'mail':
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </svg>
      )
    case 'gift':
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <rect x="3" y="8" width="18" height="13" rx="2" />
          <path d="M12 8v13M3 12h18" />
        </svg>
      )
    case 'award':
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <circle cx="12" cy="9" r="5" />
          <path d="M8.5 13.5 7 21l5-3 5 3-1.5-7.5" />
        </svg>
      )
    case 'file':
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
          <path d="M14 3v5h5" />
        </svg>
      )
    case 'news':
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <path d="M4 5h12v14H4z" />
          <path d="M16 8h4v11a2 2 0 0 1-2 2H6" />
          <path d="M7 9h6M7 13h6M7 17h4" />
        </svg>
      )
    case 'users':
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <circle cx="9" cy="8" r="3.5" />
          <path d="M2.5 19a6.5 6.5 0 0 1 13 0" />
        </svg>
      )
    case 'cal':
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M8 3v4M16 3v4M3 11h18" />
        </svg>
      )
    case 'image':
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <circle cx="9" cy="10" r="1.6" />
          <path d="m21 16-5-5-8 8" />
        </svg>
      )
    case 'bag':
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <path d="M6 8h12l-1 13H7L6 8z" />
          <path d="M9 8V7a3 3 0 0 1 6 0v1" />
        </svg>
      )
    default:
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2" />
        </svg>
      )
  }
}

function isActive(pathname: string, item: NavItem) {
  if (item.end) return pathname === item.to
  return pathname === item.to || pathname.startsWith(`${item.to}/`)
}

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [q, setQ] = useState('')
  const [open, setOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const [role, setRole] = useState<string | null>(null)
  const [who, setWho] = useState('')

  useEffect(() => {
    try {
      setCollapsed(localStorage.getItem('tdyu_admin_sidebar') === '1')
    } catch {
      /* ignore */
    }
    api<{ role: string; name: string; email: string }>('/api/auth/me')
      .then((u) => {
        setRole(u.role)
        setWho(u.name || u.email)
      })
      .catch(() => setRole('admin'))
  }, [])

  function toggleCollapsed() {
    setCollapsed((v) => {
      const next = !v
      try {
        localStorage.setItem('tdyu_admin_sidebar', next ? '1' : '0')
      } catch {
        /* ignore */
      }
      return next
    })
  }

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase()
    const superUser = role === 'super'
    return groups
      .map((g) => ({
        ...g,
        items: g.items.filter((i) => {
          if (i.superOnly && !superUser) return false
          if (!needle) return true
          return i.label.toLowerCase().includes(needle)
        }),
      }))
      .filter((g) => g.items.length)
  }, [q, role])

  const current = useMemo(() => {
    const flat = groups.flatMap((g) => g.items.map((i) => ({ ...i, group: g.title })))
    return flat.find((i) => isActive(pathname, i))
  }, [pathname])

  return (
    <div className={`admin-shell${collapsed ? ' is-collapsed' : ''}`}>
      <button type="button" className="admin-menu-btn" onClick={() => setOpen((v) => !v)}>
        {open ? 'Yopish' : 'Menyu'}
      </button>
      <aside className={`admin-side${open ? ' is-open' : ''}${collapsed ? ' is-collapsed' : ''}`}>
        <div className="side-brand-row">
          <Link className="admin-brand" href="/admin" onClick={() => setOpen(false)}>
            <img src="/brand/endowment-seal.png" alt="" />
            <div className="brand-text">
              <strong>TDYU Endowment</strong>
              <span>{role === 'super' ? 'Super admin' : 'Boshqaruv paneli'}</span>
            </div>
          </Link>
          <button
            type="button"
            className="side-collapse"
            onClick={toggleCollapsed}
            aria-label={collapsed ? 'Menyuni kengaytirish' : 'Menyuni yig‘ish'}
            title={collapsed ? 'Kengaytirish' : 'Yig‘ish'}
          >
            {collapsed ? '›' : '‹'}
          </button>
        </div>

        <input
          className="nav-search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Bo‘lim qidirish…"
          aria-label="Bo‘lim qidirish"
        />

        {filtered.map((g) => (
          <div key={g.title}>
            <div className="nav-section">{g.title}</div>
            <nav className="admin-nav">
              {g.items.map((l) => (
                <Link
                  key={l.to}
                  href={l.to}
                  className={isActive(pathname, l) ? 'active' : ''}
                  onClick={() => setOpen(false)}
                  title={l.label}
                >
                  <Icon name={l.icon} />
                  <span>{l.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        ))}

        <div className="spacer" />
        <div className="side-footer">
          {who ? <div className="side-who">{who}</div> : null}
          <a className="side-link" href="/uz" target="_blank" rel="noreferrer">
            Public saytni ochish ↗
          </a>
          <button
            type="button"
            className="btn"
            onClick={() => {
              setToken(null)
              router.push('/admin/login')
            }}
          >
            Chiqish
          </button>
        </div>
      </aside>
      <main className="admin-main">
        <header className="admin-headbar">
          <div className="crumb">
            <span>Admin</span>
            {current ? (
              <>
                <span aria-hidden>/</span>
                <strong>{current.label}</strong>
              </>
            ) : null}
          </div>
          <time dateTime={new Date().toISOString()}>
            {new Date().toLocaleDateString('uz-UZ', { day: 'numeric', month: 'short', year: 'numeric' })}
          </time>
        </header>
        {children}
      </main>
    </div>
  )
}
