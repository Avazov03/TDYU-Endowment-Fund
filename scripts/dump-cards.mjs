import fs from 'node:fs'

function dumpCards(file, patterns) {
  const h = fs.readFileSync(file, 'utf8')
  console.log('\n##', file)
  for (const p of patterns) {
    const re = new RegExp(p, 'gi')
    let m
    let c = 0
    while ((m = re.exec(h)) && c < 20) {
      console.log(JSON.stringify(m[0].slice(0, 180)))
      c++
    }
  }
}

dumpCards('public/cyan/alumni/index.html', [
  'entry-title[^>]*>[^<]+',
  '<h[23][^>]*>[^<]{5,120}',
  'Alumni[^<]{0,80}',
  'Esther|Jerome|Arlene|David|Margaret|Floyd|Brooklyn|Cameron',
])

dumpCards('public/cyan/events/index.html', [
  'entry-title[^>]*>[^<]+',
  'rs-title[^>]*>[^<]+',
  'Conference|Forum|Ceremony|Summit|Symposium',
])

dumpCards('public/cyan/research/index.html', [
  'entry-title[^>]*>[^<]+',
  'By \\d Researchers',
  'Loyiha[^<]{0,80}',
  'Philip|Jessup|Westminster|Koreya|TSUL',
])

dumpCards('public/cyan/scholarships/index.html', [
  'e-n-accordion-item-title-text[^>]*>[^<]+',
  'elementor-tab-title[^>]*>[^<]+',
  'All Intake|6 Month|Deadline|Required Documents',
  'Merit-Based|Innovation|Specialized|Program-Specific',
])
