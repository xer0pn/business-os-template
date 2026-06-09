-- ─────────────────────────────────────────────────────────────────────────────
-- Business OS — Row Level Security policies
-- Run AFTER schema.sql.  Re-runnable (policies are dropped before re-create).
-- ─────────────────────────────────────────────────────────────────────────────

-- ─── Enable RLS on every table ───────────────────────────────────────────────
alter table public.users         enable row level security;
alter table public.subscriptions enable row level security;
alter table public.orders        enable row level security;

-- ─────────────────────────────────────────────────────────────────────────────
-- users
-- ─────────────────────────────────────────────────────────────────────────────

drop policy if exists "users: owner can read own row"   on public.users;
drop policy if exists "users: owner can update own row" on public.users;

-- Users can read their own profile
create policy "users: owner can read own row"
  on public.users for select
  using (auth.uid() = id);

-- Users can update their own profile (but not change id or email)
create policy "users: owner can update own row"
  on public.users for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Service role (backend / webhooks) bypasses RLS by default; no extra policy needed.

-- ─────────────────────────────────────────────────────────────────────────────
-- subscriptions
-- ─────────────────────────────────────────────────────────────────────────────

drop policy if exists "subscriptions: owner can read own rows"   on public.subscriptions;
drop policy if exists "subscriptions: service role can insert"   on public.subscriptions;
drop policy if exists "subscriptions: service role can update"   on public.subscriptions;

-- Users can view their own subscriptions
create policy "subscriptions: owner can read own rows"
  on public.subscriptions for select
  using (auth.uid() = user_id);

-- Only the service role (webhook handler) may insert / update subscriptions.
-- The service role key bypasses RLS, so client-side INSERT/UPDATE is blocked
-- by the absence of a permissive policy.

-- ─────────────────────────────────────────────────────────────────────────────
-- orders
-- ─────────────────────────────────────────────────────────────────────────────

drop policy if exists "orders: owner can read own rows" on public.orders;

-- Users can view their own order history
create policy "orders: owner can read own rows"
  on public.orders for select
  using (auth.uid() = user_id);

-- Only the service role (webhook handler) may insert orders.
