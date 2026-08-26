import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve('public/cyan')

function walk(dir, exts, files = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const f = path.join(dir, e.name)
    if (e.isDirectory()) walk(f, exts, files)
    else if (exts.test(e.name)) files.push(f)
  }
  return files
}

const available = new Map()
function indexUploads(dir) {
  if (!fs.existsSync(dir)) return
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const f = path.join(dir, e.name)
    if (e.isDirectory()) indexUploads(f)
    else {
      const rel = '/cyan/' + path.relative(root, f).replace(/\\/g, '/')
      available.set(e.name, rel)
      const base = e.name.replace(/-\d+x\d+(?=\.[^.]+$)/, '')
      if (!/-\d+x\d+\./.test(e.name)) available.set('FULL:' + base, rel)
      if (!available.has('ANY:' + base)) available.set('ANY:' + base, rel)
    }
  }
}
indexUploads(path.join(root, 'wp-content', 'uploads'))

function resolveMissing(filename) {
  if (available.has(filename)) return available.get(filename)
  const base = filename.replace(/-\d+x\d+(?=\.[^.]+$)/, '')
  return available.get('FULL:' + base) || available.get('ANY:' + base) || null
}

function repair(text) {
  let out = text

  // Undo doubled cyan prefixes
  out = out.replace(/\/cyan\/(?:\/cyan\/)+/g, '/cyan/')
  out = out.replace(/\/cyan\/cyan\//g, '/cyan/')

  // localhost leftovers
  out = out.replace(/https?:\/\/localhost\/cyan\//gi, '/cyan/')

  // Broken attribute from over-translation
  out = out.replace(/rel="TahrirlashURI"/g, 'rel="EditURI"')
  out = out.replace(/rel='TahrirlashURI'/g, "rel='EditURI'")

  // Convert remaining relative upload paths to root-absolute /cyan/
  out = out.replace(/(["'])(?:\.\.\/)+wp-content\/uploads\//g, '$1/cyan/wp-content/uploads/')
  out = out.replace(/(["'])wp-content\/uploads\//g, '$1/cyan/wp-content/uploads/')

  // Fix missing resized files referenced under /cyan/wp-content/...
  out = out.replace(
    /\/cyan\/wp-content\/uploads\/[^"'()\s]+\.(?:png|jpe?g|webp|gif|svg)/gi,
    (full) => {
      const clean = full.split('?')[0]
      const abs = path.join(root, clean.replace(/^\/cyan\//, ''))
      if (fs.existsSync(abs)) return full
      const name = path.posix.basename(clean)
      return resolveMissing(name) || full
    },
  )

  // Avatar fallback
  out = out.replace(
    /cropped-avatar-96x96\.jpg/g,
    'sites/17/2025/12/Asset-2-11.png',
  )
  // If that created a weird path, normalize common avatar refs
  out = out.replace(
    /\/cyan\/wp-content\/uploads\/(?:\.\.\/)*sites\/17\/2025\/12\/Asset-2-11\.png/g,
    '/cyan/wp-content/uploads/sites/17/2025/12/Asset-2-11.png',
  )
  out = out.replace(
    /\/cyan\/wp-content\/uploads\/sites\/17\/sites\/17\//g,
    '/cyan/wp-content/uploads/sites/17/',
  )

  return out
}

const files = [...walk(root, /\.html?$/i), ...walk(root, /\.css$/i)]
let n = 0
for (const file of files) {
  const raw = fs.readFileSync(file, 'utf8')
  const next = repair(raw)
  if (next !== raw) {
    fs.writeFileSync(file, next)
    n++
  }
}
console.log(`Repaired ${n}/${files.length}`)

// quick sample
const about = fs.readFileSync(path.join(root, 'about-us', 'index.html'), 'utf8')
const bad = (about.match(/\/cyan\/(?:\/)?cyan\//g) || []).length
const sample = about.match(/src="(\/cyan\/[^"]+Asset-2-11\.png)"/)
console.log('doubled remaining in about-us:', bad, 'asset sample:', sample && sample[1])
console.log('file exists?', fs.existsSync(path.join(root, 'wp-content/uploads/sites/17/2025/12/Asset-2-11.png')))
