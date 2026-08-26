import fs from 'node:fs'

const menuPairs = [
  ['Tuition &amp; Fee', 'Hisobotlar'],
  ['Tuition & Fee', 'Hisobotlar'],
  ['Requirements', 'Huquqiy asos'],
  ['Cost &amp; Financial Aid', 'Shaffoflik'],
  ['Cost & Financial Aid', 'Shaffoflik'],
  ['Join TDYU Now', 'Xayriya'],
  ['Discover Campus Life', 'Alumni'],
  ['Graduate Programs', 'Dasturlar'],
  ['All Programs', 'Dasturlar'],
  ['Faculty Details', '⚠ Fakultet tafsilotlari'],
  ['Faculty Members One', 'Vasiylik kengashi'],
  ['Faculty Members Two', 'Boshqaruv kengashi'],
  ['Member Details', '⚠ A’zo tafsilotlari'],
  ['Blog Grid 3 Column', '⚠ Yangiliklar paneli'],
  ['Blog Grid Sidebar', '⚠ Yangiliklar'],
  ['Blog List Sidebar', "⚠ Yangiliklar ro'yxati"],
  ['Blog Details', '⚠ Yangilik tafsilotlari'],
  ['M.Ed. in Educational Leadership', '01 · Xalqaro stajirovkalar'],
  ['B.Ed. in Educational Leadership', '02 · Stipendiya va grantlar'],
  ['M.Sc. in Software Engineering', '03 · Tanlovlar va musobaqalar'],
  ['B.Sc. in Software Engineering', '04 · Ilmiy va ta’limiy loyihalar'],
]

for (const rel of ['about-us/index.html', 'mission-value/index.html', 'vice-chancellor/index.html']) {
  const f = `public/cyan/${rel}`
  let h = fs.readFileSync(f, 'utf8')
  for (const [a, b] of menuPairs) {
    // only menu-item-text
    const from = `menu-item-text">${a}</span>`
    const to = `menu-item-text">${b}</span>`
    if (h.includes(from)) h = h.split(from).join(to)
  }
  // paint History/Administration/Campus Map if not already
  for (const label of ['History', 'Administration', 'Campus Map']) {
    const plain = `menu-item-text">${label}</span>`
    const styled = `menu-item-text" style="color:#dc2626!important;font-weight:700">⚠ ${label}</span>`
    if (h.includes(plain)) h = h.split(plain).join(styled)
  }
  fs.writeFileSync(f, h)
  console.log('menu synced', rel)
}
