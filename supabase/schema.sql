-- ─────────────────────────────────────────────────────────────────────────────
-- Business OS — Supabase schema
-- Run this against a fresh project: supabase db push  OR  paste in the SQL editor
-- ─────────────────────────────────────────────────────────────────────────────

-- Enable UUID generation
create extension if not exists "pgcrypto";

-- ─── users ───────────────────────────────────────────────────────────────────
-- Mirrors auth.users; updated automatically via trigger below.
create table if not exists public.users (
  id            uuid        primary key references auth.users(id) on delete cascade,
  email         text        not null unique,
  full_name     text,
  avatar_url    text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

comment on table public.users is 'Public profile data mirrored from auth.users.';

-- Keep updated_at fresh on every row update
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace trigger users_set_updated_at
  before update on public.users
  for each row execute function public.set_updated_at();

-- Auto-insert a row here whenever a new auth user signs up
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.users (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ─── subscriptions ────────────────────────────────────────────────────────────
create type public.subscription_status as enum (
  'active',
  'cancelled',
  'expired',
  'paused'
);

create table if not exists public.subscriptions (
  id                      uuid                        primary key default gen_random_uuid(),
  user_id                 uuid                        not null references public.users(id) on delete cascade,
  whop_subscription_id    text                        not null unique,
  status                  public.subscription_status  not null default 'active',
  plan_id                 text                        not null,
  current_period_start    timestamptz,
  current_period_end      timestamptz,
  created_at              timestamptz                 not null default now(),
  updated_at              timestamptz                 not null default now()
);

comment on table public.subscriptions is 'Whop subscription records synced via webhook.';

create index if not exists subscriptions_user_id_idx on public.subscriptions(user_id);
create index if not exists subscriptions_status_idx  on public.subscriptions(status);

create or replace trigger subscriptions_set_updated_at
  before update on public.subscriptions
  for each row execute function public.set_updated_at();

-- ─── orders ──────────────────────────────────────────────────────────────────
create table if not exists public.orders (
  id              uuid        primary key default gen_random_uuid(),
  user_id         uuid        not null references public.users(id) on delete cascade,
  whop_order_id   text        not null unique,
  amount          integer     not null,  -- stored in cents
  currency        text        not null default 'usd',
  status          text        not null,  -- e.g. "completed", "refunded"
  created_at      timestamptz not null default now()
);

comment on table public.orders is 'One-time purchase records synced via Whop webhook.';

create index if not exists orders_user_id_idx on public.orders(user_id);
