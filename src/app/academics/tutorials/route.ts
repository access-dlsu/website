import { NextResponse } from 'next/server';

export function GET(request: Request) {
  const url = new URL(request.url);
  url.pathname = '/coming-soon';
  return NextResponse.redirect(url, 307);
}
