import { cmsSeed } from './seed'
import type { CmsState } from './types'

const STORAGE_KEY = 'kubwabo-cms-v1'

export function loadCmsState(): CmsState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return structuredClone(cmsSeed)
    const parsed = JSON.parse(raw) as Partial<CmsState>
    return {
      team: Array.isArray(parsed.team) ? parsed.team : structuredClone(cmsSeed.team),
      stories: Array.isArray(parsed.stories)
        ? parsed.stories
        : structuredClone(cmsSeed.stories),
      children: Array.isArray(parsed.children)
        ? parsed.children
        : structuredClone(cmsSeed.children),
    }
  } catch {
    return structuredClone(cmsSeed)
  }
}

export function saveCmsState(state: CmsState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export function resetCmsState(): CmsState {
  const next = structuredClone(cmsSeed)
  saveCmsState(next)
  return next
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export function newId(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`
}
