'use client'

type BrandLogoProps = {
  variant?: 'full' | 'mark' | 'auth'
  className?: string
}

export default function BrandLogo({ variant = 'full', className = '' }: BrandLogoProps) {
  if (variant === 'mark') {
    return (
      <img
        src="/brand/endowment-seal.png"
        alt="TDYU"
        className={`h-8 w-8 shrink-0 object-contain ${className}`.trim()}
      />
    )
  }

  if (variant === 'auth') {
    return (
      <span className={`inline-flex items-center gap-2 ${className}`.trim()}>
        <img src="/brand/endowment-seal-white.png" alt="" className="h-9 w-9 shrink-0 object-contain" />
        <span className="text-sm font-semibold text-white">TDYU Endowment</span>
      </span>
    )
  }

  return (
    <span className={`inline-flex items-center gap-2 ${className}`.trim()}>
      <img src="/brand/endowment-seal.png" alt="" className="h-8 w-8 shrink-0 object-contain" />
      <span className="flex flex-col leading-tight">
        <span className="text-sm font-semibold text-gray-800 dark:text-white">TDYU Endowment</span>
        <span className="hidden text-xs text-slate-400 lg:block">Fond boshqaruvi</span>
      </span>
    </span>
  )
}
