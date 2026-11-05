import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { supabase, supabaseConfigError } from '../lib/supabase'
import { slugify } from './storage'
import type { CmsState, CmsStory, ProgramChild, TeamMember } from './types'
import type { StoryBlock } from '../data/site'

type TeamRow = {
  id: string
  name: string
  role: string
  image: string
  sort_order: number
}

type StoryRow = {
  id: string
  slug: string
  title: string
  excerpt: string
  date: string
  category: string
  image: string
  body: StoryBlock[] | null
}

type ChildRow = {
  id: string
  name: string
  age: number
  grade: string
  school: string
  dream: string
  location: string
  image: string
  story: string
  gallery?: string[] | null
  video?: string | null
  monthly_need: number | string
  funded_percent: number
  urgent: boolean
}

type CmsContextValue = {
  team: TeamMember[]
  stories: CmsStory[]
  children: ProgramChild[]
  ready: boolean
  error: string | null
  upsertTeam: (member: Omit<TeamMember, 'id'> & { id?: string }) => Promise<string | null>
  removeTeam: (id: string) => Promise<string | null>
  upsertStory: (story: Omit<CmsStory, 'id'> & { id?: string }) => Promise<string | null>
  removeStory: (id: string) => Promise<string | null>
  upsertChild: (child: Omit<ProgramChild, 'id'> & { id?: string }) => Promise<string | null>
  removeChild: (id: string) => Promise<string | null>
  getStoryBySlug: (slug: string) => CmsStory | undefined
}

const CmsContext = createContext<CmsContextValue | null>(null)

function toTeam(row: TeamRow): TeamMember {
  return {
    id: row.id,
    name: row.name,
    role: row.role,
    image: row.image ?? '',
  }
}

function toStory(row: StoryRow): CmsStory {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt ?? '',
    date: String(row.date).slice(0, 10),
    category: row.category,
    image: row.image ?? '',
    body: Array.isArray(row.body) ? row.body : [],
  }
}

function toChild(row: ChildRow): ProgramChild {
  return {
    id: row.id,
    name: row.name,
    age: Number(row.age) || 0,
    grade: row.grade ?? '',
    school: row.school ?? '',
    dream: row.dream ?? '',
    location: row.location ?? '',
    image: row.image ?? '',
    gallery: Array.isArray(row.gallery) ? row.gallery : [],
    video: row.video || undefined,
    story: row.story ?? '',
    monthlyNeed: Number(row.monthly_need) || 0,
    fundedPercent: Number(row.funded_percent) || 0,
    urgent: row.urgent || undefined,
  }
}

function byDateDesc(a: CmsStory, b: CmsStory) {
  return b.date.localeCompare(a.date)
}

export function CmsProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CmsState>({
    team: [],
    stories: [],
    children: [],
  })
  const [ready, setReady] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      if (!supabase) {
        if (!cancelled) {
          setError(supabaseConfigError)
          setReady(true)
        }
        return
      }

      const [teamRes, storiesRes, childrenRes] = await Promise.all([
        supabase.from('team').select('*').order('sort_order', { ascending: true }),
        supabase
          .from('stories')
          .select('*')
          .order('date', { ascending: false }),
        supabase
          .from('children')
          .select('*')
          .order('created_at', { ascending: true }),
      ])

      if (cancelled) return

      const failed = teamRes.error ?? storiesRes.error ?? childrenRes.error
      if (failed) {
        setError(failed.message)
        setReady(true)
        return
      }

      setState({
        team: ((teamRes.data ?? []) as TeamRow[]).map(toTeam),
        stories: ((storiesRes.data ?? []) as StoryRow[]).map(toStory),
        children: ((childrenRes.data ?? []) as ChildRow[]).map(toChild),
      })
      setError(null)
      setReady(true)
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  const upsertTeam = useCallback(
    async (member: Omit<TeamMember, 'id'> & { id?: string }) => {
      if (!supabase) return supabaseConfigError
      const payload = {
        name: member.name.trim(),
        role: member.role.trim(),
        image: member.image.trim(),
      }

      if (member.id) {
        const { data, error: writeError } = await supabase
          .from('team')
          .update(payload)
          .eq('id', member.id)
          .select('*')
          .single()
        if (writeError) return writeError.message
        const next = toTeam(data as TeamRow)
        setState((prev) => ({
          ...prev,
          team: prev.team.map((item) => (item.id === next.id ? next : item)),
        }))
        return null
      }

      const { data: last } = await supabase
        .from('team')
        .select('sort_order')
        .order('sort_order', { ascending: false })
        .limit(1)
        .maybeSingle()
      const sortOrder = ((last as { sort_order?: number } | null)?.sort_order ?? 0) + 1
      const { data, error: writeError } = await supabase
        .from('team')
        .insert({ ...payload, sort_order: sortOrder })
        .select('*')
        .single()
      if (writeError) return writeError.message
      const next = toTeam(data as TeamRow)
      setState((prev) => ({ ...prev, team: [...prev.team, next] }))
      return null
    },
    [],
  )

  const removeTeam = useCallback(async (id: string) => {
    if (!supabase) return supabaseConfigError
    const { error: writeError } = await supabase.from('team').delete().eq('id', id)
    if (writeError) return writeError.message
    setState((prev) => ({
      ...prev,
      team: prev.team.filter((item) => item.id !== id),
    }))
    return null
  }, [])

  const upsertStory = useCallback(
    async (story: Omit<CmsStory, 'id'> & { id?: string }) => {
      if (!supabase) return supabaseConfigError
      const payload = {
        title: story.title.trim(),
        slug: story.slug || slugify(story.title),
        excerpt: story.excerpt,
        date: story.date,
        category: story.category,
        image: story.image.trim(),
        body: story.body,
      }

      if (story.id) {
        const { data, error: writeError } = await supabase
          .from('stories')
          .update(payload)
          .eq('id', story.id)
          .select('*')
          .single()
        if (writeError) return writeError.message
        const next = toStory(data as StoryRow)
        setState((prev) => ({
          ...prev,
          stories: prev.stories
            .map((item) => (item.id === next.id ? next : item))
            .sort(byDateDesc),
        }))
        return null
      }

      const { data, error: writeError } = await supabase
        .from('stories')
        .insert(payload)
        .select('*')
        .single()
      if (writeError) return writeError.message
      const next = toStory(data as StoryRow)
      setState((prev) => ({
        ...prev,
        stories: [next, ...prev.stories].sort(byDateDesc),
      }))
      return null
    },
    [],
  )

  const removeStory = useCallback(async (id: string) => {
    if (!supabase) return supabaseConfigError
    const { error: writeError } = await supabase.from('stories').delete().eq('id', id)
    if (writeError) return writeError.message
    setState((prev) => ({
      ...prev,
      stories: prev.stories.filter((item) => item.id !== id),
    }))
    return null
  }, [])

  const upsertChild = useCallback(
    async (child: Omit<ProgramChild, 'id'> & { id?: string }) => {
      if (!supabase) return supabaseConfigError
      const payload = {
        name: child.name.trim(),
        age: Number(child.age) || 0,
        grade: child.grade,
        school: child.school,
        dream: child.dream,
        location: child.location,
        image: child.image.trim(),
        gallery: child.gallery ?? [],
        video: child.video?.trim() || null,
        story: child.story,
        monthly_need: Number(child.monthlyNeed) || 0,
        funded_percent: Math.min(100, Math.max(0, Number(child.fundedPercent) || 0)),
        urgent: Boolean(child.urgent),
      }

      if (child.id) {
        const { data, error: writeError } = await supabase
          .from('children')
          .update(payload)
          .eq('id', child.id)
          .select('*')
          .single()
        if (writeError) return writeError.message
        const next = toChild(data as ChildRow)
        setState((prev) => ({
          ...prev,
          children: prev.children.map((item) => (item.id === next.id ? next : item)),
        }))
        return null
      }

      const { data, error: writeError } = await supabase
        .from('children')
        .insert(payload)
        .select('*')
        .single()
      if (writeError) return writeError.message
      const next = toChild(data as ChildRow)
      setState((prev) => ({ ...prev, children: [...prev.children, next] }))
      return null
    },
    [],
  )

  const removeChild = useCallback(async (id: string) => {
    if (!supabase) return supabaseConfigError
    const { error: writeError } = await supabase.from('children').delete().eq('id', id)
    if (writeError) return writeError.message
    setState((prev) => ({
      ...prev,
      children: prev.children.filter((item) => item.id !== id),
    }))
    return null
  }, [])

  const getStoryBySlug = useCallback(
    (slug: string) => state.stories.find((story) => story.slug === slug),
    [state.stories],
  )

  const value = useMemo(
    () => ({
      team: state.team,
      stories: state.stories,
      children: state.children,
      ready,
      error,
      upsertTeam,
      removeTeam,
      upsertStory,
      removeStory,
      upsertChild,
      removeChild,
      getStoryBySlug,
    }),
    [
      state,
      ready,
      error,
      upsertTeam,
      removeTeam,
      upsertStory,
      removeStory,
      upsertChild,
      removeChild,
      getStoryBySlug,
    ],
  )

  return <CmsContext.Provider value={value}>{children}</CmsContext.Provider>
}

export function useCms() {
  const ctx = useContext(CmsContext)
  if (!ctx) throw new Error('useCms must be used within CmsProvider')
  return ctx
}
