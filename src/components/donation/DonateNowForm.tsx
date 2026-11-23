import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  DONATE_COUNTRIES,
  DONATE_CURRENCIES,
  DONATE_PROGRAMS,
  DEFAULT_DONATE_CURRENCY,
  DEFAULT_DONATE_PROGRAM_ID,
  currencyInputPrefix,
  donateImpactLine,
  formatDonateAmount,
  type DonateCurrencyCode,
} from '../../data/donatePage'
import { useCms } from '../../cms/CmsContext'
import { submitDonation, type DonationFrequency } from '../../lib/donation'
import {
  DonatePaymentInstructionsModal,
  type DonatePaymentSummary,
} from './DonatePaymentInstructionsModal'

const inputClass =
  'w-full rounded-lg border border-ink/15 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20'

const labelClass = 'mb-1.5 block text-sm font-medium text-ink'

function resolveProgramId(programId?: string) {
  if (programId && DONATE_PROGRAMS.some((p) => p.id === programId)) return programId
  return (
    DONATE_PROGRAMS.find((p) => p.id === DEFAULT_DONATE_PROGRAM_ID)?.id ??
    DONATE_PROGRAMS[0]?.id ??
    DEFAULT_DONATE_PROGRAM_ID
  )
}

type DonateNowFormProps = {
  featured?: boolean
  initialProgramId?: string
  initialChildId?: string
}

export function DonateNowForm({
  featured = false,
  initialProgramId,
  initialChildId,
}: DonateNowFormProps) {
  const navigate = useNavigate()
  const { children: programChildren } = useCms()
  const frequency: DonationFrequency = 'one-time'
  const [amountInput, setAmountInput] = useState('')
  const [currency, setCurrency] = useState<DonateCurrencyCode>(DEFAULT_DONATE_CURRENCY)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [programId, setProgramId] = useState(() => resolveProgramId(initialProgramId))
  const [childId, setChildId] = useState(initialChildId ?? '')
  const [country, setCountry] = useState<string>('Rwanda')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [paymentOpen, setPaymentOpen] = useState(false)
  const [paymentGift, setPaymentGift] = useState<DonatePaymentSummary | null>(null)

  const selectedProgram = useMemo(
    () => DONATE_PROGRAMS.find((p) => p.id === programId) ?? DONATE_PROGRAMS[0],
    [programId],
  )

  const selectedChild = useMemo(
    () => (childId ? programChildren.find((c) => c.id === childId) : undefined),
    [childId, programChildren],
  )

  useEffect(() => {
    setProgramId(resolveProgramId(initialProgramId))
  }, [initialProgramId])

  useEffect(() => {
    setChildId(initialChildId ?? '')
  }, [initialChildId])

  const effectiveAmount = useMemo(() => {
    const n = parseFloat(amountInput.trim())
    return Number.isFinite(n) ? n : 0
  }, [amountInput])

  const impactLine = useMemo(
    () => donateImpactLine(effectiveAmount, frequency, currency),
    [effectiveAmount, frequency, currency],
  )

  const amountLabel = formatDonateAmount(effectiveAmount, currency)

  const submitLabel = `Continue — ${amountLabel}`

  const shellClass = featured
    ? 'rounded-2xl border border-ink/8 bg-white p-6 shadow-[0_24px_60px_-16px_rgba(0,0,0,0.35)] md:p-9 lg:p-10'
    : 'rounded-2xl border border-ink/10 bg-warm-white p-6 shadow-sm md:p-10'

  function onProgramChange(nextId: string) {
    setProgramId(nextId)
    const next = DONATE_PROGRAMS.find((p) => p.id === nextId)
    if (!next?.allowsChildSponsor) setChildId('')
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (effectiveAmount < 1) {
      setError('Enter a gift amount of at least 1.')
      return
    }
    setLoading(true)
    setError(null)
    const res = await submitDonation({
      amount: effectiveAmount,
      frequency,
      currency,
      firstName,
      lastName,
      email,
      phone,
      purpose: selectedProgram?.label,
      programId,
      childId: childId || undefined,
      childName: selectedChild?.name,
      country,
      message: message || undefined,
    })
    setLoading(false)
    if (res.success) {
      setPaymentGift({
        amount: effectiveAmount,
        frequency,
        currency,
        firstName,
        lastName,
        programLabel: selectedProgram?.label,
        childName: selectedChild?.name,
      })
      setPaymentOpen(true)
    } else {
      setError(res.message)
    }
  }

  return (
    <>
      <DonatePaymentInstructionsModal
        open={paymentOpen}
        gift={paymentGift}
        onClose={() => {
          setPaymentOpen(false)
          setPaymentGift(null)
        }}
        onComplete={() => {
          if (!paymentGift) return
          const snapshot = paymentGift
          setPaymentOpen(false)
          setPaymentGift(null)
          navigate('/donate/thank-you', { state: snapshot })
        }}
      />

      <form onSubmit={handleSubmit} className={shellClass}>
        <h2 className="text-2xl font-bold tracking-tight text-ink">For Them. For Their Future.</h2>
        <p className="mt-1.5 text-sm text-body">
          Behind every child is a dream worth protecting and a future worth investing in.
        </p>

        <div className="mt-6">
          <span className={labelClass}>Currency</span>
          <div className="grid grid-cols-5 gap-2">
            {DONATE_CURRENCIES.map((c) => {
              const selected = currency === c.code
              return (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => setCurrency(c.code)}
                  className={`rounded-lg border py-2.5 text-xs font-bold tracking-wide transition-colors sm:text-sm ${
                    selected
                      ? 'border-ink bg-ink text-white'
                      : 'border-ink/15 bg-white text-ink hover:border-ink/40'
                  }`}
                >
                  {c.label}
                </button>
              )
            })}
          </div>
        </div>

        <label className="mt-4 block">
          <span className={labelClass}>How much would you like to give?</span>
          <div className="relative">
            <span className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-sm font-medium text-body">
              {currencyInputPrefix(currency)}
            </span>
            <input
              type="number"
              inputMode="decimal"
              min={1}
              step="any"
              required
              placeholder="Enter amount"
              value={amountInput}
              onChange={(e) => setAmountInput(e.target.value)}
              className={`${inputClass} pl-12 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`}
            />
          </div>
        </label>

        <p className="mt-4 border-l-4 border-accent bg-warm-white px-4 py-3 text-xs font-medium leading-relaxed text-ink">
          {impactLine}
        </p>

        {error ? (
          <p
            className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
            role="alert"
          >
            {error}
          </p>
        ) : null}

        <div className="mt-6 space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label>
              <span className={labelClass}>First Name *</span>
              <input
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Jane"
                className={inputClass}
              />
            </label>
            <label>
              <span className={labelClass}>Last Name *</span>
              <input
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Doe"
                className={inputClass}
              />
            </label>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label>
              <span className={labelClass}>Email Address *</span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
              />
            </label>
            <label>
              <span className={labelClass}>Phone *</span>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={inputClass}
              />
            </label>
          </div>

          <label className="block">
            <span className={labelClass}>Program *</span>
            <select
              required
              value={programId}
              onChange={(e) => onProgramChange(e.target.value)}
              className={inputClass}
            >
              {DONATE_PROGRAMS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.label}
                </option>
              ))}
            </select>
          </label>

          {selectedProgram?.allowsChildSponsor ? (
            <label className="block">
              <span className={labelClass}>Support a specific child (optional)</span>
              <select
                value={childId}
                onChange={(e) => setChildId(e.target.value)}
                className={inputClass}
              >
                <option value="">General — Every Child Deserves It</option>
                {programChildren.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </label>
          ) : null}

          <label>
            <span className={labelClass}>Country *</span>
            <select
              required
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className={inputClass}
            >
              {DONATE_COUNTRIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span className={labelClass}>Message</span>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write a note of encouragement (optional)..."
              className={inputClass}
            />
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-2 w-full rounded-lg bg-accent py-4 text-sm font-semibold text-ink transition-colors hover:bg-accent/90 disabled:opacity-60"
        >
          {loading ? 'One moment…' : submitLabel}
        </button>
      </form>
    </>
  )
}