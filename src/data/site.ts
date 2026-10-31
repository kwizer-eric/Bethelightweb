export const site = {
  name: 'Kubwabo Foundation',
  tagline: 'Change the world one act of kindness at a time.',
  email: 'hello@kubwabofoundation.org',
  phone: '+1 (555) 123-4567',
  address: '184 Main Collins Street, Victoria 8007',
  whatsappCommunity: 'https://chat.whatsapp.com/',
  social: {
    facebook: '#',
    instagram: '#',
    twitter: '#',
    linkedin: '#',
  },
} as const

export const navLinks = [
  { label: 'About', href: '/about' },
  { label: 'Programs', href: '/programs' },
  { label: 'Impact Stories', href: '/news' },
  { label: 'Contact', href: '/contact' },
] as const

export const programLinks = [
  {
    label: 'Every Child Deserves It',
    href: '/programs/every-kid-deserves-it',
  },
  {
    label: 'For Their Family',
    href: '/programs/for-the-parents',
  },
] as const

export const aboutSummary =
  'Kubwabo Foundation exists to bring practical help and lasting hope to communities overlooked by traditional aid. Founded by community leaders, we grew from a weekend food drive into an NGO serving 28 communities — with dignity, transparency, and programs in food relief, education, health, and housing.'

export const impactStats = [
  { value: '30+', label: 'Children\nSupported' },
  { value: '2', label: 'Families Fully\nSupported' },
  { value: '100+', label: 'Dedicated\nVolunteers' },
] as const

export const programs = [
  {
    id: 'food-relief',
    title: 'Food Relief',
    problem: 'Families facing hunger in underserved communities.',
    action: 'Weekly food distributions and emergency meal kits.',
    impact: '8,200 meals delivered last year.',
    raised: 62000,
    goal: 80000,
  },
  {
    id: 'education',
    title: 'Education Access',
    problem: 'Children without school supplies or safe learning spaces.',
    action: 'Scholarships, tutoring, and classroom resources.',
    impact: '450 students supported across 12 schools.',
    raised: 45000,
    goal: 60000,
  },
  {
    id: 'health',
    title: 'Community Health',
    problem: 'Limited access to basic healthcare and wellness support.',
    action: 'Mobile clinics, health workshops, and maternal care.',
    impact: '1,800 health consultations provided.',
    raised: 38000,
    goal: 50000,
  },
  {
    id: 'shelter',
    title: 'Shelter & Housing',
    problem: 'Families displaced or living in unsafe conditions.',
    action: 'Temporary housing, repairs, and relocation support.',
    impact: '92 families placed in safe housing.',
    raised: 71000,
    goal: 90000,
  },
] as const

export const testimonials = [
  {
    quote:
      'Kubwabo Foundation showed up when we had nowhere else to turn. They didn\'t just give us food — they gave us dignity.',
    name: 'Maria Santos',
    role: 'Community member, São Paulo',
  },
  {
    quote:
      'Volunteering here changed how I see service. Every hour matters, and the team makes sure of it.',
    name: 'James Okonkwo',
    role: 'Volunteer since 2023',
  },
  {
    quote:
      'As a partner organization, we trust Kubwabo Foundation completely. Transparent, fast, and deeply human.',
    name: 'Dr. Elena Vasquez',
    role: 'Partner, Health First Initiative',
  },
] as const

export const events = [
  {
    id: '1',
    title: 'Annual Charity Walk',
    date: '2026-06-14',
    location: 'Riverside Park',
    description: 'Walk with us to raise funds for food relief programs.',
  },
  {
    id: '2',
    title: 'Volunteer Orientation',
    date: '2026-05-22',
    location: 'Community Center, Hall B',
    description: 'New volunteer onboarding and team introductions.',
  },
  {
    id: '3',
    title: 'Fundraising Gala',
    date: '2026-09-08',
    location: 'Grand Hall, Downtown',
    description: 'An evening of stories, music, and giving.',
  },
] as const

export type StoryBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'ul'; items: string[] }

export const stories = [
  {
    id: '1',
    slug: 'a-meal-that-changed-everything',
    title: 'A meal that changed everything',
    excerpt:
      'When the Santos family lost their home, a single delivery became the first step back to stability.',
    date: '2026-04-02',
    category: 'Impact',
    image:
      'https://images.unsplash.com/photo-1595917248955-a96ace4780b6?auto=format&fit=crop&w=1600&q=80',
    body: [
      {
        type: 'p',
        text: 'When the Santos family lost their home, a single delivery became the first step back to stability. What began as emergency food relief quickly opened the door to longer-term support — and a path forward.',
      },
      {
        type: 'p',
        text: 'Kubwabo Foundation arrived within days of the displacement with meal kits, hygiene essentials, and a listening ear. That first visit mattered not only for nutrition, but for dignity: help offered with respect, and with a plan.',
      },
      {
        type: 'h2',
        text: 'What support looked like',
      },
      {
        type: 'ul',
        items: [
          'Weekly food distributions for eight weeks',
          'School supplies so the children could stay enrolled',
          'Referrals to temporary housing partners',
          'Follow-up visits from our community outreach team',
        ],
      },
      {
        type: 'p',
        text: 'Today the family is settled again. Maria says the turning point was not only the food — it was knowing someone would come back. That promise is at the heart of how we work.',
      },
    ] satisfies StoryBlock[],
  },
  {
    id: '2',
    slug: 'back-to-school-back-to-hope',
    title: 'Back to school, back to hope',
    excerpt:
      '450 students received supplies and tutoring support through our education program.',
    date: '2026-03-18',
    category: 'Education',
    image:
      'https://images.unsplash.com/photo-1547496613-4e19af6736dc?auto=format&fit=crop&w=1600&q=80',
    body: [
      {
        type: 'p',
        text: '450 students received supplies and tutoring support through our education program this term — giving families one less barrier between their children and the classroom.',
      },
      {
        type: 'p',
        text: 'Across twelve partner schools, Kubwabo Foundation distributed kits and paired learners with volunteer tutors. Teachers report higher attendance in the first month after distribution.',
      },
      {
        type: 'h2',
        text: 'This term we delivered',
      },
      {
        type: 'ul',
        items: [
          'Full supply kits for 450 learners',
          'Weekly tutoring sessions in reading and maths',
          'Parent workshops on supporting homework at home',
          'Scholarship support for 28 secondary students',
        ],
      },
      {
        type: 'p',
        text: 'Education access is not only about materials. It is about showing up consistently so children know school is a place they belong — and that their future is worth investing in.',
      },
    ] satisfies StoryBlock[],
  },
  {
    id: '3',
    slug: 'mobile-clinic-reaches-remote-village',
    title: 'Mobile clinic reaches remote village',
    excerpt:
      'Our health team traveled 6 hours to bring care to a community with no local clinic.',
    date: '2026-02-28',
    category: 'Health',
    image:
      'https://images.unsplash.com/photo-1773140278162-fd7df1043f0c?auto=format&fit=crop&w=1600&q=80',
    body: [
      {
        type: 'p',
        text: 'Our health team traveled six hours to bring care to a community with no local clinic. For many residents, it was the first clinical visit they could access without leaving work for days.',
      },
      {
        type: 'p',
        text: 'The mobile clinic offered consultations, maternal check-ups, and essential medicines. Community health volunteers helped with translation, triage, and follow-up planning.',
      },
      {
        type: 'h2',
        text: 'Clinic outcomes',
      },
      {
        type: 'ul',
        items: [
          '312 consultations in two days',
          '84 maternal and child health check-ups',
          'Vaccination referrals for 46 children',
          'Training for local health volunteers',
        ],
      },
      {
        type: 'p',
        text: 'We are already planning the next visit. Sustainable care means returning — and building skills that remain after the ambulance leaves.',
      },
    ] satisfies StoryBlock[],
  },
  {
    id: '4',
    slug: 'volunteer-spotlight-james',
    title: 'Volunteer spotlight: James',
    excerpt:
      "From weekend helper to program lead — one volunteer's journey with Kubwabo Foundation.",
    date: '2026-02-10',
    category: 'Volunteers',
    image:
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1600&q=80',
    body: [
      {
        type: 'p',
        text: "From weekend helper to program lead — James's journey with Kubwabo Foundation shows what happens when volunteers are trusted with real responsibility.",
      },
      {
        type: 'p',
        text: 'He started packing meal kits on Saturdays. Within a year he was coordinating distribution routes, mentoring new volunteers, and helping shape how we welcome newcomers.',
      },
      {
        type: 'h2',
        text: 'What James learned',
      },
      {
        type: 'ul',
        items: [
          'Consistency matters more than perfection',
          'Listening to community partners comes first',
          'Small logistics choices protect dignity',
          'Leadership can grow from service',
        ],
      },
      {
        type: 'p',
        text: 'Every hour you give helps families build a stronger future. James is proof that those hours can change the giver as much as the community.',
      },
    ] satisfies StoryBlock[],
  },
  {
    id: '5',
    slug: 'safe-roofs-before-the-rains',
    title: 'Safe roofs before the rains',
    excerpt:
      'Twelve families received emergency housing repairs ahead of the rainy season.',
    date: '2026-01-22',
    category: 'Housing',
    image:
      'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1600&q=80',
    body: [
      {
        type: 'p',
        text: 'Twelve families received emergency housing repairs ahead of the rainy season — reinforcing roofs, sealing walls, and making homes safer before the storms arrived.',
      },
      {
        type: 'p',
        text: 'Working with local builders, our shelter team prioritized homes with young children and elderly residents. Materials were sourced nearby whenever possible to keep work swift and accountable.',
      },
      {
        type: 'h2',
        text: 'Repairs completed',
      },
      {
        type: 'ul',
        items: [
          '12 roofs reinforced or replaced',
          'Drainage improved around six homes',
          'Safe sleeping spaces restored for 41 people',
          'Skill-sharing with neighbourhood builders',
        ],
      },
      {
        type: 'p',
        text: 'Shelter is foundational. When the rains came, these families stayed dry — and stayed together.',
      },
    ] satisfies StoryBlock[],
  },
  {
    id: '6',
    slug: 'community-garden-feeds-a-neighborhood',
    title: 'Community garden feeds a neighborhood',
    excerpt:
      'Local volunteers and staff transformed an empty lot into a shared food source.',
    date: '2026-01-08',
    category: 'Food',
    image:
      'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1600&q=80',
    body: [
      {
        type: 'p',
        text: 'Local volunteers and staff transformed an empty lot into a shared food source. The garden now supplies weekly produce distributions and teaching plots for nearby schools.',
      },
      {
        type: 'p',
        text: 'Neighbours rotate watering schedules. Children learn where food comes from. Families leave with bags of greens — and a stake in something they helped grow.',
      },
      {
        type: 'h2',
        text: 'Growing together',
      },
      {
        type: 'ul',
        items: [
          '1,200 sqm of cultivated land',
          'Weekly harvest shares for 60 households',
          'School garden sessions twice a month',
          'Composting and water-saving practices',
        ],
      },
      {
        type: 'p',
        text: 'Food relief is essential in crisis. Gardens like this are how communities build resilience between crises.',
      },
    ] satisfies StoryBlock[],
  },
  {
    id: '7',
    slug: 'scholarships-open-new-doors',
    title: 'Scholarships open new doors',
    excerpt:
      'Twenty students started the school year with fees covered and books in hand.',
    date: '2025-12-14',
    category: 'Education',
    image:
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1600&q=80',
    body: [
      {
        type: 'p',
        text: 'Twenty students started the school year with fees covered and books in hand — removing the financial cliff that too often ends a promising academic journey.',
      },
      {
        type: 'p',
        text: 'Scholarships cover tuition, uniforms, and exam fees for a full year, with mentors checking in each term so support stays personal, not transactional.',
      },
      {
        type: 'h2',
        text: 'This scholarship cohort',
      },
      {
        type: 'ul',
        items: [
          '20 secondary learners fully sponsored',
          'Mentorship paired with every award',
          'Family check-ins each school term',
          'Plans to expand by 15 places next year',
        ],
      },
      {
        type: 'p',
        text: 'When fees are sorted, students can focus on learning. That is the door we are trying to keep open.',
      },
    ] satisfies StoryBlock[],
  },
  {
    id: '8',
    slug: 'clean-water-for-three-villages',
    title: 'Clean water for three villages',
    excerpt:
      'New wells and training mean families no longer walk miles for safe drinking water.',
    date: '2025-11-30',
    category: 'Health',
    image:
      'https://images.unsplash.com/photo-1541544181051-e46607bc22a4?auto=format&fit=crop&w=1600&q=80',
    body: [
      {
        type: 'p',
        text: 'New wells and community training mean families in three villages no longer walk miles for safe drinking water — freeing hours each day and lowering water-borne illness risk.',
      },
      {
        type: 'p',
        text: 'Local committees now manage maintenance schedules and spare parts. Access without ownership does not last; this project was built to stay.',
      },
      {
        type: 'h2',
        text: 'Project results',
      },
      {
        type: 'ul',
        items: [
          '3 new protected wells completed',
          'Water committee training in each village',
          'Hygiene workshops for 180 households',
          'Reduced travel time reported by families',
        ],
      },
      {
        type: 'p',
        text: 'Clean water is health infrastructure. It is also time returned to caregivers, students, and workers.',
      },
    ] satisfies StoryBlock[],
  },
  {
    id: '9',
    slug: 'partners-on-the-ground',
    title: 'Partners on the ground',
    excerpt:
      'A look at how local leaders shape every program we run together.',
    date: '2025-11-12',
    category: 'Partners',
    image:
      'https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1600&q=80',
    body: [
      {
        type: 'p',
        text: 'A look at how local leaders shape every program we run together. Kubwabo Foundation does not arrive with a fixed script — we arrive ready to listen.',
      },
      {
        type: 'p',
        text: 'From site selection to volunteer schedules, community partners guide decisions. That approach keeps aid practical, trusted, and rooted in what people actually need.',
      },
      {
        type: 'h2',
        text: 'How partnership works',
      },
      {
        type: 'ul',
        items: [
          'Co-designed program priorities each quarter',
          'Transparent budgets shared with local leads',
          'Joint monitoring visits after every major distribution',
          'Feedback loops that change how we operate',
        ],
      },
      {
        type: 'p',
        text: 'Lasting change is built with, not for, local people. Our partners make that principle real every week.',
      },
    ] satisfies StoryBlock[],
  },
] as const

const u = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`

/** 6–9 unique gallery images per story slug */
export const storyGalleries: Record<string, readonly string[]> = {
  'a-meal-that-changed-everything': [
    u('photo-1488521787991-ed7b6a063709'),
    u('photo-1593113598332-cd288d649433'),
    u('photo-1469571486292-0ba58a3f068b'),
    u('photo-1532629345422-7515f3d16bb6'),
    u('photo-1488521787991-ed7bbae1fce0'),
    u('photo-1509099863731-ef4bffa77d07'),
    u('photo-1542810634-71277d95dcbb'),
  ],
  'back-to-school-back-to-hope': [
    u('photo-1503676260728-1c00da094a0b'),
    u('photo-1497633762265-9d179a990aa6'),
    u('photo-1509062522246-3755977927d7'),
    u('photo-1580582932707-520aed937b7b'),
    u('photo-1427504494785-3a9ca7044f45'),
    u('photo-1503454537195-1dcabb73ffb9'),
    u('photo-1588072432836-e10032774350'),
  ],
  'mobile-clinic-reaches-remote-village': [
    u('photo-1576091160399-112ba8d25d1d'),
    u('photo-1631815588090-d4bfec5b1ccb'),
    u('photo-1584820927498-cfe5211fd8bf'),
    u('photo-1579684385127-1ef15d508118'),
    u('photo-1559757148-5c350d0d3c56'),
    u('photo-1516574187841-cb9cc2ca948b'),
    u('photo-1581056771107-24ca5f033802'),
  ],
  'volunteer-spotlight-james': [
    u('photo-1559027615-cd4628902d4a'),
    u('photo-1469571486292-0ba58a3f068b'),
    u('photo-1593113630400-ea4288922497'),
    u('photo-1461532257246-777de18cd58b'),
    u('photo-1544027993-37dbfe43562a'),
    u('photo-1556487335-4fd24a9f25ef'),
    u('photo-1522202176988-66273c2fd55f'),
  ],
  'safe-roofs-before-the-rains': [
    u('photo-1448630360428-65456885c650'),
    u('photo-1480074568708-e7b720bb3f09'),
    u('photo-1516455590571-18256e5bb9ff'),
    u('photo-1560518883-ce09059eeffa'),
    u('photo-1564013799919-ab600027ffc6'),
    u('photo-1600585154340-be6161a56a0c'),
    u('photo-1605276374104-dee2a0ed3cd6'),
  ],
  'community-garden-feeds-a-neighborhood': [
    u('photo-1416879595882-3373a0480b5b'),
    u('photo-1466692476866-aef1dfb1e735'),
    u('photo-1592419044706-39796d40f98c'),
    u('photo-1523348837708-15d4a09cfac2'),
    u('photo-1471193945509-9ad0617afabf'),
    u('photo-1530836369250-ef72a3f5cda8'),
    u('photo-1461354464878-ad92f492a5a0'),
  ],
  'scholarships-open-new-doors': [
    u('photo-1523050854058-8df90110c9f1'),
    u('photo-1524178232363-1fb2b075b655'),
    u('photo-1577896851231-70ef18881754'),
    u('photo-1427504494785-3a9ca7044f45'),
    u('photo-1434030216411-0b793f4b4173'),
    u('photo-1456513080080-7fda1f3578aa'),
    u('photo-1481627834876-b7833e8f5570'),
  ],
  'clean-water-for-three-villages': [
    u('photo-1541252260730-0412e8e2108e'),
    u('photo-1538300342682-cf57afb97285'),
    u('photo-1476673160081-cf065607f449'),
    u('photo-1523365280197-f1783db9fe62'),
    u('photo-1507003211169-0a1dd7228f2d'),
    u('photo-1559827260-dc66d52bef19'),
    u('photo-1621451537084-482c73073a0f'),
  ],
  'partners-on-the-ground': [
    u('photo-1517048676732-d65bc937f952'),
    u('photo-1552664730-d307ca884978'),
    u('photo-1521737604893-d14cc237f11d'),
    u('photo-1600880292203-757bb62b4baf'),
    u('photo-1517245386807-bb43f82c33c4'),
    u('photo-1573164713714-d95e436ab8d6'),
    u('photo-1556761175-5973dc0f32e7'),
  ],
}

export function getStoryBySlug(slug: string) {
  return stories.find((story) => story.slug === slug)
}

export function getStoryGallery(slug: string) {
  return storyGalleries[slug] ?? []
}


export const volunteerRoles = [
  {
    title: 'Food Distribution',
    commitment: '4 hrs/week',
    description: 'Help pack and deliver meals to families in need.',
  },
  {
    title: 'Tutoring & Mentorship',
    commitment: '2 hrs/week',
    description: 'Support students with homework and learning activities.',
  },
  {
    title: 'Event Support',
    commitment: 'Flexible',
    description: 'Assist at fundraisers, walks, and community events.',
  },
  {
    title: 'Admin & Outreach',
    commitment: 'Remote, flexible',
    description: 'Help with communications, social media, and coordination.',
  },
] as const

export const team = [
  {
    name: 'Sarah Mitchell',
    role: 'Executive Director',
    bio: 'Sarah built Kubwabo Foundation from a weekend food drive into a multi-program NGO. She focuses on partner trust, transparent operations, and making sure every program starts with what communities actually ask for.',
    detail:
      'Before Kubwabo, Sarah spent a decade in community organizing and nonprofit operations across East and Southern Africa. She believes aid without dignity is incomplete — and that lasting change is designed with local leaders, not delivered to them.',
  },
  {
    name: 'David Chen',
    role: 'Programs Director',
    bio: 'David designs and runs food, education, health, and shelter programs across 28 communities. His work turns field feedback into clearer priorities and measurable outcomes.',
    detail:
      'A former public-health program manager, David obsesses over logistics that protect dignity: timing, follow-up, and listening after the distribution ends. He mentors field leads so excellence scales without becoming cold or bureaucratic.',
  },
  {
    name: 'Amara Osei',
    role: 'Community Outreach Lead',
    bio: 'Amara connects families, volunteers, and partner organizations. She is the reason our programs feel personal — and why new volunteers stay.',
    detail:
      'Raised in one of the first communities Kubwabo served, Amara brings lived context to every outreach plan. She leads caregiver circles, school partnerships, and the volunteer onboarding path that turns first-timers into steady contributors.',
  },
  {
    name: 'Lucas Ferreira',
    role: 'Finance & Operations',
    bio: 'Lucas keeps books clean, reports open, and operations sharp. Donors and partners know where every dollar goes because he makes transparency a daily habit.',
    detail:
      'With a background in audit and social enterprise finance, Lucas built Kubwabo’s reporting cadence: monthly program tallies, annual impact reports, and partner-verifiable spending. He is happiest when a spreadsheet tells a human story clearly.',
  },
] as const

export const values = [
  { title: 'Compassion', description: 'We meet people where they are, without judgment.' },
  { title: 'Transparency', description: 'Every dollar is accounted for and reported openly.' },
  { title: 'Dignity', description: 'Aid that respects the humanity of those we serve.' },
  { title: 'Community', description: 'Lasting change is built with, not for, local people.' },
] as const

export const donationPresets = [10, 25, 50, 100] as const

export const impactPerAmount = [
  { amount: 10, impact: 'Provides 3 nutritious meals' },
  { amount: 25, impact: 'School supplies for one child' },
  { amount: 50, impact: 'Basic health kit for a family' },
  { amount: 100, impact: 'One week of emergency shelter support' },
] as const
