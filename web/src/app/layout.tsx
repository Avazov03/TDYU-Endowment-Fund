import type { ReactNode } from 'react'
import { getLocale } from 'next-intl/server'

export default async function RootLayout({ children }: { children: ReactNode }) {
  let locale = 'uz'
  try {
    locale = await getLocale()
  } catch {
    locale = 'uz'
  }
  return (
    <html lang={locale}>
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
