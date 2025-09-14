import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import styles from './reviewers.module.css';

export default async function Reviewers() {
  // Get cookies from the request
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('session_token')?.value;

  if (!sessionToken) {
    redirect('/academics');
  }

  return (
    <div className={`${styles.notFound} pb-20 flex items-center`}>
      <h1 className="text-5xl font-bold">Hold tight! We're making some improvements.</h1>
    </div>
  );
}