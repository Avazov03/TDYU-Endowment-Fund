import fs from 'node:fs'

const pub = fs.readFileSync('public/cyan/events/index.html', 'utf8')
const dist = fs.readFileSync('dist/cyan/events/index.html', 'utf8')

function extractBcInner(html) {
  const start = html.indexOf('class="rstb-breadcrumb">')
  if (start < 0) return null
  const open = start + 'class="rstb-breadcrumb">'.length
  // find matching close of this div — track depth from here
  let i = open
  let depth = 1
  while (i < html.length && depth > 0) {
    const nextOpen = html.indexOf('<div', i)
    const nextClose = html.indexOf('</div>', i)
    if (nextClose < 0) break
    if (nextOpen >= 0 && nextOpen < nextClose) {
      depth++
      i = nextOpen + 4
    } else {
      depth--
      if (depth === 0) return { start: open, end: nextClose, inner: html.slice(open, nextClose) }
      i = nextClose + 6
    }
  }
  return null
}

const dBc = extractBcInner(dist)
const pBc = extractBcInner(pub)
console.log('dist len', dBc?.inner.length)
console.log('pub len', pBc?.inner.length)
console.log('pub tail', JSON.stringify(pBc?.inner.slice(-120)))
console.log('dist tail', JSON.stringify(dBc?.inner.slice(-200)))

// Build fixed breadcrumb from dist, with Uzbek labels
let inner = dBc.inner
  .replaceAll('>Home<', '>Bosh<')
  .replaceAll('>Events<', '>Tadbirlar<')
  .replaceAll('Event Details', 'Tadbirlar')
  .replaceAll('Go to Univet University.', 'Go to TDYU Endowment Fund.')
  .replaceAll('Go to TDYU Endowment Fund.', 'Go to TDYU Endowment Fund.')

const fixed = pub.slice(0, pBc.start) + inner + pub.slice(pBc.end)
fs.writeFileSync('public/cyan/events/index.html', fixed)

const check = extractBcInner(fs.readFileSync('public/cyan/events/index.html', 'utf8'))
console.log('fixed len', check.inner.length)
console.log('fixed has Tadbirlar', check.inner.includes('Tadbirlar'))
console.log('fixed ok close', check.inner.includes('</span>'))
console.log('snippet end', JSON.stringify(check.inner.slice(-180)))
