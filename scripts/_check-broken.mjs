import fs from 'node:fs'

for (const f of [
  'public/cyan/admission-requirements/index.html',
  'public/cyan/how-to-apply/index.html',
]) {
  const h = fs.readFileSync(f, 'utf8')
  console.log('\n===', f)
  for (const m of h.matchAll(/<p[^>]*>([^<]{10,300})<\/p>/gi)) {
    const t = m[1].replace(/\s+/g, ' ').trim()
    if (/[A-Za-z]{5,}/.test(t) || /ensuring|tuition|ges and|receive|support/.test(t) || t.endsWith(' ')) {
      console.log('P:', t.slice(0, 220))
    }
  }
  // broken uzbek endings
  for (const bad of ['ensuring', 'ges and', 'fe', 'tuition', 'Costs may', 'high-quality']) {
    if (h.includes(bad)) console.log('BAD', bad)
  }
}
