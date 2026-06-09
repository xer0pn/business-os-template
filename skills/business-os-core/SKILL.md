---
name: business-os-core
description: "Takes a business idea and walks through the Core template — idea, customer, angle, monetization, validation, moat."
version: 1.0.0
author: Sami Badrani
tags: [business, startup, idea-validation]
---

# Business OS — Core Skill

When the user says "new business: [idea]" or asks to validate a business idea, run this skill.

## Process

Ask the user these questions one at a time:

### 1. The Idea
What's the one-line description of the business?

### 2. The Customer
Who is the target customer? Be specific (demographics, psychographics, B2B/B2C).

### 3. The Angle
What's the unique value proposition? Why would someone choose this over alternatives?

### 4. Monetization
How does it make money? (subscription, one-time, marketplace, ads, affiliate, etc.)
What are the pricing tiers?

### 5. Validation
How do you know there's demand? (competitors, surveys, pre-orders, waitlist, existing traffic)

### 6. Moat
What makes this defensible? (brand, network effects, data, tech, distribution, etc.)

## Output

After collecting all answers, write to:
`businesses/[business-name]/core.md`

```markdown
# [Business Name] — Core

**Idea:** [one-line]

**Customer:** [target audience]

**Angle/UVF:** [unique value proposition]

**Monetization:**
- Model: [subscription/one-time/etc.]
- Tiers: [pricing tiers]

**Validation:** [demand evidence]

**Moat:** [defensibility]
```

Then move to the next skill in sequence: `business-os-brand`.
