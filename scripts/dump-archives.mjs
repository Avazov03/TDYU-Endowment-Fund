import fs from 'node:fs'
const h = fs.readFileSync('public/cyan/events/index.html', 'utf8')
for (const n of ['Archives', 'Enter your', 'Graduate', 'Event', 'keywords']) {
  let i = 0
  let c = 0
  while ((i = h.indexOf(n, i)) >= 0 && c < 5) {
    console.log(n, JSON.stringify(h.slice(i, i + 80)))
    i += n.length
    c++
  }
}

// find h1
const m = h.match(/<h1[^>]*>[\s\S]{0,120}/)
console.log('h1', m && m[0])
