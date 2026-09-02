import { hasLocale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing, type Locale } from '@/i18n/routing'
import { ProjectsView } from '@/components/live/ProjectsView'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const title =
    locale === 'ru' ? 'Проекты — TDYU Endowment Fund' : locale === 'en' ? 'Projects — TDYU Endowment Fund' : 'Loyihalar — TDYU Endowment Fund'
  return { title }
}

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)
  return <ProjectsView locale={locale as Locale} />
}
