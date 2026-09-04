'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { Link, useRouter } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import {
  SHOP_CATEGORIES,
  SHOP_PICKUPS,
  SHOP_PRODUCTS,
  categoryLabel,
  formatSom,
  productSizes,
  type ShopCategory,
  type ShopProduct,
} from '@/content/shop'
import { loc } from '../loc'
import { PageHero } from '../PageHero'
import { useShopCart } from '@/lib/shop-cart'
import { ShopBagIcon } from './ShopBagIcon'
import { ShopHeartButton } from './ShopHeartButton'

type SortId = 'featured' | 'price-asc' | 'price-desc'

export function ShopView({ locale, favoritesOnly = false }: { locale: Locale; favoritesOnly?: boolean }) {
  const { add, count, favorites, isFav } = useShopCart()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<ShopCategory | 'all'>('all')
  const [sort, setSort] = useState<SortId>('featured')
  const [flash, setFlash] = useState<string | null>(null)
  const [favOnly, setFavOnly] = useState(favoritesOnly)

  useEffect(() => {
    const q = searchParams.get('q')
    if (q) setQuery(q)
  }, [searchParams])

  const products = useMemo(() => {
    const q = query.trim().toLowerCase()
    let list = SHOP_PRODUCTS.filter((p) => {
      if (favOnly && !isFav(p.slug)) return false
      if (category !== 'all' && p.category !== category) return false
      if (!q) return true
      return `${p.name.uz} ${p.name.ru} ${p.name.en} ${p.blurb[locale]}`.toLowerCase().includes(q)
    })
    if (sort === 'price-asc') list = [...list].sort((a, b) => a.price - b.price)
    else if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price)
    else list = [...list].sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)))
    return list
  }, [query, category, sort, locale, favOnly, isFav])

  function onAdd(product: ShopProduct) {
    if (productSizes(product).length) {
      router.push(`/shop/${product.slug}`)
      return
    }
    if (!add(product.slug, 1)) return
    setFlash(product.slug)
    window.setTimeout(() => setFlash((cur) => (cur === product.slug ? null : cur)), 1400)
  }

  return (
    <>
      <PageHero
        image="/media/shop/shop-hero.png"
        height={413}
        objectPosition="50% 55%"
        title={loc(locale, 'TSUL SHOP', 'TSUL SHOP', 'TSUL SHOP')}
        lead={loc(
          locale,
          'Aksiya narxlari. Mahsulotlar soni cheklangan — campus do‘konlaridan olib ketish.',
          'Акционные цены. Количество ограничено — самовывоз в кампусе.',
          'Sale prices. Limited stock — campus pickup.',
        )}
        crumbs={[
          { href: '/', label: loc(locale, 'Bosh', 'Главная', 'Home') },
          { href: '/shop', label: loc(locale, 'Do‘kon', 'Магазин', 'Shop') },
        ]}
      />

      <section className="bg-cream pt-10 pb-20">
        <div className="live-wrap">
          <div className="grid gap-4 lg:grid-cols-[1.4fr_auto] items-center mb-8">
            <div className="rounded-[16px] bg-tdyu text-white px-6 py-5">
              <p className="m-0 font-[Bitter,Georgia,serif] text-[22px] leading-8 font-medium text-white">
                {loc(locale, 'Katta chegirmalar boshlandi', 'Большие скидки начались', 'Big discounts are on')}
              </p>
              <p className="m-0 mt-1 text-[15px] leading-6 text-white/85">
                {loc(
                  locale,
                  'Barcha mahsulotlar aksiya narxida. Tushumning bir qismi endowment dasturlariga yo‘naladi.',
                  'Все товары по акционной цене. Часть выручки идёт на программы эндаумента.',
                  'Everything is at sale price. Part of proceeds support endowment programmes.',
                )}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/shop/orders"
                className="inline-flex items-center justify-center h-[50px] px-5 rounded-[30px] border border-tdyu !text-tdyu text-[15px] font-medium hover:bg-tdyu hover:!text-white"
              >
                {loc(locale, 'Buyurtmalarim', 'Мои заказы', 'My orders')}
              </Link>
              <button
                type="button"
                onClick={() => setFavOnly((v) => !v)}
                className={[
                  'inline-flex items-center justify-center gap-2 h-[50px] px-5 rounded-[30px] border text-[15px] font-medium appearance-none',
                  favOnly ? 'bg-sky border-sky text-white' : 'bg-white border-tdyu text-tdyu hover:bg-tdyu hover:text-white',
                ].join(' ')}
              >
                {loc(locale, 'Saralangan', 'Избранное', 'Favourites')}
                {favorites.length ? ` (${favorites.length})` : ''}
              </button>
              <Link
                href="/shop/cart"
                className="inline-flex items-center justify-center gap-2 h-[50px] px-5 rounded-[30px] bg-sky !text-white text-[15px] font-medium hover:bg-tdyu"
              >
                <ShopBagIcon />
                {loc(locale, 'Savat', 'Корзина', 'Cart')}
                {count > 0 ? <span className="min-w-[22px] h-[22px] rounded-full bg-white text-tdyu text-[12px] leading-[22px] text-center font-semibold">{count}</span> : null}
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between mb-6">
            <div className="flex flex-wrap gap-2" role="tablist" aria-label={loc(locale, 'Kategoriya', 'Категория', 'Category')}>
              {SHOP_CATEGORIES.map((c) => {
                const on = category === c.id
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setCategory(c.id)}
                    className={[
                      'h-10 px-4 rounded-full border text-[14px] font-medium appearance-none',
                      on ? 'bg-tdyu border-tdyu text-white' : 'bg-white border-[#e5e5e5] text-ink hover:border-sky hover:text-sky',
                    ].join(' ')}
                  >
                    {categoryLabel(c.id, locale)}
                  </button>
                )
              })}
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={loc(locale, 'Mahsulot qidirish…', 'Поиск товара…', 'Search products…')}
                aria-label={loc(locale, 'Qidirish', 'Поиск', 'Search')}
                className="h-[46px] w-full sm:w-[240px] rounded-[10px] border border-[#e5e5e5] bg-white px-4 text-[15px]"
              />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortId)}
                aria-label={loc(locale, 'Saralash', 'Сортировка', 'Sort')}
                className="h-[46px] rounded-[10px] border border-[#e5e5e5] bg-white px-3 text-[14px]"
              >
                <option value="featured">{loc(locale, 'Tavsiya', 'Рекомендуемые', 'Featured')}</option>
                <option value="price-asc">{loc(locale, 'Narx: arzon', 'Цена: ниже', 'Price: low')}</option>
                <option value="price-desc">{loc(locale, 'Narx: qimmat', 'Цена: выше', 'Price: high')}</option>
              </select>
            </div>
          </div>

          {products.length === 0 ? (
            <div className="rounded-[16px] bg-white px-8 py-16 text-center">
              <p className="m-0 text-[18px] text-ink font-medium">
                {loc(locale, 'Mahsulot topilmadi', 'Товары не найдены', 'No products found')}
              </p>
              <p className="m-0 mt-2 text-[15px] text-body">
                {loc(locale, 'Qidiruv yoki filterni o‘zgartiring.', 'Измените поиск или фильтр.', 'Try another search or filter.')}
              </p>
              <button
                type="button"
                className="mt-5 h-[46px] px-5 rounded-[30px] bg-tdyu text-white appearance-none border-0"
                onClick={() => {
                  setQuery('')
                  setCategory('all')
                  setFavOnly(false)
                }}
              >
                {loc(locale, 'Filterni tozalash', 'Сбросить фильтр', 'Clear filters')}
              </button>
            </div>
          ) : (
            <ul className="m-0 p-0 list-none grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {products.map((product) => (
                <li key={product.slug}>
                  <article
                    className={[
                      'h-full rounded-[16px] overflow-hidden border border-[#ece7dc] shadow-[0_12px_32px_rgba(12,87,118,0.08)]',
                      product.featured ? 'bg-tdyu text-white' : 'bg-white',
                    ].join(' ')}
                  >
                    <div className="relative">
                      <Link href={`/shop/${product.slug}`} className="block relative aspect-square bg-[#f3efe6]">
                        <Image src={product.image} alt={product.name[locale]} fill className="object-cover" sizes="(min-width:1280px) 25vw, (min-width:640px) 50vw, 100vw" unoptimized />
                        <span className="absolute top-3 left-3 h-7 px-3 rounded-full bg-sky text-white text-[12px] font-semibold leading-7">
                          {loc(locale, 'Aksiya', 'Акция', 'Sale')}
                        </span>
                      </Link>
                      <div className="absolute top-3 right-3">
                        <ShopHeartButton slug={product.slug} locale={locale} light={product.featured} />
                      </div>
                    </div>
                    <div className="p-4">
                      <p className={['m-0 text-[12px] uppercase tracking-[0.06em]', product.featured ? 'text-white/70' : 'text-sky'].join(' ')}>
                        {categoryLabel(product.category, locale)}
                      </p>
                      <h2 className={['mt-1 mb-2 font-[Bitter,Georgia,serif] text-[20px] leading-7 font-medium', product.featured ? '!text-white' : 'text-ink'].join(' ')}>
                        <Link href={`/shop/${product.slug}`} className={product.featured ? '!text-white hover:!text-sky' : 'hover:!text-sky'}>
                          {product.name[locale]}
                        </Link>
                      </h2>
                      <p className={['m-0 mb-4 text-[14px] leading-5 line-through', product.featured ? 'text-white/55' : 'text-body/70'].join(' ')}>
                        {formatSom(product.compareAt, locale)}
                      </p>
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/shop/${product.slug}`}
                          className={[
                            'inline-flex items-center justify-center h-11 px-3 rounded-[30px] border text-[14px] font-medium',
                            product.featured ? 'border-white/70 !text-white hover:bg-white hover:!text-tdyu' : 'border-tdyu !text-tdyu hover:bg-tdyu hover:!text-white',
                          ].join(' ')}
                        >
                          {formatSom(product.price, locale)}
                        </Link>
                        <button
                          type="button"
                          onClick={() => onAdd(product)}
                          className={[
                            'inline-flex items-center justify-center w-11 h-11 rounded-full appearance-none border-0',
                            product.featured ? 'bg-sky text-white hover:bg-white hover:text-tdyu' : 'bg-tdyu text-white hover:bg-sky',
                          ].join(' ')}
                          aria-label={loc(locale, 'Savatga', 'В корзину', 'Add to cart')}
                        >
                          <ShopBagIcon size={16} />
                        </button>
                      </div>
                      {flash === product.slug ? (
                        <p className={['m-0 mt-3 text-[13px]', product.featured ? 'text-sky' : 'text-sky'].join(' ')}>
                          {loc(locale, 'Savatga qo‘shildi', 'Добавлено в корзину', 'Added to cart')}
                        </p>
                      ) : null}
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {[
              {
                t: loc(locale, 'Sifatli mahsulot', 'Качественный товар', 'Quality product'),
                d: loc(locale, 'Campus brendi, kundalik foydalanish uchun.', 'Кампусный бренд для ежедневного использования.', 'Campus brand for everyday use.'),
              },
              {
                t: loc(locale, 'Ajoyib sovg‘a', 'Отличный подарок', 'A great gift'),
                d: loc(locale, 'Talaba, alumni va mehmonlar uchun.', 'Для студентов, выпускников и гостей.', 'For students, alumni and guests.'),
              },
              {
                t: loc(locale, 'Olib ketish', 'Самовывоз', 'Pickup'),
                d: SHOP_PICKUPS.map((p) => (locale === 'ru' ? p.ru : locale === 'en' ? p.en : p.uz)).join(' · '),
              },
            ].map((item) => (
              <div key={item.t} className="rounded-[16px] bg-white px-5 py-5 border border-[#ece7dc]">
                <p className="m-0 font-[Bitter,Georgia,serif] text-[18px] text-ink">{item.t}</p>
                <p className="m-0 mt-1 text-[14px] leading-6 text-body">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
