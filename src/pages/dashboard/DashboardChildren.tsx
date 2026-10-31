import { useState, type FormEvent } from 'react'
import { useCms } from '../../cms/CmsContext'
import type { ProgramChild } from '../../cms/types'

type ChildForm = {
  name: string
  age: string
  grade: string
  school: string
  dream: string
  location: string
  image: string
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
  story: '',
  monthlyNeed: '35',
  fundedPercent: '0',
  urgent: false,
}

export function DashboardChildren() {
  const { children, upsertChild, removeChild } = useCms()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<ChildForm>(empty)
  const [open, setOpen] = useState(false)

  function startCreate() {
    setEditingId(null)
    setForm(empty)
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
      story: child.story,
      monthlyNeed: String(child.monthlyNeed),
      fundedPercent: String(child.fundedPercent),
      urgent: Boolean(child.urgent),
    })
    setOpen(true)
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!form.name.trim()) return
    upsertChild({
      id: editingId ?? undefined,
      name: form.name,
      age: Number(form.age) || 0,
      grade: form.grade,
      school: form.school,
      dream: form.dream,
      location: form.location,
      image: form.image,
      story: form.story,
      monthlyNeed: Number(form.monthlyNeed) || 0,
      fundedPercent: Math.min(100, Math.max(0, Number(form.fundedPercent) || 0)),
      urgent: form.urgent || undefined,
    })
    setOpen(false)
    setForm(empty)
    setEditingId(null)
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
                onClick={() => {
                  if (confirm(`Delete ${child.name}?`)) removeChild(child.id)
                }}
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
              {(
                [
                  ['name', 'Name', 'text'],
                  ['age', 'Age', 'number'],
                  ['grade', 'Grade', 'text'],
                  ['school', 'School', 'text'],
                  ['dream', 'Dream', 'text'],
                  ['location', 'Location', 'text'],
                  ['monthlyNeed', 'Monthly need ($)', 'number'],
                  ['fundedPercent', 'Funded %', 'number'],
                  ['image', 'Image URL', 'text'],
                ] as const
              ).map(([key, label, type]) => (
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
                className="bg-primary px-4 py-2 text-sm font-medium text-warm-white"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
