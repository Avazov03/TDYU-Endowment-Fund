import type { ReactNode } from 'react'
import { hasLocale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing, type Locale } from '@/i18n/routing'
import { ChromeGate } from '@/components/live/ChromeGate'
import '../../public-site.css'

export default async function PublicLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)

  return (
    <div className="live-root">
      <ChromeGate locale={locale as Locale}>{children}</ChromeGate>
    </div>
  )
}
