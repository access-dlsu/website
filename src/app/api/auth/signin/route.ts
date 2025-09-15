import { NextRequest, NextResponse } from 'next/server';
import { google } from 'worker-auth-providers';
import { cookies } from 'next/headers';

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const redirectUrl = `${url.origin}/api/auth/callback`;
    const customRedirect = url.searchParams.get('redirect');
    const fromUrl = customRedirect || req.headers.get('referer');

    if (fromUrl) {
      const cookieStore = await cookies();
      cookieStore.set('redirectUrl', fromUrl, {
        maxAge: 60 * 10, // 10 minutes
      });
    }

    const clientId = process.env.GOOGLE_CLIENT_ID;
    if (!clientId) {
      return NextResponse.json({ error: 'Google Client ID not configured.' }, { status: 500 });
    }

    // @ts-ignore
    let googleLoginUrl = await google.redirect({
      options: {
        clientId: clientId,
        redirectTo: redirectUrl,
        scope: 'openid email profile' as any,
      },
    });

    googleLoginUrl += '&hd=dlsu.edu.ph';

    return NextResponse.redirect(googleLoginUrl);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Unable to get login URL' }, { status: 500 });
  }
}
