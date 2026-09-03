'use client'

import type { ReactNode } from 'react'
import { usePathname } from '@/i18n/navigation'
import { SiteHeader } from './SiteHeader'
import { SiteFooter } from './SiteFooter'
import type { Locale } from '@/i18n/routing'

const PLAIN = new Set(['/privacy'])

export function ChromeGate({ locale, children }: { locale: Locale; children: ReactNode }) {
  const pathname = usePathname()
  const plain = PLAIN.has(pathname)
  return (
    <>
      {plain ? null : <SiteHeader />}
      <main>{children}</main>
      {plain ? null : <SiteFooter locale={locale} />}
    </>
  )
}
