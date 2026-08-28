import type { ReactNode } from 'react'
import { getLocale } from 'next-intl/server'

export default async function RootLayout({ children }: { children: ReactNode }) {
  const locale = await getLocale()
  return (
    <html lang={locale}>
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
