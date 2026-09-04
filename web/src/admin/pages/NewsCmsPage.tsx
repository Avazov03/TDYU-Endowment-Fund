'use client'

import { CmsResourcePage, type CmsConfig } from '../cms/CmsResourcePage'

const config: CmsConfig = {
  title: 'Maqolalar',
  hint: 'Barcha maqolalar bazadan. Yangi yozuv yoki tahrir shu yerda — sayt DB dan o‘qiydi.',
  path: '/api/admin/cms/news',
  createLabel: '+ Maqola',
  emptyTitle: 'Maqola yo‘q',
  emptyHint: 'Yangi maqola qo‘shing.',
  previewHref: (row) => `/uz/news/${row.slug}`,
  titleOf: (row) => String(row.titleUz || row.slug || 'Maqola'),
  metaOf: (row) => [row.tagUz, row.dateUz].filter(Boolean).join(' · '),
  thumbOf: (row) => String(row.coverUrl || ''),
  langFillKeys: ['title'],
  defaults: {
    published: true,
    featured: false,
    sortOrder: 0,
    coverUrl: '',
    videoUrl: '',
    slug: '',
    tagUz: '',
    tagRu: '',
    tagEn: '',
    dateUz: '',
    dateRu: '',
    dateEn: '',
    titleUz: '',
    titleRu: '',
    titleEn: '',
    excerptUz: '',
    excerptRu: '',
    excerptEn: '',
    bodyUz: '',
    bodyRu: '',
    bodyEn: '',
  },
  fields: [
    { type: 'media', key: 'coverUrl', label: 'Asosiy rasm' },
    { type: 'text', key: 'videoUrl', label: 'Video havola' },
    { type: 'text', key: 'slug', label: 'Slug (URL)' },
    { type: 'number', key: 'sortOrder', label: 'Tartib' },
    { type: 'toggle', key: 'published', label: 'Saytda nashr qilish' },
    { type: 'toggle', key: 'featured', label: 'Bosh sahifada ko‘rsatish' },
    { type: 'text', key: 'title', label: 'Sarlavha', lang: true, required: true },
    { type: 'text', key: 'tag', label: 'Bo‘lim / teg', lang: true },
    { type: 'text', key: 'date', label: 'Sana yorlig‘i', lang: true },
    { type: 'textarea', key: 'excerpt', label: 'Qisqa matn', lang: true },
    { type: 'textarea', key: 'body', label: 'To‘liq matn', lang: true, hint: 'Har paragraf — yangi qator.' },
  ],
}

export default function NewsCmsPage() {
  return <CmsResourcePage config={config} />
}
