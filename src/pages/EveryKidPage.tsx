import { useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { siteImages, siteVideos } from '../assets/siteImages'
import { FadeImage } from '../components/FadeImage'
import { PageHeroIntro } from '../components/layout/PageHeroIntro'
import { ProgramChallengeSection } from '../components/programs/ProgramChallengeSection'
import { useCms } from '../cms/CmsContext'
import type { ProgramChild } from '../cms/types'
import { EVERY_KID_PROGRAM_ID } from '../data/donatePage'

gsap.registerPlugin(ScrollTrigger)

const PROGRAM_PILLARS = [
  {
    number: '01',
    title: 'Education & Opportunities',
    description:
      'We help children from vulnerable families access educational materials and support so financial hardship does not prevent them from continuing their education and pursuing their dreams.',
  },
  {
    number: '02',
    title: 'Care, Guidance & Well-being',
    description:
      'We walk alongside children from an early age, offering care, encouragement, guidance, and support for their essential needs so they can grow in a safe and supportive environment.',
  },
  {
    number: '03',
    title: 'Personal Growth & Dreams',
    description:
      'We encourage children to discover their strengths, build confidence, and work toward their goals, helping ensure that the circumstances of their birth do not define the future they can achieve.',
  },
] as const

function ChildProfileModal({
  child,
  onClose,
}: {
  child: ProgramChild | null
  onClose: () => void
}) {
  const navigate = useNavigate()
  const titleId = useId()
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!child) return

    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [child, onClose])

  if (!child) return null

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <button
        type="button"
        className="absolute inset-0 bg-ink/70 backdrop-blur-xs transition-opacity"
        aria-label="Close profile dialog"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 grid max-h-[92vh] w-full max-w-4xl overflow-hidden bg-warm-white shadow-2xl md:grid-cols-2"
      >
        <div className="relative min-h-[16rem] bg-ink/5 md:min-h-full">
          <FadeImage
            src={child.image}
            alt={child.name}
            referrerPolicy="no-referrer"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>

        <div className="relative flex max-h-[92vh] flex-col overflow-y-auto p-6 sm:p-8 lg:p-10">
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-1 text-lg font-medium text-primary/50 transition-colors hover:text-primary"
            aria-label="Close modal"
          >
            ✕
          </button>

          <h3
            id={titleId}
            className="pr-8 text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
          >
            {child.name}
          </h3>
          <p className="mt-2 text-xs font-semibold tracking-[0.14em] text-primary uppercase">
            {child.dream}
          </p>

          <dl className="mt-6 space-y-3 border-t border-primary/15 pt-6 text-sm text-primary">
            <div className="flex justify-between gap-4">
              <dt className="text-primary/55">Age</dt>
              <dd className="font-medium">{child.age} years</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-primary/55">Grade</dt>
              <dd className="font-medium">{child.grade}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-primary/55">School</dt>
              <dd className="max-w-[60%] text-right font-medium">
                {child.school}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-primary/55">Location</dt>
              <dd className="max-w-[60%] text-right font-medium">
                {child.location}
              </dd>
            </div>
          </dl>

          <div className="mt-6 border-t border-primary/15 pt-6">
            <p className="text-xs font-semibold tracking-[0.14em] text-primary/55 uppercase">
              About {child.name}
            </p>
            <p className="mt-3 text-base leading-relaxed text-body">
              {child.story}
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3">
            <button
              type="button"
              onClick={() => {
                onClose()
                navigate(`/programs/every-kid-deserves-it/children/${child.id}`)
              }}
              className="inline-flex w-full items-center justify-center rounded-lg border border-primary px-6 py-3 text-sm font-semibold tracking-wide text-primary uppercase transition-colors hover:bg-primary hover:text-warm-white"
            >
              View profile
            </button>
            <button
              type="button"
              onClick={() => {
                onClose()
                navigate(`/donate?program=${EVERY_KID_PROGRAM_ID}&for=${child.id}`)
              }}
              className="inline-flex w-full items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold tracking-wide text-warm-white uppercase transition-colors hover:bg-ink"
            >
              Sponsor
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}

export function EveryKidPage() {
  const { children } = useCms()
  const [selectedChild, setSelectedChild] = useState<ProgramChild | null>(null)
  const parallaxWrapRef = useRef<HTMLDivElement>(null)
  const parallaxVideoRef = useRef<HTMLVideoElement>(null)
  const parallaxImgRef = useRef<HTMLImageElement>(null)
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduceMotion(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useGSAP(
    () => {
      const wrap = parallaxWrapRef.current
      const media = reduceMotion ? parallaxImgRef.current : parallaxVideoRef.current
      if (!wrap || !media) return
      if (reduceMotion) return

      gsap.fromTo(
        media,
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
    { scope: parallaxWrapRef, dependencies: [reduceMotion] },
  )

  return (
    <div className="bg-warm-white text-ink">
      {/* 1. Hero Section, matching home page hero with full-bleed image below */}
      <section className="w-full bg-warm-white">
        <PageHeroIntro
          titleAtTop
          wideDescription
          nudgeDescription
          title={
            <>
              Every Child
              <br />
              Deserves It.
            </>
          }
          description="Every child deserves the opportunity to learn, grow, and pursue their dreams. Yet poverty can make these opportunities difficult to reach. We believe no child's future should be defined by the circumstances into which they were born. Through care, education, mentorship, and encouragement, we walk alongside children as they build their future."
        />

        <div
          ref={parallaxWrapRef}
          className="relative h-[22rem] overflow-hidden sm:h-[32rem] lg:h-dvh"
        >
          {reduceMotion ? (
            <FadeImage
              ref={parallaxImgRef}
              src={siteImages.everyKidHero}
              alt="Children in the program smiling together"
              referrerPolicy="no-referrer"
              className="absolute inset-x-0 top-0 h-[130%] w-full object-cover will-change-transform"
              style={{ objectPosition: 'center 54%' }}
            />
          ) : (
            <video
              ref={parallaxVideoRef}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={siteImages.everyKidHero}
              className="absolute inset-x-0 top-0 h-[130%] w-full object-cover will-change-transform"
              style={{ objectPosition: 'center 54%' }}
              aria-label="Children in the program smiling together"
            >
              <source src={siteVideos.everyKidHero} type="video/webm" />
            </video>
          )}
        </div>
      </section>

      <ProgramChallengeSection
        headline={
          <>
            Lack of opportunity should never define childhood, dignity, or future
          </>
        }
        intro="For children in vulnerable families, whether facing poverty, displacement, or interrupted schooling, insecurity shapes every day. School fees, missing materials, unsafe environments, and little encouragement can keep bright students from returning to class or believing in what comes next."
        callout="Reaching children across growing communities, our education and mentorship work is becoming a critical priority as needs intensify and families look for partners they can trust."
        outro="We work flexibly with local schools, caregivers, and community leaders. Educational materials, tutoring support, safe learning spaces, and consistent mentoring are a few of the ways we show up, so children can stay in school, feel protected, and move forward with hope."
      />

      {/* Program Details & Pillars */}
      <section className="border-b border-primary/15 bg-white py-20 sm:py-24 lg:py-28">
        <div className="site-container">
          <div className="max-w-3xl lg:max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary sm:text-sm">
              How we help
            </p>
            <h2 className="mt-4 text-3xl font-medium tracking-tight text-ink sm:text-4xl lg:text-5xl">
              More than giving notebooks, we also
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-body sm:text-lg">
              Education opens doors, but children need mentorship, safe spaces, and steady
              encouragement to keep moving forward.
            </p>
          </div>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:mt-16 lg:gap-8">
            {PROGRAM_PILLARS.map((pillar) => (
              <div
                key={pillar.number}
                className="flex flex-col justify-between border border-primary/15 bg-white p-7 text-left sm:p-8 lg:p-9 min-h-[300px] sm:min-h-[340px] lg:min-h-[360px]"
              >
                <div>
                  <span className="text-lg font-semibold tracking-tight text-ink sm:text-xl">
                    {pillar.number}
                  </span>
                </div>

                <div className="mt-12 sm:mt-16">
                  <h3 className="text-xl font-semibold tracking-tight text-ink sm:text-2xl">
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

      {/* 2. Children in the program & Donation capability */}
      <section id="children" className="border-b border-white/10 bg-black py-20 sm:py-24 lg:py-28">
        <div className="site-container">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                Direct Impact
              </p>
              <h2 className="mt-2 text-3xl font-medium tracking-tight text-warm-white sm:text-4xl lg:text-5xl">
                Children in the Program
              </h2>
            </div>
          </div>

          {/* Children Grid, 4 cards matching the blog cards architecture */}
          <div className="mt-14 grid grid-cols-1 items-stretch gap-4 sm:mt-16 sm:grid-cols-2 sm:gap-6 lg:mt-20 lg:grid-cols-4">
            {children.slice(0, 4).map((child) => (
              <article
                key={child.id}
                onClick={() => setSelectedChild(child)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setSelectedChild(child)
                  }
                }}
                role="button"
                tabIndex={0}
                className="flex h-full cursor-pointer flex-col overflow-hidden bg-white text-left text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
              >
                <div className="aspect-square w-full overflow-hidden bg-warm-white">
                  <FadeImage
                    src={child.image}
                    alt={child.name}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="flex flex-1 flex-col border-t border-ink/10 bg-white px-6 py-8 sm:px-6 sm:py-8 lg:px-6 lg:py-8 xl:px-8 xl:py-10">
                  <p className="text-xs font-medium tracking-[0.12em] text-body uppercase">
                    {child.grade} &bull; {child.age} yrs{' '}
                    <span className="text-ink/25" aria-hidden>
                      |
                    </span>{' '}
                    {child.location}
                  </p>

                  <h3 className="mt-6 text-xl font-medium leading-snug tracking-tight text-ink sm:text-2xl lg:text-3xl">
                    {child.name}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-body">
                    {child.dream}
                  </p>

                  <p className="mt-1 text-xs text-body">
                    {child.school}
                  </p>

                  <div className="mt-auto pt-8">
                    <span className="inline-flex min-w-[7.5rem] items-center justify-center rounded-lg border border-accent bg-accent px-6 py-2 text-sm font-medium leading-normal text-ink transition-colors hover:bg-accent/90">
                      Read more
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Modal Component */}
      {selectedChild && (
        <ChildProfileModal
          key={selectedChild.id}
          child={selectedChild}
          onClose={() => setSelectedChild(null)}
        />
      )}
    </div>
  )
}

