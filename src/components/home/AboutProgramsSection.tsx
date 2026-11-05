import { Link } from 'react-router-dom'
import { FadeImage } from '../FadeImage'
import { siteImages } from '../../assets/siteImages'
import { site } from '../../data/site'

function StoryImage({ className }: { className?: string }) {
  return (
    <div className={className}>
      <FadeImage
        src={siteImages.homeOurStory}
        alt="Boy wearing a beige and yellow striped polo shirt"
        referrerPolicy="no-referrer"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
    </div>
  )
}

export function AboutProgramsSection() {
  return (
    <section id="our-story" className="relative w-full overflow-hidden bg-black">
      <div className="site-container relative z-10 grid grid-cols-1 lg:min-h-[91vh] lg:max-h-dvh lg:grid-cols-2 lg:items-stretch lg:gap-14">
        <div className="relative flex flex-col justify-center gap-6 py-14 pb-20 sm:py-16 sm:pb-24 lg:py-20 lg:pb-24">
          <div>
            <span className="inline-flex bg-accent px-4 py-1.5 text-sm font-semibold text-ink">
              Our Story
            </span>
          </div>

          {/* Mobile: image directly under the badge */}
          <StoryImage className="relative z-10 min-h-[18rem] w-full overflow-hidden sm:min-h-[22rem] lg:hidden" />

          <h2 className="max-w-md text-3xl font-bold leading-[1.15] tracking-tight text-warm-white sm:text-4xl lg:text-5xl">
            Born from a Single Act of Care.
          </h2>

          <div className="max-w-md space-y-6 sm:max-w-lg">
            <p className="text-base leading-relaxed text-warm-white/75 sm:text-lg">
              {site.name} began late one night when our founder met a young child
              facing hardship and chose to step forward. That moment sparked a
              youth-led movement guided by one conviction.
            </p>
            <p className="hidden text-base leading-relaxed text-warm-white/75 sm:block sm:text-lg">
              <span className="italic text-warm-white">
                Kubwabo means &ldquo;for them.&rdquo;
              </span>{' '}
              That single principle guides every step we take, keeping our focus
              centered on the people we serve and ensuring no child or family is
              forgotten.
            </p>
          </div>
          <Link
            to="/about"
            className="inline-flex min-w-[7.5rem] w-fit items-center justify-center border border-warm-white bg-warm-white px-6 py-2 text-sm font-medium leading-normal text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warm-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
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

        <StoryImage className="relative z-10 hidden min-h-0 lg:block" />
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
