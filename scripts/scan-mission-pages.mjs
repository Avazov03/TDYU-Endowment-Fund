import fs from 'node:fs'

function extract(file) {
  const h = fs.readFileSync(file, 'utf8')
  const headings = [...h.matchAll(/<(h[1-6])[^>]*>([\s\S]*?)<\/\1>/gi)].map((m) => ({
    tag: m[1],
    t: m[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim(),
  }))
  const paras = [...h.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)]
    .map((m) => m[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim())
    .filter((t) => t.length > 40 && t.length < 400)
  const subs = [...h.matchAll(/sub-text[^>]*>\s*(?:<[^>]+>\s*)*([^<]{2,80})/g)].map((m) =>
    m[1].replace(/\s+/g, ' ').trim(),
  )
  const buttons = [...h.matchAll(/>([^<]{0,40}(?:Now|More|Apply|Read|Join|Discover|Open)[^<]{0,40})</gi)].map(
    (m) => m[1].trim(),
  )
  return { headings, paras: [...new Set(paras)].slice(0, 25), subs: [...new Set(subs)].slice(0, 20), buttons: [...new Set(buttons)].slice(0, 15) }
}

for (const p of ['about-us', 'mission-value', 'vice-chancellor']) {
  console.log('\n##########', p, '##########')
  const d = extract(`public/cyan/${p}/index.html`)
  console.log('-- headings --')
  d.headings.filter((x) => x.t).slice(0, 25).forEach((x) => console.log(x.tag, x.t))
  console.log('-- paras --')
  d.paras.forEach((t) => console.log('-', t.slice(0, 160)))
  console.log('-- sub --')
  d.subs.forEach((t) => console.log('*', t))
}
