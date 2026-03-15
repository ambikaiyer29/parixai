// Cloud login route — calls Supabase Auth directly.
// Copied to core/apps/web/app/api/auth/login/route.ts by scripts/build.sh,
// replacing the local JWT implementation.

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/auth'

export async function POST(request: NextRequest) {
  const { email, password } = await request.json()

  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
  }

  const supabase = createClient()
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 401 })
  }

  const response = NextResponse.json({ ok: true })
  response.cookies.set('sb-session', data.session.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  })
  return response
}
