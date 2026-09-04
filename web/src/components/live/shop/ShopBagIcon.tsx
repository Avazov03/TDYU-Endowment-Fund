export function ShopBagIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6.5 8h11l-.7 11.2a2 2 0 0 1-2 1.8H9.2a2 2 0 0 1-2-1.8L6.5 8Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M9 8V6.4A3 3 0 0 1 12 3.5 3 3 0 0 1 15 6.4V8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  )
}
