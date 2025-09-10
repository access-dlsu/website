import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { adminAuth } from '@/lib/firebaseAdmin';

export async function GET(req: NextRequest) {
  try {
    // Try to get the idToken from cookies
    const cookieStore = await cookies();
    const idToken = cookieStore.get('idToken')?.value;
    if (!idToken) {
      return NextResponse.json({ authenticated: false });
    }
    // Verify token and check DLSU email
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    if (!decodedToken.email?.endsWith('@dlsu.edu.ph')) {
      return NextResponse.json({ authenticated: false });
    }
    return NextResponse.json({
      authenticated: true,
      user: {
        uid: decodedToken.uid,
        email: decodedToken.email,
        name: decodedToken.name,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ authenticated: false });
  }
}
