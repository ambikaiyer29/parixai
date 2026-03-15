# Keeping `core/` in Sync with featurellm-oss

The `core/` directory is a git submodule pointing to the public
[featurellm-oss](https://github.com/ambikaiyer29/featurellm-oss) repository.
This document describes how to pull upstream OSS changes into the parixai cloud build.

---

## Pulling OSS updates

```bash
# 1. Update the submodule to the latest OSS HEAD
cd core
git fetch
git checkout main
git pull
cd ..

# 2. Record the new submodule pointer in this repo
git add core
git commit -m "Update core to featurellm-oss HEAD"

# 3. Re-run the build overlay to ensure providers are applied
bash scripts/build.sh
```

---

## After pulling updates

- Re-run `bash scripts/build.sh` before every build or deploy to ensure
  cloud-specific providers are overlaid on top of the updated core.
- Check `core/apps/web/lib/auth/` and `core/apps/web/lib/storage/` — they will
  be overwritten by the overlay; local OSS files in those dirs are not preserved.
- If OSS adds new dependencies (e.g. new packages in `core/apps/web/package.json`),
  run `cd core/apps/web && pnpm install` after the build overlay.

---

## Vercel deployment (dashboard app)

| Setting | Value |
|---------|-------|
| Root Directory | `core/apps/web` |
| Build Command | `cd ../../.. && bash scripts/build.sh && pnpm install && pnpm build` |
| Install Command | *(leave blank — handled by build command)* |

Required environment variables:

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
DATABASE_URL
INTERNAL_SECRET
```

---

## Pinning core to a specific OSS tag

```bash
cd core
git fetch --tags
git checkout v1.2.3   # or any tag / commit SHA
cd ..
git add core
git commit -m "Pin core to featurellm-oss v1.2.3"
```
