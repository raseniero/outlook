# Outlook Inbox Cleanup — Prioritization Framework

## Category Priority Order

| Priority | Category | Action |
|----------|----------|--------|
| 1 | 🚨 Action Required | Always keep |
| 2 | 🔐 Security Notices | Always keep |
| 3 | 👥 Internal / Work Threads | Always keep |
| 4 | 💼 Business Opportunities | Always keep |
| 5 | 💰 Billing | Always keep |
| 6 | 🤖 Workspace Lifecycle Events | Evaluate by tier (see below) |
| 7 | 📰 Newsletters / Announcements | Archive (review cloud infra notices first — see below) |
| 8 | ✉️ Bounces & Solicitations | Archive; unsubscribe first if List-Unsubscribe is present (see below) |

## Workspace Lifecycle Events — Archive Tiers

| Tier | Rule | Examples |
|------|------|---------|
| **Tier 1 — Archive immediately** | Completion confirmations, duplicates, superseded start notifications | Deletion success emails, duplicate welcome emails, "export started" superseded by "export ready" |
| **Tier 2 — Archive after action** | Emails with a hard deadline attached | Download links with expiry dates (e.g., Google Takeout archives) |
| **Tier 3 — Archive if not using** | Onboarding or welcome emails | Program welcome emails — archive once you've acted on them |

## Newsletters — Review Before Archiving

Most newsletters are safe to archive directly. Exception: **cloud infrastructure notifications from Google Workspace, Azure, or AWS** that contain any of the following should be reviewed first:

- A **deadline** (retirement date, suspension date, download expiry)
- A **default-ON setting change** that affects org-wide behavior (e.g., AI features, admin controls)
- A **EULA or compliance change** tied to an active subscription

These are action items disguised as newsletters. Archive after confirming whether action is needed.

## Solicitations — Unsubscribe Workflow

For cold solicitations from compliant senders (identifiable by a `List-Unsubscribe` header):

1. Fetch the raw email (`imap_get_message_raw`)
2. Decode the base64 body and grep for `List-Unsubscribe`
3. If a one-click HTTP URL is present (`List-Unsubscribe-Post: List-Unsubscribe=One-Click`), navigate to it to unsubscribe
4. Archive the email after confirming the unsubscribe

If no `List-Unsubscribe` header exists (pure spam), skip to archive directly — do not reply or click links.

## Raw Folder Contract

The `raw/` folder mirrors Outlook's folder structure:

```
raw/
├── inbox/     ← mirrors Outlook INBOX (email-fetch writes here)
├── archive/   ← mirrors Outlook Archive (inbox-cleanup moves files here)
└── INDEX.md   ← snapshot index covering raw/inbox/ only
```

- `email-fetch` writes enriched markdown files to `raw/inbox/`
- `inbox-cleanup` moves a file from `raw/inbox/` to `raw/archive/` when archiving the corresponding email in Outlook
- `INDEX.md` is updated by `email-fetch` and covers `raw/inbox/` only
- Files are skipped on re-fetch if their `message_id` already exists anywhere under `raw/` (idempotent)
