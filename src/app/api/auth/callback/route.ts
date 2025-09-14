import { NextRequest, NextResponse } from 'next/server';
import { google } from 'worker-auth-providers';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  try {
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const clientId = process.env.GOOGLE_CLIENT_ID;

    if (!clientId || !clientSecret) {
      throw new Error("Missing Google OAuth credentials");
    }

    // @ts-ignore
    const { user: providerUser, tokens } = await google.users({
      options: {
        clientSecret: clientSecret,
        clientId: clientId,
        redirectUrl: `${new URL(request.url).origin}/api/auth/callback`,
      },
      request,
    });

    if (!providerUser.email?.endsWith('@dlsu.edu.ph')) {
      return NextResponse.json({ error: 'Please use your DLSU email address to sign in' }, { status: 403 });
    }

    // Set session cookie
    const cookieStore = await cookies();
    // Using providerUser object as the session token, consider serializing and signing it (e.g., with JWT) in a real app
    const sessionToken = JSON.stringify(providerUser); 
    cookieStore.set('session_token', sessionToken, { 
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60, // 1 day in seconds
      path: '/',
    });

    // Redirect to a logged-in page
    const redirectUrlValue = cookieStore.get('redirectUrl')?.value || '/members-hub';
    const redirectUrl = new URL(redirectUrlValue, request.url).toString();
    cookieStore.delete('redirectUrl');
    return NextResponse.redirect(redirectUrl);

  } catch (error: any) {
    console.log(error.message);
    return NextResponse.redirect(`${new URL(request.url).origin}/?error=Authentication%20failed`);
  }
}
