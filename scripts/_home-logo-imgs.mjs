import fs from 'node:fs'
const h = fs.readFileSync('public/cyan/index.html', 'utf8')
const imgs = [...h.matchAll(/src="([^"]+\.(?:png|svg|jpg|webp))"/gi)].map((m) => m[1])
const logoish = [...new Set(imgs)].filter((s) => /logo|Asset-2|brand|univet|favicon/i.test(s))
console.log(logoish)
