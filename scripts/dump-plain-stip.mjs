import fs from 'node:fs'
const h = fs.readFileSync('public/cyan/all-programs/index.html', 'utf8')
let i = 0
let c = 0
while ((i = h.indexOf('menu-item-text">Stipendiya va grantlar</span>', i)) >= 0 && c < 6) {
  console.log(JSON.stringify(h.slice(i - 180, i + 50)))
  console.log('---')
  i += 10
  c++
}
i = 0
c = 0
while ((i = h.indexOf('menu-item-text">Nashrlar va tarjimalar</span>', i)) >= 0 && c < 4) {
  console.log('NASHR', JSON.stringify(h.slice(i - 180, i + 50)))
  i += 10
  c++
}
