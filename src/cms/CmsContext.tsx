import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { loadCmsState, newId, resetCmsState, saveCmsState, slugify } from './storage'
import type { CmsState, CmsStory, ProgramChild, TeamMember } from './types'

type CmsContextValue = {
  team: TeamMember[]
  stories: CmsStory[]
  children: ProgramChild[]
  ready: boolean
  upsertTeam: (member: Omit<TeamMember, 'id'> & { id?: string }) => void
  removeTeam: (id: string) => void
  upsertStory: (story: Omit<CmsStory, 'id'> & { id?: string }) => void
  removeStory: (id: string) => void
  upsertChild: (child: Omit<ProgramChild, 'id'> & { id?: string }) => void
  removeChild: (id: string) => void
  getStoryBySlug: (slug: string) => CmsStory | undefined
  resetAll: () => void
}

const CmsContext = createContext<CmsContextValue | null>(null)

export function CmsProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CmsState>({
    team: [],
    stories: [],
    children: [],
  })
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setState(loadCmsState())
    setReady(true)
  }, [])

  const commit = useCallback((next: CmsState) => {
    setState(next)
    saveCmsState(next)
  }, [])

  const upsertTeam = useCallback(
    (member: Omit<TeamMember, 'id'> & { id?: string }) => {
      commit({
        ...state,
        team: member.id
          ? state.team.map((item) =>
              item.id === member.id ? { ...item, ...member, id: member.id } : item,
            )
          : [...state.team, { ...member, id: newId('team') }],
      })
    },
    [commit, state],
  )

  const removeTeam = useCallback(
    (id: string) => {
      commit({ ...state, team: state.team.filter((item) => item.id !== id) })
    },
    [commit, state],
  )

  const upsertStory = useCallback(
    (story: Omit<CmsStory, 'id'> & { id?: string }) => {
      const slug = story.slug || slugify(story.title)
      const nextStory: CmsStory = {
        ...story,
        id: story.id ?? newId('story'),
        slug,
      }
      commit({
        ...state,
        stories: story.id
          ? state.stories.map((item) => (item.id === story.id ? nextStory : item))
          : [nextStory, ...state.stories],
      })
    },
    [commit, state],
  )

  const removeStory = useCallback(
    (id: string) => {
      commit({
        ...state,
        stories: state.stories.filter((item) => item.id !== id),
      })
    },
    [commit, state],
  )

  const upsertChild = useCallback(
    (child: Omit<ProgramChild, 'id'> & { id?: string }) => {
      const id = child.id ?? (slugify(child.name) || newId('child'))
      const nextChild: ProgramChild = { ...child, id }
      commit({
        ...state,
        children: child.id
          ? state.children.map((item) =>
              item.id === child.id ? nextChild : item,
            )
          : [...state.children, nextChild],
      })
    },
    [commit, state],
  )

  const removeChild = useCallback(
    (id: string) => {
      commit({
        ...state,
        children: state.children.filter((item) => item.id !== id),
      })
    },
    [commit, state],
  )

  const getStoryBySlug = useCallback(
    (slug: string) => state.stories.find((story) => story.slug === slug),
    [state.stories],
  )

  const resetAll = useCallback(() => {
    commit(resetCmsState())
  }, [commit])

  const value = useMemo(
    () => ({
      team: state.team,
      stories: state.stories,
      children: state.children,
      ready,
      upsertTeam,
      removeTeam,
      upsertStory,
      removeStory,
      upsertChild,
      removeChild,
      getStoryBySlug,
      resetAll,
    }),
    [
      state,
      ready,
      upsertTeam,
      removeTeam,
      upsertStory,
      removeStory,
      upsertChild,
      removeChild,
      getStoryBySlug,
      resetAll,
    ],
  )

  return <CmsContext.Provider value={value}>{children}</CmsContext.Provider>
}

export function useCms() {
  const ctx = useContext(CmsContext)
  if (!ctx) throw new Error('useCms must be used within CmsProvider')
  return ctx
}
