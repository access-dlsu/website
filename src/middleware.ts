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
    return NextResponse.redirect(entry.url, 301);
  }
  // Continue to next middleware or route
  return NextResponse.next();
}

// Optionally, configure matcher to only run on certain paths
// export const config = {
//   matcher: '/:path*',
// };
