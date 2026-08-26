/**
 * Dump Xayriya section structure around clipped description.
 */
import fs from 'node:fs'

const h = fs.readFileSync('public/cyan/index.html', 'utf8')
const needles = ['elementor-element-7be2985', 'elementor-element-be99211', 'elementor-element-3e77255', 'Fondni qo‘llab-quvvatlang', 'Xayriya va qo']

for (const n of needles) {
  const i = h.indexOf(n)
  console.log('\n===', n, i)
  if (i < 0) continue
  console.log(h.slice(Math.max(0, i - 200), i + 500).replace(/\s+/g, ' ').slice(0, 700))
}
