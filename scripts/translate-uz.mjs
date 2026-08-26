import fs from 'node:fs'
import path from 'node:path'
import { uzDict, titleFixes } from './uz-dict.mjs'

const root = path.resolve('public/cyan')

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(full, files)
    else if (/\.html?$/i.test(entry.name)) files.push(full)
  }
  return files
}

/** Protect script/style so we don't break JS/CSS */
function withProtectedBlocks(html, fn) {
  const blocks = []
  const masked = html.replace(/<(script|style)(\b[^>]*)>[\s\S]*?<\/\1>/gi, (m) => {
    const i = blocks.length
    blocks.push(m)
    return `@@BLOCK${i}@@`
  })
  let out = fn(masked)
  out = out.replace(/@@BLOCK(\d+)@@/g, (_, n) => blocks[Number(n)])
  return out
}

function translateHtml(html) {
  return withProtectedBlocks(html, (text) => {
    let out = text
    for (const [en, uz] of uzDict) {
      if (!en) continue
      // Exact phrase replace (global)
      if (out.includes(en)) out = out.split(en).join(uz)
    }
    for (const [re, to] of titleFixes) out = out.replace(re, to)

    // lang attribute
    out = out.replace(/lang="en-US"/g, 'lang="uz"')
    out = out.replace(/lang="en"/g, 'lang="uz"')

    // Common button/label leftovers in attributes
    out = out.replace(/placeholder="Search[^"]*"/gi, 'placeholder="Qidirish..."')
    out = out.replace(/placeholder="Your Name"/gi, 'placeholder="Ismingiz"')
    out = out.replace(/placeholder="Your Email"/gi, 'placeholder="Emailingiz"')
    out = out.replace(/placeholder="Your Message"/gi, 'placeholder="Xabaringiz"')
    out = out.replace(/placeholder="Email Address"/gi, 'placeholder="Elektron pochta"')
    out = out.replace(/aria-label="Search"/gi, 'aria-label="Qidirish"')
    out = out.replace(/aria-label="Close"/gi, 'aria-label="Yopish"')
    out = out.replace(/aria-label="Menu"/gi, 'aria-label="Menyu"')

    return out
  })
}

const files = walk(root)
let changed = 0
for (const file of files) {
  const raw = fs.readFileSync(file, 'utf8')
  const next = translateHtml(raw)
  if (next !== raw) {
    fs.writeFileSync(file, next, 'utf8')
    changed++
  }
}

console.log(`Tarjima: ${changed}/${files.length} HTML fayl yangilandi`)
