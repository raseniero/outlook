---
type: org
title: "Microsoft 365"
aliases: ["M365", "Office 365", "Microsoft", "Outlook", "Exchange Online"]
tags: [vendor, productivity-platform, microsoft, email-backbone, recurring-billing]
created: 2026-04-26
updated: 2026-05-06
source_count: 5
---

# Microsoft 365

**Type:** Productivity / email platform vendor (Microsoft).
**Status:** **Email backbone for jairosoft.com** (Outlook / Exchange Online — Outlook NDRs originate from `postmaster@jairosoft.com`). Active subscription stack on JAIROSOFT LLC, with OneDrive / SharePoint also surfacing in the corpus.
**Senders:** `microsoft-noreply@microsoft.com` (billing), `postmaster@jairosoft.com` (mail server).

## Overview

Microsoft 365 hosts Jairosoft's primary `@jairosoft.com` email/Exchange (the inbox this wiki ingests from). On 2026-04-25, two parallel invoices arrived 4 minutes apart for **JAIROSOFT LLC**:

| Subscription tier | Invoice # | Expires |
|---|---|---|
| M365 Business Basic | `73213288317` (PDF, 359 KB) | 2026-08-01 |
| M365 Business Standard | `53213303070` (PDF, 245 KB) | 2026-08-01 |

Both are credit-card auto-charge — no action required. The two-tier mix is unusual: typically organizations pick one tier. Possible reasons: per-user differentiation (admins on Standard, contractors on Basic), staged migration, or legacy carryover. **Worth probing on next consolidation cycle** — Aug 1 renewal is a natural decision point.

A new 2026-05-06 Microsoft follow-up shows that Microsoft is actively pushing Jairosoft toward a `Business Premium + Copilot` posture and is offering a partner-led path through `Emergent Software`. That makes the Aug 1 renewal decision not just a cost-rationalization problem but also an architecture / vendor-governance choice.

## Active engagements

- **Email/Exchange Online for jairosoft.com** — primary mail platform.
- **OneDrive / SharePoint** — active collaboration/storage surface; recent warning indicates a large file-deletion event in Ramon's OneDrive.
- Two parallel subscription tiers (Basic + Standard) — see consolidation note above.
- **Business Premium migration / security consult motion** — Microsoft is now explicitly recommending a Business Premium security rollout with Copilot as an attached upsell path.

## Recent activity

- 2026-05-06 — Microsoft recommended `Emergent Software` and pushed Business Premium + Copilot follow-up after the security consultation. → [[sources/2026-05-06-re-microsoft-consultation-business-premium]]
- 2026-04-26 — SharePoint Online warned that a large number of OneDrive files were deleted and remain restorable for 93 days. → [[sources/2026-04-26-onedrive-large-number-files-deleted]]
- 2026-04-25 — M365 Business Basic invoice. → [[sources/2026-04-25-microsoft365-business-basic-invoice]]
- 2026-04-25 — M365 Business Standard invoice. → [[sources/2026-04-25-microsoft365-business-standard-invoice]]
- 2026-04-25 — Outlook NDR test2 (`ramon@jairosoft.dev`, 550 5.1.1). → [[sources/2026-04-25-outlook-undeliverable-test2]]

## Open questions

- Why two tiers in parallel? (User segmentation? Migration in progress?)
- Aug 1 2026 renewal: opportunity to consolidate; needs user-by-user license audit.
- Does Microsoft's `Business Premium + Copilot` push materially change the renewal decision, or is it just partner-influenced upsell pressure?
- Is `jairosoft.dev` an actual M365 / Exchange domain, or just a target for testing?

## Related

- [[orgs/jairosoft]]
- [[orgs/azure]] *(same vendor — Microsoft)*
- [[people/ramon-aseniero]] (billing recipient + tenant admin)
