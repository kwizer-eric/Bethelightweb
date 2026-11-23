import { useState, type FormEvent, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Logo } from '../ui/Logo'
import { site, navLinks, programLinks } from '../../data/site'
import { subscribeNewsletter } from '../../lib/newsletter'

const socialLinks = [
  {
    label: 'Instagram',
    href: site.social.instagram,
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069ZM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: site.social.linkedin,
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.062 2.062 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    href: site.whatsapp,
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
      </svg>
    ),
  },
] as const

function FooterTopBar() {
  const [submitted, setSubmitted] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubscribe(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const email = String(data.get('email') ?? '').trim()
    if (!email) return
    setSaving(true)
    setError(null)
    const message = await subscribeNewsletter(email)
    setSaving(false)
    if (message) {
      setError(message)
      return
    }
    form.reset()
    setSubmitted(true)
  }

  return (
    <div className="border-b border-warm-white/15">
      <div className="site-container flex flex-col gap-10 py-12 lg:flex-row lg:items-end lg:justify-between lg:py-16">
        <div className="max-w-md">
          <Link to="/" className="inline-block" aria-label="Kubwabo Foundation home">
            <Logo tone="warm-white" className="h-8 sm:h-9" />
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-warm-white/65 sm:text-base">
            Supporting children through education, protection, and emergency relief.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {socialLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                aria-label={item.label}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-warm-white/15 bg-warm-white/5 text-warm-white transition-colors hover:border-warm-white/30 hover:bg-warm-white/10"
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="w-full lg:max-w-md lg:pb-1">
          <p className="text-base font-semibold text-warm-white sm:text-lg">
            Subscribe to our newsletter
          </p>
          {submitted ? (
            <p className="mt-4 text-sm text-warm-white/70">
              Thanks, you&apos;re on the list. We&apos;ll keep you updated.
            </p>
          ) : (
            <form
              onSubmit={onSubscribe}
              className="mt-4 flex w-full overflow-hidden rounded-lg border border-warm-white/20"
            >
              <input
                type="email"
                name="email"
                required
                autoComplete="email"
                placeholder="Email address"
                disabled={saving}
                className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-warm-white placeholder:text-warm-white/45 focus:outline-none disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={saving}
                className="shrink-0 bg-warm-white/20 px-5 py-3 text-sm font-medium text-warm-white transition-colors hover:bg-warm-white/30 disabled:opacity-60"
              >
                {saving ? 'Saving…' : 'Subscribe'}
              </button>
            </form>
          )}
          {error ? (
            <p className="mt-2 text-xs text-red-300" role="alert">
              {error}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  )
}

function ColumnHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="flex items-center gap-2.5 text-sm font-semibold tracking-tight text-warm-white sm:text-base">
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-warm-white" aria-hidden />
      {children}
    </h2>
  )
}

const columnClass =
  'flex flex-col items-start justify-start gap-4 py-6 sm:gap-8 sm:py-10 lg:py-12'

function IconPin() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  )
}

function IconPhone() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  )
}

function IconMail() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

function ContactInfoRow({
  icon,
  label,
  children,
}: {
  icon: ReactNode
  label: string
  children: ReactNode
}) {
  return (
    <div className="flex items-start gap-4">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-warm-white/15 bg-warm-white/5 text-accent">
        {icon}
      </span>
      <div className="min-w-0 pt-0.5">
        <p className="text-base font-semibold text-warm-white">{label}</p>
        <div className="mt-1.5 text-sm leading-relaxed text-warm-white/65">{children}</div>
      </div>
    </div>
  )
}

function FooterLegalBar() {
  const year = new Date().getFullYear()

  return (
    <div className="border-t border-warm-white/15">
      <div className="site-container flex flex-col items-center gap-3 py-5 text-center text-xs text-warm-white/55 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-4 sm:text-left sm:text-sm">
        <p>
          © {year} {site.name}. All rights reserved.
        </p>
        <p className="w-full sm:w-auto">
          Built by{' '}
          <a
            href="https://norfcre8ions.com/"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-warm-white/75 transition-colors hover:text-warm-white"
          >
            Norf Cre8ions
          </a>
        </p>
      </div>
    </div>
  )
}

export function Footer() {
  return (
    <footer className="bg-black text-warm-white">
      <FooterTopBar />
      <div className="site-container pt-2 sm:pt-4">
        <div className="grid grid-cols-1 items-stretch gap-0 sm:grid-cols-2 lg:grid-cols-3">
          <div
            className={`${columnClass} lg:border-r lg:border-warm-white/20 lg:pr-8 xl:pr-10`}
          >
            <ColumnHeading>Contact Info</ColumnHeading>
            <div className="flex w-full flex-col gap-8">
              <ContactInfoRow icon={<IconPin />} label="Address:">
                <p>{site.address}</p>
              </ContactInfoRow>
              <ContactInfoRow icon={<IconPhone />} label="Phone:">
                <a href={`tel:${site.phone.replace(/\s/g, '')}`} className="hover:text-warm-white">
                  {site.phone}
                </a>
              </ContactInfoRow>
              <ContactInfoRow icon={<IconMail />} label="Email:">
                <a href={`mailto:${site.email}`} className="hover:text-warm-white">
                  {site.email}
                </a>
              </ContactInfoRow>
            </div>
          </div>

          <div
            className={`${columnClass} sm:pl-6 lg:border-r lg:border-warm-white/20 lg:px-8 xl:px-10`}
          >
            <ColumnHeading>Pages</ColumnHeading>
            <ul className="space-y-2 text-sm text-warm-white/90 sm:text-base">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/donate#faq" className="transition-colors hover:text-accent">
                  FAQ
                </Link>
              </li>
              <li>
                <a
                  href={site.memberApplicationForm}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-accent"
                >
                  Join us
                </a>
              </li>
            </ul>
          </div>

          <div className={`${columnClass} sm:pl-6 lg:pl-8 xl:pl-10`}>
            <ColumnHeading>Programs</ColumnHeading>
            <ul className="space-y-2 text-sm text-warm-white/90 sm:text-base">
              {programLinks.map((program) => (
                <li key={program.href}>
                  <Link
                    to={program.href}
                    className="transition-colors hover:text-accent"
                  >
                    {program.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <FooterLegalBar />
    </footer>
  )
}