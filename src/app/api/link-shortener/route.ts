import { NextResponse } from 'next/server';
import { getCloudflareContext } from '@opennextjs/cloudflare';
import { auth } from '@/lib/auth';

type CreateBody = {
	target_url: string;
	slug?: string;
	expires_at?: string | null; // ISO datetime string
};

export async function GET() {
	try {
		const { env } = await getCloudflareContext();
		const { DB } = env;

		// only return non-archived links
		const rows = await DB.prepare('SELECT id, slug, target_url, clicks, created_at, created_by, expires_at FROM links WHERE archived = 0 ORDER BY created_at DESC').all();

		return NextResponse.json({ links: rows.results || [] });
	} catch (error) {
		console.error('Error listing links:', error);
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
}

export async function POST(req: Request) {
	try {
		// require auth to create links and record creator
		const session = await auth();
		if (!session?.user?.email) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		const body = (await req.json()) as CreateBody;

		if (!body?.target_url) {
			return NextResponse.json({ error: 'target_url is required' }, { status: 400 });
		}

		// generate simple slug if not provided
		let slug = body.slug?.trim();
		if (!slug) {
			slug = Math.random().toString(36).slice(2, 8);
		}

		const { env } = await getCloudflareContext();
		const { DB } = env;

		// ensure uniqueness: try insert and catch constraint violation
		try {
			const insert = await DB.prepare('INSERT INTO links (slug, target_url, created_by, expires_at) VALUES (?, ?, ?, ?)')
				.bind(slug, body.target_url, session.user.email, body.expires_at || null)
				.run();

			return NextResponse.json({ id: insert.lastRowId, slug, target_url: body.target_url });
		} catch (err) {
			// If slug already exists, return 409
			console.error('Insert error:', err);
			return NextResponse.json({ error: 'Slug already exists' }, { status: 409 });
		}

	} catch (error) {
		console.error('Error creating link:', error);
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
}

export async function DELETE(req: Request) {
	try {
		const body = await req.json();
		const id = body?.id;
		if (!id) return NextResponse.json({ error: 'id is required' }, { status: 400 });

		const { env } = await getCloudflareContext();
		const { DB } = env;

		await DB.prepare('DELETE FROM links WHERE id = ?').bind(id).run();
		return NextResponse.json({ success: true });
	} catch (error) {
		console.error('Error deleting link:', error);
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
}

