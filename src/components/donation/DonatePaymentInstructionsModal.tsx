import { useEffect, useId, useRef } from 'react'
import { createPortal } from 'react-dom'
import { formatDonateAmount, type DonateCurrencyCode } from '../../data/donatePage'
import { site } from '../../data/site'
import type { DonationFrequency } from '../../lib/donation'

export type DonatePaymentSummary = {
  amount: number
  frequency: DonationFrequency
  currency: DonateCurrencyCode
  firstName: string
  lastName: string
  programLabel?: string
  childName?: string
}

type DonatePaymentInstructionsModalProps = {
  open: boolean
  onClose: () => void
  /** Called when donor taps Done after reading payment steps */
  onComplete?: () => void
  gift: DonatePaymentSummary | null
}

function CopyButton({ value, label }: { value: string; label: string }) {
  async function copy() {
    try {
      await navigator.clipboard.writeText(value)
    } catch {
      /* ignore */
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="shrink-0 rounded-md border border-ink/15 px-3 py-1.5 text-xs font-semibold text-ink transition-colors hover:bg-warm-white"
    >
      Copy {label}
    </button>
  )
}

export function DonatePaymentInstructionsModal({
  open,
  onClose,
  onComplete,
  gift,
}: DonatePaymentInstructionsModalProps) {
  const titleId = useId()
  const closeRef = useRef<HTMLButtonElement>(null)
  const { donation } = site

  useEffect(() => {
    if (!open) return

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

  if (!open || !gift) return null

  const formatted = formatDonateAmount(gift.amount, gift.currency)
  const amountLabel =
    gift.frequency === 'monthly' ? `${formatted} per month` : `${formatted} one-time`
  const referenceParts = [gift.firstName, gift.lastName, gift.programLabel, gift.childName].filter(
    Boolean,
  )
  const reference = referenceParts.join(' — ')

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <button
        type="button"
        className="absolute inset-0 bg-ink/60"
        aria-label="Close payment instructions"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 flex max-h-[min(90dvh,44rem)] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-xl"
      >
        <div className="border-b border-ink/10 px-6 py-5 sm:px-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold tracking-[0.16em] text-primary uppercase">
                Complete your gift
              </p>
              <h2 id={titleId} className="mt-2 text-2xl font-bold tracking-tight text-ink">
                Payment instructions
              </h2>
              <p className="mt-2 text-sm text-body">
                We don&apos;t process cards online yet. Use Mobile Money or bank transfer for{' '}
                <span className="font-semibold text-ink">{amountLabel}</span>.
              </p>
            </div>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="shrink-0 rounded-lg px-2 py-1 text-xl leading-none text-ink/50 transition-colors hover:text-ink"
              aria-label="Close"
            >
              ×
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 sm:px-8">
          <section className="rounded-xl border border-ink/10 bg-warm-white p-5">
            <h3 className="text-sm font-bold text-ink">{donation.momoLabel}</h3>
            <dl className="mt-4 space-y-4 text-sm">
              <div>
                <dt className="font-medium text-body">MoMo code</dt>
                <dd className="mt-0.5 text-xs text-body">Account name: {donation.momoCodeAccountName}</dd>
                <dd className="mt-1 flex flex-wrap items-center justify-between gap-2">
                  <code className="font-mono text-base font-semibold text-ink">{donation.momoCode}</code>
                  <CopyButton value={donation.momoCode} label="code" />
                </dd>
              </div>
              <div>
                <dt className="font-medium text-body">MoMo number</dt>
                <dd className="mt-0.5 text-xs text-body">
                  Account name: {donation.momoPhoneAccountName}
                </dd>
                <dd className="mt-1 flex flex-wrap items-center justify-between gap-2">
                  <span className="font-semibold text-ink">{donation.momoPhone}</span>
                  <CopyButton value={donation.momoPhone.replace(/\s/g, '')} label="number" />
                </dd>
              </div>
            </dl>
          </section>

          <section className="mt-4 rounded-xl border border-ink/10 bg-warm-white p-5">
            <h3 className="text-sm font-bold text-ink">Bank transfer</h3>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-body">Bank</dt>
                <dd className="text-right font-medium text-ink">{donation.bankName}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-body">Account name</dt>
                <dd className="text-right font-medium text-ink">{donation.accountName}</dd>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <dt className="text-body">Account number</dt>
                <dd className="flex flex-wrap items-center gap-2">
                  <span className="font-mono font-semibold text-ink">{donation.accountNumber}</span>
                  <CopyButton value={donation.accountNumber} label="account" />
                </dd>
              </div>
              <div className="flex justify-between gap-4 border-t border-ink/10 pt-3">
                <dt className="text-body">Address</dt>
                <dd className="max-w-[14rem] text-right font-medium text-ink">{site.address}</dd>
              </div>
            </dl>
          </section>

          <p className="mt-4 rounded-lg border-l-4 border-accent bg-accent/15 px-4 py-3 text-xs leading-relaxed text-ink">
            <span className="font-semibold">Reference:</span> use &ldquo;{reference}&rdquo; so we can
            match your gift. {donation.note}
          </p>
        </div>

        <div className="border-t border-ink/10 px-6 py-4 sm:px-8">
          <button
            type="button"
            onClick={() => (onComplete ? onComplete() : onClose())}
            className="w-full rounded-lg bg-accent py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-accent/90"
          >
            I&apos;ve sent my gift
          </button>
        </div>
      </div>
    </div>,
    document.body,
  )
}