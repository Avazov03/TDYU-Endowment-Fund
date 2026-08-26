import fs from 'node:fs'

const pages = [
  'index.html',
  'about-us/index.html',
  'all-programs/index.html',
  'apply-now/index.html',
  'alumni/index.html',
  'tuition-fee/index.html',
]
for (const p of pages) {
  const h = fs.readFileSync(`public/cyan/${p}`, 'utf8')
  console.log(
    p,
    'size',
    h.length,
    'tdyu-main',
    h.includes('tdyu-main'),
    'elementor-page',
    h.includes('elementor'),
    'localhost',
    (h.match(/https:\/\/localhost/g) || []).length,
  )
}
