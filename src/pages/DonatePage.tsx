import { Link, useSearchParams } from 'react-router-dom'
import { FadeImage } from '../components/FadeImage'
import { DonateFaqAccordion } from '../components/donation/DonateFaqAccordion'
import { DonateTestimonialBanner } from '../components/donation/DonateTestimonialBanner'
import { DonateNowForm } from '../components/donation/DonateNowForm'
import { DonateStatCounters } from '../components/donation/DonateStatCounters'
import { DONATE_STEPS, EVERY_KID_PROGRAM_ID } from '../data/donatePage'
import { useCms } from '../cms/CmsContext'
import { siteImages } from '../assets/siteImages'

export function DonatePage() {
  const { children } = useCms()
  const [params] = useSearchParams()
  const forId = params.get('for')
  const programId = params.get('program') ?? (forId ? EVERY_KID_PROGRAM_ID : undefined)
  const child = forId ? children.find((c) => c.id === forId) : undefined

  return (
    <div className="bg-white text-ink">
      {/* Hero + donation form — blue band capped at 75dvh; form positioned independently */}
      <section className="relative overflow-visible bg-ink lg:bg-transparent">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[75dvh] max-h-[75dvh] overflow-hidden"
          aria-hidden
        >
          <FadeImage
            priority
            src="https://res.cloudinary.com/efzpryhb/image/upload/v1795441339/_DSC8026_Edited_tkgmy2.avif"
            alt=""
            referrerPolicy="no-referrer"
            className="absolute inset-0 h-full w-full object-cover object-[center_35%]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/35" />
        </div>

        <div className="site-container relative z-10 max-h-none pb-10 pt-24 md:pt-28 lg:h-[75dvh] lg:max-h-[75dvh] lg:overflow-visible lg:pb-0 lg:pt-32">
          {child ? (
            <div className="mt-6 max-w-lg text-left md:mt-8 lg:mt-20 xl:mt-24">
              <div className="flex flex-col gap-4 rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm sm:flex-row sm:items-center">
                <img
                  src={child.image}
                  alt=""
                  className="h-16 w-16 rounded-lg object-cover sm:h-20 sm:w-20"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-semibold tracking-wider text-primary uppercase">
                    Sponsoring {child.name}
                  </p>
                  <p className="mt-1 text-sm text-white/80">{child.dream}</p>
                </div>
                <Link
                  to={`/programs/every-kid-deserves-it/children/${child.id}`}
                  className="rounded-lg bg-accent px-5 py-2.5 text-center text-sm font-semibold text-ink transition-colors hover:bg-accent/90"
                >
                  View profile
                </Link>
              </div>
            </div>
          ) : null}
        </div>

        <div className="site-container relative z-10 mt-40 pb-16 lg:pointer-events-none lg:absolute lg:inset-x-0 lg:top-0 lg:mx-auto lg:mt-0 lg:pb-0 lg:pt-44 xl:pt-48">
          <div className="lg:pointer-events-auto lg:ml-auto lg:w-full lg:max-w-[36rem] xl:max-w-[38rem] lg:-mb-44 xl:-mb-52">
            <DonateNowForm
              featured
              initialProgramId={programId}
              initialChildId={forId ?? undefined}
            />
          </div>
        </div>
      </section>

      {/* Impact copy + stats */}
      <section className="border-b border-ink/5 bg-white">
        <div className="site-container grid grid-cols-1 gap-12 pb-20 pt-8 lg:grid-cols-12 lg:gap-16 lg:pb-28 lg:pt-48">
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">
              For them. For the long road.
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink md:text-4xl">
              Every gift strengthens a child&apos;s future.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-body">
              Through Every Child Deserves It and For Their Family, we walk alongside vulnerable
              children and households in Rwanda—with education, mentorship, essential support, and
              livelihood guidance. Hardship should never define a child&apos;s potential or a
              family&apos;s dignity.
            </p>
            <p className="mt-4 text-base leading-relaxed text-body">
              When families become stronger, children gain a sturdier foundation on which to learn,
              grow, and pursue their dreams.
            </p>
            <DonateStatCounters />
          </div>
          <div className="hidden lg:col-span-7 lg:block" aria-hidden />
        </div>
      </section>

      {/* Steps + image */}
      <section className="site-container py-24 md:py-28">
        <header className="mx-auto max-w-xl px-4 pb-2 text-center md:px-6 md:pb-4">
          <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase md:text-sm">
            Simple. Transparent.
          </p>
          <h2 className="mt-5 text-[1.625rem] font-bold leading-snug tracking-tight text-ink md:mt-6 md:text-[1.875rem] lg:text-[2.125rem]">
            How your generosity becomes lasting change.
          </h2>
        </header>

        <div className="mt-14 grid grid-cols-1 items-start gap-10 md:mt-16 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <div className="aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl bg-ink/5 lg:max-w-none">
              <FadeImage
                src={siteImages.homeSupport}
                alt="Families and children supported by Kubwabo Foundation"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>

          <ol className="flex flex-col gap-10 lg:col-span-7 lg:gap-12 xl:col-span-6 xl:col-start-7">
            {DONATE_STEPS.map((step) => (
              <li key={step.number} className="flex gap-5 sm:gap-8">
                <span
                  className="w-14 shrink-0 text-6xl font-bold leading-none text-ink/10 sm:w-20 sm:text-8xl lg:text-9xl"
                  aria-hidden
                >
                  {step.number}
                </span>
                <div className="min-w-0 pt-1 sm:pt-2">
                  <h3 className="text-lg font-bold text-ink sm:text-xl">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-body sm:text-base">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <DonateFaqAccordion />

      <DonateTestimonialBanner />
    </div>
  )
}