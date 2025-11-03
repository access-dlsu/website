import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getCloudflareContext } from '@opennextjs/cloudflare';

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ isOfficer: false }, { status: 401 });
    }

    const { env } = await getCloudflareContext();
    const { DB } = env;

    // Check if the user is an officer
    const result = await DB.prepare(
      'SELECT id, name, position FROM officers WHERE email = ?'
    ).bind(session.user.email).first();

    return NextResponse.json({
      isOfficer: !!result,
      officer: result ? {
        id: result.id,
        name: result.name,
        position: result.position
      } : null
    });

  } catch (error) {
    console.error('Error checking officer status:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}