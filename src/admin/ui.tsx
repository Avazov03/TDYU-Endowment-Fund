/** Shared admin UI helpers */

export function StatusBadge({ value, map }: { value: string; map: Record<string, { label: string; tone: string }> }) {
  const m = map[value] || { label: value, tone: 'neutral' }
  return <span className={`badge tone-${m.tone}`}>{m.label}</span>
}

export const contactStatus = {
  new: { label: 'Yangi', tone: 'info' },
  in_progress: { label: 'Jarayonda', tone: 'warn' },
  closed: { label: 'Yopilgan', tone: 'ok' },
}

export const donationStatus = {
  pending: { label: 'Kutilmoqda', tone: 'warn' },
  confirmed: { label: 'Tasdiqlangan', tone: 'ok' },
  cancelled: { label: 'Bekor', tone: 'danger' },
}

export const grantStatus = {
  new: { label: 'Yangi', tone: 'info' },
  reviewing: { label: 'Ko‘rib chiqilmoqda', tone: 'warn' },
  accepted: { label: 'Qabul', tone: 'ok' },
  rejected: { label: 'Rad', tone: 'danger' },
}

export function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleString('uz-UZ', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  } catch {
    return iso
  }
}

export function LoadingBlock({ label = 'Yuklanmoqda…' }: { label?: string }) {
  return (
    <div className="loading-block" role="status">
      <span className="spinner" />
      {label}
    </div>
  )
}

export function EmptyState({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="empty-state">
      <div className="empty-icon" aria-hidden>
        ▢
      </div>
      <strong>{title}</strong>
      {hint ? <p>{hint}</p> : null}
    </div>
  )
}
