import fs from 'node:fs'
const h = fs.readFileSync('public/cyan/blog/index.html', 'utf8')
const i = h.indexOf('Comment')
console.log('Comment', i, JSON.stringify(h.slice(i, i + 80)))
const j = h.indexOf('comment')
console.log('comment', JSON.stringify(h.slice(j, j + 80)))

// find all article titles with surrounding excerpt
const arts = [...h.matchAll(/<h3[^>]*>[\s\S]*?<a[^>]*>([^<]+)<\/a>[\s\S]*?<p>([^<]*)<\/p>/g)]
arts.forEach((m) => console.log('-', m[1].trim(), '=>', m[2].trim().slice(0, 80)))
