---
name: email-fetch
description: >
  Fetch recent or unread emails from the ramon@jairosoft.com INBOX and save
  them as enriched markdown files in /Users/jairo/Projects/outlook/raw/inbox/.
  Each file gets priority classification, a one-line summary, the stable IMAP
  message_id, and an unsubscribe_url if present. Also updates INDEX.md.
  Trigger phrases: "fetch emails", "fetch emails today", "fetch emails
  yesterday", "fetch emails YYYY-MM-DD", "fetch emails YYYY-MM-DD to
  YYYY-MM-DD", "download inbox", "pull new emails", "update raw folder",
  "sync inbox".
user-invocable: true
allowed-tools: >
  Read, Write, Edit, Bash,
  mcp__mail__list_all_accounts,
  mcp__mail__imap_search_messages,
  mcp__mail__imap_get_message,
  mcp__mail__imap_get_message_raw
---

# email-fetch

Downloads INBOX emails for a specific day or date range as enriched markdown
files into `raw/inbox/`.

## Paths

| Path | Purpose |
|------|---------|
| `/Users/jairo/Projects/outlook/raw/inbox/` | Write target for new email files |
| `/Users/jairo/Projects/outlook/raw/INDEX.md` | Updated after each fetch |
| `/Users/jairo/Projects/outlook/docs/outlook-inbox-prioritization.md` | Priority classification reference |

## Inputs

| Input | Behavior |
|-------|----------|
| (none) | Default to `today` |
| `today` | Current local date (America/Los_Angeles) |
| `yesterday` | Previous local date |
| `YYYY-MM-DD` | Single day |
| `YYYY-MM-DD to YYYY-MM-DD` | Inclusive date range |

Additional optional overrides: `--unread-only`, `--limit N`.

Resolve `today` and `yesterday` using the `America/Los_Angeles` timezone.
Pass the resolved dates directly to `imap_search_messages` as `start_date` and
`end_date` — no UTC conversion is needed; the IMAP tool handles date
boundaries natively.

For a single day, set `start_date` and `end_date` to the same date.

## Output Format

Each email is saved as `YYYY-MM-DD-{slug}.md` with this frontmatter:

```yaml
---
from: Sender Name <sender@domain.com>
to: ramon@jairosoft.com
date: YYYY-MM-DD HH:MM ±ZZZZ
subject: "Email subject line"
priority: <category>
summary: "One-line plain-text summary of what this email is about"
message_id: "imap:default:INBOX:{uidvalidity}:{uid}"
internet_message_id: "<rfc2822-id@domain>"   # from Message-ID header; omit if not found
unsubscribe_url: "https://..."               # omit field entirely if not present
---

# Subject

Body in clean markdown...
```

**Priority values:** `action-required` | `security` | `internal` | `business-opportunity` | `billing` | `workspace-lifecycle` | `newsletter` | `solicitation`

**Slug:** kebab-case from subject, max 6 words. Example: `2026-04-25-google-workspace-deletion-success.md`

## Workflow

```
Step 1: Call mcp__mail__list_all_accounts to confirm account is reachable

Step 2: Parse date input
        - No date supplied → use today
        - today/yesterday → resolve in America/Los_Angeles → YYYY-MM-DD string
        - YYYY-MM-DD → single day: start_date=date, end_date=date
        - YYYY-MM-DD to YYYY-MM-DD → range: start_date=first, end_date=last
        Validate start_date <= end_date for ranges.

Step 3: Call mcp__mail__imap_search_messages on INBOX
        Parameters:
          mailbox: "INBOX"
          start_date: YYYY-MM-DD
          end_date: YYYY-MM-DD
          limit: 50 (or user-supplied --limit)
          unread_only: true if --unread-only flag supplied
        Follow next_cursor until has_more=false (cursor pagination).

Step 4: For each message_id returned:
  a. Check if message_id already exists in any file under raw/inbox/ or raw/archive/
     (grep frontmatter for message_id value) → skip if found (idempotent)
  b. Call mcp__mail__imap_get_message with:
       include_headers=true
       body_max_chars=20000   ← always set explicitly; default (2000) silently truncates
     Extract internet_message_id from the Message-ID header value
  c. If priority heuristic suggests newsletter or solicitation (by sender/subject):
       Call mcp__mail__imap_get_message_raw
       Decode base64 with:
         python3 -c "import base64, sys; print(base64.b64decode(sys.argv[1]).decode('latin-1', errors='replace'))" <b64>
       Grep decoded output for "List-Unsubscribe:" header
       If HTTP URL present AND "List-Unsubscribe-Post: List-Unsubscribe=One-Click" also present:
         Extract the https:// URL → set as unsubscribe_url
  d. Classify priority using heuristics below
  e. Write one-line summary (plain text, no markdown)
  f. Build filename slug from date + subject
  g. Write enriched markdown file to raw/inbox/

Step 5: Update INDEX.md
        Append new entries under the matching category heading.
        If no section for today's date exists, create one.

Step 6: Report — date range queried, N new files written, N skipped (already existed)
```

## Priority Heuristics

Apply the first matching rule:

| Signal | Priority |
|--------|----------|
| Subject contains: "suspend", "not compliant", "action required", "will be deleted", "will be lost", "canceled", "expir" | `action-required` |
| Sender is GitHub / Google / Microsoft / Anthropic / OpenAI AND subject contains: "password", "login", "PAT", "passkey", "authentication", "security alert", "sign-in", "verification code" | `security` |
| Sender domain is `@jairosoft.com` OR known internal project contacts | `internal` |
| Subject/sender matches: eProcurement, RFP, solicitation, BidNet, SAMs.gov, HiePRO, OpenGov, procurement | `business-opportunity` |
| Subject contains: "invoice", "payment", "billing", "statement", "receipt", "auto-paid" | `billing` |
| Sender is Google Workspace / Azure / AWS AND subject contains: "deleted", "created", "transfer", "export started", "export ready", "welcome to", "retirement", "suspension scheduled" | `workspace-lifecycle` |
| Subject contains: "Undeliverable", "NDR", "550 5.1.1", "Mail delivery failed" | `solicitation` |
| Anything remaining | `newsletter` |

When ambiguous, bias toward the **higher-priority** category.

## Autonomy Rules

- **Auto (no confirmation needed):** Write new files, update INDEX.md
- **Ask before overwriting** an existing file — show what changed and wait for approval
- **Never modify** files in `raw/archive/`
