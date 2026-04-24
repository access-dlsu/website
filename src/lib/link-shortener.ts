/* eslint-disable @typescript-eslint/no-explicit-any */

type RedirectResult =
  | { status: 'ok'; target_url: string; id: number }
  | { status: 'not-found' }
  | { status: 'error'; error: unknown };

export async function getRedirectTarget(DB: any, slug: string): Promise<RedirectResult> {
  try {
    const row = await DB.prepare('SELECT id, target_url, clicks, expires_at, archived FROM links WHERE slug = ?').bind(slug).first();

    if (!row) return { status: 'not-found' };

    if (row.archived) return { status: 'not-found' };

    if (row.expires_at) {
      const expires = new Date(row.expires_at).getTime();
      const now = Date.now();
      if (expires <= now) {
        try {
          await DB.prepare('UPDATE links SET archived = 1 WHERE id = ?').bind(row.id).run();
        } catch (e) {
          console.error('Failed to archive expired link', slug, e);
        }
        return { status: 'not-found' };
      }
    }

    // best-effort increment clicks
    try {
      await DB.prepare('UPDATE links SET clicks = clicks + 1 WHERE id = ?').bind(row.id).run();
    } catch (e) {
      console.error('Failed to increment clicks for', slug, e);
    }

    return { status: 'ok', target_url: row.target_url, id: row.id };
  } catch (error) {
    return { status: 'error', error };
  }
}

export type { RedirectResult };
