import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve('public/cyan')
const uploads = path.join(root, 'wp-content', 'uploads', 'sites', '17')

function walk(dir, exts, files = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const f = path.join(dir, e.name)
    if (e.isDirectory()) walk(f, exts, files)
    else if (exts.test(e.name)) files.push(f)
  }
  return files
}

/** Build index of available upload basenames */
const available = new Map() // basename -> relative from cyan root with /cyan prefix path
function indexUploads(dir) {
  if (!fs.existsSync(dir)) return
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const f = path.join(dir, e.name)
    if (e.isDirectory()) indexUploads(f)
    else {
      const rel = path.relative(root, f).replace(/\\/g, '/')
      available.set(e.name, '/cyan/' + rel)
      // also map without size suffix for fallback
      const base = e.name.replace(/-\d+x\d+(?=\.[^.]+$)/, '')
      if (!available.has('FULL:' + base) && !/-\d+x\d+\./.test(e.name)) {
        available.set('FULL:' + base, '/cyan/' + rel)
      }
      if (!available.has('ANY:' + base)) available.set('ANY:' + base, '/cyan/' + rel)
    }
  }
}
indexUploads(path.join(root, 'wp-content', 'uploads'))

function resolveMissing(filename) {
  if (available.has(filename)) return available.get(filename)
  const base = filename.replace(/-\d+x\d+(?=\.[^.]+$)/, '')
  if (available.has('FULL:' + base)) return available.get('FULL:' + base)
  if (available.has('ANY:' + base)) return available.get('ANY:' + base)
  // try 150x150 etc already indexed by exact name under ANY after full scan
  const candidates = [...available.keys()].filter(
    (k) => !k.startsWith('FULL:') && !k.startsWith('ANY:') && k.startsWith(base.replace(/\.[^.]+$/, '')),
  )
  if (candidates.length) {
    // prefer same extension
    const ext = path.extname(filename)
    const same = candidates.find((c) => c.endsWith(ext) && !/-\d+x\d+\./.test(c)) || candidates[0]
    return available.get(same)
  }
  return null
}

function fixContent(text) {
  let out = text

  // Absolute localhost → root-absolute /cyan/
  out = out.replace(/https?:\/\/localhost\/cyan\//gi, '/cyan/')

  // Broken relative upload without sites/17
  out = out.replace(
    /(?:\.\.\/)+wp-content\/uploads\/2025\//g,
    '/cyan/wp-content/uploads/sites/17/2025/',
  )
  out = out.replace(
    /(?:\.\.\/)+wp-content\/uploads\/sites\/17\//g,
    '/cyan/wp-content/uploads/sites/17/',
  )

  // Fix srcset / src entries that point to missing resized files
  out = out.replace(
    /(\/cyan\/wp-content\/uploads\/sites\/17\/[^\s"'(),]+\.(?:png|jpe?g|webp|gif|svg))/gi,
    (full) => {
      const name = path.posix.basename(full.split('?')[0])
      const abs = path.join(root, full.replace(/^\/cyan\//, '').split('?')[0])
      if (fs.existsSync(abs)) return full
      const alt = resolveMissing(name)
      return alt || full
    },
  )

  // Also relative wp-content paths that are missing resized variants
  out = out.replace(
    /((?:\.\.\/)*wp-content\/uploads\/sites\/17\/[^\s"'(),]+\.(?:png|jpe?g|webp|gif|svg))/gi,
    (full) => {
      // leave relative if file exists relative is hard; convert to /cyan/ absolute
      const cleaned = full.replace(/^(?:\.\.\/)+/, '').replace(/^wp-content\//, 'wp-content/')
      const name = path.posix.basename(cleaned.split('?')[0])
      const asRoot = '/cyan/' + cleaned.replace(/\\/g, '/')
      const abs = path.join(root, cleaned.split('?')[0])
      if (fs.existsSync(abs)) return asRoot
      const alt = resolveMissing(name)
      return alt || asRoot
    },
  )

  return out
}

const files = [
  ...walk(root, /\.html?$/i),
  ...walk(root, /\.css$/i),
]

let changed = 0
for (const file of files) {
  const raw = fs.readFileSync(file, 'utf8')
  const next = fixContent(raw)
  if (next !== raw) {
    fs.writeFileSync(file, next)
    changed++
  }
}

console.log(`Asset fix: ${changed}/${files.length} files`)
console.log('Sample resolve gallery-img2-min-300x300:', resolveMissing('gallery-img2-min-300x300.jpg'))
console.log('Sample resolve cropped-avatar:', resolveMissing('cropped-avatar-96x96.jpg'))
