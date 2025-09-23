import { cookies } from 'next/headers';

export async function checkAuthFromCookies() {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('session_token')?.value;
    if (!sessionToken) {
      return { authenticated: false };
    }
    const user = JSON.parse(sessionToken);
    if (!user.id || user.hd !== 'dlsu.edu.ph') {
      return { authenticated: false };
    }
    // Add token validation here if needed
    return { authenticated: true };
  } catch (error) {
    console.error(error);
    return { authenticated: false };
  }
}
