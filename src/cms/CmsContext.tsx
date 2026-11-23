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
import { normalizeImpactStat } from '../lib/impactMetric'
import { slugify } from './storage'
import type {
  CmsState,
  CmsStory,
  HomeProgram,
  ImpactStat,
  ProgramChild,
  TeamMember,
} from './types'
import type { StoryBlock } from '../data/site'

type TeamRow = {
  id: string
  name: string
  role: string
  image: string
  sort_order: number
  is_board?: boolean
}

type StoryRow = {
  id: string
  slug: string
  title: string
  excerpt: string
  date: string
  category: string
  badge?: string | null
  card_title?: string | null
  card_description?: string | null
  image: string
  gallery?: string[] | null
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

type HomeProgramRow = {
  id: string
  title: string
  description: string
  metric: string
  image: string
  image_alt: string
  href: string
  sort_order: number
}

type ImpactStatRow = {
  id: string
  value: string
  label: string
  sort_order: number
}

type CmsContextValue = {
  team: TeamMember[]
  stories: CmsStory[]
  children: ProgramChild[]
  homePrograms: HomeProgram[]
  impactStats: ImpactStat[]
  ready: boolean
  error: string | null
  upsertTeam: (member: Omit<TeamMember, 'id'> & { id?: string }) => Promise<string | null>
  removeTeam: (id: string) => Promise<string | null>
  upsertStory: (story: Omit<CmsStory, 'id'> & { id?: string }) => Promise<string | null>
  removeStory: (id: string) => Promise<string | null>
  upsertChild: (child: Omit<ProgramChild, 'id'> & { id?: string }) => Promise<string | null>
  removeChild: (id: string) => Promise<string | null>
  upsertHomeProgram: (
    program: Omit<HomeProgram, 'id'> & { id?: string },
  ) => Promise<string | null>
  removeHomeProgram: (id: string) => Promise<string | null>
  upsertImpactStat: (stat: Omit<ImpactStat, 'id'> & { id?: string }) => Promise<string | null>
  removeImpactStat: (id: string) => Promise<string | null>
  getStoryBySlug: (slug: string) => CmsStory | undefined
}

const CmsContext = createContext<CmsContextValue | null>(null)

function toTeam(row: TeamRow): TeamMember {
  return {
    id: row.id,
    name: row.name,
    role: row.role,
    image: row.image ?? '',
    isBoard: row.is_board ?? true,
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
    badge: row.badge ?? '',
    cardTitle: row.card_title ?? '',
    cardDescription: row.card_description ?? '',
    image: row.image ?? '',
    gallery: Array.isArray(row.gallery)
      ? row.gallery.filter((item): item is string => typeof item === 'string')
      : [],
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

function toHomeProgram(row: HomeProgramRow): HomeProgram {
  return {
    id: row.id,
    title: row.title,
    description: row.description ?? '',
    metric: row.metric ?? '',
    image: row.image ?? '',
    imageAlt: row.image_alt ?? '',
    href: row.href,
    sortOrder: Number(row.sort_order) || 0,
  }
}

function toImpactStat(row: ImpactStatRow): ImpactStat {
  return normalizeImpactStat({
    id: row.id,
    value: row.value,
    label: row.label,
    sortOrder: Number(row.sort_order) || 0,
  })
}

function byDateDesc(a: CmsStory, b: CmsStory) {
  return b.date.localeCompare(a.date)
}

function bySortOrder<T extends { sortOrder: number }>(a: T, b: T) {
  return a.sortOrder - b.sortOrder
}

export function CmsProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CmsState>({
    team: [],
    stories: [],
    children: [],
    homePrograms: [],
    impactStats: [],
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

      const [teamRes, storiesRes, childrenRes, programsRes, statsRes] = await Promise.all([
        supabase.from('team').select('*').order('sort_order', { ascending: true }),
        supabase
          .from('stories')
          .select('*')
          .order('date', { ascending: false }),
        supabase
          .from('children')
          .select('*')
          .order('created_at', { ascending: true }),
        supabase
          .from('home_programs')
          .select('*')
          .order('sort_order', { ascending: true }),
        supabase
          .from('impact_stats')
          .select('*')
          .order('sort_order', { ascending: true }),
      ])

      if (cancelled) return

      const failed = teamRes.error ?? storiesRes.error ?? childrenRes.error
      if (failed) {
        setError(failed.message)
        setReady(true)
        return
      }

      // Newer tables may not exist until schema.sql is re-run; fall back to empty + static UI.
      const homePrograms = programsRes.error
        ? []
        : ((programsRes.data ?? []) as HomeProgramRow[]).map(toHomeProgram).sort(bySortOrder)
      const impactStats = statsRes.error
        ? []
        : ((statsRes.data ?? []) as ImpactStatRow[]).map(toImpactStat).sort(bySortOrder)

      setState({
        team: ((teamRes.data ?? []) as TeamRow[]).map(toTeam),
        stories: ((storiesRes.data ?? []) as StoryRow[]).map(toStory),
        children: ((childrenRes.data ?? []) as ChildRow[]).map(toChild),
        homePrograms,
        impactStats,
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
        is_board: member.isBoard !== false,
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
        badge: (story.badge ?? '').trim(),
        card_title: (story.cardTitle ?? '').trim(),
        card_description: (story.cardDescription ?? '').trim(),
        image: story.image.trim(),
        gallery: (story.gallery ?? []).map((item) => item.trim()).filter(Boolean),
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

  const upsertHomeProgram = useCallback(
    async (program: Omit<HomeProgram, 'id'> & { id?: string }) => {
      if (!supabase) return supabaseConfigError
      const payload = {
        title: program.title.trim(),
        description: program.description.trim(),
        metric: program.metric.trim(),
        image: program.image.trim(),
        image_alt: program.imageAlt.trim(),
        href: program.href.trim(),
        sort_order: Number(program.sortOrder) || 0,
      }

      if (program.id) {
        const { data, error: writeError } = await supabase
          .from('home_programs')
          .update(payload)
          .eq('id', program.id)
          .select('*')
          .single()
        if (writeError) return writeError.message
        const next = toHomeProgram(data as HomeProgramRow)
        setState((prev) => ({
          ...prev,
          homePrograms: prev.homePrograms
            .map((item) => (item.id === next.id ? next : item))
            .sort(bySortOrder),
        }))
        return null
      }

      const { data: last } = await supabase
        .from('home_programs')
        .select('sort_order')
        .order('sort_order', { ascending: false })
        .limit(1)
        .maybeSingle()
      const sortOrder =
        program.sortOrder ||
        ((last as { sort_order?: number } | null)?.sort_order ?? 0) + 1
      const { data, error: writeError } = await supabase
        .from('home_programs')
        .insert({ ...payload, sort_order: sortOrder })
        .select('*')
        .single()
      if (writeError) return writeError.message
      const next = toHomeProgram(data as HomeProgramRow)
      setState((prev) => ({
        ...prev,
        homePrograms: [...prev.homePrograms, next].sort(bySortOrder),
      }))
      return null
    },
    [],
  )

  const removeHomeProgram = useCallback(async (id: string) => {
    if (!supabase) return supabaseConfigError
    const { error: writeError } = await supabase.from('home_programs').delete().eq('id', id)
    if (writeError) return writeError.message
    setState((prev) => ({
      ...prev,
      homePrograms: prev.homePrograms.filter((item) => item.id !== id),
    }))
    return null
  }, [])

  const upsertImpactStat = useCallback(
    async (stat: Omit<ImpactStat, 'id'> & { id?: string }) => {
      if (!supabase) return supabaseConfigError
      const payload = {
        value: stat.value.trim(),
        label: stat.label.trim(),
        sort_order: Number(stat.sortOrder) || 0,
      }

      if (stat.id) {
        const { data, error: writeError } = await supabase
          .from('impact_stats')
          .update(payload)
          .eq('id', stat.id)
          .select('*')
          .single()
        if (writeError) return writeError.message
        const next = toImpactStat(data as ImpactStatRow)
        setState((prev) => ({
          ...prev,
          impactStats: prev.impactStats
            .map((item) => (item.id === next.id ? next : item))
            .sort(bySortOrder),
        }))
        return null
      }

      const { data: last } = await supabase
        .from('impact_stats')
        .select('sort_order')
        .order('sort_order', { ascending: false })
        .limit(1)
        .maybeSingle()
      const sortOrder =
        stat.sortOrder || ((last as { sort_order?: number } | null)?.sort_order ?? 0) + 1
      const { data, error: writeError } = await supabase
        .from('impact_stats')
        .insert({ ...payload, sort_order: sortOrder })
        .select('*')
        .single()
      if (writeError) return writeError.message
      const next = toImpactStat(data as ImpactStatRow)
      setState((prev) => ({
        ...prev,
        impactStats: [...prev.impactStats, next].sort(bySortOrder),
      }))
      return null
    },
    [],
  )

  const removeImpactStat = useCallback(async (id: string) => {
    if (!supabase) return supabaseConfigError
    const { error: writeError } = await supabase.from('impact_stats').delete().eq('id', id)
    if (writeError) return writeError.message
    setState((prev) => ({
      ...prev,
      impactStats: prev.impactStats.filter((item) => item.id !== id),
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
      homePrograms: state.homePrograms,
      impactStats: state.impactStats,
      ready,
      error,
      upsertTeam,
      removeTeam,
      upsertStory,
      removeStory,
      upsertChild,
      removeChild,
      upsertHomeProgram,
      removeHomeProgram,
      upsertImpactStat,
      removeImpactStat,
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
      upsertHomeProgram,
      removeHomeProgram,
      upsertImpactStat,
      removeImpactStat,
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
