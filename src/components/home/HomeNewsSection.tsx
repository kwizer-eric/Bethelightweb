import { useMemo, useState } from 'react'
import { useCms } from '../../cms/CmsContext'
import { storyToCard } from '../../cms/storyCard'
import {
  ImpactShowcaseGrid,
  fallbackShowcaseCards,
} from './ImpactShowcaseGrid'

const STORIES_PER_PAGE = 3

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

function StoryCarouselNav({
  onPrev,
  onNext,
  canPrev,
  canNext,
}: {
  onPrev: () => void
  onNext: () => void
  canPrev: boolean
  canNext: boolean
}) {
  const btnClass =
    'inline-flex h-12 w-12 items-center justify-center rounded-full border border-ink bg-white text-ink transition-colors hover:bg-ink/5 disabled:pointer-events-none disabled:opacity-35'

  return (
    <div className="flex justify-center gap-3">
      <button
        type="button"
        aria-label="Previous stories"
        className={btnClass}
        disabled={!canPrev}
        onClick={onPrev}
      >
        <ChevronLeft />
      </button>
      <button
        type="button"
        aria-label="Next stories"
        className={btnClass}
        disabled={!canNext}
        onClick={onNext}
      >
        <ChevronRight />
      </button>
    </div>
  )
}

export function HomeNewsSection() {
  const { stories } = useCms()
  const [page, setPage] = useState(0)

  const allCards = useMemo(() => {
    if (stories.length === 0) return fallbackShowcaseCards
    return stories.map(storyToCard)
  }, [stories])

  const pageCount = useMemo(() => {
    if (allCards.length <= STORIES_PER_PAGE) return 1
    return Math.ceil(allCards.length / STORIES_PER_PAGE)
  }, [allCards.length])

  const canPrev = page > 0
  const canNext = page < pageCount - 1

  const pageCards = useMemo(() => {
    const start = page * STORIES_PER_PAGE
    return allCards.slice(start, start + STORIES_PER_PAGE)
  }, [allCards, page])

  return (
    <section className="border-b border-primary/15 bg-white py-20 lg:py-24">
      <div className="site-container">
        <div className="mx-auto max-w-[1280px] text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase sm:text-sm">
            Real stories
          </p>
          <h2 className="mt-6 text-4xl font-bold tracking-tight text-ink sm:mt-8 sm:text-5xl xl:text-6xl xl:leading-[1.08]">
            Stories behind
            <br />
            impact
          </h2>
        </div>

        <div className="mt-12 md:hidden lg:mt-16">
          <ImpactShowcaseGrid cards={allCards} />
        </div>

        <div className="mt-12 hidden md:block lg:mt-16">
          <ImpactShowcaseGrid key={page} cards={pageCards} />
          {pageCount > 1 ? (
            <div className="mt-10 flex justify-center sm:mt-12">
              <StoryCarouselNav
                canPrev={canPrev}
                canNext={canNext}
                onPrev={() => setPage((p) => Math.max(0, p - 1))}
                onNext={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
              />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
