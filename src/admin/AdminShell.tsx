import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { setToken } from './api'

const inbox = [
  { to: '/admin', end: true, label: 'Dashboard', icon: 'dash' },
  { to: '/admin/contacts', label: 'Murojaatlar', icon: 'mail' },
  { to: '/admin/donations', label: 'Xayriya', icon: 'gift' },
  { to: '/admin/grants', label: 'Grantlar', icon: 'award' },
]

const content = [
  { to: '/admin/content', label: 'Sayt kontenti', icon: 'news' },
  { to: '/admin/announcements', label: 'Yangiliklar', icon: 'news' },
  { to: '/admin/documents', label: 'Hujjatlar', icon: 'file' },
  { to: '/admin/subscribers', label: 'Axborotnoma', icon: 'users' },
]

const system = [
  { to: '/admin/settings', label: 'Sozlamalar', icon: 'gear' },
  { to: '/admin/account', label: 'Hisob / parol', icon: 'gear' },
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
    default:
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2" />
        </svg>
      )
  }
}

function NavItems({ items }: { items: typeof inbox }) {
  return (
    <nav className="admin-nav">
      {items.map((l) => (
        <NavLink key={l.to} to={l.to} end={l.end} className={({ isActive }) => (isActive ? 'active' : '')}>
          <Icon name={l.icon} />
          {l.label}
        </NavLink>
      ))}
    </nav>
  )
}

export default function AdminShell() {
  const nav = useNavigate()
  return (
    <div className="admin-shell">
      <aside className="admin-side">
        <Link className="admin-brand" to="/admin">
          <img src="/brand/tdyu-mark.svg" alt="" />
          <div className="brand-text">
            <strong>TDYU Endowment</strong>
            <span>To‘liq boshqaruv</span>
          </div>
        </Link>

        <div className="nav-section">Inbox</div>
        <NavItems items={inbox} />
        <div className="nav-section">Kontent</div>
        <NavItems items={content} />
        <div className="nav-section">Tizim</div>
        <NavItems items={system} />

        <div className="spacer" />
        <div className="side-footer">
          <a className="side-link" href="/cyan/index.html" target="_blank" rel="noreferrer">
            Public saytni ochish ↗
          </a>
          <button
            type="button"
            className="btn"
            onClick={() => {
              setToken(null)
              nav('/admin/login')
            }}
          >
            Chiqish
          </button>
        </div>
      </aside>
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  )
}
