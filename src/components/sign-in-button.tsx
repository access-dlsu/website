'use client';

import { useRouter } from 'next/navigation';

interface SignInButtonProps {
  href: string;
  authenticated: boolean;
}

export function SignInButton({ href, authenticated }: SignInButtonProps) {
  const router = useRouter();
  const redirectUrl = `/academics/${href}`;
  if (authenticated) {
    return (
      <button onClick={() => router.push(redirectUrl)}>GO</button>
    );
  }
  return (
    <form action={`/api/auth/signin`} method="GET">
      <input type="hidden" name="redirect" value={redirectUrl} />
      <button type="submit">
        <img src='/img/google.svg' alt="Google" /> SIGN IN WITH DLSU
      </button>
    </form>
  );
}
