import type { CmsState } from './types'

const CACHE_KEY = 'kubwabo:cms:v1'
const CACHE_VERSION = 1
/** Soft TTL, we still revalidate in the background either way. */
const MAX_AGE_MS = 1000 * 60 * 60 * 24

type CmsCachePayload = {
  version: number
  savedAt: number
  state: CmsState
}

function isCmsState(value: unknown): value is CmsState {
  if (!value || typeof value !== 'object') return false
  const s = value as Record<string, unknown>
  return (
    Array.isArray(s.team) &&
    Array.isArray(s.stories) &&
    Array.isArray(s.children) &&
    Array.isArray(s.homePrograms) &&
    Array.isArray(s.impactStats)
  )
}

export function readCmsCache(): CmsState | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Partial<CmsCachePayload>
    if (parsed.version !== CACHE_VERSION || !isCmsState(parsed.state)) return null
    if (typeof parsed.savedAt !== 'number') return null
    if (Date.now() - parsed.savedAt > MAX_AGE_MS) return null
    return parsed.state
  } catch {
    return null
  }
}

export function writeCmsCache(state: CmsState) {
  if (typeof window === 'undefined') return
  try {
    const payload: CmsCachePayload = {
      version: CACHE_VERSION,
      savedAt: Date.now(),
      state,
    }
    window.localStorage.setItem(CACHE_KEY, JSON.stringify(payload))
  } catch {
    // Quota / private mode, ignore; network fetch still works.
  }
}
