'use client'

import Image from 'next/image'

export const brandAssets = {
  mark: '/brand/endowment-seal.png',
  markWhite: '/brand/endowment-seal-white.png',
} as const

/** Rasmiy sarlavha — rasmdagi kabi, matn (logo emas) */
export const brandTitleLines = {
  uz: [
    'TOSHKENT DAVLAT YURIDIK',
    'UNIVERSITETINING',
    'MAQSADLI KAPITAL',
    '(ENDOWMENT FUND) JAMOAT',
    'FONDI',
  ],
  ru: [
    'ОБЩЕСТВЕННЫЙ ФОНД',
    'ЦЕЛЕВОГО КАПИТАЛА',
    '(ENDOWMENT FUND)',
    'ТАШКЕНТСКОГО ГОСУДАРСТВЕННОГО',
    'ЮРИДИЧЕСКОГО УНИВЕРСИТЕТА',
  ],
  en: [
    'TARGETED CAPITAL',
    'PUBLIC FUND',
    '(ENDOWMENT FUND)',
    'OF TASHKENT STATE',
    'UNIVERSITY OF LAW',
  ],
} as const

export type BrandLocale = keyof typeof brandTitleLines

type BrandLogoProps = {
  /** header = katta muhr + matn; footer/offcanvas = kichik; mark = faqat muhr */
  variant?: 'header' | 'headerWhite' | 'footer' | 'footerWhite' | 'mark' | 'markWhite'
  locale?: BrandLocale
  alt?: string
  className?: string
  priority?: boolean
}

const sealSize = {
  header: 114,
  headerWhite: 114,
  footer: 104,
  footerWhite: 104,
  mark: 28,
  markWhite: 28,
} as const

export function BrandLogo({
  variant = 'header',
  locale = 'uz',
  alt = 'TDYU Endowment Fund',
  className = '',
  priority,
}: BrandLogoProps) {
  const white = variant.endsWith('White') || variant === 'markWhite' || variant === 'footerWhite' || variant === 'headerWhite'
  const sealSrc = white ? brandAssets.markWhite : brandAssets.mark
  const size = sealSize[variant]
  const markOnly = variant === 'mark' || variant === 'markWhite'

  if (markOnly) {
    return (
      <Image
        src={sealSrc}
        alt={alt}
        width={size}
        height={size}
        className={['brand-seal', className].filter(Boolean).join(' ')}
        priority={priority}
        unoptimized
      />
    )
  }

  const lines = brandTitleLines[locale] || brandTitleLines.uz
  const tone = white ? 'is-white' : ''
  const density = variant.startsWith('footer') ? 'is-compact' : 'is-header'

  return (
    <span className={['brand-lockup', density, tone, className].filter(Boolean).join(' ')} aria-label={alt}>
      <Image
        src={sealSrc}
        alt=""
        width={size}
        height={size}
        className="brand-seal"
        priority={priority}
        unoptimized
      />
      <span className="brand-title" aria-hidden={false}>
        {lines.map((line) => (
          <span key={line} className="brand-title-line">
            {line}
          </span>
        ))}
      </span>
    </span>
  )
}
