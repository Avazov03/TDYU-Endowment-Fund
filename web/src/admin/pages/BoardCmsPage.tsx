'use client'

import { CmsResourcePage, type CmsConfig } from '../cms/CmsResourcePage'

const config: CmsConfig = {
  title: 'Boshqaruv kengashi',
  hint: 'Kengash a’zolari bazadan. Rasm, ism, lavozim va tarjima.',
  path: '/api/admin/cms/people',
  query: 'kind=board',
  createLabel: '+ A’zo',
  emptyTitle: 'A’zo yo‘q',
  emptyHint: 'Yangi a’zo qo‘shing.',
  previewHref: (row) => `/uz/board/${row.slug}`,
  titleOf: (row) => String(row.nameUz || row.slug || 'A’zo'),
  metaOf: (row) => String(row.roleUz || ''),
  thumbOf: (row) => String(row.coverUrl || ''),
  langFillKeys: ['name'],
  defaults: {
    kind: 'board',
    published: true,
    sortOrder: 0,
    coverUrl: '',
    slug: '',
    code: '',
    nameUz: '',
    nameRu: '',
    nameEn: '',
    roleUz: '',
    roleRu: '',
    roleEn: '',
    aboutUz: '',
    aboutRu: '',
    aboutEn: '',
    qualsUz: '',
    qualsRu: '',
    qualsEn: '',
  },
  fields: [
    { type: 'media', key: 'coverUrl', label: 'Rasm' },
    { type: 'text', key: 'slug', label: 'Slug (URL)' },
    { type: 'text', key: 'code', label: 'Ichki kod (ixtiyoriy)' },
    { type: 'number', key: 'sortOrder', label: 'Tartib' },
    { type: 'toggle', key: 'published', label: 'Saytda nashr qilish' },
    { type: 'text', key: 'name', label: 'Ism / nom', lang: true, required: true },
    { type: 'text', key: 'role', label: 'Lavozim', lang: true },
    { type: 'textarea', key: 'about', label: 'Haqida', lang: true },
    { type: 'textarea', key: 'quals', label: 'Vazifalar', lang: true, hint: 'Har qator — bitta band.' },
  ],
}

export default function BoardCmsPage() {
  return <CmsResourcePage config={config} />
}
