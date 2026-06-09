---
name: business-os-brand
description: "Applies a per-business brand identity — colors, fonts, tone, and visual direction."
version: 1.0.0
author: Sami Badrani
tags: [business, brand, design]
---

# Business OS — Brand Skill

Run this after `business-os-core`. Collects brand identity for the business.

## Process

Ask the user these questions:

### 1. Color Palette
What primary colors fit the vibe? (or suggest based on the business type)
- Primary: [main brand color]
- Secondary: [supporting color]
- Accent: [highlight color]

### 2. Fonts
- Heading font: [e.g. Inter, Playfair Display]
- Body font: [e.g. Inter, Source Sans]

### 3. Tone of Voice
Pick one or describe: Professional | Casual | Luxury | Playful | Technical | Inspiring

### 4. Visual Direction
Any reference images, styles, or vibes? (minimal, bold, illustrative, photocentric)

## Output

Write to: `businesses/[business-name]/brand.md`

```markdown
# [Business Name] — Brand

**Colors:**
- Primary: `[hex]`
- Secondary: `[hex]`
- Accent: `[hex]`

**Fonts:**
- Headings: [font name]
- Body: [font name]

**Tone:** [tone description]

**Notes:** [any additional direction]
```

Then update `template/app/globals.css` with the new CSS variables.

Then move to `business-os-content`.
