'use client'

import type { Locale } from '@/i18n/routing'
import { AlumniMap } from './AlumniMap'

export function AlumniMapGate({ locale }: { locale: Locale }) {
  return <AlumniMap locale={locale} />
}
