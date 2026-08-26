import fs from 'node:fs'

function titles(file) {
  const h = fs.readFileSync(file, 'utf8')
  const hs = [...h.matchAll(/<(h[1-4])[^>]*>([\s\S]*?)<\/\1>/gi)]
    .map((m) => m[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim())
    .filter((t) => t && t.length < 100)
  return [...new Set(hs)].slice(0, 18)
}

for (const p of [
  'public/cyan/about-us/index.html',
  'public/cyan/mission-value/index.html',
  'public/cyan/vice-chancellor/index.html',
]) {
  console.log('\n===', p, '===')
  console.log(titles(p).join('\n'))
  const h = fs.readFileSync(p, 'utf8')
  console.log('has images', (h.match(/<img /g) || []).length)
  console.log('elementor sections-ish', (h.match(/e-con-parent/g) || []).length)
}
