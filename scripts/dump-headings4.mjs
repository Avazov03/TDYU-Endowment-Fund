import fs from 'node:fs'

function headings(file) {
  const h = fs.readFileSync(file, 'utf8')
  const h2 = [...h.matchAll(/<(h[1-4])[^>]*>([^<]{3,140})<\/\1>/g)].map((m) =>
    m[2].replace(/\s+/g, ' ').trim(),
  )
  const titles = [...h.matchAll(/class="title"[^>]*>\s*<a[^>]*>([^<]+)/g)].map((m) =>
    m[1].trim(),
  )
  const names = [
    ...h.matchAll(
      />(Esther Howard|Jerome Bell|Arlene McCoy|David Thomas|Margaret Johnson|Floyd Miles|Brooklyn Simmons|Cameron Williamson|Leslie Alexander|Kathryn Murphy|Savannah Nguyen|Darlene Robertson)</g,
    ),
  ].map((m) => m[1])
  console.log('\n##', file)
  console.log('headings:', [...new Set(h2)].slice(0, 30))
  console.log('cards:', titles.slice(0, 15))
  console.log('names:', [...new Set(names)])
}

for (const f of [
  'public/cyan/alumni/index.html',
  'public/cyan/events/index.html',
  'public/cyan/research/index.html',
  'public/cyan/scholarships/index.html',
]) {
  headings(f)
}
