'use client'

import AppLayout from './kit/layout/AppLayout'
import { ThemeProvider } from './kit/context/ThemeContext'
import { I18nProvider } from './kit/i18n/I18nProvider'
import { DemoWorkspaceProvider } from './kit/context/DemoWorkspace'

export default function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <I18nProvider>
      <ThemeProvider>
        <DemoWorkspaceProvider>
          <AppLayout>{children}</AppLayout>
        </DemoWorkspaceProvider>
      </ThemeProvider>
    </I18nProvider>
  )
}
