import fs from 'node:fs'
import path from 'node:path'

// FAQ University leftovers
const faq = fs.readFileSync('public/cyan/faq/index.html', 'utf8')
let i = 0
while ((i = faq.indexOf('University', i)) >= 0) {
  console.log('FAQ', JSON.stringify(faq.slice(i - 50, i + 60)))
  i += 10
}

// events breadcrumb
const ev = fs.readFileSync('public/cyan/events/index.html', 'utf8')
const bi = ev.indexOf('rstb-breadcrumb')
console.log('\nbreadcrumb', JSON.stringify(ev.slice(bi, bi + 500)))

// logo text
for (const n of ['UNIVERSITY OF UNIVET', 'University of Univet', 'univet-logo', 'site-title']) {
  console.log(n, ev.includes(n))
}
