import fs from 'node:fs'
const h = fs.readFileSync('public/cyan/blog/index.html', 'utf8')

// Find post-title link then excerpt
const i = h.indexOf('class="post-title"')
console.log(JSON.stringify(h.slice(i, i + 500)))

console.log('\n---')
const j = h.indexOf('Fond yangiliklari')
console.log(JSON.stringify(h.slice(j - 200, j + 80)))
