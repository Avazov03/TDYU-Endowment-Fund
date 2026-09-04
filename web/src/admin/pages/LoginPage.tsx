'use client'

import { I18nProvider } from '../kit/i18n/I18nProvider'
import { ThemeProvider } from '../kit/context/ThemeContext'
import { DemoWorkspaceProvider } from '../kit/context/DemoWorkspace'
import AuthLayout from '../kit/pages/AuthPages/AuthPageLayout'
import SignInForm from '../kit/components/auth/SignInForm'

export default function LoginPage() {
  return (
    <I18nProvider>
      <ThemeProvider>
        <DemoWorkspaceProvider>
          <AuthLayout>
            <SignInForm />
          </AuthLayout>
        </DemoWorkspaceProvider>
      </ThemeProvider>
    </I18nProvider>
  )
}
