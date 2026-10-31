import { stories as siteStories } from '../data/site'
import type { CmsState, CmsStory, ProgramChild, TeamMember } from './types'

export const seedTeam: TeamMember[] = [
  {
    id: 'sarah-mitchell',
    name: 'Sarah Mitchell',
    role: 'Executive Director',
    bio: 'Sarah built Kubwabo Foundation from a weekend food drive into a multi-program NGO. She focuses on partner trust, transparent operations, and making sure every program starts with what communities actually ask for.',
    detail:
      'Before Kubwabo, Sarah spent a decade in community organizing and nonprofit operations across East and Southern Africa. She believes aid without dignity is incomplete — and that lasting change is designed with local leaders, not delivered to them.',
    image:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'david-chen',
    name: 'David Chen',
    role: 'Programs Director',
    bio: 'David designs and runs food, education, health, and shelter programs across 28 communities. His work turns field feedback into clearer priorities and measurable outcomes.',
    detail:
      'A former public-health program manager, David obsesses over logistics that protect dignity: timing, follow-up, and listening after the distribution ends. He mentors field leads so excellence scales without becoming cold or bureaucratic.',
    image:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'amara-osei',
    name: 'Amara Osei',
    role: 'Community Outreach Lead',
    bio: 'Amara connects families, volunteers, and partner organizations. She is the reason our programs feel personal — and why new volunteers stay.',
    detail:
      'Raised in one of the first communities Kubwabo served, Amara brings lived context to every outreach plan. She leads caregiver circles, school partnerships, and the volunteer onboarding path that turns first-timers into steady contributors.',
    image:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'lucas-ferreira',
    name: 'Lucas Ferreira',
    role: 'Finance & Operations',
    bio: 'Lucas keeps books clean, reports open, and operations sharp. Donors and partners know where every dollar goes because he makes transparency a daily habit.',
    detail:
      'With a background in audit and social enterprise finance, Lucas built Kubwabo’s reporting cadence: monthly program tallies, annual impact reports, and partner-verifiable spending. He is happiest when a spreadsheet tells a human story clearly.',
    image:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80',
  },
]

export const seedStories: CmsStory[] = siteStories.map((story) => ({
  id: story.id,
  slug: story.slug,
  title: story.title,
  excerpt: story.excerpt,
  date: story.date,
  category: story.category,
  image: story.image,
  body: [...story.body],
}))

export const seedChildren: ProgramChild[] = [
  {
    id: 'keza',
    name: 'Keza',
    age: 8,
    grade: 'Grade 3',
    school: 'Kigali Academy',
    dream: 'Aspiring Teacher',
    location: 'Kigali, Rwanda',
    image:
      'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
    story:
      'Keza is passionate about reading and spends every afternoon reading stories to younger children in her neighborhood. Her mother sells produce at a local market, and fluctuating income often made regular school fees uncertain. Support covers her full tuition, books, and daily hot lunch.',
    monthlyNeed: 35,
    fundedPercent: 65,
    urgent: true,
  },
  {
    id: 'samuel',
    name: 'Samuel',
    age: 10,
    grade: 'Grade 4',
    school: 'Bugesera Primary School',
    dream: 'Aspiring Mechanical Engineer',
    location: 'Bugesera, Rwanda',
    image:
      'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=800&q=80',
    story:
      'Samuel has an inventive mind, building miniature wire toy cars and windmills from recycled scraps. With guidance through our program, he received his first complete mathematics and science kit, shoes, and guaranteed daily meals at school.',
    monthlyNeed: 35,
    fundedPercent: 40,
    urgent: true,
  },
  {
    id: 'divine',
    name: 'Divine',
    age: 7,
    grade: 'Grade 2',
    school: 'Rwamagana Community School',
    dream: 'Aspiring Doctor',
    location: 'Rwamagana, Rwanda',
    image:
      'https://images.unsplash.com/photo-1547496613-4e19af6736dc?auto=format&fit=crop&w=800&q=80',
    story:
      'Full of vibrant curiosity, Divine is at the top of her primary class. She is cared for by her elderly grandmother on a subsistence garden. Sponsorship ensures Divine never misses school due to lack of uniforms, shoes, or school supplies.',
    monthlyNeed: 35,
    fundedPercent: 50,
  },
  {
    id: 'eric',
    name: 'Eric',
    age: 11,
    grade: 'Grade 5',
    school: 'Musanze Primary School',
    dream: 'Aspiring Agronomist',
    location: 'Musanze, Rwanda',
    image:
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80',
    story:
      'Eric loves nature and dreams of introducing modern sustainable farming techniques to his community. Last year, unpaid registration fees nearly forced him to drop out. Sponsorship keeps his exam fees and classroom resources secured.',
    monthlyNeed: 35,
    fundedPercent: 30,
    urgent: true,
  },
  {
    id: 'aline',
    name: 'Aline',
    age: 9,
    grade: 'Grade 4',
    school: 'Kayonza Primary School',
    dream: 'Aspiring Nurse',
    location: 'Kayonza, Rwanda',
    image:
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
    story:
      'Aline is gentle, compassionate, and loves helping in community clean-up days. Her family was displaced after severe seasonal rains. Through this program, her school supplies, tuition, and uniforms are fully provided so her learning stays uninterrupted.',
    monthlyNeed: 35,
    fundedPercent: 75,
  },
  {
    id: 'patrick',
    name: 'Patrick',
    age: 12,
    grade: 'Grade 6',
    school: 'Kigali Primary School',
    dream: 'Aspiring Computer Scientist',
    location: 'Kigali, Rwanda',
    image:
      'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=800&q=80',
    story:
      'Patrick is preparing for his national primary leaving exams. He is fascinated by technology and attends our weekly digital literacy weekend workshops. Sponsorship covers his revision workbooks, exam fees, and nutritious lunches.',
    monthlyNeed: 35,
    fundedPercent: 85,
  },
]

export const cmsSeed: CmsState = {
  team: seedTeam,
  stories: seedStories,
  children: seedChildren,
}
