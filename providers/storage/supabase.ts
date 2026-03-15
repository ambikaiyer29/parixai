// Supabase Storage provider — used by the cloud/SaaS build.
// This file is copied into core/apps/web/lib/storage/supabase.ts by scripts/build.sh.
// It implements the StorageProvider interface from lib/storage/types.ts.

import { createClient } from '@supabase/supabase-js'
import type { StorageProvider } from './types'

const BUCKET = 'test-case-assets'

function createServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  )
}

export const supabaseStorageProvider: StorageProvider = {
  async upload(path: string, data: ArrayBuffer, contentType: string): Promise<void> {
    const supabase = createServiceClient()
    const { error } = await supabase.storage.from(BUCKET).upload(path, data, {
      contentType,
      upsert: true,
    })
    if (error) throw new Error(`Storage upload failed: ${error.message}`)
  },

  async download(path: string): Promise<Buffer> {
    const supabase = createServiceClient()
    const { data, error } = await supabase.storage.from(BUCKET).download(path)
    if (error || !data) throw new Error(`Storage download failed: ${error?.message}`)
    return Buffer.from(await data.arrayBuffer())
  },

  async remove(paths: string[]): Promise<void> {
    const supabase = createServiceClient()
    const { error } = await supabase.storage.from(BUCKET).remove(paths)
    if (error) throw new Error(`Storage remove failed: ${error.message}`)
  },

  async getSignedUrl(path: string, expiresInSeconds: number): Promise<string> {
    const supabase = createServiceClient()
    const { data, error } = await supabase.storage
      .from(BUCKET)
      .createSignedUrl(path, expiresInSeconds)
    if (error || !data?.signedUrl) throw new Error(`Signed URL failed: ${error?.message}`)
    return data.signedUrl
  },
}
