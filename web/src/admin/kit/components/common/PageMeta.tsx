'use client'

export default function PageMeta({ title }: { title: string; description?: string }) {
  if (typeof document !== 'undefined' && title) document.title = title
  return null
}

export function AppWrapper({ children }: { children: React.ReactNode }) {
  return children
}
