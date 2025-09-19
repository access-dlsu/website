import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

import styles from './reviewers.module.css';

async function getHost() {
  const headersList = await headers();
  const host = headersList.get('host');
  const protocol = headersList.get('x-forwarded-proto') || 'https';
  return `${protocol}://${host}`;
}

export default async function Reviewers() {
  const host = await getHost();
  console.log(`Fetching ${host}/api/auth/check`);
  const res = await fetch(`${host}/api/auth/check`, {
    cache: 'no-store',
    headers: {
      cookie: (await headers()).get('cookie') || '',
    },
  });

  let data = { authenticated: false };
  const text = await res.text();
  try {
    data = JSON.parse(text);
  } catch (e) {
    const redirectUrl = new URL('/academics', host);
    redirectUrl.searchParams.set('error', text);
    redirect(redirectUrl.toString());
  }

  if (!data.authenticated) {
    const redirectUrl = new URL('/academics', host);
    redirectUrl.searchParams.set('error', 'You must be signed in to view this page.');
    redirect(redirectUrl.toString());
  }

  return (
    <div className={`${styles.notFound} pb-20 flex items-center`}>
      <h1 className="text-5xl font-bold">Hold tight! We're making some improvements.</h1>
    </div>
  );
}