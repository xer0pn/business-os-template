---
name: business-os-launch
description: "Tracks the Phase 0-7 launch checklist for each business."
version: 1.0.0
author: Sami Badrani
tags: [business, launch, project-management]
---

# Business OS — Launch Skill

Run this after `business-os-infra` completes. Initializes and tracks the launch checklist.

## Phases

Create a checklist file per business tracking these phases:

### Phase 0: Validation
- [ ] Confirm idea has demand
- [ ] Identify target customer
- [ ] Validate pricing model

### Phase 1: Core Setup
- [ ] Template cloned
- [ ] Brand applied (colors, fonts)
- [ ] Content written and approved

### Phase 2: Infra
- [ ] Supabase project created and schema migrated
- [ ] Vercel deployment live
- [ ] Domain configured (or vercel.app subdomain)

### Phase 3: Payments
- [ ] Whop product created
- [ ] Subscriptions active and test-purchased

### Phase 4: Email
- [ ] Welcome email template live
- [ ] Purchase confirmation working

### Phase 5: Launch Content
- [ ] Social posts scheduled
- [ ] Tweet thread posted
- [ ] Reddit intro posted
- [ ] Launch email sent

### Phase 6: Launch!
- [ ] All systems go
- [ ] Monitoring active

### Phase 7: Post-Launch
- [ ] First 7 days metrics reviewed
- [ ] Feedback collected
- [ ] Iteration planned

## Output

Write to: `businesses/[business-name]/launch-checklist.md`

Check off items as the user confirms them. Update `_index.md` in the business-os folder with current phase status.
