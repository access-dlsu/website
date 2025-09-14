import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(req: NextRequest) {
  try {
    // Try to get the session_token from cookies
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('session_token')?.value;
    if (!sessionToken) {
      return NextResponse.json({ authenticated: false });
    }

    // Here you might want to add token validation for better security
    // For now, we'll assume if the token exists, the user is authenticated.
    
    return NextResponse.json({ authenticated: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ authenticated: false });
  }
}
