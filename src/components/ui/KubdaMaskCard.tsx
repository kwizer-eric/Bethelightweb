import { useId } from 'react'
import { Link } from 'react-router-dom'

const KUBDA_PATH =
  'M12.3697 14.05C12.8453 13.0748 13.3911 12.1306 14 11.2213V3.34625C12.7686 4.55792 11.6545 5.85645 10.681 7.23102C11.4171 4.75275 12.5497 2.41577 14 0.269897L14.0048 0H8.31268C7.83923 0.881104 7.41144 1.7851 7.03278 2.70972C6.65411 1.7851 6.22638 0.881104 5.75299 0H0V0.16687C1.48389 2.34088 2.64105 4.71301 3.38898 7.23102C2.39709 5.83044 1.25922 4.50879 0 3.27759V11.1174C0.637085 12.0585 1.20654 13.0375 1.70032 14.05H12.3697Z'

const DEFAULT_BADGE = 'RECOGNITION'
const DEFAULT_TITLE = 'Finovate Consulting Named a Agentforce Partner'
const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80'
const DEFAULT_HREF = '#'

export type KubdaMaskCardProps = {
  badgeText?: string
  title?: string
  imageUrl?: string
  imageAlt?: string
  href?: string
  className?: string
  /** Match reference lime vs site accent */
  tone?: 'reference' | 'brand'
}

function ArrowUpRight({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M7 17 17 7" />
      <path d="M7 7h10v10" />
    </svg>
  )
}

function KubdaMaskedPhoto({ src, alt, clipId }: { src: string; alt: string; clipId: string }) {
  return (
    <figure className="pointer-events-none absolute inset-x-0 top-0 z-0 flex h-[62%] items-center justify-center px-6 pt-6">
      <svg
        viewBox="0 0 14 15"
        className="h-full max-h-[17.5rem] w-auto overflow-visible transition-transform duration-500 ease-out group-hover:scale-105"
        role="img"
        aria-label={alt}
      >
        <defs>
          <clipPath id={clipId}>
            <path fillRule="evenodd" clipRule="evenodd" d={KUBDA_PATH} />
          </clipPath>
        </defs>
        <image
          href={src}
          x="-4"
          y="-4"
          width="22"
          height="23"
          preserveAspectRatio="xMidYMid slice"
          clipPath={`url(#${clipId})`}
        />
      </svg>
    </figure>
  )
}

export function KubdaMaskCard({
  badgeText = DEFAULT_BADGE,
  title = DEFAULT_TITLE,
  imageUrl = DEFAULT_IMAGE,
  imageAlt = '',
  href = DEFAULT_HREF,
  className = '',
  tone = 'brand',
}: KubdaMaskCardProps) {
  const clipId = useId().replace(/:/g, '')
  const isReference = tone === 'reference'
  const surface = isReference ? 'bg-[#B4EC1E]' : 'bg-accent'
  const badgeBorder = isReference ? 'border-[#2C4706]/30' : 'border-ink/20'
  const badgeTextClass = isReference ? 'text-[#233805]' : 'text-ink'
  const titleClass = isReference ? 'text-[#1E3304]' : 'text-ink'
  const arrowClass = isReference ? 'text-[#1E3304]' : 'text-ink'

  const inner = (
    <>
      <KubdaMaskedPhoto src={imageUrl} alt={imageAlt} clipId={clipId} />

      <div className="absolute inset-x-0 bottom-0 z-20 flex flex-col justify-end p-6">
        <span
          className={`mb-3 w-fit rounded-full border px-3.5 py-1 text-[10px] font-bold tracking-widest uppercase ${badgeBorder} ${badgeTextClass}`}
        >
          {badgeText}
        </span>
        <div className="flex items-end justify-between gap-4">
          <h3
            className={`text-lg leading-snug font-semibold tracking-tight md:text-xl ${titleClass}`}
          >
            {title}
          </h3>
          <span
            className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white shadow-sm transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${arrowClass}`}
            aria-hidden
          >
            <ArrowUpRight className="h-[18px] w-[18px]" />
          </span>
        </div>
      </div>
    </>
  )

  const shellClass = `group relative h-[440px] w-full max-w-[360px] cursor-pointer overflow-hidden rounded-3xl ${surface} ${className}`

  if (href.startsWith('http')) {
    return (
      <a href={href} className={shellClass} aria-label={`${title}, ${badgeText}`}>
        {inner}
      </a>
    )
  }

  return (
    <Link to={href} className={shellClass} aria-label={`${title}, ${badgeText}`}>
      {inner}
    </Link>
  )
}