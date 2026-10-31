import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useCms } from '../../cms/CmsContext'
import { bodyToText, textToBody } from '../../cms/storyBody'
import { slugify } from '../../cms/storage'
import type { CmsStory } from '../../cms/types'

type StoryForm = {
  title: string
  slug: string
  excerpt: string
  date: string
  category: string
  image: string
  bodyText: string
}

const empty: StoryForm = {
  title: '',
  slug: '',
  excerpt: '',
  date: new Date().toISOString().slice(0, 10),
  category: 'Impact',
  image: '',
  bodyText: '',
}

export function DashboardStories() {
  const { stories, upsertStory, removeStory } = useCms()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<StoryForm>(empty)
  const [open, setOpen] = useState(false)

  function startCreate() {
    setEditingId(null)
    setForm(empty)
    setOpen(true)
  }

  function startEdit(story: CmsStory) {
    setEditingId(story.id)
    setForm({
      title: story.title,
      slug: story.slug,
      excerpt: story.excerpt,
      date: story.date,
      category: story.category,
      image: story.image,
      bodyText: bodyToText(story.body),
    })
    setOpen(true)
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!form.title.trim()) return
    upsertStory({
      id: editingId ?? undefined,
      title: form.title,
      slug: form.slug || slugify(form.title),
      excerpt: form.excerpt,
      date: form.date,
      category: form.category,
      image: form.image,
      body: textToBody(form.bodyText),
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
            Impact Stories
          </h2>
        </div>
        <button
          type="button"
          onClick={startCreate}
          className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-warm-white hover:bg-ink"
        >
          Add story
        </button>
      </div>

      <div className="mt-8 divide-y divide-ink/6 overflow-hidden rounded-2xl border border-ink/6 bg-white shadow-sm">
        {stories.map((story) => (
          <div
            key={story.id}
            className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center"
          >
            <img
              src={story.image}
              alt=""
              className="h-16 w-24 object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="min-w-0 flex-1">
              <p className="font-medium text-primary">{story.title}</p>
              <p className="text-xs uppercase tracking-wide text-primary/55">
                {story.date} · {story.category}
              </p>
            </div>
            <div className="flex gap-2">
              <Link
                to={`/news/${story.slug}`}
                className="border border-ink/20 px-3 py-1.5 text-xs font-medium text-ink/70 hover:border-primary hover:text-primary"
              >
                View
              </Link>
              <button
                type="button"
                onClick={() => startEdit(story)}
                className="border border-primary px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary hover:text-warm-white"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => {
                  if (confirm(`Delete “${story.title}”?`)) removeStory(story.id)
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
              {editingId ? 'Edit story' : 'Add story'}
            </h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <label className="block text-sm sm:col-span-2">
                <span className="text-ink/70">Title</span>
                <input
                  required
                  value={form.title}
                  onChange={(e) => {
                    const title = e.target.value
                    setForm((prev) => ({
                      ...prev,
                      title,
                      slug: editingId ? prev.slug : slugify(title),
                    }))
                  }}
                  className="mt-1 w-full border border-ink/15 bg-white px-3 py-2 text-sm outline-none focus:border-primary"
                />
              </label>
              <label className="block text-sm">
                <span className="text-ink/70">Slug</span>
                <input
                  required
                  value={form.slug}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, slug: e.target.value }))
                  }
                  className="mt-1 w-full border border-ink/15 bg-white px-3 py-2 text-sm outline-none focus:border-primary"
                />
              </label>
              <label className="block text-sm">
                <span className="text-ink/70">Date</span>
                <input
                  type="date"
                  required
                  value={form.date}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, date: e.target.value }))
                  }
                  className="mt-1 w-full border border-ink/15 bg-white px-3 py-2 text-sm outline-none focus:border-primary"
                />
              </label>
              <label className="block text-sm">
                <span className="text-ink/70">Category</span>
                <input
                  required
                  value={form.category}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, category: e.target.value }))
                  }
                  className="mt-1 w-full border border-ink/15 bg-white px-3 py-2 text-sm outline-none focus:border-primary"
                />
              </label>
              <label className="block text-sm">
                <span className="text-ink/70">Image URL</span>
                <input
                  value={form.image}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, image: e.target.value }))
                  }
                  className="mt-1 w-full border border-ink/15 bg-white px-3 py-2 text-sm outline-none focus:border-primary"
                />
              </label>
              <label className="block text-sm sm:col-span-2">
                <span className="text-ink/70">Excerpt</span>
                <textarea
                  required
                  value={form.excerpt}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, excerpt: e.target.value }))
                  }
                  rows={2}
                  className="mt-1 w-full border border-ink/15 bg-white px-3 py-2 text-sm outline-none focus:border-primary"
                />
              </label>
              <label className="block text-sm sm:col-span-2">
                <span className="text-ink/70">
                  Body (paragraphs separated by blank lines;{' '}
                  <code>## Heading</code>; list lines start with{' '}
                  <code>- </code>)
                </span>
                <textarea
                  value={form.bodyText}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, bodyText: e.target.value }))
                  }
                  rows={12}
                  className="mt-1 w-full border border-ink/15 bg-white px-3 py-2 font-mono text-sm outline-none focus:border-primary"
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
