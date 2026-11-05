import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { site } from '../data/site'
import { useCms } from '../cms/CmsContext'

function CopyField({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
      <div className="min-w-0">
        <p className="text-xs font-medium tracking-[0.12em] text-primary/55 uppercase">
          {label}
        </p>
        <p className="mt-1 break-all font-medium text-primary">{value}</p>
      </div>
      <button
        type="button"
        onClick={copy}
        className="inline-flex shrink-0 items-center justify-center border border-primary bg-primary px-4 py-2 text-xs font-semibold text-warm-white sm:bg-transparent sm:text-primary sm:hover:bg-primary sm:hover:text-warm-white"
      >
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  )
}

export function DonatePage() {
  const { children } = useCms()
  const [params] = useSearchParams()
  const forId = params.get('for')
  const child = forId ? children.find((c) => c.id === forId) : undefined
  const { donation } = site

  return (
    <div className="bg-warm-white text-primary">
      <section className="border-b border-primary/15">
        <div className="site-container pt-28 pb-14 sm:pt-32 sm:pb-16 lg:pt-36 lg:pb-20">
          <p className="text-xs font-semibold tracking-[0.16em] text-primary/55 uppercase">
            Give
          </p>
          <h1 className="mt-3 max-w-2xl text-4xl font-medium tracking-tight sm:text-5xl lg:text-6xl">
            Support the Mission
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-primary/80 sm:text-lg">
            Every gift helps children and families access education, care, and
            opportunity. Transfer directly using the details below — no online
            card payment required for now.
          </p>
        </div>
      </section>

      {child ? (
        <section className="border-b border-primary/15 bg-primary text-warm-white">
          <div className="site-container flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:gap-6">
            <img
              src={child.image}
              alt=""
              referrerPolicy="no-referrer"
              className="h-20 w-20 object-cover sm:h-24 sm:w-24"
            />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold tracking-[0.14em] text-warm-white/60 uppercase">
                Sponsoring
              </p>
              <p className="mt-1 text-2xl font-medium tracking-tight">{child.name}</p>
              <p className="mt-1 text-sm text-warm-white/75">{child.dream}</p>
              <p className="mt-2 text-sm text-warm-white/70">
                Please include <span className="font-semibold">{child.name}</span>{' '}
                in your transfer reference.
              </p>
            </div>
            <Link
              to={`/programs/every-kid-deserves-it/children/${child.id}`}
              className="inline-flex w-fit items-center justify-center border border-warm-white bg-warm-white px-5 py-2 text-sm font-medium text-ink"
            >
              View profile
            </Link>
          </div>
        </section>
      ) : null}

      <section className="py-12 sm:py-16 lg:py-20">
        <div className="site-container grid gap-6 lg:grid-cols-2 lg:gap-8">
          <div className="border border-primary/15 bg-white p-6 sm:p-8">
            <h2 className="text-2xl font-medium tracking-tight">Bank transfer</h2>
            <p className="mt-2 text-sm text-primary/60">{donation.bankName}</p>
            <div className="mt-8 space-y-6 border-t border-primary/10 pt-6">
              <CopyField label="Account name" value={donation.accountName} />
              <CopyField label="Account number" value={donation.accountNumber} />
            </div>
          </div>

          <div className="border border-primary/15 bg-white p-6 sm:p-8">
            <h2 className="text-2xl font-medium tracking-tight">Mobile Money</h2>
            <p className="mt-2 text-sm text-primary/60">{donation.momoLabel}</p>
            <div className="mt-8 space-y-6 border-t border-primary/10 pt-6">
              <CopyField label="MoMo code" value={donation.momoCode} />
              <CopyField label="Phone number" value={donation.momoPhone} />
            </div>
          </div>
        </div>

        <div className="site-container mt-8">
          <p className="max-w-2xl text-sm leading-relaxed text-primary/70">
            {donation.note}
          </p>
          <p className="mt-4 text-sm text-primary/70">
            Questions?{' '}
            <a
              href={`mailto:${site.email}`}
              className="font-medium text-primary underline decoration-primary/40 underline-offset-4"
            >
              {site.email}
            </a>
          </p>
          <Link
            to="/programs/every-kid-deserves-it#children"
            className="mt-8 inline-flex border border-primary bg-primary px-6 py-2 text-sm font-medium text-warm-white"
          >
            Meet children to sponsor
          </Link>
        </div>
      </section>
    </div>
  )
}
