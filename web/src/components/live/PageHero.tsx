import Image from 'next/image'
import { Link } from '@/i18n/navigation'

export function PageHero({
  title,
  crumbs,
  lead,
  image,
}: {
  title: string
  crumbs: { href: string; label: string }[]
  lead?: string
  image: string
}) {
  return (
    <section className="relative min-h-[280px] md:min-h-[340px] text-white overflow-hidden">
      <Image src={image} alt="" fill priority className="object-cover object-center" sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#08384d]/80 via-[#0c5776]/45 to-black/10" />
      <div className="live-wrap relative z-10 py-16 md:py-20">
        <nav className="text-sm text-white/85 mb-3" aria-label="breadcrumb">
          {crumbs.map((c, i) => (
            <span key={c.href}>
              {i > 0 ? <span className="px-2 opacity-70">»</span> : null}
              {i === crumbs.length - 1 ? (
                <span>{c.label}</span>
              ) : (
                <Link href={c.href} className="hover:text-white">
                  {c.label}
                </Link>
              )}
            </span>
          ))}
        </nav>
        <h1 className="!text-white text-[clamp(2rem,4vw,3rem)] mb-3">{title}</h1>
        <span className="block w-16 h-px bg-white/80 mb-4" aria-hidden />
        {lead ? <p className="max-w-[42ch] text-white/95 text-[15px] leading-7">{lead}</p> : null}
      </div>
    </section>
  )
}
