---
type: org
title: "Microsoft 365"
aliases: ["M365", "Office 365", "Microsoft", "Outlook", "Exchange Online"]
tags: [vendor, productivity-platform, microsoft, email-backbone, recurring-billing]
created: 2026-04-26
updated: 2026-04-26
source_count: 3
---

# Microsoft 365

**Type:** Productivity / email platform vendor (Microsoft).
**Status:** **Email backbone for jairosoft.com** (Outlook / Exchange Online — Outlook NDRs originate from `postmaster@jairosoft.com`). Active subscription stack on JAIROSOFT LLC.
**Senders:** `microsoft-noreply@microsoft.com` (billing), `postmaster@jairosoft.com` (mail server).

## Overview

Microsoft 365 hosts Jairosoft's primary `@jairosoft.com` email/Exchange (the inbox this wiki ingests from). On 2026-04-25, two parallel invoices arrived 4 minutes apart for **JAIROSOFT LLC**:

| Subscription tier | Invoice # | Expires |
|---|---|---|
| M365 Business Basic | `73213288317` (PDF, 359 KB) | 2026-08-01 |
| M365 Business Standard | `53213303070` (PDF, 245 KB) | 2026-08-01 |

Both are credit-card auto-charge — no action required. The two-tier mix is unusual: typically organizations pick one tier. Possible reasons: per-user differentiation (admins on Standard, contractors on Basic), staged migration, or legacy carryover. **Worth probing on next consolidation cycle** — Aug 1 renewal is a natural decision point.

## Active engagements

- **Email/Exchange Online for jairosoft.com** — primary mail platform.
- Two parallel subscription tiers (Basic + Standard) — see consolidation note above.

## Recent activity

- 2026-04-25 — M365 Business Basic invoice. → [[sources/2026-04-25-microsoft365-business-basic-invoice]]
- 2026-04-25 — M365 Business Standard invoice. → [[sources/2026-04-25-microsoft365-business-standard-invoice]]
- 2026-04-25 — Outlook NDR test2 (`ramon@jairosoft.dev`, 550 5.1.1). → [[sources/2026-04-25-outlook-undeliverable-test2]]

## Open questions

- Why two tiers in parallel? (User segmentation? Migration in progress?)
- Aug 1 2026 renewal: opportunity to consolidate; needs user-by-user license audit.
- Is `jairosoft.dev` an actual M365 / Exchange domain, or just a target for testing?

## Related

- [[orgs/jairosoft]]
- [[orgs/azure]] *(same vendor — Microsoft)*
- [[people/ramon-aseniero]] (billing recipient + tenant admin)
