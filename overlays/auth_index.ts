// Auth barrel — Supabase implementation for cloud/SaaS deployments.
// This file is copied to core/apps/web/lib/auth/index.ts by scripts/build.sh,
// replacing the local JWT implementation with the Supabase provider.
export { getUser, signIn, signUp, signOut, COOKIE_NAME, COOKIE_MAX_AGE, createClient } from './supabase'
export type { AuthUser } from './types'
