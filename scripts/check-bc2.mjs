import fs from 'node:fs'
const h = fs.readFileSync('public/cyan/events/index.html', 'utf8')
const s = h.indexOf('class="rstb-breadcrumb"')
console.log('idx', s)
console.log(JSON.stringify(h.slice(s, s + 900)))
console.log('corrupt ochila', /ochiladiclass/.test(h))
console.log('Tadbirlar arxivi', h.includes('Tadbirlar arxivi'))
console.log('Bosh', h.includes('property="name">Bosh'))
