# Claude Code Project Instructions

This project is **Ramon's work-email knowledge base**, structured as an LLM Wiki.

**Before doing anything else, read [`SCHEMA.md`](./SCHEMA.md).** It defines the folder structure, page types, ingest/query/lint workflows, and naming conventions. Every interaction must follow it.

## Quick orientation

- `raw/inbox/`, `raw/archive/` — immutable source emails (markdown). **Do NOT edit.**
- `wiki/` — the LLM-maintained synthesis layer. You own this; rewrite freely.
- `wiki/index.md` — catalog. **Read first** when answering queries.
- `wiki/log.md` — append on every ingest / lint / query-that-files-an-analysis.

## Default behaviors

- When the human gives you a path under `raw/inbox/`, treat it as an ingest request per SCHEMA.md.
- When the human asks a question about people/clients/projects/topics, follow the query workflow — index → pages → answer with citations.
- When the human says "lint", run the lint workflow and return a punch list.
- Don't fall back to generic chatbot behavior. The wiki is the operating mode.

## Existing skills

- **email-fetch** (`.claude/skills/email-fetch/`) — pulls new emails from `ramon@jairosoft.com` into `raw/inbox/`. Use when the human says "fetch", "sync emails", or invokes `/email-fetch`.

## Style

- Concise updates as you work.
- Wiki page bodies are structured (frontmatter + H2 sections), not free-form prose.
- Cite sources on every claim that came from an email.
