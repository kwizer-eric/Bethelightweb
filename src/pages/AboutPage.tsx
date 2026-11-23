import { useMemo, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { siteImages } from '../assets/siteImages'
import { FadeImage } from '../components/FadeImage'
import { AboutMissionPathways } from '../components/about/AboutMissionPathways'
import { AboutTeamMoreCard } from '../components/about/AboutTeamMoreCard'
import { site } from '../data/site'
import { ImpactStatsSection } from '../components/home/ImpactStatsSection'
import { PageHeroIntro } from '../components/layout/PageHeroIntro'
import { MobileReadMore } from '../components/ui/MobileReadMore'
import { useCms } from '../cms/CmsContext'

gsap.registerPlugin(ScrollTrigger)

export function AboutPage() {
  const { team } = useCms()
  const otherMembersCount = useMemo(
    () =>
      site.teamAdditionalMembersCount +
      team.filter((member) => member.isBoard === false).length,
    [team],
  )
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
      <section className="w-full bg-warm-white">
        <PageHeroIntro
          title={
            <>
              For Every Child.
              <br />
              For Every Family.
            </>
          }
          description="Around the world, millions of children grow up surrounded by conflict, uncertainty, and hardship. For many, access to education disappears, protection systems break down, and opportunities become increasingly limited."
        />
      </section>

      {/* 01, our story */}
      <section id="our-story" className="bg-warm-white">
        <div
          ref={parallaxWrapRef}
          className="relative h-[22rem] overflow-hidden sm:h-[32rem] lg:h-dvh"
        >
          <FadeImage
            ref={parallaxImgRef}
            src={siteImages.aboutFoundation}
            alt="Community members gathering together"
            referrerPolicy="no-referrer"
            className="absolute inset-x-0 top-0 h-[130%] w-full object-cover will-change-transform"
            style={{ objectPosition: 'center 54%' }}
          />
        </div>

        <div className="bg-black text-warm-white">
          <div className="site-container py-12 sm:py-24 lg:py-32">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-20">
              <div>
                <p className="text-[11px] font-medium tracking-[0.16em] text-warm-white/55 uppercase">
                  Est. 2025
                </p>
                <h2 className="mt-4 text-3xl font-medium tracking-tight sm:text-4xl lg:text-5xl">
                  Our Story
                </h2>
              </div>

              <div className="max-w-2xl space-y-6">
                <MobileReadMore
                  buttonClassName="inline-flex w-fit rounded-lg border border-warm-white bg-warm-white px-6 py-2 text-sm font-medium text-ink"
                >
                  <p className="text-xl font-medium leading-snug tracking-tight sm:text-2xl lg:text-3xl lg:leading-snug">
                    Standing with children. Strengthening families.
                  </p>

                  <p className="text-base leading-relaxed text-warm-white/80 sm:text-lg">
                    Every child is born with potential, dreams, and the ability to become something
                    meaningful. But not every child grows up with the same opportunities. For
                    children from vulnerable families, poverty can place education, nutritious food,
                    healthcare, and other basic needs beyond reach. It can also place enormous
                    pressure on parents and caregivers, making it difficult for them to provide the
                    support and environment their children need to grow. At Kubwabo Foundation, we
                    believe a child&apos;s future should not be determined by the circumstances into
                    which they were born. Every child deserves to be cared for, encouraged, guided,
                    and given the opportunity to learn, discover their potential, and pursue their
                    dreams.
                  </p>

                  <p className="text-base leading-relaxed text-warm-white/80 sm:text-lg">
                    But we also understand that supporting a child means looking beyond the child
                    alone. A child&apos;s well-being is deeply connected to the family and
                    environment in which they grow. When parents struggle with poverty, unstable
                    income, and limited access to basic needs and opportunities, their children feel
                    the effects too. That is why our commitment goes beyond providing immediate
                    assistance. Through{' '}
                    <Link
                      to="/programs/every-kid-deserves-it"
                      className="font-semibold text-warm-white underline decoration-warm-white/30 underline-offset-4 transition-colors hover:decoration-warm-white"
                    >
                      Every Child Deserves It
                    </Link>{' '}
                    and{' '}
                    <Link
                      to="/programs/for-the-parents"
                      className="font-semibold text-warm-white underline decoration-warm-white/30 underline-offset-4 transition-colors hover:decoration-warm-white"
                    >
                      For Their Family
                    </Link>
                    , we work to support children&apos;s development while helping vulnerable
                    families move toward greater stability and self-reliance. We believe lasting
                    change takes more than a single donation or a moment of kindness. It takes people
                    who care, continued support, practical opportunities, and a commitment to walking
                    alongside children and families as they build a better future. Because when
                    families become stronger, children have a stronger foundation on which to build
                    their dreams.
                  </p>
                </MobileReadMore>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ImpactStatsSection />

      <AboutMissionPathways />

      {/* Mission & Vision */}
      <section className="bg-warm-white py-10 sm:py-16 lg:py-20">
        <div className="site-container grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
          {/* 1st: Our Mission (no background) */}
          <div className="relative flex w-full flex-col justify-start gap-8 p-8 text-left text-ink sm:min-h-[36rem] sm:justify-between sm:gap-0 sm:p-10 lg:min-h-[40rem]">
            <h3 className="text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
              Our
              <br />
              <span className="font-normal italic">Mission</span>
            </h3>

            <div className="max-w-md sm:mb-16">
              <p className="text-sm leading-relaxed text-body sm:text-base">
                To improve the well-being and future opportunities of vulnerable children and families through practical support, education, mentorship, community engagement, and family strengthening.
              </p>
            </div>
          </div>

          {/* 2nd: Image only */}
          <div className="relative min-h-[24rem] w-full overflow-hidden sm:min-h-[30rem] lg:min-h-[40rem]">
            <FadeImage
              src={siteImages.aboutMission}
              alt="Children smiling together"
              referrerPolicy="no-referrer"
              className="absolute inset-0 h-full w-full object-cover"
              style={{ objectPosition: '43% center' }}
            />
          </div>

          {/* 3rd: Our Vision (as it is with blue background) */}
          <div className="relative flex w-full flex-col justify-start gap-8 overflow-hidden bg-black p-8 pb-20 text-left text-warm-white sm:min-h-[36rem] sm:justify-between sm:gap-0 sm:p-10 sm:pb-10 lg:min-h-[40rem]">
            <h3 className="relative z-10 max-w-[15rem] text-3xl font-bold leading-tight tracking-tight text-warm-white sm:text-4xl lg:text-5xl">
              Our
              <br />
              <span className="font-normal italic">Vision</span>
            </h3>

            <div className="relative z-10 max-w-md sm:mb-16">
              <p className="text-sm leading-relaxed text-warm-white/95 sm:text-base">
                A future where every child has the opportunity to thrive, every family has the support to build a better life, and every community plays an active role in creating lasting positive change.
              </p>
            </div>

            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[60px] bg-[length:300px_60px] bg-repeat-x bg-bottom"
              style={{ backgroundImage: 'url(/pattern1.svg)' }}
            />
          </div>
        </div>
      </section>

      {/* 03, the team */}
      <section className="bg-warm-white text-ink">
        <div className="site-container py-12 sm:py-24 lg:py-32">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start lg:gap-12 xl:gap-20">
            <h2 className="text-3xl font-medium tracking-tight text-ink sm:mt-4 sm:text-4xl lg:text-5xl xl:text-6xl">
              The Team
            </h2>
            <p className="max-w-md text-base leading-relaxed text-body sm:text-lg lg:max-w-sm lg:pt-8 xl:max-w-md xl:pt-10">
              Our leadership brings decades of experience in humanitarian response, child
              protection, education, and long-term development.
            </p>
          </div>

          <div className="mt-8 grid gap-x-6 gap-y-8 sm:mt-16 sm:grid-cols-2 sm:gap-y-12 lg:mt-20 lg:grid-cols-4">
            {team.map((member) => (
              <article key={member.id}>
                <div className="overflow-hidden bg-primary/5">
                  <FadeImage
                    src={member.image}
                    alt=""
                    referrerPolicy="no-referrer"
                    className="aspect-[3/4] w-full object-cover lg:grayscale lg:transition-[filter] lg:duration-500 lg:ease-out lg:hover:grayscale-0"
                  />
                </div>
                <h3 className="mt-5 text-lg font-medium tracking-tight text-ink">
                  {member.name}
                </h3>
                <p className="mt-1 text-sm text-body">{member.role}</p>
              </article>
            ))}

            <AboutTeamMoreCard count={otherMembersCount} />
          </div>
        </div>
      </section>
    </div>
  )
}
