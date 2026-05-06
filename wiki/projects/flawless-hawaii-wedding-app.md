---
type: project
title: "Flawless Hawaii Wedding App"
aliases: ["Shannon Nofo App Development", "Flawless Wedding App"]
status: active
counterpart_org: flawless-hawaii-wedding-app
counterpart_person: shannon-nofo
owner_us: karl-caumban
co_owner_us: carol-cuison
qa_lead: ressa-paracuelles
tags: [client-engagement, mobile-app, web-app, multi-iteration, healthy, sales-followup-pending]
started: "(pre-corpus)"
created: 2026-04-26
updated: 2026-05-05
source_count: 4
supersedes: shannon-nofo-app-development
---

# Flawless Hawaii Wedding App

**Status:** **Active, but no longer just "post-release healthy."** Iteration 7.1 shipped cleanly, and a likely-flawless May 4 planning summary now points to active iteration **7.3** work, mobile-access blockers, RevenueCat delays, and a possible app-launch slowdown while web `2.0` is prioritized. One outstanding sales-side ask remains: developer cost info for scale-up (overdue weeks).
**Counterpart:** [[people/shannon-nofo]] @ [[orgs/flawless-hawaii-wedding-app]]
**Our owners:** [[people/karl-caumban]], [[people/carol-cuison]]; QA: [[people/ressa-paracuelles]]
**Visibility:** [[people/joe-nofo]] (cc, internal — likely family connection to Shannon), [[people/ramon-aseniero]]

## Overview

Multi-iteration build of the Flawless Hawaii Wedding App — a wedding-vendor marketplace connecting brides to Hawaii vendors. Mobile (iOS, Android) plus web. Mature codebase at Iteration 7.1+; release packaging via Azure DevOps (`jairo.visualstudio.com/Flawless Wedding App`).

**Note on history:** This project was originally created in this wiki as `shannon-nofo-app-development` (in batch 1) before the connection to "Flawless Hawaii Wedding App" was made. This page supersedes that one.

## Status now

**Iteration 7.1 release cycle completed** as of 2026-04-21, but work has clearly moved into later planning. A May 4 meeting summary with Flawless-specific language (vendor/bride flows, affiliate feature, RevenueCat, web 2.0, app launch timing) suggests the team is now planning **iteration 7.3**, with access blockers on native mobile and a potential sequencing choice to favor web `2.0` before app launch. **Open sales-side commitment:** Karl + Carol still owe Shannon developer cost info for adding an additional developer to support further web-app work — overdue weeks; risk to relationship if not unblocked promptly.

## Goals / scope

- Operate the live Flawless Wedding App across iOS, Android, web.
- Quote and resource an **additional developer** to support continued web-app build (the gating sales-side question).

## Decisions

- 2026-04-20 — Customer approved Iteration 7.1 release. Deployed.

## Open items

- [ ] **Karl / Carol — overdue weeks:** send Shannon developer cost breakdown for additional headcount on the web build. → [[sources/2026-04-18-shannon-nofo-additions-developers]]
- [ ] **Ramon:** confirm Karl/Carol unblock within 1–2 business days; intervene if needed.
- [ ] **Earl / mobile owners:** resolve native mobile access blockers and unblock RevenueCat setup. → [[sources/2026-05-05-summary-ad-hoc-meeting]]

## Iteration 7.1 detail (closed defects, partial)

| ID | Type | Title |
|---|---|---|
| 190065 | Defect | [Web][Booked Events] Blank page when downloading the contract details |
| 191375 | Defect | [iOS] "Missing var entry: Client_details1" / "Unable to locate var: User1.password" on vendor-account delete |
| 196979 | (truncated at fetch limit) | (truncated) |

## Timeline

- *(pre-corpus)* — Multi-iteration build through Iteration 7.0.
- *(pre-2026-04-18)* — Jairosoft committed to send Shannon dev-cost info for scale-up.
- **2026-04-18** — Shannon escalates ("up against a wire financially and timelines"). → [[sources/2026-04-18-shannon-nofo-additions-developers]]
- **2026-04-19** — Ressa sent Iteration 7.1 release package for customer approval.
- **2026-04-20** — Shannon: "Approved. Amazing!" → Ressa deployed iOS/Android (OTA), web (prod). → [[sources/2026-04-20-iteration-7.1-deployment-update]]
- **2026-04-21** — Smoke testing complete in production for iOS 210 / Android 199; release cycle closes. → [[sources/2026-04-21-iteration-7.1-smoke-testing-complete]]
- **2026-05-04** — Ad-hoc planning summary points to iteration 7.3 work: affiliate feature continuation, RevenueCat blockers, web 2.0 sequencing, and DNS cutover planning. *(Inference from domain vocabulary + attendee mix.)* → [[sources/2026-05-05-summary-ad-hoc-meeting]]

## Sources

- [[sources/2026-04-18-shannon-nofo-additions-developers]]
- [[sources/2026-04-20-iteration-7.1-deployment-update]]
- [[sources/2026-04-21-iteration-7.1-smoke-testing-complete]]
- [[sources/2026-05-05-summary-ad-hoc-meeting]]

## Related

- [[orgs/flawless-hawaii-wedding-app]]
- [[people/shannon-nofo]]
- [[orgs/jairosoft]]
