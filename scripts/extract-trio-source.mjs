import fs from 'node:fs'

function visibleParagraphs(file) {
  let h = fs.readFileSync(file, 'utf8')
  h = h.replace(/<script[\s\S]*?<\/script>/gi, '')
  h = h.replace(/<style[\s\S]*?<\/style>/gi, '')
  const ps = [...h.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)].map((m) =>
    m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim(),
  )
  const hs = [...h.matchAll(/<(h[1-6])[^>]*>([\s\S]*?)<\/\1>/gi)].map((m) =>
    m[2].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim(),
  )
  console.log('\nFILE', file)
  console.log('H:', [...new Set(hs.filter(Boolean))].slice(0, 20).join(' | '))
  console.log('P:')
  ;[...new Set(ps.filter((p) => p.length > 60))].slice(0, 15).forEach((p) => console.log(' •', p.slice(0, 220)))
}

for (const f of [
  'public/cyan/about-us/index.html',
  'public/cyan/mission-value/index.html',
  'public/cyan/vice-chancellor/index.html',
]) {
  visibleParagraphs(f)
}
