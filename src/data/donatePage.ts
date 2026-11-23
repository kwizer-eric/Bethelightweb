import { programLinks } from './site'

export const DONATE_AMOUNTS = [10, 100, 200, 500] as const

export type DonateAmount = (typeof DONATE_AMOUNTS)[number]

/** Program slug used in `/donate?program=` and sponsor links */
export const EVERY_KID_PROGRAM_ID = 'every-kid-deserves-it'
export const FOR_THE_PARENTS_PROGRAM_ID = 'for-the-parents'
export const DEFAULT_DONATE_PROGRAM_ID = FOR_THE_PARENTS_PROGRAM_ID

function programIdFromHref(href: string) {
  return href.replace(/^\/programs\//, '')
}

export type DonateProgramOption = {
  id: string
  label: string
  allowsChildSponsor: boolean
}

/** Only the two flagship program pages */
export const DONATE_PROGRAMS: DonateProgramOption[] = programLinks.map((link) => {
  const id = programIdFromHref(link.href)
  return {
    id,
    label: link.label,
    allowsChildSponsor: id === EVERY_KID_PROGRAM_ID,
  }
})

export const DONATE_COUNTRIES = [
  'United States',
  'Rwanda',
  'United Kingdom',
  'Canada',
  'Kenya',
  'Uganda',
  'Other',
] as const

export const DONATE_CURRENCIES = [
  { code: 'RWF', label: 'RWF' },
  { code: 'USD', label: 'USD' },
  { code: 'EUR', label: 'EUR' },
  { code: 'GBP', label: 'GBP' },
  { code: 'KES', label: 'KES' },
] as const

export type DonateCurrencyCode = (typeof DONATE_CURRENCIES)[number]['code']

export const DEFAULT_DONATE_CURRENCY: DonateCurrencyCode = 'RWF'

type ImpactCopy = { monthly: string; oneTime: string }

export const DONATE_IMPACT_BY_AMOUNT: Record<DonateAmount, ImpactCopy> = {
  10: {
    monthly:
      '$10 each month helps provide school materials and encouragement for a child we walk alongside.',
    oneTime:
      'A $10 gift helps cover notebooks, pens, and essential learning supplies for a child.',
  },
  100: {
    monthly:
      '$100 monthly strengthens education support, mentoring, and steady care for a child and their family.',
    oneTime:
      'A $100 gift funds a month of education support, mentorship, and encouragement for a child.',
  },
  200: {
    monthly:
      '$200 each month helps families with essential support, livelihood guidance, and space to grow.',
    oneTime:
      'A $200 gift helps a household meet essential needs while parents take steps toward greater stability.',
  },
  500: {
    monthly:
      '$500 monthly sustains education, family support, and mentorship across the children and households we serve.',
    oneTime:
      'A $500 gift expands education, mentorship, and family-strengthening work across our Rwanda communities.',
  },
}

export function formatDonateAmount(
  amount: number,
  currency: DonateCurrencyCode = DEFAULT_DONATE_CURRENCY,
): string {
  if (!Number.isFinite(amount) || amount <= 0) {
    return currency === 'USD'
      ? '$0'
      : currency === 'EUR'
        ? '€0'
        : currency === 'GBP'
          ? '£0'
          : `0 ${currency}`
  }
  const value = Number.isInteger(amount)
    ? amount.toLocaleString()
    : amount.toLocaleString(undefined, { maximumFractionDigits: 2 })
  switch (currency) {
    case 'USD':
      return `$${value}`
    case 'EUR':
      return `€${value}`
    case 'GBP':
      return `£${value}`
    case 'KES':
      return `KSh ${value}`
    case 'RWF':
    default:
      return `${value} ${currency}`
  }
}

export function currencyInputPrefix(currency: DonateCurrencyCode): string {
  switch (currency) {
    case 'USD':
      return '$'
    case 'EUR':
      return '€'
    case 'GBP':
      return '£'
    case 'KES':
      return 'KSh'
    case 'RWF':
    default:
      return 'FRw'
  }
}

export function donateImpactLine(
  _amount: number,
  _frequency: 'one-time' | 'monthly',
  _currency: DonateCurrencyCode,
): string {
  return 'Your gift helps provide education, essential support, and opportunities for stronger families.'
}

export const DONATE_STEPS = [
  {
    number: '1',
    title: 'Your donation',
    body: '100% of your gift goes toward supporting vulnerable children and families, education, essential needs, mentorship, and family-strengthening initiatives. No hidden fees. Every contribution matters.',
  },
  {
    number: '2',
    title: 'Our action',
    body: 'We turn your generosity into meaningful work on the ground. Through Every Child Deserves It and For Their Family, we respond to real needs and walk alongside those we serve, with care that continues past a single moment.',
  },
  {
    number: '3',
    title: 'Their future',
    body: 'Children gain room to learn, grow, and pursue their dreams. Families move toward greater stability and independence. Together, we help build a future where every child has the opportunity to thrive.',
  },
] as const

export const DONATE_FAQS = [
  {
    question: 'What does Kubwabo Foundation do?',
    answer:
      'Kubwabo means "For Them." We are a youth-led foundation in Rwanda that walks alongside vulnerable children and families so hardship does not define their future. Through Every Child Deserves It, we support education, mentorship, guidance, and encouragement so children can stay in school and grow with confidence. Through For Their Family, we help households build greater stability with essential support, livelihood opportunities, and mentorship. Our focus is practical care that lasts, not a single moment of help, but continued partnership.',
  },
  {
    question: 'Is Kubwabo Foundation registered?',
    answer:
      'Not yet. We are a youth-led foundation, one year old, and we are working toward registration with the Rwanda Governance Board. We work closely with local governance and community partners as we complete that process, so support stays transparent, accountable, and rooted where it matters most.',
  },
  {
    question: 'Where does Kubwabo Foundation operate?',
    answer:
      'We work in Rwanda with children and families in vulnerable communities. Our approach is rooted locally: we listen closely, partner with people on the ground, and design support around real needs so help is personal, accountable, and lasting.',
  },
  {
    question: 'How are donations used?',
    answer:
      '100% of your donation goes directly toward supporting vulnerable children and families, through education and learning materials, essential needs, mentorship, and family-strengthening initiatives. No hidden fees. Every contribution helps keep children learning, families more stable, and dignity intact.',
  },
  {
    question: 'Can I choose which program to support?',
    answer:
      'Yes. On this page you can direct your gift to Every Child Deserves It, For Their Family, or, when available, sponsor a specific child in the Every Child Deserves It program. Either way, your support helps us walk alongside those we serve for the long road.',
  },
  {
    question: 'How do I complete my donation?',
    answer:
      'Share your details in the form, then follow the MoMo or bank transfer instructions we provide. Once your transfer is complete, we confirm your gift and put it to work through our programs.',
  },
  {
    question: 'Will I receive a donation receipt?',
    answer:
      'Yes. After you complete your contribution, we send confirmation and a donation receipt so you have a clear record of your gift.',
  },
] as const