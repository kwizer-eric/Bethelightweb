import { useState, type FormEvent } from 'react'
import {
  donationPresets,
  impactPerAmount,
  programs,
} from '../../data/site'
import {
  submitDonation,
  type DonationFrequency,
  type DonationResult,
} from '../../lib/donation'
import { Button } from '../ui/Button'

export function DonationForm() {
  const [amount, setAmount] = useState<number>(50)
  const [customAmount, setCustomAmount] = useState('')
  const [frequency, setFrequency] = useState<DonationFrequency>('one-time')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [programId, setProgramId] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<DonationResult | null>(null)

  const effectiveAmount = customAmount ? parseFloat(customAmount) || 0 : amount

  const handlePreset = (value: number) => {
    setAmount(value)
    setCustomAmount('')
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setResult(null)
    const res = await submitDonation({
      amount: effectiveAmount,
      frequency,
      firstName,
      lastName,
      email,
      programId: programId || undefined,
    })
    setResult(res)
    setLoading(false)
  }

  if (result?.success) {
    return (
      <div className="rounded-2xl border border-primary/30 bg-primary/5 p-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl text-warm-white">
          ✓
        </div>
        <h3 className="text-2xl font-bold text-ink">Thank you!</h3>
        <p className="mt-4 text-ink/70">{result.message}</p>
        {result.transactionId && (
          <p className="mt-2 text-sm text-ink/70">Ref: {result.transactionId}</p>
        )}
        <Button className="mt-6" onClick={() => setResult(null)}>
          Make another donation
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
        <strong>Test mode:</strong> No live payments are processed. Provider integration coming in Phase 2.
      </div>

      {result && !result.success && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
          {result.message}
        </div>
      )}

      <fieldset>
        <legend className="mb-3 font-semibold text-ink">Donation frequency</legend>
        <div className="flex gap-2">
          {(['one-time', 'monthly'] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFrequency(f)}
              className={`rounded-lg px-5 py-2 text-sm font-medium capitalize transition-colors ${
                frequency === f
                  ? 'bg-primary text-warm-white'
                  : 'bg-ink/10 text-ink hover:bg-accent'
              }`}
            >
              {f === 'one-time' ? 'One-time' : 'Monthly'}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-3 font-semibold text-ink">Select amount</legend>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {donationPresets.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => handlePreset(preset)}
              className={`rounded-lg border-2 py-3 font-semibold transition-colors ${
                amount === preset && !customAmount
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-ink/15 bg-warm-white text-ink hover:border-primary/50'
              }`}
            >
              ${preset}
            </button>
          ))}
        </div>
        <label className="mt-4 block">
          <span className="text-sm font-medium text-ink/70">Custom amount ($)</span>
          <input
            type="number"
            min="1"
            step="1"
            value={customAmount}
            onChange={(e) => setCustomAmount(e.target.value)}
            placeholder="Enter amount"
            className="mt-1 w-full rounded-xl border border-ink/15 bg-warm-white px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </label>
      </fieldset>

      <fieldset>
        <legend className="mb-3 font-semibold text-ink">Direct to program (optional)</legend>
        <select
          value={programId}
          onChange={(e) => setProgramId(e.target.value)}
          className="w-full rounded-xl border border-ink/15 bg-warm-white px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          <option value="">General fund</option>
          {programs.map((p) => (
            <option key={p.id} value={p.id}>
              {p.title}
            </option>
          ))}
        </select>
      </fieldset>

      <ul className="rounded-xl bg-ink/10 p-4 text-sm text-ink/70">
        {impactPerAmount.map((item) => (
          <li key={item.amount} className="flex justify-between gap-4 py-1">
            <span>${item.amount}</span>
            <span className="text-right">{item.impact}</span>
          </li>
        ))}
      </ul>

      <fieldset className="space-y-4">
        <legend className="font-semibold text-ink">Your details</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-medium text-ink/70">
              First name <span className="text-primary">*</span>
            </span>
            <input
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="mt-1 w-full rounded-xl border border-ink/15 bg-warm-white px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-ink/70">Last name</span>
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="mt-1 w-full rounded-xl border border-ink/15 bg-warm-white px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </label>
        </div>
        <label className="block">
          <span className="text-sm font-medium text-ink/70">
            Email <span className="text-primary">*</span>
          </span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-xl border border-ink/15 bg-warm-white px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </label>
      </fieldset>

      <div className="rounded-xl border border-ink/15 bg-ink/5 p-4">
        <p className="text-sm font-semibold text-ink">Payment method</p>
        <p className="mt-1 text-sm text-ink/70">
          Card / bank details will appear here when payment provider is connected.
        </p>
        <div className="mt-3 flex gap-2 opacity-50">
          <span className="rounded border border-ink/15 bg-warm-white px-3 py-1 text-xs">Visa</span>
          <span className="rounded border border-ink/15 bg-warm-white px-3 py-1 text-xs">Mastercard</span>
          <span className="rounded border border-ink/15 bg-warm-white px-3 py-1 text-xs">PayPal</span>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-ink/15 pt-6">
        <div>
          <p className="text-sm text-ink/70">Donation total</p>
          <p className="text-3xl font-bold text-primary">
            ${effectiveAmount.toLocaleString()}
            {frequency === 'monthly' && <span className="text-lg font-normal text-ink/70">/mo</span>}
          </p>
        </div>
        <Button type="submit" size="lg" disabled={loading || effectiveAmount < 1}>
          {loading ? 'Processing…' : 'Donate Now'}
        </Button>
      </div>

      <p className="text-center text-xs text-ink/70">
        🔒 Secure donation. 100% of your gift goes to programs (minus payment processing fees).
      </p>
    </form>
  )
}
