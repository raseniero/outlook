#!/usr/bin/env bash
#
# Create a Microsoft 365 inbox rule that moves @jairosoft.com auto-replies
# to the Archive folder. The rule is server-side and persists independently
# of any local script.
#
# Requires:
#   - jq (brew install jq)
#   - A Microsoft Graph access token with scope `MailboxSettings.ReadWrite`
#     (and `Mail.Read` to look up the Archive folder ID).
#
# Quick ways to get a token:
#   1. Graph Explorer  (https://developer.microsoft.com/graph/graph-explorer)
#      Sign in -> Access token tab -> copy. Consent to the scopes above.
#   2. Azure CLI:
#        az login
#        az account get-access-token \
#          --resource https://graph.microsoft.com \
#          --query accessToken -o tsv
#      (Requires the tenant to allow az CLI as a client.)
#
# Usage:
#   export GRAPH_TOKEN=eyJ0eXAi...
#   ./create_inbox_rule.sh
#
# Re-running creates a duplicate rule. To replace: list rules first
# (GET /me/mailFolders/inbox/messageRules), delete the old one, then run.

set -euo pipefail

: "${GRAPH_TOKEN:?Set GRAPH_TOKEN to a Microsoft Graph access token}"

RULE_NAME="Archive Jairosoft auto-replies"
GRAPH="https://graph.microsoft.com/v1.0"

echo "==> Looking up Archive folder id..."
ARCHIVE_ID=$(
  curl -fsS -H "Authorization: Bearer $GRAPH_TOKEN" \
    "$GRAPH/me/mailFolders?\$filter=displayName%20eq%20'Archive'&\$select=id,displayName" \
  | jq -r '.value[0].id // empty'
)

if [[ -z "$ARCHIVE_ID" ]]; then
  echo "ERROR: Archive folder not found via Graph. Check the folder name." >&2
  exit 1
fi
echo "    Archive id: $ARCHIVE_ID"

echo "==> Creating inbox rule: $RULE_NAME"
RESP=$(
  curl -fsS -X POST \
    -H "Authorization: Bearer $GRAPH_TOKEN" \
    -H "Content-Type: application/json" \
    "$GRAPH/me/mailFolders/inbox/messageRules" \
    -d @- <<JSON
{
  "displayName": "$RULE_NAME",
  "sequence": 1,
  "isEnabled": true,
  "conditions": {
    "subjectContains": ["Automatic reply"],
    "senderContains": ["@jairosoft.com"]
  },
  "actions": {
    "moveToFolder": "$ARCHIVE_ID",
    "stopProcessingRules": true
  }
}
JSON
)

echo "$RESP" | jq '{id, displayName, isEnabled, conditions, actions}'
echo "==> Done. Verify in Outlook: Settings > Mail > Rules."
