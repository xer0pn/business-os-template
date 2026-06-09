---
name: business-os-content
description: "Generates all copy for a new business — hero, features, pricing, FAQ, social, email."
version: 1.0.0
author: Sami Badrani
tags: [business, content, copywriting, marketing]
---

# Business OS — Content Skill

Run this after `business-os-brand`. Generates all marketing copy for the business.

## Process

Based on the Core and Brand data already collected, generate the following:

### 1. Hero Section
- Headline (6-10 words, benefit-driven)
- Subheadline (supporting sentence)
- CTA button text

### 2. Features (3-6)
Each feature: title + 1-sentence description

### 3. Pricing (3 tiers)
- Tier names
- Price points
- Feature lists per tier
- CTA per tier

### 4. FAQ (5-7 questions)
Question + answer pairs addressing common objections

### 5. Launch Tweet Thread (5 tweets)
First tweet hooks, each subsequent tweet builds, last tweet has CTA

### 6. Welcome Email
Subject line + body for new user onboarding

### 7. Social Bios
- Twitter/X bio (160 chars)
- LinkedIn headline
- Reddit intro (2-3 sentences)

## Output

Write to: `businesses/[business-name]/content.md`

Present the copy to the **user for approval** before finalizing. Let them edit anything.

Once approved, move to `business-os-infra`.
