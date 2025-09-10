import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

import styles from './reviewers.module.css';

export default async function Reviewers() {
  // Get cookies from the request
  const cookieStore = await cookies();
  const idToken = cookieStore.get('idToken')?.value;

  // Server-side check: call your own API route
  let authenticated = false;
  try {
    const host = (await headers()).get('host');
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
    const baseUrl = `${protocol}://${host}`;
    const res = await fetch(`${baseUrl}/api/auth/check`, {
      headers: {
        Cookie: `idToken=${idToken || ''}`,
      },
      cache: 'no-store',
    });
    const data = await res.json();
    authenticated = data.authenticated;
  } catch (e) {
    console.error(e);
    authenticated = false;
  }

  if (!authenticated) {
    redirect('/academics');
  }

  return (
    <div className={`${styles.notFound} pb-20 flex items-center`}>
      <h1 className="text-5xl font-bold">Hold tight! We're making some improvements.</h1>
    </div>
  );
}