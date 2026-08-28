# TZ — kelishilgan texnologiya va xavfsiz ko‘chirish

**Holat:** qabul qilingan · 27 Aug 2026 · **bosqich A–D boshlandi** (`web/` Next.js yonma-yon, eski tizim saqlangan)  
**Loyha:** TDYU Endowment Fund  
**Qoida:** stack o‘zgarmaydi, toki yangi TZ yozilmaguncha.

---

## 1. Kelishilgan stack (muzlatilgan)

| Qatlam | Tanlov | Izoh |
|---|---|---|
| Public + Admin UI | **Next.js 15 (App Router) + React 19** | Bitta ilova. Public SSG/ISR, admin `/admin`. |
| Stillar | **Tailwind CSS** + brand tokenlar | Elementor CSS olib o‘tilmaydi. |
| i18n | **next-intl** | URL: `/uz` `/ru` `/en`. 3 ta HTML dump yo‘q. |
| API (maqsad) | **Next.js Route Handlers** + TypeScript | Express vaqtincha saqlanadi, keyin yutiladi. |
| ORM | **Prisma** (mavjud `server/prisma/schema.prisma`) | Modellarni qayta ixtiro qilmang. |
| DB (hozir) | **SQLite** | Ishlayveradi, tegilmaydi to front barqaror bo‘lguncha. |
| DB (maqsad) | **PostgreSQL 16** | Front ko‘chishi **tugagandan keyin**. |
| Auth | JWT (mavjud) | 1–3 admin. Keycloak yo‘q. |
| Fayl | `server/uploads` | Bosqich 1 da o‘zgarmaydi. |
| Hosting (maqsad) | Nginx + `next start` + Postgres | Vercel majburiy emas. |

### Tanlanmagan (qayta ochilmaydi)

WordPress/Elementor · Vite SPA public · Vue/Angular · NestJS/Go/Rust “tezlik uchun” · MongoDB · Laravel/Django · Fastify ni alohida ushlab turish.

---

## 2. Nima saqlanadi (dizayn va tizim)

Bu **muzlatilgan aktivlar**. Next.js da qayta ishlatiladi, o‘zgartirilmaydi toki alohida dizayn qarori bo‘lmaguncha.

**Brend tokenlari**

| Token | Qiymat |
|---|---|
| Primary (cyan) | `#0C5776` |
| Cyan deep | `#09465F` / `#0F6487` |
| Secondary (sky) | `#00ADE2` |
| Cream | `#F6F4EE` |
| Ink / title | `#030303` / `#142F3B` |
| Text | `#4C4C4C` |
| White | `#FFFFFF` |
| Radius public | `16px` (CTA pill `30px`) |
| Radius admin | `12px` |
| Display font | Maitree, Bitter |
| UI font | Inter (Roboto o‘rniga Inter — lokal fayl bor) |
| Logo | `public/brand/tdyu-logo.svg`, `tdyu-logo-white.svg` |

**Saqlanadigan tizim**

- Prisma modellari va API shartnomasi (`/api/public`, `/api/forms`, `/api/admin`, `/api/auth`)
- Admin funksiyasi (CRUD, status, hujjat, sozlamalar) — vizual `src/admin/admin.css` tokenlari bilan
- Lokal shriftlar (`public/fonts`, `@fontsource`)
- `.env` kalitlari (`DATABASE_URL`, `JWT_SECRET`, `ADMIN_*`)

**Saqlanmaydi (bu “dizayn” emas, shablon qarz)**

- `public/cyan|ru|en` Elementor/HTTrack dump
- Revolution Slider
- SiteGround combined CSS/JS
- Universitet demo sahifalari (faculty, tuition, vice-chancellor, CSE/Nursing…)
- 393 ta HTML fayl

Dump **o‘chirilmaydi** toki Next public qabul qilinmaguncha. U fallback.

---

## 3. Xavfsiz ko‘chirish printsipi

**Strangler fig:** yangi Next.js ilova parallel yuradi. Eski Vite + Express + dump **bir kunda o‘chirilmaydi**.

```
HOZIR (o‘zgarmaydi)          YANGI (yonma-yon)
Vite :5173  public dump  →   Next :3000  /uz /ru /en
Vite :5173  /admin       →   keyinroq /admin
Express :8787 /api       ←   Next rewrite bilan shu API ni chaqiradi
SQLite                   ←   o‘zgarmaydi
```

**Bir vaqtda faqat bitta xavf:** avval faqat public UI. API, DB, admin, to‘lov — keyingi bosqichlar.

---

## 4. Bosqichlar

| # | Ish | Eski tizimga ta’sir | Chiqish sharti |
|---|---|---|---|
| **A** | `web/` da Next.js 15 skelet: Tailwind tokenlar, next-intl, `/api` → `:8787` proxy | Nol. `npm run dev:all` ishlayveradi | `:3000/uz` bo‘sh layout + logo + ranglar |
| **B** | Dizayn tokenlarini `web/app/globals.css` + `tailwind.config` ga ko‘chirish. Logo/font copy. Elementor CSS **import qilinmasin** | Nol | Vizual “brand sheet” sahifasi |
| **C** | Sahifa-sahifa rebuild: header/footer → home → donate → contact → grants → news → reports → about. Har biri `:3000` da, `:5173` bilan solishtiriladi | Nol | Har sahifa uchun OK (dizayn + forma) |
| **D** | Formalar mavjud `/api/forms` ga ulanadi (yangi backend yo‘q) | Nol | Murojaat/xayriya/grant eski admin da ko‘rinadi |
| **E** | Default URL ni Next ga o‘tkazish (Nginx yoki Vite redirect). Dump `public/_legacy` ga | Faqat kirish nuqtasi | 1 hafta fallback |
| **F** | Admin ni `/admin` ga ko‘chirish (`src/admin/*` deyarli copy + `admin.css` tokenlari) | Admin URL | Login + barcha CRUD ishlaydi |
| **G** | Express marshrutlarini Route Handlers ga yutish | API ichki | `/api/health` Next dan |
| **H** | SQLite → PostgreSQL | DB | migrate + seed + backup |
| **I** | Click / Payme | Yangi | alohida TZ |

Bosqich C tugaguncha **G/H/I ochilmaydi**.

---

## 5. Nima qilish mumkin emas (zarar yo‘llari)

1. Eski `public/cyan` ni Next ichiga HTML/CSS sifatida olib o‘tish — sekinlik qaytadi, dizayn ham fondniki emas.
2. Elementor combined CSS ni `@import` qilish.
3. Ildizdagi Vite ni 1-kunda Next ga almashtirish.
4. Front bilan birga Express ni o‘chirish.
5. Front bilan birga SQLite ni almashtirish.
6. Dump ni “tozalash” uchun o‘chirish (fallback yo‘qoladi).
7. Admin va public ni bir sprint da qayta yozish.
8. Tailwind default ko‘k/kulrang palitrasi — faqat §2 tokenlari.

---

## 6. Sahifa xaritasi (yangi public, ~12–20 ta)

Home · About/missiya · 7 dastur · Xayriya · Grantlar · Yangiliklar · Hisobotlar/hujjatlar · Boshqaruv · Shaffoflik · Aloqa · Maxfiylik · FAQ.

Universitet demo marshrutlari (faculty, tuition, researches-CSE…) **qayta yaratilmaydi**.

---

## 7. Dev buyruqlar (ko‘chirish davrida)

```bash
npm run dev:all          # eski: API 8787 + Vite 5173  (ISHLAYVERADI)
cd web && npm run dev    # yangi: Next 3000             (QO‘SHILADI)
```

Tekshiruv:

- Eski: http://localhost:5173/cyan/index.html
- Yangi: http://localhost:3000/uz
- Admin (eski, F gacha): http://localhost:5173/admin/login
- API: http://localhost:8787/api/health

---

## 8. Qabul qilish mezonlari (public cutover)

- LCP sezilarli past (Slider/Elementor yo‘q)
- UZ/RU/EN URL da ishlaydi
- Formalar admin da ko‘rinadi
- Logo, cyan/sky/cream, Maitree+Inter saqlangan
- `/admin` eski yoki yangi — login ishlaydi
- `public/cyan` hali diskda (kamida 1 hafta)
