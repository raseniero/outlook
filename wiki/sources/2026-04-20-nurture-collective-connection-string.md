---
type: source
source_path: raw/inbox/2026-04-20-nurture-collective-connection-string.md
message_id: "imap:default:INBOX:14:101157"
from: "Teofilo Limpag <tfllmpg@jairosoft.com>"
to: ["Cricket La Chica", "Ramon Aseniero"]
cc: ["Joe Nofo", "apple@mynurturecollective.com"]
date: 2026-04-20
priority: work-thread
tags: [nurture-collective, credentials, security-concern, aws-rds, postgres]
warning: contains-plaintext-credentials-in-raw
---

# Connection String for Nurture Collective

> ⚠️ **Security warning.** The raw email includes a plaintext PostgreSQL master password for the Nurture Collective production AWS RDS instance. **Credentials are intentionally redacted in this wiki page** — read the actual values from `raw/inbox/2026-04-20-nurture-collective-connection-string.md` only when needed, and treat that file as sensitive.

**One-line:** Teofilo (IT Administrator) sent the Nurture Collective AWS RDS Postgres connection details — including the plaintext master password — to Cricket and Ramon, with the client (`apple@mynurturecollective.com`) and Joe Nofo on cc.

## Key points

- **Database:** `nurture-collective.ctmqgw4iebv6.us-west-1.rds.amazonaws.com:5432` (AWS RDS Postgres in `us-west-1`).
- **User:** `[REDACTED — see raw]`
- **Password:** `[REDACTED — see raw]` (plaintext in raw email body, table format).
- **TLS:** required; CA bundle at `./global-bundle.pem` (RDS standard).
- **Audience:** internal Jairosoft (Cricket, Ramon, Joe) plus the client account `apple@mynurturecollective.com`.
- **Sample code in raw:** TypeScript with `pg` client + `aws-sdk`, region `us-west-1`.
- **Teofilo's title revealed:** "IT Administrator, Jairosoft LLC" (sign-off).

## Security assessment

- **Not a leak to a stranger** — the external cc is the credential owner (Nurture Collective).
- **Still a hygiene problem** — email is the wrong delivery channel for production credentials. Risks: forward propagation, indexed inbox search, breach of any participant's mailbox, phishing capture.
- **Recommended remediation** (added to open items below).

## Decisions / commitments

*(None — informational handoff.)*

## Action items

- [ ] **Teofilo (IT Admin):** rotate the `[REDACTED user]` password on the Nurture Collective RDS instance and re-deliver via a secrets manager (AWS Secrets Manager / 1Password / Vault) — not email.
- [ ] **Ramon / Teofilo:** establish a Jairosoft policy that production credentials never travel by email.
- [ ] **Cricket / Ramon:** treat any email-resident copies of the credential as sensitive; do not forward.

## Entities

- [[people/teofilo-limpag]]
- [[people/cricket-la-chica]]
- [[people/ramon-aseniero]]
- [[people/joe-nofo]]
- [[people/apple-nurture-collective]]
- [[orgs/nurture-collective]]
