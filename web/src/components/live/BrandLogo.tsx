'use client'

import Image from 'next/image'

export const brandAssets = {
  mark: '/brand/endowment-seal.png',
  markWhite: '/brand/endowment-seal-white.png',
  lockup: '/brand/endowment-logo-lockup.png',
  lockupWhite: '/brand/endowment-logo-lockup-white.png',
  wordmark: '/brand/endowment-logo.png',
  letterhead: '/brand/endowment-wordmark.png',
} as const

type BrandLogoProps = {
  variant?: 'lockup' | 'lockupWhite' | 'mark' | 'markWhite' | 'wordmark'
  alt?: string
  className?: string
  width?: number
  height?: number
  priority?: boolean
}

const defaults: Record<NonNullable<BrandLogoProps['variant']>, { width: number; height: number }> = {
  lockup: { width: 280, height: 60 },
  lockupWhite: { width: 220, height: 48 },
  mark: { width: 48, height: 48 },
  markWhite: { width: 48, height: 48 },
  wordmark: { width: 220, height: 60 },
}

export function BrandLogo({
  variant = 'lockup',
  alt = 'TDYU Endowment Fund',
  className,
  width,
  height,
  priority,
}: BrandLogoProps) {
  const size = defaults[variant]
  const w = width ?? size.width
  const h = height ?? size.height
  return (
    <Image
      src={brandAssets[variant]}
      alt={alt}
      width={w}
      height={h}
      className={className}
      priority={priority}
      unoptimized
    />
  )
}
