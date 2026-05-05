# Wiki Schema

This project follows the **LLM Wiki** pattern: an LLM agent incrementally builds and maintains a structured, interlinked wiki on top of a curated raw-source corpus. This file defines the conventions and workflows the agent must follow.

**Domain:** Ramon Aseniero's work email at Jairosoft LLC (`ramon@jairosoft.com`) — clients, projects, initiatives, internal team, ongoing threads. Source corpus is the markdown email files under `raw/inbox/` and `raw/archive/`.

**Mental model:** `raw/` is the immutable factual ground truth (emails as written). `wiki/` is the LLM's evolving synthesis — entity pages, project pages, topic pages, summaries — all interlinked. The agent owns `wiki/` entirely; the human owns sourcing and direction.

---

## Layers

| Layer | Path | Owner | Mutable? |
|-------|------|-------|----------|
| Raw sources | `raw/inbox/`, `raw/archive/` | Human (via fetch tools) | Append-only |
| Schema | `SCHEMA.md`, `CLAUDE.md` | Co-evolved | Yes — version with care |
| Wiki | `wiki/**` | Agent | Yes — agent rewrites freely |

The agent **MUST NOT** edit files under `raw/`. Reading is fine. Writing happens only via the email-fetch skill or other source-ingestion tooling.

---

## Folder structure

```
outlook/
├── raw/                          # Immutable source layer
│   ├── inbox/                    # Incoming email markdown (~130+ files)
│   ├── archive/                  # Archived emails
│   └── INDEX.md                  # Raw email catalog (legacy; the email-fetch skill maintains it)
├── wiki/                         # LLM-maintained synthesis layer
│   ├── index.md                  # Catalog of all wiki pages — read FIRST when answering queries
│   ├── log.md                    # Chronological log of ingests/queries/lints
│   ├── people/                   # Individual people (internal team + external contacts)
│   ├── orgs/                     # Companies, clients, vendors, regulators
│   ├── projects/                 # Internal projects, client engagements, initiatives
│   ├── topics/                   # Cross-cutting themes (compliance, billing, AI tooling, etc.)
│   ├── threads/                  # Multi-email correspondence threads worth tracking distinctly
│   ├── sources/                  # Per-source summary pages (one per email ingested)
│   └── analyses/                 # Query-driven derived pages (comparisons, dashboards)
├── SCHEMA.md                     # This file
├── CLAUDE.md                     # Loader: tells Claude Code to follow SCHEMA.md
└── docs/                         # Pre-existing project docs (out of wiki scope)
```

---

## Page types

Every page in `wiki/` has YAML frontmatter and a structured body. Frontmatter is the contract; Dataview/grep can query it.

### Frontmatter (all pages)

```yaml
---
type: person | org | project | topic | thread | source | analysis
title: "Display title"
aliases: ["Alt names", "Acronyms"]
tags: [client, internal, vendor, ...]
created: YYYY-MM-DD
updated: YYYY-MM-DD
source_count: N              # Number of raw sources cited
---
```

Project pages add: `status`, `counterpart_org`, `counterpart_person`, `owner_us`, `started`, `target`.
Source pages add: `source_path`, `message_id`, `from`, `to`, `cc`, `date`, `priority`.
Analysis pages add: `question`, `generated`.

### Body sections by type

**person.md** — `# Name` + `Role`/`Email`/`Org` block + `## Overview` + `## Recent activity` (dated bullets newest first, each linking to a source page) + `## Related` (wikilinks).

**org.md** — `# Org` + `Type`/`Domain`/`Status` block + `## Overview` + `## Key people` + `## Active engagements` (project links) + `## Timeline` + `## Related`.

**project.md** — `# Project` + `Status`/`Counterpart`/`Owner` block + `## Overview` + `## Status now` (2–4 sentences capturing latest state — refresh on every relevant ingest) + `## Goals / scope` + `## Decisions` (dated) + `## Open items` (checkboxes with owner) + `## Timeline` + `## Sources`.

**topic.md** — `# Topic` + `## Overview` + `## Current state` (synthesis) + `## Sub-threads` (project links) + `## Sources`.

**source.md** — frontmatter + `# Subject` + `**One-line:**` + `## Key points` + `## Decisions / commitments` + `## Action items` (checkboxes) + `## Entities` (wikilinks) + `## Pull quotes` (when worth preserving verbatim).

**analysis.md** — frontmatter (with `question`) + freeform body (tables, prose, charts).

---

## Naming conventions

- **Filenames:** kebab-case, descriptive but short.
- **People:** `firstname-lastname.md`. Disambiguate when needed: `mark-colina-solar.md`.
- **Orgs:** common name, drop suffixes: `gohealth-uc.md`, `aloha-roadway.md`, `jairosoft.md`.
- **Projects:** descriptive: `gohealth-voice-ai-initiative.md`, `final-dev-scope-aloha-roadway.md`.
- **Sources:** mirror the raw filename exactly: `2026-04-24-eli-hersher-gohealth-voice-ai-thanks.md`.

---

## Cross-references

Use Obsidian-style wikilinks with path prefix: `[[orgs/gohealth-uc]]`, `[[people/eli-hersher]]`, `[[projects/gohealth-voice-ai-initiative]]`, `[[sources/2026-04-24-...]]`.

- Path-prefixed links work in Obsidian, in plain markdown viewers, and in CLI grep.
- Link an entity on first mention per H2 section; don't carpet-link every appearance.
- Raw email files are referenced as relative paths (`raw/inbox/2026-04-24-foo.md`), **not** wikilinks — they aren't part of the wiki graph.

---

## Ingest workflow

When the human says "ingest X" (path under `raw/inbox/`) or "ingest the new emails":

1. **Read the source.** Open the raw file. Note from/to/cc, date, priority, full body.
2. **Discuss takeaways briefly** with the human (1–3 sentences) — what jumps out. Wait for direction unless told to proceed.
3. **Identify entities** mentioned: people (with email addresses), orgs, projects/initiatives, topics.
4. **Read existing wiki pages** that may apply: `wiki/index.md` first, then candidate entity/project pages. Use `grep` over `wiki/` if needed.
5. **Write `wiki/sources/{filename}.md`** mirroring the raw filename. Include full frontmatter.
6. **For each entity:**
   - If page exists → update (append "Recent activity", revise "Status now", flag contradictions in a `## Conflicts` section if needed).
   - If page doesn't exist → create stub at the right path. Stubs are fine; they grow.
7. **Update or create the project/topic page** if this email moved a project forward, introduced a new initiative, or changed status.
8. **Update `wiki/index.md`** — add new pages, refresh source counts, refresh project status.
9. **Append to `wiki/log.md`** — one entry: `## [YYYY-MM-DD] ingest | {source filename}` followed by what was touched.
10. **Report back** to the human: what you wrote, what you changed, any open questions.

**Batching:** if asked to ingest many sources at once, do them in chronological order. After every ~5 sources, pause and report. Don't power through 100 files silently.

**Idempotency:** if a source already has a `wiki/sources/` page AND its content matches the raw, skip. If the raw has changed, re-ingest and note the diff in the log.

---

## Query workflow

When the human asks a question:

1. **Read `wiki/index.md`** to find candidate pages.
2. **Read those pages.** Follow wikilinks as needed.
3. **If the wiki has the answer:** synthesize and answer with citations.
4. **If the wiki is thin:** say so explicitly, then either (a) read raw sources directly to fill the gap, or (b) ask the human to point you at the right raw files.
5. **If the answer is novel/synthetic** (a comparison, a dashboard, a derived insight), offer to file it as `wiki/analyses/{slug}.md` so the work doesn't disappear into chat history.

**Citation format:** `[[wiki/page]]` for wiki pages; `raw/inbox/2026-04-24-foo.md` for raw sources.

---

## Lint workflow

When the human says "lint the wiki" or after a batch ingest, output a punch list (don't auto-fix structural things):

1. **Orphans:** pages with no inbound `[[wikilinks]]`.
2. **Stubs:** pages under ~5 lines or marked stub. Suggest a source to flesh them out.
3. **Stale claims:** for each project's `Status now`, check if newer sources contradict it.
4. **Missing pages:** entities mentioned in source pages but lacking their own page.
5. **Index drift:** ensure `index.md` reflects the actual `wiki/` filesystem.
6. **Suggest sources:** propose web searches or specific raw emails to ingest next.

---

## index.md

Content-oriented catalog. Sections: **People**, **Orgs**, **Projects**, **Topics**, **Threads**, **Sources**, **Analyses**, **Stub references** (mentioned but not yet pages).

One line per entry: `- [[path/page]] — one-line summary (N sources)`. Updated on every ingest.

Sort: alphabetical for entities; active-then-date for projects; reverse chronological for sources.

## log.md

Append-only. One entry per operation. Newest at the bottom (so `tail` shows recent activity).

```
## [YYYY-MM-DD] {ingest|query|lint|note|init} | {short label}

- Brief details (1–3 lines)
- {affected pages or sources}
```

---

## Domain notes

Pre-known seed entities (verify against sources as evidence accumulates):

**Internal — Jairosoft LLC:** Ramon Aseniero (Founder/CEO), Joe Nofo, Karl Caumban, Mary Grace Garcia, Teofilo Limpag, Carol Cuison, Ryan Castillo, Vicsante Aseniero, Marikriss Aseniero, Almera Tayao, Luke Colina, Mark Colina, Aldred Donayre, Calvin Dalino.

**Active client engagements:**
- **GoHealth UC** — Voice AI initiative; Eli Hersher (Product Owner), Derek Norton.
- **Aloha Roadway** — Final Dev Scope; Prentiss Anderson, Sean.
- **Nurture Collective** — Spanish translation; Creza Evangelista.
- **AutoAllies** — Branch Protection, AutoDefense (internal product line).
- **PNBRCI** — David Dahilig (OpEx submissions).

**Platforms / vendors (recurring):** Google Workspace (active migration: Business Starter → Business Standard, scheduled deletion 2026-05-08), Microsoft 365, Azure, AWS, Anthropic, OpenAI, GitHub, Vercel, Figma, PLDT.

**Regulators / govt:** Hawaii eProcurement (HiePro), OpenGov, USPTO, SBA, DBEDT, Hawaii DOTAX (compliance issue active as of 2026-04-21).

These seeds are starting points, not authoritative. The wiki itself is the source of truth — keep it current.

---

## Email-specific conventions

- **No-body emails** (calendar accepts, "Thanks", forwards): create a source page with a one-line body. Link the entity, don't bloat the page.
- **Reply chains:** when a subject is `Re: X`, check whether `wiki/projects/{X}.md` already exists; if so, append to its timeline rather than spinning up a new project.
- **NDRs / undeliverables:** create source page with `tags: [ndr]`. Skip entity creation unless the bounce reveals a real issue.
- **Newsletters / cold solicitations:** ingest sparingly. Recurring senders (e.g. SBA) get an org page; one-off cold pitches stay as source-only.
- **Workspace lifecycle events** (transfer failed, deletion success, suspension): batch under a single project page (e.g. `projects/google-workspace-migration-2026.md`) rather than 20 separate pages.

---

## Versioning

Treat schema changes as deliberate edits via git commit messages explaining the change. The agent should propose schema changes when existing rules don't fit a real situation, rather than silently improvising.
