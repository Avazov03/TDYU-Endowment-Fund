'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { SHOP_PICKUPS, formatSom, pickupLabel } from '@/content/shop'
import { loc } from '../loc'
import { PageHero } from '../PageHero'
import { postForm } from '@/lib/api'
import { lineKey, useShopCart } from '@/lib/shop-cart'
import { rememberShopOrder } from '@/lib/shop-orders'

function validEmail(value: string) {
  const at = value.indexOf('@')
  return at > 0 && at < value.length - 1 && !value.includes(' ')
}

export function ShopCartView({ locale }: { locale: Locale }) {
  const { lines, total, setQty, remove, clear, ready } = useShopCart()
  const [busy, setBusy] = useState(false)
  const [ok, setOk] = useState('')
  const [orderId, setOrderId] = useState('')
  const [err, setErr] = useState('')
  const lastSent = useRef(0)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (lines.length === 0) {
      setErr(loc(locale, 'Savat bo‘sh', 'Корзина пуста', 'Cart is empty'))
      return
    }
    const now = Date.now()
    if (now - lastSent.current < 2000) return
    const form = e.currentTarget
    const fd = new FormData(form)
    const name = String(fd.get('name') || '').trim()
    const email = String(fd.get('email') || '').trim()
    const phone = String(fd.get('phone') || '').trim()
    const pickup = String(fd.get('pickup') || '').trim()
    const note = String(fd.get('note') || '').trim()
    const digits = phone.replace(/\D/g, '')
    if (!name || !email || !phone || !pickup) {
      setErr(loc(locale, 'Majburiy maydonlarni to‘ldiring', 'Заполните обязательные поля', 'Fill in the required fields'))
      return
    }
    if (!validEmail(email)) {
      setErr(loc(locale, 'Email noto‘g‘ri', 'Некорректный email', 'Invalid email'))
      return
    }
    if (digits.length < 9 || digits.length > 15) {
      setErr(loc(locale, 'Telefon raqamini to‘g‘ri kiriting', 'Введите корректный телефон', 'Enter a valid phone number'))
      return
    }
    const summary = lines
      .map((l) => `${l.product.name.uz}${l.size ? ` (${l.size})` : ''} × ${l.qty} = ${l.lineTotal}`)
      .join('; ')
    const message = [
      `TSUL SHOP buyurtma`,
      `Olib ketish: ${pickupLabel(pickup, 'uz')}`,
      `Pozitsiyalar: ${summary}`,
      `Jami: ${total} UZS`,
      note ? `Izoh: ${note}` : '',
    ]
      .filter(Boolean)
      .join('\n')

    setBusy(true)
    setErr('')
    setOk('')
    lastSent.current = now
    try {
      const data = await postForm('/api/forms/shop-order', {
        name,
        email,
        phone,
        pickup,
        note,
        message,
        lang: locale,
        page: 'shop',
        requestId: `${now}-${total}-${lines.map((l) => `${l.product.slug}:${l.size || '-'}:${l.qty}`).join(',')}`,
        items: lines.map((l) => ({ slug: l.product.slug, qty: l.qty, size: l.size || '', price: l.product.price })),
        total,
      })
      if (data.id) {
        rememberShopOrder({
          id: data.id,
          createdAt: new Date().toISOString(),
          name,
          email,
          phone,
          pickup,
          total,
          items: lines.map((l) => ({
            slug: l.product.slug,
            name: l.product.name[locale],
            qty: l.qty,
            size: l.size,
            price: l.product.price,
          })),
          status: 'new',
        })
      }
      form.reset()
      clear()
      setOrderId(data.id || '')
      setOk(
        loc(
          locale,
          'Buyurtma qabul qilindi. Do‘konda olib ketish uchun siz bilan bog‘lanamiz.',
          'Заказ принят. Мы свяжемся с вами для самовывоза.',
          'Order received. We will contact you about campus pickup.',
        ),
      )
    } catch (error) {
      const msg = error instanceof Error ? error.message : ''
      setErr(
        msg === 'Too many requests'
          ? loc(locale, 'Juda ko‘p so‘rov. Keyinroq urinib ko‘ring.', 'Слишком много запросов. Попробуйте позже.', 'Too many requests. Try again later.')
          : loc(locale, 'Buyurtma yuborilmadi. Qayta urinib ko‘ring.', 'Не удалось отправить заказ. Попробуйте ещё раз.', 'Could not send the order. Try again.'),
      )
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      <PageHero
        image="/media/shop/shop-hero.png"
        height={320}
        objectPosition="50% 55%"
        title={loc(locale, 'Savat', 'Корзина', 'Cart')}
        crumbs={[
          { href: '/', label: loc(locale, 'Bosh', 'Главная', 'Home') },
          { href: '/shop', label: loc(locale, 'Do‘kon', 'Магазин', 'Shop') },
          { href: '/shop/cart', label: loc(locale, 'Savat', 'Корзина', 'Cart') },
        ]}
      />
      <section className="bg-cream pt-12 pb-20">
        <div className="live-wrap grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] items-start">
          <div className="rounded-[16px] bg-white border border-[#ece7dc] p-5 sm:p-7">
            {!ready ? <p className="m-0 text-body">{loc(locale, 'Yuklanmoqda…', 'Загрузка…', 'Loading…')}</p> : null}
            {ready && lines.length === 0 && !ok ? (
              <div className="py-10 text-center">
                <p className="m-0 font-[Bitter,Georgia,serif] text-[24px] text-ink">
                  {loc(locale, 'Savat hozircha bo‘sh', 'Корзина пока пуста', 'Your cart is empty')}
                </p>
                <Link href="/shop" className="inline-flex mt-5 h-[46px] px-5 items-center rounded-[30px] bg-tdyu !text-white hover:bg-sky">
                  {loc(locale, 'Katalogga qaytish', 'К каталогу', 'Back to catalogue')}
                </Link>
              </div>
            ) : null}
            {lines.length > 0 ? (
              <ul className="m-0 p-0 list-none grid gap-4">
                {lines.map((line) => (
                  <li key={lineKey(line.product.slug, line.size)} className="grid grid-cols-[88px_minmax(0,1fr)] gap-4 items-center border-b border-[#f0ebe3] pb-4 last:border-0 last:pb-0">
                    <Link href={`/shop/${line.product.slug}`} className="relative w-[88px] h-[88px] rounded-[12px] overflow-hidden bg-[#f3efe6]">
                      <Image src={line.product.image} alt="" fill className="object-cover" sizes="88px" unoptimized />
                    </Link>
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <Link href={`/shop/${line.product.slug}`} className="font-medium text-ink hover:!text-sky">
                            {line.product.name[locale]}
                          </Link>
                          {line.size ? <p className="m-0 mt-0.5 text-[13px] text-body">{loc(locale, 'O‘lcham', 'Размер', 'Size')}: {line.size}</p> : null}
                        </div>
                        <button type="button" className="appearance-none border-0 bg-transparent text-[13px] text-body hover:text-tdyu" onClick={() => remove(line.product.slug, line.size)}>
                          {loc(locale, 'O‘chirish', 'Удалить', 'Remove')}
                        </button>
                      </div>
                      <p className="m-0 mt-1 text-[14px] text-body">
                        {formatSom(line.product.price, locale)} × {line.qty} = <span className="text-tdyu font-medium">{formatSom(line.lineTotal, locale)}</span>
                      </p>
                      <div className="mt-2 inline-flex items-center h-9 rounded-full border border-[#e5e5e5]">
                        <button type="button" className="w-9 h-9 appearance-none border-0 bg-transparent" onClick={() => setQty(line.product.slug, line.qty - 1, line.size)}>
                          −
                        </button>
                        <span className="w-7 text-center text-[14px]">{line.qty}</span>
                        <button type="button" className="w-9 h-9 appearance-none border-0 bg-transparent" onClick={() => setQty(line.product.slug, line.qty + 1, line.size)}>
                          +
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : null}
            {ok ? (
              <div className="mt-4 rounded-[12px] bg-[#e8f7fb] px-4 py-4">
                <p className="m-0 text-[16px] text-tdyu font-medium">{ok}</p>
                {orderId ? (
                  <p className="m-0 mt-1 text-[13px] text-body">
                    {loc(locale, 'Buyurtma raqami', 'Номер заказа', 'Order number')}: {orderId}
                  </p>
                ) : null}
                <div className="mt-3 flex flex-wrap gap-2">
                  <Link href="/shop/orders" className="inline-flex h-10 px-4 items-center rounded-[30px] bg-tdyu !text-white">
                    {loc(locale, 'Buyurtmalarim', 'Мои заказы', 'My orders')}
                  </Link>
                  <Link href="/shop" className="inline-flex h-10 px-4 items-center rounded-[30px] border border-tdyu !text-tdyu">
                    {loc(locale, 'Yana xarid qilish', 'Купить ещё', 'Continue shopping')}
                  </Link>
                </div>
              </div>
            ) : null}
          </div>

          <aside className="rounded-[16px] bg-white border border-[#ece7dc] p-5 sm:p-7">
            {ok ? (
              <div>
                <h2 className="mt-0 mb-2 font-[Bitter,Georgia,serif] text-[26px] text-ink">
                  {loc(locale, 'Rahmat', 'Спасибо', 'Thank you')}
                </h2>
                <p className="m-0 text-[14px] leading-6 text-body">
                  {loc(
                    locale,
                    'To‘lov do‘konda. 2-bino orqa hovli yoki 3-bino (ODO).',
                    'Оплата в магазине. 2-й корпус, задний двор или 3-й корпус (ODO).',
                    'Pay in store. Building 2 courtyard or Building 3 (ODO).',
                  )}
                </p>
              </div>
            ) : (
              <>
                <h2 className="mt-0 mb-1 font-[Bitter,Georgia,serif] text-[26px] text-ink">
                  {loc(locale, 'Buyurtma', 'Заказ', 'Order')}
                </h2>
                <p className="mt-0 mb-5 text-[14px] leading-6 text-body">
                  {loc(
                    locale,
                    'To‘lov do‘konda. Buyurtmadan so‘ng operator siz bilan bog‘lanadi.',
                    'Оплата в магазине. После заказа с вами свяжется оператор.',
                    'Pay in store. An operator will contact you after the order.',
                  )}
                </p>
                <p className="m-0 mb-5 font-[Bitter,Georgia,serif] text-[22px] text-tdyu">
                  {loc(locale, 'Jami', 'Итого', 'Total')}: {formatSom(total, locale)}
                </p>
                <form onSubmit={onSubmit} noValidate className="grid gap-3">
                  <label className="grid gap-1 text-[13px] text-body">
                    {loc(locale, 'Ism*', 'Имя*', 'Name*')}
                    <input name="name" required autoComplete="name" className="h-11 rounded-[10px] border border-[#e5e5e5] px-3 text-[15px] text-ink" />
                  </label>
                  <label className="grid gap-1 text-[13px] text-body">
                    {loc(locale, 'Telefon*', 'Телефон*', 'Phone*')}
                    <input name="phone" required autoComplete="tel" placeholder="+998" className="h-11 rounded-[10px] border border-[#e5e5e5] px-3 text-[15px] text-ink" />
                  </label>
                  <label className="grid gap-1 text-[13px] text-body">
                    {loc(locale, 'Email*', 'Email*', 'Email*')}
                    <input name="email" type="email" required autoComplete="email" className="h-11 rounded-[10px] border border-[#e5e5e5] px-3 text-[15px] text-ink" />
                  </label>
                  <fieldset className="m-0 p-0 border-0 grid gap-2">
                    <legend className="text-[13px] text-body mb-1">{loc(locale, 'Olib ketish*', 'Самовывоз*', 'Pickup*')}</legend>
                    {SHOP_PICKUPS.map((p) => (
                      <label key={p.id} className="flex items-center gap-2 text-[15px] text-ink">
                        <input type="radio" name="pickup" value={p.id} required defaultChecked={p.id === 'bino-2'} />
                        {locale === 'ru' ? p.ru : locale === 'en' ? p.en : p.uz}
                      </label>
                    ))}
                  </fieldset>
                  <label className="grid gap-1 text-[13px] text-body">
                    {loc(locale, 'Izoh', 'Комментарий', 'Note')}
                    <textarea name="note" rows={3} className="rounded-[10px] border border-[#e5e5e5] px-3 py-2 text-[15px] text-ink" />
                  </label>
                  <button
                    type="submit"
                    disabled={busy || lines.length === 0}
                    className="h-12 rounded-[30px] bg-tdyu text-white text-[15px] font-medium appearance-none border-0 hover:bg-sky disabled:opacity-50"
                  >
                    {busy ? '…' : loc(locale, 'Buyurtma berish', 'Оформить заказ', 'Place order')}
                  </button>
                  {err ? <p className="m-0 text-[14px] text-[#b42318]">{err}</p> : null}
                </form>
              </>
            )}
          </aside>
        </div>
      </section>
    </>
  )
}
