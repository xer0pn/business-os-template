# Business OS — Customisation Guide for Claude

This file tells Claude how to help you adapt this template for your specific business. Read it before making changes.

---

## What this template is

A Next.js 14 SaaS starter with Supabase auth, Whop payments, Resend email, and a fully-designed landing page. All page copy is co-located in `app/page.tsx` — the components are copy-free and driven entirely by props.

---

## Where copy lives

**Never edit copy inside components.** Every string visible to users is defined at the top of `app/page.tsx` in plain objects:

```ts
const heroContent    = { ... }
const featuresContent = { ... }
const pricingContent  = { ... }
const faqContent      = { ... }
```

To change any text, edit those objects. The components stay untouched.

---

## Customisation checklist

Work through these in order when spinning up a new business:

### 1. Branding

- `app/globals.css` `:root` block — change `--color-primary`, `--color-secondary`, `--color-accent`
- Replace "Business OS" in `app/layout.tsx` (title, description meta) and the auth pages
- Add a real logo component in `components/ui/logo.tsx` and import it where the text "Business OS" appears

### 2. Copy

All in `app/page.tsx`:
- `heroContent` — headline, subheadline, badge, CTA buttons
- `featuresContent` — section heading and the 6 feature cards (icons come from `lucide-react`)
- `pricingContent` — tier names, prices, feature lists, CTA hrefs (wire CTAs to your Whop checkout links)
- `faqContent` — question/answer pairs

### 3. Pricing links

In `pricingContent`, update each tier's `cta.href` to your actual Whop checkout URL:
```ts
cta: { label: "Get started", href: "https://whop.com/checkout/..." }
```

### 4. Database

The schema in `supabase/schema.sql` models `users`, `subscriptions`, and `orders`. If your product needs additional tables:
- Add them to `schema.sql`
- Add matching RLS policies to `rls-policies.sql`
- Update `lib/supabase/types.ts` (or regenerate with `npx supabase gen types typescript`)

### 5. Webhooks

Implement `app/api/webhooks/whop/route.ts`. The signature verification helper is at `lib/whop/webhooks.ts`. Handle at minimum:
- `subscription.created` → upsert into `public.subscriptions`
- `subscription.updated` → update status
- `payment.succeeded` → insert into `public.orders`

### 6. Email

Transactional helpers live in `lib/resend/client.ts`. Add functions for welcome emails, payment receipts, etc. and call them from your webhook handler.

### 7. Dashboard

The template does not include a post-login dashboard — that's intentional, as it varies too much per business. After users sign in at `/auth/login` they are redirected to `/dashboard`. Create `app/dashboard/page.tsx` as a Server Component that checks the session and shows user-specific data.

---

## File map (things you'll touch most)

| File | Purpose |
|---|---|
| `app/page.tsx` | All landing page copy |
| `app/globals.css` | Design tokens (colours, fonts, radius) |
| `app/layout.tsx` | `<head>` metadata, providers |
| `app/auth/login/page.tsx` | Sign-in form |
| `app/auth/signup/page.tsx` | Registration form |
| `lib/supabase/types.ts` | TypeScript types — regenerate after schema changes |
| `supabase/schema.sql` | Database schema |
| `supabase/rls-policies.sql` | Row Level Security |
| `.env.example` | Required environment variables |

---

## Component conventions

- **Props over internals** — all user-visible text comes in as props, never hardcoded
- **`cn()` for conditional classes** — import from `@/lib/utils`
- **CSS variables for colour** — use `var(--color-primary)` etc., never raw hex values in components
- **No comments** unless the WHY is non-obvious; names should be self-documenting

---

## Adding a new landing section

1. Create `components/landing/your-section.tsx` — accept all text as props, no hardcoded strings
2. Define the content object in `app/page.tsx`
3. Render `<YourSection {...yourContent} />` in the page's `<main>`

---

## Deploying

See `README.md` → Deployment. The short version:
1. Push to GitHub
2. Import to Vercel, add env vars
3. Add `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` as GitHub secrets
4. Every push to `main` auto-deploys via `.github/workflows/deploy.yml`
