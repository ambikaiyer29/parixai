# parixai

Cloud/SaaS build of the parixai LLM experiment dashboard, layered on top of the
[featurellm-oss](https://github.com/your-org/featurellm-oss) open-source core via a git submodule.

---

## Prerequisites

- Node.js 20+
- [pnpm](https://pnpm.io/installation)
- [Supabase CLI](https://supabase.com/docs/guides/cli/getting-started) (`brew install supabase/tap/supabase`)
- Git

---

## First-time setup

### 1. Clone with submodule

```bash
git clone --recurse-submodules <REPO_URL>
cd parixai
```

If you already cloned without `--recurse-submodules`:

```bash
git submodule update --init --recursive
```

### 2. Apply cloud overlays

This copies Supabase auth/storage providers into `core/`, patches schema references, and
adds cloud-only routes:

```bash
bash scripts/build.sh
```

### 3. Install dependencies

```bash
cd core/apps/web
pnpm install
```

### 4. Configure environment variables

Create `core/apps/web/.env.local`:

```env
# Supabase project
NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key>
SUPABASE_SERVICE_ROLE_KEY=<service-role-key>

# Postgres (use the pooler connection string from Supabase dashboard)
DATABASE_URL=postgresql://postgres.<project-ref>:<password>@aws-0-<region>.pooler.supabase.com:5432/postgres

# App URL — must match the port the dev server runs on
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Internal secret for server-to-server calls — any random string
INTERNAL_SECRET=<random-secret>
```

All values are available in the Supabase dashboard under **Project Settings → API**.

### 5. Apply Supabase migrations

```bash
# From the repo root (parixai/)
supabase link --project-ref <project-ref>
supabase db push
```

### 6. Start the dev server

```bash
# From core/apps/web/
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Updating the core submodule

When `featurellm-oss` has new commits:

```bash
cd core && git pull && cd ..
git add core
git commit -m "chore: update core submodule"
bash scripts/build.sh
```

---

## How the overlay system works

`scripts/build.sh` assembles the cloud product by:

| Step | What it does |
|------|-------------|
| Auth overlay | Copies Supabase auth provider into `core/lib/auth/` |
| DB schema overlay | Patches all Postgres schema references from `featurellm` → `parixai` |
| Storage overlay | Copies Supabase Storage provider into `core/lib/storage/` |
| Cloud routes | Copies cloud-only Next.js routes (auth callbacks, etc.) into `core/app/` |
| Package.json | Adds `@supabase/ssr` and `@supabase/supabase-js` dependencies |

The files modified inside `core/` by `build.sh` are **build artifacts** — do not commit them
to the featurellm-oss submodule.

---

## Deploying to Vercel

1. Set **Root Directory** to `core/apps/web`
2. Set **Build Command** to:
   ```
   cd ../../.. && bash scripts/build.sh && pnpm install && pnpm build
   ```
3. Add all env vars from `.env.local` to the Vercel project settings.
