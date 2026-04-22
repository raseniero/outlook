# Outlook mail automation

Utilities for managing Outlook mail with Microsoft Graph and IMAP.

## Reusable Graph inbox rules

The rule manager is now implemented in TypeScript at
`src/createInboxRule.ts`. `scripts/create_inbox_rule.sh` is a thin compatibility
wrapper, so the existing command name still works.

It creates, updates, replaces, and deletes Microsoft 365 mail rules through
Microsoft Graph. It defaults to `upsert`, so running the same rule again updates
the existing rule with the same display name instead of creating duplicates.

Node.js 22.6 or newer is required because the wrapper runs the TypeScript entry
point directly with Node's built-in type stripping. Install the local TypeScript
tooling once:

```bash
npm install
```

If npm reports cache permission problems, rerun with
`npm install --cache /tmp/npm-cache-outlook`.

Run the CLI either through the wrapper or npm:

```bash
export GRAPH_TOKEN=<paste Graph access token>

scripts/create_inbox_rule.sh \
  --name "Archive Jairosoft auto-replies" \
  --subject-contains "Automatic reply" \
  --sender-contains "@jairosoft.com" \
  --move-to archive

npm run create-rule -- \
  --name "Archive Jairosoft auto-replies" \
  --subject-contains "Automatic reply" \
  --sender-contains "@jairosoft.com" \
  --move-to archive
```

Type-check the implementation with:

```bash
npm run typecheck
```

Required token permissions: `MailboxSettings.ReadWrite` for rule changes and
`Mail.ReadBasic` or `Mail.Read` for folder lookup. The easiest one-off token
path is Graph Explorer: sign in, consent to the scopes, then copy the access
token.

Use `--dry-run` before changing the mailbox:

```bash
scripts/create_inbox_rule.sh --dry-run \
  --name "Archive Jairosoft auto-replies" \
  --subject-contains "Automatic reply" \
  --sender-contains "@jairosoft.com" \
  --move-to archive
```

### Rule examples

Archive internal automatic replies:

```bash
scripts/create_inbox_rule.sh \
  --name "Archive Jairosoft auto-replies" \
  --subject-contains "Automatic reply" \
  --sender-contains "@jairosoft.com" \
  --move-to archive
```

Move vendor invoices to a folder named `Receipts`:

```bash
scripts/create_inbox_rule.sh \
  --name "Move vendor invoices" \
  --subject-contains "Invoice" \
  --sender-contains "@vendor.example" \
  --move-to "Receipts"
```

Mark newsletters as read and assign a category:

```bash
scripts/create_inbox_rule.sh \
  --name "Mark newsletters read" \
  --sender-contains "@newsletter.example" \
  --mark-as-read \
  --assign-category "Newsletters" \
  --stop-processing false
```

Delete an existing rule by name:

```bash
scripts/create_inbox_rule.sh \
  --mode delete \
  --name "Mark newsletters read"
```

### Config file

Store repeatable rules as JSON and run them with `--config`:

```json
{
  "displayName": "Archive Jairosoft auto-replies",
  "mailbox": "me",
  "ruleFolder": "inbox",
  "mode": "upsert",
  "sequence": 1,
  "isEnabled": true,
  "conditions": {
    "subjectContains": ["Automatic reply"],
    "senderContains": ["@jairosoft.com"]
  },
  "actions": {
    "moveToFolder": "archive",
    "stopProcessingRules": true
  }
}
```

```bash
scripts/create_inbox_rule.sh --config rules/auto-replies.json
```

For direct folder IDs, use `actions.moveToFolderId` instead of
`actions.moveToFolder`.

### Modes

- `create`: create only when no rule with the same display name exists.
- `upsert`: update the existing rule, otherwise create it. This is the default.
- `update`: update only when the rule already exists.
- `replace`: delete the existing rule, then create a new one.
- `delete`: delete the rule with the matching display name.

### Folder resolution

`--move-to` accepts well-known folder names such as `archive`, `inbox`,
`junkemail`, and `deleteditems`. Other values are looked up by display name.

Use `--move-to-folder-id` when you already have the Graph folder ID and want to
avoid lookup.

## Local IMAP poller

`archive_autoreplies.py` is a belt-and-suspenders fallback. Run it on a schedule
to catch anything the server-side Graph rule misses, or use it as a standalone
option if Graph access is blocked.

```bash
export IMAP_USER=ramon@jairosoft.com
export IMAP_OAUTH_TOKEN=<OAuth2 token>
# OR: export IMAP_PASSWORD=<app password>  # only if tenant allows basic auth

scripts/archive_autoreplies.py
```

OAuth scope for IMAP: `https://outlook.office.com/IMAP.AccessAsUser.All`.

For macOS `launchd`, wire environment variables through a wrapper script that
loads credentials from 1Password CLI, Keychain, or another credential store.
Do not put tokens in plist files.

## Current auto-reply matching

The default auto-reply example uses these predicates combined with AND:

- Subject contains `Automatic reply`
- Sender contains `@jairosoft.com`

This catches Outlook's default out-of-office subject line and internal
Jairosoft senders. It will not catch non-Outlook auto-replies that use different
subject conventions such as `Out of Office:` or `Autoreply:` unless you add
those patterns to the Graph rule and the IMAP `SEARCH` string.
