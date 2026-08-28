import { DumpRuntime } from '@/components/DumpRuntime'
import type { DumpDoc } from '@/lib/dump'
import type { Locale } from '@/i18n/routing'

export function DumpView({ dump, locale }: { dump: DumpDoc; locale: Locale }) {
  return (
    <>
      {dump.inlineStyles.map((css, i) => (
        <style key={i} dangerouslySetInnerHTML={{ __html: css }} />
      ))}
      {dump.stylesheets.map((href) => (
        <link key={href} rel="stylesheet" href={href} />
      ))}
      <DumpRuntime bodyClass={dump.bodyClass} locale={locale} scripts={dump.scripts} />
      <div id="tdyu-dump-root" dangerouslySetInnerHTML={{ __html: dump.bodyHtml }} />
    </>
  )
}
