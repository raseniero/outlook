---
type: project
title: "GoHealth × Jairosoft Engineering Engagement"
status: active
counterpart_org: gohealth-uc
counterpart_person: susan-neunaber
owner_us: karl-caumban
tags: [client-engagement, engineering, gohealth, dev-team, weekly-alignment, multi-product]
started: ~2026-03-14
created: 2026-04-26
updated: 2026-05-05
source_count: 5
---

# GoHealth × Jairosoft Engineering Engagement

**Status:** Active — substantial multi-product engineering engagement; weekly alignment cadence is established, but the Apr 29 weekly-review summary suggests unresolved production issues and deeper QA / PM process strain.
**Counterpart org:** [[orgs/gohealth-uc]]
**Counterparts (GoHealth):** [[people/susan-neunaber]] (Manager, Agile Delivery & Governance) is the primary recurring counterpart; [[people/derek-norton]] is senior; product-level contacts include [[people/justin-patel]], [[people/padma-alla]], [[people/mateen-kazia]], [[people/josh-newton]].
**Lead (Jairosoft):** [[people/karl-caumban]] (Agile Project Manager).
**Team (Jairosoft):** 9-person dev team — Adam Bernaldez, Jove Moralde, Rommel Senillo, Bon Cueva, Bomar Sinday, Aldred Donayre, Jovanne Vicentino, Calvin John Dalino, Daryl Estrada.

## Overview

This is the engineering-delivery half of the GoHealth UC client relationship (the other half is the [[projects/gohealth-voice-ai-initiative]] sales/vendor-evaluation track). It's a substantial active engagement with a 9-person Jairosoft dev team, a weekly alignment meeting (running ~since 2026-03-14, well-received per Susan's 2026-04-14 feedback), and multiple in-flight workstreams across patient app, EMR integration, payment processing, and infrastructure.

Adam Bernaldez's 2026-05-04 H1B-vs-actual-role description sharpens the picture: he portrays himself not as a designer-adjacent contributor but as a **Lead/Senior Developer** with technical ownership across GoReg 2.0, Frontrunner eligibility, Zotec billing integrations, Epic/HL7/FHIR EMR work, OCR extraction, and CLEAR1 proof-of-concept exploration. The 2026-04-29 TeamsMaestro weekly-review summary adds another layer: the team still had unresolved production issues, pending Justin follow-up and E2E testing, and an explicit process-health complaint that QA and PM workflows were "broken."

## Current workstreams (per 2026-04-21 alignment notes)

| Workstream | Status |
|---|---|
| **Hartford integration with Zotec** | E2E testing complete; 2/6 scenarios pending Hartford defect fixes; **release slipped Jun 1 → Jul 1** |
| **Christiana Care + EPIC integration** | October release; early-testing planning to start now |
| **EMR Integration standardization** | Spike phase; **HL7 + R4** chosen; **dropping backward compatibility**; CAB approval in to expedite |
| **Patient app refactor** | Significant rewrite by Mateen Kazia; regression testing starting |
| **Save My Spot redesign** | Taken in-house; kicked off |
| **Prismic Ad Hoc Testing** | Backlogged / deprioritized |

## Active blockers / risks

- **Vercel breach (2026-04-18/19 weekend)** — SSL certs renewed; API keys rotated (production complete; lower envs ongoing). Jove Moralde to coordinate with Reese (Vercel-side) for resolution timeline. → [[orgs/vercel]]
- **GoReg Zotec issues** — regression testing on hold; Justin Patel investigating. Adam Bernaldez noted account-number page redirection issues.
- **Delivery-process health** — the Apr 29 weekly-review summary reports that QA and PM processes are being perceived internally as broken; treat as a strong signal, but verify against underlying meeting notes.
- **No Index issue on website** — trending downward; remove from risk register if trend continues.

## Resolved

- **GoAdmin Okta mismatch** — RESOLVED (2026-04-21); IAM team working session planned with Josh Newton, Adam, Jovanne, Justin to verify.

## Open items

- [ ] **Justin Patel:** investigate Zotec issues further.
- [ ] **Jove Moralde:** confirm Vercel-breach resolution timeline with Reese.
- [ ] **IAM team (Josh Newton + Adam + Jovanne + Justin):** complete Okta verification working session.
- [ ] **Hartford defect fixes** (2/6 scenarios) — pending Hartford-side resolution before Jul 1 release.
- [ ] **Karl / GoHealth leads:** decide what concrete process correction is needed if the weekly-review summary is accurately reflecting QA / PM breakdown.

## Timeline

- ~2026-03-14 — Weekly alignment meeting cadence established.
- 2026-04-14 — Karl asked Susan + Derek for feedback on weekly format; Susan replied positively.
- 2026-04-18/19 (weekend) — Vercel breach.
- 2026-04-20 — Karl set up GoHealth-Jairosoft team weekly review for the 9-person dev team.
- 2026-04-21 — Detailed weekly alignment meeting: Hartford slip, Vercel response, EMR HL7/R4 decision.
- 2026-04-29 — Weekly review summary flags unresolved production issues, pending Justin follow-up, and stronger QA / PM process concern. → [[sources/2026-04-29-gohealth-weekly-review-summary]]
- 2026-05-04 — Adam documented his actual contribution scope as Lead/Senior Developer across core GoHealth delivery streams. → [[sources/2026-05-04-adam-h1b-actual-project-role]]

## Sources

- [[sources/2026-04-20-karl-gohealth-team-weekly-review]] — Internal Jairosoft dev-team weekly review setup
- [[sources/2026-04-21-weekly-alignment-gohealth-apr21-notes]] — Cross-org weekly alignment notes
- [[sources/2026-04-21-weekly-alignment-gohealth-check-in-reply]] — Karl thanks Susan for feedback
- [[sources/2026-04-29-gohealth-weekly-review-summary]] — AI-generated internal review summary flagging delivery-process strain
- [[sources/2026-05-04-adam-h1b-actual-project-role]] — role-scope clarification from Adam

## Related

- [[orgs/gohealth-uc]]
- [[projects/gohealth-voice-ai-initiative]] *(parallel sales track)*
- [[orgs/vercel]]
