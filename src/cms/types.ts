import type { StoryBlock } from '../data/site'

export type TeamMember = {
  id: string
  name: string
  role: string
  image: string
  /** Shown on About board grid when true */
  isBoard?: boolean
}

export type CmsStory = {
  id: string
  slug: string
  title: string
  excerpt: string
  date: string
  category: string
  /** Home / listing card metric line, e.g. "35+ CHILDREN REACHED" */
  badge: string
  /** Optional shorter card title; falls back to title */
  cardTitle: string
  /** Optional card blurb; falls back to excerpt */
  cardDescription: string
  image: string
  gallery: string[]
  body: StoryBlock[]
}

export type ProgramChild = {
  id: string
  name: string
  age: number
  grade: string
  school: string
  dream: string
  location: string
  image: string
  /** Extra photos for the child detail page (cover stays `image`) */
  gallery: string[]
  /** Optional YouTube/Vimeo URL or direct .mp4 */
  video?: string
  story: string
  monthlyNeed: number
  fundedPercent: number
  urgent?: boolean
}

export type HomeProgram = {
  id: string
  title: string
  description: string
  metric: string
  image: string
  imageAlt: string
  href: string
  sortOrder: number
}

export type ImpactStat = {
  id: string
  value: string
  label: string
  sortOrder: number
}

export type CmsState = {
  team: TeamMember[]
  stories: CmsStory[]
  children: ProgramChild[]
  homePrograms: HomeProgram[]
  impactStats: ImpactStat[]
}

export type CmsSection = 'team' | 'stories' | 'children' | 'homePrograms' | 'impactStats'
