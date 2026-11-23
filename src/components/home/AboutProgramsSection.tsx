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
            <span className="text-sm font-semibold text-primary">Our Story</span>
          </div>

          {/* Mobile: image directly under the badge */}
          <StoryImage className="relative z-10 min-h-[18rem] w-full overflow-hidden sm:min-h-[22rem] lg:hidden" />

          <h2 className="max-w-lg text-2xl font-semibold leading-[1.2] tracking-tight text-warm-white sm:max-w-xl sm:text-3xl lg:text-4xl">
            Standing with children whose futures are quietly slipping away
          </h2>

          <div className="max-w-md sm:max-w-lg">
            <p className="text-base leading-relaxed text-warm-white/75 sm:text-lg">
              Behind every child is a story, a family, and a future worth believing in.
              Yet poverty can make even the simplest things, such as education, food,
              healthcare, and a safe environment, difficult to access. At {site.name}, we
              believe no child&apos;s dreams should be limited by the circumstances into
              which they were born. That is why we stand alongside vulnerable children and
              families, addressing immediate needs while working toward lasting
              opportunities, stronger families, and brighter futures. Because when we
              support a child, we must also care about the world in which that child grows.
            </p>
          </div>
          <Link
            to="/about"
            className="inline-flex w-fit items-center justify-center rounded-lg bg-accent px-7 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-black"
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
