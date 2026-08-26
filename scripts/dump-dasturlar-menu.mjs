import fs from 'node:fs'

// Dasturlar submenu labels on index
const idx = fs.readFileSync('public/cyan/index.html', 'utf8')
// find the programs all-programs menu block
const i = idx.indexOf('all-programs/index.html')
console.log('all-programs hits', idx.split('all-programs/index.html').length - 1)
const chunk = idx.slice(Math.max(0, i - 200), i + 3500)
const labels = [...chunk.matchAll(/menu-item-text[^>]*>([^<]+)/g)].map((m) => m[1].trim())
console.log('near all-programs', labels.slice(0, 20))

// find 01 · in menus
const ones = [...idx.matchAll(/01 ·[^<]{0,60}/g)].map((m) => m[0])
console.log('01 labels', [...new Set(ones)])
