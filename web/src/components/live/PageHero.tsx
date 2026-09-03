import { Link } from '@/i18n/navigation'

export function PageHero({
  title,
  crumbs,
  lead,
  image,
  objectPosition = '0% 50%',
  height = 441,
  deco,
}: {
  title: string
  crumbs: { href: string; label: string }[]
  lead?: string
  image: string
  objectPosition?: string
  height?: number
  deco?: string
}) {
  return (
    <section
      className="relative text-white overflow-hidden bg-tdyu"
      style={{
        height,
        backgroundImage: `url(${image})`,
        backgroundPosition: objectPosition,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(rgba(0, 25, 44, 0) -3%, rgb(0, 25, 44) 133.75%)' }}
        aria-hidden
      />
      <div className="live-wrap relative z-10 h-full pt-[110px] pb-[115px]">
        <nav className="text-[16px] leading-7 text-white mb-5" aria-label="breadcrumb">
          {crumbs.map((c, i) => (
            <span key={c.href}>
              {i > 0 ? <span className="px-2">{'>>'}</span> : null}
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
        <h1 className="!text-white font-[Bitter,Georgia,serif] text-[56px] leading-[66px] !font-medium" style={{ marginBottom: 20 }}>{title}</h1>
        <span className="block w-[145px] h-[2px] bg-white" style={{ marginBottom: 25 }} aria-hidden />
        {lead ? <p className="max-w-[560px] text-white/[0.9] text-[16px] leading-7 font-normal">{lead}</p> : null}
      </div>
      {deco ? (
        <img src={deco} alt="" className="page-hero-deco" aria-hidden />
      ) : null}
    </section>
  )
}
