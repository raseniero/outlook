---
type: analysis
title: "Productivity-Suite Duplication: Microsoft 365 + Google Workspace running in parallel"
question: "Why is JAIROSOFT LLC paying for both M365 (Basic + Standard) and Google Workspace Business Standard, and what should consolidate before the Aug 1, 2026 M365 renewal?"
generated: 2026-04-26
tags: [vendor-rationalization, productivity, capex, microsoft-365, google-workspace, decision-pending]
---

# Productivity-Suite Duplication

## TL;DR

Jairosoft LLC currently pays for **three productivity-suite subscriptions** that overlap on email, calendar, file storage, and document editing:

| Vendor | Tier | Renewal/cycle | Confirmed-active in corpus |
|---|---|---|---|
| Microsoft 365 | Business Basic | **2026-08-01** | Email backbone (`postmaster@jairosoft.com`); 04-25 invoice |
| Microsoft 365 | Business Standard | **2026-08-01** | 04-25 invoice (parallel tier) |
| Google Workspace | Business Standard *(just upgraded from Business Starter)* | monthly auto-bill | 04-23 → 04-25 forced migration; 22 lifecycle emails |

The duplication isn't a recent accident — both stacks have been live throughout the indexed window (2026-04-18 → 2026-04-25). The Aug 1, 2026 M365 renewal is the next natural decision point.

As of **2026-05-06**, Microsoft is no longer passive in this decision: a post-consultation follow-up is actively steering Jairosoft toward a `Business Premium + Copilot` rollout via a recommended partner (`Emergent Software`). That raises the stakes on making the renewal decision deliberately instead of drifting into it.

## What the corpus tells us

### Microsoft 365 is the email backbone
- Outlook NDR for the `test2` message (2026-04-25) came from `postmaster@jairosoft.com` with M365 Exchange Online error wording ("error reported by the recipient domain's email server", reference to "Office 365").
- Two parallel tiers (Basic + Standard) both invoiced 4 minutes apart on 2026-04-25 02:17 / 02:21 UTC.
- Both expire **2026-08-01** — they will auto-renew on the same day unless action is taken.
- 2026-05-06: Microsoft followed up with a partner-led `Business Premium + Copilot` motion, which implies the vendor sees Jairosoft as a live upsell / migration target, not just a stable renewal account.

### Google Workspace was just expensively reorganized
- Account had been in read-only since **2025-09-16** due to pooled-storage over-quota (208.35 GB / 122 docs).
- 2026-04-23: Google scheduled cancellation of both Business Starter and Cloud Identity Free for **2026-05-08**.
- 2026-04-24: Ramon executed a 73-minute crisis sweep — domain export → 7 user-deletion attempts (all transfers failed) → **plan upgrade to Business Standard** to absorb the consolidations.
- 2026-04-25: 5 deletions succeeded; Takeout archive (31 products) ready, **must download by 2026-05-02**.

### Used users overlap
- Mark Colina sends from `mcolina@jairosoft.com` (M365) but addresses Marikriss as `kriss@jairosoft.com`, Grace as `grace@jairosoft.com` — these are also Google Workspace user accounts (Grace + Teofilo were the two retained from the deletion sweep).
- The same `@jairosoft.com` namespace is served by both backends. Routing must be split somewhere — but where?

## What's unclear

1. **Who actually uses what?** The corpus doesn't reveal whether each user has a mailbox on M365 or Google Workspace, or both. A user-by-user license inventory is the unblock.
2. **What does Google Workspace serve that M365 doesn't?** Likely candidates: Google Drive for shared file storage (the 208 GB that triggered the over-quota), Google Meet for client calls, the 5 retained user accounts as legacy email aliases.
3. **What does M365 serve that Google Workspace doesn't?** Outlook/Exchange for the primary `ramon@jairosoft.com` mailbox, Office desktop apps if licensed, possibly Teams.
4. **Why was the Google Workspace upgrade chosen over teardown?** Could have been: (a) too much shared institutional content already in Drive to migrate out, (b) external clients expect `@jairosoft.com` Drive access, (c) no time to migrate before the May 8 cancellation deadline. The forced-cleanup emergency probably foreclosed a clean teardown decision.

## Decision space

| Option | What it looks like | Risk | $$ direction |
|---|---|---|---|
| **A. Keep both, rationalize tiers** | Audit users; possibly consolidate M365 Basic into Standard (or vice versa); keep Google Workspace Business Standard | Low | Moderate savings (eliminate duplicate-tier waste) |
| **B. Migrate off Google Workspace** | Use the 31-product Takeout archive (already in hand by 2026-05-02) as the migration source; move shared Drive content to OneDrive/SharePoint | Medium — clients with Drive shares break | Largest savings |
| **C. Migrate off Microsoft 365** | Drop M365 entirely; route all `@jairosoft.com` mail through Google Workspace; lose Outlook/Office | High — disrupts the email backbone the postmaster currently runs | Moderate savings (still pay GWS Standard) |
| **D. Status quo** | Renew M365 both tiers Aug 1; pay both stacks indefinitely | None operational | None — keeps duplicate spend |

The Aug 1 renewal is a forcing function for choice. Option A is the lowest-risk improvement; Option B is the largest reward if migration friction is tolerable.

## Recommended next steps

- [ ] **Ramon (by ~2026-07-01):** pull license inventory from both tenants — who has M365 Basic, who has M365 Standard, who has Google Workspace.
- [ ] **Ramon:** decide if Google Workspace's role is anything beyond shared Drive + legacy email aliases. If not, schedule the migration off using the Takeout archive as the source of truth.
- [ ] **Grace:** estimate annual spend per stack (per-user × tier × 12) — needed to make Option A vs B vs D economically comparable.
- [ ] **Ramon (by 2026-07-15):** make the renewal decision; allow ~2 weeks for execution before Aug 1.

## Related

- [[orgs/microsoft-365]]
- [[orgs/google-workspace]]
- [[projects/google-workspace-migration-2026]]
- [[orgs/jairosoft]]
- [[people/ramon-aseniero]]
