import fs from 'node:fs'

for (const f of [
  'public/cyan/tuition-fee/index.html',
  'public/cyan/how-to-apply/index.html',
  'public/cyan/admission-requirements/index.html',
]) {
  const h = fs.readFileSync(f, 'utf8')
  let from = 0
  let c = 0
  console.log('\n', f)
  while (c < 3) {
    const i = h.indexOf('Our program', from)
    if (i < 0) break
    // extract until period or tag
    let end = i
    while (end < h.length && end < i + 500 && h[end] !== '<' && !(h[end] === '.' && end > i + 40)) end++
    if (h[end] === '.') end++
    console.log(JSON.stringify(h.slice(i, end)))
    from = i + 10
    c++
  }
  // how-to-apply hybrid para
  const j = h.indexOf('Fondga murojaat')
  if (j > 0) console.log('murojaat:', JSON.stringify(h.slice(j, j + 350).replace(/\s+/g, ' ')))
}
