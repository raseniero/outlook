---
from: Karl Caumban <kcaumban@jairosoft.com>
to: Justin Patel, Derek Norton, Padma Alla, Jove Moralde, Adam Bernaldez, Mateen Kazia, Susan Neunaber (GoHealth)
cc: Ramon Aseniero, Jove Moralde, Adam Bernaldez (Jairosoft)
date: 2026-04-21 08:39 -0700
subject: "Re: Weekly Alignment - Jairosoft and GoHealth Team Leads"
priority: work-thread
---

# Re: Weekly Alignment - Jairosoft and GoHealth Team Leads

Hi Everyone,

Please find the notes from today's meeting below. Feel free to reach out if you have any questions or need further clarification on the points discussed.

## April 21, 2026 — Agenda and Notes

### 1. Blockers & Risks — "Stop-the-Line" issues

**a. No Index Issue on Website**
- The 'no index' issue appears to be resolved — trend is downward.
- We can remove this from the risk register if the trend continues.

**b. GoAdmin: Okta Mismatch — RESOLVED**
- Mismatch between email assignments caused access issues.
- Gap between what's officially assigned in Okta and what comes through the endpoint.
- Some users marked as 'unknown' instead of their typical roles.
- Working session planned with the IAM team (Josh Newton, Adam, Jovanne, Justin).

**c. GoReg: Zotec Experiencing Issue**
- Zotec issues are causing regression testing to be put on hold.
- Justin Patel will investigate further.
- Adam Bernaldez mentioned ongoing issues with account number page redirection.

**d. Website: Vercel Breach**
- Breach occurred over the weekend at Vercel; immediate action required.
- SSL certificates were renewed.
- API keys rotated — production-facing complete, lower envs ongoing.
- Jove Moralde to connect with Reese and team for a defined timeline.

### 2. Prioritization — Syncing the Backlog with Technical Feasibility

**a. EMR Integration Standardization**
- Decision: move forward with **HL7 and R4** for EMR integration, **dropping backward compatibility**.
- Currently in the spike phase; test cases and conversations ongoing.
- Approval received to work through a CAB from the HC side to expedite launch.

**b. Front-End Refactor**
- Mateen Kazia mentioned significant refactor work is coming up, specifically for the patient app (essentially rewritten). Regression testing is starting.

**c. Save My Spot Redesign**
- Website: 'Save My Spot' redesign has been taken in-house and kicked off.

**d. Prismic Ad Hoc Testing**
- Moved to the backlog and deprioritized.

### 3. Milestone Pulse — Target Release / Objectives

**a. Hartford Integration with Zotec Integration — June 1st ➜ moved to July 1st (still internal)**
- End-to-end testing with Hartford completed.
- Working session with the dev team conducted to address testing issues.
- Two out of six scenarios left to test, pending defect fixes from Hartford.

**b. Christiana Care with EPIC Integration — October release**
- Start planning for early testing.

### 4. Parking Lot

- Justin Patel to investigate the Zotec issues further by contacting and digging in, asking around to gather more info.
- Jove Moralde to connect with Reese and team for a defined timeline on Vercel breach resolution.

---

**Karl Jordan P. Caumban** — Agile Project Manager, Jairosoft LLC
