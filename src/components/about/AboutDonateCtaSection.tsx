import { Link } from 'react-router-dom'
import { FadeImage } from '../FadeImage'
import { siteImages } from '../../assets/siteImages'

export function AboutDonateCtaSection() {
  return (
    <section className="relative min-h-[26rem] w-full overflow-hidden sm:min-h-[30rem] lg:min-h-[34rem]">
      <FadeImage
        src={siteImages.aboutDonateCta}
        alt=""
        referrerPolicy="no-referrer"
        className="absolute inset-0 h-full w-full object-cover object-[center_35%]"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/25"
        aria-hidden
      />

      <div className="site-container relative flex min-h-[26rem] items-center py-14 sm:min-h-[30rem] sm:py-16 lg:min-h-[34rem] lg:py-20">
        <div className="max-w-xl">
          <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase sm:text-sm">
            Stand with children in crisis
          </p>
          <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-warm-white sm:mt-5 sm:text-4xl lg:text-[2.75rem] lg:leading-[1.12]">
            Your support reaches children in days, not months.
          </h2>
          <Link
            to="/donate"
            className="mt-8 inline-flex items-center justify-center rounded-lg bg-accent px-8 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-accent/90 sm:mt-10"
          >
            Donate Now
          </Link>
        </div>
      </div>
    </section>
  )
}