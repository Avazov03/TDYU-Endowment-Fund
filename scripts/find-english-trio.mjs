import fs from 'node:fs'

function englishy(s) {
  const words = (s.match(/\b[A-Za-z]{4,}\b/g) || []).length
  const uz = (s.match(/[ўғҳқʼ‘’]/g) || []).length
  return words > 8 && uz < 3
}

for (const p of ['about-us', 'mission-value', 'vice-chancellor']) {
  const h = fs.readFileSync(`public/cyan/${p}/index.html`, 'utf8')
  console.log('\n===', p, '===')
  const chunks = [...h.matchAll(/>([^<]{50,350})</g)].map((m) => m[1].replace(/\s+/g, ' ').trim())
  for (const c of chunks) {
    if (englishy(c)) console.log('-', c.slice(0, 200))
  }
}
