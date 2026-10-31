import type { StoryBlock } from '../data/site'

export type TeamMember = {
  id: string
  name: string
  role: string
  bio: string
  detail: string
  image: string
}

export type CmsStory = {
  id: string
  slug: string
  title: string
  excerpt: string
  date: string
  category: string
  image: string
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
  story: string
  monthlyNeed: number
  fundedPercent: number
  urgent?: boolean
}

export type CmsState = {
  team: TeamMember[]
  stories: CmsStory[]
  children: ProgramChild[]
}

export type CmsSection = 'team' | 'stories' | 'children'
