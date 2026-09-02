import type { ReactNode } from 'react'
import '@/admin/admin.css'

export const metadata = {
  title: 'Admin — TDYU Endowment Fund',
  robots: { index: false, follow: false },
}

export default function AdminRootLayout({ children }: { children: ReactNode }) {
  return <div className="admin-root">{children}</div>
}
