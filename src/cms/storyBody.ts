import type { StoryBlock } from '../data/site'

/** Encode story body into a simple editable text format. */
export function bodyToText(body: StoryBlock[]) {
  return body
    .map((block) => {
      if (block.type === 'p') return block.text
      if (block.type === 'h2') return `## ${block.text}`
      return block.items.map((item) => `- ${item}`).join('\n')
    })
    .join('\n\n')
}

/** Parse editable text back into story blocks. */
export function textToBody(text: string): StoryBlock[] {
  const chunks = text
    .split(/\n{2,}/)
    .map((chunk) => chunk.trim())
    .filter(Boolean)

  const blocks: StoryBlock[] = []

  for (const chunk of chunks) {
    const lines = chunk.split('\n').map((line) => line.trim()).filter(Boolean)
    if (lines.every((line) => line.startsWith('- ') || line.startsWith('* '))) {
      blocks.push({
        type: 'ul',
        items: lines.map((line) => line.replace(/^[-*]\s+/, '')),
      })
      continue
    }
    if (lines.length === 1 && lines[0].startsWith('## ')) {
      blocks.push({ type: 'h2', text: lines[0].replace(/^##\s+/, '') })
      continue
    }
    blocks.push({ type: 'p', text: lines.join(' ') })
  }

  return blocks.length > 0
    ? blocks
    : [{ type: 'p', text: 'Story content coming soon.' }]
}
