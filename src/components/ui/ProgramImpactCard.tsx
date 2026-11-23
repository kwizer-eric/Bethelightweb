import { Link } from 'react-router-dom'
import { FadeImage } from '../FadeImage'

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

export type ProgramImpactCardProps = {
  title: string
  description: string
  metric: string
  imageUrl: string
  imageAlt: string
  href: string
}

export function ProgramImpactCard({
  title,
  description,
  metric,
  imageUrl,
  imageAlt,
  href,
}: ProgramImpactCardProps) {
  return (
    <Link
      to={href}
      className="group flex h-full min-h-[28rem] flex-col overflow-hidden rounded-lg bg-black text-left transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_16px_48px_-16px_rgba(0,0,0,0.55)] sm:min-h-[30rem] lg:min-h-[32rem]"
      aria-label={`${title}, ${metric}`}
    >
      <div className="aspect-[4/3] min-h-[13.5rem] w-full shrink-0 overflow-hidden bg-ink/30 sm:min-h-[15rem] lg:min-h-[17rem]">
        <FadeImage
          src={imageUrl}
          alt={imageAlt}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>

      <div className="relative flex min-h-[15rem] flex-1 flex-col overflow-hidden bg-black sm:min-h-[16rem] lg:min-h-[17rem]">
        <div
          className="absolute inset-0 z-10 hidden -translate-y-full bg-primary transition-transform duration-500 ease-out will-change-transform md:block md:group-hover:translate-y-0"
          aria-hidden
        />

        <div className="relative z-20 flex flex-1 flex-col p-6 sm:p-10">
          <h3 className="text-xl font-bold tracking-tight text-warm-white transition-colors duration-300 sm:text-2xl">
            {title}
          </h3>
          <p className="mt-4 text-base leading-relaxed text-warm-white/85 transition-colors duration-300">
            {description}
          </p>

          <div className="mt-auto border-t border-warm-white/20 pt-5 transition-colors duration-300">
            <p className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.12em] text-warm-white/90 uppercase sm:text-xs">
              <ArrowUpRight className="h-4 w-4 shrink-0 text-warm-white/90 transition-transform duration-300 md:group-hover:translate-x-0.5 md:group-hover:-translate-y-0.5" />
              {metric}
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}