import { useCallback, useEffect, useState } from 'react'
import {
  listNewsletterSubscribers,
  removeNewsletterSubscriber,
  type NewsletterSubscriber,
} from '../../lib/newsletter'

function formatWhen(iso: string) {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

export function DashboardNewsletter() {
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    const { data, error: message } = await listNewsletterSubscribers()
    setSubscribers(data)
    setError(message)
    setLoading(false)
  }, [])

  useEffect(() => {
    void load()
  }, [load])

  async function onDelete(sub: NewsletterSubscriber) {
    if (!confirm(`Remove “${sub.email}” from the newsletter list?`)) return
    const message = await removeNewsletterSubscriber(sub.id)
    if (message) {
      setError(message)
      return
    }
    setSubscribers((prev) => prev.filter((item) => item.id !== sub.id))
  }

  function copyEmails() {
    const text = subscribers.map((s) => s.email).join(', ')
    void navigator.clipboard.writeText(text)
  }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-ink">
            Newsletter
          </h2>
          <p className="mt-1 text-sm text-ink/55">
            Emails collected from the footer subscribe form.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => void load()}
            className="rounded-xl border border-ink/15 bg-white px-4 py-2 text-sm font-medium text-ink hover:border-ink/30"
          >
            Refresh
          </button>
          <button
            type="button"
            disabled={subscribers.length === 0}
            onClick={copyEmails}
            className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-warm-white hover:bg-ink disabled:opacity-40"
          >
            Copy all emails
          </button>
        </div>
      </div>

      {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}

      <div className="mt-8 overflow-hidden rounded-2xl border border-ink/6 bg-white shadow-sm">
        {loading ? (
          <p className="p-6 text-sm text-ink/55">Loading subscribers…</p>
        ) : subscribers.length === 0 ? (
          <p className="p-6 text-sm text-ink/55">
            No subscribers yet. When someone uses the footer form, they will
            appear here.
          </p>
        ) : (
          <ul className="divide-y divide-ink/6">
            {subscribers.map((sub) => (
              <li
                key={sub.id}
                className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-ink">{sub.email}</p>
                  <p className="mt-0.5 text-xs text-ink/45">
                    Joined {formatWhen(sub.createdAt)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => void onDelete(sub)}
                  className="shrink-0 text-sm text-red-600 hover:underline"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
