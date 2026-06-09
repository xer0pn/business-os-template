---
name: business-os-infra
description: "Orchestrates Claude Code to build all infrastructure for a new business — Supabase, Whop, Vercel, GitHub, Resend."
version: 1.0.0
author: Sami Badrani
tags: [business, infrastructure, devops, claude-code]
---

# Business OS — Infrastructure Skill

Run this after `business-os-content` (and user has approved the content).

Delegates all infrastructure setup to **Claude Code CLI**.

## What Claude Code Does

Delegate to Claude Code with this prompt (fill in the variables):

```
Clone the template repo to a new GitHub repo called [business-name].
Customize it for [business-name] with:
- Brand colors from [brand.md]: primary=[color], secondary=[color], accent=[color]
- Fonts: heading=[font], body=[font]
- Copy from [content.md]: hero text, features, pricing, FAQ, social bios
- Create a new Supabase project at supabase.com/new with project name [business-name]
- Run supabase/schema.sql and rls-policies.sql on the new project
- Update lib/supabase/client.ts, server.ts, admin.ts with the new Supabase credentials
- Create a Whop product page at whop.com for [business-name] with the pricing tiers from [content.md]
- Update lib/whop/client.ts with the Whop API key and product ID
- Set up Resend email templates using lib/resend/client.ts with welcome + purchase confirmation emails
- Create .env.local with all keys
- Push to GitHub: git init, add, commit, push to origin main
- Deploy to Vercel via GitHub integration
- Use a vercel.app subdomain for now (custom domain on launch)
```

## Output

After Claude Code completes, write to: `businesses/[business-name]/infra-references.md`

```markdown
# [Business Name] — Infrastructure References

**GitHub:** https://github.com/samibadrani/[business-name]
**Vercel:** https://[business-name].vercel.app
**Supabase:** https://supabase.com/dashboard/project/[project-id]
**Whop:** https://whop.com/[product-id]

**Status:** [deployed / pending / issues]
```

Then move to `business-os-launch`.
