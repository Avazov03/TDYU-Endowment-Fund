/**
 * Inject TDYU endowment content into Cyan pages.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { writePage } from './lib-shell.mjs'
import { brand } from './content-uz.mjs'
import {
  alumniMapBlock,
  alumniRegister,
  donateCalc,
  governanceBlock,
  grantsBlock,
  homeHero,
  legalBlock,
  missionBlock,
  newsBlock,
  pageHero,
  programsBlock,
  projectsBlock,
  reportsBlock,
  statsBar,
  storiesBlock,
  supportBlock,
  transparencyBlock,
} from './build-html.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const cyan = path.join(root, 'public/cyan')
const shellFrom = path.join(cyan, 'faculties/index.html')

if (!fs.existsSync(path.join(root, 'public/tdyu-endowment.js'))) {
  throw new Error('Missing public/tdyu-endowment.js')
}

const pages = [
  {
    out: path.join(cyan, 'index.html'),
    title: 'TDYU Endowment Fund — Bosh sahifa',
    body: [
      homeHero(),
      statsBar(),
      missionBlock({ full: false }),
      programsBlock({ limit: 6 }),
      projectsBlock({ limit: 3 }),
      transparencyBlock(),
      alumniMapBlock(),
      supportBlock(),
      newsBlock({ limit: 3 }),
      legalBlock(),
    ].join('\n'),
  },
  {
    out: path.join(cyan, 'about-us/index.html'),
    title: 'Missiya — TDYU Endowment Fund',
    body: [
      pageHero('Missiya', 'Fond nima uchun mavjud va qanday tamoyillar asosida ishlaydi.'),
      missionBlock({ full: true }),
      legalBlock(),
    ].join('\n'),
  },
  {
    out: path.join(cyan, 'mission-value/index.html'),
    title: 'Qadriyatlar — TDYU Endowment Fund',
    body: [
      pageHero('Missiya va qadriyatlar', 'Oltita ustun — fondning strategik yo‘nalishlari.'),
      missionBlock({ full: true }),
    ].join('\n'),
  },
  {
    out: path.join(cyan, 'all-programs/index.html'),
    title: 'Dasturlar — TDYU Endowment Fund',
    body: [
      pageHero('7 dastur', 'Stajirovka, stipendiya, tanlov, ilmiy loyiha, tadbir, infratuzilma, nashr.'),
      programsBlock(),
    ].join('\n'),
  },
  {
    out: path.join(cyan, 'research/index.html'),
    title: 'Loyihalar — TDYU Endowment Fund',
    body: [
      pageHero('Loyihalar', 'Jessup, Westminster, TSUL SHOP va boshqa amalga oshirilgan ishlar.'),
      projectsBlock(),
    ].join('\n'),
  },
  {
    out: path.join(cyan, 'researches/index.html'),
    title: 'Loyihalar arxivi — TDYU Endowment Fund',
    body: [
      pageHero('Loyihalar arxivi', 'Fond tomonidan qo‘llab-quvvatlangan tashabbuslar.'),
      projectsBlock(),
    ].join('\n'),
  },
  {
    out: path.join(cyan, 'vice-chancellor/index.html'),
    title: 'Boshqaruv — TDYU Endowment Fund',
    body: [
      pageHero('Boshqaruv', 'Vasiylik, Boshqaruv va Taftish kengashlari.'),
      governanceBlock(),
    ].join('\n'),
  },
  {
    out: path.join(cyan, 'faculty-members/index.html'),
    title: 'Kengash a’zolari — TDYU Endowment Fund',
    body: [
      pageHero('Boshqaruv organlari', 'Kollegial boshqaruv va nazorat.'),
      governanceBlock(),
    ].join('\n'),
  },
  {
    out: path.join(cyan, 'tuition-fee/index.html'),
    title: 'Hisobotlar — TDYU Endowment Fund',
    body: [
      pageHero('Hisobotlar va shaffoflik', 'Mablag‘ taqsimoti, yillik hisobot va audit.'),
      transparencyBlock(),
      reportsBlock(),
      legalBlock(),
    ].join('\n'),
  },
  {
    out: path.join(cyan, 'cost-financial-aid/index.html'),
    title: 'Shaffoflik — TDYU Endowment Fund',
    body: [
      pageHero('Shaffoflik', 'Mablag‘ manbalari va sarflash yo‘nalishlari.'),
      transparencyBlock(),
      reportsBlock(),
    ].join('\n'),
  },
  {
    out: path.join(cyan, 'scholarships/index.html'),
    title: 'Grantlar — TDYU Endowment Fund',
    body: [
      pageHero('Grantlar va stipendiyalar', '3 ta moliyaviy dastur va ariza formasi.'),
      grantsBlock(),
    ].join('\n'),
  },
  {
    out: path.join(cyan, 'alumni/index.html'),
    title: 'Alumni — TDYU Endowment Fund',
    body: [
      pageHero('Alumni', 'Dunyo bo‘ylab bitiruvchilar, hikoyalar va ro‘yxatdan o‘tish.'),
      alumniMapBlock(),
      storiesBlock(),
      alumniRegister(),
    ].join('\n'),
  },
  {
    out: path.join(cyan, 'all-alumni/index.html'),
    title: 'Alumni katalog — TDYU Endowment Fund',
    body: [
      pageHero('Alumni katalog', 'Bitiruvchilar tarmog‘i va muvaffaqiyat tarixlari.'),
      alumniMapBlock(),
      storiesBlock(),
    ].join('\n'),
  },
  {
    out: path.join(cyan, 'blog/index.html'),
    title: 'Yangiliklar — TDYU Endowment Fund',
    body: [
      pageHero('Yangiliklar', 'Fond tadbirlari va e’lonlar.'),
      newsBlock(),
    ].join('\n'),
  },
  {
    out: path.join(cyan, 'apply-now/index.html'),
    title: 'Yordam va xayriya — TDYU Endowment Fund',
    body: [
      pageHero('Yordam', 'Xayriya, alumni, homiylik va hamkorlik.'),
      supportBlock(),
      donateCalc(),
    ].join('\n'),
  },
  {
    out: path.join(cyan, 'contact/index.html'),
    title: 'Aloqa — TDYU Endowment Fund',
    body: [
      pageHero('Aloqa', brand.address),
      legalBlock(),
      supportBlock(),
    ].join('\n'),
  },
  {
    out: path.join(cyan, 'faq/index.html'),
    title: 'Yordam (FAQ) — TDYU Endowment Fund',
    body: [
      pageHero('Yordam', 'Ko‘p so‘raladigan savollar va qo‘llab-quvvatlash yo‘llari.'),
      supportBlock(),
      `<section class="tdyu-sec"><div class="tdyu-wrap">
        <div class="tdyu-grid-2">
          <article class="tdyu-card"><h3 style="margin-top:0;color:var(--tdyu-title)">Fond qanday tashkilot?</h3><p>A’zoligi bo‘lmagan jamoat fondi — NNO va jamoat fondlari to‘g‘risidagi qonunlar asosida.</p></article>
          <article class="tdyu-card"><h3 style="margin-top:0;color:var(--tdyu-title)">Xayriya qayerga ketadi?</h3><p>Asosan ta’lim, grantlar, xalqaro tadbirlar va ilmiy nashrlarga. Tafsilot — Hisobotlar sahifasida.</p></article>
          <article class="tdyu-card"><h3 style="margin-top:0;color:var(--tdyu-title)">Alumni bo‘lish mumkinmi?</h3><p>Ha — Alumni sahifasidagi forma orqali ro‘yxatdan o‘ting.</p></article>
          <article class="tdyu-card"><h3 style="margin-top:0;color:var(--tdyu-title)">Manzil qayerda?</h3><p>${brand.address}</p></article>
        </div>
      </div></section>`,
    ].join('\n'),
  },
]

for (const p of pages) {
  writePage({ outPath: p.out, title: p.title, bodyHtml: p.body, shellFrom })
  console.log('OK', path.relative(cyan, p.out))
}

console.log('Done. Pages:', pages.length)
