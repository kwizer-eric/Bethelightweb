import type { CmsStory } from './types'

export type StoryCardView = {
  badge: string
  title: string
  description: string
  image: string
  href: string
}

/** Maps a CMS story to the home / listing card shape. */
export function storyToCard(story: CmsStory): StoryCardView {
  return {
    badge: story.badge.trim() || story.category.toUpperCase(),
    title: story.cardTitle.trim() || story.title,
    description: story.cardDescription.trim() || story.excerpt,
    image: story.image,
    href: `/news/${story.slug}`,
  }
}
