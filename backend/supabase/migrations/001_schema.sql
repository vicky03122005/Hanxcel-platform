-- ============================================================================
-- Hanxcel AI Technologies — database schema
-- Run this FIRST in the Supabase SQL Editor, then seed/001_seed.sql
--
-- Safe to re-run: every object is created IF NOT EXISTS / OR REPLACE, and
-- policies are dropped before being recreated.
-- ============================================================================

create extension if not exists "uuid-ossp";

-- ============================================================================
-- 1. HELPER FUNCTIONS
-- ============================================================================
--
-- NOTE: is_admin() is NOT defined here. It reads public.admin_profiles, and a
-- LANGUAGE SQL body is parsed and validated at CREATE FUNCTION time — so
-- defining it before that table exists aborts the whole migration. It is
-- created in section 4a, after admin_profiles and before the RLS policies that
-- call it. (set_updated_at() is LANGUAGE plpgsql, whose body is only checked at
-- run time, so it is safe to define up front.)

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ============================================================================
-- 2. CONTENT TABLES
-- ============================================================================

-- ---------------------------------------------------------------- hero (1 row)
create table if not exists public.hero (
  id            uuid primary key default uuid_generate_v4(),
  heading_line1 text not null default 'WE ENGINEER',
  heading_line2 text not null default 'INTELLIGENCE',
  subtext       text not null default '',
  cta_label     text not null default 'Start Project',
  portrait_url  text,
  updated_at    timestamptz not null default now()
);

-- --------------------------------------------------------------- about (1 row)
create table if not exists public.about (
  id         uuid primary key default uuid_generate_v4(),
  tagline    text not null,
  body_text  text not null,
  cta_label  text not null default 'EXPLORE MORE',
  updated_at timestamptz not null default now()
);

-- ------------------------------------------------------------------- services
-- icon enum matches ServiceDetailData['icon'] in src/components/ServiceDetailModal.tsx
create table if not exists public.services (
  id                    uuid primary key default uuid_generate_v4(),
  number                char(2) unique not null,
  name                  text not null,
  description           text not null,
  tagline               text not null,
  full_overview         text not null,
  icon                  text not null
                        check (icon in ('software','web','mobile','ai','cloud','uiux')),
  deliverables          text[] not null default '{}',
  tech_stack            text[] not null default '{}',
  industry_applications text[] not null default '{}',
  sort_order            int not null default 0,
  is_visible            boolean not null default true,
  updated_at            timestamptz not null default now()
);

create table if not exists public.service_disciplines (
  id         uuid primary key default uuid_generate_v4(),
  service_id uuid not null references public.services(id) on delete cascade,
  title      text not null,
  "desc"     text not null,
  sort_order int not null default 0
);
create index if not exists service_disciplines_service_id_idx
  on public.service_disciplines(service_id);

-- ------------------------------------------------------------------ solutions
-- `slug` keys SolutionsSection -> SolutionDetailModal (SolutionCard.id).
-- `icon` is a LUCIDE COMPONENT NAME because SolutionsSection renders it live.
create table if not exists public.solutions (
  id          uuid primary key default uuid_generate_v4(),
  slug        text unique not null,
  tag         text not null,
  title       text not null,
  description text not null,
  highlights  text[] not null default '{}',
  icon        text not null
              check (icon in ('Smartphone','Zap','Shield','Radio','Activity','Cog','Sparkles','Layers')),
  sort_order  int not null default 0,
  is_visible  boolean not null default true,
  updated_at  timestamptz not null default now()
);

-- Mirrors SolutionDetailData. NOTE: this `icon` is a DIFFERENT enum from
-- solutions.icon above — the modal uses its own semantic set.
create table if not exists public.solution_details (
  id                 uuid primary key default uuid_generate_v4(),
  solution_id        uuid unique not null references public.solutions(id) on delete cascade,
  tagline            text not null,
  description        text not null default '',
  full_overview      text not null,
  icon               text not null
                     check (icon in ('consumer','energy','defense','iot','medical','industrial')),
  key_capabilities   text[] not null default '{}',
  certifications     text[] not null default '{}',
  case_study_title   text not null default '',
  case_study_impact  text not null default '',
  updated_at         timestamptz not null default now()
);

create table if not exists public.solution_architecture_points (
  id          uuid primary key default uuid_generate_v4(),
  solution_id uuid not null references public.solutions(id) on delete cascade,
  title       text not null,
  "desc"      text not null,
  sort_order  int not null default 0
);
create index if not exists solution_arch_points_solution_id_idx
  on public.solution_architecture_points(solution_id);

-- ------------------------------------------------------------------- projects
create table if not exists public.projects (
  id                uuid primary key default uuid_generate_v4(),
  slug              text unique not null,
  number            char(2) unique not null,
  name              text not null,
  button_text       text not null default 'VIEW CASE STUDY',
  category          text not null,
  title             text not null,
  client            text not null,
  timeline          text not null,
  tagline           text not null,
  overview          text not null,
  hero_image        text not null,
  gallery_images    text[] not null default '{}',
  col1_top_title    text,
  col1_top_subtitle text,
  col1_bottom_text  text,
  challenge         text not null,
  solution          text not null,
  tools_and_tech    text[] not null default '{}',
  link              text default '#',
  sort_order        int not null default 0,
  is_visible        boolean not null default true,
  updated_at        timestamptz not null default now()
);

create table if not exists public.project_architecture_points (
  id         uuid primary key default uuid_generate_v4(),
  project_id uuid not null references public.projects(id) on delete cascade,
  title      text not null,
  "desc"     text not null,
  sort_order int not null default 0
);
create index if not exists project_arch_points_project_id_idx
  on public.project_architecture_points(project_id);

create table if not exists public.project_technical_specs (
  id         uuid primary key default uuid_generate_v4(),
  project_id uuid not null references public.projects(id) on delete cascade,
  label      text not null,
  value      text not null,
  sort_order int not null default 0
);
create index if not exists project_tech_specs_project_id_idx
  on public.project_technical_specs(project_id);

create table if not exists public.project_key_metrics (
  id         uuid primary key default uuid_generate_v4(),
  project_id uuid not null references public.projects(id) on delete cascade,
  metric     text not null,
  label      text not null,
  sort_order int not null default 0
);
create index if not exists project_key_metrics_project_id_idx
  on public.project_key_metrics(project_id);

-- ------------------------------------------------------------------ portfolio
create table if not exists public.portfolio (
  id             uuid primary key default uuid_generate_v4(),
  slug           text unique not null,
  year           char(4) not null,
  category       text not null,
  title          text not null,
  client         text not null,
  timeline       text not null,
  tagline        text not null,
  overview       text not null,
  icon           text not null check (icon in ('iot','wearable','energy','ai')),
  scope          text[] not null default '{}',
  description    text not null,
  metric         text not null,
  metric_label   text not null,
  challenge      text not null,
  solution       text not null,
  tools_and_tech text[] not null default '{}',
  deliverables   text[] not null default '{}',
  link           text default '#',
  sort_order     int not null default 0,
  is_visible     boolean not null default true,
  updated_at     timestamptz not null default now()
);

create table if not exists public.portfolio_architecture_points (
  id           uuid primary key default uuid_generate_v4(),
  portfolio_id uuid not null references public.portfolio(id) on delete cascade,
  title        text not null,
  "desc"       text not null,
  sort_order   int not null default 0
);
create index if not exists portfolio_arch_points_portfolio_id_idx
  on public.portfolio_architecture_points(portfolio_id);

create table if not exists public.portfolio_technical_specs (
  id           uuid primary key default uuid_generate_v4(),
  portfolio_id uuid not null references public.portfolio(id) on delete cascade,
  label        text not null,
  value        text not null,
  sort_order   int not null default 0
);
create index if not exists portfolio_tech_specs_portfolio_id_idx
  on public.portfolio_technical_specs(portfolio_id);

create table if not exists public.portfolio_key_metrics (
  id           uuid primary key default uuid_generate_v4(),
  portfolio_id uuid not null references public.portfolio(id) on delete cascade,
  metric       text not null,
  label        text not null,
  sort_order   int not null default 0
);
create index if not exists portfolio_key_metrics_portfolio_id_idx
  on public.portfolio_key_metrics(portfolio_id);

-- ---------------------------------------------------------------- team_members
create table if not exists public.team_members (
  id          uuid primary key default uuid_generate_v4(),
  slug        text unique not null,
  name        text not null,
  role        text not null,
  bio         text not null,
  specialties text[] not null default '{}',
  image_url   text not null,
  linkedin    text,
  email       text,
  github      text,
  sort_order  int not null default 0,
  is_visible  boolean not null default true,
  updated_at  timestamptz not null default now()
);

-- --------------------------------------------------------------- testimonials
create table if not exists public.testimonials (
  id         uuid primary key default uuid_generate_v4(),
  slug       text unique not null,
  name       text not null,
  role       text not null,
  company    text not null,
  badge      text not null,
  quote      text not null,
  rating     int not null default 5 check (rating between 1 and 5),
  avatar_url text not null,
  sort_order int not null default 0,
  is_visible boolean not null default true,
  updated_at timestamptz not null default now()
);

-- ------------------------------------------------------------------------ faq
-- `slug` preserves the frontend's accordion ids ('faq-1'..'faq-6'); FaqSection
-- defaults the open item to the literal string 'faq-1'.
create table if not exists public.faq (
  id         uuid primary key default uuid_generate_v4(),
  slug       text unique not null,
  question   text not null,
  answer     text not null,
  sort_order int not null default 0,
  is_visible boolean not null default true,
  updated_at timestamptz not null default now()
);

-- ----------------------------------------------------------------- blog_posts
create table if not exists public.blog_posts (
  id            uuid primary key default uuid_generate_v4(),
  slug          text unique not null,
  title         text not null,
  excerpt       text not null,
  category      text not null
                check (category in ('HARDWARE & PCB','EMBEDDED & IOT','MANUFACTURING','EDGE AI')),
  read_time     text not null,
  published_at  date not null,
  image_url     text not null,
  author_name   text not null,
  author_role   text not null,
  author_avatar text not null,
  introduction  text not null,
  key_points    text[] not null default '{}',
  deep_dive     text not null,
  conclusion    text not null,
  is_visible    boolean not null default true,
  sort_order    int not null default 0,
  updated_at    timestamptz not null default now()
);

-- ============================================================================
-- 3. ENQUIRY TABLES
-- ============================================================================

-- Three sources: ContactSection, ContactModal and FaqConsultationModal.
-- Each form populates a different subset of columns.
create table if not exists public.contact_submissions (
  id           uuid primary key default uuid_generate_v4(),
  first_name   text,
  last_name    text,
  name         text,
  email        text not null,
  company      text,
  phone        text,
  service      text,
  project_type text,
  budget       text,
  topic        text,
  timeline     text,
  message      text not null,
  source       text not null default 'contact_section'
               check (source in ('contact_section','contact_modal','faq_consultation')),
  status       text not null default 'new'
               check (status in ('new','read','replied','archived')),
  submitted_at timestamptz not null default now()
);
create index if not exists contact_submissions_status_idx
  on public.contact_submissions(status, submitted_at desc);

create table if not exists public.newsletter_subscribers (
  id            uuid primary key default uuid_generate_v4(),
  email         text unique not null,
  subscribed_at timestamptz not null default now(),
  is_active     boolean not null default true
);

-- ============================================================================
-- 4. CONFIGURATION / ADMIN TABLES
-- ============================================================================

create table if not exists public.site_settings (
  id         uuid primary key default uuid_generate_v4(),
  key        text unique not null,
  value      text,
  updated_at timestamptz not null default now()
);

create table if not exists public.admin_profiles (
  id         uuid primary key references auth.users(id) on delete cascade,
  full_name  text not null,
  role       text not null default 'editor' check (role in ('super_admin','editor')),
  created_at timestamptz not null default now()
);

create table if not exists public.audit_log (
  id         uuid primary key default uuid_generate_v4(),
  admin_id   uuid references public.admin_profiles(id) on delete set null,
  table_name text not null,
  record_id  uuid,
  action     text not null check (action in ('insert','update','delete')),
  old_data   jsonb,
  new_data   jsonb,
  created_at timestamptz not null default now()
);
create index if not exists audit_log_created_at_idx on public.audit_log(created_at desc);

-- ============================================================================
-- 4a. is_admin() — defined here because it reads admin_profiles (above) and is
--     called by the RLS policies (below).
-- ============================================================================

-- True when the calling JWT belongs to a row in admin_profiles.
-- SECURITY DEFINER so it can read admin_profiles regardless of the caller's RLS.
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (select 1 from public.admin_profiles where id = auth.uid())
$$;

-- ============================================================================
-- 5. updated_at TRIGGERS
-- ============================================================================

do $$
declare
  t text;
begin
  foreach t in array array[
    'hero','about','services','solutions','solution_details','projects',
    'portfolio','team_members','testimonials','faq','blog_posts','site_settings'
  ] loop
    execute format('drop trigger if exists set_%1$s_updated_at on public.%1$I', t);
    execute format(
      'create trigger set_%1$s_updated_at before update on public.%1$I
         for each row execute function public.set_updated_at()', t);
  end loop;
end $$;

-- ============================================================================
-- 6. ROW LEVEL SECURITY
-- ============================================================================

do $$
declare
  t text;
begin
  foreach t in array array[
    'hero','about','services','service_disciplines','solutions','solution_details',
    'solution_architecture_points','projects','project_architecture_points',
    'project_technical_specs','project_key_metrics','portfolio',
    'portfolio_architecture_points','portfolio_technical_specs','portfolio_key_metrics',
    'team_members','testimonials','faq','blog_posts','site_settings',
    'contact_submissions','newsletter_subscribers','admin_profiles','audit_log'
  ] loop
    execute format('alter table public.%I enable row level security', t);
  end loop;
end $$;

-- ------------------------------------------------- content: public read, admin write
do $$
declare
  t text;
begin
  foreach t in array array[
    'hero','about','services','service_disciplines','solutions','solution_details',
    'solution_architecture_points','projects','project_architecture_points',
    'project_technical_specs','project_key_metrics','portfolio',
    'portfolio_architecture_points','portfolio_technical_specs','portfolio_key_metrics',
    'team_members','testimonials','faq','blog_posts','site_settings'
  ] loop
    execute format('drop policy if exists %1$s_public_read on public.%1$I', t);
    execute format('drop policy if exists %1$s_admin_write on public.%1$I', t);

    execute format(
      'create policy %1$s_public_read on public.%1$I
         for select to anon, authenticated using (true)', t);

    execute format(
      'create policy %1$s_admin_write on public.%1$I
         for all to authenticated
         using (public.is_admin()) with check (public.is_admin())', t);
  end loop;
end $$;

-- ------------------------------------------------------------ contact_submissions
drop policy if exists contact_anon_insert on public.contact_submissions;
drop policy if exists contact_admin_read  on public.contact_submissions;
drop policy if exists contact_admin_write on public.contact_submissions;

create policy contact_anon_insert on public.contact_submissions
  for insert to anon, authenticated with check (true);
create policy contact_admin_read on public.contact_submissions
  for select to authenticated using (public.is_admin());
create policy contact_admin_write on public.contact_submissions
  for update to authenticated using (public.is_admin()) with check (public.is_admin());

-- --------------------------------------------------------- newsletter_subscribers
drop policy if exists newsletter_anon_insert on public.newsletter_subscribers;
drop policy if exists newsletter_admin_read  on public.newsletter_subscribers;
drop policy if exists newsletter_admin_write on public.newsletter_subscribers;

create policy newsletter_anon_insert on public.newsletter_subscribers
  for insert to anon, authenticated with check (true);
create policy newsletter_admin_read on public.newsletter_subscribers
  for select to authenticated using (public.is_admin());
create policy newsletter_admin_write on public.newsletter_subscribers
  for update to authenticated using (public.is_admin()) with check (public.is_admin());

-- ------------------------------------------------------------------ admin_profiles
drop policy if exists admin_profiles_self_read on public.admin_profiles;
create policy admin_profiles_self_read on public.admin_profiles
  for select to authenticated using (id = auth.uid());

-- ----------------------------------------------------------------------- audit_log
drop policy if exists audit_admin_read   on public.audit_log;
drop policy if exists audit_admin_insert on public.audit_log;

create policy audit_admin_read on public.audit_log
  for select to authenticated using (public.is_admin());
create policy audit_admin_insert on public.audit_log
  for insert to authenticated with check (public.is_admin());

-- ============================================================================
-- 7. ROLE GRANTS
-- ============================================================================
--
-- Table-level privileges are a SEPARATE gate from RLS: a role needs both. Do
-- not rely on Supabase's default privileges to cover tables created by a
-- migration — when they do not apply, service_role gets "42501 permission
-- denied for table ..." on every query, and admin login fails at the
-- admin_profiles lookup with a misleading "This account is not an admin."
--
-- Granting broadly here is the standard Supabase model: RLS (enabled on every
-- table in section 6) is what actually restricts anon and authenticated.
-- service_role intentionally bypasses RLS and is used only by the backend.

grant usage on schema public to anon, authenticated, service_role;

grant all on all tables    in schema public to anon, authenticated, service_role;
grant all on all sequences in schema public to anon, authenticated, service_role;
grant all on all functions in schema public to anon, authenticated, service_role;

-- Cover tables added by any later migration too.
alter default privileges in schema public
  grant all on tables to anon, authenticated, service_role;
alter default privileges in schema public
  grant all on sequences to anon, authenticated, service_role;
