import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

const volunteerCard = {
  title: (
    <>
      Volunteer
      <br />
      <span className="italic font-normal">with</span> us
    </>
  ),
  description:
    'Your time and compassion can make a lasting difference. Join our volunteers in supporting families, empowering children, and bringing essential services to communities in need.',
  image:
    'https://images.unsplash.com/flagged/photo-1555251255-e9a095d6eb9d?auto=format&fit=crop&w=1400&q=85',
} as const

const supportCard = {
  title: (
    <>
      Support
      <br />
      <span className="italic font-normal">the</span> Mission
    </>
  ),
  description:
    'Every donation helps connect families with essential resources, support, and life-changing opportunities.',
  image:
    'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1400&q=85',
} as const

const cardClass =
  'group relative flex min-h-[36rem] w-full flex-col justify-between overflow-hidden p-8 text-left sm:min-h-[42rem] sm:p-10'

const fieldClass =
  'w-full border border-ink/15 bg-warm-white px-4 py-2.5 text-sm text-ink placeholder:text-ink/45 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20'

function CardVisual({
  image,
  title,
  description,
}: {
  image: string
  title: ReactNode
  description: string
}) {
  return (
    <>
      <img
        src={image}
        alt=""
        referrerPolicy="no-referrer"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      />
      <div className="absolute inset-0 bg-ink/45 transition-opacity duration-300 group-hover:opacity-0" />
      <div className="absolute inset-0 bg-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <h2 className="relative z-10 max-w-[15rem] text-3xl leading-tight text-warm-white sm:text-5xl">
        {title}
      </h2>
      <p className="relative z-10 mb-14 max-w-md translate-y-4 text-sm leading-relaxed text-warm-white/90 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:mb-16 sm:text-base">
        {description}
      </p>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[60px] bg-[length:300px_60px] bg-repeat-x bg-bottom opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ backgroundImage: 'url(/pattern1.svg)' }}
      />
    </>
  )
}

function VolunteerModal({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const titleId = useId()
  const closeRef = useRef<HTMLButtonElement>(null)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (!open) {
      setSubmitted(false)
      return
    }

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
  }, [open, onClose])

  if (!open) return null

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
  }

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <button
        type="button"
        className="absolute inset-0 bg-ink/60"
        aria-label="Close volunteer form"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 w-full max-w-md border border-ink/10 bg-warm-white p-6 shadow-xl sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium tracking-[0.12em] text-ink/55 uppercase">
              Volunteer
            </p>
            <h3
              id={titleId}
              className="mt-2 text-2xl font-semibold tracking-tight text-ink"
            >
              Join our volunteer list
            </h3>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="shrink-0 px-2 py-1 text-sm font-medium text-ink/60 transition-colors hover:text-ink"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {submitted ? (
          <div className="mt-8">
            <p className="text-base leading-relaxed text-ink/80">
              Thanks — you&apos;re on the list. We&apos;ll reach out on WhatsApp
              soon.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 inline-flex min-w-[7.5rem] items-center justify-center bg-primary px-6 py-2 text-sm font-medium text-warm-white transition-colors hover:bg-ink"
            >
              Close
            </button>
          </div>
        ) : (
          <form className="mt-8 flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="volunteer-name" className="mb-1.5 block text-sm font-medium text-ink">
                Name
              </label>
              <input
                id="volunteer-name"
                name="name"
                type="text"
                required
                autoComplete="name"
                placeholder="Your full name"
                className={fieldClass}
              />
            </div>

            <div>
              <label
                htmlFor="volunteer-location"
                className="mb-1.5 block text-sm font-medium text-ink"
              >
                Location
              </label>
              <input
                id="volunteer-location"
                name="location"
                type="text"
                required
                autoComplete="address-level2"
                placeholder="City / area"
                className={fieldClass}
              />
            </div>

            <div>
              <label
                htmlFor="volunteer-whatsapp"
                className="mb-1.5 block text-sm font-medium text-ink"
              >
                WhatsApp phone number
              </label>
              <input
                id="volunteer-whatsapp"
                name="whatsapp"
                type="tel"
                required
                autoComplete="tel"
                placeholder="+250 7XX XXX XXX"
                className={fieldClass}
              />
            </div>

            <button
              type="submit"
              className="mt-2 inline-flex min-w-[7.5rem] items-center justify-center self-start bg-primary px-6 py-2 text-sm font-medium text-warm-white transition-colors hover:bg-ink"
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </div>,
    document.body,
  )
}

export function HomeCtaSection() {
  const [volunteerOpen, setVolunteerOpen] = useState(false)

  return (
    <section className="bg-warm-white py-16 lg:py-20">
      <div className="site-container grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
        <button
          id="volunteer"
          type="button"
          className={cardClass}
          aria-haspopup="dialog"
          aria-expanded={volunteerOpen}
          onClick={() => setVolunteerOpen(true)}
        >
          <CardVisual {...volunteerCard} />
        </button>

        <div
          id="support"
          className={cardClass}
          role="group"
          aria-label="Support the Mission"
        >
          <CardVisual {...supportCard} />
        </div>
      </div>

      <VolunteerModal open={volunteerOpen} onClose={() => setVolunteerOpen(false)} />
    </section>
  )
}
