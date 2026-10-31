import { useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { HomeCtaSection } from '../components/home/HomeCtaSection'
import { useCms } from '../cms/CmsContext'
import type { ProgramChild } from '../cms/types'

gsap.registerPlugin(ScrollTrigger)

const PROGRAM_HERO_IMAGE =
  'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1920&q=85'

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
          <img
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
            className="pr-8 text-3xl font-semibold tracking-tight text-primary sm:text-4xl"
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
            <p className="mt-3 text-base leading-relaxed text-primary">
              {child.story}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="mt-8 inline-flex w-full items-center justify-center bg-primary px-6 py-3 text-sm font-semibold tracking-wide text-warm-white uppercase transition-colors hover:bg-ink"
          >
            Sponsor
          </button>
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
      {/* 1. Hero Section — matching home page hero with full-bleed image below */}
      <section className="w-full bg-warm-white">
        <div className="site-container pt-28 pb-20 sm:pt-32 sm:pb-24 lg:pt-36 lg:pb-28">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-20">
            <div>
              <h1 className="text-3xl font-medium tracking-tight text-primary sm:text-4xl lg:text-5xl">
                Every Child
                <br />
                Deserves It.
              </h1>
            </div>

            <div className="w-full space-y-6">
              <p className="text-base leading-relaxed text-primary sm:text-lg">
                Every Child Deserves It is a program of Kubwabo Foundation dedicated to walking alongside children from vulnerable families, helping them access opportunities, discover their potential, and work toward their dreams.
              </p>
              <p className="text-base leading-relaxed text-primary/80 sm:text-lg">
                Just as many of us have been supported by our parents and others who believed in us, we believe every child deserves someone who cares, encourages them, and helps them move forward. Through educational support, mentorship, guidance, and continued encouragement, we aim to help children overcome barriers and build a brighter future.
              </p>
            </div>
          </div>
        </div>

        <div
          ref={parallaxWrapRef}
          className="relative h-dvh overflow-hidden"
        >
          <img
            ref={parallaxImgRef}
            src={PROGRAM_HERO_IMAGE}
            alt="Children in the program smiling together"
            referrerPolicy="no-referrer"
            className="absolute inset-x-0 top-0 h-[130%] w-full object-cover will-change-transform"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/30 via-primary/5 to-transparent"
            aria-hidden
          />
        </div>
      </section>

      {/* Program Details & Pillars */}
      <section className="border-b border-primary/15 bg-white py-20 sm:py-24 lg:py-28">
        <div className="site-container">
          <div className="max-w-3xl lg:max-w-4xl">
            <h2 className="mt-3 text-3xl font-medium tracking-tight text-primary sm:text-4xl">
              A Community That Cares
            </h2>
            <p className="mt-4 text-base leading-relaxed text-primary/80 sm:text-lg">
              Through consistent support, compassionate guidance, and access to educational opportunities, we create a supportive environment where children feel valued, develop their strengths, and build hope for the future.
            </p>
          </div>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {PROGRAM_PILLARS.map((pillar) => (
              <div
                key={pillar.number}
                className="flex flex-col justify-between border border-primary/15 bg-white p-7 text-left sm:p-8 lg:p-9 min-h-[300px] sm:min-h-[340px] lg:min-h-[360px]"
              >
                <div>
                  <span className="text-lg font-semibold tracking-tight text-primary sm:text-xl">
                    {pillar.number}
                  </span>
                </div>

                <div className="mt-12 sm:mt-16">
                  <h3 className="text-xl font-semibold tracking-tight text-primary sm:text-2xl">
                    {pillar.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-primary/80 sm:text-base">
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

          {/* Children Grid — 4 cards matching the blog cards architecture */}
          <div className="mt-14 grid grid-cols-1 items-stretch sm:grid-cols-2 lg:grid-cols-4 sm:mt-16 lg:mt-20">
            {children.slice(0, 4).map((child, index) => (
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
                className={`flex h-full flex-col border-white/15 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                  index > 0 ? 'border-t sm:border-t-0' : ''
                } ${index % 2 !== 0 ? 'sm:border-l' : ''} ${
                  index >= 2 ? 'sm:border-t lg:border-t-0' : ''
                } ${index > 0 ? 'lg:border-l' : ''}`}
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-white/5">
                  <img
                    src={child.image}
                    alt={child.name}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="flex flex-1 flex-col border-t border-white/15 px-6 py-8 sm:px-6 sm:py-8 lg:px-6 lg:py-8 xl:px-8 xl:py-10">
                  <p className="text-xs font-medium tracking-[0.12em] text-warm-white/70 uppercase">
                    {child.grade} &bull; {child.age} yrs{' '}
                    <span className="text-warm-white/35" aria-hidden>
                      |
                    </span>{' '}
                    {child.location}
                  </p>

                  <h3 className="mt-6 text-xl leading-snug font-medium tracking-tight text-warm-white sm:text-2xl lg:text-3xl">
                    {child.name}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-warm-white/80">
                    {child.dream}
                  </p>

                  <p className="mt-1 text-xs text-warm-white/50">
                    {child.school}
                  </p>

                  <div className="mt-auto pt-8">
                    <span className="inline-flex min-w-[7.5rem] items-center justify-center border border-warm-white px-6 py-2 text-sm font-medium leading-normal text-warm-white transition-colors hover:border-accent hover:bg-accent hover:text-ink">
                      Read more
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <HomeCtaSection />

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

