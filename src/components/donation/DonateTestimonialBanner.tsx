import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { FadeImage } from '../FadeImage'

gsap.registerPlugin(ScrollTrigger)

export function DonateTestimonialBanner() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  useGSAP(
    () => {
      const wrap = wrapRef.current
      const img = imgRef.current
      if (!wrap || !img) return
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      gsap.fromTo(
        img,
        { yPercent: -12 },
        {
          yPercent: 12,
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
    { scope: wrapRef },
  )

  return (
    <section ref={wrapRef} className="relative h-dvh min-h-[28rem] w-full overflow-hidden">
      <FadeImage
        ref={imgRef}
        src="https://res.cloudinary.com/efzpryhb/image/upload/v1795222431/_DSC8061_qsfdws.avif"
        alt=""
        referrerPolicy="no-referrer"
        className="absolute inset-x-0 top-0 h-[130%] w-full object-cover object-[70%_center] will-change-transform"
      />
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-black/80 via-black/45 to-black/25"
        aria-hidden
      />

      <div className="relative z-10 flex h-full min-h-[inherit] items-center">
        <div className="flex max-w-lg items-stretch gap-5 px-8 py-10 sm:max-w-xl sm:gap-6 sm:px-10 md:px-12 lg:max-w-2xl lg:px-16 lg:py-14">
          <div className="w-1 shrink-0 rounded-full bg-[#C85A32]" aria-hidden />
          <blockquote className="text-left text-xl font-semibold leading-snug text-white sm:text-2xl lg:text-[1.75rem] lg:leading-relaxed">
            I give because Kubwabo walks alongside children and families for the long road—not a
            quick fix, but lasting support. Seeing children stay in school and families grow stronger
            keeps me connected to the impact we&apos;re making together.
          </blockquote>
        </div>
      </div>
    </section>
  )
}