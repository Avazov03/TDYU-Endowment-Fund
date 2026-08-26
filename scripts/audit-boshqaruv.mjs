import fs from 'node:fs'

const h = fs.readFileSync('public/cyan/vice-chancellor/index.html', 'utf8')
let body = h.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '')

console.log('=== HEADINGS ===')
;[...body.matchAll(/<(h[1-6])[^>]*>([\s\S]*?)<\/\1>/gi)]
  .map((m) => m[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim())
  .filter(Boolean)
  .forEach((t) => console.log('-', t))

console.log('\n=== ENGLISH-ISH TEXTS ===')
const texts = [...body.matchAll(/>([^<]{8,300})</g)].map((m) => m[1].replace(/\s+/g, ' ').trim())
for (const t of [...new Set(texts)]) {
  if (/[{};]|wp-|elementor|sourceURL|var |function|rgba|px|http/.test(t)) continue
  const hasEn =
    /\b(the|and|with|your|our|students|university|education|message|dear|thank|explore|life|visit|welcome|faculty|campus|program|research|modern|support|graduate|invite|together|future|well-being|mankind|curiosity|discipline|courage|class|question|failure|character|believe|passion|challenge|discover|potential)\b/i.test(
      t,
    ) || /[A-Za-z]{5,}/.test(t) && !/[ʻʼ‘’ogʻ]/.test(t) && (t.match(/[A-Za-z]/g) || []).length > 25
  if (hasEn && (t.match(/[A-Za-z]/g) || []).length > 12) console.log('-', t)
}

console.log('\n=== ALL P TAGS (short) ===')
;[...body.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)]
  .map((m) => m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim())
  .filter((t) => t.length > 20)
  .slice(0, 20)
  .forEach((t) => console.log('P:', t.slice(0, 220)))
