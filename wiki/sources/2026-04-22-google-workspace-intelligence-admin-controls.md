---
type: source
source_path: raw/inbox/2026-04-22-google-workspace-intelligence-admin-controls.md
from: "The Google Workspace Team <workspace-noreply@google.com>"
to: ramon@jairosoft.com
date: 2026-04-22
priority: notification
tags: [google-workspace, workspace-intelligence, admin-control, default-on, gemini]
---

# [Product Update] Workspace Intelligence Admin Controls

**One-line:** Google Workspace Intelligence (the AI system grounding Gemini in Gmail/Chat/Calendar/Drive) is **default ON** for all users starting **2026-04-22**, with new admin controls to manage data sources.

## Key points

- **Default state: ON** for all users in the org.
- New admin controls let you disable specific data sources (Gmail, Chat, Calendar, Drive) — controls may take up to 3 days to appear in admin console.
- Privacy posture: data **not used for model training** or advertising; AI features respect user-level content access.
- If a data source is disabled, users can still ask Gemini about specific named files/items, but Gemini won't search the disabled source.
- Disabling sources may make some AI features unavailable.
- "No action is required unless you want to change defaults."

## Decisions / commitments

- Implicit: Jairosoft accepts default ON unless Ramon proactively disables.

## Action items

- [ ] **Ramon (or whoever owns Workspace admin):** decide whether to leave Workspace Intelligence default-ON or restrict any data sources. Tied to the active [[projects/google-workspace-migration-2026]].

## Entities

- [[orgs/google-workspace]]
- [[projects/google-workspace-migration-2026]]
- [[people/ramon-aseniero]]
