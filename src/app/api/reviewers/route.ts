import { NextResponse } from 'next/server';
import { checkAuthFromCookies } from '@/lib/auth';
import { listDriveFiles } from '@/lib/reviewers-drive';

export async function GET() {
  const auth = await checkAuthFromCookies();
  if (!auth.authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await listDriveFiles();
    if (data && data.error) {
      console.error(data.error);
      return NextResponse.json(data, { status: 500 });
    }
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ files: [], error: { message: 'Failed to fetch files.' } }, { status: 500 });
  }
}
