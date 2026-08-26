/**
 * Deep scan for leftover English in cyan pages (visible text nodes).
 */
import fs from 'node:fs'
import path from 'node:path'

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) {
      if (e.name === 'wp-content' || e.name === 'wp-includes' || e.name === 'wp-json') continue
      walk(p, out)
    } else if (e.name === 'index.html') out.push(p)
  }
  return out
}

const enRe =
  /\b(Welcome|University|Campus|Student|Students|Faculty|Research|Scholarship|Conference|Summit|Symposium|Forum|Ceremony|Apply|Admission|Deadline|Required|Documents|International|Library|Gallery|Explore|Join|Discover|Graduate|Programs|Events|About|Contact|Home|Search|Newsletter|Privacy|Follow|Academic|Amount|Additional|Tuition|Technology|fee|First Name|Last Name|Email Address|Phone|Gender|Country|Household|Financial|Upload|submit|Designed By|December|November|October|September|August|July|June|May|April|March|February|January|Monday|Tuesday|Wednesday|Read More|Learn More|View All|Get Started|Sign Up|Login|Register|Our|The|and|with|from|your|their|this|that|will|have|been|are|is|for|to)\b/i

// stronger: lines that look mostly English (latin words, not Uzbek-heavy)
function isEnglishy(t) {
  if (!t || t.length < 6) return false
  if (/⚠|TDYU|Endowment|Missiya|Boshqaruv|Loyiha|Grant|Alumni|Tadbir|Xayriya|Hisobot|Shaffof|Vasiylik|Taftish|Dastur|Manzil|Aloqa|Yordam|Huquqiy|Sahifa|Bitiruv|Stipendiya|Nashr|Kongress|Stajirovka|Malaka|Ariza|Miqdor|Elektron|Telefon|Familiya|Mamlakat/.test(t))
    return false
  if (/^[0-9$%.,\s–—\-:+/]+$/.test(t)) return false
  if (/wp-|elementor|http|srcset|class=|data-/.test(t)) return false
  // has common English function words
  const hits = (
    t.match(
      /\b(the|and|our|with|your|from|for|are|is|to|of|in|on|at|by|we|you|this|that|will|have|been|students?|university|campus|faculty|research|scholarship|event|program|apply|admission|welcome|explore|join|discover|graduate|library|gallery|contact|about|home|search|newsletter|privacy|follow|academic|amount|tuition|fee|designed|read more|learn more|view all|get started|submit|email|phone|gender|country|household|financial|upload|first name|last name|december|november|october|september|january|february|march|april|june|july|august)\b/gi,
    ) || []
  ).length
  return hits >= 1 && /[A-Za-z]{3,}/.test(t)
}

const priority = [
  'index',
  'alumni',
  'research',
  'scholarships',
  'events',
  'about-us',
  'mission-value',
  'vice-chancellor',
  'libraries',
  'faq',
  'gallery',
  'all-programs',
  'tuition-fee',
  'apply-now',
  'contact',
  'blog',
]

const files = walk('public/cyan').filter((f) => {
  const parts = f.replace(/\\/g, '/').split('/')
  const folder = parts[parts.length - 2]
  return priority.includes(folder) || folder === 'cyan'
})

const report = {}
for (const file of files) {
  const h = fs.readFileSync(file, 'utf8')
  const texts = [...h.matchAll(/>([^<]{5,220})</g)]
    .map((m) => m[1].replace(/\s+/g, ' ').trim())
    .filter(isEnglishy)
  const uniq = [...new Set(texts)]
  if (!uniq.length) continue
  const key = file.replace(/\\/g, '/')
  report[key] = uniq.slice(0, 40)
}

for (const [file, items] of Object.entries(report)) {
  console.log('\n##', file.replace('public/cyan/', ''))
  items.forEach((t) => console.log(' ·', t))
}
console.log('\nPAGES_WITH_EN', Object.keys(report).length)
