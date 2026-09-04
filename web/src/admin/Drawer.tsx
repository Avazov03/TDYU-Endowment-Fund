'use client'

import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'

export function Drawer({
  open,
  title,
  onClose,
  children,
  footer,
  size = 'default',
}: {
  open: boolean
  title: string
  onClose: () => void
  children: ReactNode
  footer?: ReactNode
  size?: 'default' | 'wide'
}) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  if (!open) return null
  return (
    <div className={`drawer-root${size === 'wide' ? ' drawer-wide' : ''}`} role="dialog" aria-modal="true" aria-label={title}>
      <button type="button" className="drawer-backdrop" aria-label="Yopish" onClick={onClose} />
      <aside className="drawer-panel">
        <div className="drawer-head">
          <h2>{title}</h2>
          <button type="button" className="btn ghost sm" onClick={onClose} aria-label="Yopish">
            ✕
          </button>
        </div>
        <div className="drawer-body">{children}</div>
        {footer ? <div className="drawer-foot">{footer}</div> : null}
      </aside>
    </div>
  )
}

export function useBusy() {
  const [busy, setBusy] = useState(false)
  return { busy, setBusy }
}
