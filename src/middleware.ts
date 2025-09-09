import { NextRequest, NextResponse } from 'next/server';
import shortenedUrlsData from '../private/tinyurl.json';

// Type for the shortened URL entries
type ShortenedUrl = { path: string; url: string };
const shortenedUrls = shortenedUrlsData as ShortenedUrl[];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // Extract the first segment after '/'
  const match = pathname.split('/')[1];
  const entry = shortenedUrls.find((s) => s.path.toLowerCase() === match.toLowerCase());
  if (entry) {
    console.log(`Found TinyURL link: ${match}`);
    let redirectUrl = entry.url;
    // If the URL is relative, convert it to absolute using the request's origin
    if (redirectUrl.startsWith('/')) {
      const origin = request.nextUrl.origin;
      redirectUrl = origin + redirectUrl;
    }
    return NextResponse.redirect(redirectUrl, 301);
  }

  // Check if the pathname is not already in lowercase.
  if (pathname !== pathname.toLowerCase()) {
    // Create a new URL object with the lowercase pathname.
    const newUrl = new URL(request.url);
    newUrl.pathname = pathname.toLowerCase();

    // Perform a 308 permanent redirect to the lowercase URL.
    return NextResponse.redirect(newUrl, 308);
  }

  // Continue to next middleware or route
  return NextResponse.next();
}

// Optional: Configure the middleware to run on all paths
// except for specific ones like API routes or static files.
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
