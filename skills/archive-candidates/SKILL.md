---
name: archive-candidates
description: >
  Scan raw/inbox/ for emails safe to archive (newsletters, cold pitches,
  expired auth emails, calendar accepts/cancels, workspace lifecycle events,
  processed receipts, informational notices), look up IMAP message_ids for any
  files missing them, update those files' frontmatter with the retrieved
  message_ids, and write a timestamped candidate list to
  working/archive-candidates-YYYY-MM-DD-HHMM.md with relative links and
  message_ids ready for the /inbox-cleanup skill or manual review.
  Trigger phrases: "build archive list", "generate archive candidates",
  "what can I archive", "prep inbox cleanup", "archive candidates".
user-invocable: true
allowed-tools: >
  Read, Edit, Write, Bash,
  mcp__mail__imap_search_messages
---

# archive-candidates

Identifies emails in `raw/inbox/` that are safe to archive, backfills any missing `message_id` fields via IMAP lookup, and writes a timestamped candidate list to `working/`.

**Does NOT move emails.** Use `/inbox-cleanup` to execute the actual archiving after reviewing the list.

## Skill pipeline

```
/email-fetch          → downloads new emails (each gets a message_id)
/archive-candidates   → backfills missing message_ids, writes candidates list
/inbox-cleanup        → reads the list, shows summary, moves emails on confirmation
```

## Paths

| Path | Purpose |
|------|---------|
| `/Users/jairo/Projects/outlook/raw/inbox/` | Source — current inbox email files |
| `/Users/jairo/Projects/outlook/working/` | Output — timestamped candidate lists |
| `/Users/jairo/Projects/outlook/raw/docs/outlook-inbox-prioritization.md` | Canonical triage rubric and priority reference |

## Safe-to-archive criteria

Apply the **first matching rule**. An email is a candidate if it falls into any category below.

| Category | Signals |
|----------|---------|
| **Cold pitch / solicitation** | `priority: solicitation` AND sender is not a known recurring government/org contact (SBA, USPTO, HiePro are tracked but still archivable after review) |
| **Newsletter** | `priority: newsletter` AND does NOT contain a retirement/suspension/expiry deadline, default-ON setting change affecting org-wide behavior, or EULA change on an active subscription |
| **Expired auth / onboarding** | Subject matches: "Secure link", "authentication code", "passkey added", "Complete Sign Up", "Welcome to [Vendor]", "How can we help?", "Email confirmation" |
| **Calendar accept/cancel** | Subject starts with "Accepted:" or "Canceled:" |
| **Vendor EULA / policy update** | From AWS/Bitnami/platform vendors with subject about EULA or policy updates (no action required) |
| **Workspace lifecycle** | `priority: workspace-lifecycle` AND is a completion/success/deletion/transfer-failed notification (i.e., the action already happened — no deadline pending) |
| **Processed receipt** | `priority: billing` AND subject contains "receipt" (not "invoice" or "payment due") |
| **Informational notice** | Government/org broadcast (SBA, USPTO, DBEDT, NSBA) with no action required |

**Do NOT mark as candidates:**
- Emails with `priority: action-required`, `security`, `internal`, `business-opportunity`
- Workspace lifecycle emails with an upcoming deadline or suspension date in the future
- Billing emails containing "invoice", "payment due", or "statement" (keep for records)
- Any email explicitly flagged in `wiki/index.md` as having an open action item

## Workflow

```
Step 1: Scan raw/inbox/
  Read all .md files. Extract frontmatter fields: from, subject, date,
  priority, message_id (may be absent), summary.

Step 2: Apply safe-to-archive criteria
  Classify each file as: CANDIDATE | KEEP | SKIP (already archived)
  Group candidates by category.

Step 3: Backfill missing message_ids via IMAP
  For each CANDIDATE file where message_id is absent:
    a. Call mcp__mail__imap_search_messages on INBOX, filtering by subject
       (and from if needed to disambiguate). Use start_date/end_date from
       the file's date field if multiple results are likely.
    b. If 1 result: extract UID, construct message_id "imap:default:INBOX:14:{UID}".
       Edit the raw/inbox file to insert:
         message_id: "imap:default:INBOX:14:{UID}"
       after the `priority:` line in the frontmatter.
    c. If 0 results: mark as "(not found in IMAP)" — do not edit the file.
    d. If >1 result: use date to select the correct one; if ambiguous, mark
       as "(ambiguous — manual lookup)" and do not edit.

Step 4: Write timestamped output file
  Path: working/archive-candidates-YYYY-MM-DD-HHMM.md
  Header: title, generated datetime, total count, count with/without message_id.
  Sections: one per category (matching the criteria table above).
  Each entry:
    - [FILENAME](../raw/inbox/FILENAME) — `MESSAGE_ID`
    or:
    - [FILENAME](../raw/inbox/FILENAME) — *(not found in IMAP)*
  Add inline notes (⚠️) for entries with time-sensitive caveats (e.g.,
  "archive only after action X is complete").

Step 5: Report to user
  How many candidates found, how many message_ids backfilled, how many
  not found in IMAP, path to the output file.
```

## Output format

```markdown
# Archive Candidates
Generated: YYYY-MM-DD HH:MM
Total: N emails · N with message_id · N not found in IMAP

> For the archiving process: use `message_id` values directly with
> `mcp__mail__imap_move_message`. Entries marked *(not found in IMAP)*
> will be skipped by /inbox-cleanup.

---

## Tier 1 — Archive Immediately

### Cold Pitches / Irrelevant
- [2026-04-23-sholom-kraus-500k-funding-offer.md](../raw/inbox/2026-04-23-sholom-kraus-500k-funding-offer.md) — `imap:default:INBOX:14:101665`

### Recurring Newsletters
...

## Tier 2 — Archive (No Pending Action)
...
```

## Autonomy rules

- **Auto (no confirmation needed):** scan, classify, IMAP lookup, update frontmatter with `message_id`, write output file
- **Ask before acting:** if a file in `raw/` already has a `message_id` that conflicts with the IMAP result — show the discrepancy
- **Never delete** anything
- **Never move** emails — that is `/inbox-cleanup`'s job
- **Never modify** files in `raw/archive/`

## Note on raw/ immutability

Adding `message_id` to frontmatter is a **metadata-only enrichment** — no body content is changed. This is an approved exception to the general raw/ immutability rule, because `message_id` is a stable identifier needed by the tooling pipeline.
