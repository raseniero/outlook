# Wiki Log

Append-only chronological log. Newest at the bottom — `tail -n 30 log.md` shows recent activity. See [SCHEMA.md](../SCHEMA.md).

---

## [2026-04-26] init | wiki bootstrap

- Created `wiki/` folder structure: people/, orgs/, projects/, topics/, threads/, sources/, analyses/.
- Wrote `SCHEMA.md` (root) and `CLAUDE.md` (loader).
- Initialized `wiki/index.md` and `wiki/log.md`.
- Domain locked in: Ramon's work email at Jairosoft LLC (`ramon@jairosoft.com`).

## [2026-04-26] ingest | 2026-04-24-eli-hersher-gohealth-voice-ai-thanks.md

- **Source:** `raw/inbox/2026-04-24-eli-hersher-gohealth-voice-ai-thanks.md` (Eli Hersher → Ramon, GoHealth Voice AI thread).
- **One-line:** Eli confirmed receipt of Vendor Response Sheet; next steps by ~2026-05-01.
- **Pages created:**
  - `wiki/sources/2026-04-24-eli-hersher-gohealth-voice-ai-thanks.md`
  - `wiki/people/eli-hersher.md`
  - `wiki/orgs/gohealth-uc.md`
  - `wiki/projects/gohealth-voice-ai-initiative.md`
- **Pages updated:** `wiki/index.md` (5 sections + stub references).
- **Stubs flagged for future ingests:** `people/karl-caumban`, `people/joe-nofo`, `people/derek-norton`, `people/ramon-aseniero`, `orgs/jairosoft`.
- **Open action item recorded:** Ramon to follow up with Eli by 2026-05-04 if no response.

## [2026-04-26] ingest-batch | backfill batch 1 (5 sources, 2026-04-18 → 2026-04-19)

- **Sources ingested (chronological):**
  - `raw/inbox/2026-04-18-shannon-nofo-additions-developers.md` — Shannon escalates for overdue dev-cost info.
  - `raw/inbox/2026-04-19-joe-nofo-aws-writeup.md` — Joe → Ramon, no body.
  - `raw/inbox/2026-04-19-joe-nofo-meeting-notes.md` — Joe → Ramon, no body.
  - `raw/inbox/2026-04-19-luke-colina-invoice-apr1-15.md` — Luke contractor invoice (PDF) to Grace + HR.
  - `raw/inbox/2026-04-19-luke-colina-timesheet-apr1-15.md` — Luke timesheet (PNG) to admin distro.
- **Pages created:**
  - sources/ (5): the five above mirrored.
  - people/ (9): shannon-nofo, joe-nofo, luke-colina, ramon-aseniero (hub), karl-caumban, mary-grace-garcia, carol-cuison, almera-tayao, ryan-castillo, marikriss-aseniero. *(4 are stubs — Almera, Ryan, Marikriss, Karl, Mary Grace, Carol; 4 are full — Ramon, Joe, Luke, Shannon.)*
  - orgs/ (1): jairosoft.
  - projects/ (1): shannon-nofo-app-development (status: **blocked**).
- **Pages updated:** wiki/index.md (full rewrite — added Internal/External splits, projects, sources, cross-project open-items snapshot, stub refs).
- **New stubs flagged for next batches:** `people/derek-norton`, `people/mark-colina-solar`.
- **Hypotheses recorded (verify on later sources):**
  - Shannon Nofo and Joe Nofo are likely related (same surname + cc patterns).
  - Mark Colina (solar emails) and Luke Colina (contractor) may also be related — surname only so far.
- **New open action items captured:** Karl/Carol overdue on Shannon, Ramon to verify, Grace to process Luke's invoice.
- **Backfill progress:** 6 / 130+ raw inbox sources.

## [2026-04-26] ingest-batch | backfill batch 2 — workspace-migration cluster (22 raw sources, 2026-04-21 → 2026-04-25)

- **Strategy:** theme-based cluster ingest per SCHEMA.md email-specific conventions ("Workspace lifecycle events: batch under a single project page rather than 20 separate pages"). No per-source `wiki/sources/` pages created — all 22 raw files subsumed under one project page with full `covered_sources` frontmatter for idempotency.
- **Read for grounding (6 of 22):** storage-expired (2026-04-21), business-starter-suspension-1 (2026-04-23), cloud-identity-suspension (2026-04-23), data-export-started + alert-domain-export + business-standard-welcome + transfer-failed-jairo (2026-04-24), admin-deletion-success + takeout-data-ready (2026-04-25). Remaining 16 inferred from filename patterns + `raw/INDEX.md` summaries — verify in next lint pass.
- **Pages created:**
  - `wiki/orgs/google-workspace.md` (vendor/platform page).
  - `wiki/projects/google-workspace-migration-2026.md` (full project synthesis with timeline, affected-users table, decisions, 6 open items).
- **Pages updated:**
  - `wiki/orgs/jairosoft.md` — added migration to active engagements; source_count 5 → 27.
  - `wiki/people/ramon-aseniero.md` — added migration to engagements; added 5 new open commitments (incl. critical Takeout deadline); rewrote Recent activity; source_count 5 → 27.
  - `wiki/index.md` — full rewrite (new project, new org, restructured open-items into critical/this-week/routine).
- **Story uncovered:** Not a "migration" but a forced-cleanup-and-upgrade triggered by a 7-month-old over-quota state (read-only since 2025-09-16). Ramon's 2026-04-24 sequence: domain export → 7 deletion attempts (all failed) → plan upgrade → deletions then succeeded for 5 users on 2026-04-25.
- **Critical deadline surfaced:** **Takeout archive download by 2026-05-02 (Sat)** — single window, 31 products. Now on Ramon's open-items snapshot.
- **Anomalies flagged for verification in admin console:**
  - Grace + Teofilo had failed transfers but no later success notice — likely retained, but unconfirmed.
  - Ramon Aseniero "deletion-success" notice may refer to data-transfer source role rather than account deletion — verify.
- **New stubs flagged:** `people/teofilo-limpag`, `people/aldred-donayre`, `people/jairo-soft`.
- **Backfill progress:** 28 / 130+ raw inbox sources.

## [2026-04-26] ingest-batch | backfill batch 3 — 2026-04-20 first 10 chronological

- **Sources read (10):** anthropic-claude-101-registration, auto-allies-autodefense-sync, aws-partner-cert-week2-ai-practitioner, carol-cuison-luke-timesheet-reply, dbedt-sba-disaster-relief-hawaii, derek-norton-accepted-touchbase, duet-email-confirmation, duet-how-can-we-help, duet-welcome, figma-subscription-receipt-apr19.
- **Per-source pages created (6):** auto-allies-autodefense-sync, aws-partner-cert-week2-ai-practitioner, carol-cuison-luke-timesheet-reply, dbedt-sba-disaster-relief-hawaii, derek-norton-accepted-touchbase, figma-subscription-receipt-apr19. *(4 emails subsumed under org pages — 3 Duet onboarding into `orgs/duet-display.md`, 1 Anthropic registration into `orgs/anthropic.md`, per email-specific conventions for vendor onboarding sequences.)*
- **New entity pages (10):**
  - orgs/ (3): auto-allies, duet-display, anthropic.
  - projects/ (2): autoallies-autodefense, aws-partner-ai-practitioner-cert-2026.
  - people/ (5): derek-norton (full — fills earlier stub), matthew-babela, earl-carino, jerlyn-ates, ryan-shuler (4 stubs).
- **Pages updated (3):**
  - orgs/jairosoft.md — restructured Key people (added AutoDefense team subsection); restructured Active engagements (split into Client/Internal/Infra/Personal); source_count 27 → 35.
  - people/ramon-aseniero.md — added 2 new project links + Strategic AI investment section; refreshed Recent activity with 2026-04-20 events; source_count 27 → 35.
  - orgs/gohealth-uc.md — promoted Derek from "page TBD" to live link; added source link to 2026-04-20 timeline; source_count 1 → 2.
- **Findings worth flagging:**
  - **Auto Allies = new internal product line** with dedicated team alias (`AutoAlliesProductTeam@jairosoft.com`) and recurring sync. Commercial model TBD — could be Jairosoft-owned product or build-for-client. Open question recorded on `orgs/auto-allies.md`.
  - **Strategic AI bet:** Ramon enrolled in Claude 101 + entered Week 2 of AWS AI Practitioner cert on the SAME DAY (2026-04-20). Pattern noted on `people/ramon-aseniero.md`.
  - **Ryan Shuler anomaly:** only Anglo surname on the AutoDefense team distribution; affiliation flagged for verification on next ingest.
- **New stubs flagged for next batches:** none new this round (existing stubs from prior batches remain).
- **Backfill progress:** 38 / 130+ raw inbox sources.

## [2026-04-26] ingest-batch | backfill batch 4 — 2026-04-20 second 10 chronological

- **Sources read (10):** github-password-changed, grace-autoallies-overdue-invoices, grace-jairosoft-opex-april25-submission, hiepro-solicitation-p26002383-captive-insurance, hiepro-solicitation-p26002421-airports-maps, iteration-7.1-deployment-update, karl-branch-protection-budget-reply, karl-claude-partner-network-reply, karl-gohealth-team-weekly-review, leadership-team-weekly-discussion.
- **Per-source pages created (10):** all 10.
- **New entity pages (21):**
  - orgs (3): flawless-hawaii-wedding-app, pnbrci, hiepro.
  - projects (2): flawless-hawaii-wedding-app, autoallies-branch-protection.
  - people full (2): teofilo-limpag (fills longstanding stub), ressa-paracuelles (QA, sender of Iteration 7.1).
  - people stubs (14): david-dahilig (PNBRCI), jayden-colina, cricket-la-chica, ike-yana, bomar-sinday, john-paul-catubig, adam-bernaldez, jove-moralde, rommel-senillo, bon-cueva, aldred-donayre (fills earlier stub), jovanne-vicentino, calvin-john-dalino (fills earlier stub), daryl-estrada, armelita-pulido.
- **Pages rewritten / corrected (7):**
  - people/shannon-nofo.md — added Hannold alias; rewrote with Flawless context.
  - people/matthew-babela.md — **reclassified external (AutoAllies)** based on `matt@autoallies.com` confirmation in Grace's email.
  - orgs/auto-allies.md — **reclassified as external client** (was previously misframed as internal product line); added $18,332 A/R table.
  - people/karl-caumban.md — promoted from stub to full page with cross-engagement context.
  - people/mary-grace-garcia.md — promoted from stub to full page (A/R + OpEx ownership).
  - people/carol-cuison.md — promoted from stub to full page (Flawless co-owner).
  - projects/shannon-nofo-app-development.md — converted to redirect stub → flawless-hawaii-wedding-app.
- **Pages updated (5):** sources/2026-04-18-shannon-nofo-additions-developers (project link rename), orgs/gohealth-uc (added 9-person eng team scope), orgs/jairosoft (full team restructure: Flawless team, GoHealth eng team, AutoAllies-side, other), people/ramon-aseniero (project link rename, refreshed Recent activity, source_count 35 → 45), wiki/index.md (full rewrite).
- **Major findings:**
  1. **AutoAllies is an EXTERNAL CLIENT, not internal product line.** Caused by display-name-only attribution last batch; now confirmed via `matt@autoallies.com`. **$18,332 A/R outstanding** (3 invoices).
  2. **Shannon Nofo == Shannon Hannold == Flawless Hawaii Wedding App customer.** Project renamed; status corrected from "blocked" to "active healthy" (Iteration 7.1 shipped same day 2026-04-20 with customer "Approved. Amazing!"). The cost-info is for SCALE-UP, not rescue.
  3. **GoHealth has TWO tracks of engagement:** sales/Voice-AI vendor evaluation (Eli/Derek) + a 9-person Jairosoft dev team (Karl-led). The dev team is a substantial revenue/staffing engagement that wasn't visible in earlier batches.
  4. **PNBRCI** is a recurring counterparty processing Jairosoft OpEx — relationship type (parent-co? accounting service?) still TBD.
  5. **HiePro is a high-frequency RFQ source** (4+ solicitations in 2026-04 alone) — needs a bid/no-bid owner.
  6. **Earl Carino + Jerlyn Ates clarified as INTERNAL Jairosoft** (Leadership Team membership) — Matthew Babela was the only confirmed AutoAllies-external from the AutoDefense sync distribution.
  7. **GitHub password-change** is on Ramon's personal `raseniero@gmail.com`, not work account; flagged for confirmation.
- **Backfill progress:** 48 / 130+ raw inbox sources.

## [2026-04-26] ingest-batch | backfill batch 5 — final 10 chronological from 2026-04-20

- **Sources read (10):** marikriss-branch-protection-budget-reply, moodle-security-release-5-2, nurture-collective-connection-string, rsrit-net-architect-azure-solicitation, ryan-castillo-luke-timesheet-reply, sba-national-small-business-week-summit, scaled-agile-ai-native-connect-reminder, teofilo-autoallies-branch-protection-budget, vercel-security-update, vicsante-invoice-apr1-15.
- **Per-source pages created (10):** all 10 (Nurture Collective creds redacted in wiki; full plaintext only in raw).
- **New entity pages (9):**
  - orgs (6): nurture-collective, sba, scaled-agile, moodle, vercel, rsrit.
  - people full (2): abdul-samad (RSRIT recruiter), vicsante-aseniero (Jairosoft contractor).
  - people stub (1): apple-nurture-collective (client-side recipient; name TBD).
- **Pages updated (8):**
  - people/teofilo-limpag.md — added IT Administrator title; full activity refresh; security open item.
  - projects/autoallies-branch-protection.md — promoted originating Teofilo budget request from "not yet ingested" to live link; source_count 1 → 3.
  - people/marikriss-aseniero.md — promoted from stub to full; added Branch Protection reply, Vicsante invoice cc, Leadership Team.
  - people/ryan-castillo.md — added 2026-04-20 timesheet reply + Leadership Team activity.
  - people/cricket-la-chica.md — promoted from stub; identified as cross-engagement (Nurture creds + Flawless cc); presumed Jairosoft.
  - people/joe-nofo.md — added 2026-04-20 cc activity (Iteration 7.1, Nurture creds); source_count 2 → 4.
  - orgs/jairosoft.md — added IT/infra subsection; added Vicsante; project list expanded; source_count 45 → 55.
  - people/ramon-aseniero.md — added Nurture Collective + Branch Protection items + open commitments; source_count 45 → 55.
  - wiki/index.md — full rewrite with new orgs grouping (clients/vendors/counterparties), security section in open items.
- **Major findings:**
  1. **Security hygiene issue:** Teofilo sent plaintext production AWS RDS credentials via email to internal team + the client. Not a leak (client owns the creds), but the practice is risky. Rotation + secrets-manager adoption added as open items. Wiki source page redacts the credentials; raw retains full content.
  2. **Teofilo's full title revealed:** "IT Administrator, Jairosoft LLC" — clarifies his role beyond Branch Protection.
  3. **Nurture Collective is an active client** (AWS RDS Postgres in `us-west-1`, plus Spanish translation work coming in 2026-04-22 batch). Project page deferred until more sources accumulate.
  4. **AutoAllies Branch Protection budget request is awaiting Ramon's approval** (originating message ingested this batch). Karl + Marikriss already replied (no body — image attachments).
  5. **Vicsante Aseniero is a second bi-monthly contractor** (parallel to Luke Colina), likely Aseniero-family.
  6. **Vercel security email and Moodle security release** are flagged for direct review — couldn't extract action signal from indexed text.
- **Milestone:** **2026-04-20 is now fully ingested** (30 sources covered: 27 per-source pages + 3 in the Duet onboarding cluster).
- **Backfill progress:** 58 / 130+ raw inbox sources.

## [2026-04-26] ingest-batch | backfill batch 6 — first 10 chronological from 2026-04-21

- **Sources read (10):** dotax-status-not-compliant, github-pat-added, iteration-7.1-smoke-testing-complete, openai-macos-security-update, prentiss-final-dev-scope-virtual-or-inperson, prentiss-final-dev-scope-free-tomorrow, prentiss-final-dev-scope-check-schedule, sick-leave-calvin-dalino-extended, weekly-alignment-gohealth-apr21-notes, weekly-alignment-gohealth-check-in-reply.
- **Per-source pages created (10):** all 10.
- **New entity pages (13):**
  - orgs (3): aloha-roadway-services, malama-risk, openai.
  - projects (3): final-dev-scope-aloha-roadway, jairosoft-dotax-compliance, gohealth-jairosoft-engineering-engagement.
  - people full (3): prentiss-anderson, sean-brittain, susan-neunaber.
  - people stubs (4): justin-patel, padma-alla, mateen-kazia, josh-newton.
- **Pages updated (8):**
  - people/karl-caumban.md — full rewrite with **Agile Project Manager** title, full name "Karl Jordan P. Caumban", new GoHealth-eng project link.
  - people/calvin-john-dalino.md — confirmed QA role; sick leave 2026-04-20 → 2026-04-21.
  - orgs/gohealth-uc.md — restructured Key People (Voice AI side / Engineering side); added 5 new contacts; linked GoHealth engineering engagement; source_count 2 → 5.
  - orgs/vercel.md — major update: confirmed 2026-04-18/19 weekend breach; added Jairosoft response (SSL/keys rotated); linked Jove Moralde + Reese open item.
  - sources/2026-04-20-vercel-security-update.md — connected to GoHealth alignment notes; reframed body-empty email as breach notification.
  - projects/flawless-hawaii-wedding-app.md — Iteration 7.1 cycle marked **complete** (smoke testing wrapped 2026-04-21); source_count 2 → 3.
  - orgs/jairosoft.md — Karl APM title; added 4 new active engagements (GoHealth-eng, Aloha Roadway, DOTAX); source_count 55 → 65.
  - people/ramon-aseniero.md — added 3 new open items (DOTAX, OpenAI deadline, Friday Aloha Roadway meeting), 3 new project links, refreshed Recent activity; source_count 55 → 65.
  - wiki/index.md — full rewrite (people grouped 6 ways, orgs grouped 4 ways, 10 projects).
- **Major findings:**
  1. **DOTAX A6 Form = Not Compliant** for JAIROSOFT, LLC. New compliance project; gates HiePro bid eligibility.
  2. **OpenAI macOS update deadline 2026-05-08** (Axios supply-chain compromise; precautionary code-signing rotation).
  3. **Vercel had a breach over the 2026-04-18/19 weekend.** GoHealth alignment notes spell out the response. The 2026-04-20 "Vercel security update" email — previously filed without context — is now connected to this incident.
  4. **Aloha Roadway Services** is a real client (License BC-37652, Honolulu); Final Dev Scope contract walkthrough rescheduled from 2026-04-22 to Friday 2026-04-24 due to Sean medical emergency.
  5. **GoHealth × Jairosoft Engineering Engagement** is now its own project page — captures Hartford slip (Jun 1 → Jul 1), EMR HL7/R4 standardization, patient-app rewrite, Vercel breach response, and 9-person dev team (Karl-led, weekly alignment with Susan Neunaber).
  6. **Karl's full title revealed: Agile Project Manager** (full name Karl Jordan P. Caumban).
  7. **Iteration 7.1 release cycle complete** for Flawless Hawaii Wedding App (smoke testing wrapped Apr 21).
  8. **Calvin Dalino's role: QA** on the GoHealth dev team; sick leave Apr 20 → Apr 21.
  9. **5 new GoHealth contacts** surface from alignment notes: Susan Neunaber (PMP/CSM), Justin Patel, Padma Alla, Mateen Kazia, Josh Newton.
- **Backfill progress:** 68 / 130+ raw inbox sources.

## [2026-04-26] ingest-batch | backfill batch 7 — final 9 from 2026-04-21

- **Sources read (9):** hiepro-solicitation-q26002444, joe-nofo-jv-v2-meeting-prep, pldt-ebilling-invoice, sba-small-business-week-summit-2, scaled-agile-ai-maturity-webinar, testflight-eazyscanner-invite, uspto-hour-authenticity-nfl-draft, uspto-patent-drafting-competition-winners, uspto-world-ip-day-april29.
- **Per-source pages created (9):** all 9.
- **New entity pages (3):**
  - orgs (2): uspto, pldt.
  - projects (1): eazyscanner.
- **Pages updated (8):**
  - projects/final-dev-scope-aloha-roadway.md — added **JV v2 framing** (joint-venture structure, not vanilla services contract); added Joe's prep source; source_count 3 → 4.
  - orgs/sba.md — promoted 2026-04-21 reminder from "not yet ingested" to live link; source_count 2 → 3.
  - orgs/scaled-agile.md — promoted 2026-04-21 webinar to live link; source_count 1 → 2.
  - orgs/hiepro.md — promoted Q26002444 to live link; added DOTAX-blocking warning to bid eligibility; source_count 2 → 3.
  - people/joe-nofo.md — added JV v2 prep activity; fixed broken shannon-nofo-app-development link to flawless-hawaii-wedding-app; source_count 4 → 5.
  - orgs/jairosoft.md — added **Legal-entity structure** section (LLC + INC); added EazyScanner internal product; source_count 65 → 70.
  - people/ramon-aseniero.md — added 5 new 2026-04-21 activity entries (PLDT, JV v2, TestFlight, HiePro, DOTAX); added EazyScanner project link; source_count 65 → 70.
  - wiki/index.md — full rewrite (added PLDT, USPTO, EazyScanner; restructured open items).
- **Major findings:**
  1. **Aloha Roadway is framed as a Joint Venture (JV v2)** — Joe's "JV v2" subject line. Implies a prior JV v1 attempt + equity/governance dynamics on the upcoming Friday walkthrough.
  2. **Jairosoft has two legal entities:** JAIROSOFT, LLC (US/Hawaii) and JAIROSOFT, INC. (Philippines). DOTAX issue is on the LLC; PLDT bill is to the INC.
  3. **PLDT bill PHP 59,626.90 due 2026-05-13** — and the "previous charges == current charges" pattern hints at a possible payment lapse to verify.
  4. **EazyScanner** is a Jairosoft-published iOS app on TestFlight — new internal product surfaces; scope/owner unclear.
  5. **HiePro Q26002444** adds a 3rd active RFQ; all 3 gated on DOTAX A6 resolution.
  6. **USPTO** is a recurring (likely passive) subscription — 3 emails in one day.
- **Milestone:** **2026-04-18 → 2026-04-21 are now fully ingested.**
- **Backfill progress:** 77 / 130+ raw inbox sources.

## [2026-04-26] ingest-batch | backfill batch 8 — all 13 from 2026-04-22

- **Sources read (13):** almera-canceled-hr-connect, aws-summit-los-angeles-2026-invite, creza-spanish-translation-checkin-dropdown, derek-norton-accepted-touchbase-gohealth, eli-hersher-gohealth-voice-ai-extension, google-cloud-next-online-confirmation, google-cloud-vertex-ai-gemini-platform, google-maps-platform-cloud-next-announcements, google-workspace-intelligence-admin-controls, hishaam-meeting-setup-april27, karl-roadmap-epic-203235-ticket-dismisser, nsba-leadership-council-invite, prentiss-final-dev-scope-friday.
- **Per-source pages created (13):** all 13.
- **New entity pages (8):**
  - orgs (3): aws, google-cloud, nsba.
  - projects (2): ticket-dismisser-crm-app, hishaam-employment-opportunity.
  - people full (3): creza-evangelista, hishaam-namooya, daniella-mcmillan.
- **Pages updated (8):**
  - people/cricket-la-chica.md — confirmed internal Jairosoft (`cricket@jairosoft.com`); source_count 2 → 3.
  - people/apple-nurture-collective.md — full name confirmed: **Apple Sepulveda**; source_count 1 → 2.
  - orgs/nurture-collective.md — added Spanish translation decision; expanded key-people list; source_count 1 → 2.
  - projects/final-dev-scope-aloha-roadway.md — promoted Friday-meeting source from "not yet ingested" to live link; source_count 4 → 5.
  - people/eli-hersher.md — promoted Apr 22 extension source to live link; promoted Derek's reference from "page TBD" to live; source_count 2 → 3.
  - orgs/jairosoft.md — added Ticket Dismisser internal product, Hishaam hiring conversation; source_count 70 → 83.
  - people/ramon-aseniero.md — added 11 new 2026-04-22 activity entries; added 3 project links + 4 new open commitments; source_count 70 → 83.
  - wiki/index.md — full rewrite (added AWS, Google Cloud, NSBA orgs; added Ticket Dismisser, Hishaam projects; added Daniella/Creza/Hishaam external people).
- **Major findings:**
  1. **Hishaam Namooya is an active hiring candidate** — Sitecore Technology MVP, Mauritius. Mon 2026-04-27 call to discuss employment-opportunity follow-up + future-engineer concept + AI dev progress. The earlier "Summary Compensation Expectations" thread in raw is from this same conversation.
  2. **Karl shared a roadmap for "Ticket Dismisser — CRM App Tool" (Epic 203235)** to Ramon/Earl/Jerlyn (with JPC + Bomar cc). Awaits review. Scope/owner unclear from text body (locked in attachment).
  3. **Apple Sepulveda** is the full name behind the apple@mynurturecollective.com stub.
  4. **Cricket La Chica is confirmed internal Jairosoft** (`cricket@jairosoft.com`) — earlier "presumed" tag removed.
  5. **Spanish-translation decision captured (Nurture Collective):** when client selects Spanish, all content (incl. dropdown options) is translated. Migration must finish before translations ship.
  6. **Friday 2026-04-24 meeting confirmed** for the Aloha Roadway JV v2 walkthrough (Sean medical emergency moved Apr 22 → Apr 24).
  7. **Eli Hersher's GoHealth title confirmed:** Product Owner (MarTech & CX); phone 786-897-5240.
  8. **AWS Summit LA 2026-06-10** — Daniella McMillan (AWS Partner Territory Manager) invitation; reply "Yes" for invite-only experience.
  9. **Google Cloud Next 2026** — Ramon registered for Digital Pass (Apr 22-24).
  10. **Workspace Intelligence default-ON** for all users starting 2026-04-22 — admin controls available within 3 days.
  11. **HR Connect bi-weekly canceled** by Almera; 32-recipient distribution = approximate Jairosoft headcount.
  12. **NSBA pitch corroborates Jairosoft is SBA-certified** — useful external signal.
- **Milestone:** **2026-04-18 → 2026-04-22 are now fully ingested.**
- **Backfill progress:** 90 / 130+ raw inbox sources.

## [2026-04-26] ingest-batch | backfill batch 9 — first 10 from 2026-04-23

- **Sources read (10):** anthropic-claude-console-login, autoallies-weekly-program-sync, aws-partner-cert-readiness-60min, azure-postgresql-ha-retirement-notice, david-dahilig-jairosoft-opex-apr25, google-cloud-next-day1-recap, google-developer-welcome-to-gear, grace-support-team-sync, grace-timesheet-april1-15, hiepro-solicitation-q26002479-checkpoint.
- **Per-source pages created (10):** all 10.
- **New entity pages (7):** orgs/azure, projects/google-developer-gear, people stubs (5): mary-secusana, millad-ramy, luzmibel-paculanang, maria-lina-cuestas, mark-colina (promoted from stub reference).
- **Pages updated (10):** ryan-shuler (confirmed external AutoAllies), auto-allies (full team restructure), anthropic, google-cloud (Day 1 + GEAR), pnbrci, hiepro (Q26002479), aws-partner-cert-2026 (60-min session), autoallies-autodefense (cross-link), jairosoft (Support Team subsection, GEAR added), ramon-aseniero (10 new activities + GEAR).
- **Major findings:**
  1. **Ryan Shuler is confirmed external AutoAllies** (long-standing TBD resolved).
  2. **AutoAllies has a 3rd workstream**: Weekly Operation Program Sync. Surfaces 2 more external (Mary Secusana, Millad Ramy) and 2 more internal (Jayden Colina, Luzmibel Paculanang).
  3. **GEAR (Google Developer Program)** — Ramon enrolled in AI agent training; 35 credits/month. Completes the multi-vendor AI strategy: Anthropic + AWS + Google.
  4. **Mark Colina** is now a Jairosoft team member (Support Team), not just the solar-proposal forwarder. Stub promoted.
  5. **Maria Lina Cuestas** — new internal Jairosoft Support Team member.
  6. **Azure** confirmed as a real Jairosoft vendor (PostgreSQL HA retirement; Apr 25 Sponsorship March bill confirms paying account).
  7. **HiePro Q26002479** = 4th active RFQ.
- **Backfill progress:** 100 / 130+ raw inbox sources.

## [2026-04-26] ingest-batch | backfill batch 10 — final 6 from 2026-04-23 + first 4 from 2026-04-24

- **Sources read (10):** opengov-rfp-p26005-birmingham-legal, opengov-taylor-mi-vacuum-breakers, portfolio-health-dashboard-apr23, sholom-kraus-500k-funding-offer, tricentis-modern-perf-testing, uspto-hour-nfl-draft, anthropic-extra-usage-earned, hiepro-solicitation-p26002371-efs, hiepro-solicitation-q26002498-hansens-disease, joe-accepted-final-dev-scope.
- **Per-source pages created (10):** all 10.
- **New entity pages (5):** orgs/opengov-procurement, orgs/delta-capital-group, orgs/tricentis, people/sholom-kraus, projects/portfolio-health-dashboard.
- **Pages updated (7):** orgs/uspto, orgs/hiepro (now 6 active RFQs), orgs/anthropic, projects/final-dev-scope-aloha-roadway (Joe accepted), people/joe-nofo, orgs/jairosoft (Portfolio Dashboard added; source_count → 103), people/ramon-aseniero (10 new activities + new project links + OpenGov cleanup item; source_count → 103).
- **Major findings:**
  1. **OpenGov is a separate procurement source** from HiePro (national, subscription-based by issuer). Ramon's existing subscriptions look stale. Cleanup recommended.
  2. **HiePro now has 6 active RFQs** (was 4): added P26002371 EFS (Statewide; strong potential fit) and Q26002498 Endpoint Device Maintenance.
  3. **Portfolio Health Dashboard is a recurring Jairosoft-internal report** (daily — Apr 23/24/25). Self-sent by Ramon, distributed to Karl + Grace + Bomar.
  4. **Sholom Kraus / Delta Capital Group $500K cold pitch** — high-pressure spammy framing.
  5. **Joe Nofo accepted the Final Dev Scope meeting** — confirms his attendance for Friday 2026-04-24.
- **Backfill progress:** 110 / 130+ raw inbox sources.

## [2026-04-26] ingest-batch | backfill batch 11 — final 15 from 2026-04-24

- **Sources read (15):** archive-data-requested, alert-domain-export, business-standard-welcome (×2), data-export-started, transfer-failed × 7 (admin, aldred, grace, hr, jairo, ramon, teofilo), scaled-agile-ai-customer-insights, uspto-southwest-regional-10th-anniversary, wispr-flow-stats-upgrade.
- **Discovery on entry:** the diff between `raw/inbox/2026-04-24-*` and `wiki/sources/2026-04-24-*` was misleading. **12 of 15** Google Workspace lifecycle emails were already covered by `projects/google-workspace-migration-2026.md` `covered_sources` from batch 2 — per SCHEMA email conventions ("Workspace lifecycle events: batch under a single project page rather than 20 separate pages"). Only 3 sources actually needed new pages.
- **Per-source pages created (3):** scaled-agile-ai-customer-insights, uspto-southwest-regional-10th-anniversary, wispr-flow-stats-upgrade.
- **New entity pages (1):** orgs/wispr-flow (voice-input AI productivity tool; Ramon active user).
- **Pages updated (4):**
  - projects/google-workspace-migration-2026.md — refined Timeline now that all 12 raw sources have been read directly: per-user transfer-attempt times added (Jairo 15:19, Admin 15:37, Aldred 15:38, Ramon 15:39, Grace 16:04, Teofilo 16:27, HR 16:32; range 15:19→16:32 not just 15:19); added 15:10 PT Takeout-request entry; added `verified_sources` frontmatter listing the 12 directly-read raw paths; **resolved the open question** about the "Ramon Aseniero deletion-success" — the deleted account is `ramon.aseniero@jairosoft.com`, a separate secondary account, NOT Ramon's primary `ramon@jairosoft.com`.
  - orgs/scaled-agile.md — promoted Apr 24 newsletter from "not yet ingested" to live link; source_count 2 → 3.
  - orgs/uspto.md — promoted Apr 24 SW Regional event invite to live link; source_count 4 → 5.
  - wiki/index.md — updated header, added wispr-flow to vendors section, rewrote Backfill backlog (15 remaining, all 2026-04-25).
- **Major findings:**
  1. **`ramon.aseniero@jairosoft.com` was a secondary account that was deleted** — Ramon's primary admin account (`ramon@jairosoft.com`) is intact. Resolves the longest-standing open question on the workspace migration project.
  2. **Transfer attempts spanned 73 minutes (15:19 → 16:32 PT)** — not a single-second batch. Suggests Ramon was working through users one at a time, watching results.
  3. **Wispr Flow is part of Ramon's active AI/productivity stack** (voice-input desktop tool with measurable usage history).
  4. **No new entity discoveries from the 2 newsletters** (Scaled Agile / USPTO) — both are recurring senders with established org pages; just appended to their activity logs.
- **Milestone:** **2026-04-18 → 2026-04-24 are now fully ingested.**
- **Backfill progress:** 113 / 134 raw inbox sources.

## [2026-04-26] ingest-batch | backfill batch 12 — final 15 from 2026-04-25 (CORPUS COMPLETE)

- **Sources read (15):** 5 GWS deletion-success (admin, aldred, hr, jairo, ramon-aseniero) + google-takeout-data-ready + 3 mark-colina solar (24kw-hybrid, hybrid-36kw, grid-tie-package) + 2 microsoft365 invoices (business-basic, business-standard) + azure-billing-statement-march + anthropic-secure-login-link + portfolio-health-dashboard-apr25 + outlook-undeliverable-test2.
- **Strategy:** 6 of the 15 (5 deletion-success + takeout-data-ready) were already in `projects/google-workspace-migration-2026.md` `covered_sources` from batch 2 — verified content matched, added to `verified_sources` frontmatter, refined Timeline with per-user deletion times. 9 sources got new per-source pages.
- **Per-source pages created (9):** mark-colina-24kw-hybrid-solar, mark-colina-grid-tie-package, mark-colina-hybrid-36kw-solar, microsoft365-business-basic-invoice, microsoft365-business-standard-invoice, azure-billing-statement-march, anthropic-secure-login-link, portfolio-health-dashboard-apr25, outlook-undeliverable-test2.
- **New entity pages (2):**
  - orgs/microsoft-365 (email backbone for jairosoft.com; 2 parallel tiers Basic + Standard, both renew Aug 1 2026).
  - projects/jairosoft-solar-facility-evaluation-2026 (5 vendor proposals received in single Mark-Colina batch — 24KW Hybrid, 36KW Hybrid, 20/30/36KW Grid Tie).
- **Pages updated (8):**
  - projects/google-workspace-migration-2026 — added 6 raw paths to `verified_sources`; refined deletion timing (12:06 → 12:10 PT per-user); affirmed Grace + Teofilo retention (no deletion notices in Apr 25 batch); resolved `ramon.aseniero@` secondary-account question for the second time with confirming evidence from the deletion-success notice itself.
  - people/mark-colina — confirmed email `mcolina@jairosoft.com`; reframed role as "facilities / vendor procurement liaison"; corrected earlier hypothesis that solar was for Aseniero family (it's for Jairosoft); source_count 4 → 7.
  - orgs/anthropic — added Apr 25 magic-link source; activity now shows recurring Claude.ai usage cadence; source_count 3 → 4.
  - orgs/azure — added Apr 25 billing source; resolved Sponsorship-funding open question (credit-card auto-charge for overage); added subscription + tenant IDs; source_count 1 → 2.
  - projects/portfolio-health-dashboard — promoted Apr 24 + Apr 25 sources from "not yet ingested" to live links; confirmed daily cadence (3 consecutive days); source_count 1 → 3.
  - orgs/jairosoft — added Solar Facility Evaluation to active engagements; source_count 103 → 113.
  - people/ramon-aseniero — added solar project link + 7 new 2026-04-25 activity entries (Mark Colina solar batch, NDR jairosoft.dev, M365 invoices, Azure, Anthropic, Portfolio); source_count 103 → 113.
  - wiki/index.md — full rewrite of header (corpus complete!), added microsoft-365 + jairosoft-solar-facility-evaluation-2026, added 3 new this-week open items, added new "Vendor planning (Aug 1 cliff)" section.
- **Major findings:**
  1. **Mark Colina solar proposals are FOR JAIROSOFT, not Aseniero family.** Filenames (`Solar - Jairosoft NNkw.docx`) + recipient triplet (Ramon + Marikriss + Grace = facilities/capex panel) + Mark's `mcolina@jairosoft.com` email confirm institutional procurement. Likely PH facility (JAIROSOFT, INC. site).
  2. **Jairosoft runs TWO Microsoft 365 subscriptions in parallel** (Business Basic + Business Standard for JAIROSOFT LLC); both renew Aug 1, 2026 — natural consolidation decision point. New `orgs/microsoft-365` page surfaces this for review.
  3. **`jairosoft.dev` domain test (NDR test2)** — Ramon sent test message to `ramon@jairosoft.dev`, bounced 550 5.1.1 (recipient unknown). "test2" suggests a "test1" attempt earlier. Possible new-domain initiative or developer-portal planning.
  4. **GWS deletion timing reconstructed minute-by-minute:** Admin 12:06, Jairo 12:07, Ramon 12:07, HR 12:09, Aldred 12:10 — a 4-minute deletion sweep. Grace + Teofilo notably absent from the deletion batch (confirms retention).
  5. **Azure Sponsorship details surfaced:** subscription ID `4134986b-...`, tenant `67d24c93-...` — useful for future vendor reconciliation.
  6. **Recurring AI-usage signal:** 3rd Anthropic magic-link in 5 days + Apr 24 extra-usage credit confirms Ramon is an active Claude.ai user (not just an administrator).
  7. **Daily Portfolio Health Dashboard cadence** confirmed across 3 days.
- **Milestone:** **CORPUS COMPLETE.** All 134 raw inbox files (2026-04-18 → 2026-04-25) are now in the wiki. 106 per-source pages + 22 in workspace project covered_sources + 6 in vendor-onboarding clusters (Duet ×3, Anthropic Education ×3) = 134. ✓
- **Suggested next steps:** lint pass for orphans/stubs/stale claims; consider promoting some multi-day correspondence (Hishaam, Aloha JV v2, Shannon-Flawless) to `wiki/threads/` pages; bring in fresh emails from 2026-04-26 onward.

## [2026-04-26] analyses | first 3 analyses pages from corpus-complete state

- **Created:**
  - `wiki/analyses/productivity-suite-duplication.md` — surfaces M365 (Basic + Standard) + Google Workspace Business Standard parallel spend; lays out 4 decision options ahead of the 2026-08-01 M365 renewal cliff.
  - `wiki/analyses/ai-vendor-enablement-2026.md` — documents Ramon's ~6-day deliberate multi-vendor AI investment burst (Anthropic + OpenAI + AWS + Google Cloud + GEAR + Wispr Flow + Scaled Agile).
  - `wiki/analyses/critical-deadlines-apr27-aug1.md` — date-ordered table of all hard-deadline commitments through Aug 1, with density observations.
- **Updated:**
  - `wiki/index.md` — added Analyses subsection under Topics/Threads/Analyses; bumped analyses count 0 → 3.
- **Method:** synthesized from corpus state at end of batch 12 (no new raw reads). Each analysis is a derived view that the per-page wiki structure didn't naturally hold.
- **Why these three first:** productivity-suite duplication is the most actionable ($$ implication, fixed deadline); AI-vendor enablement is the most pattern-revealing (compressed-week posture wasn't visible from any single source); deadlines page is the most operationally useful day-to-day.

## [2026-05-05] ingest | 2026-04-20-hishaam-compensation-expectations

- **Context:** post-restore audit of `raw/inbox/` against `wiki/` found one real ingest gap while the rest of the corpus matched prior wiki coverage or approved batched/subsumed handling.
- **Per-source page created:** `wiki/sources/2026-04-20-hishaam-compensation-expectations.md`
- **Pages updated:** `wiki/projects/hishaam-employment-opportunity.md`, `wiki/people/hishaam-namooya.md`, `wiki/people/ramon-aseniero.md`, `wiki/index.md`
- **Finding:** the Apr 20 Hishaam email confirms the hiring conversation was already date-bound around a planned **2026-04-25** call and that compensation expectations were explicitly active before the Apr 22 rescheduling email.

## [2026-05-05] ingest-batch | 2026-05-05 batch 1 — operational / opportunity signals

- **Sources read (5):** street-signage-design-proposal, adam-clear1-travel-expenses, grace-jairosoft-opex-may10-release, hiepro-p26002329-answers, summary-autoallies-autodefense-sync.
- **Per-source pages created (5):** all 5.
- **Pages updated (6):**
  - `people/adam-bernaldez.md` — now tied to a CLEAR1 travel-expense reimbursement thread.
  - `people/mary-grace-garcia.md` — added signage approval request + May 10 OpEx activity.
  - `projects/autoallies-autodefense.md` — status now reflects v2 native-app path, 1,500+ user migration plan, duplicate-app store risk, and ownership cleanup.
  - `orgs/hiepro.md` — added P26002329 as a live Q&A-stage opportunity.
  - `people/ramon-aseniero.md` — added five May 5 operational / procurement visibility items and two new open commitments.
  - `wiki/index.md` — updated page totals and backlog framing to reflect a partial 2026-05-05 ingest in progress.
- **Major findings:**
  1. **AutoDefense is more concrete than earlier pages showed** — there is now a visible v2 native-app strategy, migration plan, and platform-ownership cleanup.
  2. **Grace is driving a new operational cluster** around signage approval plus the May 10 OpEx cycle.
  3. **HIePRO P26002329** surfaced only through a Q&A notice, meaning Jairosoft may have an opportunity not yet represented by the original solicitation notice in raw.

## [2026-05-05] ingest-batch | 2026-05-05 batch 2 — planning / retention / support signals

- **Sources read (5):** summary-ad-hoc-meeting, teams-recording-expired-deleted, teofilo-pi07-feedback-survey, karl-caumban-sent-a-message-chat, summary-support-team-sync.
- **Per-source pages created (5):** all 5.
- **Pages updated (4):**
  - `people/teofilo-limpag.md` — added PI-07 feedback-survey request.
  - `projects/flawless-hawaii-wedding-app.md` — status now reflects likely iteration 7.3 planning, native-mobile access blockers, RevenueCat delay, and web 2.0 sequencing pressure.
  - `orgs/flawless-hawaii-wedding-app.md` — broadened from pure 7.1-release state to active post-release iteration planning.
  - `wiki/index.md` — updated totals and backlog framing for 10/24 of the May 5 raw batch ingested.
- **Major findings:**
  1. **Flawless is past the simple “7.1 shipped cleanly” phase** — the product now appears to be in iteration 7.3 planning with real mobile/platform blockers.
  2. **Support-team operations are recurring, not ad hoc** — signage and installation work is showing up both as direct approval mail and in support-team planning summaries.
  3. **Most remaining May 5 mail is lower-signal notification traffic**, so the ingest queue is becoming more about inbox memory coverage than major project-state changes.

## [2026-05-05] ingest-batch | cross-date batch 3 — migration, security, role-scope, LPM

- **Sources read (5):** google-workspace-data-export-complete, jairo-program-alignment-lpm-review (Apr 27), jairo-program-alignment-lpm-review (Apr 28), azure-devops-personal-access-token-added, adam-h1b-actual-project-role.
- **Per-source pages created (5):** all 5.
- **Pages updated (7):**
  - `projects/google-workspace-migration-2026.md` — now explicitly records that the domain export completed and reframes the remaining question as archive retention rather than export completion.
  - `people/adam-bernaldez.md` — now shows both the CLEAR1 reimbursement thread and the GoHealth lead/senior-developer scope statement.
  - `projects/gohealth-jairosoft-engineering-engagement.md` — sharpened Adam's real delivery role and integration ownership.
  - `people/karl-caumban.md` — added LPM/FinOps/QA-automation responsibilities from Apr 27-28 summaries.
  - `people/bomar-sinday.md` — now tied to AI-in-QA integration work.
  - `people/ramon-aseniero.md` — added export completion, PAT security, LPM, and Adam role-scope visibility.
  - `wiki/index.md` — updated totals and represented-source counts.
- **Major findings:**
  1. **The Google Workspace export is confirmed complete** — one long-standing migration uncertainty is now closed.
  2. **Adam's actual GoHealth role is materially more senior than his formal title** — useful for staffing, immigration, and org-design conversations.
  3. **Azure DevOps PAT activity expanded the security surface beyond GitHub/OpenAI** — this now needs verification alongside the other token/account alerts.

## [2026-05-05] ingest-batch | cross-date batch 4 — procurement, facilities, payment, process-health

- **Sources read (6):** general-dynamics-supplier-registration-update, hiepro-p26001887-answers, openai-macos-security-update-2, gohealth-weekly-review-summary, airpro-ac-quotation-jairosoft-inc, usbank-zelle-payment-deposited-adam.
- **Per-source pages created (6):** all 6.
- **New entity / project pages created (3):**
  - `orgs/general-dynamics`
  - `orgs/airpro`
  - `projects/jairosoft-facility-hvac-evaluation-2026`
- **Pages updated (8):**
  - `orgs/openai` — now reflects the repeated Apr 27 reminder, not just the initial Apr 21 notice.
  - `orgs/hiepro` — now includes P26001887 as another Q&A-stage opportunity.
  - `orgs/gohealth-uc` — now flags process-health strain on the engineering side.
  - `projects/gohealth-jairosoft-engineering-engagement` — now records the Apr 29 weekly-review signal about unresolved production issues and QA / PM breakdown risk.
  - `people/adam-bernaldez` — now includes the May 2 Zelle deposit confirmation.
  - `people/mark-colina` — now includes the AIRPRO facilities-quotation thread.
  - `people/ramon-aseniero` — now includes the supplier-refresh, P26001887, repeated OpenAI reminder, AIRPRO, GoHealth review, and Adam payment visibility.
  - `orgs/jairosoft` / `wiki/index.md` — now catalog the new HVAC facilities thread and updated represented-source totals.
- **Major findings:**
  1. **A second facilities-capex track is now visible** beyond solar: AIRPRO is in a real HVAC quotation stage after site inspection for JAIROSOFT INC.
  2. **GoHealth process-health concerns intensified by Apr 29** — the weekly-review summary is stronger than the earlier alignment notes and should be treated as a real warning signal, even though it is AI-generated.
  3. **General Dynamics supplier maintenance** implies Jairosoft is already inside at least one defense-enterprise supplier registry, which may be worth preserving.
  4. **P26001887** adds another HiePro bid/no-bid decision to the DOTAX-gated public-sector backlog.

## [2026-05-05] lint | full wiki after cross-date batch 4

- **Orphans:** `analyses/critical-deadlines-apr27-aug1`, `orgs/duet-display`, `projects/shannon-nofo-app-development`, and source pages `2026-04-20-figma-subscription-receipt-apr19`, `2026-04-20-github-password-changed`, `2026-04-24-google-cloud-next-day2-recap`, `2026-04-24-google-keyword-cloud-next-26-highlights`, `2026-04-24-hbr-driving-lyft-into-future`, `2026-05-05-karl-caumban-sent-a-message-chat`, `2026-05-05-summary-support-team-sync`, `2026-05-05-teams-recording-expired-deleted`.
- **Broken link:** `people/luke-colina` still points to non-existent `[[people/mark-colina-solar]]`; should point to `[[people/mark-colina]]` or drop the alias-style link.
- **Index drift:** uncataloged pages remain under `orgs/` (`delta-capital-group`, `opengov-procurement`, `tricentis`), `people/` (`adam-bernaldez`, `aldred-donayre`, `bomar-sinday`, `bon-cueva`, `calvin-john-dalino`, `daryl-estrada`, `earl-carino`, `jerlyn-ates`, `jovanne-vicentino`, `jove-moralde`, `rommel-senillo`, `sholom-kraus`), and `projects/` (`joe-mrm-proposal-v2`, `portfolio-health-dashboard`).
- **Thin pages:** repeated stubs remain across internal/external people (`abdul-samad`, `ike-yana`, `mary-secusana`, `millad-ramy`, `sholom-kraus`) and a few thin org/project/source pages (`rsrit`, `shannon-nofo-app-development`, several low-signal source pages).
- **Stale claims / overdue framing:** `projects/google-workspace-migration-2026`, `projects/final-dev-scope-aloha-roadway`, and the `wiki/index.md` open-action snapshot still frame several pre-2026-05-05 deadlines as if they are upcoming, rather than overdue or unresolved.
- **Remaining raw-only backlog:** 22 inbox files are still intentionally raw-only or not yet ingested, dominated by 2026-05-05 notifications plus the three 2026-04-26 Goldenboy solar forwards.

## [2026-05-05] ingest-batch | cross-date batch 5 — solar vendor corroboration, OneDrive retention, OpenAI API billing

- **Sources read (5):** mark-colina-24kw-hybrid-forward, mark-colina-hybrid-36kw-forward, mark-colina-grid-tie-package-forward, onedrive-large-number-files-deleted, openai-api-account-funded.
- **Per-source pages created (5):** all 5.
- **New entity pages created (1):**
  - `orgs/goldenboy-water-systems`
- **Pages updated (8):**
  - `projects/jairosoft-solar-facility-evaluation-2026` — vendor gap closed; Goldenboy Water Systems now named; 36KW proposal noted as revised.
  - `orgs/openai` — now reflects API billing activity in addition to security/update mail.
  - `orgs/microsoft-365` — now includes the OneDrive mass-deletion warning as a storage/retention signal.
  - `people/mark-colina`, `people/mary-grace-garcia`, `people/marikriss-aseniero` — now reflect the Outlook-captured solar-forward duplicates.
  - `people/ramon-aseniero` — now includes OneDrive deletion warning, OpenAI funding, and solar-vendor clarification.
  - `orgs/jairosoft` / `wiki/index.md` — counts and facilities-vendor framing updated.
- **Major findings:**
  1. **The solar-vendor gap is closed** — the existing Jairosoft solar proposal batch is from **Goldenboy Water Systems**.
  2. **The 36KW hybrid proposal was revised** after a panel-to-inverter adjustment, which is a useful procurement nuance not visible in the earlier IMAP-captured source.
  3. **Jairosoft is funding OpenAI API usage directly**, not only using desktop apps and account features.
  4. **A large OneDrive deletion event occurred on or before 2026-04-26**; recovery remains possible for 93 days from Microsoft's warning.

## [2026-05-05] ingest-batch | late-day batch 6 — Flawless 7.2, Luzmibel, ColinaHealth, MyBidMatch

- **Sources read (5):** carol-iteration72-release-update, luzmibel-smoke-testing-iteration72, luzmibel-invoice-apr16-30, colinahealth-architecture-discussion, mybidmatch-may5.
- **Per-source pages created (5):** all 5.
- **New entity / project pages created (2):**
  - `orgs/hawaii-apex-accelerator`
  - `projects/colinahealth-architecture`
- **Pages updated (7):**
  - `projects/flawless-hawaii-wedding-app` — now reflects Iteration 7.2 deployment and ongoing smoke testing, not just 7.1 + 7.3 planning.
  - `orgs/flawless-hawaii-wedding-app` — now shows 7.2 release activity.
  - `people/carol-cuison` — now tied directly to the Iteration 7.2 release update.
  - `people/luzmibel-paculanang` — promoted beyond stub-level AutoAllies visibility into real release and invoice activity.
  - `people/ramon-aseniero` — now includes Flawless 7.2, Luzmibel billing, ColinaHealth architecture, and MyBidMatch feed visibility.
  - `orgs/jairosoft` — now lists ColinaHealth architecture as an internal planning thread.
  - `wiki/index.md` — counts and backlog framing updated.
- **Major findings:**
  1. **Flawless is materially past the 7.1 snapshot** — Iteration 7.2 has been deployed and is in smoke testing while 7.3 planning is already active.
  2. **Luzmibel Paculanang is no longer just a stub/distribution-list participant** — she is now visible as both execution-side contributor and contractor-billing sender.
  3. **ColinaHealth** is now a named internal architecture thread, though still too thin to characterize.
  4. **MyBidMatch / Hawaii APEX Accelerator** is a distinct procurement-feed channel worth tracking separately from HiePro and SAM.gov.

## [2026-05-06] ingest-batch | May 6 selective ingest — Microsoft follow-up, Flawless smoke-test closeout, ColinaHealth details

- **Sources read (3):**
  - `raw/inbox/2026-05-06-re-microsoft-consultation-business-premium.md`
  - `raw/inbox/2026-05-06-re-approval-for-release-iteration72.md`
  - `raw/inbox/2026-05-06-summary-colinahealth-architecture-discussion.md`
- **Per-source pages created (3):** all 3.
- **Pages updated (8):**
  - `projects/flawless-hawaii-wedding-app` — advanced Iteration 7.2 from "smoke testing in progress" to "smoke testing complete with no blocking issues."
  - `orgs/flawless-hawaii-wedding-app` — now reflects the clean smoke-test completion.
  - `projects/colinahealth-architecture` — no longer just a stub; now captures AWS/network, deployment, logging, and SSM/security follow-up.
  - `orgs/microsoft-365` — now records Microsoft's active Business Premium + Copilot push and the recommended partner path.
  - `analyses/productivity-suite-duplication` — now notes that Microsoft is actively trying to steer the Aug 1 renewal decision toward Business Premium + Copilot.
  - `people/luzmibel-paculanang` — now shows the closeout step of the 7.2 release cycle, not just the in-progress note.
  - `people/ramon-aseniero` / `orgs/jairosoft` — now reflect the Microsoft follow-up, Flawless smoke-test completion, and richer ColinaHealth architecture workstream.
  - `wiki/index.md` — counts refreshed to current raw + represented totals after archives and the May 6 fetch.
- **Major findings:**
  1. **Flawless Iteration 7.2 cleared smoke testing cleanly** — the release is now beyond "in progress" and no blockers were reported.
  2. **ColinaHealth is no longer a thin placeholder** — the current corpus now shows real AWS/network, deployment, and security remediation work with named owners.
  3. **Microsoft is actively influencing the M365 renewal path** — the Business Premium + Copilot motion is now explicit, with `Emergent Software` offered as the partner route.
