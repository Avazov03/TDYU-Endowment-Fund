import fs from 'node:fs'
const f = 'public/cyan/index.html'
let h = fs.readFileSync(f, 'utf8')
if (!h.includes('tdyu-page-polish.css')) {
  h = h.replace(
    '</head>',
    '<link rel="stylesheet" href="/tdyu-page-polish.css" />\n</head>',
  )
  fs.writeFileSync(f, h)
  console.log('injected')
} else {
  console.log('ok')
}
