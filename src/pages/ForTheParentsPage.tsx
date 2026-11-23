import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { siteImages } from '../assets/siteImages'
import { FadeImage } from '../components/FadeImage'
import { PageHeroIntro } from '../components/layout/PageHeroIntro'
import { ProgramAfterHeroSection } from '../components/programs/ProgramAfterHeroSection'
import { ProgramChallengeSection } from '../components/programs/ProgramChallengeSection'
import { ProgramStoryImage } from '../components/programs/ProgramStoryImage'
import { FOR_THE_PARENTS_PROGRAM_ID } from '../data/donatePage'

gsap.registerPlugin(ScrollTrigger)

const SUPPORT_PILLARS = [
  {
    number: '01',
    title: 'Essential Needs',
    description:
      'We help families access nutritious food, healthcare, health insurance, safe housing, and family-planning services, creating healthier homes where parents and children can thrive.',
  },
  {
    number: '02',
    title: 'Economic Empowerment',
    description:
      'Through skills training, business guidance, mentorship, and income opportunities, we help parents build sustainable livelihoods, improve financial stability, and create better futures for their families.',
  },
  {
    number: '03',
    title: 'Long-Term Support',
    description:
      'We work alongside families as they set achievable goals, track progress, and adapt as needs change. Our support goes beyond a single donation, helping them take lasting steps toward self-reliance.',
  },
] as const

const WHY_POINTS = [
  {
    title: 'A Stronger Home',
    body: 'Children benefit from a more supportive home environment, greater security, and consistent access to their basic needs.',
  },
  {
    title: 'Room to Grow',
    body: 'When families have greater financial stability, children have more opportunities to learn, develop their potential, and pursue their ambitions.',
  },
  {
    title: 'Breaking the Cycle',
    body: 'By strengthening families today, we help create opportunities for future generations and make poverty less likely to pass from one generation to the next.',
  },
] as const

export function ForTheParentsPage() {
  const parallaxWrapRef = useRef<HTMLDivElement>(null)
  const parallaxImgRef = useRef<HTMLImageElement>(null)

  useGSAP(
    () => {
      const wrap = parallaxWrapRef.current
      const img = parallaxImgRef.current
      if (!wrap || !img) return
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      gsap.fromTo(
        img,
        { yPercent: -15 },
        {
          yPercent: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: wrap,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      )
    },
    { scope: parallaxWrapRef },
  )

  return (
    <div className="bg-warm-white text-ink">
      {/* Hero */}
      <section className="w-full bg-warm-white">
        <PageHeroIntro
          titleAtTop
          wideDescription
          nudgeDescription
          title={
            <>
              For Their
              <br />
              Family
            </>
          }
          description="Every family deserves the opportunity to live with dignity, stability, and hope. Yet poverty can make it difficult for parents to provide for their children and plan for the future. We believe stronger families create stronger foundations for children to thrive. Through practical support, livelihood opportunities, and mentorship, we walk alongside families toward greater stability and independence."
        />

        <div ref={parallaxWrapRef} className="relative h-[22rem] overflow-hidden sm:h-[32rem] lg:h-dvh">
          <FadeImage
            ref={parallaxImgRef}
            src={siteImages.forTheirFamilyHero}
            alt="Family members together outdoors"
            referrerPolicy="no-referrer"
            className="absolute inset-x-0 top-0 h-[130%] w-full object-cover will-change-transform"
            style={{ objectPosition: 'center 54%' }}
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/30 via-primary/5 to-transparent"
            aria-hidden
          />
        </div>
      </section>

      <ProgramAfterHeroSection
        eyebrow="For their family"
        title="Strength when families need it most"
        lead="Supporting vulnerable households through everyday challenges so parents can build stability, and children can grow in a safer, stronger home."
        body="When families struggle to access nutritious food, healthcare, stable income, or safe housing, creating a supportive environment for children becomes harder. Behind every child is a family whose well-being shapes the opportunities they have and the future they can build. For Their Family walks alongside parents through skills training, livelihood support, and long-term guidance, not a single donation, but steady partnership. By investing in families today, we help break cycles of hardship and give children room to learn, heal, and thrive."
      />

      <ProgramStoryImage
        src={siteImages.forTheirFamilyStory}
        alt="Families and children together in the community"
      />

      <ProgramChallengeSection
        headline={
          <>
            Lack of stability should never define a family&apos;s dignity, home, or future
          </>
        }
        intro="For households facing conflict, displacement, or extreme poverty, meeting basic needs is a daily struggle. Whether it is food, healthcare, safe housing, or reliable income, parents carry stress that shapes the environment their children grow up in."
        callout="Walking alongside families in multiple communities, livelihood and household support is becoming a critical priority as populations grow and protection risks intensify."
        outro="Our team adapts to each family’s situation, skills training, business guidance, referrals for essentials, and long-term follow-up. When parents gain stability, children gain room to learn, heal, and dream again."
      />

      {/* How we support */}
      <section className="border-b border-primary/15 bg-warm-white py-20 sm:py-24 lg:py-28">
        <div className="site-container">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {SUPPORT_PILLARS.map((pillar) => (
              <div
                key={pillar.number}
                className="flex min-h-[300px] flex-col justify-between border border-primary/15 bg-white p-6 text-left text-ink sm:min-h-[340px] sm:p-7 lg:min-h-[360px] lg:p-8"
              >
                <div>
                  <span className="text-lg font-semibold tracking-tight sm:text-xl">
                    {pillar.number}
                  </span>
                </div>

                <div className="mt-12 sm:mt-16">
                  <h3 className="whitespace-nowrap text-base font-semibold tracking-tight sm:text-lg lg:text-xl">
                    {pillar.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-body sm:text-base">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why this matters */}
      <section className="border-b border-white/10 bg-black pt-12 sm:pt-24 lg:pt-28">
        <div className="site-container">
          <div className="max-w-3xl pb-8 sm:pb-16 lg:pb-20">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              Why This Matters
            </p>
            <h2 className="mt-2 text-3xl font-medium tracking-tight text-warm-white sm:text-4xl lg:text-5xl">
              A Stronger Foundation for Every Child
            </h2>
            <p className="mt-4 text-base leading-relaxed text-warm-white sm:mt-6 sm:text-lg">
              When families become stronger, children gain better opportunities
              to grow, learn, and pursue their dreams.
            </p>
            <Link
              to={`/donate?program=${FOR_THE_PARENTS_PROGRAM_ID}`}
              className="mt-6 inline-flex items-center justify-center rounded-lg bg-accent px-7 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-accent/90 sm:mt-8"
            >
              Donate to this program
            </Link>
          </div>
        </div>

        <div className="site-container grid grid-cols-1 items-stretch border-t border-white/15 lg:grid-cols-3">
          {WHY_POINTS.map((point, index) => (
            <article
              key={point.title}
              className={`flex flex-col px-6 py-8 text-warm-white sm:min-h-[24rem] sm:px-8 sm:py-14 lg:min-h-[26rem] lg:px-10 lg:py-16 lg:pb-28 ${
                index > 0 ? 'border-t border-white/15 lg:border-t-0 lg:border-l' : ''
              }`}
            >
              <p className="text-xs font-medium tracking-[0.12em] text-warm-white uppercase">
                {String(index + 1).padStart(2, '0')}
              </p>
              <h3 className="mt-4 text-xl font-medium tracking-tight sm:mt-6 sm:text-2xl">
                {point.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed sm:mt-3 sm:text-base">
                {point.body}
              </p>
            </article>
          ))}
        </div>
      </section>

    </div>
  )
}
