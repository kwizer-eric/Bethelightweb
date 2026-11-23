-- Run this once in the Supabase SQL Editor:
-- https://supabase.com/dashboard/project/pybipnjrunilojzsinba/sql/new
-- Fixes: Could not find the table 'public.newsletter_subscribers' in the schema cache

create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  created_at timestamptz not null default now(),
  constraint newsletter_subscribers_email_unique unique (email)
);

alter table public.newsletter_subscribers enable row level security;

grant select, delete on public.newsletter_subscribers to authenticated;
grant insert on public.newsletter_subscribers to anon, authenticated;

drop policy if exists newsletter_subscribers_select on public.newsletter_subscribers;
drop policy if exists newsletter_subscribers_insert on public.newsletter_subscribers;
drop policy if exists newsletter_subscribers_delete on public.newsletter_subscribers;

create policy newsletter_subscribers_select on public.newsletter_subscribers
  for select to authenticated
  using (auth.role() = 'authenticated');
create policy newsletter_subscribers_insert on public.newsletter_subscribers
  for insert to anon, authenticated
  with check (true);
create policy newsletter_subscribers_delete on public.newsletter_subscribers
  for delete to authenticated
  using (auth.role() = 'authenticated');

notify pgrst, 'reload schema';
