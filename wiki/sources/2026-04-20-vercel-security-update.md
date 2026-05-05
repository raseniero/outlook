---
type: source
source_path: raw/inbox/2026-04-20-vercel-security-update.md
message_id: "imap:default:INBOX:14:100988"
from: "Vercel Security <security@vercel.com>"
to: ramon@jairosoft.com
date: 2026-04-20
priority: security
tags: [vercel, security-notification, no-body]
---

# Vercel Security Update

**One-line:** Vercel sent a security notification — body empty in indexed text. **Almost certainly about the Vercel breach over the 2026-04-18/19 weekend** (confirmed via the 2026-04-21 GoHealth alignment notes, which detail the Jairosoft response: SSL rotated, API keys rotated, etc.).

## Key points

- Body wasn't extracted from the indexed text version, but cross-reference with [[sources/2026-04-21-weekly-alignment-gohealth-apr21-notes]] indicates this is the customer-facing notification of the weekend breach.
- Jairosoft has already taken response actions on the GoHealth side: SSL certs renewed, API keys rotated in production (lower envs ongoing).

## Action items

- [ ] **Ramon:** review the Vercel email directly to confirm scope and any account-level actions Vercel asks of customers.
- [ ] **Jove Moralde:** confirm timeline with Reese (per weekly alignment).

## Entities

- [[orgs/vercel]]
- [[people/ramon-aseniero]]
- [[projects/gohealth-jairosoft-engineering-engagement]]
