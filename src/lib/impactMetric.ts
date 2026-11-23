import type { ImpactStat } from '../cms/types'

/** Align legacy CMS seed copy with Featured Programs card wording. */
export function normalizeImpactStat<T extends Pick<ImpactStat, 'value' | 'label'>>(stat: T): T {
  const label = stat.label.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim()
  if (/^children\s+supported$/i.test(label)) {
    return {
      ...stat,
      value: stat.value === '30+' ? '35+' : stat.value,
      label: 'Children Reached',
    }
  }
  if (/^families\s+fully\s+supported$/i.test(label)) {
    return { ...stat, label: 'Families Supported' }
  }
  return stat
}

/** Formats an impact stat as a program-card metric line, e.g. "35+ CHILDREN REACHED". */
export function formatImpactMetricLine(stat: Pick<ImpactStat, 'value' | 'label'>): string {
  const normalized = normalizeImpactStat(stat)
  return `${normalized.value} ${normalized.label.replace(/\n/g, ' ')}`
    .replace(/\s+/g, ' ')
    .trim()
    .toUpperCase()
}

/**
 * Picks the impact stat that should appear on a program card.
 * Children programs → child-related stat; family programs → family-related stat.
 */
export function impactStatForProgramHref(
  href: string,
  stats: ImpactStat[],
): ImpactStat | undefined {
  if (stats.length === 0) return undefined
  const sorted = [...stats].sort((a, b) => a.sortOrder - b.sortOrder)
  const byLabel = (re: RegExp) => sorted.find((s) => re.test(s.label))

  if (/every-kid|child/i.test(href)) {
    return byLabel(/child/i) ?? sorted[0]
  }
  if (/for-the-parents|family|parent/i.test(href)) {
    return byLabel(/famil/i) ?? sorted[1] ?? sorted[0]
  }
  return undefined
}
