import { Link } from 'react-router-dom'
import { FadeImage } from '../FadeImage'

const DEFAULT_BADGE = 'REPORT'
const DEFAULT_TITLE = '2024 Diversity, Equity, and Inclusion Report'
const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80'
const DEFAULT_HREF = '/news'

export type ReportStyleCardProps = {
  badgeText?: string
  title?: string
  imageUrl?: string
  imageAlt?: string
  href?: string
  className?: string
  /** Muted green-gray labels (default) or solid black/ink for Our Story row */
  tone?: 'muted' | 'black'
  /** Text above image (default) or image above text */
  layout?: 'text-first' | 'image-first'
  /** Card fill — default gray panel or brand yellow */
  surface?: 'muted' | 'accent'
  cornerClass?: string
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

export function ReportStyleCard({
  badgeText = DEFAULT_BADGE,
  title = DEFAULT_TITLE,
  imageUrl = DEFAULT_IMAGE,
  imageAlt = '',
  href = DEFAULT_HREF,
  className = '',
  tone = 'muted',
  layout = 'text-first',
  surface = 'muted',
  cornerClass = 'rounded-3xl',
}: ReportStyleCardProps) {
  const ink = tone === 'black'
  const surfaceClass =
    surface === 'accent' ? 'bg-accent' : 'bg-[#F6F7F5]'

  const textBlock = (
    <div className="flex flex-1 flex-col px-6 pb-6">
      <div className="flex items-center justify-between gap-3">
        <span
          className={`inline-flex rounded-full border bg-transparent px-[14px] py-1 text-[10px] font-semibold tracking-[0.16em] uppercase ${
            surface === 'accent'
              ? 'border-ink/20 text-ink'
              : ink
                ? 'border-[#E2E5E1] text-ink'
                : 'border-[#E2E5E1] text-[#5C6860]'
          }`}
        >
          {badgeText}
        </span>
        <span
          className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white shadow-sm transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
            ink ? 'text-ink' : 'text-[#2B3B30]'
          }`}
          aria-hidden
        >
          <ArrowUpRight className="h-[18px] w-[18px]" />
        </span>
      </div>

      <h2
        className={`mt-5 text-xl leading-snug font-medium ${ink ? 'text-ink' : 'text-[#35473B]'}`}
      >
        {title}
      </h2>
    </div>
  )

  const imageBlock = (
    <div
      className={`h-[300px] overflow-hidden bg-[#E2E5E1] ${
        layout === 'image-first'
          ? 'mt-0 w-full'
          : 'mx-6 mt-9 rounded-t-2xl'
      }`}
    >
      <FadeImage
        src={imageUrl}
        alt={imageAlt}
        referrerPolicy="no-referrer"
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
      />
    </div>
  )

  return (
    <Link
      to={href}
      className={`group flex h-full w-full max-w-[380px] flex-col overflow-hidden text-left text-ink transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_-12px_rgba(43,59,48,0.18)] ${cornerClass} ${surfaceClass} ${className}`}
      aria-label={`${title} — ${badgeText}`}
    >
      {layout === 'image-first' ? (
        <>
          {imageBlock}
          <div className="pt-6">{textBlock}</div>
        </>
      ) : (
        <>
          <div className="pt-6">{textBlock}</div>
          {imageBlock}
        </>
      )}
    </Link>
  )
}