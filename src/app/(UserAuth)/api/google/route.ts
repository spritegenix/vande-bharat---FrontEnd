import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import Env from '@/lib/env';

export async function POST(request: Request) {
  const { otpLessToken } = await request.json();

  // Call your backend to verify the Otpless authentication
  const res = await fetch(`${Env.BASE_URL}/auth/google`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ otpLessToken }),
  });

  if (!res.ok) {
    return NextResponse.json({ error: 'Authentication failed' }, { status: 401 });
  }

  const { token, user } = await res.json();

  // Store the token in an HTTP-only cookie
  (await cookies()).set('jwt_token', token, {
    httpOnly: true,
    // secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });

  return NextResponse.json({ success: true, user });
}
