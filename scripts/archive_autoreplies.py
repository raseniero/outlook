#!/usr/bin/env python3
"""Archive auto-reply emails from @jairosoft.com senders via IMAP.

Local belt-and-suspenders companion to the server-side Graph rule. Run
periodically (cron / launchd) — it searches INBOX for messages with
`Subject: Automatic reply...` from @jairosoft.com and moves them to Archive.

Environment variables:
    IMAP_HOST       default: outlook.office365.com
    IMAP_PORT       default: 993
    IMAP_USER       required (e.g. ramon@jairosoft.com)
    IMAP_PASSWORD   basic auth password / app password
    IMAP_OAUTH_TOKEN  Microsoft OAuth2 access token (XOAUTH2). If set,
                    takes precedence over IMAP_PASSWORD. Scope required:
                    https://outlook.office.com/IMAP.AccessAsUser.All

Basic auth is disabled on most Microsoft 365 tenants — OAuth is usually
the only path. If your tenant has app passwords enabled, those also
work with IMAP_PASSWORD.

Exit codes:
    0  success (0+ messages archived)
    1  auth / connection / unexpected IMAP error
    2  missing required env var
"""

from __future__ import annotations

import base64
import imaplib
import logging
import os
import sys

HOST = os.environ.get("IMAP_HOST", "outlook.office365.com")
PORT = int(os.environ.get("IMAP_PORT", "993"))
USER = os.environ.get("IMAP_USER")
PASSWORD = os.environ.get("IMAP_PASSWORD")
OAUTH_TOKEN = os.environ.get("IMAP_OAUTH_TOKEN")

INBOX = "INBOX"
ARCHIVE = "Archive"

# RFC3501 search: quoted strings are case-insensitive substring matches
# on header fields. SUBJECT matches "Automatic reply:" variants; FROM
# matches the whole `From` header, so "@jairosoft.com" catches any
# jairosoft sender regardless of display name.
SEARCH = '(SUBJECT "Automatic reply" FROM "@jairosoft.com")'

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(message)s",
)
log = logging.getLogger("archive_autoreplies")


def xoauth2_bytes(user: str, token: str) -> bytes:
    return base64.b64encode(
        f"user={user}\x01auth=Bearer {token}\x01\x01".encode()
    )


def connect() -> imaplib.IMAP4_SSL:
    if not USER:
        log.error("IMAP_USER is required")
        sys.exit(2)

    M = imaplib.IMAP4_SSL(HOST, PORT)
    if OAUTH_TOKEN:
        M.authenticate("XOAUTH2", lambda _: xoauth2_bytes(USER, OAUTH_TOKEN))
    elif PASSWORD:
        M.login(USER, PASSWORD)
    else:
        log.error("set IMAP_PASSWORD or IMAP_OAUTH_TOKEN")
        sys.exit(2)
    return M


def archive_matches(M: imaplib.IMAP4_SSL) -> int:
    typ, _ = M.select(INBOX)
    if typ != "OK":
        log.error("failed to select %s", INBOX)
        return 0

    typ, data = M.uid("SEARCH", None, SEARCH)
    if typ != "OK":
        log.error("SEARCH failed: %r", data)
        return 0

    uids = data[0].split() if data and data[0] else []
    if not uids:
        log.info("no matching messages")
        return 0

    log.info("found %d matching messages: %s", len(uids), b",".join(uids).decode())

    moved = 0
    for uid in uids:
        # Prefer RFC 6851 MOVE (atomic). Outlook/Office365 supports it.
        typ, resp = M.uid("MOVE", uid.decode(), ARCHIVE)
        if typ == "OK":
            moved += 1
            continue
        # Fallback: COPY + \Deleted + EXPUNGE
        log.warning("MOVE failed for uid %s (%r); falling back to COPY", uid, resp)
        typ, resp = M.uid("COPY", uid.decode(), ARCHIVE)
        if typ != "OK":
            log.error("COPY failed for uid %s: %r", uid, resp)
            continue
        M.uid("STORE", uid.decode(), "+FLAGS", "(\\Deleted)")
        moved += 1

    # EXPUNGE is a no-op if MOVE was used throughout, but cheap and safe.
    M.expunge()
    log.info("archived %d message(s)", moved)
    return moved


def main() -> int:
    try:
        M = connect()
    except imaplib.IMAP4.error as e:
        log.error("auth failed: %s", e)
        return 1
    except OSError as e:
        log.error("connect failed: %s", e)
        return 1

    try:
        archive_matches(M)
    finally:
        try:
            M.logout()
        except Exception:
            pass
    return 0


if __name__ == "__main__":
    sys.exit(main())
