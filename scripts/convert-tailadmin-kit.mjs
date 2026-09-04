import fs from 'node:fs'
import path from 'node:path'

const kit = path.resolve('web/src/admin/kit')

function walk(dir) {
  const out = []
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name)
    if (fs.statSync(p).isDirectory()) out.push(...walk(p))
    else out.push(p)
  }
  return out
}

function pascalFromFile(file) {
  return path
    .basename(file, '.svg')
    .split(/[-_]/)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join('')
}

function jsxifySvg(raw) {
  let s = raw.trim()
  s = s
    .replace(/fill-rule=/g, 'fillRule=')
    .replace(/clip-rule=/g, 'clipRule=')
    .replace(/stroke-width=/g, 'strokeWidth=')
    .replace(/stroke-linecap=/g, 'strokeLinecap=')
    .replace(/stroke-linejoin=/g, 'strokeLinejoin=')
    .replace(/stroke-miterlimit=/g, 'strokeMiterlimit=')
    .replace(/clip-path=/g, 'clipPath=')
    .replace(/fill-opacity=/g, 'fillOpacity=')
    .replace(/stroke-opacity=/g, 'strokeOpacity=')
    .replace(/class=/g, 'className=')
    .replace(/xmlns:xlink=/g, 'xmlnsXlink=')
    .replace(/xml:space=/g, 'xmlSpace=')
  s = s.replace(/<svg\b([^>]*)>/, (_m, attrs) => `<svg${attrs} {...props}>`)
  return s
}

const iconDir = path.join(kit, 'icons')
const svgFiles = fs.readdirSync(iconDir).filter((f) => f.endsWith('.svg'))
const exportMap = {
  'plus.svg': 'PlusIcon',
  'close.svg': 'CloseIcon',
  'box.svg': 'BoxIcon',
  'check-circle.svg': 'CheckCircleIcon',
  'alert.svg': 'AlertIcon',
  'info.svg': 'InfoIcon',
  'info-error.svg': 'ErrorIcon',
  'bolt.svg': 'BoltIcon',
  'arrow-up.svg': 'ArrowUpIcon',
  'arrow-down.svg': 'ArrowDownIcon',
  'folder.svg': 'FolderIcon',
  'videos.svg': 'VideoIcon',
  'audio.svg': 'AudioIcon',
  'grid.svg': 'GridIcon',
  'file.svg': 'FileIcon',
  'download.svg': 'DownloadIcon',
  'arrow-right.svg': 'ArrowRightIcon',
  'group.svg': 'GroupIcon',
  'box-line.svg': 'BoxIconLine',
  'shooting-star.svg': 'ShootingStarIcon',
  'dollar-line.svg': 'DollarLineIcon',
  'trash.svg': 'TrashBinIcon',
  'angle-up.svg': 'AngleUpIcon',
  'angle-down.svg': 'AngleDownIcon',
  'angle-left.svg': 'AngleLeftIcon',
  'angle-right.svg': 'AngleRightIcon',
  'pencil.svg': 'PencilIcon',
  'check-line.svg': 'CheckLineIcon',
  'close-line.svg': 'CloseLineIcon',
  'chevron-down.svg': 'ChevronDownIcon',
  'chevron-up.svg': 'ChevronUpIcon',
  'paper-plane.svg': 'PaperPlaneIcon',
  'lock.svg': 'LockIcon',
  'envelope.svg': 'EnvelopeIcon',
  'user-line.svg': 'UserIcon',
  'calender-line.svg': 'CalenderIcon',
  'eye.svg': 'EyeIcon',
  'eye-close.svg': 'EyeCloseIcon',
  'time.svg': 'TimeIcon',
  'copy.svg': 'CopyIcon',
  'chevron-left.svg': 'ChevronLeftIcon',
  'user-circle.svg': 'UserCircleIcon',
  'task-icon.svg': 'TaskIcon',
  'list.svg': 'ListIcon',
  'table.svg': 'TableIcon',
  'page.svg': 'PageIcon',
  'pie-chart.svg': 'PieChartIcon',
  'box-cube.svg': 'BoxCubeIcon',
  'plug-in.svg': 'PlugInIcon',
  'docs.svg': 'DocsIcon',
  'mail-line.svg': 'MailIcon',
  'horizontal-dots.svg': 'HorizontaLDots',
  'chat.svg': 'ChatIcon',
  'maps.svg': 'MapsIcon',
  'moredot.svg': 'MoreDotIcon',
  'alert-hexa.svg': 'AlertHexaIcon',
  'info-hexa.svg': 'ErrorHexaIcon',
}

for (const file of svgFiles) {
  const name = exportMap[file] || `${pascalFromFile(file)}Icon`
  const raw = fs.readFileSync(path.join(iconDir, file), 'utf8')
  const tsx = `'use client'\nimport type { SVGProps } from 'react'\nexport default function ${name}(props: SVGProps<SVGSVGElement>) {\n  return (\n    ${jsxifySvg(raw)}\n  )\n}\n`
  fs.writeFileSync(path.join(iconDir, `${name}.tsx`), tsx)
}

const indexLines = ["'use client'"]
for (const [file, name] of Object.entries(exportMap)) {
  if (!fs.existsSync(path.join(iconDir, file))) continue
  indexLines.push(`export { default as ${name} } from './${name}'`)
}
fs.writeFileSync(path.join(iconDir, 'index.ts'), `${indexLines.join('\n')}\n`)

for (const file of walk(kit).filter((f) => f.endsWith('.tsx') || f.endsWith('.ts'))) {
  if (file.includes(`${path.sep}icons${path.sep}`) && file.endsWith('.tsx') && path.basename(file) !== 'index.ts') {
    continue
  }
  let text = fs.readFileSync(file, 'utf8')
  const orig = text
  if (!text.startsWith("'use client'") && !text.startsWith('"use client"') && file.endsWith('.tsx')) {
    text = `'use client'\n${text}`
  }
  text = text.replaceAll('from "react-router"', 'from "@/admin/kit/next-nav"')
  text = text.replaceAll("from 'react-router'", "from '@/admin/kit/next-nav'")
  text = text.replaceAll('from "../../i18n/I18nProvider"', 'from "@/admin/kit/i18n/I18nProvider"')
  text = text.replaceAll("from '../../i18n/I18nProvider'", "from '@/admin/kit/i18n/I18nProvider'")
  text = text.replaceAll('from "../i18n/I18nProvider"', 'from "@/admin/kit/i18n/I18nProvider"')
  text = text.replaceAll('from "../../i18n/translations"', 'from "@/admin/kit/i18n/translations"')
  text = text.replaceAll("from '../../i18n/translations'", "from '@/admin/kit/i18n/translations'")
  text = text.replaceAll('from "../../hooks/useAdminDashboard"', 'from "@/admin/kit/hooks/useAdminDashboard"')
  text = text.replaceAll('from "../../context/DemoWorkspace"', 'from "@/admin/kit/context/DemoWorkspace"')
  text = text.replaceAll('from "react-apexcharts"', 'from "@/admin/kit/Chart"')
  text = text.replaceAll("from 'react-apexcharts'", "from '@/admin/kit/Chart'")
  text = text.replaceAll('src="/images/', 'src="/admin-kit/images/')
  text = text.replaceAll("src='/images/", "src='/admin-kit/images/")
  if (text !== orig) fs.writeFileSync(file, text)
}

const css = path.join(kit, 'index.css')
let cssText = fs.readFileSync(css, 'utf8')
cssText = cssText.replace(
  /  body \{\s*@apply relative font-normal font-outfit z-1 bg-gray-50;\s*\}/,
  `  .admin-root {
    @apply relative font-normal font-outfit z-1 bg-gray-50 min-h-screen text-gray-800;
  }`,
)
fs.writeFileSync(css, cssText)

console.log('kit converted', svgFiles.length, 'icons')
