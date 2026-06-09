---
name: business-os-dashboard
description: "Monitors all active businesses — health, revenue, users, launch progress."
version: 1.0.0
author: Sami Badrani
tags: [business, monitoring, dashboard]
---

# Business OS — Dashboard Skill

Shows a unified view of all businesses in the system.

## When To Run

- When the user asks "show me all my businesses" or "how is everything looking"
- On a cron schedule (e.g. daily summary)

## Dashboard Data

For each active business, report:

| Metric | Source |
|--------|--------|
| Business Name | Obsidian registry |
| Current Phase | Launch checklist |
| Site Status | Vercel URL (is it up?) |
| Revenue | Whop API |
| Users/Customers | Supabase query |
| Last Updated | When infra was last modified |

## Output

Display as a table:

```
┌──────────────┬────────┬────────┬──────────┬───────┐
│ Business     │ Phase  │ Status │ Revenue  │ Users │
├──────────────┼────────┼────────┼──────────┼───────┤
│ Coffee AI    │ P3     │ ✅ Live│ $0       │ 0     │
│ Premium Tea  │ P1     │ 🏗️ Dev │ —        │ —     │
└──────────────┴────────┴────────┴──────────┴───────┘
```

For each business with issues, highlight in red with actionable items.
