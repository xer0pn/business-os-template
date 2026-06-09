# Business OS — Next.js SaaS Template

A **production-ready SaaS template** designed to be cloned, customized, and deployed for every new business idea. Built as part of the **Business OS** system — a franchise-model operating system where the boilerplate stays the same and only the unique business idea changes.

## The Business OS Philosophy

Instead of setting up Supabase, Whop, Vercel, Resend, and a landing page from scratch every time you have a business idea — you don't. You press a button. The template is the "kitchen" — the brand, checkout flow, email system, and deployment pipeline are all pre-wired. You just add the unique ingredients (idea, colors, copy).

This repo is the **infrastructure layer** of Business OS. The brains live in the **Hermes skills** (in `skills/`) and the **Claude Code orchestrator** (in `CLAUDE.md`).

---

## Table of Contents

- [Tech Stack & Why](#tech-stack--why)
- [How Business OS Works (Conceptual)](#how-business-os-works-conceptual)
- [Project Structure](#project-structure)
- [The Hermes Skills (AI Layer)](#the-hermes-skills-ai-layer)
- [How AI Agents Interact With This Template](#how-ai-agents-interact-with-this-template)
- [Getting Started (Manual)](#getting-started-manual)
- [Customizing Per Business](#customizing-per-business)
- [Environment Variables](#environment-variables)
- [Database Schema](#database-schema)
- [Auth Flows](#auth-flows)
- [Whop Payments](#whop-payments)
- [Resend Emails](#resend-emails)
- [Deployment](#deployment)
- [CI/CD](#cicd)
- [Webhooks](#webhooks)
- [Scripts Reference](#scripts-reference)
- [Contributing (Shared by Two Hermes Users)](#contributing-shared-by-two-hermes-users)

---

## Tech Stack & Why

| Layer | Technology | Why |
|-------|-----------|-----|
| **Framework** | Next.js 14+ (App Router) | Industry standard, server components, easy Vercel deploy, massive ecosystem |
| **Language** | TypeScript (strict) | Type safety, self-documenting, fewer runtime bugs |
| **Database** | Supabase (PostgreSQL) | Managed Postgres, built-in auth, Row Level Security, real-time subscriptions, Edge Functions |
| **Auth** | Supabase Auth | Email/password, magic link, OAuth — pre-integrated with DB, no separate service |
| **Payments** | Whop | All-in-one payments + community + license keys. No Stripe. Handles subscription lifecycle, checkout, webhooks |
| **Emails** | Resend | Simple API, high deliverability, React Email compatibility, Supabase webhook integration |
| **Styling** | Tailwind CSS v3 | Utility-first, CSS variable-driven theming (swap colors per business without touching components) |
| **Hosting** | Vercel | One-click deploy from GitHub, auto SSL, edge functions, preview deployments |
| **CI/CD** | GitHub Actions | Auto-test on PR, auto-deploy on push to main |
| **Package Manager** | pnpm | Fast, disk-efficient, strict dependency resolution |

### Why Not...

- **Stripe?** → Whop handles payments + community + licensing in one platform. No PCI compliance burden, no separate community tool.
- **Convex?** → Supabase gives you standard SQL, migrations, and RLS — better for auto-generated projects where you want full control over the schema.
- **PlanetScale / Neon?** → Supabase bundles auth + DB + storage + real-time. One dashboard, fewer services.
- **SendGrid / Mailgun?** → Resend has a cleaner API, React Email support, and simpler Supabase webhook integration.

---

## How Business OS Works (Conceptual)

```
You have an idea
       │
       ▼
┌─────────────────────────────────────────────┐
│              HERMES AGENT                   │
│  (runs the skills in skills/)               │
│                                              │
│  1. business-os-core ─── asks you questions  │
│  2. business-os-brand ── picks colors/fonts  │
│  3. business-os-content ─ generates copy     │
│  4. business-os-infra ─── delegates to       │
│         Claude Code CLI                      │
│  5. business-os-launch ── init checklist     │
└─────────────────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────────┐
│            CLAUDE CODE CLI                   │
│  (builds the actual project)                 │
│                                              │
│  ┌─ Clone this template                      │
│  ├─ Inject brand colors + copy               │
│  ├─ Create Supabase project                  │
│  ├─ Create Whop product                      │
│  ├─ Set up Resend templates                  │
│  ├─ Push to GitHub                           │
│  └─ Deploy to Vercel                         │
└─────────────────────────────────────────────┘
       │
       ▼
    ┌──────────┐
    │  LIVE! 🚀 │
    └──────────┘
```

The entire flow takes **minutes** instead of days. You never set up the same thing twice.

---

## Project Structure

```
template/
│
├── app/                                  ← Next.js App Router pages
│   ├── layout.tsx                        ← Root layout (providers, fonts, metadata)
│   ├── page.tsx                          ← Landing page — ALL COPY IS HERE
│   │                                       (edit content objects, not components)
│   ├── globals.css                       ← CSS custom properties for branding
│   │                                       (:root has --color-primary, --font-heading, etc.)
│   └── auth/
│       ├── login/page.tsx                ← Email + password sign-in
│       └── signup/page.tsx               ← Registration with confirmation
│
├── components/
│   ├── landing/                          ← Landing page sections (all text via props)
│   │   ├── hero.tsx                      ← Headline, subheadline, CTA buttons
│   │   ├── features.tsx                  ← Feature cards grid
│   │   ├── pricing.tsx                   ← 3-tier pricing table
│   │   └── faq.tsx                       ← Expandable FAQ accordion
│   ├── ui/                               ← Reusable primitives
│   │   ├── button.tsx                    ← Polymorphic button (primary/outline/ghost)
│   │   └── card.tsx                      ← Surface card with variants
│   └── providers/
│       └── supabase-provider.tsx         ← Client-side Supabase session provider
│
├── lib/                                  ← Service integrations (one module per service)
│   ├── supabase/
│   │   ├── client.ts                     ← Browser client (createClientComponentClient)
│   │   ├── server.ts                     ← Server component / Route Handler client
│   │   ├── admin.ts                      ← Service role client (for webhooks only!)
│   │   └── types.ts                      ← TypeScript types (regenerate after schema changes)
│   ├── whop/
│   │   ├── client.ts                     ← Whop API wrapper (checkout, subscriptions, products)
│   │   └── webhooks.ts                   ← Signature verification + event handlers
│   ├── resend/
│   │   └── client.ts                     ← Email helpers (welcome, purchase confirmation)
│   └── utils.ts                          ← cn() and shared utilities
│
├── supabase/                             ← Database (run these on every new project)
│   ├── schema.sql                        ← Tables, triggers, indexes
│   └── rls-policies.sql                  ← Row Level Security
│
├── skills/                               ← Hermes Agent AI skills (self-contained)
│   ├── business-os/                      ← Master orchestrator skill
│   ├── business-os-core/                 ← Idea capture skill
│   ├── business-os-brand/                ← Brand identity skill
│   ├── business-os-content/              ← Copy generation skill
│   ├── business-os-infra/                ← Claude Code orchestration skill
│   ├── business-os-launch/               ← Launch checklist skill
│   └── business-os-dashboard/            ← Monitoring skill
│
├── .github/workflows/
│   ├── test.yml                          ← Lint + typecheck + build on every PR
│   └── deploy.yml                        ← Build + deploy to Vercel on push to main
│
├── CLAUDE.md                             ← Instruction file for Claude Code (how to customize this template)
├── README.md                             ← This file
├── .env.example                          ← All environment variables documented
├── .gitignore
├── package.json                          ← Dependencies and scripts
├── next.config.ts                        ← Next.js configuration
├── tailwind.config.ts                    ← Tailwind with CSS variable theme
├── tsconfig.json                         ← TypeScript strict mode
├── vercel.json                           ← Vercel deployment config
└── postcss.config.mjs                    ← PostCSS for Tailwind
```

### Key Design Decision: Copy Lives in One Place

Every visible string on the landing page is defined as a content object at the top of `app/page.tsx`:

```ts
const heroContent = {
  badge: "Launching Soon",
  headline: "Your Product Changes Everything",
  subheadline: "The simplest way to...",
  cta: { label: "Get Started", href: "/auth/signup" },
}
```

**You never edit components.** To change copy, edit these objects. This is intentional — it makes AI-powered customization trivial. Claude Code can find and update copy in one place without touching component logic.

---

## The Hermes Skills (AI Layer)

The `skills/` directory contains 7 Hermes Agent skills. These are **markdown files with YAML frontmatter** that tell Hermes how to behave when you talk about launching a business.

### `business-os` (Master)
The entry point. When you say "new business: [idea]", this skill fires and chains all the others in order.

### `business-os-core`
Walks you through: What's the idea? Who's the customer? How do you make money? What's your moat? It outputs a structured `core.md` file per business.

### `business-os-brand`
Collects: Color palette, fonts, tone of voice, visual direction. Outputs `brand.md` and updates the CSS variables in the template.

### `business-os-content`
Generates: Hero copy, features, pricing tiers, FAQ, tweet thread, welcome email, social bios. Presents to you for approval before finalizing.

### `business-os-infra`
Delegates the actual build to **Claude Code CLI** with a structured prompt. Claude clones this template, injects brand colors + copy, creates Supabase + Whop + Resend, pushes to GitHub, and deploys to Vercel.

### `business-os-launch`
Creates and tracks a Phase 0→7 checklist per business. Updates as you check things off.

### `business-os-dashboard`
Shows all businesses in a table: name, phase, status, revenue, users. Good for daily check-ins.

### How to Install the Skills

```bash
# Both you and your friend run these
hermes skills tap add https://github.com/xer0pn/business-template
hermes skills install business-os
hermes skills install business-os-core
hermes skills install business-os-brand
hermes skills install business-os-content
hermes skills install business-os-infra
hermes skills install business-os-launch
hermes skills install business-os-dashboard
```

Then to launch a business:

> "New business: AI-powered coffee subscriptions"

Hermes will step through each skill, ask you questions, generate copy, and hand off to Claude Code for the actual build.

---

## How AI Agents Interact With This Template

This template is designed to be **AI-first**. Every decision was made with AI agents (Claude Code, Hermes) in mind.

### Claude Code (via `CLAUDE.md`)
The `CLAUDE.md` file at the repo root tells Claude Code exactly how to customize this template:
- Where copy lives (`app/page.tsx` content objects)
- Where colors change (`app/globals.css` CSS variables)
- What to create per business (new Supabase project, new Whop product, new Vercel deployment)
- Component conventions (props over hardcoding, CSS variables for color)

When Business OS delegates infrastructure setup, it passes a structured prompt to Claude Code that references `CLAUDE.md` for conventions.

### Hermes Agent (via `skills/`)
Hermes uses the skills to orchestrate the human-interactive parts (asking you questions, generating copy, tracking progress) before handing the mechanical build to Claude Code.

### GitHub Copilot / Cursor / Windsurf
The template uses standard patterns (App Router, Supabase SSR, TypeScript strict) that all AI coding assistants understand well. No exotic frameworks or custom tooling.

---

## Getting Started (Manual)

If you want to use this template without the AI layer:

### 1. Clone and Install

```bash
git clone https://github.com/xer0pn/business-template.git my-new-business
cd my-new-business
pnpm install
```

### 2. Set Environment Variables

```bash
cp .env.example .env.local
```

Fill in each variable (see [Environment Variables](#environment-variables) section).

### 3. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) → New Project
2. Name it after your business
3. Copy the project URL and anon key from Settings → API
4. Paste into `.env.local`
5. Open SQL Editor and run `supabase/schema.sql` then `supabase/rls-policies.sql`

### 4. Create a Whop Product

1. Go to [whop.com](https://whop.com) → Create Product
2. Set up subscription tiers matching your pricing
3. Copy the API key from Developer → API Keys
4. Paste into `.env.local`

### 5. Set Up Resend

1. Go to [resend.com](https://resend.com) → Add API Key
2. Verify a sender domain
3. Copy the API key into `.env.local`

### 6. Run

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Customizing Per Business

Every new business needs these changes:

| What | Where | How |
|------|-------|-----|
| Brand colors | `app/globals.css` | Change `--color-primary`, `--color-secondary`, `--color-accent` |
| Site name | `app/layout.tsx` | Update `<title>` and meta description |
| Copy | `app/page.tsx` | Edit the 5 content objects at the top |
| Pricing | `app/page.tsx` | Edit `pricingContent` tiers, prices, CTA links |
| Logo | `components/ui/` | Create `logo.tsx` and import into layout |
| Supabase credentials | `.env.local` | New project per business |
| Whop product ID | `.env.local` | New product per business |
| App URL | `.env.local` | `https://[business].vercel.app` during dev |

---

## Environment Variables

| Variable | Required | Description | Where to Get It |
|----------|----------|-------------|-----------------|
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ | Your Supabase project URL | Supabase Dashboard → Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ | Supabase anonymous API key | Same place (safe for client) |
| `SUPABASE_SERVICE_ROLE_KEY` | ✅ | Supabase admin key (server-only) | Same place (KEEP SECRET) |
| `WHOP_API_KEY` | ✅ | Whop API authentication | Whop Dashboard → Developer → API Keys |
| `WHOP_WEBHOOK_SECRET` | ✅ | Whop webhook signature secret | Whop Dashboard → Developer → Webhooks |
| `RESEND_API_KEY` | ✅ | Resend API authentication | resend.com → API Keys |
| `RESEND_FROM_EMAIL` | ✅ | Verified sender email | resend.com → Senders |
| `NEXT_PUBLIC_APP_URL` | ✅ | Deployment URL | `http://localhost:3000` locally, production URL in prod |

---

## Database Schema

### Tables

**`users`** — Managed by Supabase Auth. Automatically synced on signup.

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID (PK) | Matches `auth.users.id` |
| `email` | TEXT | User's email |
| `full_name` | TEXT | Display name |
| `avatar_url` | TEXT | Profile photo |
| `created_at` | TIMESTAMPTZ | Signup date |

**`subscriptions`** — Synced from Whop webhooks.

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID (PK) | Auto-generated |
| `user_id` | UUID (FK → users) | Owner |
| `whop_subscription_id` | TEXT | Whop subscription reference |
| `plan` | TEXT | Tier name (e.g. "pro", "enterprise") |
| `status` | TEXT | `active`, `cancelled`, `past_due`, `expired` |
| `current_period_start` | TIMESTAMPTZ | Billing period start |
| `current_period_end` | TIMESTAMPTZ | Billing period end |
| `created_at` | TIMESTAMPTZ | Created |

**`orders`** — Purchase history.

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID (PK) | Auto-generated |
| `user_id` | UUID (FK → users) | Buyer |
| `whop_order_id` | TEXT | Whop order reference |
| `amount` | INTEGER | Amount in cents |
| `status` | TEXT | `completed`, `refunded`, `failed` |
| `created_at` | TIMESTAMPTZ | Order date |

### Row Level Security

- Users can **read** their own profile
- Users can **update** their own profile (name, avatar)
- Users can **read** their own subscriptions
- Users can **read** their own orders
- Admins (service role) can do everything (webhooks)

---

## Auth Flows

| Route | Method | Description |
|-------|--------|-------------|
| `/auth/login` | GET | Display sign-in form |
| `/auth/login` | POST | Authenticate with email + password |
| `/auth/signup` | GET | Display registration form |
| `/auth/signup` | POST | Create account + send confirmation |
| `/auth/callback` | GET | Handle email confirmation redirect |

**Protect a page:**
```ts
// app/dashboard/page.tsx
import { createServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function Dashboard() {
  const supabase = createServerClient()
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) redirect("/auth/login")
  return <div>Welcome, {session.user.email}</div>
}
```

---

## Whop Payments

### Client (`lib/whop/client.ts`)

```ts
import { whopClient } from "@/lib/whop/client"

// Create a checkout session
const checkout = await whopClient.createCheckoutSession({
  productId: "prod_xxx",
  userId: "user_xxx",
  successUrl: "https://example.com/success",
})

// Check subscription status
const sub = await whopClient.getSubscription("sub_xxx")

// Cancel a subscription
await whopClient.cancelSubscription("sub_xxx")
```

### Webhooks (`lib/whop/webhooks.ts`)

When Whop sends events (subscription created, cancelled, updated), the webhook handler:

1. **Verifies the signature** using `WHOP_WEBHOOK_SECRET`
2. **Processes the event**: creates/updates subscription records in your database
3. **Responds** with 200 OK

Implement the route handler at `app/api/webhooks/whop/route.ts` using the helpers in `lib/whop/webhooks.ts`.

---

## Resend Emails

### Client (`lib/resend/client.ts`)

```ts
import { sendWelcomeEmail } from "@/lib/resend/client"

// Send welcome email after signup
await sendWelcomeEmail({
  to: "user@example.com",
  userName: "John",
  businessName: "My SaaS",
})

// Send purchase confirmation
await sendPurchaseConfirmation({
  to: "user@example.com",
  plan: "Pro",
  amount: 29,
})
```

### Supabase + Resend Integration

Trigger emails from database events using **Supabase Database Webhooks**:

1. Go to Supabase Dashboard → Database → Webhooks
2. Create a new webhook on the `users` table (on INSERT)
3. Point it to a serverless function or external endpoint that calls Resend

This is the recommended pattern — no polling, no cron jobs. Emails fire automatically when a user signs up or a subscription is created.

---

## Deployment

### Option 1: Vercel (Recommended)

1. Push to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import the repo
4. Add all env variables from `.env.example`
5. Deploy — done

### Option 2: GitHub Actions (Auto-Deploy)

The `.github/workflows/deploy.yml` workflow deploys automatically on every push to `main`. You need these GitHub secrets:

| Secret | Value |
|--------|-------|
| `VERCEL_TOKEN` | Vercel account token |
| `VERCEL_ORG_ID` | From `.vercel/project.json` |
| `VERCEL_PROJECT_ID` | From `.vercel/project.json` |
| `NEXT_PUBLIC_SUPABASE_URL` | Same as env |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Same as env |
| `NEXT_PUBLIC_APP_URL` | Production URL |

---

## CI/CD

### On Every PR (`test.yml`)
- `pnpm install`
- `pnpm lint` (ESLint)
- `pnpm typecheck` (TypeScript —noEmit)
- `pnpm build` (production build)
- All must pass before merge

### On Push to Main (`deploy.yml`)
- Same checks as PR
- If checks pass → deploy to Vercel
- Vercel assigns a preview URL

---

## Webhooks

### Whop Webhook

Create a route handler at `app/api/webhooks/whop/route.ts`:

```ts
import { verifyWhopWebhook } from "@/lib/whop/webhooks"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get("x-whop-signature")
  
  const event = verifyWhopWebhook(body, signature)
  if (!event) return NextResponse.json({ error: "invalid" }, { status: 401 })
  
  switch (event.type) {
    case "subscription.created":
      // Upsert into subscriptions table
      break
    case "subscription.cancelled":
      // Update status to cancelled
      break
    case "payment.succeeded":
      // Insert into orders table
      break
  }
  
  return NextResponse.json({ received: true })
}
```

---

## Scripts Reference

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start Next.js dev server on `:3000` |
| `pnpm build` | Production build |
| `pnpm start` | Serve production build |
| `pnpm lint` | ESLint check |
| `pnpm typecheck` | TypeScript type check (no emit) |
| `pnpm format` | Format code with Prettier (if configured) |

---

## Contributing (Shared by Two Hermes Users)

This repo is designed to be shared between two people using Hermes Agent:

1. **Fork or clone** the repo
2. Both add the skills:
   ```bash
   hermes skills tap add https://github.com/xer0pn/business-template
   hermes skills install business-os
   ```
3. When you update a skill file, **push to GitHub**
4. Your friend runs `hermes skills update`
5. Skills stay in sync automatically

### Git Workflow

```
# You update a skill
git add skills/business-os-core/SKILL.md
git commit -m "feat: improve core validation questions"
git push

# Friend syncs
git pull
hermes skills update
```

---

## License

MIT — use this for any project, commercial or otherwise. No attribution required.
