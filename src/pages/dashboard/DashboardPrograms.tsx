import { useState, type FormEvent } from 'react'
import { useCms } from '../../cms/CmsContext'
import type { HomeProgram } from '../../cms/types'
import { ImageSourceField } from '../../components/dashboard/ImageSourceField'

type ProgramForm = {
  title: string
  description: string
  metric: string
  image: string
  imageAlt: string
  href: string
  sortOrder: string
}

const empty: ProgramForm = {
  title: '',
  description: '',
  metric: '',
  image: '',
  imageAlt: '',
  href: '/programs/',
  sortOrder: '0',
}

export function DashboardPrograms() {
  const { homePrograms, upsertHomeProgram, removeHomeProgram } = useCms()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<ProgramForm>(empty)
  const [open, setOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [uploadBusy, setUploadBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function startCreate() {
    setEditingId(null)
    setForm(empty)
    setError(null)
    setOpen(true)
  }

  function startEdit(program: HomeProgram) {
    setEditingId(program.id)
    setForm({
      title: program.title,
      description: program.description,
      metric: program.metric,
      image: program.image,
      imageAlt: program.imageAlt,
      href: program.href,
      sortOrder: String(program.sortOrder),
    })
    setError(null)
    setOpen(true)
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!form.title.trim() || !form.href.trim()) return
    setSaving(true)
    const message = await upsertHomeProgram({
      id: editingId ?? undefined,
      title: form.title,
      description: form.description,
      metric: form.metric,
      image: form.image,
      imageAlt: form.imageAlt,
      href: form.href,
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

  async function onDelete(program: HomeProgram) {
    if (!confirm(`Delete “${program.title}”?`)) return
    const message = await removeHomeProgram(program.id)
    setError(message)
  }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-ink">
            Featured programs
          </h2>
          <p className="mt-1 text-sm text-ink/55">
            Cards on the home page. Links usually match{' '}
            <code className="text-xs">/programs/every-kid-deserves-it</code> or{' '}
            <code className="text-xs">/programs/for-the-parents</code>.
          </p>
        </div>
        <button
          type="button"
          onClick={startCreate}
          className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-warm-white hover:bg-ink"
        >
          Add program
        </button>
      </div>

      {error && !open ? (
        <p className="mt-4 text-sm text-red-600">{error}</p>
      ) : null}

      <div className="mt-8 divide-y divide-ink/6 overflow-hidden rounded-2xl border border-ink/6 bg-white shadow-sm">
        {homePrograms.map((program) => (
          <div
            key={program.id}
            className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center"
          >
            {program.image ? (
              <img
                src={program.image}
                alt=""
                className="h-16 w-16 object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="flex h-16 w-16 items-center justify-center bg-ink/5 text-xs text-ink/40">
                No img
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="font-medium text-primary">{program.title}</p>
              <p className="text-sm text-primary/60">{program.metric}</p>
              <p className="truncate text-xs text-ink/50">{program.href}</p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => startEdit(program)}
                className="border border-primary px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary hover:text-warm-white"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => onDelete(program)}
                className="border border-red-600 px-3 py-1.5 text-xs font-medium text-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {homePrograms.length === 0 ? (
          <p className="p-6 text-sm text-ink/50">
            No programs yet. Add cards or run the schema seed in Supabase.
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
              {editingId ? 'Edit program' : 'Add program'}
            </h3>
            <div className="mt-4 space-y-3">
              <label className="block text-sm">
                <span className="text-ink/70">Title</span>
                <input
                  required
                  value={form.title}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, title: e.target.value }))
                  }
                  className="mt-1 w-full border border-ink/15 bg-white px-3 py-2 text-sm outline-none focus:border-primary"
                />
              </label>
              <label className="block text-sm">
                <span className="text-ink/70">Description</span>
                <textarea
                  rows={4}
                  value={form.description}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, description: e.target.value }))
                  }
                  className="mt-1 w-full border border-ink/15 bg-white px-3 py-2 text-sm outline-none focus:border-primary"
                />
              </label>
              <label className="block text-sm">
                <span className="text-ink/70">Metric (fallback only)</span>
                <input
                  value={form.metric}
                  placeholder="35+ CHILDREN REACHED"
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, metric: e.target.value }))
                  }
                  className="mt-1 w-full border border-ink/15 bg-white px-3 py-2 text-sm outline-none focus:border-primary"
                />
                <span className="mt-1 block text-xs text-ink/45">
                  On the home page, children/families cards use Impact Stats when
                  available. This value is only a fallback.
                </span>
              </label>
              <label className="block text-sm">
                <span className="text-ink/70">Link (href)</span>
                <input
                  required
                  value={form.href}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, href: e.target.value }))
                  }
                  className="mt-1 w-full border border-ink/15 bg-white px-3 py-2 text-sm outline-none focus:border-primary"
                />
              </label>
              <ImageSourceField
                label="Card image"
                value={form.image}
                uploadFolder="programs"
                onBusy={setUploadBusy}
                onChange={(image) => setForm((prev) => ({ ...prev, image }))}
              />
              <label className="block text-sm">
                <span className="text-ink/70">Image alt text</span>
                <input
                  value={form.imageAlt}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, imageAlt: e.target.value }))
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
                disabled={saving || uploadBusy}
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
