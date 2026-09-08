# PROGRESS / Session Memory

Keep this updated at the end of every work session. It exists so a future session (human or agent) can resume without re-deriving context.

---

## Last updated: 2026-09-08

### Repo state snapshot

- Site: ACCESS DLSU official website — **Next.js 16.3.4**, React 19.2.8, Tailwind v4.3.3, **TypeScript 6.0.3** (7.0.2 pre-verified working; blocked only by typescript-eslint until it supports ≥7.1 — flip documented in the upgrade plan), Cloudflare Workers + D1, NextAuth v5 beta.32 (Google OAuth, @dlsu.edu.ph only).
- **Upgrade Phases 0–6 EXECUTED 2026-09-08** (TS 6 + glob 13 + workers-types 5 upgraded; ESLint 10 blocked by a crash inside eslint-config-next's bundled eslint-plugin-react — retry trigger documented). Verified: lint clean, `npm run typecheck` clean (regenerates gitignored env.d.ts), Turbopack build green, opennextjs build green, **opennextjs preview served 200s on the real worker runtime**. Staging deploys pass: staging has its own D1 (`access_dlsu_db_staging`) and no external cache binding is needed (static-assets incremental cache).
- Code changes from the upgrades: `src/middleware.ts` → `src/proxy.ts` (`export { auth as proxy }`); `src/lib/db.ts` added (`getDB()` — generated `DB` binding type is optional); `res.json()` calls cast to typed shapes; `eslint.config.mjs` uses eslint-config-next 16 native flat configs (FlatCompat + `@eslint/eslintrc` removed); footer brand icons are inline SVGs (lucide v1 removed brand icons); dead deps removed (autoprefixer/comment-json/baseline-browser-mapping); `page-transition.tsx` deleted; `npm run typecheck` script added; `env.d.ts` untracked + regenerated in CI.
- **Branches**: `test` → staging deploy, `public` → production deploy (GitHub Actions `.github/workflows/deploy.yml` on push). `old-test`/`old-public` are archives. CONTRIBUTING.md's `dev`/`main` story is stale.
- **Lockfile**: `package-lock.json` is gitignored and was removed from git tracking on 2026-09-08. Builds run `npm install` (no `npm ci`). Pin versions in package.json to compensate; keep `allowScripts` entries unpinned.
- Instruction files consolidated: `AGENTS.md` is the single source (merged in CLAUDE.md + .github/copilot-instructions.md). `CLAUDE.md` is a symlink → `AGENTS.md` (see note below).

### Completed this session (2026-09-08)

1. `AGENTS.md` created and consolidated (commands, architecture, design system, branches, gotchas).
2. Full docs suite written in `docs/` (see `docs/README.md` index): package upgrade plan, Cloudflare optimization, load handling, UI standardization, modularization, simplification.
3. Dependency research done via `npm outdated` + migration guides; results frozen in `docs/upgrades/package-upgrade-plan.md`.
4. `fallow` full scan run — findings captured in `docs/simplification.md` and `docs/modularization.md`. Known false positives documented there (eslint-config-next, generate-sitemap.mjs).
5. `.gitattributes` added (LF standardization). `.codegraph/` and `.fallow/` gitignored.
6. `deploy.yml`: `npm ci` → `npm install`, `cache: npm` removed (needs lockfile).
7. `package-lock.json` untracked from git.

### Key findings worth remembering (verified in code)

- `open-next.config.ts` wires the R2 incremental cache but `wrangler.jsonc` has **no R2 binding** — must fix before ISR caching works properly (`docs/cloudflare-optimization.md` #1).
- `database/init_db.sql` schema **contradicts** migrations 003/004 (`short_code/original_url/is_archived` vs real `slug/target_url/archived`). Code follows migrations. Fix init_db.sql.
- `src/worker-scheduled.ts` is dead (no cron trigger wired anywhere) and duplicates the archive API route's SQL.
- lucide-react v1 upgrade blocker: `src/components/footer.tsx` uses `Facebook/Instagram/Github/Linkedin` — all removed brand icons in v1. Inline SVGs needed.
- framer-motion used only in `src/app/template.tsx` + dead `page-transition.tsx` → v13 upgrade is trivial here.
- Security: next-auth beta.32 + Next ≥15.5.15 needed for CVE-2026-23869 fix (installed Next was 15.5.9).

### Next steps (in recommended order)

1. **Push to `test` and verify staging** — staging deploy should now pass: staging has its own D1 (`access_dlsu_db_staging`, migrations 001–004 applied 2026-09-08: 6 officers, links schema present) and the incremental cache needs no external binding (static-assets cache). Verify OAuth sign-in + link shortener + resources on staging.accessdlsu.com.
2. **Simplification pass** — `docs/simplification.md`: delete remaining dead files (`auth.config.ts`, `auth-provider.tsx`, `loading.tsx`, `worker-scheduled.ts` — keep-or-wire decision pending), fix `init_db.sql` schema drift.
3. **Modularization P1** — `docs/modularization.md`: `requireOfficer()` extraction (6 pages; `getDB()` already landed as the pattern).
4. UI standardization + remaining modularization (P2–P6) — see respective docs.
5. Load handling improvements (Cache API on `[slug]`, click-count batching) — `docs/load-handling.md`.
6. Phase 6 majors (TS 7, ESLint 10, glob 13) — deferred; triggers documented in the upgrade plan.

### Constraints (hard)

- **Cloudflare Workers free plan only** — no Queues, 10 ms CPU/request, D1 100k writes/day, KV 1k writes/day, 100k req/day. Numbers + implications: `docs/cloudflare-optimization.md` ("Workers Free plan constraints"). Consequences already baked into docs: R2 (not KV) incremental cache, cron-based click aggregation (not Queues), pre-generate PDFs at build time, DO usage allowed but counts against request cap.
- Major-version upgrades policy: TypeScript 7 / ESLint 10 deferred until Next.js + typescript-eslint declare support (TS has zero runtime impact on Workers — tooling-only risk). Full analysis: `docs/upgrades/package-upgrade-plan.md` Phase 6.

### Open questions / decisions pending

- Symlink note: repo had `core.symlinks=false`. If `CLAUDE.md` ended up as a real file containing the text `AGENTS.md` (or a copy), re-create as symlink/hardlink when the machine supports it (Windows Developer Mode or `mklink`).
- Whether `/api/link-shortener/[slug]` route is still needed vs root `[slug]` route (see modularization P3).
- Whether to wire the scheduled archive as a real cron or drop the concept (worker-scheduled.ts).

### How to resume

1. Read `docs/README.md` → relevant doc for the task.
2. `git log --oneline -10` + this file to see where things stopped.
3. Re-run `fallow` and `codegraph status` (`.codegraph/` and `.fallow/` are local, gitignored; `codegraph init -i` if missing).
4. Verify environment: `npm install` (no lockfile — installs resolve fresh), copy `.env.example` → `.env.local` if needed.
