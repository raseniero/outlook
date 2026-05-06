---
type: project
title: "Google Workspace Migration & Cleanup 2026"
status: active
counterpart_org: google-workspace
owner_us: ramon-aseniero
tags: [platform-migration, google-workspace, identity-cleanup, infrastructure, deadline-driven]
started: 2025-09-16
target: 2026-05-08
created: 2026-04-26
updated: 2026-05-05
source_count: 23
verified_sources:
  - raw/inbox/2026-04-24-google-workspace-alert-domain-export.md
  - raw/inbox/2026-04-24-google-archive-data-requested.md
  - raw/inbox/2026-04-24-google-workspace-business-standard-welcome.md
  - raw/inbox/2026-04-24-google-workspace-business-standard-welcome-2.md
  - raw/inbox/2026-04-24-google-workspace-data-export-started.md
  - raw/inbox/2026-04-24-google-workspace-transfer-failed-admin.md
  - raw/inbox/2026-04-24-google-workspace-transfer-failed-aldred.md
  - raw/inbox/2026-04-24-google-workspace-transfer-failed-grace.md
  - raw/inbox/2026-04-24-google-workspace-transfer-failed-hr.md
  - raw/inbox/2026-04-24-google-workspace-transfer-failed-jairo.md
  - raw/inbox/2026-04-24-google-workspace-transfer-failed-ramon.md
  - raw/inbox/2026-04-24-google-workspace-transfer-failed-teofilo.md
  - raw/inbox/2026-04-25-google-takeout-data-ready.md
  - raw/inbox/2026-04-25-google-workspace-admin-deletion-success.md
  - raw/inbox/2026-04-25-google-workspace-aldred-deletion-success.md
  - raw/inbox/2026-04-25-google-workspace-hr-deletion-success.md
  - raw/inbox/2026-04-25-google-workspace-jairo-deletion-success.md
  - raw/inbox/2026-04-25-google-workspace-ramon-aseniero-deletion-success.md
covered_sources:
  - raw/inbox/2026-04-21-google-workspace-storage-expired.md
  - raw/inbox/2026-04-23-google-workspace-business-starter-suspension-1.md
  - raw/inbox/2026-04-23-google-workspace-business-starter-suspension-2.md
  - raw/inbox/2026-04-23-google-workspace-cloud-identity-suspension.md
  - raw/inbox/2026-04-24-google-workspace-alert-domain-export.md
  - raw/inbox/2026-04-24-google-archive-data-requested.md
  - raw/inbox/2026-04-24-google-workspace-business-standard-welcome.md
  - raw/inbox/2026-04-24-google-workspace-business-standard-welcome-2.md
  - raw/inbox/2026-04-24-google-workspace-data-export-started.md
  - raw/inbox/2026-04-24-google-workspace-transfer-failed-admin.md
  - raw/inbox/2026-04-24-google-workspace-transfer-failed-aldred.md
  - raw/inbox/2026-04-24-google-workspace-transfer-failed-grace.md
  - raw/inbox/2026-04-24-google-workspace-transfer-failed-hr.md
  - raw/inbox/2026-04-24-google-workspace-transfer-failed-jairo.md
  - raw/inbox/2026-04-24-google-workspace-transfer-failed-ramon.md
  - raw/inbox/2026-04-24-google-workspace-transfer-failed-teofilo.md
  - raw/inbox/2026-04-25-google-workspace-admin-deletion-success.md
  - raw/inbox/2026-04-25-google-workspace-aldred-deletion-success.md
  - raw/inbox/2026-04-25-google-workspace-hr-deletion-success.md
  - raw/inbox/2026-04-25-google-workspace-jairo-deletion-success.md
  - raw/inbox/2026-04-25-google-workspace-ramon-aseniero-deletion-success.md
  - raw/inbox/2026-04-25-google-takeout-data-ready.md
---

# Google Workspace Migration & Cleanup 2026

**Status:** Active — primary cleanup mostly done. **One critical deadline remains: download Takeout archive by 2026-05-02.** Suspension deadline 2026-05-08 was avoided via plan upgrade.
**Counterpart:** [[orgs/google-workspace]]
**Our owner:** [[people/ramon-aseniero]]

## Overview

Forced platform cleanup triggered by a long-running pooled-storage over-quota state. The Jairosoft Workspace pool exceeded its limit; a 14-day grace period expired **2025-09-16**, putting the account in read-only. The state was tolerated for ~7 months until April 2026 escalation: Google scheduled cancellation of both Business Starter and Cloud Identity Free for **2026-05-08**, with **208.35 GB / 122 documents** at risk.

Ramon's response unfolded over 24 hours on 2026-04-24:

1. Initiated full domain data export ("ramon_jairosoft_gmail_export") and Google Takeout archive across 31 products.
2. Attempted to delete unused user accounts with data-transfer to Ramon — **all 7 transfers failed** (Drive/Docs/Calendar) under the constrained Business Starter plan.
3. Upgraded the plan: Business Starter → **Business Standard** (more capacity, more services).
4. By 2026-04-25, deletion-with-transfer succeeded for Admin, Aldred, HR, Jairo, and Ramon-as-source — 5 successes.
5. Takeout archive (31 products) became ready 2026-04-25; download window closes **2026-05-02**.

## Status now

The May 8 cancellation threat is resolved (plan upgraded). Cleanup substantially complete. The newly indexed `2026-04-26` completion notice confirms the domain export `ramon_jairosoft_gmail_export` finished successfully and remained available for 30 days. The main open operational question is no longer whether export completed, but whether Ramon accessed and retained the resulting archive(s) in time. Two of the seven originally-attempted transfers (Grace, Teofilo) are not visible as deletion-success in the indexed corpus — verify state in admin console; they may have been intentionally retained.

## Goals / scope

- Resolve the 2025-09-16 over-quota condition before 2026-05-08 cancellation.
- Reduce pooled-storage footprint by deleting unused user accounts (admin, aldred, jairo, hr, etc.).
- Preserve data via domain export + Takeout before any cancellation.
- Land on a healthier plan tier (achieved: Business Standard).

## Decisions

- 2026-04-24 — Ramon chose to **upgrade plan** (Business Starter → Business Standard) rather than free up storage on the existing plan. Likely driver: the failed-transfer pattern at 15:19 indicated the old plan couldn't absorb consolidations.
- 2026-04-24 — Decided to **delete and consolidate** these accounts: Admin Jairosoft, Aldred Donayre, Jairo Soft, HR Department, Ramon (as source). Grace and Teofilo were attempted but lack a deletion-success record — likely retained.

## Open items

- [ ] **CRITICAL — Ramon: download Takeout archive by 2026-05-02** (Sat). 31 products, single download window. → `raw/inbox/2026-04-25-google-takeout-data-ready.md`
- [ ] Verify in admin console that Grace + Teofilo accounts remain active (failed transfers Apr 24; no deletion notice Apr 25 — strong evidence of retention but worth confirming).
- [ ] Confirm the completed domain data export ("ramon_jairosoft_gmail_export") was accessed / retained within Google's 30-day availability window.
- [ ] Accept the new Google Product Agreement for Business Standard (the Welcome email noted this as a required follow-up).

## Timeline

- **2025-09-16** — Pooled storage 14-day grace period expired; account → read-only state.
- **(2025-09-16 → 2026-04-21)** — ~7 months in read-only; minimal action.
- **2026-04-21** — Storage-expired notification; impact: users can't upload files or create new Docs/Sheets/Slides/Forms.
- **2026-04-23 10:57** — Google Workspace Team email: Cloud Identity Free scheduled for cancellation 2026-05-08.
- **2026-04-23 10:58** — Google Workspace Team email: Business Starter scheduled for cancellation 2026-05-08; **208.35 GB / 122 docs** at risk.
- **2026-04-24 ~15:10 PT** — Google sends consumer-style "Archive of Google data requested" security notice to Ramon (Takeout request acknowledged).
- **2026-04-24 15:19 PT** — Ramon initiates domain data export "ramon_jairosoft_gmail_export"; Workspace Alerts logs HIGH-severity domain-export-initiated event.
- **2026-04-24 15:19 → 16:32 PT** — Ramon attempts to delete + transfer 7 user accounts. **All 7 transfers fail** for Drive/Docs (HR + Ramon also failed Calendar). Per-user attempt times: Jairo 15:19, Admin 15:37, Aldred 15:38, Ramon 15:39, Grace 16:04, Teofilo 16:27, HR 16:32. Each user marked "currently suspended" after the failed delete.
- **2026-04-24 15:35 PT** — Plan upgraded: Business Starter → **Business Standard**. Two welcome emails received (one duplicate). Google Product Agreement still pending acceptance.
- **2026-04-25 04:11 UTC** — Google Takeout archive ready; **31 products**; **download by 2026-05-02**. Archive ID `337b0120-7dfc-4f13-8529-d45a14c1059f`.
- **2026-04-26 22:19 UTC** — Google confirms `ramon_jairosoft_gmail_export` is complete and accessible via Cloud Storage for 30 days. → [[sources/2026-04-26-google-workspace-data-export-complete]]
- **2026-04-25 12:06 → 12:10 PT** — Deletions succeed (5 of 7 attempted): Admin 12:06, Jairo 12:07, Ramon Aseniero (`ramon.aseniero@`) 12:07, HR 12:09, Aldred 12:10. All deletions credited to "Ramon Jr (ramon@jairosoft.com)". Grace + Teofilo notably absent — confirmed retained.
- **(2026-05-02)** — Takeout download deadline.
- **(2026-05-08)** — Original cancellation deadline (now neutralized by plan upgrade).

## Affected users

| User | Status (per indexed sources) |
|------|------|
| Admin Jairosoft (admin@jairosoft.com) | Deletion successful (2026-04-25) |
| Aldred Donayre | Deletion successful (2026-04-25) |
| HR Department (hr@jairosoft.com) | Deletion successful (2026-04-25) |
| Jairo Soft (jairo@jairosoft.com) | Deletion successful (2026-04-25) |
| Ramon Aseniero (`ramon.aseniero@jairosoft.com`) | **Secondary account deletion** — confirmed by transfer-failed email naming `ramon.aseniero@jairosoft.com` (not Ramon's primary `ramon@jairosoft.com`). Ramon's primary admin account is intact. |
| Mary Grace Garcia (grace@) | Transfer failed 2026-04-24; **no deletion-success notice in Apr 25 deletion batch** — confirmed retained. |
| Teofilo Limpag (tfllmpg@) | Transfer failed 2026-04-24; **no deletion-success notice in Apr 25 deletion batch** — confirmed retained. |

## Sources

This project subsumes 22 raw inbox files (see `covered_sources` in frontmatter). Per SCHEMA.md email-specific conventions, individual `wiki/sources/` pages are not created for workspace lifecycle events — they are summarized into this project page.

Additional directly tracked source:

- [[sources/2026-04-26-google-workspace-data-export-complete]]

## Open questions

- Why did the over-quota state persist 7 months (Sep 2025 → Apr 2026) before action?
- ~~Is the "deletion-success for Ramon Aseniero" a genuine deletion or a transfer-to-self acknowledgment?~~ **Resolved 2026-04-26 verification:** the deleted account is `ramon.aseniero@jairosoft.com` (a separate secondary account), not Ramon's primary `ramon@jairosoft.com`.
- Should the wiki track a follow-up project for storage hygiene to prevent recurrence?

## Related

- [[orgs/google-workspace]]
- [[orgs/jairosoft]]
- [[people/ramon-aseniero]]
