'use client'

type BrandLogoProps = {
  variant?: 'full' | 'mark' | 'auth'
  className?: string
}

export default function BrandLogo({ variant = 'full', className = '' }: BrandLogoProps) {
  if (variant === 'mark') {
    return (
      <img
        src="/brand/tdyu-mark.svg"
        alt="TDYU"
        className={`h-10 w-10 shrink-0 object-contain ${className}`.trim()}
      />
    )
  }

  if (variant === 'auth') {
    return (
      <img
        src="/brand/tdyu-logo.svg"
        alt="TDYU Endowment"
        className={`h-16 w-auto object-contain brightness-0 invert ${className}`.trim()}
      />
    )
  }

  return (
    <span className={`inline-flex items-center gap-2 ${className}`.trim()}>
      <img src="/brand/tdyu-mark.svg" alt="" className="h-10 w-10 shrink-0 object-contain" />
      <span className="flex flex-col leading-tight">
        <span className="text-sm font-semibold text-gray-800 dark:text-white">TDYU Endowment</span>
        <span className="hidden text-xs text-slate-400 lg:block">Fond boshqaruvi</span>
      </span>
    </span>
  )
}
