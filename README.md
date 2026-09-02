# TDYU Endowment Fund

**Kelishilgan stack:** Next.js 15 App Router + React 19 + Tailwind + next-intl; API hozir Express (keyin Route Handlers); Prisma; DB hozir SQLite, keyin PostgreSQL.

Public va admin — native Next.js (`web/`). Backend — Express + Prisma + SQLite.

To‘liq TZ: [TZ-STACK.md](./TZ-STACK.md). Testlar: [TESTING.md](./TESTING.md).

## Tezkor start

```bash
cd tdyu-endowment
cp .env.example .env          # kerak bo‘lsa
npm install
npx prisma migrate deploy --schema server/prisma/schema.prisma
npm run db:seed
npm run dev:all
```

- Public sayt: http://localhost:3000/uz
- Admin: http://localhost:3000/admin/login
- API: http://localhost:8787/api/health

### Demo login (faqat local)

- Email: `admin@tdyu-endowment.uz`
- Parol: `Admin123!`

## Skriptlar

| Buyruq | Vazifa |
|--------|--------|
| `npm run server` | FAQAT API (8787) |
| `npm run dev` | FAQAT Next (`web/`) |
| `npm run dev:all` | API + Next birga |
| `npm run db:seed` | Admin + sozlamalar + namuna e’lonlar |
| `npm run build` | Next production build |
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

**Chegara:** vizual drag-drop sahifa tahriri yo‘q. Matn/blok/hujjat/formalar to‘liq boshqariladi.

## Deploy (Node + SQLite)

1. Serverda `npm install --omit=dev` (yoki to‘liq) + `npm run build`
2. `.env`: `DATABASE_URL`, `JWT_SECRET`, `ADMIN_*`, `PORT`
3. `npx prisma migrate deploy --schema server/prisma/schema.prisma && npm run db:seed`
4. Next `web/` standalone + Express API (Nginx reverse proxy)

SQLite fayl: `server/prisma/dev.db` (backup qiling).

## Nima yo‘q (ochiq)

- Click / Payme onlayn to‘lov gateway

Xayriya: bank o‘tkazmasi + admin da ariza statusi.

## Sahifa xaritasi

| URL | Marshrut |
|-----|----------|
| Bosh | `/uz` |
| Aloqa | `/uz/contact` |
| Xayriya | `/uz/donate` |
| Admin | `/admin` |
