import { redirect } from 'next/navigation';
import { checkAuthFromCookies } from '@/lib/auth';

import styles from './reviewers.module.css';

export default async function Reviewers() {
  const data = await checkAuthFromCookies();
  if (!data.authenticated) {
    redirect('/academics?error=You must be signed in to view this page.');
  }

  return (
    <div className={`${styles.notFound} pb-20 flex items-center`}>
      <h1 className="text-5xl font-bold">Hold tight! We're making some improvements.</h1>
    </div>
  );
}