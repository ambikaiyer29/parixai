// Storage barrel — Supabase Storage implementation for cloud/SaaS deployments.
// This file is copied to core/apps/web/lib/storage/index.ts by scripts/build.sh.
import { supabaseStorageProvider } from './supabase'
import type { StorageProvider } from './types'

export function getStorage(): StorageProvider {
  return supabaseStorageProvider
}

export type { StorageProvider }
