import { Link } from 'react-router-dom'
import { site } from '../../data/site'

const STORY_IMAGE =
  'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1920&q=85'

export function AboutProgramsSection() {
  return (
    <section id="our-story" className="relative w-full overflow-hidden bg-black">
      <div className="site-container relative z-10 grid grid-cols-1 lg:min-h-[91vh] lg:max-h-dvh lg:grid-cols-2 lg:items-stretch lg:gap-14">
        <div className="relative flex flex-col justify-center gap-6 py-14 pb-20 sm:py-16 sm:pb-24 lg:py-20 lg:pb-24">
          <div>
            <span className="inline-flex bg-accent px-4 py-1.5 text-sm font-semibold text-ink">
              Our Story
            </span>
            <h2 className="mt-5 max-w-md text-3xl font-bold leading-[1.15] tracking-tight text-warm-white sm:text-4xl lg:text-5xl">
              Born from a Single Act of Care.
            </h2>
          </div>

          <p className="max-w-md text-base leading-relaxed text-warm-white/75 sm:max-w-lg sm:text-lg">
            {site.name} began late one night when our founder met a young child
            facing hardship and chose to step forward. That moment sparked a
            youth-led movement guided by one conviction. <br />{' '}
            <span className="italic text-warm-white">Kubwabo means &ldquo;for them.&rdquo;</span>{' '}
            That single principle guides every step we take, keeping our focus centered on the people we serve and ensuring no child or family is forgotten.
          </p>
          <Link
            to="/about"
            className="inline-flex min-w-[7.5rem] w-fit items-center justify-center border border-warm-white bg-transparent px-6 py-2 text-sm font-medium leading-normal text-warm-white transition-colors hover:bg-warm-white hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warm-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            Read The Full Story
          </Link>

          {/* Mobile / stacked: pattern under text column only */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[60px] -left-4 bg-[length:300px_60px] bg-repeat-x bg-bottom sm:-left-6 lg:hidden"
            style={{ backgroundImage: 'url(/pattern1.svg)' }}
          />
        </div>

        <div className="relative z-10 min-h-[18rem] sm:min-h-[22rem] lg:min-h-0">
          <img
            src={STORY_IMAGE}
            alt="Boy wearing a beige and yellow striped polo shirt"
            referrerPolicy="no-referrer"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        </div>
      </div>

      {/* Desktop: full-bleed left to image edge (50vw + half of gap-14) */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 z-[1] hidden h-[60px] w-[calc(50vw+1.75rem)] bg-[length:300px_60px] bg-repeat-x bg-bottom lg:block"
        style={{ backgroundImage: 'url(/pattern1.svg)' }}
      />
    </section>
  )
}
