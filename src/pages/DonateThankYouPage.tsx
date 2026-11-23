import { Link, useLocation, Navigate } from 'react-router-dom'
import { formatDonateAmount, DEFAULT_DONATE_CURRENCY } from '../data/donatePage'
import { site } from '../data/site'
import type { DonatePaymentSummary } from '../components/donation/DonatePaymentInstructionsModal'

export function DonateThankYouPage() {
  const location = useLocation()
  const gift = location.state as DonatePaymentSummary | null | undefined

  if (!gift?.firstName) {
    return <Navigate to="/donate" replace />
  }

  const amountText = formatDonateAmount(gift.amount, gift.currency ?? DEFAULT_DONATE_CURRENCY)
  const timing = gift.frequency === 'monthly' ? 'each month' : 'today'
  const programLine = [gift.programLabel, gift.childName ? `for ${gift.childName}` : null]
    .filter(Boolean)
    .join(' · ')

  return (
    <div className="bg-white text-ink">
      <section className="site-container flex min-h-[calc(100dvh-5rem)] flex-col items-center justify-center py-20 text-center md:py-28">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent text-3xl text-ink">
          ✓
        </div>

        <p className="mt-6 text-xs font-semibold tracking-[0.2em] text-primary uppercase">
          Thank you
        </p>
        <h1 className="mt-3 max-w-lg text-3xl font-bold tracking-tight text-ink md:text-4xl">
          {gift.firstName}, thank you for walking alongside them
        </h1>

        <p className="mt-5 max-w-md text-base leading-relaxed text-body">
          Once your {amountText} gift {timing} reaches us, it goes directly toward education,
          mentorship, and family-strengthening support
          {programLine ? (
            <>
              {' '}
              for <span className="font-medium text-ink">{programLine}</span>
            </>
          ) : null}
          . We&apos;ll confirm by email when your transfer is matched.
        </p>

        <p className="mt-4 max-w-md text-sm text-body">
          Questions? Reply to your confirmation email or reach us at{' '}
          <a href={`mailto:${site.email}`} className="font-medium text-primary hover:underline">
            {site.email}
          </a>
          .
        </p>

        <div className="mt-10 flex w-full max-w-sm flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-lg bg-accent px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-accent/90"
          >
            Back to home
          </Link>
          <Link
            to="/donate"
            className="inline-flex items-center justify-center rounded-lg border border-ink/15 bg-white px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-warm-white"
          >
            Give again
          </Link>
        </div>
      </section>
    </div>
  )
}