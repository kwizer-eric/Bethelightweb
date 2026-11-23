import { Link } from 'react-router-dom'
import { Logo } from './Logo'

function HandHeartIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      className="h-9 w-9 text-accent"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M18 26v-6a4 4 0 0 1 8 0v6" />
      <path d="M14 26c0 6 6 12 10 14 4-2 10-8 10-14v-8a6 6 0 0 0-12 0v8Z" />
      <path d="M26 30c2 1 6 4 8 8" />
    </svg>
  )
}

export function HeroDonateCard() {
  const year = new Date().getFullYear()

  return (
    <div className="pointer-events-auto w-full max-w-[14.75rem] rounded-2xl bg-white px-5 py-7 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.35)] sm:max-w-[15.75rem] sm:py-8 lg:max-w-[16.75rem]">
      <div className="flex items-center justify-between gap-3">
        <Logo tone="ink" className="h-6 sm:h-7" />
        <span className="text-xs text-ink/45">• {year}</span>
      </div>

      <div className="mt-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#F2F2F2]">
        <HandHeartIcon />
      </div>

      <h2 className="mt-5 text-left text-lg leading-snug font-bold tracking-tight text-ink sm:text-xl">
        Be the reason a child hopes.
      </h2>
      <p className="mt-2 text-left text-sm leading-relaxed text-body">
        Supporting children through education and protection.
      </p>

      <Link
        to="/donate"
        className="mt-6 flex w-full items-center justify-start rounded-lg bg-accent px-4 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-accent/90"
      >
        Donate Now
      </Link>
    </div>
  )
}