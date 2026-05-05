---
name: inbox-cleanup
description: >
  Run a structured inbox cleanup for ramon@jairosoft.com. Reads enriched
  markdown files from /Users/jairo/Projects/outlook/raw/inbox/, applies the
  8-category prioritization framework, and archives safe-to-archive emails
  using the message_id field directly — no IMAP search needed. Moves the
  corresponding markdown file to raw/archive/ to mirror Outlook. Handles
  lifecycle event tiers, newsletter cloud-infra exceptions, and solicitation
  unsubscribes. Always archives — never deletes.
  Trigger phrases: "clean up inbox", "inbox cleanup", "archive newsletters",
  "process inbox", "run cleanup".
user-invocable: true
allowed-tools: >
  Read, Bash(mv:*),
  mcp__mail__imap_move_message,
  mcp__claude-in-chrome__tabs_context_mcp,
  mcp__claude-in-chrome__tabs_create_mcp,
  mcp__claude-in-chrome__navigate,
  mcp__claude-in-chrome__get_page_text
---

# inbox-cleanup

Reads enriched markdown files from `raw/inbox/`, applies prioritization rules, and archives safe-to-archive emails. Mirrors every Outlook archive action by moving the corresponding `.md` file to `raw/archive/`.

**Requires:** emails fetched with `/email-fetch` first (needs `message_id` field in frontmatter).

## Paths

| Path | Purpose |
|------|---------|
| `/Users/jairo/Projects/outlook/raw/inbox/` | Read source — current inbox emails |
| `/Users/jairo/Projects/outlook/raw/archive/` | Move target — emails after archiving |
| `/Users/jairo/Projects/outlook/docs/outlook-inbox-prioritization.md` | Prioritization rules reference |

## MCP Calls

| Call | When |
|------|------|
| `mcp__mail__imap_move_message(message_id, "Archive")` | Once per email being archived |
| `mcp__claude-in-chrome__tabs_context_mcp` | Before unsubscribing (set up browser tab) |
| `mcp__claude-in-chrome__navigate` | Navigate to `unsubscribe_url` from frontmatter |

The `account_id` is embedded in `message_id` (e.g. `imap:default:...`) — no account lookup needed.

## Workflow

```
Step 1: Read all .md files in raw/inbox/ that have a message_id field
        Skip files missing message_id (not enriched — run /email-fetch first)

Step 2: Group files by priority field

Step 3: Apply rules per category:

  action-required, security, internal, business-opportunity, billing:
    → KEEP: count and report only, no action taken

  workspace-lifecycle:
    → Tier 1 (archive immediately):
        Completion/success confirmations, duplicates,
        start notifications superseded by a completion notification
    → Tier 2 (flag — has deadline):
        Emails with expiry dates or download deadlines
        Present to user and wait for their decision
    → Tier 3 (ask user):
        Onboarding or welcome emails
        Archive only if user confirms they have acted on them

  newsletter:
    → Flag for review (do NOT auto-archive):
        Cloud provider emails (Google Workspace / Azure / AWS) containing:
        - A retirement/suspension/expiry deadline
        - A default-ON setting change affecting org-wide behavior
        - A EULA or compliance change on an active subscription
    → Archive directly: all other newsletters

  solicitation:
    → Has unsubscribe_url:
        Show sender + URL to user, ask "Should I unsubscribe and archive?"
        On yes: navigate to URL in browser, then archive
    → No unsubscribe_url OR is an NDR/bounce:
        Archive directly

Step 4: Present summary table to user before acting:
        | Category              | To archive | Flagged for review |
        |-----------------------|------------|-------------------|
        | workspace-lifecycle   | N          | N                 |
        | newsletter            | N          | N                 |
        | solicitation          | N          | N (needs unsub)   |
        List flagged items individually with the reason

Step 5: On user confirmation — for each approved email:
        a. Call mcp__mail__imap_move_message(message_id, destination="Archive")
        b. mv raw/inbox/{filename}.md raw/archive/{filename}.md

Step 6: Report — N archived per category, N left flagged for review
```

## Autonomy Rules

- **Auto after single confirmation:** Tier 1 lifecycle events, non-cloud-infra newsletters, NDR bounces
- **Ask before acting:** Tier 2 lifecycle events (deadline check), Tier 3 lifecycle events, cloud-infra newsletter exceptions
- **Always ask before unsubscribing:** Show sender + `unsubscribe_url`, wait for explicit "yes"
- **Never delete** — destination is always `Archive` mailbox, never `Deleted Items`
- **Always move the .md file** alongside the Outlook action — the two must stay in sync
