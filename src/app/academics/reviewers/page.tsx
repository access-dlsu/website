import { redirect } from 'next/navigation';
import { checkAuthFromCookies } from '@/lib/auth';
import Reviewers from './client';

export default async function ReviewersPage() {
  const auth = await checkAuthFromCookies();
  if (!auth.authenticated) {
    redirect('/academics?error=You must be signed in to view this page.');
  }

  return <Reviewers />
}