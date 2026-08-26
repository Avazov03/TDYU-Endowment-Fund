import fs from 'node:fs'
const h = fs.readFileSync('public/cyan/index.html', 'utf8')
for (const n of ['Libraries', 'Kutubxonalar', 'Faq', 'Savol-javob', 'Gallery', 'Galereya', 'Sahifalar']) {
  const i = h.indexOf(n)
  console.log(n, i < 0 ? 'NO' : JSON.stringify(h.slice(Math.max(0, i - 60), i + 40)))
}

// verify no corruption on patched pages
for (const p of ['alumni', 'research', 'scholarships', 'events', 'libraries', 'faq', 'gallery']) {
  const x = fs.readFileSync(`public/cyan/${p}/index.html`, 'utf8')
  const bad = /ochiladiclass|class=\s*>|<\s+div/.test(x)
  const en = [...x.matchAll(/>([^<]{20,160})</g)]
    .map((m) => m[1].replace(/\s+/g, ' ').trim())
    .filter((t) =>
      /\b(Welcome to our|Campus Life|Are there scholarships|How do I apply|Life at Our|Innovative Research|Esther Howard|Merit-Based|Student Activity Fee)\b/i.test(
        t,
      ),
    )
  console.log(p, 'corrupt?', bad, 'EN left', en.length, en.slice(0, 3))
}
