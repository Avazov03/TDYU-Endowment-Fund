import fs from 'node:fs'
const h = fs.readFileSync('public/cyan/scholarships/index.html', 'utf8')
for (const n of ['Guided by a vision', 'We actively support research', 'Applicants must submit']) {
  const i = h.indexOf(n)
  // find end at next tag boundary for paragraph
  const end = h.indexOf('</p>', i)
  const end2 = h.indexOf('</div>', i)
  const e = Math.min(end > 0 ? end : 1e9, end2 > 0 ? end2 : 1e9)
  console.log('\n===', n)
  console.log(JSON.stringify(h.slice(i, e)))
}
