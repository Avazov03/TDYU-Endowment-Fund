import fs from 'node:fs'
const h = fs.readFileSync('public/cyan/index.html', 'utf8')
const i = h.indexOf('⚠ Fakultetlar')
console.log('footer-ish:', h.slice(i - 120, i + 80).replace(/\s+/g, ' '))
const j = h.indexOf('⚠ Sahifalar')
console.log('\nsahifalar:', h.slice(j - 100, j + 100).replace(/\s+/g, ' '))
const k = h.indexOf('⚠ Tarix')
console.log('\ntarix li:', h.slice(k - 150, k + 40).replace(/\s+/g, ' '))
