# Test qo‘llanmasi

Local dev uchun. Production (`tdyu.yuretta.uz` / server IP) ga qarshi test yozilmaydi va ishga tushirilmaydi.

To‘liq TZ: [TZ-STACK.md](./TZ-STACK.md).

## Ishga tushirish

Avval API (`:8787`) va public Next (`:3000`) kerak.

```bash
cd tdyu-endowment
npx playwright install chromium   # bir marta
npm run test:unit                 # Vitest, test.db (dev.db ga tegilmaydi)
npm run test:e2e:smoke            # asosiy sahifalar + /api/health
npm run test:e2e:forms
npm run test:e2e:admin            # Next /admin
npm run test:e2e:i18n
npm run test:e2e                  # barcha Playwright loyihalari
```

Playwright `webServer` bo‘sh portlarni o‘zi ko‘taradi; allaqachon `npm run server` / `npm run dev:next` ishlayotgan bo‘lsa, qayta ishlatadi.

### Migratsiya soni (qo‘lda)

CI va `test:unit` ichida **avtomatik emas**. SQLite → Postgres (yoki schema o‘zgarishi) oldidan/keyin:

```bash
DATABASE_URL="file:./test.db" npm run test:migration-safety -- snapshot
# …migratsiya…
DATABASE_URL="file:./test.db" npm run test:migration-safety -- verify
```

`dev.db` uchun aniq `--allow-dev-db`. Production URL rad etiladi.

## Yangi test qo‘shish

| Tur | Qayerda | Qanday |
|-----|---------|--------|
| E2E smoke | `e2e/smoke/` | `*.spec.ts`, `--project=smoke` |
| E2E formalar | `e2e/forms/` | muvaffaqiyat + kamida bitta xato/validatsiya |
| E2E admin | `e2e/admin/` | login kutish, keyin sidebar orqali o‘tish (`goto` tokenni yutishi mumkin) |
| E2E i18n | `e2e/i18n/` | UZ + RU + EN |
| Unit | `server/**/*.test.mjs` | Vitest; `DATABASE_URL` faqat `test.db` |
| Validatsiya | `server/src/validation.mjs` | yangi qoida shu yerda, keyin test |

Yangi E2E `playwright.config.ts` dagi `projects` `testMatch` ga tushishi kerak. Yangi unit fayl `*.test.mjs` bo‘lsin (`e2e/` emas).

Har yangi testda: **muvaffaqiyatli holat** va **kamida bitta xato holati** (bo‘sh maydon, noto‘g‘ri format, 401). Formalar/auth/fayl uchun xato holatlari **kamida ikkita** bo‘lsin.

## Majburiy qamrov

Quyidagisiz PR/o‘zgarish “tayyor” deb hisoblanmasin:

1. **Formalar** — aloqa, xayriya, obuna: yuborish OK; bo‘sh maydon; noto‘g‘ri email.
2. **Auth** — to‘g‘ri JWT; token yo‘q (401); yaroqsiz/muddati o‘tgan token.
3. **Fayl yuklash** — ruxsat etilgan tur (PDF/DOC/XLS); hajm limiti; path traversal (`../`).
4. **Health** — `GET /api/health` (`ok: true`).
5. **i18n** — `/uz` `/ru` `/en` ochiladi, matn bo‘sh emas.

Hali yo‘q (keyinroq): GitHub Actions CI, rate limit unit test (kodda alohida funksiya yo‘q), to‘lov gateway, Express’ni Next Route Handlers ga yutish.

## Muhim cheklovlar

- Unit test **`server/prisma/test.db`**. `dev.db` ga Prisma test orqali yozilmasin.
- `npx prisma migrate` va schema o‘zgarishi — alohida ruxsat.
- Demo admin (`admin@tdyu-endowment.uz` / `Admin123!`) faqat local E2E; productionda qoldirmang.
