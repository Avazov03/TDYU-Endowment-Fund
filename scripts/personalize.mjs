import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve('public/cyan')

const replacements = [
  [/Cyan University/g, 'TDYU Endowment Fund'],
  [/Cyan university/g, 'TDYU Endowment Fund'],
  [/CYAN UNIVERSITY/g, 'TDYU ENDOWMENT FUND'],
  [/univet\.rstheme\.com/g, 'localhost'],
  [/<link rel="preconnect" href="https:\/\/fonts\.gstatic\.com\/"[^>]*>/g, ''],
  [/<link rel="preconnect" href="https:\/\/fonts\.googleapis\.com\/"[^>]*>/g, ''],
  [/<link rel='dns-prefetch' href='http:\/\/fonts\.googleapis\.com\/' \/>/g, ''],
  [/https:\/\/fonts\.gstatic\.com\/[^)"'\s]+/g, ''],
]

// TDYU content patches for homepage visible copy (common English demo strings → UZ)
const contentPatches = [
  [/Discover Your Potential.*?Cyan/gis, 'TDYU'],
]

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(full, files)
    else if (/\.html?$/i.test(entry.name)) files.push(full)
  }
  return files
}

function personalize(html) {
  let out = html
  for (const [re, to] of replacements) out = out.replace(re, to)

  // Inject local font CSS + TDYU brand override after <head>
  if (out.includes('</head>') && !out.includes('tdyu-local-fonts.css')) {
    out = out.replace(
      '</head>',
      '<link rel="stylesheet" href="/tdyu-local-fonts.css" />\n<link rel="stylesheet" href="/tdyu-brand-overrides.css" />\n</head>',
    )
  }

  // Common menu labels → TDYU (Uzbek) where exact English demo labels appear
  const menuMap = [
    ['>Home<', '>Bosh sahifa<'],
    ['>About Us<', '>Missiya<'],
    ['>About us<', '>Missiya<'],
    ['>Programs<', '>Dasturlar<'],
    ['>Admissions<', '>Yordam<'],
    ['>Campus Life<', '>Alumni<'],
    ['>Research<', '>Loyihalar<'],
    ['>Pages<', '>Sahifalar<'],
    ['>Blog<', '>Yangiliklar<'],
    ['>Contact<', '>Aloqa<'],
    ['>Contact Us<', '>Aloqa<'],
    ['>Apply Now<', '>Xayriya<'],
    ['Apply Now', 'Xayriya'],
  ]
  for (const [a, b] of menuMap) out = out.split(a).join(b)

  return out
}

const files = walk(root)
let n = 0
for (const file of files) {
  const raw = fs.readFileSync(file, 'utf8')
  const next = personalize(raw)
  if (next !== raw) {
    fs.writeFileSync(file, next, 'utf8')
    n++
  }
}
console.log(`Personalized ${n}/${files.length} HTML files in public/cyan`)
