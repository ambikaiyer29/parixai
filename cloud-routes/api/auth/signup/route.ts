// Cloud signup route — calls Supabase Auth directly.
// Copied to core/apps/web/app/api/auth/signup/route.ts by scripts/build.sh,
// replacing the local JWT implementation.

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/auth'

export async function POST(request: NextRequest) {
  const { email, password, fullName } = await request.json()

  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
  }

  const supabase = createClient()
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName ?? '' } },
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  if (!data.session) {
    // Email confirmation required — user must verify before logging in
    return NextResponse.json({ ok: true, requireLogin: true })
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
