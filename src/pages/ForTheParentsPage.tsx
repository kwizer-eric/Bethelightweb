import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { HomeCtaSection } from '../components/home/HomeCtaSection'

gsap.registerPlugin(ScrollTrigger)

const PROGRAM_HERO_IMAGE =
  'https://images.unsplash.com/photo-1609220136736-443140cffec6?auto=format&fit=crop&w=1920&q=85'

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
    <div className="bg-warm-white text-primary">
      {/* Hero */}
      <section className="w-full bg-warm-white">
        <div className="site-container pt-28 pb-20 sm:pt-32 sm:pb-24 lg:pt-36 lg:pb-28">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-20">
            <div>
              <h1 className="text-3xl font-medium tracking-tight text-primary sm:text-4xl lg:text-5xl">
                For Their Family
              </h1>
            </div>

            <div className="w-full space-y-6 text-primary">
              <p className="text-base leading-relaxed sm:text-lg">
                For Their Family is a Kubwabo Foundation program dedicated to
                walking alongside vulnerable families, supporting them through
                everyday challenges, strengthening their livelihoods, and
                helping them build a more secure future for their children.
              </p>
              <p className="text-base leading-relaxed sm:text-lg">
                We believe every child deserves the opportunity to grow, learn,
                and pursue their dreams. But behind every child is a family
                whose well-being shapes the opportunities they have and the
                future they can build.
              </p>
              <p className="text-base leading-relaxed sm:text-lg">
                When families struggle to access nutritious food, healthcare,
                stable income, and other basic needs, creating a safe and
                supportive environment for children becomes more difficult.
              </p>
              <p className="text-base leading-relaxed sm:text-lg">
                That is why we believe investing in children also means
                empowering the families raising them, because stronger families
                create stronger foundations for children to thrive.
              </p>
            </div>
          </div>
        </div>

        <div ref={parallaxWrapRef} className="relative h-dvh overflow-hidden">
          <img
            ref={parallaxImgRef}
            src={PROGRAM_HERO_IMAGE}
            alt="Family members together outdoors"
            referrerPolicy="no-referrer"
            className="absolute inset-x-0 top-0 h-[130%] w-full object-cover will-change-transform"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/30 via-primary/5 to-transparent"
            aria-hidden
          />
        </div>
      </section>

      {/* How we support */}
      <section className="border-b border-primary/15 bg-warm-white py-20 sm:py-24 lg:py-28">
        <div className="site-container">
          <div className="max-w-3xl lg:max-w-4xl">
            <h2 className="text-3xl font-medium tracking-tight text-primary sm:text-4xl">
              How We Support Families
            </h2>
            <p className="mt-4 text-base leading-relaxed text-primary sm:text-lg">
              We focus on helping families meet their essential needs, build
              sustainable livelihoods, and create supportive homes where
              children can thrive.
            </p>
          </div>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {SUPPORT_PILLARS.map((pillar) => (
              <div
                key={pillar.number}
                className="flex min-h-[300px] flex-col justify-between border border-primary/15 bg-white p-6 text-left text-primary sm:min-h-[340px] sm:p-7 lg:min-h-[360px] lg:p-8"
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
                  <p className="mt-2.5 text-sm leading-relaxed sm:text-base">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why this matters */}
      <section className="border-b border-white/10 bg-black pt-20 sm:pt-24 lg:pt-28">
        <div className="site-container">
          <div className="max-w-3xl pb-14 sm:pb-16 lg:pb-20">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
              Why This Matters
            </p>
            <h2 className="mt-2 text-3xl font-medium tracking-tight text-warm-white sm:text-4xl lg:text-5xl">
              A Stronger Foundation for Every Child
            </h2>
            <p className="mt-6 text-base leading-relaxed text-warm-white sm:text-lg">
              When families become stronger, children gain better opportunities
              to grow, learn, and pursue their dreams.
            </p>
          </div>
        </div>

        <div className="site-container grid grid-cols-1 items-stretch border-t border-white/15 lg:grid-cols-3">
          {WHY_POINTS.map((point, index) => (
            <article
              key={point.title}
              className={`flex min-h-[22rem] flex-col px-6 py-12 text-warm-white sm:min-h-[24rem] sm:px-8 sm:py-14 lg:min-h-[26rem] lg:px-10 lg:py-16 lg:pb-28 ${
                index > 0 ? 'border-t border-white/15 lg:border-t-0 lg:border-l' : ''
              }`}
            >
              <p className="text-xs font-medium tracking-[0.12em] text-warm-white uppercase">
                {String(index + 1).padStart(2, '0')}
              </p>
              <h3 className="mt-6 text-xl font-medium tracking-tight sm:text-2xl">
                {point.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed sm:text-base">
                {point.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <HomeCtaSection />
    </div>
  )
}
