import fs from 'node:fs'

const h = fs.readFileSync('public/cyan/all-programs/index.html', 'utf8')

// visible text samples
const texts = [...h.matchAll(/>([^<]{4,200})</g)]
  .map((m) => m[1].replace(/\s+/g, ' ').trim())
  .filter((t) => t && !/^[\d\s.,$%]+$/.test(t))

const interesting = [...new Set(texts)].filter((t) =>
  /Dastur|stajirov|Stipendiya|Tanlov|Ilmiy|Faculty|Department|Program|Magistr|Bakalavr|Xalqaro|Filtr|criteria|level|Undergraduate|Graduate|PhD|LL\.|B\.Sc|MBA|Nursing|Education|Engineering|Law|Science/i.test(
    t,
  ),
)
console.log('interesting', interesting.length)
interesting.slice(0, 60).forEach((t) => console.log('·', t))

// menu Dasturlar children from index
const idx = fs.readFileSync('public/cyan/index.html', 'utf8')
const i = idx.indexOf('>Dasturlar</span>')
const chunk = idx.slice(i, i + 8000)
const labels = [...chunk.matchAll(/menu-item-text[^>]*>([^<]+)/g)].map((m) => m[1].trim())
console.log('\nmenu under/near Dasturlar:')
labels.slice(0, 25).forEach((l) => console.log(' ·', l))

// list program-related folders
const dirs = fs
  .readdirSync('public/cyan', { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name)
  .filter((n) => /program|course|llm|llb|faculty|department|bachelor|master/i.test(n))
console.log('\nfolders', dirs)
