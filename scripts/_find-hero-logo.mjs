import fs from 'node:fs'

const h = fs.readFileSync('public/cyan/index.html', 'utf8')
// Find image near logo-ish decorative / absolute positioned logos
const imgs = [...h.matchAll(/src="([^"]+\.(?:png|svg|jpg|webp))"/gi)].map((m) => m[1])
console.log('all unique imgs count', new Set(imgs).size)
for (const s of [...new Set(imgs)]) {
  if (/logo|Asset|brand|univet|icon|mark|cyan-m/i.test(s)) console.log(s)
}

// search for circle logo context
for (const needle of ['cyan-m-logo', 'logo1', 'm-logo', 'Asset-2', 'preloader']) {
  const i = h.indexOf(needle)
  if (i >= 0) console.log('found', needle, 'at', i, JSON.stringify(h.slice(i - 40, i + 80)))
}
