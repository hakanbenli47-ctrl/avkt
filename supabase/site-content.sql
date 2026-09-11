create table if not exists public.site_content (
  content_key text primary key,
  section text not null,
  label text not null,
  source_text text not null unique,
  tr text not null,
  ru text not null,
  en text not null,
  ro text not null,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id) on delete set null
);

create index if not exists site_content_section_idx on public.site_content (section, label);
alter table public.site_content enable row level security;
drop policy if exists "Site content is public" on public.site_content;
drop policy if exists "Administrators can create site content" on public.site_content;
drop policy if exists "Administrators can update site content" on public.site_content;
drop policy if exists "Administrators can delete site content" on public.site_content;
create policy "Site content is public" on public.site_content for select to anon, authenticated using (true);
create policy "Administrators can create site content" on public.site_content for insert to authenticated with check (exists (select 1 from public.admin_users where user_id = (select auth.uid())));
create policy "Administrators can update site content" on public.site_content for update to authenticated using (exists (select 1 from public.admin_users where user_id = (select auth.uid()))) with check (exists (select 1 from public.admin_users where user_id = (select auth.uid())));
create policy "Administrators can delete site content" on public.site_content for delete to authenticated using (exists (select 1 from public.admin_users where user_id = (select auth.uid())));
grant select on public.site_content to anon;
grant select, insert, update, delete on public.site_content to authenticated;