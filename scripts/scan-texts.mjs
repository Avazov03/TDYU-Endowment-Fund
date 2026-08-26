import fs from 'node:fs'

function texts(html) {
  const out = []
  // headings
  for (const m of html.matchAll(/<(h[1-6])[^>]*>([\s\S]*?)<\/\1>/gi)) {
    const t = m[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
    if (t && t.length < 120) out.push(['H', t])
  }
  // menu labels
  for (const m of html.matchAll(/menu-item-text">([^<]+)/g)) out.push(['M', m[1]])
  // sub-text eyebrows
  for (const m of html.matchAll(/sub-text[^>]*>\s*(?:<[^>]+>\s*)*([^<]{3,80})/g)) {
    const t = m[1].replace(/\s+/g, ' ').trim()
    if (t) out.push(['S', t])
  }
  return out
}

const pages = [
  'index.html',
  'about-us/index.html',
  'all-programs/index.html',
  'research/index.html',
  'vice-chancellor/index.html',
  'tuition-fee/index.html',
  'scholarships/index.html',
  'alumni/index.html',
  'apply-now/index.html',
  'blog/index.html',
  'contact/index.html',
]

for (const p of pages) {
  const h = fs.readFileSync(`public/cyan/${p}`, 'utf8')
  console.log('\n===', p, '===')
  const uniq = [...new Set(texts(h).map((x) => x[0] + '|' + x[1]))]
  for (const u of uniq.slice(0, 35)) console.log(u)
}
