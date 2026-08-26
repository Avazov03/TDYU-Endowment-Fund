import fs from 'node:fs'

for (const p of [
  'public/cyan/faculties/index.html',
  'public/cyan/index.html',
  'dist/cyan/index.html',
  '../univet.rstheme.com/cyan/index.html',
]) {
  try {
    const h = fs.readFileSync(p, 'utf8')
    const headers = (h.match(/<header class="rstb-header">/g) || []).length
    const hasTdyuMain = h.includes('tdyu-main')
    const hasTdyu = h.includes('TDYU Endowment')
    console.log(p, 'size', h.length, 'headers', headers, 'tdyu-main', hasTdyuMain, 'TDYU', hasTdyu)
  } catch (e) {
    console.log(p, 'ERR', e.message)
  }
}
