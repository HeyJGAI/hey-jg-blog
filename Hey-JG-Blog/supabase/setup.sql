-- Hey-JG-Blog — Supabase schema
-- Run this ONCE in your Supabase project's SQL Editor (Dashboard -> SQL Editor -> New query -> paste -> Run).
-- Safe to re-run: uses "if not exists" / "or replace" where possible.

create extension if not exists pgcrypto; -- gives us gen_random_uuid()

-- ============================================================
-- TABLES
-- ============================================================

create table if not exists posts (
    id uuid primary key default gen_random_uuid(),
    title text not null,
    content text not null,
    excerpt text not null,
    tag text,
    image text,
    youtube_url text,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);
create index if not exists idx_posts_created_at on posts (created_at);
create index if not exists idx_posts_tag on posts (tag);

create table if not exists tags (
    id uuid primary key default gen_random_uuid(),
    name text not null unique,
    created_at timestamptz not null default now()
);

create table if not exists about_tabs (
    id uuid primary key default gen_random_uuid(),
    title text not null,
    content text not null,
    info text,
    display_order int not null default 0,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);
create index if not exists idx_about_tabs_order on about_tabs (display_order, created_at);

-- Singleton table: exactly one row, id fixed to 'user-profile'
create table if not exists profile (
    id text primary key default 'user-profile',
    name text,
    profile_picture text,
    bio text,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- Singleton table: exactly one row, id fixed to 'hf-content'
create table if not exists site_settings (
    id text primary key default 'hf-content',
    site_heading text,
    site_title text,
    footer_logo_url text,
    footer_content text,
    linkedin_url text,
    discord_url text,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- ============================================================
-- ROW LEVEL SECURITY
-- Public visitors can read everything (it's a public blog).
-- Only a signed-in Supabase user (your one admin account) can write.
-- ============================================================

alter table posts enable row level security;
alter table tags enable row level security;
alter table about_tabs enable row level security;
alter table profile enable row level security;
alter table site_settings enable row level security;

drop policy if exists "public read posts" on posts;
create policy "public read posts" on posts for select using (true);
drop policy if exists "admin write posts" on posts;
create policy "admin write posts" on posts for all to authenticated using (true) with check (true);

drop policy if exists "public read tags" on tags;
create policy "public read tags" on tags for select using (true);
drop policy if exists "admin write tags" on tags;
create policy "admin write tags" on tags for all to authenticated using (true) with check (true);

drop policy if exists "public read about_tabs" on about_tabs;
create policy "public read about_tabs" on about_tabs for select using (true);
drop policy if exists "admin write about_tabs" on about_tabs;
create policy "admin write about_tabs" on about_tabs for all to authenticated using (true) with check (true);

drop policy if exists "public read profile" on profile;
create policy "public read profile" on profile for select using (true);
drop policy if exists "admin write profile" on profile;
create policy "admin write profile" on profile for all to authenticated using (true) with check (true);

drop policy if exists "public read site_settings" on site_settings;
create policy "public read site_settings" on site_settings for select using (true);
drop policy if exists "admin write site_settings" on site_settings;
create policy "admin write site_settings" on site_settings for all to authenticated using (true) with check (true);

-- ============================================================
-- DEFAULT SEED DATA
-- (matches the fallback defaults that were hardcoded in the old app)
-- ============================================================

insert into site_settings (id, site_heading, site_title, footer_logo_url, footer_content, linkedin_url, discord_url)
values (
    'hf-content',
    'HUMAIN',
    'AI in the Loop, Empathy in the Lead',
    'https://jg-eis.com/logo_white.png',
    'If you''re human or HUMAIN (Human who wants to add AI in daily life for higher productivity), give me a call & say Hey J G. Will find a place to sit and explore AI together. I don''t have all the answers, but I''ve got plenty of questions and a budget for our strong coffee.',
    'https://www.linkedin.com/in/ananth-jg/',
    'https://discord.com'
)
on conflict (id) do nothing;

insert into profile (id, name, profile_picture, bio)
values ('user-profile', 'Ananth J G', 'https://jg-eis.com/heyjg.png', '')
on conflict (id) do nothing;

insert into about_tabs (title, content, info, display_order)
select * from (values
    ('Story',   'My story begins...',        'More about my story...',   1),
    ('Mission', 'My mission is...',          'More about my mission...', 2),
    ('Values',  'I believe in...',           'More about my values...',  3),
    ('Vision',  'I envision...',             'More about my vision...',  4),
    ('Skills',  'My expertise includes...',  'More about my skills...',  5),
    ('Goals',   'My goals are...',           'More about my goals...',   6)
) as seed(title, content, info, display_order)
where not exists (select 1 from about_tabs);

-- ============================================================
-- ADMIN ACCOUNT
-- Do this in the Dashboard, not here: Authentication -> Users -> Add user.
-- Use "Auto Confirm User" so it doesn't try to send a confirmation email.
-- Whatever email you pick, put it in VITE_ADMIN_EMAIL in your Netlify env vars
-- so the login screen knows which account to sign in as.
-- ============================================================
