---
type: source
title: "Outlook NDR — Undeliverable: test2 (ramon@jairosoft.dev)"
tags: [ndr, bounce, jairosoft-dev, domain-test]
created: 2026-04-26
updated: 2026-04-26
source_path: raw/inbox/2026-04-25-outlook-undeliverable-test2.md
from: Microsoft Outlook <postmaster@jairosoft.com>
to: ramon@jairosoft.com
date: 2026-04-25 19:02 +0000
priority: bounce
---

# Undeliverable: test2

**One-line:** Bounce notice for a test message Ramon sent to `ramon@jairosoft.dev` — recipient unknown (550 5.1.1) at the `.dev` domain.

## Key points

- Ramon was testing delivery to `ramon@**jairosoft.dev**` — note the `.dev` TLD, not `.com`.
- Rejection: 550 5.1.1, "ramon wasn't found at jairosoft.dev" (recipient unknown at destination domain).
- Subject "test2" implies a "test1" attempt may have happened earlier (not in indexed corpus).
- Signal: Ramon may be evaluating or planning to set up a `jairosoft.dev` domain (developer-facing brand?), but mailbox isn't configured.

## Decisions / commitments

*(none — diagnostic test)*

## Action items

- [ ] **Ramon (informational):** if `jairosoft.dev` is intended as a working domain, configure MX / mailbox; if not, no action.

## Entities

- [[orgs/jairosoft]]
- [[people/ramon-aseniero]]

## Open questions

- Does Jairosoft own `jairosoft.dev`?
- Is this part of any rebrand or developer-portal initiative?
