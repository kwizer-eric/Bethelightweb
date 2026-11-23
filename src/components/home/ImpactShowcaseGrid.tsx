import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FadeImage } from '../FadeImage'
import { CircleCarouselNav } from '../ui/CircleCarouselNav'
import { siteImages } from '../../assets/siteImages'
import type { StoryCardView } from '../../cms/storyCard'

export type ShowcaseCard = StoryCardView

const DEFAULT_CARDS: ShowcaseCard[] = [
  {
    badge: '4,500 FAMILIES REACHED',
    title: 'Rebuilding Hope Together',
    description: 'Local partnerships helped restore safe spaces for children and families.',
    image: siteImages.aboutCommunity,
    href: '/news/a-meal-that-changed-everything',
  },
  {
    badge: '9,200 FAMILIES SUPPORTED',
    title: 'Small Steps Toward Recovery',
    description:
      'Consistent support helped families regain stability after prolonged displacement and hardship.',
    image: siteImages.homeOurStory,
    href: '/news/back-to-school-back-to-hope',
  },
  {
    badge: '6,800 CHILDREN PROTECTED',
    title: 'Safe Spaces Restored',
    description:
      'Child-friendly spaces provided safety, support, and stability for vulnerable children.',
    image: siteImages.everyKidHero,
    href: '/news/mobile-clinic-reaches-remote-village',
  },
]

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

function ShowcaseCardView({
  card,
  showDescription,
}: {
  card: ShowcaseCard
  showDescription: boolean
}) {
  return (
    <Link to={card.href} className="relative block h-[480px] overflow-hidden rounded-lg">
      <div className="absolute inset-0 z-0">
        <FadeImage
          src={card.image}
          alt={card.title}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent"
          aria-hidden
        />
      </div>

      <div className="absolute inset-0 z-20 flex flex-col justify-end p-7">
        <span className="absolute top-5 right-5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#1C1C1C] shadow-md">
          <ArrowUpRight />
        </span>

        <span className="mb-3 w-fit rounded-full bg-accent px-3.5 py-1 text-[11px] font-bold tracking-wider text-ink uppercase">
          {card.badge}
        </span>

        <h3 className="text-xl font-bold tracking-tight text-white">{card.title}</h3>
        {showDescription ? (
          <p className="mt-2.5 text-sm leading-relaxed text-neutral-200">{card.description}</p>
        ) : null}
      </div>
    </Link>
  )
}

export function ImpactShowcaseGrid({ cards = DEFAULT_CARDS }: { cards?: ShowcaseCard[] }) {
  const [active, setActive] = useState(0)
  const count = cards.length

  useEffect(() => {
    setActive(0)
  }, [cards])

  const canPrev = active > 0
  const canNext = active < count - 1
  const current = cards[active] ?? cards[0]

  return (
    <div className="mx-auto max-w-[1280px]">
      <div className="md:hidden">
        {current ? (
          <div key={`${current.title}-${active}`}>
            <ShowcaseCardView card={current} showDescription={false} />
          </div>
        ) : null}
        {count > 1 ? (
          <div className="mt-8">
            <CircleCarouselNav
              ariaLabel="Story cards"
              canPrev={canPrev}
              canNext={canNext}
              onPrev={() => setActive((i) => Math.max(0, i - 1))}
              onNext={() => setActive((i) => Math.min(count - 1, i + 1))}
            />
          </div>
        ) : null}
      </div>

      <div className="hidden grid-cols-3 gap-6 md:grid">
        {cards.map((card) => (
          <ShowcaseCardView key={card.href + card.title} card={card} showDescription />
        ))}
      </div>
    </div>
  )
}

export { DEFAULT_CARDS as fallbackShowcaseCards }
