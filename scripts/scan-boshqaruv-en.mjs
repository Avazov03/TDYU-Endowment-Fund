import fs from 'node:fs'
const h = fs.readFileSync('public/cyan/vice-chancellor/index.html', 'utf8')

// Find remaining Latin words that look English (simple heuristic)
const texts = [...h.matchAll(/>([^<]{20,400})</g)].map((m) => m[1].replace(/\s+/g, ' ').trim())
const enish = texts.filter((t) =>
  /\b(the|and|our|with|your|from|university|welcome|campus|academic|graduation|faculty|programs|excellence|integrity|learning|knowledge|students|commitment|innovation)\b/i.test(
    t,
  ),
)
console.log('EN-ish text nodes:', enish.length)
for (const t of enish.slice(0, 40)) console.log('-', t.slice(0, 180))
