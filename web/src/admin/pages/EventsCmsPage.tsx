'use client'

import { EVENTS } from '@/content/events'
import { CmsResourcePage, type CmsConfig } from '../cms/CmsResourcePage'

const config: CmsConfig = {
  title: 'Tadbirlar',
  hint: 'Rasm, video havola, sarlavha va matn — uch tilda. Nashr qilinganlar saytda chiqadi.',
  path: '/api/admin/cms/events',
  createLabel: '+ Tadbir',
  emptyTitle: 'Tadbir yo‘q',
  emptyHint: 'Yangi tadbir qo‘shing yoki hozirgi sayt kontentini bir marta ko‘chiring.',
  importType: 'events',
  importItems: EVENTS,
  previewHref: (row) => `/uz/events/${row.slug}`,
  titleOf: (row) => String(row.titleUz || row.slug || 'Tadbir'),
  metaOf: (row) => [row.dateUz, row.locUz].filter(Boolean).join(' · '),
  thumbOf: (row) => String(row.coverUrl || ''),
  langFillKeys: ['title'],
  defaults: {
    published: true,
    sortOrder: 0,
    coverUrl: '',
    videoUrl: '',
    slug: '',
    dateUz: '',
    dateRu: '',
    dateEn: '',
    time: '',
    titleUz: '',
    titleRu: '',
    titleEn: '',
    locUz: '',
    locRu: '',
    locEn: '',
    bodyUz: '',
    bodyRu: '',
    bodyEn: '',
    goalsUz: '',
    goalsRu: '',
    goalsEn: '',
  },
  fields: [
    { type: 'media', key: 'coverUrl', label: 'Asosiy rasm' },
    { type: 'text', key: 'videoUrl', label: 'Video havola (YouTube / Vimeo)' },
    { type: 'text', key: 'slug', label: 'Slug (URL)' },
    { type: 'number', key: 'sortOrder', label: 'Tartib' },
    { type: 'toggle', key: 'published', label: 'Saytda nashr qilish' },
    { type: 'text', key: 'title', label: 'Sarlavha', lang: true, required: true },
    { type: 'text', key: 'date', label: 'Sana yorlig‘i', lang: true, placeholder: 'Masalan: 4-avgust, 2025' },
    { type: 'text', key: 'time', label: 'Vaqt' },
    { type: 'text', key: 'loc', label: 'Joy', lang: true },
    { type: 'textarea', key: 'body', label: 'Matn', lang: true, hint: 'Har bir paragraf — yangi qator.' },
    { type: 'textarea', key: 'goals', label: 'Maqsadlar', lang: true, hint: 'Har qator — bitta maqsad.' },
  ],
}

export default function EventsCmsPage() {
  return <CmsResourcePage config={config} />
}
