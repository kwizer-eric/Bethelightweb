import { useState, type FormEvent } from 'react'
import { useCms } from '../../cms/CmsContext'
import type { TeamMember } from '../../cms/types'

const empty: Omit<TeamMember, 'id'> = {
  name: '',
  role: '',
  bio: '',
  detail: '',
  image: '',
}

export function DashboardTeam() {
  const { team, upsertTeam, removeTeam } = useCms()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState(empty)
  const [open, setOpen] = useState(false)

  function startCreate() {
    setEditingId(null)
    setForm(empty)
    setOpen(true)
  }

  function startEdit(member: TeamMember) {
    setEditingId(member.id)
    setForm({
      name: member.name,
      role: member.role,
      bio: member.bio,
      detail: member.detail,
      image: member.image,
    })
    setOpen(true)
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!form.name.trim() || !form.role.trim()) return
    upsertTeam(editingId ? { ...form, id: editingId } : form)
    setOpen(false)
    setForm(empty)
    setEditingId(null)
  }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-ink">
            Team
          </h2>
        </div>
        <button
          type="button"
          onClick={startCreate}
          className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-warm-white hover:bg-ink"
        >
          Add member
        </button>
      </div>

      <div className="mt-8 divide-y divide-ink/6 overflow-hidden rounded-2xl border border-ink/6 bg-white shadow-sm">
        {team.map((member) => (
          <div
            key={member.id}
            className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center"
          >
            <img
              src={member.image}
              alt=""
              className="h-16 w-16 object-cover grayscale"
              referrerPolicy="no-referrer"
            />
            <div className="min-w-0 flex-1">
              <p className="font-medium text-primary">{member.name}</p>
              <p className="text-sm text-primary/60">{member.role}</p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => startEdit(member)}
                className="border border-primary px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary hover:text-warm-white"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => {
                  if (confirm(`Delete ${member.name}?`)) removeTeam(member.id)
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
            className="relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto border border-ink/10 bg-warm-white p-6"
          >
            <h3 className="text-lg font-medium text-primary">
              {editingId ? 'Edit member' : 'Add member'}
            </h3>
            <div className="mt-4 space-y-3">
              {(
                [
                  ['name', 'Name'],
                  ['role', 'Role'],
                  ['image', 'Image URL'],
                ] as const
              ).map(([key, label]) => (
                <label key={key} className="block text-sm">
                  <span className="text-ink/70">{label}</span>
                  <input
                    required={key !== 'image'}
                    value={form[key]}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, [key]: e.target.value }))
                    }
                    className="mt-1 w-full border border-ink/15 bg-white px-3 py-2 text-sm outline-none focus:border-primary"
                  />
                </label>
              ))}
              <label className="block text-sm">
                <span className="text-ink/70">Bio</span>
                <textarea
                  value={form.bio}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, bio: e.target.value }))
                  }
                  rows={3}
                  className="mt-1 w-full border border-ink/15 bg-white px-3 py-2 text-sm outline-none focus:border-primary"
                />
              </label>
              <label className="block text-sm">
                <span className="text-ink/70">Detail</span>
                <textarea
                  value={form.detail}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, detail: e.target.value }))
                  }
                  rows={3}
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
