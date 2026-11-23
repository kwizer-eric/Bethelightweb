import { site, values } from '../data/site'
import { PageHero } from '../components/layout/PageHero'
import { Card } from '../components/ui/Card'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Button } from '../components/ui/Button'

export function MissionPage() {
  return (
    <>
      <PageHero
        eyebrow="Mission"
        title="Our mission & vision"
        subtitle="Delivering relief and long-term opportunity with transparency and dignity."
        cta={{ label: 'See our programs', to: '/about' }}
        secondaryCta={{ label: 'Join us', href: site.memberApplicationForm }}
      />

      <section className="py-20">
        <div className="site-container">
          <div className="grid gap-8 md:grid-cols-2">
            <Card hover={false}>
              <h2 className="text-xl font-bold text-ink">Mission</h2>
              <p className="mt-3 leading-relaxed text-body">
                Deliver immediate relief and long-term opportunity to underserved communities
                through food, education, health, and shelter programs — with transparency and
                dignity at the center.
              </p>
            </Card>
            <Card hover={false}>
              <h2 className="text-xl font-bold text-ink">Vision</h2>
              <p className="mt-3 leading-relaxed text-body">
                A world where no family goes hungry, no child is denied education, and every
                community has the resources to thrive on its own terms.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="bg-primary/5 py-20">
        <div className="site-container">
          <SectionHeading eyebrow="Values" title="What we stand for" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <Card key={v.title}>
                <h3 className="text-lg font-bold text-ink">{v.title}</h3>
                <p className="mt-2 text-sm text-body">{v.description}</p>
              </Card>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button href={site.memberApplicationForm} size="lg">
              Join us
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
