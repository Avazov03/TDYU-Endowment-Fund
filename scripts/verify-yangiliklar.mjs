import fs from 'node:fs'

for (const f of ['public/cyan/blog/index.html', 'public/cyan/blog/page/2/index.html']) {
  const h = fs.readFileSync(f, 'utf8')
  console.log('\n===', f)
  console.log(
    'titles',
    [...h.matchAll(/rel="bookmark">([^<]+)</g)].map((m) => m[1]),
  )
  console.log(
    'excerpts',
    [...h.matchAll(/<\/h3><p>([^<]*)<\/p>/g)].map((m) => m[1]),
  )
  // menu yangiliklar children
  const menus = [...h.matchAll(/menu-item-text[^>]*>([^<]*Yangilik[^<]*|[^<]*Blog[^<]*)</gi)].map(
    (m) => m[1],
  )
  console.log('menu yangilik-ish', [...new Set(menus)])

  for (const en of [
    'Previous',
    'Next',
    'Older',
    'Newer',
    'sufian',
    'Sufian',
    'By ',
    'Posted on',
    'No Comments',
    'Leave a Reply',
  ]) {
    if (h.includes(en)) {
      const i = h.indexOf(en)
      console.log('EN', en, h.slice(i - 20, i + 40).replace(/\s+/g, ' '))
    }
  }
}
