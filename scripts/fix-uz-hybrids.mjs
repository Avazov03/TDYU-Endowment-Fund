import fs from 'node:fs'
import path from 'node:path'

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) {
      if (['wp-content', 'wp-includes', 'wp-json'].includes(e.name)) continue
      walk(p, out)
    } else if (e.name.endsWith('.html')) out.push(p)
  }
  return out
}

const pairs = [
  ['Postgraduate/malaka oshirish', "Magistratura/malaka oshirish"],
  ['International cooperation va ilmiy aloqalar', 'Xalqaro hamkorlik va ilmiy aloqalar'],
  ['International events, ilmiy nashrlar', 'Xalqaro tadbirlar, ilmiy nashrlar'],
  ['Academic publications va tarjimalar', 'Ilmiy nashrlar va tarjimalar'],
  ['International practice va raqamli huquq', 'Xalqaro amaliyot va raqamli huquq'],
  ['Public service va yuridik amaliyot', 'Davlat xizmati va yuridik amaliyot'],
  ['TSUL brand va tadbirkorlik', "TSUL brendi va tadbirkorlik"],
  ['Donate mablag', "Xayriya mablag"],
  ['Donate, grant', 'Xayriya, grant'],
  ['Donate maqsadini', 'Xayriya maqsadini'],
  ['Contact form orqali', 'Aloqa formasi orqali'],
  ['Transparency asosiy', 'Shaffoflik asosiy'],
  ['Board of Trustees — oliy', 'Vasiylik kengashi — oliy'],
  ['Governance kengashi — joriy', 'Boshqaruv kengashi — joriy'],
  ['Grants sahifasida', 'Grantlar sahifasida'],
]

let hits = 0
for (const f of walk('public/cyan')) {
  let h = fs.readFileSync(f, 'utf8')
  let n = 0
  for (const [a, b] of pairs) {
    if (!h.includes(a)) continue
    const c = h.split(a).length - 1
    h = h.split(a).join(b)
    n += c
  }
  if (!n) continue
  fs.writeFileSync(f, h)
  hits += n
}
console.log('hybrid fixed', hits)
