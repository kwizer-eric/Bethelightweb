import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useCms } from '../cms/CmsContext'

gsap.registerPlugin(ScrollTrigger)

const FOUNDATION_IMAGE =
  'https://images.unsplash.com/photo-1694286080811-e5e416f4fdb1?auto=format&fit=crop&w=2000&q=85'

export function AboutPage() {
  const { team } = useCms()
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
      <section className="flex flex-col justify-between gap-28 bg-warm-white pt-28 pb-28 sm:gap-32 sm:pt-32 sm:pb-32 lg:gap-40 lg:pb-40">
        <div className="site-container">
          <h1 className="max-w-xl text-4xl font-medium leading-[1.05] tracking-tight text-primary sm:max-w-2xl sm:text-5xl lg:text-6xl xl:max-w-3xl xl:text-7xl 2xl:text-8xl">
            For Every Child.
            <br />
            For Every Family.
          </h1>
        </div>

        <div className="site-container flex justify-end">
          <p className="max-w-md text-base font-medium leading-snug text-primary sm:max-w-lg sm:text-lg md:text-xl">
            Born from a single act of care, we are a youth-led community dedicated to showing up with dignity and practical support for children and families.
          </p>
        </div>
      </section>

      {/* 01 — our story */}
      <section id="our-story" className="bg-warm-white">
        <div
          ref={parallaxWrapRef}
          className="relative h-dvh overflow-hidden"
        >
          <img
            ref={parallaxImgRef}
            src={FOUNDATION_IMAGE}
            alt="Community members gathering together"
            referrerPolicy="no-referrer"
            className="absolute inset-x-0 top-0 h-[130%] w-full object-cover will-change-transform"
          />
        </div>

        <div className="bg-primary text-warm-white">
          <div className="site-container py-20 sm:py-24 lg:py-32">
            <div className="grid gap-12 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-20">
              <div>
                <p className="text-[11px] font-medium tracking-[0.16em] text-warm-white/55 uppercase">
                  Est. 2025
                </p>
                <h2 className="mt-4 text-3xl font-medium tracking-tight sm:text-4xl lg:text-5xl">
                  Our Story
                </h2>
              </div>

              <div className="max-w-2xl space-y-6">
                <p className="text-xl font-medium leading-snug tracking-tight sm:text-2xl lg:text-3xl lg:leading-snug">
                  Kubwabo Foundation was born from a simple but powerful belief:{' '}
                  <span className="italic text-accent">
                    no child should have to face life&apos;s challenges alone.
                  </span>
                </p>

                <p className="text-base leading-relaxed text-warm-white/80 sm:text-lg">
                  Our journey began late one night when our founder encountered a young child in a vulnerable situation and chose to step forward. What began as a single act of care became a lasting reminder that even when we cannot solve every problem, we can make an immediate, meaningful difference in someone&apos;s life.
                </p>

                <p className="text-base leading-relaxed text-warm-white/80 sm:text-lg">
                  That experience sparked a commitment to move beyond sympathy into consistent, personal action. What started with a small group of young people sharing that common desire has steadily grown into a community united by shared responsibility.
                </p>

                <p className="text-base leading-relaxed text-warm-white/80 sm:text-lg">
                  As our work continues to grow, our core posture remains unchanged: to show up, listen closely, and act with quiet dignity wherever need is greatest.
                </p>

                <div className="border-t border-warm-white/20 pt-6">
                  <p className="text-base italic leading-relaxed text-accent sm:text-lg">
                    Kubwabo means &ldquo;for them.&rdquo; That single principle guides every step we take, keeping our focus centered on the people we serve and ensuring no child or family is forgotten.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 02 — who we are */}
      <section className="border-t border-primary/15 bg-warm-white text-primary">
        <div className="site-container py-20 sm:py-24 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-20">
            <div>

              <h2 className="mt-4 text-3xl font-medium tracking-tight text-primary sm:text-4xl lg:text-5xl">
                Who We Are
              </h2>
            </div>

            <div className="max-w-2xl space-y-6">
              <p className="text-base leading-relaxed text-primary sm:text-lg">
                Kubwabo Foundation is a youth-led, community-focused organization working alongside underserved children and families to bridge immediate relief with long-term stability.
              </p>

              <p className="text-base leading-relaxed text-primary/80 sm:text-lg">
                We believe that hardship should never define a person's worth or potential. Rather than applying detached, one-size-fits-all aid, we meet children and caregivers where they are, recognizing their inherent dignity and creating safe, encouraging spaces where young people can learn and discover their talents.
              </p>

              <p className="text-base leading-relaxed text-primary/80 sm:text-lg">
                Through our{' '}
                <Link
                  to="/programs/every-kid-deserves-it"
                  className="font-semibold text-primary underline decoration-primary/40 underline-offset-4 transition-colors hover:decoration-primary"
                >
                  Every Child Deserves It
                </Link>{' '}
                initiative and{' '}
                <Link
                  to="/programs/for-the-parents"
                  className="font-semibold text-primary underline decoration-primary/40 underline-offset-4 transition-colors hover:decoration-primary"
                >
                  For Their Family
                </Link>
                , we pair essential daily assistance with ongoing mentorship, educational resources, and caregiver empowerment.
              </p>

              <p className="text-base leading-relaxed text-primary/80 sm:text-lg">
                Lasting progress happens when a community takes ownership of its own future. By uniting local youth volunteers, mentors, and grassroots partners, we ensure our support is personal, accountable, and deeply rooted in the neighborhoods we serve.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-warm-white py-16 lg:py-20">
        <div className="site-container grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
          {/* 1st: Our Mission (no background) */}
          <div className="relative flex min-h-[32rem] w-full flex-col justify-between p-8 text-left text-primary sm:min-h-[36rem] sm:p-10 lg:min-h-[40rem]">
            <h3 className="text-3xl leading-tight text-primary sm:text-4xl lg:text-5xl">
              Our
              <br />
              <span className="font-normal italic">Mission</span>
            </h3>

            <div className="mb-14 max-w-md sm:mb-16">
              <p className="text-sm leading-relaxed text-primary/80 sm:text-base">
                To improve the well-being and future opportunities of vulnerable children and families through practical support, education, mentorship, community engagement, and family strengthening.
              </p>
            </div>
          </div>

          {/* 2nd: Image only */}
          <div className="relative min-h-[24rem] w-full overflow-hidden sm:min-h-[30rem] lg:min-h-[40rem]">
            <img
              src="https://images.unsplash.com/flagged/photo-1555251255-e9a095d6eb9d?auto=format&fit=crop&w=1400&q=85"
              alt="Children smiling together"
              referrerPolicy="no-referrer"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>

          {/* 3rd: Our Vision (as it is with blue background) */}
          <div className="relative flex min-h-[32rem] w-full flex-col justify-between overflow-hidden bg-primary p-8 text-left text-warm-white sm:min-h-[36rem] sm:p-10 lg:min-h-[40rem]">
            <h3 className="relative z-10 max-w-[15rem] text-3xl leading-tight text-warm-white sm:text-4xl lg:text-5xl">
              Our
              <br />
              <span className="font-normal italic">Vision</span>
            </h3>

            <div className="relative z-10 mb-14 max-w-md sm:mb-16">
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

      {/* 03 — the team */}
      <section className="bg-warm-white text-primary">
        <div className="site-container py-20 sm:py-24 lg:py-32">
          <div>
            <h2 className="mt-4 text-3xl font-medium tracking-tight text-primary sm:text-4xl lg:text-5xl">
              The Team
            </h2>
          </div>

          <div className="mt-14 grid gap-x-6 gap-y-12 sm:mt-16 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
            {team.map((member) => (
              <article key={member.id}>
                <div className="overflow-hidden bg-primary/5">
                  <img
                    src={member.image}
                    alt=""
                    referrerPolicy="no-referrer"
                    className="aspect-[3/4] w-full object-cover grayscale transition-[filter] duration-500 ease-out hover:grayscale-0"
                  />
                </div>
                <h3 className="mt-5 text-lg font-medium tracking-tight text-primary">
                  {member.name}
                </h3>
                <p className="mt-1 text-sm text-primary/55">{member.role}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
