import fs from 'node:fs'

const h = fs.readFileSync('public/cyan/blog/index.html', 'utf8')

const needles = [
  'Search Keyword',
  'Comments (',
  'Alumni Success Stories',
  'Categories',
  'Recent Posts',
  'Posts pagination',
  'Fond yangiliklari',
  'Yangiliklar Grid',
  'Yangiliklar Details',
  'Kampus imkoniyatlari',
  'Onlayn ta’lim',
  'Zamonaviy ta’lim',
  'Raqamli davrda',
  'Innovatsion tadqiqotlar',
  'Xalqaro o‘qish',
  'Archives',
]

for (const n of needles) {
  const i = h.indexOf(n)
  if (i < 0) {
    console.log('MISS', n)
    continue
  }
  console.log('\n===', n)
  console.log(JSON.stringify(h.slice(i, i + 200)))
}

// all h3 titles
const titles = [...h.matchAll(/<(h3)[^>]*>[\s\S]*?<a[^>]*>([^<]+)/g)].map((m) => m[2].trim())
console.log('\ntitles', titles)

const excerpts = [...h.matchAll(/<p>([^<]{20,300})<\/p>/g)].map((m) => m[1].trim())
console.log('\nexcerpts unique', [...new Set(excerpts)].slice(0, 15))
