// Supabase Auth provider — used by the cloud/SaaS build.
// This file is copied into core/apps/web/lib/auth/supabase.ts by scripts/build.sh.
// It implements the same interface as lib/auth/local.ts so all consumers are identical.

import { createServerClient, type CookieOptionsWithName } from '@supabase/ssr'
import { cookies } from 'next/headers'
import type { AuthUser } from './types'

export const COOKIE_NAME = 'sb-session'
export const COOKIE_MAX_AGE = 60 * 60 * 24 * 7 // 7 days (Supabase manages refresh)

export function createClient() {
  const cookieStore = cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet: CookieOptionsWithName[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Server Component — cookies set by middleware
          }
        },
      },
    }
  )
}

export async function getUser(): Promise<AuthUser | null> {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  return {
    id: user.id,
    email: user.email ?? '',
    fullName: user.user_metadata?.full_name ?? null,
    avatarUrl: user.user_metadata?.avatar_url ?? null,
  }
}

export async function signIn(
  _email: string,
  _password: string,
): Promise<{ user: AuthUser; token: string } | { error: string }> {
  // signIn for Supabase is handled server-side via the login route.
  // This function is provided for interface compatibility but the actual
  // cookie-setting happens in the login API route.
  return { error: 'Use /api/auth/login route for Supabase sign-in' }
}

export async function signUp(
  _email: string,
  _password: string,
  _fullName?: string,
): Promise<{ user: AuthUser } | { error: string }> {
  return { error: 'Use /api/auth/signup route for Supabase sign-up' }
}

export async function signOut(): Promise<void> {
  const supabase = createClient()
  await supabase.auth.signOut()
}
