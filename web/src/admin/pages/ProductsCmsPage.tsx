'use client'

import { SHOP_CATEGORIES } from '@/content/shop'
import { CmsResourcePage, type CmsConfig } from '../cms/CmsResourcePage'

const cats = SHOP_CATEGORIES.filter((c) => c.id !== 'all')

const config: CmsConfig = {
  title: 'Mahsulotlar',
  hint: 'Mahsulotlar bazadan. Stok 0 bo‘lsa, savatga qo‘shilmaydi.',
  path: '/api/admin/cms/products',
  createLabel: '+ Mahsulot',
  emptyTitle: 'Mahsulot yo‘q',
  emptyHint: 'Yangi mahsulot qo‘shing.',
  previewHref: (row) => `/uz/shop/${row.slug}`,
  titleOf: (row) => String(row.nameUz || row.slug || 'Mahsulot'),
  metaOf: (row) => {
    const price = Number(row.price) || 0
    const stock = Number(row.stock) || 0
    return `${price.toLocaleString('uz-UZ')} so‘m · ombor ${stock}`
  },
  thumbOf: (row) => String(row.coverUrl || ''),
  langFillKeys: ['name'],
  extraFilters: {
    key: 'category',
    options: cats.map((c) => ({ value: c.id, label: c.uz })),
  },
  defaults: {
    published: true,
    featured: false,
    sortOrder: 0,
    coverUrl: '',
    slug: '',
    category: 'gifts',
    price: 0,
    compareAt: 0,
    stock: 10,
    nameUz: '',
    nameRu: '',
    nameEn: '',
    blurbUz: '',
    blurbRu: '',
    blurbEn: '',
  },
  fields: [
    { type: 'media', key: 'coverUrl', label: 'Mahsulot rasmi' },
    { type: 'text', key: 'slug', label: 'Slug (URL)' },
    { type: 'select', key: 'category', label: 'Kategoriya', options: cats.map((c) => ({ value: c.id, label: c.uz })) },
    { type: 'number', key: 'price', label: 'Narx (so‘m)' },
    { type: 'number', key: 'compareAt', label: 'Eski narx (ixtiyoriy)' },
    { type: 'number', key: 'stock', label: 'Ombor soni' },
    { type: 'number', key: 'sortOrder', label: 'Tartib' },
    { type: 'toggle', key: 'published', label: 'Do‘konda ko‘rsatish' },
    { type: 'toggle', key: 'featured', label: 'Tavsiya etilgan' },
    { type: 'text', key: 'name', label: 'Nomi', lang: true, required: true },
    { type: 'textarea', key: 'blurb', label: 'Qisqa tavsif', lang: true },
  ],
}

export default function ProductsCmsPage() {
  return <CmsResourcePage config={config} />
}
