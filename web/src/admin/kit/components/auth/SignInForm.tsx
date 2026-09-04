'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from '../../icons'
import Label from '../form/Label'
import Input from '../form/input/InputField'
import Button from '../ui/button/Button'
import LanguageSwitcher from '../header/LanguageSwitcher'
import BrandLogo from '../common/BrandLogo'
import { useI18n } from '@/admin/kit/i18n/I18nProvider'
import { api, setToken } from '@/admin/api'

export default function SignInForm() {
  const { t } = useI18n()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const data = await api<{ token: string }>('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      })
      setToken(data.token)
      router.push('/admin')
    } catch (err) {
      setError(err instanceof Error ? err.message : t('login.error'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col flex-1">
      <div className="flex items-center justify-between w-full max-w-md gap-4 pt-10 mx-auto">
        <a
          href="/uz"
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ChevronLeftIcon className="size-5" />
          {t('login.home')}
        </a>
        <LanguageSwitcher />
      </div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <a href="/admin" className="mb-6 flex items-center lg:hidden" aria-label="TDYU">
            <BrandLogo variant="full" />
          </a>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              {t('login.title')}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">{t('login.subtitle')}</p>
          </div>
          <form onSubmit={onSubmit}>
            <div className="space-y-6">
              {error ? (
                <div className="error p-3 text-sm text-error-500 rounded-lg bg-error-50 dark:bg-error-500/10">{error}</div>
              ) : null}
              <div>
                <Label>
                  {t('login.email')} <span className="text-error-500">*</span>
                </Label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div>
                <Label>
                  {t('login.code')} <span className="text-error-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t('login.placeholder')}
                    required
                    error={Boolean(error)}
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                  >
                    {showPassword ? (
                      <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                    ) : (
                      <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                    )}
                  </span>
                </div>
              </div>
              <div>
                <Button className="w-full" size="sm" type="submit" disabled={loading}>
                  {loading ? '…' : t('login.submit')}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
