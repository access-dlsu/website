import { getCloudflareContext } from '@opennextjs/cloudflare';

// Cloudflare Workers scheduled handler
export const scheduled = async () => {
  try {
    const { env } = await getCloudflareContext();
    const { DB } = env;

    const nowIso = new Date().toISOString();
    const result = await DB.prepare('UPDATE links SET archived = 1 WHERE archived = 0 AND expires_at IS NOT NULL AND datetime(expires_at) <= datetime(?)')
      .bind(nowIso)
      .run();

    console.log('Scheduled archive ran, changes:', result.changes);
  } catch (error) {
    console.error('Scheduled archive error:', error);
  }
};
