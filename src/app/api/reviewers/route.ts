import { NextResponse } from 'next/server';
import { listDriveFiles } from '@/lib/reviewers-drive';

export async function GET() {
  try {
    const data = await listDriveFiles();
    if (data && (data as any).error) {
      console.error((data as any).error);
      return NextResponse.json(data, { status: 500 });
    }
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ files: [], error: { message: 'Failed to fetch files.' } }, { status: 500 });
  }
}
