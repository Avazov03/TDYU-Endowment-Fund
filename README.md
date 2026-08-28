# TDYU Endowment Fund

**Kelishilgan stack (27 Aug 2026):** Next.js 15 App Router + React 19 + Tailwind + next-intl; API keyin Route Handlers; Prisma; DB hozir SQLite, keyin PostgreSQL.

Hozir ishlayotgan kod: public — Elementor HTML dump (`public/cyan`, `public/ru`, `public/en`); backend — Express + Prisma + SQLite; admin — React (`/admin`). Ko‘chirish **parallel** (eski o‘chmaydi).

To‘liq TZ va xavfsiz yo‘l: [TZ-STACK.md](./TZ-STACK.md). Testlar: [TESTING.md](./TESTING.md).

## Tezkor start

```bash
cd tdyu-endowment
cp .env.example .env          # kerak bo‘lsa
npm install
npx prisma migrate deploy --schema server/prisma/schema.prisma
npm run db:seed
npm run dev:all
```

- Public sayt: http://localhost:5173/cyan/index.html  
- Admin: http://localhost:5173/admin/login  
- API: http://localhost:8787/api/health  

### Demo login
- Email: `admin@tdyu-endowment.uz`
- Parol: `Admin123!`

## Skriptlar

| Buyruq | Vazifa |
|--------|--------|
| `npm run server` | FAQAT API (8787) |
| `npm run dev` | FAQAT Vite |
| `npm run dev:all` | API + Vite birga |
| `npm run dev:new` | API + Next (`:3000`) |
| `npm run db:seed` | Admin + sozlamalar + namuna e’lonlar |
| `npm run build` | Admin SPA build (`dist/`) |
| `npm run test:unit` | Vitest (`test.db`, `dev.db` ga tegilmaydi) |
| `npm run test:e2e` | Barcha Playwright loyihalari |
| `npm run test:e2e:smoke` | Sahifalar + `/api/health` |
| `npm run test:e2e:forms` | Aloqa, xayriya, obuna |
| `npm run test:e2e:admin` | Login, yangilik, hujjat, status |
| `npm run test:e2e:i18n` | UZ / RU / EN |
| `npm run test:migration-safety` | Jadval yozuvlari soni (qo‘lda snapshot/verify) |

## Admin da nima boshqariladi (to‘liq)

| Bo‘lim | Vazifa |
|--------|--------|
| Dashboard | Holat + tezkor amallar |
| Murojaatlar / Xayriya / Grantlar | Detail panel, status, ichki izoh |
| Sayt kontenti | Asosiy matnlar (UZ/RU/EN) |
| Yangiliklar | E’lonlar CRUD |
| Hujjatlar | PDF/DOC yuklash (hisobotlar) |
| Axborotnoma | Email ro‘yxat + CSV |
| Sozlamalar | Aloqa, bank, privacy, social |
| Hisob | Admin parolini almashtirish |

**Chegara:** Elementor sahifalarni vizual drag-drop CMS emas. Matn/blok/hujjat/formalar to‘liq boshqariladi.

## Deploy (Node + SQLite)

1. Serverda `npm install --omit=dev` (yoki to‘liq) + `npm run build`
2. `.env`: `DATABASE_URL`, `JWT_SECRET`, `ADMIN_*`, `PORT`
3. `npx prisma migrate deploy --schema server/prisma/schema.prisma && npm run db:seed`
4. `node server/src/index.mjs` — API + `dist` + `public` bir portda

SQLite fayl: `server/prisma/dev.db` (backup qiling).

## Nima yo‘q (ochiq)

- Click / Payme onlayn to‘lov gateway
- Elementor sahifalarni vizual CMS sifatida tahrirlash

Xayriya: bank o‘tkazmasi + admin da ariza statusi.

## Sahifa xaritasi

| URL | Fayl |
|-----|------|
| Bosh | `/cyan/index.html` |
| Aloqa | `/cyan/contact/index.html` |
| Xayriya | `/cyan/apply-now/index.html` |
| Admin | `/admin` |
