import fs from 'node:fs'

function dumpProgramMenu(file) {
  const h = fs.readFileSync(file, 'utf8')
  // find first occurrence of scholarships or program-ish under dasturlar children
  const i = h.indexOf('menu-item-text">Stipendiya va grantlar</span>')
  const j = h.indexOf('menu-item-text">01 · Xalqaro stajirovkalar</span>')
  console.log('\n##', file)
  console.log('has Stipendiya plain', i >= 0)
  console.log('has 01 ·', j >= 0)
  if (i >= 0) console.log(JSON.stringify(h.slice(i - 120, i + 80)))
  if (j >= 0) console.log(JSON.stringify(h.slice(j - 120, j + 80)))
}

dumpProgramMenu('public/cyan/all-programs/index.html')
dumpProgramMenu('public/cyan/index.html')
dumpProgramMenu('public/cyan/alumni/index.html')
