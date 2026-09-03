import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'

const GALLERY = [
  '/media/home/gallery-1.jpg',
  '/media/home/gallery-2.jpg',
  '/media/home/gallery-3.jpg',
  '/media/home/gallery-4.jpg',
  '/media/home/gallery-5.jpg',
  '/media/home/gallery-6.jpg',
] as const

const CTA = {
  uz: 'Alumni xarita',
  ru: 'Карта Alumni',
  en: 'Alumni map',
} as const

function MapDotsIcon() {
  return (
    <svg width="18" height="15" viewBox="0 0 18 15" fill="currentColor" aria-hidden>
      <path d="M10.5 7.5C10.5 8.32843 9.82843 9 9 9C8.17157 9 7.5 8.32843 7.5 7.5C7.5 6.67157 8.17157 6 9 6C9.82843 6 10.5 6.67157 10.5 7.5Z" />
      <path d="M10.5 13.5C10.5 14.3284 9.82843 15 9 15C8.17157 15 7.5 14.3284 7.5 13.5C7.5 12.6716 8.17157 12 9 12C9.82843 12 10.5 12.6716 10.5 13.5Z" />
      <path d="M3 7.5C3 8.32843 2.32843 9 1.5 9C0.671573 9 0 8.32843 0 7.5C0 6.67157 0.671573 6 1.5 6C2.32843 6 3 6.67157 3 7.5Z" />
      <path d="M18 7.5C18 8.32843 17.3284 9 16.5 9C15.6716 9 15 8.32843 15 7.5C15 6.67157 15.6716 6 16.5 6C17.3284 6 18 6.67157 18 7.5Z" />
      <path d="M10.5 1.5C10.5 2.32843 9.82843 3 9 3C8.17157 3 7.5 2.32843 7.5 1.5C7.5 0.671573 8.17157 0 9 0C9.82843 0 10.5 0.671573 10.5 1.5Z" />
    </svg>
  )
}

export function GalleryStrip({ locale }: { locale: Locale }) {
  const label = CTA[locale]

  return (
    <section className="gallery-strip" aria-label={label}>
      <div className="gallery-strip-grid">
        {GALLERY.map((src) => (
          <div key={src} className="gallery-strip-cell">
            <Image src={src} alt="" fill className="object-cover" sizes="16vw" unoptimized />
          </div>
        ))}
      </div>
      <Link href="/alumni" className="gallery-strip-cta">
        <span className="gallery-strip-cta-icon">
          <MapDotsIcon />
        </span>
        <span className="gallery-strip-cta-text">{label}</span>
      </Link>
    </section>
  )
}
