import { PageHeroIntro } from '../components/layout/PageHeroIntro'
import { ImpactStoryCard } from '../components/ui/ImpactStoryCard'
import { useCms } from '../cms/CmsContext'
import { storyToCard } from '../cms/storyCard'
import { impactStoryMockCards } from '../data/impactStoryMocks'

export function StoriesPage() {
  const { stories } = useCms()

  const cards = stories.length > 0 ? stories.map(storyToCard) : impactStoryMockCards

  return (
    <div className="bg-warm-white text-ink">
      <section className="w-full border-b border-primary/15 bg-warm-white">
        <PageHeroIntro
          title={
            <>
              Together We
              <br />
              Thrive
            </>
          }
          description="Every contribution creates real opportunities for children affected by war and poverty."
        />

        <div className="site-container pb-16 sm:pb-20 lg:pb-24">
          <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:gap-6">
            {cards.map((card) => (
              <ImpactStoryCard
                key={card.href + card.title}
                {...card}
                imageAlt=""
                fillViewport
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
