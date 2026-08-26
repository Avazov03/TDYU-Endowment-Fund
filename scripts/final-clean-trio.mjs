import fs from 'node:fs'

const pairs = [
  [
    ' With cutting-edge facilities modern laboratories and a vibrant learning environment we ensure that every student has the tools and support to excel academically and personally.',
    '.',
  ],
  [
    'ough cutting-edge research inclusive learning environments and global partnerships inspire change and foster sustainable development.',
    '',
  ],
  [
    'alue through modern facilities, expert faculty, and industry aligned curriculum making your investment in education both meaningful and future-focused.',
    '',
  ],
  [
    'ted faculty, modern facilities, and a supportive learning environment, we strive to prepare graduates who can positively impact society at both national and global levels. I invite',
    '',
  ],
]

for (const rel of ['about-us/index.html', 'mission-value/index.html', 'vice-chancellor/index.html']) {
  const f = `public/cyan/${rel}`
  let h = fs.readFileSync(f, 'utf8')
  let n = 0
  for (const [a, b] of pairs) {
    if (h.includes(a)) {
      n += h.split(a).length - 1
      h = h.split(a).join(b)
    }
  }
  // hide stuck preloader — Cyan DNA safe
  if (!h.includes('tdyu-hide-preloader')) {
    h = h.replace(
      '</head>',
      '<style id="tdyu-hide-preloader">#site-preloader{display:none!important;opacity:0!important;visibility:hidden!important;pointer-events:none!important}</style>\n</head>',
    )
  }
  fs.writeFileSync(f, h)
  console.log(rel, n)
}

// final english scan (visible)
for (const rel of ['about-us/index.html', 'mission-value/index.html', 'vice-chancellor/index.html']) {
  const h = fs.readFileSync(`public/cyan/${rel}`, 'utf8')
  let body = h.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '')
  const texts = [...body.matchAll(/>([^<]{25,220})</g)].map((m) => m[1].replace(/\s+/g, ' ').trim())
  const en = [
    ...new Set(
      texts.filter(
        (t) =>
          !/[{};]|wp-|elementor|sourceURL/.test(t) &&
          /\b(the|and|with|students|university|education|cutting|facilities|research|program|modern|faculty)\b/i.test(
            t,
          ),
      ),
    ),
  ]
  console.log('EN', rel, en.slice(0, 6))
}
