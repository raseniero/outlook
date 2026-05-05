# Email System Architecture

## Overview

The inbox management system has three decoupled layers. Each layer has a single responsibility and communicates through the enriched markdown files in `raw/`.

```
┌─────────────────────────────────────────────────────┐
│  FETCH LAYER       /email-fetch skill               │
│  IMAP → enriched markdown → raw/inbox/              │
└──────────────────────────┬──────────────────────────┘
                           │ writes .md files
┌──────────────────────────▼──────────────────────────┐
│  DECISION LAYER    /inbox-cleanup skill             │
│  reads raw/inbox/, applies prioritization rules     │
│  produces: archive list + flagged items             │
└──────────────────────────┬──────────────────────────┘
                           │ approved archive list
┌──────────────────────────▼──────────────────────────┐
│  ACTION LAYER      MCP + browser tools              │
│  imap_move_message → Outlook Archive                │
│  mv raw/inbox/*.md → raw/archive/                   │
│  chrome navigate  → unsubscribe URLs                │
└─────────────────────────────────────────────────────┘
```

## Layer Details

### Fetch Layer — `/email-fetch`

**Input:** Outlook INBOX via IMAP
**Output:** Enriched markdown files in `raw/inbox/`

Each file contains:
```yaml
---
from: Sender Name <sender@domain.com>
to: ramon@jairosoft.com
date: YYYY-MM-DD HH:MM ±ZZZZ
subject: "Email subject line"
priority: action-required | security | internal | business-opportunity
          | billing | workspace-lifecycle | newsletter | solicitation
summary: "One-line plain-text summary"
message_id: "imap:default:INBOX:14:XXXXX"
unsubscribe_url: "https://..."    # omitted if not present
---
```

MCP calls: `list_all_accounts` → `imap_search_messages` → `imap_get_message` → `imap_get_message_raw` (newsletters/solicitations only)

### Decision Layer — `/inbox-cleanup`

**Input:** Markdown files in `raw/inbox/`
**Output:** Archive list + flagged items presented to user

Key property: **fully decoupled from Outlook**. Rules are applied to local markdown files only. This means prioritization logic can be reviewed and adjusted without touching live email.

MCP calls: `imap_move_message` only (uses `message_id` from frontmatter — no search needed)

### Action Layer

Executed by `inbox-cleanup` after user confirmation:
- `imap_move_message(message_id, "Archive")` — moves email in Outlook
- `mv raw/inbox/{file}.md raw/archive/` — mirrors the move locally
- Browser navigation to `unsubscribe_url` — for solicitations before archiving

## Folder Sync

`raw/inbox/` and `raw/archive/` mirror Outlook. See `outlook-inbox-prioritization.md` → Raw Folder Contract for full sync rules.

**Known gap:** Emails archived in Outlook *outside* this system won't automatically move in `raw/`. A future reconciliation skill will handle this.

## Future Skills

### `/inbox-reconcile`
**Purpose:** Detect emails archived in Outlook *outside* this system (e.g. manually in the Outlook app) and sync the local `raw/` folder to match.

**How it would work:**
1. Call `imap_search_messages` on INBOX to get all current message_ids
2. Read all `message_id` values from `raw/inbox/*.md`
3. Any `raw/inbox/` file whose `message_id` is no longer in INBOX → move to `raw/archive/`
4. Report: N files reconciled

**MCP calls:** `imap_search_messages`, `Bash(mv:*)`

---

### `/inbox-process`
**Purpose:** Full session in one command — fetch new emails then immediately run cleanup.

**How it would work:**
1. Run `/email-fetch` (download and enrich new emails into `raw/inbox/`)
2. Run `/inbox-cleanup` (apply prioritization rules, archive safe emails)

**MCP calls:** delegates to both sub-skills

---

### Incremental INDEX.md (enhancement to `/email-fetch`)
**Purpose:** Instead of rebuilding INDEX.md from scratch each run, `email-fetch` should append new entries and remove entries for emails that have moved out of `raw/inbox/`.

**Current behavior:** INDEX.md is a static snapshot written manually.
**Target behavior:** After each fetch, INDEX.md reflects exactly what is in `raw/inbox/` — new emails appended under the correct category, archived emails removed.

**How it would work (inside email-fetch):**
1. After writing new `.md` files, read current INDEX.md
2. Append new email entries under the matching priority category section
3. Remove any entries whose filename no longer exists in `raw/inbox/`
4. No full rebuild needed

## Skill Files

```
/Users/jairo/Projects/outlook/skills/
├── email-fetch/SKILL.md
└── inbox-cleanup/SKILL.md
```
