import type { ReactNode } from 'react'
import { Button } from '../ui/Button'

type HeroCta = { label: string; to?: string; href?: string }

type Props = {
  title: string
  subtitle?: string
  eyebrow?: string
  cta?: HeroCta
  secondaryCta?: HeroCta
  children?: ReactNode
  compact?: boolean
}

function HeroButton({
  cta,
  variant,
  className,
}: {
  cta: HeroCta
  variant: 'secondary' | 'outline'
  className?: string
}) {
  if (cta.href) {
    return (
      <Button href={cta.href} variant={variant} size="lg" className={className}>
        {cta.label}
      </Button>
    )
  }
  return (
    <Button to={cta.to ?? '/'} variant={variant} size="lg" className={className}>
      {cta.label}
    </Button>
  )
}

export function PageHero({
  title,
  subtitle,
  eyebrow,
  cta,
  secondaryCta,
  children,
  compact = false,
}: Props) {
  return (
    <section
      className={`relative overflow-hidden bg-primary text-warm-white ${compact ? 'py-16' : 'py-24 sm:py-32'}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(243,234,216,0.15),transparent_50%)]" />
      <div className="relative site-container">
        {eyebrow && (
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-warm-white/80">
            {eyebrow}
          </p>
        )}
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-6 max-w-2xl text-lg text-warm-white/90 sm:text-xl">{subtitle}</p>
        )}
        {(cta || secondaryCta) && (
          <div className="mt-8 flex flex-wrap gap-4">
            {cta ? <HeroButton cta={cta} variant="secondary" /> : null}
            {secondaryCta ? (
              <HeroButton
                cta={secondaryCta}
                variant="outline"
                className="border-warm-white text-warm-white hover:bg-warm-white hover:text-primary"
              />
            ) : null}
          </div>
        )}
        {children}
      </div>
    </section>
  )
}
