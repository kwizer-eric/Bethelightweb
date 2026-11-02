-- Kubwabo CMS schema
-- Run this in the Supabase SQL editor.
-- Then turn off public sign-ups and create one admin user under Authentication.

create table if not exists public.team (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null,
  image text not null default '',
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.children (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  age int not null default 0,
  grade text not null default '',
  school text not null default '',
  dream text not null default '',
  location text not null default '',
  image text not null default '',
  story text not null default '',
  monthly_need numeric not null default 0,
  funded_percent int not null default 0 check (funded_percent between 0 and 100),
  urgent boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.stories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text not null default '',
  date date not null,
  category text not null default 'Impact',
  image text not null default '',
  body jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.team enable row level security;
alter table public.children enable row level security;
alter table public.stories enable row level security;

grant select on public.team, public.children, public.stories to anon, authenticated;
grant insert, update, delete on public.team, public.children, public.stories to authenticated;

drop policy if exists team_select on public.team;
drop policy if exists team_insert on public.team;
drop policy if exists team_update on public.team;
drop policy if exists team_delete on public.team;
drop policy if exists children_select on public.children;
drop policy if exists children_insert on public.children;
drop policy if exists children_update on public.children;
drop policy if exists children_delete on public.children;
drop policy if exists stories_select on public.stories;
drop policy if exists stories_insert on public.stories;
drop policy if exists stories_update on public.stories;
drop policy if exists stories_delete on public.stories;

create policy team_select on public.team
  for select to anon, authenticated
  using (true);
create policy team_insert on public.team
  for insert to authenticated
  with check (auth.role() = 'authenticated');
create policy team_update on public.team
  for update to authenticated
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');
create policy team_delete on public.team
  for delete to authenticated
  using (auth.role() = 'authenticated');

create policy children_select on public.children
  for select to anon, authenticated
  using (true);
create policy children_insert on public.children
  for insert to authenticated
  with check (auth.role() = 'authenticated');
create policy children_update on public.children
  for update to authenticated
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');
create policy children_delete on public.children
  for delete to authenticated
  using (auth.role() = 'authenticated');

create policy stories_select on public.stories
  for select to anon, authenticated
  using (true);
create policy stories_insert on public.stories
  for insert to authenticated
  with check (auth.role() = 'authenticated');
create policy stories_update on public.stories
  for update to authenticated
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');
create policy stories_delete on public.stories
  for delete to authenticated
  using (auth.role() = 'authenticated');

insert into public.team (name, role, image, sort_order)
select name, role, image, sort_order
from (
  values
  ($name$Sarah Mitchell$name$, $role$Executive Director$role$, $img$https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80$img$, 1),
  ($name$David Chen$name$, $role$Programs Director$role$, $img$https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80$img$, 2),
  ($name$Amara Osei$name$, $role$Community Outreach Lead$role$, $img$https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80$img$, 3),
  ($name$Lucas Ferreira$name$, $role$Finance & Operations$role$, $img$https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80$img$, 4)
) as seed(name, role, image, sort_order)
where not exists (select 1 from public.team);

insert into public.children (
  name, age, grade, school, dream, location, image, story, monthly_need, funded_percent, urgent
)
select name, age, grade, school, dream, location, image, story, monthly_need, funded_percent, urgent
from (
  values
  ($n$Keza$n$, 8, $g$Grade 3$g$, $s$Kigali Academy$s$, $d$Aspiring Teacher$d$, $l$Kigali, Rwanda$l$, $i$https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80$i$, $st$Keza is passionate about reading and spends every afternoon reading stories to younger children in her neighborhood. Her mother sells produce at a local market, and fluctuating income often made regular school fees uncertain. Support covers her full tuition, books, and daily hot lunch.$st$, 35, 65, true),
  ($n$Samuel$n$, 10, $g$Grade 4$g$, $s$Bugesera Primary School$s$, $d$Aspiring Mechanical Engineer$d$, $l$Bugesera, Rwanda$l$, $i$https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=800&q=80$i$, $st$Samuel has an inventive mind, building miniature wire toy cars and windmills from recycled scraps. With guidance through our program, he received his first complete mathematics and science kit, shoes, and guaranteed daily meals at school.$st$, 35, 40, true),
  ($n$Divine$n$, 7, $g$Grade 2$g$, $s$Rwamagana Community School$s$, $d$Aspiring Doctor$d$, $l$Rwamagana, Rwanda$l$, $i$https://images.unsplash.com/photo-1547496613-4e19af6736dc?auto=format&fit=crop&w=800&q=80$i$, $st$Full of vibrant curiosity, Divine is at the top of her primary class. She is cared for by her elderly grandmother on a subsistence garden. Sponsorship ensures Divine never misses school due to lack of uniforms, shoes, or school supplies.$st$, 35, 50, false),
  ($n$Eric$n$, 11, $g$Grade 5$g$, $s$Musanze Primary School$s$, $d$Aspiring Agronomist$d$, $l$Musanze, Rwanda$l$, $i$https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80$i$, $st$Eric loves nature and dreams of introducing modern sustainable farming techniques to his community. Last year, unpaid registration fees nearly forced him to drop out. Sponsorship keeps his exam fees and classroom resources secured.$st$, 35, 30, true),
  ($n$Aline$n$, 9, $g$Grade 4$g$, $s$Kayonza Primary School$s$, $d$Aspiring Nurse$d$, $l$Kayonza, Rwanda$l$, $i$https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80$i$, $st$Aline is gentle, compassionate, and loves helping in community clean-up days. Her family was displaced after severe seasonal rains. Through this program, her school supplies, tuition, and uniforms are fully provided so her learning stays uninterrupted.$st$, 35, 75, false),
  ($n$Patrick$n$, 12, $g$Grade 6$g$, $s$Kigali Primary School$s$, $d$Aspiring Computer Scientist$d$, $l$Kigali, Rwanda$l$, $i$https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=800&q=80$i$, $st$Patrick is preparing for his national primary leaving exams. He is fascinated by technology and attends our weekly digital literacy weekend workshops. Sponsorship covers his revision workbooks, exam fees, and nutritious lunches.$st$, 35, 85, false)
) as seed(
  name, age, grade, school, dream, location, image, story, monthly_need, funded_percent, urgent
)
where not exists (select 1 from public.children);

insert into public.stories (slug, title, excerpt, date, category, image, body)
select slug, title, excerpt, date, category, image, body
from (
  values
  ($slug$a-meal-that-changed-everything$slug$, $title$A meal that changed everything$title$, $ex$When the Santos family lost their home, a single delivery became the first step back to stability.$ex$, $dt$2026-04-02$dt$::date, $cat$Impact$cat$, $img$https://images.unsplash.com/photo-1595917248955-a96ace4780b6?auto=format&fit=crop&w=1600&q=80$img$, $body$[{"type":"p","text":"When the Santos family lost their home, a single delivery became the first step back to stability. What began as emergency food relief quickly opened the door to longer-term support — and a path forward."},{"type":"p","text":"Kubwabo Foundation arrived within days of the displacement with meal kits, hygiene essentials, and a listening ear. That first visit mattered not only for nutrition, but for dignity: help offered with respect, and with a plan."},{"type":"h2","text":"What support looked like"},{"type":"ul","items":["Weekly food distributions for eight weeks","School supplies so the children could stay enrolled","Referrals to temporary housing partners","Follow-up visits from our community outreach team"]},{"type":"p","text":"Today the family is settled again. Maria says the turning point was not only the food — it was knowing someone would come back. That promise is at the heart of how we work."}]$body$::jsonb),
  ($slug$back-to-school-back-to-hope$slug$, $title$Back to school, back to hope$title$, $ex$450 students received supplies and tutoring support through our education program.$ex$, $dt$2026-03-18$dt$::date, $cat$Education$cat$, $img$https://images.unsplash.com/photo-1547496613-4e19af6736dc?auto=format&fit=crop&w=1600&q=80$img$, $body$[{"type":"p","text":"450 students received supplies and tutoring support through our education program this term — giving families one less barrier between their children and the classroom."},{"type":"p","text":"Across twelve partner schools, Kubwabo Foundation distributed kits and paired learners with volunteer tutors. Teachers report higher attendance in the first month after distribution."},{"type":"h2","text":"This term we delivered"},{"type":"ul","items":["Full supply kits for 450 learners","Weekly tutoring sessions in reading and maths","Parent workshops on supporting homework at home","Scholarship support for 28 secondary students"]},{"type":"p","text":"Education access is not only about materials. It is about showing up consistently so children know school is a place they belong — and that their future is worth investing in."}]$body$::jsonb),
  ($slug$mobile-clinic-reaches-remote-village$slug$, $title$Mobile clinic reaches remote village$title$, $ex$Our health team traveled 6 hours to bring care to a community with no local clinic.$ex$, $dt$2026-02-28$dt$::date, $cat$Health$cat$, $img$https://images.unsplash.com/photo-1773140278162-fd7df1043f0c?auto=format&fit=crop&w=1600&q=80$img$, $body$[{"type":"p","text":"Our health team traveled six hours to bring care to a community with no local clinic. For many residents, it was the first clinical visit they could access without leaving work for days."},{"type":"p","text":"The mobile clinic offered consultations, maternal check-ups, and essential medicines. Community health volunteers helped with translation, triage, and follow-up planning."},{"type":"h2","text":"Clinic outcomes"},{"type":"ul","items":["312 consultations in two days","84 maternal and child health check-ups","Vaccination referrals for 46 children","Training for local health volunteers"]},{"type":"p","text":"We are already planning the next visit. Sustainable care means returning — and building skills that remain after the ambulance leaves."}]$body$::jsonb),
  ($slug$volunteer-spotlight-james$slug$, $title$Volunteer spotlight: James$title$, $ex$From weekend helper to program lead — one volunteer's journey with Kubwabo Foundation.$ex$, $dt$2026-02-10$dt$::date, $cat$Volunteers$cat$, $img$https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1600&q=80$img$, $body$[{"type":"p","text":"From weekend helper to program lead — James's journey with Kubwabo Foundation shows what happens when volunteers are trusted with real responsibility."},{"type":"p","text":"He started packing meal kits on Saturdays. Within a year he was coordinating distribution routes, mentoring new volunteers, and helping shape how we welcome newcomers."},{"type":"h2","text":"What James learned"},{"type":"ul","items":["Consistency matters more than perfection","Listening to community partners comes first","Small logistics choices protect dignity","Leadership can grow from service"]},{"type":"p","text":"Every hour you give helps families build a stronger future. James is proof that those hours can change the giver as much as the community."}]$body$::jsonb),
  ($slug$safe-roofs-before-the-rains$slug$, $title$Safe roofs before the rains$title$, $ex$Twelve families received emergency housing repairs ahead of the rainy season.$ex$, $dt$2026-01-22$dt$::date, $cat$Housing$cat$, $img$https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1600&q=80$img$, $body$[{"type":"p","text":"Twelve families received emergency housing repairs ahead of the rainy season — reinforcing roofs, sealing walls, and making homes safer before the storms arrived."},{"type":"p","text":"Working with local builders, our shelter team prioritized homes with young children and elderly residents. Materials were sourced nearby whenever possible to keep work swift and accountable."},{"type":"h2","text":"Repairs completed"},{"type":"ul","items":["12 roofs reinforced or replaced","Drainage improved around six homes","Safe sleeping spaces restored for 41 people","Skill-sharing with neighbourhood builders"]},{"type":"p","text":"Shelter is foundational. When the rains came, these families stayed dry — and stayed together."}]$body$::jsonb),
  ($slug$community-garden-feeds-a-neighborhood$slug$, $title$Community garden feeds a neighborhood$title$, $ex$Local volunteers and staff transformed an empty lot into a shared food source.$ex$, $dt$2026-01-08$dt$::date, $cat$Food$cat$, $img$https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1600&q=80$img$, $body$[{"type":"p","text":"Local volunteers and staff transformed an empty lot into a shared food source. The garden now supplies weekly produce distributions and teaching plots for nearby schools."},{"type":"p","text":"Neighbours rotate watering schedules. Children learn where food comes from. Families leave with bags of greens — and a stake in something they helped grow."},{"type":"h2","text":"Growing together"},{"type":"ul","items":["1,200 sqm of cultivated land","Weekly harvest shares for 60 households","School garden sessions twice a month","Composting and water-saving practices"]},{"type":"p","text":"Food relief is essential in crisis. Gardens like this are how communities build resilience between crises."}]$body$::jsonb),
  ($slug$scholarships-open-new-doors$slug$, $title$Scholarships open new doors$title$, $ex$Twenty students started the school year with fees covered and books in hand.$ex$, $dt$2025-12-14$dt$::date, $cat$Education$cat$, $img$https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1600&q=80$img$, $body$[{"type":"p","text":"Twenty students started the school year with fees covered and books in hand — removing the financial cliff that too often ends a promising academic journey."},{"type":"p","text":"Scholarships cover tuition, uniforms, and exam fees for a full year, with mentors checking in each term so support stays personal, not transactional."},{"type":"h2","text":"This scholarship cohort"},{"type":"ul","items":["20 secondary learners fully sponsored","Mentorship paired with every award","Family check-ins each school term","Plans to expand by 15 places next year"]},{"type":"p","text":"When fees are sorted, students can focus on learning. That is the door we are trying to keep open."}]$body$::jsonb),
  ($slug$clean-water-for-three-villages$slug$, $title$Clean water for three villages$title$, $ex$New wells and training mean families no longer walk miles for safe drinking water.$ex$, $dt$2025-11-30$dt$::date, $cat$Health$cat$, $img$https://images.unsplash.com/photo-1541544181051-e46607bc22a4?auto=format&fit=crop&w=1600&q=80$img$, $body$[{"type":"p","text":"New wells and community training mean families in three villages no longer walk miles for safe drinking water — freeing hours each day and lowering water-borne illness risk."},{"type":"p","text":"Local committees now manage maintenance schedules and spare parts. Access without ownership does not last; this project was built to stay."},{"type":"h2","text":"Project results"},{"type":"ul","items":["3 new protected wells completed","Water committee training in each village","Hygiene workshops for 180 households","Reduced travel time reported by families"]},{"type":"p","text":"Clean water is health infrastructure. It is also time returned to caregivers, students, and workers."}]$body$::jsonb),
  ($slug$partners-on-the-ground$slug$, $title$Partners on the ground$title$, $ex$A look at how local leaders shape every program we run together.$ex$, $dt$2025-11-12$dt$::date, $cat$Partners$cat$, $img$https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1600&q=80$img$, $body$[{"type":"p","text":"A look at how local leaders shape every program we run together. Kubwabo Foundation does not arrive with a fixed script — we arrive ready to listen."},{"type":"p","text":"From site selection to volunteer schedules, community partners guide decisions. That approach keeps aid practical, trusted, and rooted in what people actually need."},{"type":"h2","text":"How partnership works"},{"type":"ul","items":["Co-designed program priorities each quarter","Transparent budgets shared with local leads","Joint monitoring visits after every major distribution","Feedback loops that change how we operate"]},{"type":"p","text":"Lasting change is built with, not for, local people. Our partners make that principle real every week."}]$body$::jsonb)
) as seed(slug, title, excerpt, date, category, image, body)
where not exists (select 1 from public.stories);
