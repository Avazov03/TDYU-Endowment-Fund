import fs from 'node:fs'

const patterns = [
  ' solutions”',
  ' to lead in an ever-changing world.',
  ' nurture creative thinker',
  ' goal.',
  'lenge.',
  'to become competent',
  'l-world applications',
  ' Value Dunyo',
  'Our program costs are designed',
  'Regular TDYU Students',
  '2024 best 10 university Awards',
  'Students Enrolled',
  'Academic Staff',
  'Global Partners',
]

for (const rel of ['about-us/index.html', 'mission-value/index.html', 'vice-chancellor/index.html']) {
  const h = fs.readFileSync(`public/cyan/${rel}`, 'utf8')
  console.log('\n', rel)
  for (const p of patterns) {
    const i = h.indexOf(p)
    if (i < 0) continue
    console.log('FOUND', JSON.stringify(h.slice(Math.max(0, i - 40), i + p.length + 80)))
  }
}
