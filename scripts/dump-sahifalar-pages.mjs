/**
 * Dump visible English-ish / key titles from Sahifalar keep pages.
 */
import fs from 'node:fs'

const pages = {
  alumni: 'public/cyan/alumni/index.html',
  research: 'public/cyan/research/index.html',
  scholarships: 'public/cyan/scholarships/index.html',
  events: 'public/cyan/events/index.html',
}

function texts(h) {
  return [...h.matchAll(/>([^<]{8,220})</g)]
    .map((m) => m[1].replace(/\s+/g, ' ').trim())
    .filter((t) => t && !/^[\d\s.,$%–—\-]+$/.test(t))
}

for (const [name, file] of Object.entries(pages)) {
  const h = fs.readFileSync(file, 'utf8')
  const all = texts(h)
  // prefer breadcrumbs / hero / headings
  const heroish = all.filter((t) =>
    /Alumni|Research|Grant|Event|Scholarship|Campus|Student|University|Welcome|Explore|Life|Library|FAQ|Gallery|Loyiha|Tadbir|Bitiruv/i.test(
      t,
    ),
  )
  console.log('\n========', name, '========')
  console.log('count', heroish.length)
  for (const t of [...new Set(heroish)].slice(0, 35)) console.log('·', t)
}
