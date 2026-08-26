import fs from 'node:fs'

const h = fs.readFileSync('public/cyan/index.html', 'utf8')
// find menu links to about-us and mission-value
for (const key of ['about-us', 'mission-value', 'vice-chancellor']) {
  const re = new RegExp(`.{0,120}${key}.{0,200}menu-item-text">([^<]+)`, 'gi')
  let m
  let i = 0
  while ((m = re.exec(h)) && i < 5) {
    console.log(key, '→', m[1])
    i++
  }
  // alternate: href then later text
  const re2 = new RegExp(`href="[^"]*${key}[^"]*"[^>]*>\\s*<span class="menu-item-text">([^<]+)`, 'gi')
  let j = 0
  while ((m = re2.exec(h)) && j < 8) {
    console.log('HREF', key, m[1])
    j++
  }
}
