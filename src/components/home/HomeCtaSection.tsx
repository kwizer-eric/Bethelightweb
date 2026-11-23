import { useEffect, useId, useRef, useState, type FormEvent } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { siteImages } from '../../assets/siteImages'
import { OutreachCtaSection, outreachCtaButtonClass } from './OutreachCtaSection'

const fieldClass =
  'w-full border border-ink/15 bg-warm-white px-4 py-2.5 text-sm text-ink placeholder:text-ink/45 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20'

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
            <p className="text-xs font-medium tracking-[0.12em] text-ink/55 uppercase">Volunteer</p>
            <h3 id={titleId} className="mt-2 text-2xl font-semibold tracking-tight text-ink">
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
            <p className="text-base leading-relaxed text-body">
              Thanks, you&apos;re on the list. We&apos;ll reach out on WhatsApp soon.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 inline-flex min-w-[7.5rem] items-center justify-center rounded-lg bg-primary px-6 py-2 text-sm font-medium text-warm-white transition-colors hover:bg-ink"
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
              className="mt-2 inline-flex min-w-[7.5rem] items-center justify-center self-start rounded-lg bg-primary px-6 py-2 text-sm font-medium text-warm-white transition-colors hover:bg-ink"
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
    <>
      <OutreachCtaSection
        eyebrow="Be part of their future"
        title="Every child needs a safe place to grow their own"
        description="Kubwabo Foundation partners with local organizations to build child protection and support networks that last. These partners don't wait for help. They lead it."
        primaryImage={siteImages.homeOurStory}
        primaryImageAlt="A caregiver and child supported by Kubwabo Foundation"
        cta={
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              className={outreachCtaButtonClass}
              aria-haspopup="dialog"
              aria-expanded={volunteerOpen}
              onClick={() => setVolunteerOpen(true)}
            >
              Become a Volunteer
            </button>
            <Link
              to="/donate"
              className="text-sm font-medium text-ink underline decoration-ink/30 underline-offset-4 transition-colors hover:text-primary"
            >
              Support the mission
            </Link>
          </div>
        }
      />

      <VolunteerModal open={volunteerOpen} onClose={() => setVolunteerOpen(false)} />
    </>
  )
}