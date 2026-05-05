---
from: Teofilo Limpag <tfllmpg@jairosoft.com>
to: Cricket La Chica, Ramon Aseniero
cc: Joe Nofo, apple@mynurturecollective.com
date: 2026-04-20 19:07 -0700
subject: Connection String for Nurture Collective
priority: work-thread
warning: contains-plaintext-credentials
---

# Connection String for Nurture Collective

> ⚠️ **This email contains plaintext database credentials.** Treat this file as sensitive; do not commit to shared repos. Consider rotating the password and moving future delivery to a secrets manager (AWS Secrets Manager / Vault).

Hi Team,

Please see the connection string for the Nurture Collective Postgres database in AWS.

| Database | Master username | Master password |
| --- | --- | --- |
| Nurture AWS Postgres | `postgressNC` | `tmHAFXAi^iXHXN89` |

## Setup

```bash
npm install pg aws-sdk && npm install -D @types/node @types/pg
```

## Sample code

```typescript
import { Client } from 'pg';
import AWS from 'aws-sdk';

AWS.config.update({ region: 'us-west-1' });

async function main(): Promise<void> {
  let password: string = '<Enter_DB_Password>';

  const client = new Client({
    host: 'nurture-collective.ctmqgw4iebv6.us-west-1.rds.amazonaws.com',
    port: 5432,
    database: 'postgres',
    user: 'postgressNC',
    password,
    ssl: {
      rejectUnauthorized: false,
      ca: require('fs').readFileSync('./global-bundle.pem').toString(),
    },
  });

  try {
    await client.connect();
    const res = await client.query('SELECT version()');
    console.log(res.rows[0].version);
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  } finally {
    await client.end();
  }
}

main().catch(console.error);
```

---

**Teofilo T. Limpag Jr.** — IT Administrator, Jairosoft LLC
