---
from: The Google Workspace Team <workspace-noreply@google.com>
to: ramon@jairosoft.com
date: 2026-04-22 20:49 -0700
subject: "[Product Update] New Workspace Intelligence admin controls for Google Workspace starting Apr 22, 2026"
priority: notification
---

# [Product Update] Workspace Intelligence admin controls

Google is introducing **Workspace Intelligence** — an underlying AI system that gives Gemini real-time understanding of your work across Gmail, Chat, Calendar, and Drive. This eliminates the need for users to manually provide context to Gemini on every query.

## Starting April 22, 2026

- **New Admin Controls** to manage which data sources are used to ground Workspace Intelligence (it may take up to 3 days for controls to appear).
- **Default Setting:** Workspace Intelligence settings will be **default ON** for all users in your organization.

## What's not changing

- Underlying data handling practices and privacy commitments unchanged.
- AI features respect user-level content access — responses are grounded only in content the user has permission to view.
- Your data is **never used to train generative AI models** or for advertising purposes.

## Behavior when a data source is disabled

- Gemini won't actively search a disabled source, but if a user adds a specific source to their prompt, that source will still be used.
- Example: turning Drive off — users can still ask Gemini about specific files; Gemini will consult them but won't actively search for others.
- Disabling certain data sources may make some AI features unavailable.

No action is required unless you want to change the default settings.
