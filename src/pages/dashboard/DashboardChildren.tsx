import { useState, type FormEvent } from 'react'
import { useCms } from '../../cms/CmsContext'
import type { ProgramChild } from '../../cms/types'
import { ImageSourceField } from '../../components/dashboard/ImageSourceField'

type ChildForm = {
  name: string
  age: string
  grade: string
  school: string
  dream: string
  location: string
  image: string
  gallery: string[]
  video: string
  story: string
  monthlyNeed: string
  fundedPercent: string
  urgent: boolean
}

const empty: ChildForm = {
  name: '',
  age: '8',
  grade: 'Grade 3',
  school: '',
  dream: '',
  location: '',
  image: '',
  gallery: [],
  video: '',
  story: '',
  monthlyNeed: '35',
  fundedPercent: '0',
  urgent: false,
}

const textFields = [
  ['name', 'Name', 'text'],
  ['age', 'Age', 'number'],
  ['grade', 'Grade', 'text'],
  ['school', 'School', 'text'],
  ['dream', 'Dream', 'text'],
  ['location', 'Location', 'text'],
  ['monthlyNeed', 'Monthly need ($)', 'number'],
  ['fundedPercent', 'Funded %', 'number'],
] as const

export function DashboardChildren() {
  const { children, upsertChild, removeChild } = useCms()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<ChildForm>(empty)
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

  function startEdit(child: ProgramChild) {
    setEditingId(child.id)
    setForm({
      name: child.name,
      age: String(child.age),
      grade: child.grade,
      school: child.school,
      dream: child.dream,
      location: child.location,
      image: child.image,
      gallery: [...(child.gallery ?? [])],
      video: child.video ?? '',
      story: child.story,
      monthlyNeed: String(child.monthlyNeed),
      fundedPercent: String(child.fundedPercent),
      urgent: Boolean(child.urgent),
    })
    setError(null)
    setOpen(true)
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!form.name.trim()) return
    setSaving(true)
    const message = await upsertChild({
      id: editingId ?? undefined,
      name: form.name,
      age: Number(form.age) || 0,
      grade: form.grade,
      school: form.school,
      dream: form.dream,
      location: form.location,
      image: form.image,
      gallery: form.gallery.map((item) => item.trim()).filter(Boolean),
      video: form.video.trim() || undefined,
      story: form.story,
      monthlyNeed: Number(form.monthlyNeed) || 0,
      fundedPercent: Math.min(100, Math.max(0, Number(form.fundedPercent) || 0)),
      urgent: form.urgent || undefined,
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

  async function onDelete(child: ProgramChild) {
    if (!confirm(`Delete ${child.name}?`)) return
    const message = await removeChild(child.id)
    setError(message)
  }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-ink">
            Children in the Program
          </h2>
        </div>
        <button
          type="button"
          onClick={startCreate}
          className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-warm-white hover:bg-ink"
        >
          Add child
        </button>
      </div>

      {error && !open ? (
        <p className="mt-4 text-sm text-red-600">{error}</p>
      ) : null}

      <div className="mt-8 divide-y divide-ink/6 overflow-hidden rounded-2xl border border-ink/6 bg-white shadow-sm">
        {children.map((child) => (
          <div
            key={child.id}
            className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center"
          >
            <img
              src={child.image}
              alt=""
              className="h-16 w-16 object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="min-w-0 flex-1">
              <p className="font-medium text-primary">
                {child.name}{' '}
                {child.urgent ? (
                  <span className="text-xs font-medium text-red-600 uppercase">
                    Urgent
                  </span>
                ) : null}
              </p>
              <p className="text-sm text-primary/60">
                {child.grade} · {child.age} yrs · {child.location}
              </p>
              <p className="text-xs text-ink/50">
                {child.fundedPercent}% funded · ${child.monthlyNeed}/mo
              </p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => startEdit(child)}
                className="border border-primary px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary hover:text-warm-white"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => onDelete(child)}
                className="border border-red-600 px-3 py-1.5 text-xs font-medium text-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
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
            className="relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto border border-ink/10 bg-warm-white p-6"
          >
            <h3 className="text-lg font-medium text-primary">
              {editingId ? 'Edit child' : 'Add child'}
            </h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {textFields.map(([key, label, type]) => (
                <label key={key} className="block text-sm">
                  <span className="text-ink/70">{label}</span>
                  <input
                    type={type}
                    required={key === 'name'}
                    value={form[key]}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, [key]: e.target.value }))
                    }
                    className="mt-1 w-full border border-ink/15 bg-white px-3 py-2 text-sm outline-none focus:border-primary"
                  />
                </label>
              ))}
              <div className="sm:col-span-2">
                <ImageSourceField
                  label="Profile photo"
                  value={form.image}
                  onChange={(image) => setForm((prev) => ({ ...prev, image }))}
                  onBusy={setUploadBusy}
                  uploadFolder="children"
                />
              </div>
              <label className="flex items-center gap-2 text-sm sm:col-span-2">
                <input
                  type="checkbox"
                  checked={form.urgent}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, urgent: e.target.checked }))
                  }
                />
                <span className="text-ink/70">Mark as urgent</span>
              </label>
              <div className="sm:col-span-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-sm text-ink/70">More photos (gallery)</span>
                  <button
                    type="button"
                    onClick={() =>
                      setForm((prev) => ({
                        ...prev,
                        gallery: [...prev.gallery, ''],
                      }))
                    }
                    className="border border-ink/20 px-3 py-1 text-xs font-medium text-ink/70 hover:border-primary hover:text-primary"
                  >
                    Add photo
                  </button>
                </div>
                {form.gallery.length === 0 ? (
                  <p className="mt-2 text-xs text-ink/50">
                    Optional. Link or upload; uploads are compressed automatically.
                  </p>
                ) : (
                  <div className="mt-3 space-y-4">
                    {form.gallery.map((url, index) => (
                      <div
                        key={index}
                        className="rounded border border-ink/10 bg-white/80 p-3"
                      >
                        <div className="mb-2 flex items-center justify-between gap-2">
                          <span className="text-xs font-medium text-ink/55">
                            Photo {index + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              setForm((prev) => ({
                                ...prev,
                                gallery: prev.gallery.filter((_, i) => i !== index),
                              }))
                            }
                            className="text-xs text-red-600 hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                        <ImageSourceField
                          label=""
                          value={url}
                          onChange={(value) =>
                            setForm((prev) => ({
                              ...prev,
                              gallery: prev.gallery.map((item, i) =>
                                i === index ? value : item,
                              ),
                            }))
                          }
                          onBusy={setUploadBusy}
                          uploadFolder="children"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <label className="block text-sm sm:col-span-2">
                <span className="text-ink/70">Video URL (YouTube / Vimeo / mp4)</span>
                <input
                  type="text"
                  value={form.video}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, video: e.target.value }))
                  }
                  placeholder="https://…"
                  className="mt-1 w-full border border-ink/15 bg-white px-3 py-2 text-sm outline-none focus:border-primary"
                />
              </label>
              <label className="block text-sm sm:col-span-2">
                <span className="text-ink/70">Story</span>
                <textarea
                  value={form.story}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, story: e.target.value }))
                  }
                  rows={5}
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
