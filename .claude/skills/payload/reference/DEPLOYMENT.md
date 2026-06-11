# Deployment (Vercel)

This project deploys to Vercel via GitHub auto-deploy (push to `main` →
production build). Production stack:

- **Database**: Neon Postgres, connected via `vercelPostgresAdapter` (`@payloadcms/db-vercel-postgres`).
  `POSTGRES_URL` and friends are injected by Vercel's Neon integration.
- **Media storage**: Vercel Blob, via `vercelBlobStorage` plugin in `src/plugins/index.ts`
  (Vercel's filesystem is ephemeral, so uploads must go to Blob, not `public/media`).
- **Schema migrations**: `prodMigrations: migrations` is set on the db adapter in
  `src/payload.config.ts`. On production cold start (`NODE_ENV === 'production'`),
  the adapter automatically runs any pending migrations from `src/migrations/`
  against `payload_migrations` table — no manual migration step needed at deploy time.

## Generating a new migration (CLI workaround)

`payload migrate:create` and `payload migrate` (the documented CLI commands) are
**broken** in this environment — they fail with:

```
Error: Error creating migration: ENOENT: no such file or directory, open 'node:crypto?tsx-namespace=...'
```

This is a `tsx@4.22.4` loader bug in `payload/bin.js`'s use of `tsImport()`, not
specific to this project's code. `--disable-transpile` and `--use-swc` both fail
differently. **Workaround**: call the Local API directly with plain `tsx` (bypass
`payload/bin.js` entirely).

After changing any collection/field/global config, run:

```ts
// gen-migration.ts (delete after running)
import { getPayload } from 'payload'
import config from './src/payload.config'

const payload = await getPayload({ config })
await payload.db.createMigration({ payload, migrationName: 'descriptive_name' })
process.exit(0)
```

```bash
npx -y tsx --env-file=.env gen-migration.ts
```

This diffs the current schema against `src/migrations/` and writes a new
`<timestamp>_descriptive_name.{ts,json}` file plus updates `src/migrations/index.ts`.
Commit the generated migration files — `prodMigrations` applies them automatically
on the next deploy. No need to run `payload.db.migrate()` manually unless testing
locally against the prod DB.

## Useful commands

```bash
vercel ls my-website --scope anthony-personal-site-projects --format json   # recent deployments
vercel inspect <deployment-url> --scope anthony-personal-site-projects      # build details/logs
```
