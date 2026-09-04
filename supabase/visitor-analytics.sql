-- Advocat in Türkiye: izinli ve anonim ziyaret analitiği
-- Supabase Dashboard > SQL Editor alanında tek parça hâlinde çalıştırın.

create table if not exists public.site_visits (
  session_id uuid primary key,
  visitor_id uuid not null,
  entry_path text not null default '/',
  last_path text not null default '/',
  started_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now(),
  ended_at timestamptz,
  page_views integer not null default 1 check (page_views between 1 and 10000),
  duration_seconds integer not null default 0 check (duration_seconds between 0 and 86400),
  language text not null default 'tr' check (language in ('tr', 'ru', 'en', 'ro')),
  device_type text not null default 'desktop' check (device_type in ('desktop', 'tablet', 'mobile')),
  browser text not null default 'Diğer',
  referrer_host text,
  country_code text,
  city text,
  consent_version text not null default '2026-09',
  created_at timestamptz not null default now(),
  constraint site_visits_paths_check check (
    left(entry_path, 1) = '/' and left(entry_path, 2) <> '//' and
    left(last_path, 1) = '/' and left(last_path, 2) <> '//'
  )
);

create index if not exists site_visits_started_at_idx on public.site_visits (started_at desc);
create index if not exists site_visits_visitor_id_idx on public.site_visits (visitor_id);
create index if not exists site_visits_last_seen_at_idx on public.site_visits (last_seen_at desc);

alter table public.site_visits enable row level security;

revoke all on table public.site_visits from anon, authenticated;
grant select on table public.site_visits to authenticated;
grant all on table public.site_visits to service_role;

drop policy if exists "Admins can read visitor analytics" on public.site_visits;
create policy "Admins can read visitor analytics"
on public.site_visits
for select
to authenticated
using (
  (select auth.uid()) is not null
  and exists (
    select 1
    from public.admin_users
    where public.admin_users.user_id = (select auth.uid())
  )
);

-- Yeni bir ziyaret geldiğinde 180 günden eski kayıtları otomatik temizler.
create schema if not exists private;

create or replace function private.cleanup_old_site_visits()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  delete from public.site_visits
  where started_at < now() - interval '180 days';
  return new;
end;
$$;

revoke all on function private.cleanup_old_site_visits() from public;

drop trigger if exists cleanup_old_site_visits_after_insert on public.site_visits;
create trigger cleanup_old_site_visits_after_insert
after insert on public.site_visits
for each statement
execute function private.cleanup_old_site_visits();

comment on table public.site_visits is
'Analitik izni veren ziyaretçilerin anonim oturum kayıtları. Ham IP, ad ve e-posta tutulmaz.';
