'use client'

import type { ReactNode } from 'react'
import AdminShell from '@/admin/AdminShell'
import { RequireAuth } from '@/admin/RequireAuth'

export default function AdminPanelLayout({ children }: { children: ReactNode }) {
  return (
    <RequireAuth>
      <AdminShell>{children}</AdminShell>
    </RequireAuth>
  )
}
