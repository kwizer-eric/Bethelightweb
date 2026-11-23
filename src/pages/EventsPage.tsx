import { events, site } from '../data/site'
import { PageHero } from '../components/layout/PageHero'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { SectionHeading } from '../components/ui/SectionHeading'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function EventsPage() {
  return (
    <>
      <PageHero
        eyebrow="Events"
        title="Show up. Stand up. Give back."
        subtitle="Join us at walks, galas, and community gatherings."
        cta={{ label: 'Join us', href: site.memberApplicationForm }}
      />

      <section className="py-20">
        <div className="site-container">
          <SectionHeading title="Upcoming events" />
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <Card key={event.id}>
                <time className="text-sm font-semibold text-ink" dateTime={event.date}>
                  {formatDate(event.date)}
                </time>
                <h3 className="mt-2 text-xl font-bold text-ink">{event.title}</h3>
                <p className="mt-1 text-sm text-body">{event.location}</p>
                <p className="mt-3 text-body">{event.description}</p>
                <Button variant="outline" size="sm" className="mt-4" onClick={() => {}}>
                  Register interest
                </Button>
              </Card>
            ))}
          </div>
          <p className="mt-12 text-center text-sm text-body">
            Phase 2: interactive event calendar with registration and reminders.
          </p>
        </div>
      </section>
    </>
  )
}
