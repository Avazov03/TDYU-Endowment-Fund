import { getTranslations } from 'next-intl/server'
import type { Locale } from '@/i18n/routing'

export async function pageMetadata(locale: string, key: string) {
  const t = await getTranslations({ locale, namespace: 'pages' })
  return {
    title: t(`${key}.title`),
    description: t(`${key}.lead`),
  }
}

export function loc(locale: string) {
  return locale as Locale
}
