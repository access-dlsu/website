import { NextResponse } from 'next/server';
import { getCloudflareContext } from '@opennextjs/cloudflare';

export async function POST() {
  try {
    const { env } = await getCloudflareContext();
    const { DB } = env;

    // Archive expired links (expires_at <= now) and not already archived
    const nowIso = new Date().toISOString();
    const result = await DB.prepare('UPDATE links SET archived = 1 WHERE archived = 0 AND expires_at IS NOT NULL AND datetime(expires_at) <= datetime(?)')
      .bind(nowIso)
      .run();

    return NextResponse.json({ success: true, changes: result.changes ?? null });
  } catch (error) {
    console.error('Error archiving expired links:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
