import fs from 'node:fs'

function extractVisibleEn(file) {
  const h = fs.readFileSync(file, 'utf8')
  // Rough: pull text from common heading/paragraph/button patterns
  const bits = []
  for (const re of [
    /<h[1-6][^>]*>\s*([^<]{3,120})\s*</gi,
    /<title>([^<]+)</gi,
    /placeholder="([^"]+)"/gi,
    /data-text="([^"]+)"/gi,
    /e-n-tab-title-text">\s*([^<]+)/gi,
    /menu-item-text">([^<]+)</gi,
  ]) {
    for (const m of h.matchAll(re)) bits.push(m[1].replace(/\s+/g, ' ').trim())
  }
  // Find ascii-heavy leftover phrases in <p>
  for (const m of h.matchAll(/<p[^>]*>([^<]{20,280})<\/p>/gi)) {
    const t = m[1].replace(/\s+/g, ' ').trim()
    if (/[A-Za-z]{4,}/.test(t) && /[a-z]{3,}/.test(t)) bits.push('P: ' + t.slice(0, 160))
  }
  return [...new Set(bits)].filter(Boolean)
}

for (const f of [
  'public/cyan/apply-now/index.html',
  'public/cyan/cost-financial-aid/index.html',
  'public/cyan/admission-requirements/index.html',
  'public/cyan/how-to-apply/index.html',
]) {
  console.log('\n===', f, '===')
  const bits = extractVisibleEn(f)
  for (const b of bits.slice(0, 60)) console.log(b)
  console.log('... total unique', bits.length)
}
