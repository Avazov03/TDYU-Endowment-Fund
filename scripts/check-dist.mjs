import fs from 'node:fs'
const h = fs.readFileSync('dist/cyan/index.html', 'utf8')
console.log('localhost refs', (h.match(/https:\/\/localhost/g) || []).length)
console.log('tdyu-main', h.includes('tdyu-main'))
console.log('elementor', h.includes('elementor'))
console.log('rstb-header', (h.match(/rstb-header/g) || []).length)
console.log('Huquqiy', h.includes('Huquqiy'))
console.log('Cyan University', h.includes('Cyan University'))
console.log('TDYU', (h.match(/TDYU/g) || []).length)
