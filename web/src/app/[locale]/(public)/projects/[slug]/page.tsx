import { hasLocale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing, type Locale } from '@/i18n/routing'
import { PROJECTS, getProject, localizeProject } from '@/content/projects'
import { ProjectDetailView } from '@/components/live/ProjectDetailView'

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  const project = getProject(slug)
  if (!project || !hasLocale(routing.locales, locale)) return { title: 'TDYU Endowment Fund' }
  const L = localizeProject(project, locale as Locale)
  return { title: `${L.title} — TDYU Endowment Fund` }
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)
  const project = getProject(slug)
  if (!project) notFound()
  return <ProjectDetailView locale={locale as Locale} project={project} />
}
