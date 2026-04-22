# Auto-reply archiver

Two ways to archive `Automatic reply:*` messages from `@jairosoft.com` senders.

## B — Server-side rule via Microsoft Graph (recommended)

Creates a persistent inbox rule in Microsoft 365. Runs on Microsoft's servers, so it works whether or not any client is connected.

```bash
export GRAPH_TOKEN=<paste Graph access token>
./create_inbox_rule.sh
```

Scopes required on the token: `MailboxSettings.ReadWrite`, `Mail.Read`.
Easiest way to get a token once: [Graph Explorer](https://developer.microsoft.com/graph/graph-explorer) → sign in → **Access token** tab.

The script resolves the `Archive` folder id via Graph, then `POST`s the rule. Re-running creates a duplicate — delete old rules first via OWA or `DELETE /me/mailFolders/inbox/messageRules/{id}`.

## C — Local IMAP poller

Belt-and-suspenders — run on a schedule to catch anything the server rule misses (or as a standalone if Graph access is blocked).

```bash
export IMAP_USER=ramon@jairosoft.com
export IMAP_OAUTH_TOKEN=<OAuth2 token>   # preferred
# OR: export IMAP_PASSWORD=<app password>  # only if tenant allows basic auth
./archive_autoreplies.py
```

OAuth scope for IMAP: `https://outlook.office.com/IMAP.AccessAsUser.All`.

### Schedule it (macOS launchd)

Save as `~/Library/LaunchAgents/com.jairosoft.archive-autoreplies.plist` and `launchctl load` it to run every 30 minutes. Wire up env vars via a wrapper script that sources your credential store (1Password CLI, Keychain, etc.) — don't put tokens in plist files.

## How matching works

Both paths use the same two predicates combined with AND:

- Subject contains `Automatic reply`
- Sender (display name or address) contains `@jairosoft.com`

This catches Outlook's default OOO subject line and any internal Jairosoft sender. It **won't** catch non-Outlook auto-replies that use different subject conventions (`Out of Office:`, `Autoreply:`, etc.) — add those patterns to both the Graph rule `subjectContains` array and the IMAP `SEARCH` string if you want wider coverage.
