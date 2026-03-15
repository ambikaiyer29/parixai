#!/usr/bin/env bash
# ──────────────────────────────────────────────────────────────────────────────
# parixai cloud build script
#
# Assembles the cloud product by:
#   1. Initialising / updating the featurellm-oss git submodule (core/)
#   2. Overlaying cloud-specific auth and storage provider implementations
#   3. Copying cloud-only files (auth callback route, etc.)
#
# After running this script the directory structure is ready for
# `cd core/apps/web && pnpm install && pnpm build` (or Vercel deployment).
# ──────────────────────────────────────────────────────────────────────────────
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CORE="$REPO_ROOT/core"
OVERLAYS="$REPO_ROOT/overlays"
PROVIDERS_AUTH="$REPO_ROOT/providers/auth"
PROVIDERS_STORAGE="$REPO_ROOT/providers/storage"

echo "=== parixai cloud build starting ==="

# ── 1. Submodule ─────────────────────────────────────────────────────────────
echo "Updating core submodule..."
cd "$REPO_ROOT"
git submodule update --init --recursive

# ── 2. Auth overlay ──────────────────────────────────────────────────────────
AUTH_DIR="$CORE/apps/web/lib/auth"
echo "Overlaying auth provider (Supabase)..."

cp "$PROVIDERS_AUTH/types.ts"        "$AUTH_DIR/types.ts"
cp "$PROVIDERS_AUTH/supabase.ts"     "$AUTH_DIR/supabase.ts"
cp "$OVERLAYS/auth_index.ts"         "$AUTH_DIR/index.ts"
cp "$OVERLAYS/auth_middleware.ts"    "$AUTH_DIR/middleware.ts"

# ── 3. DB schema name overlay ────────────────────────────────────────────────
DB_DIR="$CORE/apps/web/lib/db"
echo "Overlaying DB schema name (parixai)..."

cp "$OVERLAYS/db_pg_schema.ts"       "$DB_DIR/pg-schema.ts"

# ── 4. Storage overlay ───────────────────────────────────────────────────────
STORAGE_DIR="$CORE/apps/web/lib/storage"
echo "Overlaying storage provider (Supabase Storage)..."

cp "$PROVIDERS_STORAGE/types.ts"     "$STORAGE_DIR/types.ts"
cp "$PROVIDERS_STORAGE/supabase.ts"  "$STORAGE_DIR/supabase.ts"
cp "$OVERLAYS/storage_index.ts"      "$STORAGE_DIR/index.ts"

# ── 5. Cloud-only app files ──────────────────────────────────────────────────
# Copy cloud-specific Next.js routes that override or supplement the core.
if [ -d "$REPO_ROOT/cloud-routes" ]; then
  echo "Copying cloud-specific routes..."
  rsync -av "$REPO_ROOT/cloud-routes/" "$CORE/apps/web/app/"
fi

# ── 6. Remove local storage serving route ───────────────────────────────────
# The OSS repo has an /api/storage/[...path] route for serving files from local
# storage. In the cloud build this is not needed — Supabase Storage serves
# files directly via presigned URLs.
STORAGE_ROUTE="$CORE/apps/web/app/api/storage"
if [ -d "$STORAGE_ROUTE" ]; then
  echo "Removing local storage serving route (not needed in cloud build)..."
  rm -rf "$STORAGE_ROUTE"
fi

# ── 7. Package.json deps ─────────────────────────────────────────────────────
# Add Supabase packages to core's package.json and remove local-only deps.
echo "Patching core package.json with Supabase dependencies..."
cd "$CORE/apps/web"
node - << 'EOF'
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));

pkg.dependencies = pkg.dependencies || {};
if (!pkg.dependencies['@supabase/ssr']) {
  pkg.dependencies['@supabase/ssr'] = '^0.5.0';
}
if (!pkg.dependencies['@supabase/supabase-js']) {
  pkg.dependencies['@supabase/supabase-js'] = '^2.43.0';
}
// Remove local-only deps if present
delete pkg.dependencies['bcryptjs'];
delete pkg.dependencies['jose'];
delete pkg.devDependencies?.['@types/bcryptjs'];

fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2) + '\n');
console.log('package.json patched.');
EOF

echo ""
echo "=== Build overlay complete ==="
echo ""
echo "Next steps:"
echo "  cd core/apps/web && pnpm install && pnpm build"
echo "  Or push to Vercel — set Root Directory to 'core/apps/web' and"
echo "  Build Command to 'cd ../../.. && bash scripts/build.sh && pnpm install && pnpm build'."
echo ""
