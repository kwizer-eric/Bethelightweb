import { Link } from 'react-router-dom'
import { FadeImage } from '../FadeImage'

export type ImpactStoryCardProps = {
  badge: string
  title: string
  description: string
  image: string
  href: string
  className?: string
  imageAlt?: string
  /** Card uses full dynamic viewport height */
  fillViewport?: boolean
}

function ArrowUpRight() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[18px] w-[18px]"
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

export function ImpactStoryCard({
  badge,
  title,
  description,
  image,
  href,
  className = '',
  imageAlt = '',
  fillViewport = false,
}: ImpactStoryCardProps) {
  const heightClass = fillViewport
    ? 'h-[90dvh] min-h-[90dvh]'
    : 'min-h-[26rem] sm:min-h-[30rem] lg:min-h-[32rem]'

  return (
    <Link
      to={href}
      className={`group relative block overflow-hidden rounded-2xl ${heightClass} ${className}`}
      aria-label={`${title}, ${badge}`}
    >
      <FadeImage
        src={image}
        alt={imageAlt}
        referrerPolicy="no-referrer"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
      />

      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/85 via-black/45 to-transparent"
        aria-hidden
      />

      <span
        className="absolute top-5 right-5 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-ink shadow-md transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        aria-hidden
      >
        <ArrowUpRight />
      </span>

      <div className="absolute inset-x-0 bottom-0 z-10 p-6 sm:p-8">
        <span className="mb-4 inline-flex rounded-full bg-accent px-3.5 py-1 text-[11px] font-bold tracking-wider text-ink uppercase">
          {badge}
        </span>

        <h3 className="text-2xl font-bold tracking-tight text-white sm:text-[1.65rem] sm:leading-tight">
          {title}
        </h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-white/90">{description}</p>
      </div>
    </Link>
  )
}