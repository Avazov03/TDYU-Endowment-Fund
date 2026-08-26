import fs from 'node:fs'
const h = fs.readFileSync('public/cyan/alumni/index.html', 'utf8')
const start = h.indexOf('Sahifalar')
const chunk = h.slice(start, start + 12000)
const labels = [...chunk.matchAll(/menu-item-text[^>]*>([^<]+)/g)].map((m) => m[1].trim())
console.log(labels)

// leftover EN on keep pages
for (const p of ['alumni', 'research', 'scholarships', 'events', 'faq']) {
  const x = fs.readFileSync(`public/cyan/${p}/index.html`, 'utf8')
  const en = [...x.matchAll(/>([^<]{18,140})</g)]
    .map((m) => m[1].replace(/\s+/g, ' ').trim())
    .filter((t) =>
      /\b(the|and|our|How |What |Are |University|Student|Campus|Research|Scholarship|Conference|Welcome)\b/.test(
        t,
      ) && !/⚠|TDYU|Grant|Alumni|Loyiha|Tadbir|Missiya|Boshqaruv/.test(t),
    )
  console.log(p, 'EN~', en.slice(0, 8))
}
