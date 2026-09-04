'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { categoryLabel, formatSom, productSizes, type ShopProduct } from '@/content/shop'
import { loc } from '../loc'
import { PageHero } from '../PageHero'
import { useShopCart } from '@/lib/shop-cart'
import { ShopBagIcon } from './ShopBagIcon'
import { ShopHeartButton } from './ShopHeartButton'

export function ShopProductView({ locale, product }: { locale: Locale; product: ShopProduct }) {
  const { add, count, catalog } = useShopCart()
  const sizes = productSizes(product)
  const [qty, setQty] = useState(1)
  const [size, setSize] = useState<string>(sizes[0] || '')
  const [ok, setOk] = useState('')
  const [err, setErr] = useState('')
  const related = catalog
    .filter((p) => p.slug !== product.slug)
    .sort((a, b) => Number(a.category === product.category) - Number(b.category === product.category))
    .reverse()
    .slice(0, 4)

  function onAdd() {
    setErr('')
    setOk('')
    if (sizes.length && !size) {
      setErr(loc(locale, 'O‘lchamni tanlang', 'Выберите размер', 'Choose a size'))
      return
    }
    const added = add(product.slug, qty, sizes.length ? size : undefined)
    if (!added) {
      setErr(loc(locale, 'Savatga qo‘shilmadi', 'Не удалось добавить', 'Could not add to cart'))
      return
    }
    setOk(loc(locale, 'Savatga qo‘shildi', 'Добавлено в корзину', 'Added to cart'))
  }

  return (
    <>
      <PageHero
        image="/media/shop/shop-hero.png"
        height={320}
        objectPosition="50% 55%"
        title={product.name[locale]}
        crumbs={[
          { href: '/', label: loc(locale, 'Bosh', 'Главная', 'Home') },
          { href: '/shop', label: loc(locale, 'Do‘kon', 'Магазин', 'Shop') },
          { href: `/shop/${product.slug}`, label: product.name[locale] },
        ]}
      />
      <section className="bg-cream pt-12 pb-20">
        <div className="live-wrap grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] items-start">
          <div className="relative aspect-square rounded-[16px] overflow-hidden bg-white border border-[#ece7dc]">
            <Image src={product.image} alt={product.name[locale]} fill className="object-cover" sizes="(min-width:1024px) 50vw, 100vw" priority unoptimized />
            <span className="absolute top-4 left-4 h-8 px-3 rounded-full bg-sky text-white text-[13px] font-semibold leading-8">
              {loc(locale, 'Aksiya', 'Акция', 'Sale')}
            </span>
            <div className="absolute top-4 right-4">
              <ShopHeartButton slug={product.slug} locale={locale} />
            </div>
          </div>
          <div>
            <p className="m-0 text-[13px] uppercase tracking-[0.08em] text-sky font-semibold">{categoryLabel(product.category, locale)}</p>
            <h2 className="mt-2 mb-4 font-[Bitter,Georgia,serif] text-[36px] leading-[44px] text-ink font-medium">{product.name[locale]}</h2>
            <p className="m-0 text-[16px] leading-7 text-body">{product.blurb[locale]}</p>
            <div className="mt-6 flex items-end gap-3">
              <p className="m-0 font-[Bitter,Georgia,serif] text-[32px] leading-none text-tdyu">{formatSom(product.price, locale)}</p>
              <p className="m-0 mb-1 text-[16px] text-body/70 line-through">{formatSom(product.compareAt, locale)}</p>
            </div>
            <p className="mt-4 mb-0 text-[14px] leading-6 text-body">
              {loc(
                locale,
                'Buyurtma campus do‘konlarida olib ketiladi: 2-bino orqa hovli yoki 3-bino (ODO). Mahsulotlar soni cheklangan.',
                'Заказ забирается в кампусе: 2-й корпус, задний двор или 3-й корпус (ODO). Количество ограничено.',
                'Pickup on campus: Building 2 courtyard or Building 3 (ODO). Stock is limited.',
              )}
            </p>
            {sizes.length ? (
              <div className="mt-6">
                <p className="m-0 mb-2 text-[13px] text-body">{loc(locale, 'O‘lcham', 'Размер', 'Size')}</p>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSize(s)}
                      className={[
                        'min-w-11 h-11 px-3 rounded-[10px] border text-[14px] font-medium appearance-none',
                        size === s ? 'bg-tdyu border-tdyu text-white' : 'bg-white border-[#e5e5e5] text-ink hover:border-sky',
                      ].join(' ')}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}
            <div className="mt-6 flex flex-col gap-3">
              <div className="flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center h-12 rounded-[30px] border border-[#e5e5e5] bg-white overflow-hidden">
                  <button type="button" className="w-12 h-12 appearance-none border-0 bg-transparent text-[20px]" onClick={() => setQty((n) => Math.max(1, n - 1))} aria-label="-">
                    −
                  </button>
                  <span className="w-8 text-center text-[16px] font-medium">{qty}</span>
                  <button type="button" className="w-12 h-12 appearance-none border-0 bg-transparent text-[20px]" onClick={() => setQty((n) => Math.min(20, n + 1))} aria-label="+">
                    +
                  </button>
                </div>
                <button
                  type="button"
                  onClick={onAdd}
                  className="inline-flex items-center gap-2 h-12 px-6 rounded-[30px] bg-tdyu text-white text-[15px] font-medium appearance-none border-0 hover:bg-sky"
                >
                  <ShopBagIcon />
                  {loc(locale, 'Savatga qo‘shish', 'Добавить в корзину', 'Add to cart')}
                </button>
                <Link href="/shop/cart" className="inline-flex items-center h-12 px-5 rounded-[30px] border border-tdyu !text-tdyu text-[15px] font-medium hover:bg-tdyu hover:!text-white">
                  {loc(locale, 'Savat', 'Корзина', 'Cart')}
                  {count > 0 ? ` (${count})` : ''}
                </Link>
              </div>
              {ok ? <p className="m-0 text-[15px] text-sky">{ok}</p> : null}
              {err ? <p className="m-0 text-[15px] text-[#b42318]">{err}</p> : null}
            </div>
          </div>
        </div>

        {related.length ? (
          <div className="live-wrap mt-14">
            <h3 className="mt-0 mb-5 font-[Bitter,Georgia,serif] text-[28px] text-ink">
              {loc(locale, 'O‘xshash mahsulotlar', 'Похожие товары', 'Related products')}
            </h3>
            <ul className="m-0 p-0 list-none grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link href={`/shop/${item.slug}`} className="block rounded-[16px] overflow-hidden bg-white border border-[#ece7dc] hover:border-sky">
                    <span className="relative block aspect-square bg-[#f3efe6]">
                      <Image src={item.image} alt={item.name[locale]} fill className="object-cover" sizes="25vw" unoptimized />
                    </span>
                    <span className="block p-4">
                      <span className="block font-medium text-ink">{item.name[locale]}</span>
                      <span className="block mt-1 text-tdyu">{formatSom(item.price, locale)}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </section>
    </>
  )
}
