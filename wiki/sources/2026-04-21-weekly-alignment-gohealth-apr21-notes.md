---
type: source
source_path: raw/inbox/2026-04-21-weekly-alignment-gohealth-apr21-notes.md
from: "Karl Caumban <kcaumban@jairosoft.com>"
to: ["Justin Patel (GoHealth)", "Derek Norton (GoHealth)", "Padma Alla (GoHealth)", "Jove Moralde", "Adam Bernaldez", "Mateen Kazia (GoHealth)", "Susan Neunaber (GoHealth)"]
cc: ["Ramon Aseniero", "Jove Moralde", "Adam Bernaldez"]
date: 2026-04-21
priority: work-thread
tags: [gohealth, weekly-alignment, meeting-notes, vercel-breach, hartford-integration, emr]
---

# Re: Weekly Alignment — Jairosoft and GoHealth Team Leads (Apr 21 notes)

**One-line:** Karl's detailed weekly-alignment meeting notes covering blockers (incl. **Vercel breach over the 2026-04-18/19 weekend**), prioritization (EMR HL7/R4, patient-app refactor, Save My Spot), and milestones (**Hartford integration slipped Jun 1 → Jul 1**, Christiana Care + EPIC October).

## Key points

### Blockers & risks (Stop-the-Line)

- **No Index Issue on Website** — trending downward; remove from risk register if trend continues.
- **GoAdmin Okta Mismatch — RESOLVED.** Mismatch between Okta-assigned and endpoint-returned roles (some users marked "unknown"). Working session planned with IAM team: **Josh Newton**, Adam Bernaldez, Jovanne Vicentino, Justin Patel.
- **GoReg Zotec issues** — regression testing on hold; Justin Patel investigating; Adam noted account-number page redirection issues.
- **🚨 Vercel breach over the weekend.** SSL certs renewed; API keys rotated (production complete, lower envs ongoing). Jove Moralde to connect with **Reese** for defined timeline. *(Connects to the 2026-04-20 "Vercel security update" email previously filed without context.)*

### Prioritization

- **EMR Integration:** decision to use **HL7 + R4**; **dropping backward compatibility**. In spike phase. CAB approval received from healthcare side to expedite.
- **Front-End Refactor:** patient app significantly refactored (essentially rewritten); regression testing starting. Mateen Kazia surfaced this.
- **Save My Spot Redesign:** taken in-house, kicked off.
- **Prismic Ad Hoc Testing:** moved to backlog; deprioritized.

### Milestones

- **Hartford integration with Zotec:** **Jun 1 → Jul 1** (still internal target). End-to-end testing complete with Hartford; 2/6 scenarios still untested pending Hartford defect fixes.
- **Christiana Care with EPIC integration:** October release; start planning for early testing.

### Parking lot

- Justin Patel — investigate Zotec further.
- Jove Moralde — get defined timeline from Reese on Vercel breach resolution.

## Decisions / commitments

- EMR integration: HL7 + R4, no backward compatibility.
- Hartford integration: schedule slipped 1 month to **2026-07-01**.
- Patient app: refactor underway (essentially a rewrite).

## Action items

- [ ] **Justin Patel:** investigate Zotec issues further.
- [ ] **Jove Moralde:** connect with Reese for Vercel-breach resolution timeline.
- [ ] **Jove + IAM team:** complete GoAdmin Okta verification working session.

## New contacts surfaced

- **Karl Jordan P. Caumban** — full name + title: **Agile Project Manager, Jairosoft LLC**. *(Updates the wiki's prior less-specific Karl framing.)*
- **Susan Neunaber** — Manager, Agile Delivery & Governance @ GoHealth (PMP, CSM); P: 256.615.1318; `susan.neunaber@gohealthuc.com`.
- **Justin Patel** — GoHealth (role TBD; on Zotec investigation).
- **Padma Alla** — GoHealth (role TBD).
- **Mateen Kazia** — GoHealth (front-end / patient-app refactor lead, presumed).
- **Josh Newton** — GoHealth IAM team.
- **Reese** — Vercel-side or shared point person on the breach (affiliation TBD).

## Entities

- [[people/karl-caumban]]
- [[orgs/gohealth-uc]]
- [[people/susan-neunaber]]
- [[people/justin-patel]]
- [[people/derek-norton]]
- [[people/padma-alla]]
- [[people/mateen-kazia]]
- [[people/josh-newton]]
- [[people/jove-moralde]]
- [[people/adam-bernaldez]]
- [[people/jovanne-vicentino]]
- [[people/ramon-aseniero]]
- [[orgs/vercel]]
- [[projects/gohealth-jairosoft-engineering-engagement]]
