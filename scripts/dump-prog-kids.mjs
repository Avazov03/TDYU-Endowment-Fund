import fs from 'node:fs'

function extractKids(file) {
  const h = fs.readFileSync(file, 'utf8')
  // find all-programs link then following submenu items until next top-level
  const marker = 'all-programs/index.html'
  let from = 0
  const blocks = []
  while (true) {
    const i = h.indexOf(marker, from)
    if (i < 0) break
    const slice = h.slice(i, i + 2200)
    const labels = [...slice.matchAll(/menu-item-text[^>]*>([^<]+)/g)].map((m) => m[1].trim())
    const hrefs = [...slice.matchAll(/href="([^"]+)"/g)].map((m) => m[1]).slice(0, 8)
    blocks.push({ labels: labels.slice(0, 8), hrefs })
    from = i + marker.length
  }
  console.log('\n##', file, 'blocks', blocks.length)
  blocks.slice(0, 3).forEach((b, n) => {
    console.log('block', n, b.labels)
    console.log(' hrefs', b.hrefs)
  })
}

extractKids('public/cyan/index.html')
extractKids('public/cyan/all-programs/index.html')
extractKids('public/cyan/alumni/index.html')
