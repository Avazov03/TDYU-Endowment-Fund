'use client'

import { ALUMNI_COUNTRIES, MAP_CATEGORIES } from '@/content/alumniMap'
import { CmsResourcePage, type CmsConfig } from '../cms/CmsResourcePage'

const config: CmsConfig = {
  title: 'Bitiruvchilar',
  hint: 'Alumni bazadan. Ism, lavozim, rasm va mamlakat — xarita shu ma’lumotdan.',
  path: '/api/admin/cms/people',
  query: 'kind=alumni',
  createLabel: '+ Bitiruvchi',
  emptyTitle: 'Bitiruvchi yo‘q',
  emptyHint: 'Yangi bitiruvchi qo‘shing.',
  previewHref: (row) => `/uz/alumni/${row.slug}`,
  titleOf: (row) => String(row.nameUz || row.slug || 'Bitiruvchi'),
  metaOf: (row) => [row.roleUz, row.countryCode].filter(Boolean).join(' · '),
  thumbOf: (row) => String(row.coverUrl || ''),
  langFillKeys: ['name'],
  defaults: {
    kind: 'alumni',
    published: true,
    sortOrder: 0,
    coverUrl: '',
    slug: '',
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
    countryCode: 'uz',
    mapCategory: 'academia',
    mapLat: '',
    mapLng: '',
    mapLabel: '',
  },
  fields: [
    { type: 'media', key: 'coverUrl', label: 'Rasm' },
    { type: 'text', key: 'slug', label: 'Slug (URL)' },
    { type: 'number', key: 'sortOrder', label: 'Tartib' },
    { type: 'toggle', key: 'published', label: 'Saytda nashr qilish' },
    { type: 'text', key: 'name', label: 'Ism', lang: true, required: true },
    { type: 'text', key: 'role', label: 'Lavozim / yo‘nalish', lang: true },
    { type: 'textarea', key: 'about', label: 'Tarjima / haqida', lang: true },
    { type: 'textarea', key: 'quals', label: 'Malakalar', lang: true, hint: 'Har qator — bitta band.' },
    {
      type: 'select',
      key: 'countryCode',
      label: 'Mamlakat (xarita)',
      options: ALUMNI_COUNTRIES.map((c) => ({ value: c.id, label: c.uz })),
    },
    {
      type: 'select',
      key: 'mapCategory',
      label: 'Xarita toifasi',
      options: MAP_CATEGORIES.filter((c) => c.id !== 'all').map((c) => ({ value: c.id, label: c.uz })),
    },
    { type: 'text', key: 'mapLabel', label: 'Xarita yorlig‘i' },
    { type: 'text', key: 'mapLat', label: 'Kenglik (lat)' },
    { type: 'text', key: 'mapLng', label: 'Uzunlik (lng)' },
  ],
}

export default function AlumniCmsPage() {
  return <CmsResourcePage config={config} />
}
