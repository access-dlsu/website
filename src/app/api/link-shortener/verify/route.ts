import { NextResponse } from 'next/server';
import { getCloudflareContext } from '@opennextjs/cloudflare';

export async function GET() {
  try {
    const { env } = await getCloudflareContext();
    const { DB } = env;

    // Schema info
    const schema = await DB.prepare("PRAGMA table_info('links')").all();

    // Quick stats
    const statsRow = await DB.prepare('SELECT COUNT(*) as total, SUM(clicks) as clicks FROM links WHERE archived = 0').first();

    return NextResponse.json({ schema: schema.results || [], stats: statsRow || {} });
  } catch (error) {
    console.error('Error verifying links table:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
