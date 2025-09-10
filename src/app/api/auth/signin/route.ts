import { NextRequest, NextResponse } from 'next/server';

// You must have firebase-admin initialized somewhere in your project
import { cookies } from 'next/headers';

// Import your admin instance
import adminApp, { adminAuth } from '@/lib/firebaseAdmin';

export async function POST(req: NextRequest) {
  try {
    const { idToken } = await req.json();
    if (!idToken) {
      return NextResponse.json({ error: 'Please try signing in again' }, { status: 400 });
    }
    // Verify token and check DLSU email
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    if (!decodedToken.email?.endsWith('@dlsu.edu.ph')) {
      return NextResponse.json({ error: 'Please use your DLSU email address to sign in' }, { status: 403 });
    }
    // Set session and cookie
    const cookieStore = await cookies();
    cookieStore.set('idToken', idToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60, // seconds
      path: '/',
    });
    return NextResponse.json({
      success: true,
      user: {
        uid: decodedToken.uid,
      },
    });
  } catch (error: any) {
    console.log(error.message)
    return NextResponse.json({ error: error.message || 'Unable to sign in. Please try again.' }, { status: 401 });
  }
}
