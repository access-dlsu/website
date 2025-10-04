import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';

export async function GET() {
  const session = await auth();
  
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userInfo = {
    id: session.user.email?.replace(/[^a-zA-Z0-9]/g, '_') || '0',
    name: session.user.name || 'Unknown User',
    email: session.user.email || 'unknown@email.com'
  };

  const response = NextResponse.json({ success: true });
  
  // Set user info cookie
  response.cookies.set('user_info', JSON.stringify(userInfo), {
    maxAge: 60 * 60, // 1 hour
    httpOnly: true,
    sameSite: 'strict',
    path: '/',
    secure: process.env.NODE_ENV === 'production'
  });

  return response;
}
