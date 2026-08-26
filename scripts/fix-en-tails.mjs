import fs from 'node:fs'

const files = [
  'public/cyan/how-to-apply/index.html',
  'public/cyan/apply-now/index.html',
  'public/cyan/admission-requirements/index.html',
  'public/cyan/cost-financial-aid/index.html',
  'public/cyan/tuition-fee/index.html',
]

for (const f of files) {
  let h = fs.readFileSync(f, 'utf8')
  const markers = [
    'ation and comprehensive',
    'Costs may vary based on program',
    'We aim to provide exceptional',
    'industry aligned curriculum',
    'high-quality education',
    'on-campus, hybrid',
  ]
  let changed = false
  for (const m of markers) {
    let i = 0
    while ((i = h.indexOf(m, i)) !== -1) {
      // expand left to sentence start or after uzbek period
      let start = i
      while (start > 0 && h[start - 1] !== '>' && h[start - 1] !== '<' && i - start < 80) start--
      // if preceded by uzbek text ending with period, start after that
      const before = h.slice(Math.max(0, i - 120), i)
      const dot = before.lastIndexOf('.')
      if (dot >= 0) start = Math.max(0, i - 120) + dot + 1
      let end = i + m.length
      while (end < h.length && h[end] !== '<' && end - i < 500) end++
      const chunk = h.slice(start, end)
      console.log(f, 'REMOVE', JSON.stringify(chunk.slice(0, 160)))
      h = h.slice(0, start) + h.slice(end)
      changed = true
      i = start
    }
  }
  // Normalize double spaces / leftover after uzbek sentence
  if (h.includes('taqsimlanadi.ation')) {
    h = h.split('taqsimlanadi.ation').join('taqsimlanadi.')
    changed = true
  }
  if (changed) {
    // clean "taqsimlanadi. We" style if any left
    h = h.replace(/taqsimlanadi\.[A-Za-z][^.<]{10,400}/g, 'taqsimlanadi.')
    fs.writeFileSync(f, h)
    console.log('patched', f)
  } else console.log('clean', f)
}

// exact fix for known hybrid
{
  const f = 'public/cyan/how-to-apply/index.html'
  let h = fs.readFileSync(f, 'utf8')
  const i = h.indexOf('Fond mablag‘lari shaffof hisobotlar asosida taqsimlanadi.')
  if (i >= 0) {
    let end = i + 'Fond mablag‘lari shaffof hisobotlar asosida taqsimlanadi.'.length
    while (end < h.length && h[end] !== '<' && /[A-Za-z ,()\-]/.test(h[end])) end++
    const full = h.slice(i, end)
    if (full.length > 60) {
      console.log('yordam hybrid full', JSON.stringify(full.slice(0, 200)))
      h = h.slice(0, i) + 'Fond mablag‘lari shaffof hisobotlar asosida taqsimlanadi.' + h.slice(end)
      fs.writeFileSync(f, h)
    }
  }
}
