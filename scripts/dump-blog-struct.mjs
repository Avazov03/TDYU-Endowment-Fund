import fs from 'node:fs'
const h = fs.readFileSync('public/cyan/blog/index.html', 'utf8')

const title = 'II Turk dunyosi yosh akademiklar kongressi'
const i = h.indexOf(title)
console.log(JSON.stringify(h.slice(i, i + 600)))

console.log('\n--- comments search ---')
for (const n of ['Comments', 'comment-count', 'comments-link', 'No Comments', 'Leave a']) {
  let p = 0
  let c = 0
  while ((p = h.indexOf(n, p)) >= 0 && c < 2) {
    console.log(n, JSON.stringify(h.slice(p, p + 100)))
    p += n.length
    c++
  }
}

console.log('\ntitles now:')
;[...h.matchAll(/<h3[^>]*>[\s\S]*?<a[^>]*>([^<]+)/g)].forEach((m) => console.log('·', m[1].trim()))

console.log('\nFond yangiliklari left', h.split('Fond yangiliklari').length - 1)
console.log('Alumni Success', h.includes('Alumni Success'))
console.log('Search Keyword', h.includes('Search Keyword'))
console.log('Categories</h4>', h.includes('Categories</h4>'))
console.log('menu Grid', h.includes('Yangiliklar Grid'), h.includes('⚠ Yangiliklar paneli'))
