import { useId, useRef } from 'react'
import { gsap } from 'gsap'
import { site } from '../../data/site'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const PATH_D =
  'M 20 360 Q 180 460 280 430 C 380 400 420 285 575 295 C 730 305 780 285 840 160 C 885 65 930 45 1065 48'

const NODES = [
  { cx: 135, cy: 422 },
  { cx: 575, cy: 295 },
  { cx: 918, cy: 64 },
] as const

/** Text sits under each node (viewBox 1200×600); narrow width keeps ~30% gap between columns like the reference. */
const STEPS = [
  {
    title: 'Your Donation',
    body: '100% of your donation goes directly toward supporting vulnerable children and families through education, essential needs, and family-strengthening initiatives. No hidden fees. Every contribution matters.',
    place: 'left-[3%] top-[79%]',
  },
  {
    title: 'Our Action',
    body: 'We turn your generosity into meaningful action. Through educational support, family assistance, mentorship, and community initiatives, we respond to identified needs and work alongside those we support.',
    place: 'left-[40%] top-[64%]',
  },
  {
    title: 'Their Safety',
    body: 'Children gain opportunities to learn, grow, and pursue their dreams. Families move toward greater stability and independence. Together, we help build a future where every child has the opportunity to thrive.',
    place: 'right-0 top-[32%]',
  },
] as const

function HeaderBlock({
  className = '',
  mobile = false,
}: {
  className?: string
  mobile?: boolean
}) {
  return (
    <div className={`max-w-md ${className}`}>
      {mobile ? (
        <p className="text-[11px] font-semibold tracking-[0.2em] text-primary uppercase">
          Simple. Transparent.
        </p>
      ) : null}
      <h2
        className={`text-4xl font-extrabold tracking-tight text-ink md:text-5xl ${
          mobile ? 'mt-4' : ''
        }`}
      >
        Make a Difference
      </h2>
      <p className="mt-4 max-w-md text-base leading-relaxed text-body">
        Your support helps children access opportunities and families build stronger foundations for a
        better future.
      </p>
      <a
        href={site.memberApplicationForm}
        target="_blank"
        rel="noreferrer"
        className="mt-8 inline-flex items-center justify-center rounded-lg bg-accent px-7 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-accent/90"
      >
        Join us
      </a>
    </div>
  )
}

function StepCopy({
  step,
  index,
  layout = 'diagram',
}: {
  step: (typeof STEPS)[number]
  index: number
  layout?: 'diagram' | 'mobile'
}) {
  if (layout === 'mobile') {
    return (
      <div className="max-w-md">
        <span
          aria-hidden
          className="block text-[5rem] font-bold leading-none text-ink/10 select-none sm:text-[5.5rem]"
        >
          {index + 1}
        </span>
        <h3 className="mt-3 text-2xl font-bold tracking-tight text-ink">{step.title}</h3>
        <p className="mt-3 text-base leading-relaxed text-body">{step.body}</p>
      </div>
    )
  }

  const widthClass = 'max-w-[17rem] sm:max-w-[18rem]'
  const bodyClass = 'text-base leading-relaxed text-body lg:text-lg'

  return (
    <div className={`relative ${widthClass}`}>
      <span
        aria-hidden
        className="pointer-events-none absolute top-0 right-0 z-0 text-[10.5rem] leading-none font-bold text-ink/[0.03] select-none sm:text-[11.5rem] lg:text-[12.5rem]"
      >
        {index + 1}
      </span>
      <h3 className="relative z-10 text-2xl font-bold tracking-tight text-[#1F1F1F]">
        {step.title}
      </h3>
      <p className={`relative z-10 mt-3 ${bodyClass}`}>{step.body}</p>
    </div>
  )
}

export function MakeADifferenceSection() {
  const uid = useId().replace(/:/g, '')
  const sectionRef = useRef<HTMLElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const diagramRef = useRef<HTMLDivElement>(null)
  const nodeRefs = [
    useRef<SVGGElement>(null),
    useRef<SVGGElement>(null),
    useRef<SVGGElement>(null),
  ]
  const stepRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ]
  const mobileStepRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ]

  useGSAP(
    () => {
      const section = sectionRef.current
      const path = pathRef.current
      if (!section || !path) return

      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const isDesktop = window.matchMedia('(min-width: 768px)').matches
      const length = path.getTotalLength()

      const nodeGroups = nodeRefs.map((r) => r.current).filter(Boolean) as SVGGElement[]
      const steps = stepRefs.map((r) => r.current).filter(Boolean) as HTMLDivElement[]
      const mobileSteps = mobileStepRefs
        .map((r) => r.current)
        .filter(Boolean) as HTMLDivElement[]

      if (reduceMotion) {
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: 0 })
        gsap.set(nodeGroups, { opacity: 1, scale: 1 })
        gsap.set(steps, { opacity: 1, y: 0 })
        gsap.set(mobileSteps, { opacity: 1, y: 0 })
        return
      }

      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })
      gsap.set(nodeGroups, { opacity: 0, scale: 0, transformOrigin: 'center center' })
      gsap.set(steps, { opacity: 0, y: 24 })

      if (isDesktop) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 72%',
            end: '+=750',
            scrub: 1,
          },
        })

        tl.to(path, { strokeDashoffset: 0, ease: 'none', duration: 1 }, 0)
        tl.to(nodeGroups[0], { opacity: 1, scale: 1, duration: 0.08, ease: 'back.out(1.6)' }, 0.15)
        tl.to(steps[0], { opacity: 1, y: 0, duration: 0.12, ease: 'power2.out' }, 0.15)
        tl.to(nodeGroups[1], { opacity: 1, scale: 1, duration: 0.08, ease: 'back.out(1.6)' }, 0.5)
        tl.to(steps[1], { opacity: 1, y: 0, duration: 0.12, ease: 'power2.out' }, 0.5)
        tl.to(nodeGroups[2], { opacity: 1, scale: 1, duration: 0.08, ease: 'back.out(1.6)' }, 0.8)
        tl.to(steps[2], { opacity: 1, y: 0, duration: 0.12, ease: 'power2.out' }, 0.8)
      }

      gsap.set(mobileSteps, { opacity: 0, y: 20 })

      if (!isDesktop) {
        mobileSteps.forEach((el, i) => {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
            delay: i * 0.05,
          })
        })
      }
    },
    { scope: sectionRef, dependencies: [] },
  )

  return (
    <section ref={sectionRef} className="bg-white">
      <div className="site-container relative py-24 sm:py-28 lg:py-32">
        <HeaderBlock className="md:hidden" mobile />

        <div ref={diagramRef} className="relative mt-10 hidden w-full md:mt-0 md:block">
          <HeaderBlock className="absolute top-0 left-0 z-20 md:left-0 md:px-0" />

          <div className="relative aspect-[1200/600] w-full">
            <svg
              viewBox="0 0 1200 600"
              className="h-auto w-full overflow-visible"
              aria-hidden
            >
              <defs>
                <filter
                  id={`${uid}-node-shadow`}
                  x="-80%"
                  y="-80%"
                  width="260%"
                  height="260%"
                >
                  <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#1a1a1a" floodOpacity="0.14" />
                </filter>
              </defs>

              <path
                ref={pathRef}
                d={PATH_D}
                fill="none"
                className="stroke-accent"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <polygon
                points="1062,38 1082,48 1062,58"
                className="fill-accent"
              />

              {NODES.map((node, i) => (
                <g
                  key={i}
                  ref={nodeRefs[i]}
                  transform={`translate(${node.cx}, ${node.cy})`}
                >
                  <circle
                    r="22"
                    fill="#FFFFFF"
                    filter={`url(#${uid}-node-shadow)`}
                  />
                  <circle r="10" fill="#ECEAE8" />
                </g>
              ))}
            </svg>

            {STEPS.map((step, i) => (
              <div
                key={step.title}
                ref={stepRefs[i]}
                className={`absolute z-10 ${step.place}`}
              >
                <StepCopy step={step} index={i} layout="diagram" />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 space-y-16 md:hidden">
          {STEPS.map((step, i) => (
            <div key={step.title} ref={mobileStepRefs[i]}>
              <StepCopy step={step} index={i} layout="mobile" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}