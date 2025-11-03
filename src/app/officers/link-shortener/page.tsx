import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { getCloudflareContext } from '@opennextjs/cloudflare';
import LinkShortenerClient from './LinkShortenerClient';

export default async function LinkShortenerPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect('/');
  }

  const { env } = await getCloudflareContext();
  const { DB } = env;

  // Check if the user is an officer
  const result = await DB.prepare(
    'SELECT id, name, position FROM officers WHERE email = ?'
  ).bind(session.user.email).first();

  if (!result) {
    redirect('/');
  }

  return (
    <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <div className="text-center space-y-6">
        <h1 className="text-5xl font-bold text-white" style={{ fontFamily: 'var(--font-poppins)' }}>
          Link Shortener
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto" style={{ fontFamily: 'var(--font-manrope)' }}>
          Create and manage shortened links for ACCESS resources and events.
        </p>

        <LinkShortenerClient />
      </div>
    </main>
  );
}