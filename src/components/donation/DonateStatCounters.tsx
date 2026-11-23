import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { id: 'reach', display: '100%', label: 'Goes to programs', numeric: false as const },
  { id: 'children', end: 35, suffix: '+', label: 'Children reached', numeric: true as const },
] as const

function StatItem({
  stat,
}: {
  stat: (typeof STATS)[number]
}) {
  const valueRef = useRef<HTMLSpanElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const el = valueRef.current
      const wrap = wrapRef.current
      if (!el || !wrap) return
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        if (stat.numeric) el.textContent = `${stat.end}${stat.suffix}`
        return
      }

      if (!stat.numeric) {
        gsap.fromTo(
          el,
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            scrollTrigger: { trigger: wrap, start: 'top 85%' },
          },
        )
        return
      }

      const obj = { val: 0 }
      gsap.to(obj, {
        val: stat.end,
        duration: 1.4,
        ease: 'power2.out',
        scrollTrigger: { trigger: wrap, start: 'top 85%' },
        onUpdate: () => {
          el.textContent = `${Math.round(obj.val)}${stat.suffix}`
        },
      })
    },
    { scope: wrapRef, dependencies: [stat.id] },
  )

  return (
    <div ref={wrapRef}>
      <span
        ref={valueRef}
        className="text-3xl font-bold text-ink md:text-4xl"
      >
        {stat.numeric ? `0${stat.suffix}` : stat.display}
      </span>
      <p className="mt-1 text-xs text-body md:text-sm">{stat.label}</p>
    </div>
  )
}

export function DonateStatCounters() {
  return (
    <div className="mt-8 grid grid-cols-2 gap-6 border-t border-ink/10 pt-8">
      {STATS.map((stat) => (
        <StatItem key={stat.id} stat={stat} />
      ))}
    </div>
  )
}