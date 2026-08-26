const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const files = [
  { key: 'Hisobotlar', rel: 'public/cyan/tuition-fee/index.html' },
  { key: 'Yordam', rel: 'public/cyan/how-to-apply/index.html' },
  { key: 'Huquqiy asos', rel: 'public/cyan/admission-requirements/index.html' },
];

function stripNoise(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ');
}

function decode(s) {
  return s
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n))
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCharCode(parseInt(h, 16)))
    .replace(/\s+/g, ' ')
    .trim();
}

function extractTagTexts(html, tag) {
  const re = new RegExp('<' + tag + '\\b[^>]*>([\\s\\S]*?)</' + tag + '>', 'gi');
  const out = [];
  let m;
  while ((m = re.exec(html))) {
    const t = decode(m[1].replace(/<[^>]+>/g, ' '));
    if (t) out.push(t);
  }
  return out;
}

function unique(arr) {
  const seen = new Set();
  const out = [];
  for (const x of arr) {
    if (!seen.has(x)) {
      seen.add(x);
      out.push(x);
    }
  }
  return out;
}

function isLatinHeavy(s) {
  const latin = (s.match(/[A-Za-z]/g) || []).length;
  const cyr = (s.match(/[\u0400-\u04FF]/g) || []).length;
  return latin >= 5 && latin > cyr;
}

function looksAdmissionOrEnglish(s) {
  return (
    isLatinHeavy(s) ||
    /tuition|admission|apply|application|requirement|university|student|fee|scholarship|deadline|document|transcript|diploma|exam|english|program|course|faculty|bachelor|master|phd|credit|semester|campus|enroll|register|search keyword|how to|welcome|intake|visa|workshop|annual|duration|remarks|frequency|submit|classes begin|opens|postgraduate|undergraduate|process|qabul|hisobot|yordam|huquqiy/i.test(
      s
    )
  );
}

const report = {};
for (const f of files) {
  const raw = fs.readFileSync(path.join(root, f.rel), 'utf8');
  const html = stripNoise(raw);

  const title = unique(extractTagTexts(html, 'title'));
  const h1 = unique(extractTagTexts(html, 'h1'));
  const h2 = unique(extractTagTexts(html, 'h2'));
  const h3 = unique(extractTagTexts(html, 'h3'));
  const h4 = unique(extractTagTexts(html, 'h4'));
  const h5 = unique(extractTagTexts(html, 'h5'));
  const h6 = unique(extractTagTexts(html, 'h6'));

  // hero subtitle: first meaningful p under breadcrumb/page title area
  const heroSubs = unique(
    [...(raw.match(/class="[^"]*(?:breadcrumb|page-title|banner)[^"]*"[\s\S]{0,2000}/gi) || [])]
      .flatMap((block) => extractTagTexts(block, 'p'))
      .concat(
        // also common hero tagline near h1
        (() => {
          const i = html.search(/<h1\b/i);
          if (i < 0) return [];
          return extractTagTexts(html.slice(i, i + 1500), 'p').slice(0, 2);
        })()
      )
  );

  const placeholders = unique(
    [...html.matchAll(/placeholder=["']([^"']*)["']/gi)].map((m) => decode(m[1]))
  );

  const paragraphs = unique(extractTagTexts(html, 'p'));
  const paraSnips = paragraphs
    .filter(looksAdmissionOrEnglish)
    .map((p) => (p.length > 120 ? p.slice(0, 120) : p));

  const tableCells = unique(
    [...html.matchAll(/<(td|th)\b[^>]*>([\s\S]*?)<\/\1>/gi)].map((m) =>
      decode(m[2].replace(/<[^>]+>/g, ' '))
    )
  );

  const listItems = unique(
    [...html.matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/gi)].map((m) =>
      decode(m[1].replace(/<[^>]+>/g, ' '))
    )
  );

  const dollars = unique(
    [...stripNoise(raw).matchAll(/\$[\d,]+(?:\.\d+)?(?:\s*[–-]\s*\$?[\d,]+(?:\.\d+)?)?/g)].map(
      (m) => m[0]
    )
  );

  const searchKw = unique(
    [...raw.matchAll(/Search\s+Keyword\.{0,3}/gi)].map((m) => m[0])
  );

  // latin-heavy text nodes (visible content leftovers)
  const latinNodes = unique(
    [...html.matchAll(/>([^<]*[A-Za-z]{4,}[^<]*)</g)]
      .map((m) => decode(m[1]))
      .filter((t) => {
        if (!t || t.length < 4 || t.length > 180) return false;
        if (
          /^(https?:|www\.|fa-|icon|col-|row|container|btn|menu|navbar|owl|swiper|rs-|elementor|wp-|e-)/i.test(
            t
          )
        )
          return false;
        if (/^[\d\s.,\-+()]+$/.test(t)) return false;
        if (/@(tdyu|gmail|yahoo)|^\+?\d[\d\s\-()]{6,}$/i.test(t)) return false;
        return isLatinHeavy(t) || /Search\s*Keyword/i.test(t);
      })
  );

  // content-focused list items (skip mega-menu noise with ⚠)
  const contentLis = listItems.filter(
    (li) =>
      !li.includes('⚠') &&
      looksAdmissionOrEnglish(li) &&
      li.length < 160 &&
      !/Missiya Missiya|Alumni Alumni|Loyihalar Loyihalar|Tadbirlar Tadbirlar|Sahifalar Alumni|6 ustun|Dasturlar Boshqaruv|Dasturlar Dasturlar|Yangiliklar ⚠|Others Qabul/i.test(
        li
      )
  );

  report[f.key] = {
    file: f.rel,
    title,
    h1,
    hero_subtitle: heroSubs,
    h2,
    h3,
    h4,
    h5,
    h6,
    paragraph_snippets_120: unique(paraSnips),
    all_paragraphs_full: paragraphs.filter(looksAdmissionOrEnglish),
    form_placeholders: placeholders,
    search_keyword_leftovers: searchKw.concat(
      placeholders.filter((p) => /search/i.test(p))
    ),
    dollar_amounts: dollars,
    table_cells_all: tableCells,
    table_english_or_fee_labels: tableCells.filter(
      (c) =>
        isLatinHeavy(c) ||
        /\$|USD|Hisobotlar|Duration|Remarks|Frequency|Annual|Summa|Yo‘nalish|To‘lov|Intake|Deadline|Opens|Begin|Session|Postgraduate|Undergraduate|One-time|Non-refundable|Document|Lab|Workshop|Business|Computer|Engineering|Nursing|PhD|MBA|MSc|BSc|BBA|BA –|MEng|MPA|MPH|Health|Arts|Social|Science|Accounting|Finance|Information|Electrical|English|Data|AI|Public|Management|Relations|Busines/i.test(
          c
        )
    ),
    content_list_items_flagged: contentLis,
    latin_heavy_visible_nodes: latinNodes,
  };
}

const out = path.join(__dirname, '_extract_endowment_strings.json');
fs.writeFileSync(out, JSON.stringify(report, null, 2), 'utf8');
console.log(JSON.stringify(report, null, 2));
