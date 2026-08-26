# TDYU Endowment Fund

**Muhim:** Saytning ko‘rinishi — **asl Cyan universitet HTML/CSS/JS** (`public/cyan/`). Qayta chizilgan React dizayn emas.

## Ishga tushirish

```bash
cd tdyu-endowment
npm install
npm run personalize   # bir marta / yangilashda
npm run dev
```

Brauzerda ochiladi: **`/cyan/index.html`** (asl layout + o‘zbekcha matnlar).

Tarjimani qayta qo‘llash:
```bash
npm run translate
```

## Sahifa xaritasi (asl fayllar)

| URL | Asl fayl |
|-----|----------|
| Bosh | `public/cyan/index.html` |
| Missiya | `public/cyan/about-us/index.html` |
| Dasturlar | `public/cyan/all-programs/index.html` |
| Alumni | `public/cyan/alumni/index.html` |
| Grantlar | `public/cyan/scholarships/index.html` |
| Yangiliklar | `public/cyan/blog/index.html` |
| Yordam | `public/cyan/apply-now/index.html` |
| Aloqa | `public/cyan/contact/index.html` |

CSS: `public/cyan/wp-content/.../siteground-optimizer-combined-css-*.css`  
Rasmlar: `public/cyan/wp-content/uploads/...`  
Shriftlar: lokal `public/fonts` + `tdyu-local-fonts.css` (Google CDN yo‘q).

Eski “o‘zim yozgan” React UI olib tashlangan; `src/` faqat `/cyan/` ga yo‘naltiradi.
