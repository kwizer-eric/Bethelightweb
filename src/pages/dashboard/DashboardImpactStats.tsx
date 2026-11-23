import { useState, type FormEvent } from 'react'
import { useCms } from '../../cms/CmsContext'
import type { ImpactStat } from '../../cms/types'

type StatForm = {
  value: string
  label: string
  sortOrder: string
}

const empty: StatForm = {
  value: '',
  label: '',
  sortOrder: '0',
}

export function DashboardImpactStats() {
  const { impactStats, upsertImpactStat, removeImpactStat } = useCms()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<StatForm>(empty)
  const [open, setOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function startCreate() {
    setEditingId(null)
    setForm(empty)
    setError(null)
    setOpen(true)
  }

  function startEdit(stat: ImpactStat) {
    setEditingId(stat.id)
    setForm({
      value: stat.value,
      label: stat.label,
      sortOrder: String(stat.sortOrder),
    })
    setError(null)
    setOpen(true)
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!form.value.trim() || !form.label.trim()) return
    setSaving(true)
    const message = await upsertImpactStat({
      id: editingId ?? undefined,
      value: form.value,
      label: form.label,
      sortOrder: Number(form.sortOrder) || 0,
    })
    setSaving(false)
    if (message) {
      setError(message)
      return
    }
    setOpen(false)
    setForm(empty)
    setEditingId(null)
    setError(null)
  }

  async function onDelete(stat: ImpactStat) {
    if (!confirm(`Delete “${stat.value} ${stat.label}”?`)) return
    const message = await removeImpactStat(stat.id)
    setError(message)
  }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-ink">
            Impact stats
          </h2>
          <p className="mt-1 text-sm text-ink/55">
            Numbers for Measured Impact on Home, and the metric lines on Featured
            Programs cards (children / families stats).
          </p>
        </div>
        <button
          type="button"
          onClick={startCreate}
          className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-warm-white hover:bg-ink"
        >
          Add stat
        </button>
      </div>

      {error && !open ? (
        <p className="mt-4 text-sm text-red-600">{error}</p>
      ) : null}

      <div className="mt-8 divide-y divide-ink/6 overflow-hidden rounded-2xl border border-ink/6 bg-white shadow-sm">
        {impactStats.map((stat) => (
          <div
            key={stat.id}
            className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center"
          >
            <div className="flex h-16 w-20 shrink-0 items-center justify-center rounded-lg bg-ink/5">
              <span className="text-xl font-semibold tracking-tight text-ink">
                {stat.value}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-medium text-primary">{stat.label}</p>
              <p className="text-xs text-ink/50">Order {stat.sortOrder}</p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => startEdit(stat)}
                className="border border-primary px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary hover:text-warm-white"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => onDelete(stat)}
                className="border border-red-600 px-3 py-1.5 text-xs font-medium text-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {impactStats.length === 0 ? (
          <p className="p-6 text-sm text-ink/50">
            No stats yet. Add rows or run the schema seed in Supabase.
          </p>
        ) : null}
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            type="button"
            className="absolute inset-0 bg-ink/60"
            aria-label="Close"
            onClick={() => setOpen(false)}
          />
          <form
            onSubmit={onSubmit}
            className="relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto border border-ink/10 bg-warm-white p-6"
          >
            <h3 className="text-lg font-medium text-primary">
              {editingId ? 'Edit stat' : 'Add stat'}
            </h3>
            <div className="mt-4 space-y-3">
              <label className="block text-sm">
                <span className="text-ink/70">Value</span>
                <input
                  required
                  value={form.value}
                  placeholder="30+"
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, value: e.target.value }))
                  }
                  className="mt-1 w-full border border-ink/15 bg-white px-3 py-2 text-sm outline-none focus:border-primary"
                />
              </label>
              <label className="block text-sm">
                <span className="text-ink/70">Label</span>
                <input
                  required
                  value={form.label}
                  placeholder="Children Supported"
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, label: e.target.value }))
                  }
                  className="mt-1 w-full border border-ink/15 bg-white px-3 py-2 text-sm outline-none focus:border-primary"
                />
              </label>
              <label className="block text-sm">
                <span className="text-ink/70">Sort order</span>
                <input
                  type="number"
                  value={form.sortOrder}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, sortOrder: e.target.value }))
                  }
                  className="mt-1 w-full border border-ink/15 bg-white px-3 py-2 text-sm outline-none focus:border-primary"
                />
              </label>
            </div>
            {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}
            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="border border-ink/20 px-4 py-2 text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="bg-primary px-4 py-2 text-sm font-medium text-warm-white disabled:opacity-60"
              >
                {saving ? 'Saving…' : 'Save'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
