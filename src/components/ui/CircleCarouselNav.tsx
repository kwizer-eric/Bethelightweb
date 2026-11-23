function ChevronLeft() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
    </svg>
  )
}

function ChevronRight() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
    </svg>
  )
}

export function CircleCarouselNav({
  onPrev,
  onNext,
  canPrev,
  canNext,
  ariaLabel = 'Cards',
}: {
  onPrev: () => void
  onNext: () => void
  canPrev: boolean
  canNext: boolean
  ariaLabel?: string
}) {
  const btnClass =
    'inline-flex h-12 w-12 items-center justify-center rounded-full border border-ink/15 bg-white text-ink shadow-sm transition-colors hover:bg-ink/5 disabled:pointer-events-none disabled:opacity-35'

  return (
    <div className="flex justify-center gap-3" role="group" aria-label={ariaLabel}>
      <button
        type="button"
        aria-label="Previous"
        className={btnClass}
        disabled={!canPrev}
        onClick={onPrev}
      >
        <ChevronLeft />
      </button>
      <button
        type="button"
        aria-label="Next"
        className={btnClass}
        disabled={!canNext}
        onClick={onNext}
      >
        <ChevronRight />
      </button>
    </div>
  )
}