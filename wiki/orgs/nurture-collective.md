---
type: org
title: "Nurture Collective"
aliases: ["My Nurture Collective"]
tags: [client, active, healthcare-or-wellness, virtual-check-in, aws-postgres]
created: 2026-04-26
updated: 2026-04-26
source_count: 2
---

# Nurture Collective

**Type:** Client (active).
**Domain:** `mynurturecollective.com`
**Status:** Active engagement on multiple workstreams — AWS RDS Postgres infrastructure, Spanish translation work for the Virtual Check-In tool, and an active migration that Ramon is finishing.
**Domain hint:** "Virtual Check-In" tool with appointment-type / modality dropdowns + "Nurture Collective" branding strongly suggests **maternal / wellness / healthcare vertical**.

## Overview

Nurture Collective is a Jairosoft client. Active workstreams visible in the corpus:
- **Virtual Check-In tool** with multilingual dropdowns; Spanish translation policy: when client selects Spanish, **all content** (including dropdowns) translated. Decision captured 2026-04-22.
- **Database infrastructure on AWS RDS Postgres** (`us-west-1`); credentials handed off 2026-04-20 (with security-hygiene concern).
- **Underlying migration** (in progress) — Spanish translations gated on this completing.

## Key people

### Client side
- [[people/creza-evangelista]] — Primary product contact (`creza@mynurturecollective.com`).
- [[people/apple-nurture-collective]] *(Apple Sepulveda)* — On internal Nurture Collective threads.

### Jairosoft side
- [[people/teofilo-limpag]] — IT Administrator; handled the AWS RDS handoff.
- [[people/cricket-la-chica]] — On translation thread + has the AWS credentials.
- [[people/ramon-aseniero]] — Primary external face.

## Active engagements

- *(Unnamed migration project)* — Underlying data/platform migration; Ramon finishing.
- *(Spanish-translation work)* — Virtual Check-In dropdown translations (decision: all content).

## Security note

The 2026-04-20 connection-string handoff sent **plaintext production credentials over email** (to client + internal team). Open items captured to rotate credentials and adopt a secrets manager. See [[sources/2026-04-20-nurture-collective-connection-string]].

## Open items

- [ ] **Ramon:** finish the underlying migration so Spanish translations can be pushed.
- [ ] **Teofilo (Jairosoft IT):** rotate the Nurture Collective RDS master password; re-deliver via secrets manager.
- [ ] **Ramon / Teofilo:** standing policy — production credentials never travel by email.

## Related

- [[orgs/jairosoft]]
- [[people/creza-evangelista]]
- [[people/apple-nurture-collective]]
- [[people/teofilo-limpag]]
- [[people/cricket-la-chica]]
