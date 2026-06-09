---
name: business-os
description: "Master orchestrator for Business OS — chains all sub-skills to launch a business from idea to deployed product."
version: 1.0.0
author: Sami Badrani
tags: [business, orchestrator, startup]
---

# Business OS — Master Orchestrator

When the user says "new business: [idea]" or "launch a business called [name]" — run this skill.

## Sequence

Chain the sub-skills in this exact order:

### Step 1: `business-os-core`
Ask the user about their idea → fill core.md
Load: `/skill business-os-core`

### Step 2: `business-os-brand`
Ask about colors, fonts, tone → fill brand.md
Load: `/skill business-os-brand`

### Step 3: `business-os-content`
Generate all copy → present for user approval → fill content.md
Load: `/skill business-os-content`

### Step 4: `business-os-infra`
Delegate to Claude Code to build everything
Load: `/skill business-os-infra`

### Step 5: `business-os-launch`
Initialize the launch checklist
Load: `/skill business-os-launch`

### Step 6: Update `_index.md`
Add this business to the registry with current phase.

## Sharing

Both users tap the same repo:
```bash
hermes skills tap add https://github.com/[your-user]/business-template
hermes skills install business-os
hermes skills install business-os-core
hermes skills install business-os-brand
hermes skills install business-os-content
hermes skills install business-os-infra
hermes skills install business-os-launch
hermes skills install business-os-dashboard
```

Then to launch a business:
> "New business: [idea]"
