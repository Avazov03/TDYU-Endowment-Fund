import fs from 'node:fs'
import path from 'node:path'

const root = 'public/cyan'

function walk(d, a = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const f = path.join(d, e.name)
    if (e.isDirectory()) walk(f, a)
    else if (/\.html?$/i.test(e.name)) a.push(f)
  }
  return a
}

// Pick any existing combined js as fallback for missing hash
const jsDir = path.join(root, 'wp-content/uploads/sites/17/siteground-optimizer-assets')
const jsFiles = fs.readdirSync(jsDir).filter((f) => f.startsWith('siteground-optimizer-combined-js-') && f.endsWith('.js'))
const fallbackJs = '/cyan/wp-content/uploads/sites/17/siteground-optimizer-assets/' + jsFiles[0]

const missingJs = 'siteground-optimizer-combined-js-015e3a16d14405212d4e8d682e0a78ba.js'

const more = [
  [/Magistratura Dasturlar/g, 'Magistratura dasturlari'],
  [/Graduate Dasturlar/g, 'Magistratura dasturlari'],
  [/Postgraduate Dasturlar/g, 'Magistratura dasturlari'],
]

let n = 0
for (const file of walk(root)) {
  let h = fs.readFileSync(file, 'utf8')
  let o = h
  o = o.split(missingJs).join(path.posix.basename(fallbackJs))
  // if path was full /cyan/... missing file
  o = o.replace(
    /\/cyan\/wp-content\/uploads\/sites\/17\/siteground-optimizer-assets\/siteground-optimizer-combined-js-015e3a16d14405212d4e8d682e0a78ba\.js/g,
    fallbackJs,
  )
  for (const [re, to] of more) o = o.replace(re, to)
  if (o !== h) {
    fs.writeFileSync(file, o)
    n++
  }
}
console.log('patched', n, 'fallbackJs', fallbackJs)

// verify images on key pages
for (const file of ['public/cyan/index.html', 'public/cyan/about-us/index.html', 'public/cyan/contact/index.html', 'public/cyan/blog/index.html']) {
  const h = fs.readFileSync(file, 'utf8')
  const urls = [...h.matchAll(/src="(\/cyan\/[^"]+\.(?:png|jpe?g|webp|svg))"/gi)].map((m) => m[1])
  let ok = 0
  let bad = 0
  for (const u of urls) {
    const abs = path.join('public/cyan', u.replace(/^\/cyan\//, ''))
    if (fs.existsSync(abs)) ok++
    else bad++
  }
  console.log(file, 'imgs', urls.length, 'ok', ok, 'bad', bad)
}
