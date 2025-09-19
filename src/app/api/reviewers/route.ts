import { NextResponse } from 'next/server';
import { listDriveFiles } from '@/lib/reviewers-drive';

export async function GET() {
  try {
    const files = await listDriveFiles();
    return NextResponse.json({ files });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ files: [], error: 'Failed to fetch files.' }, { status: 500 });
  }
}
