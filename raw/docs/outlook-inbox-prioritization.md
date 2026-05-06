# Outlook Inbox Triage Rubric

Canonical operational triage spec for `ramon@jairosoft.com`.

This document is the source of truth for how the repo classifies, reviews,
archives, and escalates inbox mail. It is written for both humans and skills.
When a skill needs to choose between keeping, archiving, ingesting, or
escalating an email, this document wins over ad hoc judgment.

## Purpose

This repo has three separate but related inbox workflows:

- `email-fetch` classifies raw mail into a stable machine-facing category.
- `archive-candidates` identifies items that are safe to archive.
- `inbox-cleanup` executes archive moves and preserves local/raw parity.

Those workflows already work, but they are too category-centric and not
explicit enough about the actual mailbox behavior in this repo. This rubric
adds the missing decision layer:

- what deserves immediate attention
- what can wait for a batch review
- what should stay in inbox even when it is noisy
- what is safe to archive
- what is important enough to ingest into the wiki

## Decision Contract

Every email should end in one or more of these outcomes:

- `keep-in-inbox`
- `review-same-day`
- `batch-review`
- `archive-candidate`
- `ingest-into-wiki`
- `escalate-immediately`

When multiple rules match, use this precedence:

1. hard deadline, access-loss risk, compliance failure, or security risk
2. direct internal execution, approval, or unblocker
3. finance, payroll, reimbursement, or billing processing
4. opportunity discovery and procurement review
5. notification, newsletter, or background awareness mail

Do not infer beyond the evidence in the email. If a message is thin, classify
using sender family, subject, and current workflow role; do not invent hidden
intent.

## Canonical Category Model

These are the machine-facing categories that should remain compatible with the
current repo and skills:

- `action-required`
- `security`
- `internal`
- `business-opportunity`
- `billing`
- `workspace-lifecycle`
- `newsletter`
- `solicitation`

These categories are for stable tagging and downstream automation. They are not
the full decision model by themselves.

## Urgency Overlay

Use the following human/operational urgency overlay on top of the canonical
category.

| Tier | Meaning | Default handling |
|---|---|---|
| `P1` | Immediate action or real operational risk | keep in inbox, escalate immediately |
| `P2` | Same-day review; active work or approval thread | keep in inbox, usually ingest if durable |
| `P3` | Batch review; important but not urgent individually | review in batches, ingest selectively |
| `P4` | Passive monitoring; useful context but low urgency | keep only if needed for tracking, otherwise archive candidate |
| `P5` | Ignore/archive class | archive candidate by default |

### Default mapping from repo categories

| Repo category | Default urgency |
|---|---|
| `action-required` | `P1` |
| `security` | `P1` |
| `internal` | `P2` |
| `business-opportunity` | `P3` |
| `billing` | `P2` |
| `workspace-lifecycle` | `P3` |
| `newsletter` | `P5` |
| `solicitation` | `P5` |

The rest of this document defines when to override those defaults.

## Sender and Workflow Families

### 1. Internal execution mail

Examples:
- `@jairosoft.com` senders
- direct delivery threads from Grace, Carol, Karl, Adam, Teofilo, Luzmibel
- project execution updates from internal aliases

Why it matters:
- this is your actual operating inbox
- approvals, unblockers, release status, staffing, and routing decisions live here

Default urgency:
- `P2`

Usually:
- keep in inbox
- ingest if the thread changes project state, ownership, timeline, release
  status, staffing picture, or financial obligation

Upgrade to `P1` when:
- an approval is needed before work can proceed
- a deadline or deliverable is blocked
- the message reports a live production issue or access failure

Downgrade to `P3` when:
- it is a thin reply with no durable new state
- it is a recurring sync invite with no useful body

### 2. Approvals, finance, payroll, reimbursements

Examples:
- OpEx threads
- contractor invoices and timesheets
- reimbursements
- overdue A/R follow-ups
- PLDT / M365 / Azure billing

Why it matters:
- these affect cash flow, payroll hygiene, and vendor continuity

Default urgency:
- `P2`

Usually:
- keep in inbox until processed
- ingest if the thread establishes amount, approval, owner, or payment state

Upgrade to `P1` when:
- payment is overdue and service/business impact is near
- approval is blocking release or payment

Downgrade to `P3` when:
- it is a receipt or auto-paid confirmation with no follow-up obligation

### 3. Security, identity, token, and access events

Examples:
- GitHub password or PAT changes
- OpenAI security updates
- passkey / authentication-code mail
- Azure DevOps PAT creation

Why it matters:
- these are low-volume but high-risk messages

Default urgency:
- `P1`

Usually:
- keep in inbox until verified
- ingest when the event changes the security posture or creates a durable open
  item

Downgrade to `P3` only after:
- the event is confirmed expected
- any needed follow-up is complete

### 4. Procurement feeds and opportunity discovery

Examples:
- `HiePro`
- `SAM.gov`
- `OpenGov`
- `MyBidMatch` / `Hawaii APEX Accelerator`

Why it matters:
- these create top-of-funnel opportunity visibility
- individually noisy, collectively important

Default urgency:
- `P3`

Usually:
- batch review
- keep in inbox only if not yet triaged
- ingest named, plausible-fit opportunities or follow-up Q&A notices

Upgrade to `P2` when:
- the opportunity clearly fits Jairosoft capabilities
- it has a near deadline
- it reflects an active bid already being tracked

Downgrade to `P5` when:
- it is clearly irrelevant geography/domain noise
- it is a repetitive feed item with no likely fit

### 5. Workspace and platform lifecycle

Examples:
- Google Workspace suspension, transfer, export, deletion, welcome mail
- OneDrive/SharePoint retention and deletion notices
- recording expiry / recycle-bin notices

Why it matters:
- these often look like noise but can hide destructive deadlines

Default urgency:
- `P3`

Usually:
- review before archiving
- ingest if there is a deadline, state change, retention risk, or migration
  milestone

Upgrade to `P1` when:
- mail contains suspension, cancellation, compliance loss, or expiring download
  window

Upgrade to `P2` when:
- it confirms an important platform state change or recovery window

Downgrade to `P4` or `P5` when:
- it is a completion notice already superseded by later state
- it is a duplicate welcome/onboarding message with no pending action

### 6. Teams and TeamsMaestro notification layer

Examples:
- Teams activity digests
- "X replied in Teams"
- Teams meeting recording deleted
- TeamsMaestro AI meeting summaries

Why it matters:
- this layer is where your inbox generates the most ambiguity
- some of it is pure routing noise
- some of it is the only durable blocker summary you receive

Default urgency:
- plain Teams notifications: `P4`
- TeamsMaestro summaries: `P3`

Usually:
- do not treat notification emails as source of truth
- use them to route into Teams or SharePoint
- ingest summaries only when they reveal project state, blockers, owners,
  release timing, architecture direction, finance action, or compliance risk

Upgrade TeamsMaestro summaries to `P2` when:
- they contain the clearest current blocker or release summary
- they assign owners or actions
- they materially change a tracked project page

Downgrade to `P5` when:
- they are repetitive and add no new durable state

### 7. Newsletters, events, and thought-content

Examples:
- Bubble
- GDG
- Medium
- LinkedIn
- USPTO informational mail
- Scaled Agile promotional mail

Why it matters:
- useful for awareness, but almost never operationally urgent

Default urgency:
- `P5`

Usually:
- archive candidate
- do not ingest unless the content directly changes a tracked vendor decision
  or learning commitment already in motion

Upgrade to `P3` when:
- it affects an active vendor evaluation or near-term decision already in the
  wiki
- it contains a real deadline tied to an active subscription or program

### 8. Cold pitches, bounces, and non-fit solicitations

Examples:
- generic staffing outreach
- finance cold pitches
- obvious non-fit procurement or sales spam
- NDR / bounce mail

Why it matters:
- mostly noise
- occasionally reveals domain or delivery problems

Default urgency:
- `P5`

Usually:
- archive candidate
- ingest only if the bounce or solicitation reveals a real operational issue

Upgrade to `P2` when:
- an NDR reveals a domain or routing problem you actually care about

## Archive Rules

### Never auto-archive

These should never be auto-archived without at least one explicit review pass:

- `P1` mail
- `P2` internal execution threads
- finance/payroll threads that are not clearly complete
- security mail not yet verified
- workspace/platform mail with deadlines or recovery windows
- TeamsMaestro summaries that materially change tracked project state

### Archive-safe after one confirmation

These are safe to archive after a single review/confirmation step:

- processed receipts
- duplicate platform notices
- completed lifecycle confirmations
- thin approval echoes after the underlying action is already captured
- newsletters with no active decision signal
- clearly irrelevant procurement feeds

### Default archive-candidate classes

These should normally become candidates in `archive-candidates`:

- `P5` newsletters and event mail
- cold pitches and obvious non-fit solicitations
- passive procurement digests already reviewed
- workspace completion notices with no active deadline
- recording-expired notices after confirming no restore is needed

### Manual-review classes before archive

These should remain review-driven in `inbox-cleanup`:

- Teams/TeamsMaestro summaries
- workspace lifecycle mail
- procurement feeds
- billing mail
- contractor invoices and approvals

## Workflow Contract

### `email-fetch`

`email-fetch` should keep using the canonical repo categories in raw frontmatter.
This document does **not** require replacing that field with `P1-P5`.

Required guidance:

- keep the current category vocabulary stable
- when ambiguous, classify conservatively toward the higher-impact category
- the urgency overlay is applied later by review/cleanup workflows

Specific mapping notes:

- direct Jairosoft work mail stays `internal` even if later treated as `P2`
  or `P3`
- security-adjacent billing notices from OpenAI/GitHub/etc. remain `billing`
  unless the subject clearly indicates a security event
- Teams digests may remain `internal` or `newsletter`-like in fetch output, but
  cleanup/review should apply the richer sender-family rules here

### `archive-candidates`

`archive-candidates` should derive candidate selection from this rubric, not
from newsletter-ness alone.

It should exclude from default archive candidates:

- TeamsMaestro summaries with project-state signal
- workspace lifecycle messages with deadlines or restore windows
- procurement feeds that have not yet had a first-pass triage
- internal release, architecture, payroll, or approval threads

It should strongly include:

- repetitive newsletters
- stale non-fit procurement digests
- passive alerts already operationally superseded

### `inbox-cleanup`

`inbox-cleanup` should treat this rubric as the final decision layer for what
can move safely.

Rules:

- `P1`: never auto-archive
- `P2`: keep unless the user explicitly confirms the work is done
- `P3`: batch-review first, then archive selectively
- `P4`: archive after checking for hidden operational signal
- `P5`: archive by default

Special caution:

- Teams / TeamsMaestro mail must not be archived purely because it is
  repetitive; many of those messages are the only inbox-visible summary of a
  blocker, owner, or release state

## Corpus Examples

### `P1` Immediate action

- `2026-04-21-google-workspace-storage-expired.md`
- `2026-04-21-dotax-status-not-compliant.md`
- `2026-05-05-street-signage-design-proposal.md`
- `2026-04-21-github-pat-added.md`

### `P2` Same-day review

- `2026-05-05-carol-iteration72-release-update.md`
- `2026-05-05-luzmibel-smoke-testing-iteration72.md`
- `2026-05-05-luzmibel-invoice-apr16-30.md`
- `2026-04-21-pldt-ebilling-invoice.md`
- `2026-05-05-colinahealth-architecture-discussion.md`

### `P3` Batch review

- `2026-04-23-hiepro-solicitation-q26002479-checkpoint.md`
- `2026-05-05-mybidmatch-may5.md`
- `2026-05-05-summary-ad-hoc-meeting.md`
- `2026-05-05-summary-shared-services-devops-it-uiux.md`
- `2026-04-26-onedrive-large-number-files-deleted.md`

### `P4` Passive monitor

- `2026-05-05-teams-1-reply-1-post.md`
- recording-expired notices after restore is ruled out
- duplicate lifecycle confirmations

### `P5` Archive / ignore

- `2026-05-05-bubble-product-newsletter-may26.md`
- `2026-05-05-gdg-developerweek-open-passes.md`
- LinkedIn / Medium / general thought-content digests

## Validation Checklist

A rubric change is acceptable only if:

- each canonical repo category still maps cleanly into the system
- each sender family has:
  - default urgency
  - escalation triggers
  - archive behavior
  - wiki-ingest relevance
- Teams notifications, workspace lifecycle mail, and procurement feeds have
  explicit no-guess handling
- at least 15 corpus examples can be classified without ambiguity

## Raw Folder Contract

The `raw/` folder mirrors Outlook state:

```text
raw/
├── inbox/
├── archive/
└── INDEX.md
```

- `email-fetch` writes enriched markdown files to `raw/inbox/`
- `inbox-cleanup` moves a file from `raw/inbox/` to `raw/archive/` when the
  corresponding Outlook email is archived
- `INDEX.md` reflects `raw/inbox/`
- refetch is idempotent by `message_id`

This rubric governs how those files are interpreted. It does not change the
append-only/source nature of `raw/`.
